// Setup file for Jest tests
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

const prisma = new PrismaClient();

beforeAll(async () => {
  // Reset database to a clean state before running tests
  execSync('npx prisma migrate reset --force', { stdio: 'pipe' });
  execSync('npx prisma db seed', { stdio: 'pipe' });
});

afterAll(async () => {
  await prisma.$disconnect();
});