/**
 * API Configuration
 * Determines API endpoints based on current environment
 */

export const API_CONFIG = {
  // OAuth & YouTube API
  get OAUTH_URL() {
    if (typeof window === 'undefined') return '';
    
    // Development localhost
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:3001';
    }
    
    // Production
    if (window.location.hostname === 'cloudhop.cloud') {
      return 'https://cloudhop.cloud:3001'; // Or use your production OAuth server
    }
    
    // Fallback
    return 'http://localhost:3001';
  },

  // GameMonetize Feed (with CORS proxy)
  get GAMEMONETIZE_FEED() {
    // Use allorigins proxy to bypass CORS
    const feedUrl = 'https://gamemonetize.com/feed.php?format=1&page=1';
    return `https://api.allorigins.win/raw?url=${encodeURIComponent(feedUrl)}`;
  },

  // Subscription/Payments API
  get API_URL() {
    if (typeof window === 'undefined') return '';
    
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:3002';
    }
    
    if (window.location.hostname === 'cloudhop.cloud') {
      return 'https://cloudhop.cloud:3002';
    }
    
    return 'http://localhost:3002';
  },
};

export default API_CONFIG;
