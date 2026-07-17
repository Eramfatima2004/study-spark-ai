import { Router } from 'express';
import { ZodError } from 'zod';
import { generateRequestSchema } from '../schemas/studySchema.js';
import { createStudySet } from '../services/geminiService.js';
import { createFallbackStudySet } from '../services/fallbackStudySet.js';
export const generateRouter = Router();

generateRouter.post('/generate', async (request, response) => {
  console.log('\n=========================================');
  console.log('Incoming POST request to /api/generate');
  console.log('Request Body:', JSON.stringify(request.body, null, 2));
  console.log('=========================================');

  try {
    const { notes } = generateRequestSchema.parse(request.body);
    const studySet = await createStudySet(notes);
    response.json(studySet);
  } catch (error) {
    console.error('Error in /api/generate route:', error);

    if (error instanceof ZodError) {
      return response.status(400).json({
        success: false,
        message: 'Please add at least a few characters before generating.',
        details: JSON.stringify(error.errors || error.message)
      });
    }

    if (error.message === 'CONFIGURATION') {
      return response.status(503).json({
        success: false,
        message: 'Gemini API key missing',
        details: 'The study assistant is not configured yet. GEMINI_API_KEY environment variable is not set on the server.'
      });
    }

    const errorStr = String(error.message || '');
    const isRateLimit = error.status === 429 || errorStr.includes('quota') || errorStr.includes('Rate limit') || errorStr.includes('RESOURCE_EXHAUSTED') || errorStr.includes('429');
    
    if (isRateLimit) {
      console.warn('Gemini API rate limit exceeded. Using rich local fallback.');
      return response.json(createFallbackStudySet(request.body.notes));
    }

    if (error.message === 'Invalid JSON returned' || error.message === 'Schema validation failed') {
      return response.status(502).json({
        success: false,
        message: error.message,
        details: error.details || 'The model output was malformed and failed schema validation after retries.'
      });
    }

    if (errorStr.includes('UNAVAILABLE')) {
      console.warn('Gemini service is unavailable. Using rich local fallback.');
      return response.json(createFallbackStudySet(request.body.notes));
    }

    // Default general error
    response.status(502).json({
      success: false,
      message: 'We could not create a study set. Please try again.',
      details: error.message || String(error)
    });
  }
});



