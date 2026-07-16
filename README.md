# StudySpark AI

StudySpark turns raw study material into a concise summary, active-recall flashcards, and an interactive quiz. It deliberately uses a focused workspace rather than a chat interface.

## Architecture

The repository is a small npm workspace with a React client and an Express API. The client organizes interactive product areas under `src/features`, while shared application state is held in a lightweight context. The server owns all Gemini access, prompting, retries, and Zod validation. The browser never receives the API key.

## Tech stack

- React 19, Vite, React Router, Framer Motion, Lucide, React Hot Toast, Zod
- Node.js, Express, `@google/genai`, dotenv, CORS, Zod

## Setup

1. Install dependencies: `npm install`
2. Copy `server/.env.example` to `server/.env` and set `GEMINI_API_KEY`.
3. Run `npm run dev`.
4. Open `http://localhost:5173`.

Set `VITE_API_URL` in `client/.env` only when the API is hosted elsewhere.

## Reliability choices

The API requires JSON mime output, retries once if the model response is malformed, and validates its exact shape with Zod. The client validates again before rendering. Generation requests use `AbortController` and a request counter, so a late response cannot overwrite a newer request. Error messages are intentionally helpful without exposing backend details.

## AI disclosure and limitations

AI-generated content can be inaccurate; learners should verify important material. Long notes are capped at 12,000 characters and the current persistence layer uses browser local storage. Future work could add authentication, cloud sync, PDF extraction, spaced-repetition scheduling, and automated tests.

## Deployment

Deploy the client as a Vite static application and the server as a Node service. Configure `GEMINI_API_KEY`, `GEMINI_MODEL`, `CLIENT_ORIGIN`, and `PORT` on the server platform.
