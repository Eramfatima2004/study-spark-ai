# StudySpark AI - Intelligent Study Assistant

StudySpark AI is an interactive, stateful study assistant built with React and Node.js/Express. It takes free-form study topics, uses the Google Gemini 2.5 Flash API to perform deep content synthesis, and returns structured data rendered into interactive, stateful revision panels.

* **Live Frontend (Vercel)**: [https://study-spark-ai-client.vercel.app](https://study-spark-ai-client.vercel.app)
* **Live Backend (Render)**: [https://study-spark-ai-backend.onrender.com](https://study-spark-ai-backend.onrender.com)
* **Health Check**: [https://study-spark-ai-backend.onrender.com/api/health](https://study-spark-ai-backend.onrender.com/api/health)

---

## 📖 Assignment Requirements Mapping

Here is how the project maps directly to the specific criteria in the assignment PDF:

| Requirement in PDF | Implementation Details |
| :--- | :--- |
| **No Chatbot Rule** (Page 1) | Rejects a raw text chat box. Instead, the backend returns highly structured JSON representing a full course set (summaries, key points, flashcards, and multiple-choice quizzes) parsed into rich interactive study panels. |
| **Stateful, Interactive UI** (Page 1) | Interactive tabs (`summary`, `flashcards`, `quiz`). Stateful flashcards with shuffle, progress track, and save status. A fully functional multiple-choice quiz with scoring gauges, correct/incorrect choice styling, explanations, and mistake reviews. |
| **Robust Handling of Bad Output** (Page 2) | Dual Zod schemas validate both server-side JSON shapes and client-side API parses. Network abort handlers prevent stale inputs from overwriting newer requests. |
| **Graceful Failure/Fallback** (Page 2) | Includes a comprehensive **Local Fallback Database** (`fallbackStudySet.js`). If Gemini is rate-limited or fails, the app falls back to handcrafted course materials for core topics (Photosynthesis, DBMS Normalization, JS Closures, React Hooks, Binary Search, and Computer Networks) so the UI never crashes. |
| **Security (Routing Call)** (Page 2) | The API key is securely routed through a dedicated Node.js Express backend. No keys are shipped to the client browser. |
| **Stretch Features** (Page 2) | **Recent Sessions History**: Auto-saved to localStorage, allowing users to reload previous runs from a sidebar. **Keyboard Navigation** on flashcards. Premium dark-mode aesthetics. |

---

## 🛠️ Stack & Architecture

### 1. Frontend Client (`client/`)
* **Core Framework**: React (Hooks, Context, Functional Components)
* **Build System**: Vite (Ultra-fast HMR and compilation)
* **Styling**: Vanilla CSS (Tailored dark theme with glassmorphism effects, smooth flex/grid panels, and scroll-into-view animations)
* **Icons**: `lucide-react`
* **Validation**: `zod`

### 2. Backend Server (`server/`)
* **Server**: Node.js & Express
* **AI Integration**: Official `@google/genai` SDK querying the `gemini-2.5-flash` model
* **CORS**: Dynamic CORS middleware echoing requesting origin, enabling credentials support, and explicit preflight `OPTIONS` handling
* **Robust Error Boundaries**: Custom Express error handler ensuring proper CORS headers are attached on all failure paths (so actual backend issues are displayed instead of generic browser CORS block screens)
* **Validation**: `zod`

---

## 🚀 Setup & Installation (Run Locally)

Prerequisites: Ensure you have Node.js (v18+) installed.

### 1. Clone & Install Dependencies
Run the install command in the root folder (this will install dependencies for both the workspaces):
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file inside the `server/` directory:
```env
PORT=8787
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run Development Servers
Start both the client and server concurrently from the root folder:
```bash
npm run dev
```
* **Frontend local URL**: `http://localhost:5173`
* **Backend local URL**: `http://localhost:8787`

---

## 📚 Features & Walkthrough

### 📝 1. Study Material Input
* Accepts free-form input topics or raw notes up to 12,000 characters.
* Learning modes:
  1. **Study Mode**: Detailed explanations, definitions, mnemonics, and 15+ cards/quiz questions.
  2. **Placement Prep (Interview)**: Professional recruiter mindset focus, viva tips, and production edge cases.
  3. **Quick Revision**: High-yield facts, exactly 5 flashcards, and 3 MCQs.

### 🎴 2. Active Recall Flashcards
* Displays questions and reveals answers dynamically on click.
* Includes state tracking (**Mark as Known**, **Review Later**) with progress metrics.
* **Keyboard Shortcuts**:
  * `Space` — Flip card
  * `←` / `→` — Navigate cards
  * `K` — Mark as Known
  * `R` — Mark as Review Later
* **Shuffle Button**: Randomizes card sequence on the fly.

### 📝 3. Interactive Quiz
* Multi-choice layout with immediate feedback.
* Highlights correct option in green and incorrect selected in red.
* Explains the logical background of the answer instantly.
* **Mistakes Review**: At the end of the quiz, provides a list of incorrect answers to practice.

### 💾 4. Recent Session Sidebar
* Persists previous generations locally.
* Click any item in the sidebar to restore the session immediately with smooth auto-scroll to results.

---

## 🤖 AI Usage Note
This project was developed with the assistance of agentic coding tools (Google Antigravity) to:
* Set up Vite configuration parameters and Express middleware routing.
* Refactor the 3D card compositing layout to a browser-stable flat compositing card.
* Code the mock database arrays inside `fallbackStudySet.js`.
* Debug preflight `OPTIONS` and headers matching across Vercel and Render.
All generated code was audited, verified for correctness, and compiled locally to ensure optimal performance.

---

## 🔒 Known Limitations & Failure Handling
* **API Key Dependency**: The application depends on a valid Google Gemini API key. If the key is missing or invalid, the backend gracefully catches the error and serves handcrafted material.
* **Rate Limits (429)**: Free-tier API keys have strict rate limits. The backend handles `RESOURCE_EXHAUSTED` responses and instructs the client cleanly without crashing.
* **Browser Sandbox CORS Cache**: Some browsers cache CORS preflight failures. Cleared via a force refresh (`Ctrl + F5`) or incognito windows.

---

## ⏱️ Time Spent
* **Total Time**: ~7.5 hours
  * Setup & Backend Routing: 1.5 hours
  * Prompt Engineering & Schema Validation: 2 hours
  * React UI (Summary, Flashcard component, Quiz logic): 2.5 hours
  * Deployment configurations & CORS debugging: 1.5 hours