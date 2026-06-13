import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
console.log("API Key loaded:", apiKey ? "✅ Yes" : "❌ No");
console.log("Key length:", apiKey?.length || 0);

if (!apiKey) {
  console.error("❌ No API key found in .env");
  process.exit(1);
}

const ai = new GoogleGenerativeAI({ apiKey });
const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

try {
  const result = await model.generateContent("What is 2+2?");
  const response = await result.response;
  console.log("✅ API Response:", response.text());
} catch (error) {
  console.error("❌ API Error:", error.message);
  process.exit(1);
}
