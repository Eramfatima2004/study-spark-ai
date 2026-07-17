import { z } from 'zod';
export const studyResponseSchema = z.object({
  title: z.string().min(1), description: z.string().min(1), summary: z.string().min(1),
  flashcards: z.array(z.object({ id: z.union([z.string(), z.number()]), question: z.string().min(1), answer: z.string().min(1) })).min(1),
  quiz: z.array(z.object({ id: z.union([z.string(), z.number()]), question: z.string().min(1), options: z.array(z.string().min(1)).length(4), correctAnswer: z.string().min(1), explanation: z.string().min(1) })).min(1),
  keyPoints: z.array(z.string().min(1)).min(1),
});
