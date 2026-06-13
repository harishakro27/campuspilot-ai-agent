import express from "express";
import { query } from "../services/database.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, roll_no, branch, sem } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const result = await query(
      "INSERT INTO users (name, email, roll_no, branch, sem) VALUES (?, ?, ?, ?, ?)",
      [name, email, roll_no || null, branch || null, sem || null]
    );

    res.json({
      success: result.success,
      user_id: result.data.insertId,
      message: result.success ? "User registered successfully" : result.error,
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await query("SELECT * FROM users WHERE id = ?", [userId]);

    if (!result.success || result.data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: result.data[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
});

export default router;
