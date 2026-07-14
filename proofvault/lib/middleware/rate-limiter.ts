import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Using in-memory store for demo purposes
// In production, use Redis or similar
const inMemoryStore = new Map();

interface RateLimitResult {
  allowed: boolean;
  resetTime: number;
  remaining: number;
  response?: NextResponse;
}

export async function rateLimiter(request: NextRequest): Promise<RateLimitResult> {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  
  // Different rate limits for different endpoint classes
  const url = request.nextUrl.pathname;
  let maxRequests = 100; // Default
  let windowMs = 15 * 60 * 1000; // 15 minutes

  if (url.includes('/api/v1/auth')) {
    // Strict rate limiting for auth endpoints
    maxRequests = 5;
    windowMs = 15 * 60 * 1000; // 15 minutes
  } else if (url.includes('/api/v1/public')) {
    // Generous rate limiting for public portfolio reads
    maxRequests = 1000;
    windowMs = 60 * 60 * 1000; // 1 hour
  } else if (url.includes('/api/v1/media')) {
    // Moderate rate limiting for media endpoints
    maxRequests = 50;
    windowMs = 15 * 60 * 1000; // 15 minutes
  }

  const key = `${ip}:${url}`;
  const now = Date.now();
  const windowStart = now - windowMs;

  // Get or initialize the record
  let record = inMemoryStore.get(key);
  if (!record) {
    record = { hits: [], resetTime: now + windowMs };
    inMemoryStore.set(key, record);
  }

  // Clean old hits
  record.hits = record.hits.filter(timestamp => timestamp > windowStart);

  // Check if limit exceeded
  if (record.hits.length >= maxRequests) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    
    const response = new NextResponse(JSON.stringify({
      success: false,
      status: 429,
      message: 'Too many requests',
      meta: { retryAfter },
      requestId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': retryAfter.toString(),
      },
    });
    
    return {
      allowed: false,
      resetTime: record.resetTime,
      remaining: 0,
      response,
    };
  }

  // Add hit and update record
  record.hits.push(now);
  inMemoryStore.set(key, record);

  return {
    allowed: true,
    resetTime: record.resetTime,
    remaining: maxRequests - record.hits.length,
  };
}