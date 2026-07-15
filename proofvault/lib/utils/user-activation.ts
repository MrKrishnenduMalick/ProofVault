import { prisma } from '@/lib/prisma/client';
import { FunnelTrackingService } from '@/lib/analytics/funnel-tracking';

export class UserActivationService {
  /**
   * Checks if a user has completed key activation milestones
   */
  static async checkUserActivation(userId: string): Promise<{
    emailVerified: boolean;
    profileComplete: boolean;
    hasProjects: boolean;
    portfolioPublished: boolean;
    overallScore: number;
  }> {
    // Check if email is verified
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: { emailVerifiedAt: true },
    });

    const emailVerified = !!user?.emailVerifiedAt;

    // Check if profile is complete
    const profile = await prisma.profiles.findUnique({
      where: { userId },
      select: { 
        displayName: true, 
        headline: true, 
        bio: true,
        avatarMediaId: true,
      },
    });

    const profileComplete = !!(profile?.displayName && profile.headline && profile.bio);

    // Check if user has projects
    const projectCount = await prisma.projects.count({
      where: { 
        portfolios: { 
          some: { userId } 
        } 
      },
    });

    const hasProjects = projectCount > 0;

    // Check if portfolio is published
    const publishedPortfolio = await prisma.portfolios.findFirst({
      where: { 
        userId, 
        status: 'published' 
      },
    });

    const portfolioPublished = !!publishedPortfolio;

    // Calculate overall activation score
    const score = [
      emailVerified ? 25 : 0,
      profileComplete ? 25 : 0,
      hasProjects ? 25 : 0,
      portfolioPublished ? 25 : 0,
    ].reduce((sum, val) => sum + val, 0);

    return {
      emailVerified,
      profileComplete,
      hasProjects,
      portfolioPublished,
      overallScore: score,
    };
  }

  /**
   * Triggers onboarding completion notifications
   */
  static async triggerOnboardingCompletion(userId: string) {
    const activation = await this.checkUserActivation(userId);

    // If user has completed all steps, mark as fully activated
    if (activation.overallScore === 100) {
      // In a real implementation, this would:
      // 1. Send a congratulatory notification
      // 2. Potentially trigger a survey
      // 3. Log the completion event
      console.log(`User ${userId} completed onboarding with 100% activation`);

      // Track the completion in the funnel
      await FunnelTrackingService.trackFunnelStep(userId, 'portfolio_published');
    }
  }

  /**
   * Gets user activation recommendations
   */
  static async getActivationRecommendations(userId: string): Promise<string[]> {
    const activation = await this.checkUserActivation(userId);
    const recommendations: string[] = [];

    if (!activation.emailVerified) {
      recommendations.push('Verify your email address to unlock publishing');
    }

    if (!activation.profileComplete) {
      recommendations.push('Complete your profile with a name, headline, and bio');
    }

    if (!activation.hasProjects) {
      recommendations.push('Add your first project to showcase your work');
    }

    if (!activation.portfolioPublished) {
      recommendations.push('Publish your portfolio to make it publicly accessible');
    }

    return recommendations;
  }
}