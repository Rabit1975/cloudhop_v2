import React, { useState } from 'react'
import { YouTubeOAuthService } from '../core/music/YouTubeOAuthService'
import { YOUTUBE_CONFIG } from '../core/music/youtubeConfig'

interface YouTubeAuthProps {
  onAuthenticated?: (service: YouTubeOAuthService) => void
}

export const YouTubeAuth: React.FC<YouTubeAuthProps> = ({ onAuthenticated }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAuthenticate = async () => {
    if (!YOUTUBE_CONFIG.apiKey || !YOUTUBE_CONFIG.clientId) {
      setError('YouTube credentials not configured. Please check your .env.local file.')
      return
    }

    setIsAuthenticating(true)
    setError(null)

    try {
      const service = new YouTubeOAuthService(YOUTUBE_CONFIG.apiKey, YOUTUBE_CONFIG.clientId)
      await service.authenticate()
      onAuthenticated?.(service)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setIsAuthenticating(false)
    }
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3>YouTube Account Access</h3>
      <p>Connect your YouTube account to access your playlists and liked videos</p>
      
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
      
      <button
        onClick={handleAuthenticate}
        disabled={isAuthenticating}
        style={{
          padding: '12px 24px',
          backgroundColor: isAuthenticating ? '#ccc' : '#ff0000',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isAuthenticating ? 'not-allowed' : 'pointer',
          fontSize: '16px'
        }}
      >
        {isAuthenticating ? 'Connecting...' : 'Connect YouTube Account'}
      </button>
      
      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <p>This will open a popup to authenticate with Google.</p>
        <p>Your credentials are stored locally and never sent to our servers.</p>
      </div>
    </div>
  )
}
