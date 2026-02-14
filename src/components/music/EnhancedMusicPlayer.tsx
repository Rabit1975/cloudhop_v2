import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  thumbnail: string;
  url: string;
  isLiked?: boolean;
  isPlaying?: boolean;
}

interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
  coverImage?: string;
  description?: string;
  isPublic?: boolean;
}

interface EnhancedMusicPlayerProps {
  className?: string;
}

export default function EnhancedMusicPlayer({ className }: EnhancedMusicPlayerProps) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'one' | 'all'>('off');
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<'player' | 'search' | 'playlists' | 'queue'>('player');
  const [visualizerType, setVisualizerType] = useState<'bars' | 'wave' | 'circle'>('bars');
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Mock data for demonstration
  const mockTracks: Track[] = [
    {
      id: '1',
      title: 'Electric Dreams',
      artist: 'Synthwave Artist',
      album: 'Neon Nights',
      duration: 245,
      thumbnail: 'https://picsum.photos/seed/track1/300/300.jpg',
      url: '#',
      isLiked: false,
      isPlaying: false
    },
    {
      id: '2',
      title: 'Midnight City',
      artist: 'Electronic Vibes',
      album: 'Urban Lights',
      duration: 198,
      thumbnail: 'https://picsum.photos/seed/track2/300/300.jpg',
      url: '#',
      isLiked: true,
      isPlaying: false
    },
    {
      id: '3',
      title: 'Digital Rain',
      artist: 'Cyber Punk',
      album: 'Future Sounds',
      duration: 312,
      thumbnail: 'https://picsum.photos/seed/track3/300/300.jpg',
      url: '#',
      isLiked: false,
      isPlaying: false
    },
    {
      id: '4',
      title: 'Neon Sunset',
      artist: 'Retro Wave',
      album: '80s Revival',
      duration: 267,
      thumbnail: 'https://picsum.photos/seed/track4/300/300.jpg',
      url: '#',
      isLiked: true,
      isPlaying: false
    }
  ];

  const mockPlaylists: Playlist[] = [
    {
      id: '1',
      name: 'Synthwave Mix',
      tracks: mockTracks.slice(0, 2),
      coverImage: 'https://picsum.photos/seed/playlist1/400/400.jpg',
      description: 'Best synthwave tracks',
      isPublic: true
    },
    {
      id: '2',
      name: 'Chill Vibes',
      tracks: mockTracks.slice(2, 4),
      coverImage: 'https://picsum.photos/seed/playlist2/400/400.jpg',
      description: 'Relaxing electronic music',
      isPublic: false
    }
  ];

  useEffect(() => {
    setPlaylist(mockTracks);
    if (mockTracks.length > 0) {
      setCurrentTrack(mockTracks[0]);
    }
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (!currentTrack) return;
    
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (!currentTrack || playlist.length === 0) return;
    
    const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
    let nextIndex;
    
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      nextIndex = (currentIndex + 1) % playlist.length;
    }
    
    setCurrentTrack(playlist[nextIndex]);
  };

  const handlePrevious = () => {
    if (!currentTrack || playlist.length === 0) return;
    
    const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    setCurrentTrack(playlist[prevIndex]);
  };

  const handleLike = () => {
    if (!currentTrack) return;
    
    setPlaylist(prev => prev.map(track => 
      track.id === currentTrack.id 
        ? { ...track, isLiked: !track.isLiked }
        : track
    ));
    
    setCurrentTrack(prev => prev ? { ...prev, isLiked: !prev.isLiked } : null);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setSearchResults(mockTracks.filter(track => 
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase())
      ));
      setIsSearching(false);
    }, 1000);
  };

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setActiveTab('player');
  };

  const Visualizer = () => {
    const bars = Array.from({ length: 20 }, (_, i) => i);
    
    return (
      <div className="flex items-end justify-center gap-1 h-16">
        {bars.map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "w-1 bg-gradient-to-t from-cyan-400 to-purple-500 rounded-full",
              visualizerType === 'bars' && "w-1 h-8",
              visualizerType === 'wave' && "w-1 h-4 rounded-t-full",
              visualizerType === 'circle' && "w-2 h-2 rounded-full"
            )}
            animate={isPlaying ? {
              height: visualizerType === 'bars' ? [8, 16, 12, 20, 14] : [4, 8, 6, 10, 7],
              scale: visualizerType === 'circle' ? [1, 1.2, 0.8, 1.5, 1] : [1, 1, 1, 1, 1]
            } : {}}
            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={cn("w-full h-full bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6", className)}>
      <audio ref={audioRef} />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">CloudHop Music</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVisualizerType('bars')}
            className={cn("p-2 rounded-lg", visualizerType === 'bars' ? 'bg-cyan-500/30 text-cyan-400' : 'bg-white/10 text-white/60')}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <rect x="4" y="14" width="4" height="6" />
              <rect x="10" y="10" width="4" height="10" />
              <rect x="16" y="6" width="4" height="14" />
            </svg>
          </button>
          <button
            onClick={() => setVisualizerType('wave')}
            className={cn("p-2 rounded-lg", visualizerType === 'wave' ? 'bg-cyan-500/30 text-cyan-400' : 'bg-white/10 text-white/60')}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 12h4l-2-2v4l2-2m6-4h4l-2-2v4l2-2m6-4h4l-2-2v4l2-2" />
            </svg>
          </button>
          <button
            onClick={() => setVisualizerType('circle')}
            className={cn("p-2 rounded-lg", visualizerType === 'circle' ? 'bg-cyan-500/30 text-cyan-400' : 'bg-white/10 text-white/60')}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="3" />
              <circle cx="6" cy="12" r="2" />
              <circle cx="18" cy="12" r="2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'player', label: 'Player', icon: '🎵' },
          { id: 'search', label: 'Search', icon: '🔍' },
          { id: 'playlists', label: 'Playlists', icon: '📋' },
          { id: 'queue', label: 'Queue', icon: '📝' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
              activeTab === tab.id
                ? "bg-cyan-500/30 text-cyan-300 border border-cyan-400/50"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            )}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Player Tab */}
      {activeTab === 'player' && currentTrack && (
        <div className="space-y-6">
          {/* Now Playing */}
          <div className="flex items-center gap-6">
            <img
              src={currentTrack.thumbnail}
              alt={currentTrack.title}
              className="w-24 h-24 rounded-lg shadow-xl"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">{currentTrack.title}</h3>
              <p className="text-gray-300 mb-2">{currentTrack.artist}</p>
              {currentTrack.album && (
                <p className="text-sm text-gray-400">{currentTrack.album}</p>
              )}
            </div>
          </div>

          {/* Visualizer */}
          <div className="bg-black/30 rounded-lg p-4">
            <Visualizer />
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(currentTrack.duration)}</span>
            </div>
            <div
              ref={progressBarRef}
              className="w-full h-2 bg-white/20 rounded-full cursor-pointer"
              onClick={(e) => {
                const rect = progressBarRef.current?.getBoundingClientRect();
                if (rect && audioRef.current) {
                  const percent = (e.clientX - rect.left) / rect.width;
                  audioRef.current.currentTime = percent * currentTrack.duration;
                  setCurrentTime(percent * currentTrack.duration);
                }
              }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setRepeatMode(repeatMode === 'off' ? 'all' : repeatMode === 'all' ? 'one' : 'off')}
              className={cn(
                "p-2 rounded-lg transition-colors",
                repeatMode !== 'off' ? 'bg-cyan-500/30 text-cyan-400' : 'bg-white/10 text-white/60'
              )}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                {repeatMode === 'one' ? (
                  <path d="M7 4v16h2V4H7zm5 0v16h2V4h-2zm5 0v16h2V4h-2z" />
                ) : (
                  <path d="M7 4v16h2V4H7zm10 0v16h2V4h-2zm-5 0v16h2V4h-2z" />
                )}
              </svg>
            </button>

            <button
              onClick={handlePrevious}
              className="p-3 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>

            <button
              onClick={handlePlayPause}
              className="p-4 bg-cyan-500 rounded-lg text-white hover:bg-cyan-600 transition-colors"
            >
              {isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button
              onClick={handleNext}
              className="p-3 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>

            <button
              onClick={() => setIsShuffled(!isShuffled)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                isShuffled ? 'bg-cyan-500/30 text-cyan-400' : 'bg-white/10 text-white/60'
              )}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.59 14.17L19.77 19 21 17.59l-5.17-5.17-1.42 1.41z" />
              </svg>
            </button>

            <button
              onClick={handleLike}
              className={cn(
                "p-2 rounded-lg transition-colors",
                currentTrack.isLiked ? 'bg-red-500/30 text-red-400' : 'bg-white/10 text-white/60'
              )}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 10.86-8.55 13.53L12 21.35z" />
              </svg>
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 17.25V3.75L18.5 12 14 17.25z" />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-24 accent-cyan-500"
            />
            <span className="text-white/60 text-sm w-8">{Math.round(volume * 100)}%</span>
          </div>
        </div>
      )}

      {/* Search Tab */}
      {activeTab === 'search' && (
        <div className="space-y-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search for songs, artists, or albums..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
            />
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>

          <div className="space-y-2">
            {searchResults.map((track) => (
              <div
                key={track.id}
                className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 cursor-pointer transition-colors"
                onClick={() => handleTrackSelect(track)}
              >
                <img src={track.thumbnail} alt={track.title} className="w-12 h-12 rounded" />
                <div className="flex-1">
                  <p className="text-white font-medium">{track.title}</p>
                  <p className="text-gray-300 text-sm">{track.artist}</p>
                </div>
                <button className="p-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Playlists Tab */}
      {activeTab === 'playlists' && (
        <div className="space-y-4">
          {mockPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className="flex items-center gap-4 p-4 bg-white/10 rounded-lg hover:bg-white/20 cursor-pointer transition-colors"
            >
              <img src={playlist.coverImage} alt={playlist.name} className="w-16 h-16 rounded-lg" />
              <div className="flex-1">
                <h4 className="text-white font-medium">{playlist.name}</h4>
                <p className="text-gray-300 text-sm">{playlist.description}</p>
                <p className="text-gray-400 text-xs">{playlist.tracks.length} tracks</p>
              </div>
              <div className="flex items-center gap-2">
                {playlist.isPublic && (
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">Public</span>
                )}
                <button className="p-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Queue Tab */}
      {activeTab === 'queue' && (
        <div className="space-y-2">
          <h3 className="text-white font-medium mb-4">Up Next</h3>
          {playlist.map((track, index) => (
            <div
              key={track.id}
              className={cn(
                "flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors",
                currentTrack?.id === track.id ? 'bg-cyan-500/20' : 'bg-white/10 hover:bg-white/20'
              )}
              onClick={() => handleTrackSelect(track)}
            >
              <span className="text-gray-400 text-sm w-4">{index + 1}</span>
              <img src={track.thumbnail} alt={track.title} className="w-10 h-10 rounded" />
              <div className="flex-1">
                <p className="text-white text-sm">{track.title}</p>
                <p className="text-gray-400 text-xs">{track.artist}</p>
              </div>
              {track.isLiked && (
                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 10.86-8.55 13.53L12 21.35z" />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
