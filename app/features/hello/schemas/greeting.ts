import { z } from "zod";

export const greetingSchema = z.object({
  message: z.string().min(1),
  source: z.literal("development-api"),
});

export type Greeting = z.infer<typeof greetingSchema>;
