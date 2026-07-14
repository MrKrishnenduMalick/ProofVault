import { z } from 'zod';

export const uploadUrlSchema = z.object({
  fileName: z.string().min(1).max(255),
  mimeType: z.string().min(1).max(100),
  fileSize: z.number().positive(),
  uploadContext: z.enum(['avatar', 'project', 'resume', 'general']).default('general'),
});

export type UploadUrlInput = z.infer<typeof uploadUrlSchema>;