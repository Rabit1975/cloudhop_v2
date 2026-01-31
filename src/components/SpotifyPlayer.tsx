import React, { useState, useEffect, useRef } from 'react';
import { useVisibility } from '../hooks/useVisibility';

interface SpotifyPlayerProps {
  onConnectionStatus?: (connected: boolean) => void;
}

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: any;
  }
}

export const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ onConnectionStatus }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [player, setPlayer] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { ref: playerRef, visible } = useVisibility('SpotifyPlayer');

  // Load Spotify Web Playback SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log('Spotify Web Playback SDK is ready');
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Initialize Spotify Player
  useEffect(() => {
    if (!token || !window.Spotify) return;

    const spotifyPlayer = new window.Spotify.Player({
      name: 'CloudHop Music Player',
      getOAuthToken: (cb: (token: string) => void) => {
        cb(token);
      },
      volume: 0.5,
    });

    spotifyPlayer.addListener('ready', ({ device_id }: { device_id: string }) => {
      console.log('Spotify player ready with device ID:', device_id);
      setDeviceId(device_id);
      setPlayer(spotifyPlayer);
      setIsConnected(true);
      onConnectionStatus?.(true);
    });

    spotifyPlayer.addListener('not_ready', ({ device_id }: { device_id: string }) => {
      console.log('Spotify player not ready with device ID:', device_id);
    });

    spotifyPlayer.addListener('player_state_changed', (state: any) => {
      if (!state) return;
      
      setCurrentTrack(state.track_window.current_track);
      setIsPlaying(!state.paused);
    });

    spotifyPlayer.addListener('initialization_error', ({ message }: { message: string }) => {
      console.error('Spotify player initialization error:', message);
      setError('Failed to initialize Spotify player: ' + message);
    });

    spotifyPlayer.addListener('authentication_error', ({ message }: { message: string }) => {
      console.error('Spotify authentication error:', message);
      setError('Spotify authentication failed: ' + message);
      handleLogout();
    });

    spotifyPlayer.addListener('account_error', ({ message }: { message: string }) => {
      console.error('Spotify account error:', message);
      setError('Spotify account error: ' + message);
    });

    spotifyPlayer.connect();

    return () => {
      spotifyPlayer.disconnect();
    };
  }, [token]);

  // Visibility-based playback control
  useEffect(() => {
    if (player && !visible && isPlaying) {
      player.pause();
    }
  }, [visible, isPlaying, player]);

  const handleLogin = () => {
    const clientId = 'YOUR_SPOTIFY_CLIENT_ID'; // You'll need to get this from Spotify Developer Dashboard
    const redirectUri = encodeURIComponent(window.location.origin + '/spotify-callback');
    const scopes = encodeURIComponent('streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-playback-position playlist-read-private playlist-read-collaborative user-read-recently-played user-top-read user-read-playback-position');
    
    const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}&show_dialog=true`;
    
    // Open Spotify login in popup
    const popup = window.open(authUrl, 'spotify-login', 'width=400,height=500,scrollbars=yes,resizable=yes');
    
    // Listen for messages from popup
    const messageListener = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'spotify-token') {
        setToken(event.data.token);
        setShowLogin(false);
        popup?.close();
        window.removeEventListener('message', messageListener);
      }
    };
    
    window.addEventListener('message', messageListener);
  };

  const handleLogout = () => {
    setToken(null);
    setIsConnected(false);
    setCurrentTrack(null);
    setUserPlaylists([]);
    setPlayer(null);
    setDeviceId(null);
    onConnectionStatus?.(false);
  };

  const handlePlayPause = async () => {
    if (!player) return;
    
    try {
      if (isPlaying) {
        await player.pause();
      } else {
        await player.resume();
      }
    } catch (error) {
      console.error('Playback control error:', error);
      setError('Failed to control playback');
    }
  };

  const handleNext = async () => {
    if (!player) return;
    try {
      await player.nextTrack();
    } catch (error) {
      console.error('Next track error:', error);
    }
  };

  const handlePrevious = async () => {
    if (!player) return;
    try {
      await player.previousTrack();
    } catch (error) {
      console.error('Previous track error:', error);
    }
  };

  const fetchUserPlaylists = async () => {
    if (!token) return;
    
    try {
      const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserPlaylists(data.items);
      }
    } catch (error) {
      console.error('Failed to fetch playlists:', error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      fetchUserPlaylists();
    }
  }, [isConnected]);

  if (!token) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🎵</div>
          <h2 className="text-2xl font-bold mb-4">Spotify Music</h2>
          <p className="text-white/70 mb-6">Connect your Spotify account to play your personal music</p>
          <div className="space-y-3">
            <button
              onClick={() => setShowLogin(true)}
              className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors"
            >
              Connect Spotify
            </button>
            <div className="text-xs text-white/40">
              <p>Requires Spotify Premium account</p>
              <p>Your music, your playlists, your way</p>
            </div>
          </div>
          
          {showLogin && (
            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              <p className="text-white/80 mb-4">Click below to login with Spotify:</p>
              <button
                onClick={handleLogin}
                className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded transition-colors"
              >
                Login with Spotify
              </button>
              <button
                onClick={() => setShowLogin(false)}
                className="w-full mt-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-red-400">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={playerRef} className="h-full w-full bg-[#0a0d1f] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Spotify Music</h2>
            {currentTrack && (
              <div>
                <p className="text-white/60 text-sm">{currentTrack.name}</p>
                <p className="text-white/40 text-xs">{currentTrack.artists?.map((a: any) => a.name).join(', ')}</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></span>
            <span className="text-white/60 text-sm">{isPlaying ? 'Playing' : 'Paused'}</span>
          </div>
        </div>
      </div>

      {/* Current Track Display */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          {currentTrack?.album?.images?.[0]?.url ? (
            <img 
              src={currentTrack.album.images[0].url} 
              alt={currentTrack.name}
              className="w-48 h-48 rounded-lg mb-4 mx-auto object-cover"
            />
          ) : (
            <div className="w-48 h-48 bg-gray-700 rounded-lg mb-4 mx-auto flex items-center justify-center">
              <span className="text-4xl">🎵</span>
            </div>
          )}
          <h3 className="text-white font-medium">{currentTrack?.name || 'No track playing'}</h3>
          <p className="text-white/60 text-sm">
            {currentTrack?.artists?.map((a: any) => a.name).join(', ') || ''}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={handlePrevious}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            ⏮️
          </button>
          <button
            onClick={handlePlayPause}
            className="p-3 bg-green-500 hover:bg-green-600 rounded-full text-white transition-colors"
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button
            onClick={handleNext}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            ⏭️
          </button>
        </div>

        {/* User Playlists */}
        {userPlaylists.length > 0 && (
          <div className="mt-4">
            <h4 className="text-white/60 text-sm mb-2">Your Playlists:</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {userPlaylists.map((playlist: any) => (
                <div
                  key={playlist.id}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded cursor-pointer transition-colors"
                >
                  <div className="text-white text-sm font-medium truncate">{playlist.name}</div>
                  <div className="text-white/60 text-xs">{playlist.tracks.total} tracks</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Logout */}
        <div className="mt-4">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
