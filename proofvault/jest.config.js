module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  collectCoverageFrom: [
    'lib/**/*.{ts,tsx}',
    '!lib/types/**',
    '!lib/validation/**',
    '!lib/utils/**',
    '!lib/prisma/**',
    '!lib/auth/**', // Auth tests handled separately due to Supabase integration
    '!lib/storage/**', // Storage tests handled separately due to R2 integration
    '!lib/email/**', // Email tests handled separately due to external service
    '!lib/analytics/**', // Analytics tests handled separately due to external service
    '!lib/payments/**', // Payment tests handled separately due to external service
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
};