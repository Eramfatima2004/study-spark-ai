# 📚 StudySpark AI

An AI-powered learning assistant that transforms any topic or study notes into interactive summaries, flashcards, quizzes, and personalized learning experiences.

StudySpark AI is an intelligent study companion built using React, Express.js, and Google Gemini 2.5 Flash. Instead of functioning as a chatbot, it generates structured JSON responses that are rendered into interactive learning components including summaries, flashcards, quizzes, and reusable study sessions.

The application focuses on reliable AI integration, structured data rendering, robust error handling, and an engaging, responsive learning experience.

---

## 🎥 Demo Video & Screen Recording
A short video demonstration of the app working and its interactive features in action:
* **Demo Video Link**: [Insert Your Demo Video Link Here] *(e.g. YouTube, Loom, Google Drive)*

---

## 🌐 Live Demo
* 🚀 **Frontend Live Application**: [https://study-spark-ai-client.vercel.app/](https://study-spark-ai-client.vercel.app/)
* ⚙️ **Backend API Base URL**: [https://study-spark-ai-backend.onrender.com](https://study-spark-ai-backend.onrender.com)
* 📂 **GitHub Repository**: [https://github.com/Eramfatima2004/study-spark-ai](https://github.com/Eramfatima2004/study-spark-ai)

---

## ✨ Features

### 🤖 AI-Powered Study Generation
Generate structured study material from:
* Class Notes
* Technical Concepts
* Programming Topics
* Interview Preparation
* Exam Topics
* Any custom study subject

*Powered by Google Gemini 2.5 Flash.*

### 🎯 Learning Modes
StudySpark offers multiple AI-powered learning modes tailored to different learning goals:

#### 📚 Study Mode
*Designed for comprehensive learning.*
Generates:
* Detailed AI Summary
* Key Concepts & Definitions
* Real-world Examples
* 15–20 Interactive Flashcards
* 10–15 Quiz Questions
* Exam Tips

#### 💼 Interview Mode
*Optimized for placement and interview preparation.*
Generates:
* Short Concept Explanation
* Frequently Asked Interview Questions
* Expected Answers & Follow-up Questions
* Interview Tips & Important Technical Concepts

#### ⚡ Quick Revision Mode
*Designed for last-minute revision before exams.*
Generates:
* 5 Key Concepts
* 5 Revision Flashcards
* 3 Rapid-Fire MCQs
* One-Minute Revision Sheet

### 📖 AI Summary
Automatically generates:
* Detailed Explanation
* Definitions of Important Concepts
* Concrete Examples
* Common Mistakes & Exam Tips
* Quick Revision Notes

### 🧠 Interactive Flashcards
* Flip Animation on Click
* Keyboard Navigation (`Space` to flip, `←` / `→` to navigate, `K` to mark known, `R` to review later)
* Shuffle Button to randomize cards
* Progress & Success Tracking (Known vs Review metrics)
* Mobile Friendly & responsive

### 📝 AI Quiz
* Multiple Choice Questions
* Instant Correct/Incorrect feedback styling
* Dynamic Score Gauge Tracking
* Explanations for all answers
* Retry incorrect questions feature

### 💾 Study Library & Recent Sessions
* Persists study sessions locally.
* Quick reload previously generated topics from the sidebar without regenerating AI content.

### 🎨 Modern User Experience
* Custom theme variables
* Beautiful dark theme with modern glassmorphism
* Smooth micro-animations and scroll-into-view triggers
* Keyboard friendly navigation
* Fully optimized for mobile devices

### 🛡️ Robust AI Error Handling
Gracefully handles:
* Invalid AI Responses & Malformed JSON
* Empty Responses
* Network Failures & API Errors
* Loading States & Schema Validation
* Prevention of Stale Responses (via request abort controllers)
* *The application never crashes due to malformed AI output.*

---

## 🌟 Why StudySpark?
Unlike traditional AI chat interfaces, StudySpark transforms structured AI responses into an interactive learning experience. 

Instead of displaying plain text, users can:
* Choose a learning mode
* Learn through interactive flashcards
* Test themselves with quizzes
* Revise efficiently using Quick Revision Mode
* Prepare for placements using Interview Mode
* Save and revisit previous study sessions

---

## 🏗️ Tech Stack
* **Frontend**: React, Vite, React Router, React Hooks, CSS Modules
* **Backend**: Node.js, Express.js
* **AI**: Google Gemini 2.5 Flash, `@google/genai` SDK
* **Validation**: `zod` schema verification on client and server

---

## 📂 Project Structure
```text
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

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Eramfatima2004/study-spark-ai.git
   ```
2. **Move into the project**
   ```bash
   cd study-spark-ai
   ```
3. **Install all dependencies**
   ```bash
   npm install
   ```
4. **Install frontend dependencies**
   ```bash
   cd client
   ```
5. **Install backend dependencies**
   ```bash
   cd ../server
   npm install
   ```

---

## 🔑 Environment Variables
Create a `server/.env` file with the following variables:
```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
PORT=8787
```

---

## ▶️ Running the Project

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

The application will be accessible at:
* **Frontend**: `http://localhost:5173`

---

## 🔄 Application Workflow
```text
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
```

---

## 🤖 AI Usage
AI tools were responsibly used during development for:
* Brainstorming UI layouts and glassmorphic designs
* Prompt engineering constraints
* Debugging deployment preflight options and headers
* Refactoring component lifecycle hooks
* Improving validation schemas

*All generated code was manually reviewed, integrated, tested, and modified before being included in the final application.*

---

## 📱 Responsive Design
Fully optimized for:
* Desktop
* Tablet
* Mobile

---

## 🔒 Security
* API key stored securely using environment variables.
* API key never exposed to the frontend.
* All AI requests are routed through the Express backend.

---

## 🚧 Known Limitations
* Requires an active internet connection.
* Depends on Gemini API availability.
* AI-generated content may vary depending on model responses.
* Free-tier Gemini API usage may be rate limited.

---

## 🚀 Future Improvements
* PDF Upload Support & OCR for Handwritten Notes
* Voice Input
* Export Notes as PDF
* AI Study Planner
* Spaced Repetition Algorithms
* User Authentication & Cloud Sync
* Learning Analytics Dashboard

---

## ⏱️ Time Spent

Approximately **8 hours** total:

| Task | Time |
| :--- | :--- |
| Project Planning | 30 mins |
| UI Development | 2.5 hrs |
| Backend Development | 1.5 hrs |
| Gemini Integration | 1.5 hrs |
| Learning Modes | 45 mins |
| Error Handling | 45 mins |
| Testing & Debugging | 1 hr |
| Documentation | 15 mins |

---

## 👩‍💻 Author
**Eram Fatima**
* B.Tech Computer Science (IoT)
* Frontend Developer | AI Enthusiast
* **GitHub**: [https://github.com/Eramfatima2004](https://github.com/Eramfatima2004)
* **LinkedIn**: [https://www.linkedin.com/in/eram-fatima-1101b6331/](https://www.linkedin.com/in/eram-fatima-1101b6331/)

---

## 🙏 Acknowledgements
Built using:
* React
* Vite
* Express.js
* Google Gemini 2.5 Flash

*Special thanks to the open-source community and AI tools that assisted with brainstorming, debugging, and documentation during development.*

---

## 📄 License
This project was developed as part of a Frontend Internship Assignment and is intended for educational and demonstration purposes.