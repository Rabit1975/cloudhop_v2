// YouTube Data API v3 OAuth 2.0 Implementation
// Full user login ability with proper OAuth flow

export interface YouTubeOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export interface YouTubeAuthToken {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

export interface YouTubeUserProfile {
  id: string;
  email: string;
  name: string;
  picture: string;
  verified: boolean;
}

class YouTubeOAuth {
  private config: YouTubeOAuthConfig;
  private token: YouTubeAuthToken | null = null;
  private user: YouTubeUserProfile | null = null;

  constructor() {
    this.config = {
      clientId: import.meta.env.VITE_YOUTUBE_CLIENT_ID || '',
      clientSecret: import.meta.env.VITE_YOUTUBE_CLIENT_SECRET || '',
      redirectUri: import.meta.env.VITE_YOUTUBE_REDIRECT_URI || `${window.location.origin}/auth/youtube/callback`
    };
  }

  // Get OAuth URL for user consent
  getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      scope: [
        'https://www.googleapis.com/auth/youtube.readonly',
        'https://www.googleapis.com/auth/youtube',
        'https://www.googleapis.com/auth/youtubepartner',
        'https://www.googleapis.com/auth/youtube.force-ssl'
      ].join(' '),
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent'
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  // Exchange authorization code for tokens
  async exchangeCodeForToken(code: string): Promise<YouTubeAuthToken> {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: this.config.redirectUri,
      }),
    });

    if (!response.ok) {
      throw new Error(`Token exchange failed: ${response.statusText}`);
    }

    const token = await response.json();
    this.token = token;
    
    // Store in localStorage for persistence
    localStorage.setItem('youtube_token', JSON.stringify(token));
    
    return token;
  }

  // Refresh access token
  async refreshToken(): Promise<YouTubeAuthToken> {
    if (!this.token?.refresh_token) {
      throw new Error('No refresh token available');
    }

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        refresh_token: this.token.refresh_token,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.statusText}`);
    }

    const newToken = await response.json();
    this.token = { ...this.token, ...newToken };
    
    localStorage.setItem('youtube_token', JSON.stringify(this.token));
    
    return this.token;
  }

  // Get current valid access token
  async getAccessToken(): Promise<string> {
    if (!this.token) {
      const stored = localStorage.getItem('youtube_token');
      if (stored) {
        this.token = JSON.parse(stored);
      } else {
        throw new Error('No authentication token available');
      }
    }

    // Check if token is expired
    if (this.isTokenExpired()) {
      await this.refreshToken();
    }

    return this.token.access_token;
  }

  // Check if token is expired
  private isTokenExpired(): boolean {
    if (!this.token) return true;
    
    const expiresAt = (this.token.expires_in * 1000) + Date.now();
    return Date.now() >= expiresAt - 60000; // Refresh 1 minute early
  }

  // Get user profile
  async getUserProfile(): Promise<YouTubeUserProfile> {
    const token = await this.getAccessToken();
    
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token}`
    );

    if (!response.ok) {
      throw new Error(`Failed to get user profile: ${response.statusText}`);
    }

    const userData = await response.json();
    this.user = {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      picture: userData.picture,
      verified: userData.verified_email
    };

    return this.user;
  }

  // Check if authenticated
  isAuthenticated(): boolean {
    return !!this.token && !this.isTokenExpired();
  }

  // Logout
  logout(): void {
    this.token = null;
    this.user = null;
    localStorage.removeItem('youtube_token');
  }

  // Get current user
  getCurrentUser(): YouTubeUserProfile | null {
    return this.user;
  }
}

// YouTube Data API v3 Client
export class YouTubeDataAPI {
  private oauth: YouTubeOAuth;
  private apiKey: string;

  constructor(oauth: YouTubeOAuth, apiKey: string) {
    this.oauth = oauth;
    this.apiKey = apiKey;
  }

  // Search YouTube Music
  async searchMusic(query: string, maxResults = 25): Promise<any[]> {
    try {
      const token = await this.oauth.getAccessToken();
      const url = new URL('https://www.googleapis.com/youtube/v3/search');
      
      url.searchParams.append('part', 'snippet');
      url.searchParams.append('maxResults', maxResults.toString());
      url.searchParams.append('q', query);
      url.searchParams.append('type', 'video');
      url.searchParams.append('videoCategoryId', '10'); // Music category
      url.searchParams.append('access_token', token);

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('YouTube Music search error:', error);
      throw error;
    }
  }

  // Get user's playlists
  async getUserPlaylists(): Promise<any[]> {
    try {
      const token = await this.oauth.getAccessToken();
      const url = new URL('https://www.googleapis.com/youtube/v3/playlists');
      
      url.searchParams.append('part', 'snippet,contentDetails');
      url.searchParams.append('mine', 'true');
      url.searchParams.append('maxResults', '50');
      url.searchParams.append('access_token', token);

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`Failed to get playlists: ${response.statusText}`);
      }

      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Get playlists error:', error);
      throw error;
    }
  }

  // Get playlist items
  async getPlaylistItems(playlistId: string): Promise<any[]> {
    try {
      const token = await this.oauth.getAccessToken();
      const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
      
      url.searchParams.append('part', 'snippet');
      url.searchParams.append('playlistId', playlistId);
      url.searchParams.append('maxResults', '50');
      url.searchParams.append('access_token', token);

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`Failed to get playlist items: ${response.statusText}`);
      }

      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Get playlist items error:', error);
      throw error;
    }
  }

  // Get liked videos
  async getLikedVideos(): Promise<any[]> {
    try {
      const token = await this.oauth.getAccessToken();
      const url = new URL('https://www.googleapis.com/youtube/v3/videos');
      
      url.searchParams.append('part', 'snippet,contentDetails');
      url.searchParams.append('myRating', 'like');
      url.searchParams.append('maxResults', '50');
      url.searchParams.append('access_token', token);

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`Failed to get liked videos: ${response.statusText}`);
      }

      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Get liked videos error:', error);
      throw error;
    }
  }
}

export { YouTubeOAuth };
