import { GoogleGenAI } from '@google/genai';
import { studySchema } from '../schemas/studySchema.js';
import { systemInstruction, interviewSystemInstruction, revisionSystemInstruction } from '../prompts/studyPrompt.js';
const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export async function createStudySet(notes, mode = 'study') {
  console.log('--- Incoming Request to Gemini Service ---');
  console.log('Notes content snippet:', notes ? (notes.length > 100 ? notes.substring(0, 100) + '...' : notes) : 'None');
  console.log('Notes total length:', notes?.length || 0);
  console.log('Selected Learning Mode:', mode);

  if (!process.env.GEMINI_API_KEY) {
    console.error('API Error: GEMINI_API_KEY is missing.');
    throw new Error('CONFIGURATION');
  }

  // Select system instruction prompt based on learning mode
  let activeSystemInstruction = systemInstruction;
  if (mode === 'interview') {
    activeSystemInstruction = interviewSystemInstruction;
  } else if (mode === 'revision') {
    activeSystemInstruction = revisionSystemInstruction;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  let modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  let apiAttempts = 0;
  let jsonAttempts = 0;
  let lastError;

  while (true) {
    try {
      console.log(`\n--- Gemini API Generation Attempt (API Attempts: ${apiAttempts}, JSON Attempts: ${jsonAttempts}) ---`);
      console.log('Using model:', modelName);
      console.log('Prompt / System Instruction:', activeSystemInstruction);
      console.log('Prompt / User Content:', notes);

      const result = await ai.models.generateContent({
        model: modelName,
        contents: notes,
        config: {
          systemInstruction: activeSystemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.35,
        },
      });


      const rawText = result.text?.trim();
      console.log('Raw Gemini response:', rawText);

      let parsedJson;
      try {
        parsedJson = JSON.parse(rawText);
        console.log('Parsed JSON object successfully:', JSON.stringify(parsedJson, null, 2));
      } catch (parseError) {
        console.error('JSON parsing error:', parseError.message);
        if (jsonAttempts < 1) {
          jsonAttempts += 1;
          console.warn('Malformed JSON returned. Retrying once...');
          continue;
        }
        const err = new Error('Invalid JSON returned');
        err.details = parseError.message;
        throw err;
      }

      let validatedData;
      try {
        validatedData = studySchema.parse(parsedJson);
        return validatedData;
      } catch (validationError) {
        console.error('Validation errors:', validationError.errors || validationError.message);
        if (jsonAttempts < 1) {
          jsonAttempts += 1;
          console.warn('Schema validation failed. Retrying once...');
          continue;
        }
        const err = new Error('Schema validation failed');
        err.details = JSON.stringify(validationError.errors || validationError.message);
        throw err;
      }

    } catch (error) {
      // If it is a custom JSON parse / Schema validation error that already failed retry, throw it immediately
      if (error.message === 'Invalid JSON returned' || error.message === 'Schema validation failed') {
        throw error;
      }

      // Check if it's a model not found / no longer available error for gemini-2.5-flash
      const errorStr = String(error.message || '');
      const isModelUnavailable = error.status === 404 || errorStr.includes('gemini-2.5-flash') || errorStr.includes('no longer available');
      if (modelName === 'gemini-2.5-flash' && isModelUnavailable) {
        console.warn('WARNING: gemini-2.5-flash is no longer available. Falling back to gemini-3.5-flash.');
        modelName = 'gemini-3.5-flash';
        // Retry immediately with the new model
        continue;
      }

      // Otherwise, it is a general API or network error
      console.error('API or Network error during Gemini call:', error);
      lastError = error;

      if (apiAttempts < 2) {
        apiAttempts += 1;
        const delay = 750 * apiAttempts;
        console.warn(`API call failed. Retrying API call in ${delay}ms...`);
        await wait(delay);
        continue;
      }
      throw lastError;
    }
  }
}

