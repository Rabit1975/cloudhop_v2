import { useState, useEffect, useCallback } from 'react';
import { YouTubeOAuth, YouTubeDataAPI, type YouTubeOAuthConfig } from '@/api/youtube/oauth';

export interface YouTubeMusicTrack {
  videoId: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string;
  url: string;
}

export interface YouTubeMusicPlaylist {
  id: string;
  title: string;
  description: string;
  trackCount: number;
  thumbnail: string;
}

export const useYouTubeMusic = () => {
  const [api, setApi] = useState<YouTubeDataAPI | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize OAuth
  useEffect(() => {
    const config: YouTubeOAuthConfig = {
      clientId: import.meta.env.VITE_YOUTUBE_CLIENT_ID || '',
      clientSecret: import.meta.env.VITE_YOUTUBE_CLIENT_SECRET || '',
      redirectUri: import.meta.env.VITE_YOUTUBE_REDIRECT_URI || `${window.location.origin}/auth/youtube/callback`
    };

    if (config.clientId) {
      const oauth = new YouTubeOAuth(config);
      
      // Check if already authenticated
      if (oauth.isAuthenticated()) {
        setIsAuthenticated(true);
        oauth.getUserProfile().then(setUser).catch(console.error);
        
        // Initialize API
        const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
        if (apiKey) {
          setApi(new YouTubeDataAPI(oauth, apiKey));
        }
      }

      // Handle OAuth callback
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const authError = urlParams.get('error');

      if (code) {
        handleAuthCallback(oauth, code);
      } else if (authError) {
        setError(`OAuth error: ${authError}`);
      }
    }
  }, []);

  const handleAuthCallback = async (oauth: YouTubeOAuth, code: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await oauth.exchangeCodeForToken(code);
      const userProfile = await oauth.getUserProfile();
      setUser(userProfile);
      setIsAuthenticated(true);

      // Initialize API
      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
      if (apiKey) {
        setApi(new YouTubeDataAPI(oauth, apiKey));
      }

      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Search YouTube Music
  const searchMusic = useCallback(async (query: string, maxResults = 25): Promise<YouTubeMusicTrack[]> => {
    if (!api) throw new Error('Not authenticated');

    try {
      const results = await api.searchMusic(query, maxResults);
      
      return results.map((item: any) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        artist: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
        duration: '', // Duration requires additional API call
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      throw err;
    }
  }, [api]);

  // Get user's playlists
  const getUserPlaylists = useCallback(async (): Promise<YouTubeMusicPlaylist[]> => {
    if (!api) throw new Error('Not authenticated');

    try {
      const playlists = await api.getUserPlaylists();
      
      return playlists.map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        trackCount: item.contentDetails?.itemCount || 0,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get playlists');
      throw err;
    }
  }, [api]);

  // Get playlist items
  const getPlaylistItems = useCallback(async (playlistId: string): Promise<YouTubeMusicTrack[]> => {
    if (!api) throw new Error('Not authenticated');

    try {
      const items = await api.getPlaylistItems(playlistId);
      
      return items.map((item: any) => ({
        videoId: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        artist: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
        duration: '', // Duration requires additional API call
        url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get playlist items');
      throw err;
    }
  }, [api]);

  // Get liked videos
  const getLikedVideos = useCallback(async (): Promise<YouTubeMusicTrack[]> => {
    if (!api) throw new Error('Not authenticated');

    try {
      const videos = await api.getLikedVideos();
      
      return videos.map((item: any) => ({
        videoId: item.id,
        title: item.snippet.title,
        artist: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
        duration: item.contentDetails?.duration || '',
        url: `https://www.youtube.com/watch?v=${item.id}`
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get liked videos');
      throw err;
    }
  }, [api]);

  // Logout
  const logout = useCallback(() => {
    const config: YouTubeOAuthConfig = {
      clientId: import.meta.env.VITE_YOUTUBE_CLIENT_ID || '',
      clientSecret: import.meta.env.VITE_YOUTUBE_CLIENT_SECRET || '',
      redirectUri: import.meta.env.VITE_YOUTUBE_REDIRECT_URI || `${window.location.origin}/auth/youtube/callback`
    };

    if (config.clientId) {
      const oauth = new YouTubeOAuth(config);
      oauth.logout();
    }

    setApi(null);
    setIsAuthenticated(false);
    setUser(null);
    setError(null);
  }, []);

  return {
    api,
    isAuthenticated,
    user,
    isLoading,
    error,
    searchMusic,
    getUserPlaylists,
    getPlaylistItems,
    getLikedVideos,
    logout
  };
};
