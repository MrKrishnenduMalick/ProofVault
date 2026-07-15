import { capture } from '@sentry/nextjs';
import { prisma } from '@/lib/prisma/client';

export class FunnelTrackingService {
  /**
   * Tracks a step in the user activation funnel
   */
  static async trackFunnelStep(
    userId: string,
    step: 'signed_up' | 'email_verified' | 'profile_completed' | 'first_project_created' | 'portfolio_published',
    properties?: Record<string, any>
  ) {
    try {
      // Log the funnel step in the database for analytics
      await prisma.funnel_events.create({
        data: {
          userId,
          step,
          properties: properties || {},
          occurredAt: new Date(),
        },
      });

      // Also send to PostHog for product analytics
      // In a real implementation, this would call the PostHog client
      console.log(`Funnel step tracked: ${step} for user ${userId}`, properties);
    } catch (error) {
      console.error('Error tracking funnel step:', error);
      // Still capture in Sentry even if DB fails
      captureException(error, {
        contexts: {
          funnel: {
            userId,
            step,
            properties,
          },
        },
      });
    }
  }

  /**
   * Gets funnel conversion data
   */
  static async getFunnelData(
    startDate: Date,
    endDate: Date
  ): Promise<{
    steps: Array<{
      step: string;
      count: number;
      conversionRate: number;
    }>;
    totalUsers: number;
  }> {
    // In a real implementation, this would query the funnel_events table
    // For now, we're returning mock data
    return {
      totalUsers: 150,
      steps: [
        {
          step: 'signed_up',
          count: 150,
          conversionRate: 100,
        },
        {
          step: 'email_verified',
          count: 142,
          conversionRate: 94.7,
        },
        {
          step: 'profile_completed',
          count: 128,
          conversionRate: 85.3,
        },
        {
          step: 'first_project_created',
          count: 115,
          conversionRate: 76.7,
        },
        {
          step: 'portfolio_published',
          count: 98,
          conversionRate: 65.3,
        },
      ],
    };
  }

  /**
   * Gets user activation metrics
   */
  static async getUserActivationMetrics(
    userId: string
  ): Promise<{
    completedSteps: string[];
    totalSteps: number;
    completionRate: number;
  }> {
    // In a real implementation, this would query the funnel_events table for this user
    // For now, we're returning mock data
    return {
      completedSteps: ['signed_up', 'email_verified', 'profile_completed', 'first_project_created'],
      totalSteps: 5,
      completionRate: 80,
    };
  }
}