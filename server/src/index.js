import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { generateRouter } from './routes/generate.js';

const app = express();

// Parse and normalize allowed origins
const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  'https://study-spark-ai-client.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5178',
  'http://localhost:3000'
].filter(Boolean).map(origin => {
  try {
    const url = new URL(origin);
    return `${url.protocol}//${url.host}`;
  } catch (e) {
    return origin.replace(/\/$/, '');
  }
});

// Configure production-ready CORS options
const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Handle OPTIONS preflight requests globally
app.options('*', cors(corsOptions));

app.use(express.json({ limit: '1mb' }));

app.use('/api', generateRouter);

app.get('/api/health', (_request, response) => response.json({ status: 'ok', version: 'cors-v3' }));

// Global error handler with CORS support to prevent browser from hiding server errors
app.use((err, req, res, next) => {
  console.error('Global Error Handler caught:', err);
  const origin = req.headers.origin;
  if (origin) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  }
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'An unexpected error occurred on the server.',
    details: err.details || String(err)
  });
});

const port = process.env.PORT ?? 8787;
app.listen(port, () => console.log(`StudySpark API listening on ${port}`));



