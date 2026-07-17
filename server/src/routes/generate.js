import { Router } from 'express';
import { ZodError } from 'zod';
import { generateRequestSchema } from '../schemas/studySchema.js';
import { createStudySet } from '../services/geminiService.js';
import { createFallbackStudySet } from '../services/fallbackStudySet.js';
export const generateRouter = Router();
generateRouter.post('/generate', async (request, response) => { try { const { notes } = generateRequestSchema.parse(request.body); const studySet = await createStudySet(notes); response.json(studySet); } catch (error) { if (error instanceof ZodError) return response.status(400).json({ error: 'Please add at least a few characters before generating.' }); if (error.message === 'CONFIGURATION') return response.status(503).json({ error: 'The study assistant is not configured yet.' }); if (String(error.message).includes('UNAVAILABLE')) return response.json(createFallbackStudySet(request.body.notes)); response.status(502).json({ error: 'We could not create a study set. Please try again.' }); } });
