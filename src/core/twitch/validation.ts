// Twitch Input Validation and Security
export class TwitchValidator {
  static validateChannel(channel: string): string {
    if (typeof channel !== 'string') {
      throw new Error('Channel must be a string');
    }

    // Remove whitespace and validate format
    const cleanChannel = channel.trim();
    if (!/^[a-zA-Z0-9_]{1,25}$/.test(cleanChannel)) {
      throw new Error(
        'Invalid channel name format: must be 1-25 characters, alphanumeric and underscores only'
      );
    }

    return cleanChannel.toLowerCase();
  }

  static validateTheme(theme: string): 'dark' | 'light' {
    if (theme !== 'dark' && theme !== 'light') {
      return 'dark';
    }
    return theme;
  }

  static validateClientId(clientId: string): string {
    if (typeof clientId !== 'string' || clientId.length === 0) {
      throw new Error('Client ID must be a non-empty string');
    }

    // Basic format validation for Twitch client IDs
    if (!/^[a-zA-Z0-9]+$/.test(clientId)) {
      throw new Error('Invalid client ID format');
    }

    return clientId;
  }

  static sanitizeString(input: string, maxLength: number = 1000): string {
    if (typeof input !== 'string') {
      throw new Error('Input must be a string');
    }

    // Remove potentially dangerous characters
    const sanitized = input
      .replace(/[<>]/g, '') // Remove HTML brackets
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/data:/gi, '') // Remove data: protocol
      .trim()
      .substring(0, maxLength);

    return sanitized;
  }
}
