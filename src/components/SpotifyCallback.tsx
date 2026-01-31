import React, { useEffect } from 'react';

const SpotifyCallback: React.FC = () => {
  useEffect(() => {
    // Get the token from URL hash
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const token = params.get('access_token');
    const expiresIn = params.get('expires_in');
    const state = params.get('state');

    if (token) {
      // Send token to parent window
      window.opener?.postMessage({
        type: 'spotify-token',
        token: token,
        expiresIn: expiresIn,
        state: state
      }, window.location.origin);
      
      // Store token in localStorage for persistence
      localStorage.setItem('spotify_token', token);
      localStorage.setItem('spotify_token_expires', (Date.now() + (parseInt(expiresIn || '3600') * 1000)).toString());
      
      // Close popup
      window.close();
    } else {
      // Handle error
      const error = params.get('error');
      if (error) {
        window.opener?.postMessage({
          type: 'spotify-error',
          error: error
        }, window.location.origin);
        window.close();
      }
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <div className="text-4xl mb-4">🎵</div>
        <p>Connecting to Spotify...</p>
        <p className="text-sm text-gray-400 mt-2">This window will close automatically</p>
      </div>
    </div>
  );
};

export default SpotifyCallback;
