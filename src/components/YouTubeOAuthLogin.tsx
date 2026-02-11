import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { YouTubeOAuth, YouTubeDataAPI, type YouTubeOAuthConfig } from '@/api/youtube/oauth';

interface YouTubeOAuthLoginProps {
  onAuthSuccess?: (api: YouTubeDataAPI) => void;
  onAuthError?: (error: Error) => void;
}

export const YouTubeOAuthLogin: React.FC<YouTubeOAuthLoginProps> = ({
  onAuthSuccess,
  onAuthError
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [oauth, setOAuth] = useState<YouTubeOAuth | null>(null);

  useEffect(() => {
    // Initialize OAuth with config from environment
    const config: YouTubeOAuthConfig = {
      clientId: import.meta.env.VITE_YOUTUBE_CLIENT_ID || '',
      clientSecret: import.meta.env.VITE_YOUTUBE_CLIENT_SECRET || '',
      redirectUri: import.meta.env.VITE_YOUTUBE_REDIRECT_URI || `${window.location.origin}/auth/youtube/callback`
    };

    // For development/demo purposes, create a mock OAuth instance if credentials are missing
    if (!config.clientId) {
      console.log('YouTube OAuth credentials not found in environment variables');
      // Create a mock OAuth for demo purposes
      const mockOAuth = {
        isAuthenticated: () => false,
        getAuthUrl: () => '#',
        exchangeCodeForToken: async () => {},
        getUserProfile: async () => ({ name: 'Demo User', email: 'demo@example.com', picture: '' }),
        logout: () => {}
      } as any;
      setOAuth(mockOAuth);
    } else {
      const oauthInstance = new YouTubeOAuth();
      setOAuth(oauthInstance);

      // Check if already authenticated
      if (oauthInstance.isAuthenticated()) {
        oauthInstance.getUserProfile().then(setUser).catch(console.error);
      }
    }
  }, []);

  useEffect(() => {
    // Handle OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (code && oauth) {
      handleAuthCallback(code);
    } else if (error) {
      onAuthError?.(new Error(`OAuth error: ${error}`));
    }
  }, [oauth]);

  const handleAuthCallback = async (code: string) => {
    if (!oauth) return;

    setIsLoading(true);
    try {
      await oauth.exchangeCodeForToken(code);
      const userProfile = await oauth.getUserProfile();
      setUser(userProfile);

      // Initialize YouTube Data API
      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
      if (apiKey) {
        const api = new YouTubeDataAPI(oauth, apiKey);
        onAuthSuccess?.(api);
      }

      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (error) {
      onAuthError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    if (!oauth) return;

    const authUrl = oauth.getAuthUrl();
    
    // Check if this is a demo/mock scenario
    if (authUrl === '#') {
      // Show a message about configuring OAuth
      alert('YouTube OAuth needs to be configured in Vercel environment variables. Please add VITE_YOUTUBE_CLIENT_ID, VITE_YOUTUBE_CLIENT_SECRET, and VITE_YOUTUBE_REDIRECT_URI to your Vercel project settings.');
      return;
    }
    
    window.location.href = authUrl;
  };

  const handleLogout = () => {
    if (!oauth) return;

    oauth.logout();
    setUser(null);
  };

  if (user) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
            YouTube Music Connected
          </CardTitle>
          <CardDescription>
            Signed in as {user.email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleLogout} variant="outline" className="w-full">
            Disconnect
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Connect YouTube Music</CardTitle>
        <CardDescription>
          Sign in with your Google account to access your YouTube Music library
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={handleLogin} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Connecting...' : 'Sign in with Google'}
        </Button>
        <p className="text-sm text-gray-400 mt-2">
          Note: YouTube OAuth needs to be configured in Vercel environment variables for production use.
        </p>
      </CardContent>
    </Card>
  );
};
