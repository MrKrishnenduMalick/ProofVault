import { createHash } from 'crypto';

export class AnalyticsHelpers {
  /**
   * Generates a salted hash for visitor identification
   * This ensures privacy by not storing raw IP addresses or persistent identifiers
   */
  static generateVisitorHash(ipAddress: string, userAgent: string, salt: string): string {
    const combinedString = `${ipAddress}:${userAgent}:${salt}`;
    return createHash('sha256').update(combinedString).digest('hex');
  }

  /**
   * Extracts the referrer domain from a full referrer URL
   */
  static extractReferrerDomain(referrerUrl?: string): string | null {
    if (!referrerUrl) {
      return null;
    }

    try {
      const url = new URL(referrerUrl);
      return url.hostname;
    } catch {
      // If the referrer URL is malformed, return null
      return null;
    }
  }

  /**
   * Determines device type from user agent string
   */
  static detectDeviceType(userAgent: string): 'mobile' | 'tablet' | 'desktop' | 'other' {
    const ua = userAgent.toLowerCase();
    
    if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
      return 'mobile';
    }
    
    if (/tablet|ipad/i.test(ua)) {
      return 'tablet';
    }
    
    if (/smarttv|smart-tv|googletv|appletv|netcast|roku|viera|webtv|boxee/i.test(ua)) {
      return 'other';
    }
    
    return 'desktop';
  }

  /**
   * Determines country code from IP address
   * In a real implementation, this would use a geolocation service
   */
  static async getCountryCodeFromIp(ipAddress: string): Promise<string | null> {
    // In a real implementation, this would call a geolocation API
    // For now, we're returning a mock value
    return 'US';
  }
}