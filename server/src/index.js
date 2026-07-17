import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { generateRouter } from './routes/generate.js';

const app = express();
const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  'http://localhost:5173',
  'http://localhost:5174'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json({ limit: '1mb' }));
app.use('/api', generateRouter);

app.get('/api/health', (_request, response) => response.json({ status: 'ok' }));

const port = process.env.PORT ?? 8787;
app.listen(port, () => console.log(`StudySpark API listening on ${port}`));

