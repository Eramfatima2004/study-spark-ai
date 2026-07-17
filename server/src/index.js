import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { generateRouter } from './routes/generate.js';

const app = express();
app.use(cors({
  origin: true
}));
app.use(express.json({ limit: '1mb' }));
app.use('/api', generateRouter);

app.get('/api/health', (_request, response) => response.json({ status: 'ok' }));

const port = process.env.PORT ?? 8787;
app.listen(port, () => console.log(`StudySpark API listening on ${port}`));

