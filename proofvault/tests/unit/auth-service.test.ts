import { AuthService } from '@/lib/services/auth-service';
import { prisma } from '@/lib/prisma/client';

describe('AuthService', () => {
  beforeEach(async () => {
    // Clear any test data
    await prisma.profiles.deleteMany({});
    await prisma.portfolios.deleteMany({});
    await prisma.users.deleteMany({});
  });

  afterEach(async () => {
    // Clean up after each test
    await prisma.profiles.deleteMany({});
    await prisma.portfolios.deleteMany({});
    await prisma.users.deleteMany({});
  });

  describe('createUserProfile', () => {
    it('should create a user profile and default portfolio', async () => {
      const userId = 'test-user-id';
      const email = 'test@example.com';

      await AuthService.createUserProfile(userId, email);

      // Check that profile was created
      const profile = await prisma.profiles.findUnique({
        where: { id: userId },
      });
      expect(profile).toBeDefined();
      expect(profile?.userId).toBe(userId);
      expect(profile?.displayName).toBe('test'); // From email split

      // Check that portfolio was created
      const portfolio = await prisma.portfolios.findFirst({
        where: { userId },
      });
      expect(portfolio).toBeDefined();
      expect(portfolio?.userId).toBe(userId);
      expect(portfolio?.status).toBe('draft');
    });

    it('should handle profile creation failure gracefully', async () => {
      // Test with invalid userId to trigger potential error
      await expect(AuthService.createUserProfile('', 'invalid-email')).rejects.toThrow();
    });
  });

  describe('checkUserResourceAccess', () => {
    it('should return true for valid user portfolio access', async () => {
      const userId = 'test-user-id';
      const email = 'test@example.com';
      
      await AuthService.createUserProfile(userId, email);
      
      const portfolio = await prisma.portfolios.findFirst({
        where: { userId },
      });
      
      const hasAccess = await AuthService.checkUserResourceAccess(
        userId,
        portfolio!.id,
        'portfolio'
      );
      
      expect(hasAccess).toBe(true);
    });

    it('should return false for invalid user portfolio access', async () => {
      const userId = 'test-user-id';
      const otherUserId = 'other-user-id';
      const email = 'test@example.com';
      
      await AuthService.createUserProfile(userId, email);
      await AuthService.createUserProfile(otherUserId, 'other@example.com');
      
      const portfolio = await prisma.portfolios.findFirst({
        where: { userId: otherUserId },
      });
      
      const hasAccess = await AuthService.checkUserResourceAccess(
        userId,
        portfolio!.id,
        'portfolio'
      );
      
      expect(hasAccess).toBe(false);
    });
  });

  describe('getUserRole', () => {
    it('should return user role', async () => {
      const userId = 'test-user-id';
      const email = 'test@example.com';
      
      await AuthService.createUserProfile(userId, email);
      
      // Update user role to admin for testing
      await prisma.users.update({
        where: { id: userId },
        data: { role: 'admin' },
      });
      
      const role = await AuthService.getUserRole(userId);
      expect(role).toBe('admin');
    });

    it('should return default user role if not set', async () => {
      const userId = 'test-user-id';
      const email = 'test@example.com';
      
      await AuthService.createUserProfile(userId, email);
      
      const role = await AuthService.getUserRole(userId);
      expect(role).toBe('user');
    });
  });
});