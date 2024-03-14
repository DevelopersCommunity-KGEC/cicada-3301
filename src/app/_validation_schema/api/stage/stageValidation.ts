import { z } from 'zod';

export const CreateStageSchema = z.object({
  questionId: z.string().min(3),
  question: z.string().min(3),
  answer: z.string().min(3).max(200),
  points: z.number().int().positive(),
  hint: z.string().min(3),
  stageId: z.number().int().positive(),
});
