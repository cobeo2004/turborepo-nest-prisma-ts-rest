import { z } from "zod";

export const todoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
});

export type Todo = z.infer<typeof todoSchema>;
