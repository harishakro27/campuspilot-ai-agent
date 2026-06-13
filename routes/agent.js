import express from "express";
import { generateResponse, generateStudyPlan } from "../services/gemini.js";
import { query } from "../services/database.js";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message, userId, context } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const result = await generateResponse(message, context || "");

    if (!result.success) {
      return res.status(500).json(result);
    }

    if (userId) {
      await query(
        "INSERT INTO conversations (user_id, topic, query, response, model) VALUES (?, ?, ?, ?, ?)",
        [userId, "agent_chat", message, result.response, result.model]
      );
    }

    res.json({
      success: true,
      query: message,
      response: result.response,
      model: result.model,
    });
  } catch (error) {
    console.error("Agent Chat Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process agent request",
      error: error.message,
    });
  }
});

router.post("/study-plan", async (req, res) => {
  try {
    const { subject, deadline, proficiency, userId } = req.body;

    if (!subject || !deadline) {
      return res.status(400).json({
        success: false,
        message: "Subject and deadline are required",
      });
    }

    const result = await generateStudyPlan(subject, deadline, proficiency || "beginner");

    if (!result.success) {
      return res.status(500).json(result);
    }

    if (userId) {
      const insertResult = await query(
        "INSERT INTO study_plans (user_id, subject, deadline, plan_details, proficiency_level) VALUES (?, ?, ?, ?, ?)",
        [userId, subject, deadline, result.response, proficiency || "beginner"]
      );

      res.json({
        success: true,
        subject,
        deadline,
        proficiency: proficiency || "beginner",
        study_plan: result.response,
        saved: true,
        plan_id: insertResult.data.insertId,
      });
    } else {
      res.json({
        success: true,
        subject,
        deadline,
        proficiency: proficiency || "beginner",
        study_plan: result.response,
        saved: false,
      });
    }
  } catch (error) {
    console.error("Study Plan Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate study plan",
      error: error.message,
    });
  }
});

export default router;
