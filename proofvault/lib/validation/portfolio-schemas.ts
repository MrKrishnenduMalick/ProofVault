import { z } from 'zod';

const sectionsConfigSchema = z.object({
  hero: z.boolean().optional(),
  about: z.boolean().optional(),
  projects: z.boolean().optional(),
  skills: z.boolean().optional(),
  experience: z.boolean().optional(),
  education: z.boolean().optional(),
  contact: z.boolean().optional(),
});

const themeSchema = z.object({
  primaryColor: z.string().optional(),
  fontSize: z.string().optional(),
  layout: z.string().optional(),
});

export const portfolioCreateSchema = z.object({
  slug: z.string().min(3).max(50).regex(/^[a-z0-9-]+$/, {
    message: 'Slug must contain only lowercase letters, numbers, and hyphens',
  }),
  sectionsConfig: sectionsConfigSchema.optional(),
  theme: themeSchema.optional(),
});

export const portfolioUpdateSchema = z.object({
  slug: z.string().min(3).max(50).regex(/^[a-z0-9-]+$/, {
    message: 'Slug must contain only lowercase letters, numbers, and hyphens',
  }).optional(),
  sectionsConfig: sectionsConfigSchema.optional(),
  theme: themeSchema.optional(),
});

export type PortfolioCreateInput = z.infer<typeof portfolioCreateSchema>;
export type PortfolioUpdateInput = z.infer<typeof portfolioUpdateSchema>;