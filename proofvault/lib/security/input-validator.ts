import { z } from 'zod';

// Common validation schemas
export const commonSchemas = {
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  slug: z.string().min(3).max(50).regex(/^[a-z0-9-]+$/, {
    message: 'Slug must contain only lowercase letters, numbers, and hyphens'
  }),
  url: z.string().url('Invalid URL format'),
  id: z.string().uuid('Invalid ID format'),
};

// Validate file uploads
export function validateFileUpload(
  fileName: string,
  mimeType: string,
  fileSize: number,
  maxFileSize: number = 10 * 1024 * 1024 // 10MB default
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate file size
  if (fileSize > maxFileSize) {
    errors.push(`File size exceeds maximum allowed size of ${maxFileSize / (1024 * 1024)}MB`);
  }

  // Validate file extension based on MIME type
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'application/zip'
  ];

  if (!allowedTypes.includes(mimeType)) {
    errors.push(`File type ${mimeType} is not allowed`);
  }

  // Validate file name
  if (!fileName || fileName.length > 255) {
    errors.push('File name is too long (maximum 255 characters)');
  }

  // Prevent directory traversal
  if (fileName.includes('../') || fileName.includes('..\\')) {
    errors.push('Invalid file name');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Sanitize user input
export function sanitizeInput(input: string): string {
  // Basic HTML sanitization - in a real app, use a dedicated library like DOMPurify
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}