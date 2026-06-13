import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection } from "./services/database.js";

import assistantRoute from "./routes/assistant.js";
import agentRoute from "./routes/agent.js";
import userRoute from "./routes/user.js";
import quizRoute from "./routes/quiz.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 CampusPilot AI Assistant & Agent API Running...");
});

app.use("/assistant", assistantRoute);
app.use("/agent", agentRoute);
app.use("/user", userRoute);
app.use("/quiz", quizRoute);

app.get("/health", (req, res) => {
  res.json({
    status: "✅ API Healthy",
    timestamp: new Date(),
    uptime: process.uptime(),
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const dbConnected = await testConnection();

  app.listen(PORT, () => {
    console.log(`\n🚀 CampusPilot Server running on port ${PORT}`);
    console.log(`📍 Base URL: http://localhost:${PORT}`);
    console.log(`💾 Database: ${dbConnected ? "✅ Connected" : "⚠️ Not Connected"}`);
    console.log(`\nEndpoints:`);
    console.log(`  POST /assistant - Ask AI anything`);
    console.log(`  POST /assistant/explain - Explain a concept`);
    console.log(`  POST /agent/chat - Multi-turn agent chat`);
    console.log(`  POST /agent/study-plan - Generate study plan`);
    console.log(`  POST /user/register - Register new user`);
    console.log(`  GET /user/:userId - Get user profile`);
    console.log(`  POST /quiz/schedule - Schedule a quiz`);
    console.log(`  GET /quiz/user/:userId - Get quiz schedule`);
    console.log(`  GET /health - API health status\n`);
  });
};

startServer();
