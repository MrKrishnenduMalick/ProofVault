export function generateCSPHeader(): string {
  // Define the Content Security Policy
  const directives = {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'", // Required for Next.js dynamic imports
      'https://*.supabase.co', // Supabase
      'https://*.resend.com', // Resend
      'https://*.stripe.com', // Stripe
      'https://*.cloudflareinsights.com', // Cloudflare
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'", // Required for Tailwind CSS
      'https://fonts.googleapis.com',
    ],
    'font-src': [
      "'self'",
      'https://fonts.gstatic.com',
    ],
    'img-src': [
      "'self'",
      'data:',
      'blob:',
      'https://r2.cloudflarestorage.com', // R2 storage
      'https://*.supabase.co', // Supabase avatars
      'https://*.gravatar.com', // Gravatar
    ],
    'connect-src': [
      "'self'",
      'https://*.supabase.co', // Supabase
      'https://*.resend.com', // Resend
      'https://*.stripe.com', // Stripe
      'https://*.posthog.com', // PostHog
      'https://*.sentry.io', // Sentry
    ],
    'frame-src': [
      'https://*.stripe.com', // Stripe
    ],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    'upgrade-insecure-requests': [], // Uncomment if HTTPS is enforced
  };

  // Convert directives to CSP string
  const cspString = Object.entries(directives)
    .map(([directive, values]) => {
      if (values.length === 0) {
        return `${directive};`;
      }
      return `${directive} ${values.join(' ')};`;
    })
    .join(' ');

  return cspString;
}