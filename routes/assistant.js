import express from "express";
import { generateResponse, explainConcept } from "../services/gemini.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message, context } = req.body;

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

    res.json({
      success: true,
      query: message,
      response: result.response,
      model: result.model,
    });
  } catch (error) {
    console.error("Assistant Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process request",
      error: error.message,
    });
  }
});

router.post("/explain", async (req, res) => {
  try {
    const { concept, proficiency } = req.body;

    if (!concept) {
      return res.status(400).json({
        success: false,
        message: "Concept is required",
      });
    }

    const result = await explainConcept(concept, proficiency || "beginner");

    res.json({
      success: result.success,
      concept,
      proficiency: proficiency || "beginner",
      explanation: result.response || result.error,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to explain concept",
      error: error.message,
    });
  }
});

export default router;