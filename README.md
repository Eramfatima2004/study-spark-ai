📚 StudySpark AI

An AI-powered learning assistant that transforms any topic or study notes into interactive summaries, flashcards, quizzes, and personalized learning experiences.

StudySpark AI is an intelligent study companion built using React, Express.js, and Google Gemini 2.5 Flash. Instead of functioning as a chatbot, it generates structured JSON responses that are rendered into interactive learning components including summaries, flashcards, quizzes, and reusable study sessions.

The application focuses on reliable AI integration, structured data rendering, robust error handling, and an engaging, responsive learning experience.

🌐 Live Demo
🚀 Frontend
Live Application
https://study-spark-ai-client.vercel.app/

⚙️ Backend API
API Base URL
https://study-spark-ai-backend.onrender.com

📂 GitHub Repository

https://github.com/Eramfatima2004/study-spark-ai


✨ Features
🤖 AI-Powered Study Generation

Generate structured study material from:

Class Notes
Technical Concepts
Programming Topics
Interview Preparation
Exam Topics
Any custom study subject

Powered by Google Gemini 2.5 Flash.

🎯 Learning Modes

StudySpark offers multiple AI-powered learning modes tailored to different learning goals.

📚 Study Mode

Designed for comprehensive learning.

Generates:

Detailed AI Summary
Key Concepts
Definitions
Real-world Examples
15–20 Interactive Flashcards
10–15 Quiz Questions
Exam Tips

Perfect for understanding a topic from scratch.

💼 Interview Mode

Optimized for placement and interview preparation.

Generates:

Short Concept Explanation
Frequently Asked Interview Questions
Expected Answers
Follow-up Questions
Interview Tips
Important Technical Concepts

Ideal for technical interview revision.

⚡ Quick Revision Mode

Designed for last-minute revision before exams.

Generates:

5 Key Concepts
5 Revision Flashcards
3 Rapid-Fire MCQs
One-Minute Revision Sheet

Perfect for quick recall.

📖 AI Summary

Automatically generates:

Detailed Explanation
Definitions
Important Concepts
Examples
Common Mistakes
Exam Tips
Revision Notes
🧠 Interactive Flashcards

Features include:

Flip Animation
Previous / Next Navigation
Progress Tracking
Mobile Friendly
Interactive Learning
📝 AI Quiz

Generate interactive quizzes featuring:

Multiple Choice Questions
Instant Feedback
Score Tracking
Correct Answers
Explanations
Retry Incorrect Questions
📚 Study Library
Save Study Sessions
Revisit Previous Topics
Continue Learning Anytime
🕒 Recent Sessions

Quickly reopen previously generated study sessions without regenerating AI content.

🎨 Modern User Experience
Responsive Design
Dark Mode
Smooth Animations
Premium UI
Keyboard Friendly
Mobile Optimized
🛡️ Robust AI Error Handling

Gracefully handles:

Invalid AI Responses
Malformed JSON
Empty Responses
Network Failures
API Errors
Retry Flow
Loading States
Schema Validation
Prevention of Stale Responses

The application never crashes due to malformed AI output.

🌟 Why StudySpark?

Unlike traditional AI chat interfaces, StudySpark transforms structured AI responses into an interactive learning experience.

Instead of displaying plain text, users can:

Choose a learning mode
Learn through interactive flashcards
Test themselves with quizzes
Revise efficiently using Quick Revision Mode
Prepare for placements using Interview Mode
Save and revisit previous study sessions

This creates a focused and reusable study workflow rather than a simple conversation with an AI model.

🏗️ Tech Stack
Frontend
React
Vite
React Router
React Hooks
CSS Modules
Backend
Node.js
Express.js
AI
Google Gemini 2.5 Flash
@google/genai SDK
📂 Project Structure
StudySpark-AI
│
├── client
│   ├── src
│   │   ├── app
│   │   ├── components
│   │   ├── features
│   │   ├── hooks
│   │   ├── pages
│   │   ├── services
│   │   └── styles
│   │
│   └── package.json
│
├── server
│   ├── src
│   │   ├── prompts
│   │   ├── routes
│   │   ├── schemas
│   │   ├── services
│   │   └── index.js
│   │
│   ├── .env.example
│   └── package.json
│
├── package.json
└── README.md
⚙️ Installation

Clone the repository

git clone https://github.com/Eramfatima2004/study-spark-ai.git

Move into the project

cd study-spark-ai

Install all dependencies

npm install

Install frontend dependencies

cd client
npm install

Install backend dependencies

cd ../server
npm install
🔑 Environment Variables

Create:

server/.env

Example:

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
PORT=5000
▶️ Running the Project
Start Backend
cd server
npm run dev
Start Frontend
cd client
npm run dev

Open:

http://localhost:5173
🔄 Application Workflow
User Enters Topic
        │
        ▼
Select Learning Mode
(Study / Interview / Quick Revision)
        │
        ▼
React Frontend
        │
        ▼
Express Backend
        │
        ▼
Google Gemini 2.5 Flash
        │
        ▼
Structured JSON Response
        │
        ▼
Schema Validation
        │
        ▼
Interactive UI

 ├── AI Summary
 ├── Flashcards
 ├── Quiz
 ├── Study Library
 └── Recent Sessions
🤖 AI Usage

AI tools were responsibly used during development for:

Brainstorming UI ideas
Prompt engineering
Debugging implementation issues
Refactoring components
Improving documentation

All generated code was manually reviewed, integrated, tested, and modified before being included in the final application.

Custom prompts were designed for each Learning Mode to generate context-specific educational content while maintaining a consistent user experience.

📱 Responsive Design

Fully optimized for:

Desktop
Tablet
Mobile
🔒 Security
API key stored securely using environment variables
API key never exposed to the frontend
All AI requests are routed through the Express backend
🚧 Known Limitations
Requires an active internet connection
Depends on Gemini API availability
AI-generated content may vary depending on model responses
Free-tier Gemini API usage may be rate limited
🚀 Future Improvements
PDF Upload Support
OCR for Handwritten Notes
Voice Input
Export Notes as PDF
AI Study Planner
Spaced Repetition
User Authentication
Cloud Sync
Learning Analytics Dashboard
⏱️ Time Spent

Approximately 10–12 hours

Task	Time
Project Planning	30 mins
UI Development	2.5 hrs
Backend Development	2 hrs
Gemini Integration	2 hrs
Learning Modes	1 hr
Error Handling	1 hr
Testing & Debugging	1.5 hrs
Documentation	30 mins
👩‍💻 Author
Eram Fatima

B.Tech Computer Science (IoT)

Frontend Developer | AI Enthusiast

GitHub
https://github.com/Eramfatima2004

LinkedIn
https://linkedin.com/in/your-linkedin-profile

🙏 Acknowledgements

Built using:

React
Vite
Express.js
Google Gemini 2.5 Flash

Special thanks to the open-source community and AI tools that assisted with brainstorming, debugging, and documentation during development.

📄 License

This project was developed as part of a Frontend Internship Assignment and is intended for educational and demonstration purposes.