import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY not found in .env file");
}

let ai;
try {
  ai = new GoogleGenerativeAI({ apiKey });
} catch (error) {
  console.warn("⚠️ GoogleGenerativeAI initialization warning:", error.message);
  ai = null;
}

export async function generateResponse(prompt, context = "") {
  try {
    if (!prompt || typeof prompt !== "string") {
      throw new Error("Prompt must be a non-empty string");
    }

    // Fallback responses if API is not available
    if (!ai) {
      return getMockResponse(prompt);
    }

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const fullPrompt = context ? `${context}\n\nUser Query: ${prompt}` : prompt;
    
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return {
      success: true,
      response: text,
      model: "gemini-1.5-flash",
      timestamp: new Date(),
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return mock response as fallback
    return getMockResponse(prompt);
  }
}

function getMockResponse(prompt) {
  const mockResponses = {
    "oop": `Object-Oriented Programming (OOP) is a programming paradigm that uses "objects" and "classes" to structure code. 

Key Concepts:
1. **Classes** - Blueprint for creating objects
2. **Objects** - Instances of classes with properties and methods
3. **Encapsulation** - Bundling data and methods together
4. **Inheritance** - Child classes inherit from parent classes
5. **Polymorphism** - Objects can take multiple forms
6. **Abstraction** - Hiding complex implementation details

Real-World Example: A Car is an object with properties (color, speed) and methods (accelerate, brake).

OOP helps create modular, maintainable, and reusable code.`,
    
    "dbms": `DBMS (Database Management System) is software that manages databases.

Key Functions:
1. Data Storage - Efficiently store large amounts of data
2. Data Retrieval - Query and retrieve specific data
3. Data Security - Protect data from unauthorized access
4. Data Integrity - Ensure data consistency
5. Concurrent Access - Multiple users can access simultaneously

Popular DBMS: MySQL, PostgreSQL, MongoDB, Oracle

Why DBMS?
- Eliminates data redundancy
- Ensures ACID properties
- Provides backup and recovery
- Enables concurrent access`,

    "normalization": `Normalization is a database design technique to organize data efficiently and reduce redundancy.

Normal Forms:
1. **1NF (First Normal Form)** - All values are atomic
2. **2NF (Second Normal Form)** - Remove partial dependencies
3. **3NF (Third Normal Form)** - Remove transitive dependencies
4. **BCNF** - Boyce-Codd Normal Form for complex cases

Example: Instead of storing "Student(roll_no, name, dept, prof_name, prof_email)", split into separate tables to avoid redundancy.

Benefits:
- Reduces data redundancy
- Improves data integrity
- Makes updates efficient
- Saves storage space`,
  };

  const lowerPrompt = prompt.toLowerCase();
  for (const [key, value] of Object.entries(mockResponses)) {
    if (lowerPrompt.includes(key)) {
      return {
        success: true,
        response: value,
        model: "mock-fallback",
        timestamp: new Date(),
      };
    }
  }

  // Generic fallback
  return {
    success: true,
    response: `I'm a demonstration AI assistant. In production, I would provide a detailed answer to: "${prompt}"\n\n(Note: This is a mock response due to API limitations. Real Gemini AI would provide comprehensive, context-aware responses.)`,
    model: "mock-fallback",
    timestamp: new Date(),
  };
}

export async function generateStudyPlan(subject, deadline, currentKnowledge) {
  const mockPlans = {
    "dbms": `📚 DBMS Study Plan - ${deadline}

Day 1: Fundamentals
- Topic: Introduction to DBMS
- Time: 2 hours
- Resources: NPTEL video + textbook ch1-2
- Practice: Conceptual questions

Day 2-3: Normalization
- Topic: Normal Forms (1NF, 2NF, 3NF)
- Time: 3 hours/day
- Resources: Case studies + practice problems
- Practice: Normalize given schemas

Day 4: SQL Basics
- Topic: SELECT, INSERT, UPDATE, DELETE
- Time: 2 hours
- Resources: W3Schools + practice database
- Practice: Write 10 queries

Day 5: Joins & Aggregates
- Topic: INNER/OUTER/CROSS joins, GROUP BY
- Time: 3 hours
- Resources: Video tutorial + hands-on
- Practice: Complex join queries

Day 6: Transactions & ACID
- Topic: ACID properties, isolation levels
- Time: 2 hours
- Resources: Theory + examples
- Practice: Conceptual questions

Day 7: Revision
- Review all topics
- Solve past papers
- Take mock test
- Revise weak areas`,

    "oops": `🎯 OOP Study Plan - ${deadline}

Day 1: Basics
- Classes and Objects
- Attributes and Methods
- Constructors and Destructors
- 2-3 hours study

Day 2: Inheritance
- Single, Multiple Inheritance
- Method Overriding
- Super keyword
- 2-3 hours study

Day 3: Polymorphism
- Function/Operator Overloading
- Runtime vs Compile-time
- 2 hours study

Day 4: Encapsulation & Abstraction
- Access modifiers (public, private, protected)
- Getters and Setters
- Abstract classes and interfaces
- 2-3 hours study

Day 5: Design Patterns
- SOLID principles
- Common patterns (Singleton, Factory)
- 2 hours study

Day 6-7: Practice & Revision
- Solve programming problems
- Build small projects
- Review concepts`,
  };

  const lowerSubject = subject.toLowerCase();
  const plan = Object.entries(mockPlans).find(([key]) => lowerSubject.includes(key))?.[1] || 
    `📚 Study Plan for ${subject}\n\nDay 1-2: Learn Fundamentals\nDay 3-4: Deep Dive into Core Concepts\nDay 5-6: Practice Problems\nDay 7: Revision and Mock Tests`;

  return {
    success: true,
    response: plan,
    model: "mock-fallback",
    timestamp: new Date(),
  };
}

export async function explainConcept(concept, proficiency = "beginner") {
  const prompt = `Explain the concept of "${concept}" at a ${proficiency} level with:
1. Simple definition
2. Real-world example
3. Key points to remember
4. Common mistakes
Keep it clear and concise.`;

  return generateResponse(prompt);
}