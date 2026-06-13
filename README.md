# 🎓 CampusPilot AI - Complete Study Assistant System

**AI-Powered Study Platform with Multi-Turn Conversations, Study Planning, and Quiz Management**

CampusPilot is an AI Assistant & Agent platform designed for university students. It combines conversational AI with autonomous agent workflows to help students understand concepts, create study plans, manage deadlines, organize tasks, and improve academic productivity.

## 🌟 Features

### Core AI Features

✅ **Intelligent Q&A Assistant** - Ask any question, get AI-powered explanations
✅ **Study Planner Agent** - Generate personalized study plans with timelines
✅ **Concept Explainer** - Detailed explanations at different proficiency levels
✅ **Multi-Turn Conversations** - Maintain context across chat exchanges
✅ **Quiz Scheduler** - Track and manage upcoming quizzes

### Technical Features

✅ **Gemini AI Integration** - Latest Google Generative AI models
✅ **REST API** - Clean, documented endpoints
✅ **MySQL Database** - Persistent conversation history
✅ **React Frontend** - Beautiful, responsive UI
✅ **Error Handling** - Graceful error messages and fallbacks
✅ **CORS Support** - Cross-origin resource sharing enabled

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Gemini API Key (free from https://aistudio.google.com/apikey)
- MySQL Server (optional, for database)

### Backend Setup (5 minutes)

```bash
# 1. Navigate to project
cd campuspilot-ai-agent-main

# 2. Create .env file and add API key
echo GEMINI_API_KEY=your-api-key-here >> .env
echo PORT=5000 >> .env

# 3. Install dependencies
npm install

# 4. Start server
npm run dev
```

**Output:**

```
🚀 CampusPilot Server running on port 5000
💾 Database: ⚠️ Not Connected
📍 Base URL: http://localhost:5000
```

### Frontend Setup (5 minutes)

```bash
# 1. Create frontend project
mkdir frontend && cd frontend
npm init -y

# 2. Install dependencies
npm install react react-dom axios
npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. Update package.json scripts
# Replace scripts with:
# "dev": "vite",
# "build": "vite build"

# 4. Create vite.config.js and copy from COMPLETE_GUIDE.md

# 5. Start frontend
npm run dev
```

**Frontend runs on:** http://localhost:3000

## 📚 API Endpoints

### Assistant Endpoints

**POST /assistant** - Ask any question

```bash
curl -X POST http://localhost:5000/assistant \
  -H "Content-Type: application/json" \
  -d '{"message":"Explain OOP"}'
```

**POST /assistant/explain** - Explain a concept

```bash
curl -X POST http://localhost:5000/assistant/explain \
  -H "Content-Type: application/json" \
  -d '{"concept":"DBMS", "proficiency":"beginner"}'
```

### Agent Endpoints

**POST /agent/chat** - Multi-turn agent conversation

```bash
curl -X POST http://localhost:5000/agent/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What is normalization?", "userId":1}'
```

**POST /agent/study-plan** - Generate study plan

```bash
curl -X POST http://localhost:5000/agent/study-plan \
  -H "Content-Type: application/json" \
  -d '{"subject":"DBMS", "deadline":"3 days", "proficiency":"intermediate", "userId":1}'
```

### User Endpoints

**POST /user/register** - Register new user

```bash
curl -X POST http://localhost:5000/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Haris", "email":"haris@college.edu", "roll_no":"21BCS001", "branch":"CSE", "sem":3}'
```

**GET /user/:userId** - Get user profile

```bash
curl http://localhost:5000/user/1
```

### Quiz Endpoints

**POST /quiz/schedule** - Schedule a quiz

```bash
curl -X POST http://localhost:5000/quiz/schedule \
  -H "Content-Type: application/json" \
  -d '{"userId":1, "subject":"DBMS", "quizDate":"2026-06-15", "quizTime":"10:00"}'
```

**GET /quiz/user/:userId** - Get quiz schedule

```bash
curl http://localhost:5000/quiz/user/1
```

### Health Check

**GET /health**

```bash
curl http://localhost:5000/health
```

## 📂 Project Structure

```
campuspilot-ai-agent-main/
├── server.js                 # Main Express server
├── package.json             # Dependencies
├── .env                     # Configuration (add your API key)
├── .gitignore
├── README.md
├── services/
│   ├── gemini.js           # Gemini API integration
│   └── database.js         # MySQL connection
├── routes/
│   ├── assistant.js        # Q&A routes
│   ├── agent.js            # Agent routes
│   ├── user.js             # User management
│   └── quiz.js             # Quiz scheduling
└── frontend/               # React project (create manually)
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   ├── components/
    │   │   ├── Chat.jsx
    │   │   ├── StudyPlanner.jsx
    │   │   ├── Header.jsx
    │   │   └── Loading.jsx
    │   └── services/
    │       └── api.js
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## 🧪 Testing

### Test Case 1: Explain OOP

```
Input: "Explain Object-Oriented Programming"
Expected: Detailed OOP explanation with examples
```

### Test Case 2: DBMS Study Plan

```
Input:
  Subject: DBMS
  Deadline: 3 days
  Level: Beginner
Expected: Day-by-day study schedule with topics and resources
```

### Test Case 3: Concept Explanation

```
Input: "Explain Normalization"
Expected: Simple, beginner-friendly explanation
```

## 🔧 Environment Variables

Create `.env` file in root:

```
# Server
PORT=5000
NODE_ENV=development

# Gemini API (REQUIRED)
GEMINI_API_KEY=your-gemini-api-key-here

# Database (Optional)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=campuspilot_db
DB_PORT=3306
```

## 🗄️ Database Schema (Optional)

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  roll_no VARCHAR(50),
  branch VARCHAR(100),
  sem INT
);

CREATE TABLE conversations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  topic VARCHAR(255),
  query TEXT,
  response LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE study_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  subject VARCHAR(255),
  deadline VARCHAR(100),
  plan_details LONGTEXT,
  proficiency_level VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quiz_schedule (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  subject VARCHAR(255),
  quiz_date DATE,
  quiz_time TIME
);
```

## 🎯 Demo Scenarios for Judges

### Scenario 1: AI Assistant

- **User**: "Explain Object-Oriented Programming"
- **AI Response**: Detailed explanation with examples
- **Demonstrates**: Gemini AI integration, knowledge synthesis

### Scenario 2: Study Planner Agent

- **User**: "I have a DBMS quiz in 3 days, I'm a beginner"
- **AI Response**: Day-by-day study plan with resources
- **Demonstrates**: AI reasoning, study optimization, context awareness

### Scenario 3: Multi-turn Conversation

- **User**: "What is normalization?"
- **Follow-up**: "Give me an example"
- **Demonstrates**: Context maintenance, conversation flow

## 🚨 Troubleshooting

### "GEMINI_API_KEY not found"

→ Add API key to `.env` file

### "Failed to generate response"

→ Check API key is valid from https://aistudio.google.com/apikey

### "Database not connected"

→ Optional - API works without MySQL. Set up if needed for persistence.

### "Port 5000 already in use"

→ Change PORT in `.env` to different port (e.g., 5001)

## 📊 Performance

- **Assistant Response**: 1-3 seconds
- **Study Plan Generation**: 3-5 seconds
- **Database Operations**: <100ms
- **API Response Time**: <5 seconds average

## 🔐 Security

✅ CORS enabled for frontend communication
✅ Environment variables for sensitive data
✅ Input validation on all endpoints
✅ Error handling without exposing system details

## 📈 Future Enhancements

- [ ] User authentication (JWT)
- [ ] Quiz attempt tracking
- [ ] Progress analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Video tutorial integration
- [ ] Collaborative study groups

## 👨‍💻 Technologies Used

**Backend**

- Express.js 5.x
- Google Generative AI (Gemini)
- MySQL2
- Node.js

**Frontend**

- React 18
- Vite
- Tailwind CSS
- Axios

## 📜 License

ISC

## 🙏 Credits

Built for CampusPilot - An AI-Powered Study Assistant Platform

---

**Created with ❤️ for students everywhere** 🎓

## 📞 Support

For issues or questions:

1. Check COMPLETE_GUIDE.md in documentation
2. Review API_TESTING.md for API examples
3. Check console logs for detailed errors

Happy studying! 🚀
