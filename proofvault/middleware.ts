import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/auth/middleware';
import { rateLimiter } from '@/lib/middleware/rate-limiter';
import { generateCSPHeader } from '@/lib/security/csp';
import { generateHSTSHeader } from '@/lib/security/hsts';

export async function middleware(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await rateLimiter(request);
  if (rateLimitResult.response) {
    return rateLimitResult.response;
  }

  // Update session (authentication middleware)
  let response = await updateSession(request);

  // Add security headers
  if (!response.headers.has('Content-Security-Policy')) {
    response.headers.set('Content-Security-Policy', generateCSPHeader());
  }
  
  if (!response.headers.has('Strict-Transport-Security')) {
    response.headers.set('Strict-Transport-Security', generateHSTSHeader());
  }
  
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public API routes (like webhooks)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(svg|png|jpg|jpeg|gif|webp)$|^/api/v1/public|^/api/v1/webhooks).*)',
  ],
};