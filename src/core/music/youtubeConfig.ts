// YouTube configuration
export const YOUTUBE_CONFIG = {
  apiKey: process.env.VITE_YOUTUBE_API_KEY || '',
  clientId: process.env.VITE_YOUTUBE_CLIENT_ID || ''
}

// Check if YouTube credentials are configured
export const isYouTubeConfigured = (): boolean => {
  return !!(YOUTUBE_CONFIG.apiKey && YOUTUBE_CONFIG.clientId)
}
