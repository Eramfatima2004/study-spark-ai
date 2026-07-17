import { GoogleGenAI } from '@google/genai';
import { studySchema } from '../schemas/studySchema.js';
import { systemInstruction } from '../prompts/studyPrompt.js';
const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export async function createStudySet(notes) {
  if (!process.env.GEMINI_API_KEY) throw new Error('CONFIGURATION');
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  let lastError;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const result = await ai.models.generateContent({ model: process.env.GEMINI_MODEL || 'gemini-3.5-flash', contents: notes, config: { systemInstruction, responseMimeType: 'application/json', temperature: 0.35 } });
      return studySchema.parse(JSON.parse(result.text?.trim()));
    } catch (error) {
      lastError = error;
      if (attempt < 2) await wait(750 * (attempt + 1));
    }
  }
  throw lastError;
}
