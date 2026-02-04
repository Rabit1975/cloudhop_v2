// Simple YouTube test component
import React, { useState } from 'react';
import { YouTubeOAuthService } from '../core/music/YouTubeOAuthService';
import { YouTubeAuth } from '../components/YouTubeAuth';
import { YOUTUBE_CONFIG } from '../core/music/youtubeConfig';

export const YouTubeTest: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (service: YouTubeOAuthService) => {
    setLoading(true);
    setError(null);
    
    try {
      // Test getting playlists
      const userPlaylists = await service.getPlaylists();
      setPlaylists(userPlaylists);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch playlists');
    } finally {
      setLoading(false);
    }
  };

  if (!YOUTUBE_CONFIG.apiKey || !YOUTUBE_CONFIG.clientId) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>YouTube Configuration Missing</h3>
        <p>Please add YouTube API credentials to your .env.local file</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>YouTube Integration Test</h2>
      
      {!isAuthenticated ? (
        <YouTubeAuth onAuthenticated={handleAuth} />
      ) : (
        <div>
          <h3>✅ YouTube Connected!</h3>
          
          {loading && <p>Loading playlists...</p>}
          
          {error && (
            <div style={{ 
              padding: '10px', 
              backgroundColor: '#fee', 
              border: '1px solid #fcc', 
              borderRadius: '4px',
              margin: '10px 0'
            }}>
              <strong>Error:</strong> {error}
            </div>
          )}
          
          {playlists.length > 0 && (
            <div>
              <h4>Your Playlists ({playlists.length}):</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {playlists.slice(0, 5).map((playlist: any, index: number) => (
                  <li key={index} style={{ 
                    padding: '10px', 
                    margin: '5px 0', 
                    backgroundColor: '#f5f5f5', 
                    borderRadius: '4px' 
                  }}>
                    <strong>{playlist.snippet?.title || 'Untitled'}</strong>
                    <br />
                    <small>{playlist.snippet?.description || 'No description'}</small>
                  </li>
                ))}
              </ul>
              {playlists.length > 5 && <p>... and {playlists.length - 5} more</p>}
            </div>
          )}
          
          <button 
            onClick={() => setIsAuthenticated(false)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ff4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default YouTubeTest;
