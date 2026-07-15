import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { app } from '../../../app/api/v1/media/route'; // Adjust path as needed
import { prisma } from '@/lib/prisma/client';

describe('Media API Integration Tests', () => {
  beforeAll(async () => {
    // Setup test database
  });

  afterAll(async () => {
    // Cleanup test database
    await prisma.$disconnect();
  });

  describe('GET /api/v1/media', () => {
    it('should return unauthorized without valid session', async () => {
      const response = await request(app)
        .get('/api/v1/media')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.status).toBe(401);
    });
  });

  describe('GET /api/v1/media/:id', () => {
    it('should return unauthorized without valid session', async () => {
      const mediaId = 'test-id';
      const response = await request(app)
        .get(`/api/v1/media/${mediaId}`)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.status).toBe(401);
    });
  });
});