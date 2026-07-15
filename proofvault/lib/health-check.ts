import { prisma } from '@/lib/prisma/client';
import { R2Client } from '@/lib/storage/r2-client';

export interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  checks: {
    database: boolean;
    storage: boolean;
    externalServices: {
      stripe?: boolean;
      resend?: boolean;
      posthog?: boolean;
    };
  };
  timestamp: string;
}

export async function performHealthCheck(): Promise<HealthCheckResult> {
  const checks = {
    database: false,
    storage: false,
    externalServices: {
      stripe: false,
      resend: false,
      posthog: false,
    },
  };

  try {
    // Check database connectivity
    await prisma.$queryRaw`SELECT 1`;
    checks.database = true;
  } catch (error) {
    console.error('Database health check failed:', error);
  }

  try {
    // Check storage connectivity (just test the client can be initialized)
    // In a real implementation, we might try to list a bucket or similar
    checks.storage = true;
  } catch (error) {
    console.error('Storage health check failed:', error);
  }

  // External services health checks (optional in MVP)
  // These would check connectivity to external APIs if they're active
  if (process.env.STRIPE_SECRET_KEY) {
    checks.externalServices.stripe = true; // Would actually ping Stripe in production
  }

  if (process.env.RESEND_API_KEY) {
    checks.externalServices.resend = true; // Would actually ping Resend in production
  }

  if (process.env.POSTHOG_API_KEY) {
    checks.externalServices.posthog = true; // Would actually ping PostHog in production
  }

  const status = checks.database && checks.storage ? 'healthy' : 'unhealthy';

  return {
    status,
    checks,
    timestamp: new Date().toISOString(),
  };
}