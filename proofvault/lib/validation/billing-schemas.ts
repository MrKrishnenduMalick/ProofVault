import { z } from 'zod';

export const createCheckoutSessionSchema = z.object({
  plan: z.enum(['free', 'professional', 'enterprise']),
  returnUrl: z.string().url(),
});

export const updateSubscriptionSchema = z.object({
  plan: z.enum(['free', 'professional', 'enterprise']),
});

export type CreateCheckoutSessionInput = z.infer<typeof createCheckoutSessionSchema>;
export type UpdateSubscriptionInput = z.infer<typeof updateSubscriptionSchema>;