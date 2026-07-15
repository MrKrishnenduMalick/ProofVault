import { PortfolioService } from '@/lib/services/portfolio-service';
import { prisma } from '@/lib/prisma/client';

describe('PortfolioService', () => {
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

  describe('create', () => {
    it('should create a new portfolio', async () => {
      const userId = 'test-user-id';
      const portfolioData = {
        userId,
        slug: 'test-portfolio',
        status: 'draft' as const,
        sectionsConfig: { hero: true },
        theme: { primaryColor: '#000000' },
      };

      await prisma.users.create({
        data: { id: userId, email: 'test@example.com' }
      });

      const result = await PortfolioService.create(portfolioData);

      expect(result).toBeDefined();
      expect(result.userId).toBe(userId);
      expect(result.slug).toBe('test-portfolio');
      expect(result.status).toBe('draft');
    });
  });

  describe('updateById', () => {
    it('should update a portfolio by ID', async () => {
      const userId = 'test-user-id';
      const slug = 'test-portfolio';

      await prisma.users.create({
        data: { id: userId, email: 'test@example.com' }
      });

      const portfolio = await prisma.portfolios.create({
        data: {
          userId,
          slug,
          status: 'draft',
        },
      });

      const updatedPortfolio = await PortfolioService.updateById(
        portfolio.id,
        userId,
        {
          slug: 'updated-portfolio',
          status: 'published',
        }
      );

      expect(updatedPortfolio).toBeDefined();
      expect(updatedPortfolio.id).toBe(portfolio.id);
      expect(updatedPortfolio.slug).toBe('updated-portfolio');
      expect(updatedPortfolio.status).toBe('published');
    });

    it('should not update portfolio for non-owner', async () => {
      const userId = 'test-user-id';
      const otherUserId = 'other-user-id';
      const slug = 'test-portfolio';

      await prisma.users.create({
        data: { id: userId, email: 'test@example.com' }
      });

      await prisma.users.create({
        data: { id: otherUserId, email: 'other@example.com' }
      });

      const portfolio = await prisma.portfolios.create({
        data: {
          userId,
          slug,
          status: 'draft',
        },
      });

      await expect(
        PortfolioService.updateById(
          portfolio.id,
          otherUserId,
          {
            slug: 'updated-portfolio',
            status: 'published',
          }
        )
      ).rejects.toThrow(); // Should fail due to foreign key constraint
    });
  });

  describe('getByIdAndUserId', () => {
    it('should retrieve a portfolio by ID and user ID', async () => {
      const userId = 'test-user-id';
      const slug = 'test-portfolio';

      await prisma.users.create({
        data: { id: userId, email: 'test@example.com' }
      });

      const portfolio = await prisma.portfolios.create({
        data: {
          userId,
          slug,
          status: 'draft',
        },
      });

      const retrievedPortfolio = await PortfolioService.getByIdAndUserId(
        portfolio.id,
        userId
      );

      expect(retrievedPortfolio).toBeDefined();
      expect(retrievedPortfolio?.id).toBe(portfolio.id);
      expect(retrievedPortfolio?.userId).toBe(userId);
    });

    it('should return null for non-existent portfolio', async () => {
      const userId = 'test-user-id';
      const nonExistentId = 'non-existent-id';

      const retrievedPortfolio = await PortfolioService.getByIdAndUserId(
        nonExistentId,
        userId
      );

      expect(retrievedPortfolio).toBeNull();
    });
  });

  describe('getBySlug', () => {
    it('should retrieve a portfolio by slug', async () => {
      const userId = 'test-user-id';
      const slug = 'test-portfolio';

      await prisma.users.create({
        data: { id: userId, email: 'test@example.com' }
      });

      const portfolio = await prisma.portfolios.create({
        data: {
          userId,
          slug,
          status: 'published',
        },
      });

      const retrievedPortfolio = await PortfolioService.getBySlug(slug);

      expect(retrievedPortfolio).toBeDefined();
      expect(retrievedPortfolio?.id).toBe(portfolio.id);
      expect(retrievedPortfolio?.slug).toBe(slug);
    });

    it('should return null for non-existent slug', async () => {
      const nonExistentSlug = 'non-existent-slug';

      const retrievedPortfolio = await PortfolioService.getBySlug(nonExistentSlug);

      expect(retrievedPortfolio).toBeNull();
    });
  });

  describe('deleteById', () => {
    it('should delete a portfolio by ID', async () => {
      const userId = 'test-user-id';
      const slug = 'test-portfolio';

      await prisma.users.create({
        data: { id: userId, email: 'test@example.com' }
      });

      const portfolio = await prisma.portfolios.create({
        data: {
          userId,
          slug,
          status: 'draft',
        },
      });

      const result = await PortfolioService.deleteById(portfolio.id, userId);

      expect(result).toEqual({ success: true });

      const deletedPortfolio = await prisma.portfolios.findUnique({
        where: { id: portfolio.id },
      });
      expect(deletedPortfolio).toBeNull();
    });
  });

  describe('publish and unpublish', () => {
    it('should publish a portfolio', async () => {
      const userId = 'test-user-id';
      const slug = 'test-portfolio';

      await prisma.users.create({
        data: { id: userId, email: 'test@example.com' }
      });

      const portfolio = await prisma.portfolios.create({
        data: {
          userId,
          slug,
          status: 'draft',
        },
      });

      const publishedPortfolio = await PortfolioService.publish(portfolio.id, userId);

      expect(publishedPortfolio).toBeDefined();
      expect(publishedPortfolio.status).toBe('published');
      expect(publishedPortfolio.publishedAt).toBeDefined();
    });

    it('should unpublish a portfolio', async () => {
      const userId = 'test-user-id';
      const slug = 'test-portfolio';

      await prisma.users.create({
        data: { id: userId, email: 'test@example.com' }
      });

      const portfolio = await prisma.portfolios.create({
        data: {
          userId,
          slug,
          status: 'published',
        },
      });

      const unpublishedPortfolio = await PortfolioService.unpublish(portfolio.id, userId);

      expect(unpublishedPortfolio).toBeDefined();
      expect(unpublishedPortfolio.status).toBe('draft');
      expect(unpublishedPortfolio.publishedAt).toBeNull();
    });
  });

  describe('canPublish', () => {
    it('should return true for valid publish conditions', async () => {
      const canPublish = await PortfolioService.canPublish('some-id');
      expect(canPublish).toBe(true); // Currently always returns true in mock
    });
  });
});