// Security validation utilities for CloudHop
export class SecurityValidator {
  // Input validation patterns
  private static readonly ALPHANUMERIC_UNDERSCORE = /^[a-zA-Z0-9_]{1,25}$/;
  private static readonly ALPHANUMERIC_SPACE = /^[a-zA-Z0-9\s]{1,30}$/;
  private static readonly URL_SAFE = /^[a-zA-Z0-9\-._~:/?#\[\]@!$&'()*+,;=%]*$/;

  // Channel name validation
  static validateChannel(channel: string): string {
    if (typeof channel !== 'string') {
      throw new Error('Channel must be a string');
    }
    
    if (!channel || channel.length === 0) {
      throw new Error('Channel name cannot be empty');
    }
    
    if (!this.ALPHANUMERIC_UNDERSCORE.test(channel)) {
      throw new Error('Invalid channel name format. Only alphanumeric characters and underscores allowed');
    }
    
    return channel.toLowerCase();
  }

  // Theme validation
  static validateTheme(theme: string): 'dark' | 'light' {
    if (theme !== 'dark' && theme !== 'light') {
      return 'dark';
    }
    return theme;
  }

  // URL validation
  static validateUrl(url: string): boolean {
    try {
      new URL(url);
      return this.URL_SAFE.test(url);
    } catch {
      return false;
    }
  }

  // Input sanitization
  static sanitizeInput(input: string): string {
    if (typeof input !== 'string') {
      return '';
    }
    
    return input
      .replace(/[<>]/g, '') // Remove potential HTML
      .trim()
      .substring(0, 1000); // Limit length
  }

  // Secure URL encoding
  static secureEncodeURIComponent(str: string): string {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
  }

  // Rate limiting helper
  static createRateLimiter(maxRequests: number, windowMs: number) {
    const requests: number[] = [];
    
    return {
      checkLimit: (): boolean => {
        const now = Date.now();
        const recentRequests = requests.filter(time => now - time < windowMs);
        
        if (recentRequests.length >= maxRequests) {
          throw new Error(`Rate limit exceeded. Max ${maxRequests} requests per ${windowMs}ms`);
        }
        
        requests.push(now);
        return true;
      }
    };
  }
}
