import express from "express";
import { query } from "../services/database.js";

const router = express.Router();

router.post("/schedule", async (req, res) => {
  try {
    const { userId, subject, quizDate, quizTime } = req.body;

    if (!userId || !subject || !quizDate) {
      return res.status(400).json({
        success: false,
        message: "userId, subject, and quizDate are required",
      });
    }

    const result = await query(
      "INSERT INTO quiz_schedule (user_id, subject, quiz_date, quiz_time) VALUES (?, ?, ?, ?)",
      [userId, subject, quizDate, quizTime || null]
    );

    res.json({
      success: result.success,
      schedule_id: result.data.insertId,
      message: result.success ? "Quiz scheduled successfully" : result.error,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to schedule quiz",
      error: error.message,
    });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await query(
      "SELECT * FROM quiz_schedule WHERE user_id = ? ORDER BY quiz_date ASC",
      [userId]
    );

    res.json({
      success: result.success,
      schedules: result.data || [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch quiz schedule",
      error: error.message,
    });
  }
});

export default router;
