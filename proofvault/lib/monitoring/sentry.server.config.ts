import * as Sentry from '@sentry/nextjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    
    // Enable Spotlight in development
    integrations: [
      nodeProfilingIntegration(),
    ],
    
    // Add optional integrations for more insights
    tracesSampleRate: 1.0,
    
    // Capture 100% of the transactions in development and in test,
    // but only 10% in production
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    
    // Capture 100% of the errors in development and in test,
    // but only 10% in production
    sampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    
    // Profiling sample rate
    profilesSampleRate: 1.0,
  });
}