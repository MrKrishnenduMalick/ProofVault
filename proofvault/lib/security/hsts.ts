export function generateHSTSHeader(): string {
  // Strict Transport Security header
  // Enforce HTTPS for 1 year, include subdomains, and preload
  return 'max-age=31536000; includeSubDomains; preload';
}