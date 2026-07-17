import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { generateRouter } from './routes/generate.js';

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: true,
  credentials: true
}));

// Handle OPTIONS preflight requests globally
app.options('*', cors({
  origin: true,
  credentials: true
}));

app.use(express.json({ limit: '1mb' }));

app.use('/api', generateRouter);

app.get('/api/health', (_request, response) => response.json({ status: 'ok' }));

// Global error handler with CORS support to prevent browser from hiding server errors
app.use((err, req, res, next) => {
  console.error('Global Error Handler caught:', err);
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'An unexpected error occurred on the server.',
    details: err.details || String(err)
  });
});

const port = process.env.PORT ?? 8787;
app.listen(port, () => console.log(`StudySpark API listening on ${port}`));


