import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;