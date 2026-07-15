import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { app } from '../../../app/api/v1/auth/session/route'; // Adjust path as needed
import { prisma } from '@/lib/prisma/client';

describe('Auth API Integration Tests', () => {
  beforeAll(async () => {
    // Setup test database
  });

  afterAll(async () => {
    // Cleanup test database
    await prisma.$disconnect();
  });

  describe('GET /api/v1/auth/session', () => {
    it('should return unauthorized without valid session', async () => {
      const response = await request(app)
        .get('/api/v1/auth/session')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.status).toBe(401);
    });
  });

  describe('POST /api/v1/auth/logout', () => {
    it('should return unauthorized without valid session', async () => {
      const response = await request(app)
        .post('/api/v1/auth/logout')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.status).toBe(401);
    });
  });
});