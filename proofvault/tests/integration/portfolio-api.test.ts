import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { app } from '../../../app/api/v1/portfolios/route'; // Adjust path as needed
import { prisma } from '@/lib/prisma/client';

describe('Portfolio API Integration Tests', () => {
  beforeAll(async () => {
    // Setup test database
  });

  afterAll(async () => {
    // Cleanup test database
    await prisma.$disconnect();
  });

  describe('GET /api/v1/portfolios', () => {
    it('should return unauthorized without valid session', async () => {
      const response = await request(app)
        .get('/api/v1/portfolios')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.status).toBe(401);
    });
  });

  describe('GET /api/v1/portfolios/:id', () => {
    it('should return unauthorized without valid session', async () => {
      const portfolioId = 'test-id';
      const response = await request(app)
        .get(`/api/v1/portfolios/${portfolioId}`)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.status).toBe(401);
    });
  });
});