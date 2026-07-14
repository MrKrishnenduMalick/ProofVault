// Shared type definitions across the application

export interface User {
  id: string;
  email: string;
  emailVerifiedAt?: Date | null;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface Profile {
  id: string;
  userId: string;
  displayName?: string;
  headline?: string;
  bio?: string;
  location?: string;
  avatarMediaId?: string | null;
  websiteUrl?: string | null;
  socialLinks?: Record<string, string> | null;
  resumeMediaId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Portfolio {
  id: string;
  userId: string;
  slug: string;
  status: 'draft' | 'published';
  sectionsConfig?: any;
  theme?: any;
  publishedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface Project {
  id: string;
  portfolioId: string;
  title: string;
  description: string;
  coverMediaId?: string | null;
  liveUrl?: string | null;
  repoUrl?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  featured: boolean;
  sortOrder: number;
  status: 'active' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface MediaFile {
  id: string;
  userId: string;
  r2Key: string;
  mimeType: string;
  fileSizeBytes: number;
  originalFilename: string;
  altText?: string;
  createdAt: Date;
  deletedAt?: Date | null;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  status: number;
  message: string;
  data?: T;
  meta?: Record<string, any>;
  requestId: string;
  timestamp: string;
}