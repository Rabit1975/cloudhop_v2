import React, { useState, useEffect } from 'react';
import { YouTubeMusicAuth } from './YouTubeMusicAuth';
import YourYouTubeMusic from './YourYouTubeMusic';

const OAuthYouTubeMusic: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if we have a stored cookie session on mount
  useEffect(() => {
    // In a real app, we might check a secure storage or validate a session token
    // For now, we'll start with auth required if not set in state
    const storedAuth = localStorage.getItem('ytm_auth_status');
    if (storedAuth === 'true') {
        setIsAuthenticated(true);
    }
  }, []);

  const handleAuthenticated = (cookie: string) => {
    // In a real implementation, we would send this cookie to our backend
    // to store in an HTTP-only secure cookie for subsequent requests.
    // For this client-side demo, we'll just set the state.
    setIsAuthenticated(true);
    localStorage.setItem('ytm_auth_status', 'true');
  };

  return (
    <div className="h-full w-full overflow-hidden">
      {!isAuthenticated ? (
        <div className="h-full w-full flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <YouTubeMusicAuth 
                    isAuthenticated={isAuthenticated} 
                    onAuthenticated={handleAuthenticated} 
                />
            </div>
        </div>
      ) : (
        <YourYouTubeMusic />
      )}
    </div>
  );
};

export default OAuthYouTubeMusic;
