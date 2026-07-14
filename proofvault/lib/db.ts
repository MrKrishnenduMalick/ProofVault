// Database utility functions
import { prisma } from './prisma/client';

export async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log('Connected to database successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

export async function disconnectFromDatabase() {
  await prisma.$disconnect();
}