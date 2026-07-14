// Sanitize output to prevent XSS
export function sanitizeOutput(content: string): string {
  // Basic HTML sanitization - in a real app, use a dedicated library like DOMPurify
  if (typeof content !== 'string') {
    return '';
  }

  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/<[^>]*>/g, (match) => {
      // Allow only safe HTML tags
      const safeTags = ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      const tagMatch = match.match(/<\s*(\/?)\s*([a-zA-Z]+)/);
      
      if (tagMatch) {
        const isClosing = tagMatch[1] === '/';
        const tagName = tagMatch[2].toLowerCase();
        
        if (safeTags.includes(tagName) || isClosing) {
          return match;
        }
      }
      
      return '';
    });
}