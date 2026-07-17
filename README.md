# 📚 StudySpark AI

> Transform any topic or study notes into interactive AI-powered summaries, flashcards, and quizzes.

StudySpark AI is an intelligent study companion that converts free-form text into structured learning material using **Google Gemini 2.5 Flash**. Instead of functioning as a chatbot, the application generates structured JSON and renders it into interactive UI components such as summaries, flashcards, quizzes, and saved study sessions.

---

# 🌐 Live Demo

### 🚀 Frontend
**Live Application:**  
https://your-frontend-url.vercel.app

### ⚙️ Backend API
**API Base URL:**  
https://your-backend-url.onrender.com

### 📂 GitHub Repository
https://github.com/Eramfatima2004/study-spark-ai


---

# ✨ Features

## 🤖 AI-Powered Study Generation

Generate structured study material from:

- Class Notes
- Technical Topics
- Programming Concepts
- Interview Questions
- Exam Preparation Topics

Powered by **Google Gemini 2.5 Flash**.

---

## 📖 AI Summary

Automatically generates:

- Detailed explanations
- Important definitions
- Key concepts
- Real-world examples
- Common mistakes
- Exam tips
- Quick revision notes

---

## 🧠 Interactive Flashcards

- Flip animation
- Previous / Next navigation
- Progress tracking
- Responsive design
- Easy revision

---

## 📝 AI Quiz

Generate interactive quizzes featuring:

- Multiple Choice Questions
- Instant feedback
- Score tracking
- Correct answers
- Detailed explanations

---

## 📚 Study Library

- Save generated study sets
- Revisit previous sessions
- Organize learning material

---

## 🕒 Recent Sessions

Quickly reopen recently generated study topics without regenerating them.

---

## 🎨 Premium UI

- Responsive Design
- Dark Mode
- Modern Layout
- Smooth Animations
- Mobile Friendly
- Beautiful Cards

---

# 🏗️ Tech Stack

## Frontend

- React
- Vite
- React Router
- React Hooks
- CSS Modules

## Backend

- Node.js
- Express.js

## AI

- Google Gemini 2.5 Flash
- @google/genai SDK

---

# 📂 Project Structure

```
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
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/Eramfatima2004/study-spark-ai.git
```

Move into the project

```bash
cd study-spark-ai
```

Install dependencies

```bash
npm install
```

Install frontend dependencies

```bash
cd client
npm install
```

Install backend dependencies

```bash
cd ../server
npm install
```

---

# 🔑 Environment Variables

Create:

```
server/.env
```

Example

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
PORT=5000
```

---

# ▶️ Running the Project

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

Open:

```
http://localhost:5173
```

---

# 🔄 Application Workflow

```
User enters notes/topic
          │
          ▼
React Frontend
          │
          ▼
Express Backend
          │
          ▼
Gemini 2.5 Flash
          │
          ▼
Structured JSON
          │
          ▼
Schema Validation
          │
          ▼
Interactive UI
```

---


# 🤖 AI Usage

AI tools were used to assist with:

- Brainstorming UI ideas
- Refining prompts
- Debugging implementation issues
- Improving component structure
- Writing documentation

All generated code was reviewed, integrated, tested, and modified manually to ensure correctness and understanding.

---

# ⚠️ Error Handling

The application gracefully handles:

- Invalid AI responses
- Empty responses
- Network failures
- API errors
- Loading states
- Retry flow
- Backend validation failures

The application never crashes because of malformed AI output.

---

# 📱 Responsive Design

Fully optimized for:

- Desktop
- Tablet
- Mobile

---

# 🔒 Security

- API key stored securely using environment variables
- API key never exposed to the frontend
- All Gemini requests routed through the backend

---

# 🚧 Known Limitations

- Requires an active internet connection
- Depends on Gemini API availability
- AI-generated content may occasionally vary depending on the model response
- Free-tier API usage may be rate limited

---

# 🚀 Future Improvements

- PDF Upload
- OCR Support
- Voice Input
- Export Notes as PDF
- Spaced Repetition
- AI Study Planner
- Authentication
- Cloud Sync

---

# ⏱️ Time Spent

Approximately **8 hours**

| Task | Time |
|------|------|
| Project Planning | 30 mins |
| UI Development | 2 hrs |
| Backend Development | 1.5 hrs |
| Gemini Integration | 1.5 hrs |
| Error Handling | 45 mins |
| Testing & Debugging | 1 hr |
| Documentation | 30 mins |

---

# 👩‍💻 Author

## Eram Fatima

B.Tech Computer Science (IoT)

Frontend Developer | AI Enthusiast

**GitHub:**  
https://github.com/Eramfatima2004

**LinkedIn:**  
https://linkedin.com/in/your-linkedin-profile

---

## Acknowledgements

Built using:

- React
- Express.js
- Google Gemini 2.5 Flash
- Vite

Created by **Eram Fatima**

---

# 📄 License

This project was developed as part of a Frontend Internship Assignment and is intended for educational and demonstration purposes.