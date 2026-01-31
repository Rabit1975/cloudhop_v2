import React, { useState, useRef, useEffect } from 'react';
import { useVisibility } from '../hooks/useVisibility';
import { ytmusicService } from '../services/ytmusicService';
import { SpotifyPlayer } from './SpotifyPlayer';

interface YouTubeMusicPlayerProps {
  onConnectionStatus?: (connected: boolean) => void;
}

interface YouTubeMusicTrack {
  videoId: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  thumbnail: string;
}

interface YouTubeMusicPlaylist {
  id: string;
  title: string;
  description: string;
  trackCount: number;
  thumbnail: string;
}

export const YouTubeMusicPlayer: React.FC<YouTubeMusicPlayerProps> = ({ onConnectionStatus }) => {
  const [activeTab, setActiveTab] = useState<'ambient' | 'spotify'>('ambient');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState('M7lc1UVf-VE');
  const [volume, setVolume] = useState(50);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<YouTubeMusicTrack[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { ref: playerRef, visible } = useVisibility('YouTubeMusicPlayer');

  // Simple direct iframe approach - more reliable than YouTube API
  const getEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&rel=0&modestbranding=1&origin=${window.location.origin}&playsinline=1&iv_load_policy=3&fs=0&showinfo=0&autohide=1`;
  };

  // Visibility-based playback control (simulated since we can't control iframe directly)
  useEffect(() => {
    if (!visible && isPlaying) {
      setIsPlaying(false); // Simulate pause when not visible
    }
  }, [visible, isPlaying]);

  const handleConnect = () => {
    console.log('Connecting to YouTube Music...');
    setShowCookieInput(true);
  };

  const handleCookieSubmit = () => {
    if (!cookieInput.trim()) {
      setError('Please enter a valid cookie');
      return;
    }

    try {
      console.log('Setting cookie:', cookieInput.substring(0, 100) + '...');
      youtubeMusicAPI.setCookie(cookieInput.trim());
      setIsConnected(true);
      setShowCookieInput(false);
      onConnectionStatus?.(true);
      console.log('YouTube Music connected with cookie!');
      
      // Load user's library
      loadLibrary();
    } catch (error) {
      console.error('Authentication error:', error);
      setError('Failed to authenticate with cookie: ' + (error as Error).message);
    }
  };

  const loadLibrary = async () => {
    setIsLoading(true);
    try {
      const userLibrary = await youtubeMusicAPI.getLibrary();
      setLibrary(userLibrary);
      console.log('Loaded library:', userLibrary);
    } catch (error) {
      console.error('Failed to load library:', error);
      setError('Failed to load your library');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      const results = await youtubeMusicAPI.search(query);
      setSearchResults(results);
      console.log('Search results:', results);
    } catch (error) {
      console.error('Search failed:', error);
      setError('Search failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Note: We can't actually control iframe playback without the API
    // This is simulated for UI demonstration
  };

  const loadVideo = (videoId: string) => {
    setCurrentVideoId(videoId);
    setIsPlaying(false); // Reset playing state when loading new video
  };

  const searchMusic = async (query: string) => {
    setIsLoading(true);
    try {
      const results = await ytmusicService.search(query);
      setSearchResults(results);
      
      // Auto-play first result if found
      if (results.length > 0) {
        loadVideo(results[0].videoId);
        setIsPlaying(true); // Auto-play first result
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to search music');
    } finally {
      setIsLoading(false);
    }
  };

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
      {/* Tab Navigation */}
      <div className="p-4 border-b border-white/10">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('ambient')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'ambient' 
                ? 'bg-red-500 text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            🎵 Ambient Music
          </button>
          <button
            onClick={() => setActiveTab('spotify')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'spotify' 
                ? 'bg-green-500 text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            🎧 My Music (Spotify)
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1">
        {activeTab === 'ambient' ? (
          /* Ambient Music Tab */
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Ambient Music</h2>
                  <p className="text-white/60 text-sm">Curated YouTube Music - No login required</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></span>
                  <span className="text-white/60 text-sm">{isPlaying ? 'Playing' : 'Paused'}</span>
                </div>
              </div>
            </div>

            {/* Video Player */}
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  src={getEmbedUrl(currentVideoId)}
                  className="w-full h-full"
                  sandbox="allow-same-origin allow-scripts allow-presentation allow-forms allow-popups allow-popups-to-escape-sandbox"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen={false}
                  title="YouTube Music Player"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center justify-center gap-4 mb-4">
                <button
                  onClick={() => loadVideo('jfKfPfyJRdk')} // Lofi
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-white text-sm transition-colors"
                >
                  Lofi
                </button>
                <button
                  onClick={() => loadVideo('DWcJFNfaw9c')} // Chill
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-white text-sm transition-colors"
                >
                  Chill
                </button>
                <button
                  onClick={() => loadVideo('lTRiuFIqnVw')} // Electronic
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-white text-sm transition-colors"
                >
                  Electronic
                </button>
                <button
                  onClick={handlePlayPause}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors"
                >
                  {isPlaying ? '⏸️ Pause' : '▶️ Play'}
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-white/60">🔊</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-white/60 text-sm w-10">{volume}%</span>
              </div>

              {/* Search Bar */}
              <div className="mt-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search (try: lofi, chill, electronic, pop, rock)..."
                    className="w-full p-3 pl-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        searchMusic(e.currentTarget.value);
                      }
                    }}
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40">🔍</span>
                </div>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="mt-4 max-h-48 overflow-y-auto">
                  <h4 className="text-white/60 text-sm mb-2">Search Results:</h4>
                  <div className="space-y-2">
                    {searchResults.map((track, index) => (
                      <div
                        key={index}
                        onClick={() => loadVideo(track.videoId)}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded cursor-pointer transition-colors"
                      >
                        <div className="text-white text-sm font-medium truncate">{track.title}</div>
                        <div className="text-white/60 text-xs truncate">{track.artist} • {track.album}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="mt-4 text-center text-white/60 text-sm">
                  Searching...
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Spotify Tab */
          <SpotifyPlayer onConnectionStatus={onConnectionStatus} />
        )}
      </div>
    </div>
  );
};
