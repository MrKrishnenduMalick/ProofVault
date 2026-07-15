import { z } from 'zod';

const envSchema = z.object({
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  SUPABASE_JWT_SECRET: z.string(),
  
  // Database
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url(),
  
  // R2
  R2_ACCOUNT_ID: z.string(),
  R2_ACCESS_KEY_ID: z.string(),
  R2_SECRET_ACCESS_KEY: z.string(),
  R2_BUCKET_NAME: z.string(),
  
  // Email
  RESEND_API_KEY: z.string(),
  
  // Analytics
  POSTHOG_API_KEY: z.string(),
  POSTHOG_HOST: z.string().url(),
  
  // Payments (Future)
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  
  // Monitoring
  SENTRY_DSN: z.string().url().optional(),
  
  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  
  // Node
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

export function validateEnv() {
  try {
    const parsedEnv = envSchema.parse(process.env);
    return parsedEnv;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const { fieldErrors } = error.flatten();
      const errorMessage = Object.entries(fieldErrors)
        .map(([field, errors]) => 
          errors?.length ? `${field}: ${errors.join(', ')}` : null
        )
        .filter(Boolean)
        .join('; ');
      
      console.error('❌ Invalid environment variables:', errorMessage);
      process.exit(1);
    }
    throw error;
  }
}

export const env = validateEnv();