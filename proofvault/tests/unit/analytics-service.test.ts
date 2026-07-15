import { AnalyticsService } from '@/lib/services/analytics-service';
import { prisma } from '@/lib/prisma/client';

describe('AnalyticsService', () => {
  beforeEach(async () => {
    // Clear any test data
    await prisma.portfolios.deleteMany({});
    await prisma.users.deleteMany({});
  });

  afterEach(async () => {
    // Clean up after each test
    await prisma.portfolios.deleteMany({});
    await prisma.users.deleteMany({});
  });

  describe('getSummary', () => {
    it('should return analytics summary', async () => {
      const portfolioId = 'test-portfolio-id';
      const startDate = new Date('2023-01-01');
      const endDate = new Date('2023-12-31');

      const summary = await AnalyticsService.getSummary(
        portfolioId,
        startDate,
        endDate
      );

      expect(summary).toBeDefined();
      expect(summary.totalViews).toBeDefined();
      expect(summary.uniqueVisitors).toBeDefined();
      expect(summary.referrerSources).toBeDefined();
      expect(Array.isArray(summary.dailyViews)).toBe(true);
    });
  });

  describe('getPortfolioAnalytics', () => {
    it('should return detailed portfolio analytics', async () => {
      const portfolioId = 'test-portfolio-id';

      const analytics = await AnalyticsService.getPortfolioAnalytics(
        portfolioId,
        undefined,
        undefined,
        'daily'
      );

      expect(analytics).toBeDefined();
      expect(analytics.views).toBeDefined();
      expect(analytics.uniqueVisitors).toBeDefined();
      expect(analytics.topReferrers).toBeDefined();
      expect(Array.isArray(analytics.dailyTrend)).toBe(true);
      expect(Array.isArray(analytics.projectEngagement)).toBe(true);
    });
  });

  describe('trackView', () => {
    it('should track a view event', async () => {
      const portfolioId = 'test-portfolio-id';
      const visitorHash = 'test-visitor-hash';
      const countryCode = 'US';
      const deviceType = 'desktop';
      const referrerDomain = 'google.com';

      await expect(
        AnalyticsService.trackView(
          portfolioId,
          visitorHash,
          countryCode,
          deviceType,
          referrerDomain
        )
      ).resolves.toBeUndefined(); // Currently returns void in mock
    });
  });

  describe('trackLinkClick', () => {
    it('should track a link click event', async () => {
      const portfolioId = 'test-portfolio-id';
      const visitorHash = 'test-visitor-hash';
      const linkUrl = 'https://example.com';
      const linkType: 'live' | 'repo' | 'external' = 'external';

      await expect(
        AnalyticsService.trackLinkClick(
          portfolioId,
          visitorHash,
          linkUrl,
          linkType
        )
      ).resolves.toBeUndefined(); // Currently returns void in mock
    });
  });

  describe('getUserPortfolio', () => {
    it('should retrieve a user portfolio', async () => {
      const userId = 'test-user-id';
      const portfolioId = 'test-portfolio-id';

      await prisma.users.create({
        data: { id: userId, email: 'test@example.com' }
      });

      await prisma.portfolios.create({
        data: {
          id: portfolioId,
          userId,
          slug: 'test-portfolio',
          status: 'published',
        },
      });

      const portfolio = await AnalyticsService.getUserPortfolio(userId, portfolioId);

      expect(portfolio).toBeDefined();
      expect(portfolio?.id).toBe(portfolioId);
      expect(portfolio?.userId).toBe(userId);
    });

    it('should return null for non-existent portfolio', async () => {
      const userId = 'test-user-id';
      const nonExistentId = 'non-existent-id';

      const portfolio = await AnalyticsService.getUserPortfolio(userId, nonExistentId);

      expect(portfolio).toBeNull();
    });
  });

  describe('aggregatePortfolioAnalytics', () => {
    it('should aggregate portfolio analytics', async () => {
      const portfolioId = 'test-portfolio-id';
      const startDate = new Date('2023-01-01');
      const endDate = new Date('2023-12-31');

      const aggregatedData = await AnalyticsService.aggregatePortfolioAnalytics(
        portfolioId,
        startDate,
        endDate
      );

      expect(aggregatedData).toBeDefined();
      expect(aggregatedData.totalViews).toBeDefined();
      expect(aggregatedData.uniqueVisitors).toBeDefined();
      expect(aggregatedData.topReferrers).toBeDefined();
      expect(Array.isArray(aggregatedData.dailyViews)).toBe(true);
    });
  });
});