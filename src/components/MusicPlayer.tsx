import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../constants';
import { ytmusicService } from '../services/ytmusicService';

interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: string;
  thumbnail?: string;
  videoId?: string;
  url?: string;
}

interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
}

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'one' | 'all'>('off');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [activeTab, setActiveTab] = useState<'player' | 'search' | 'playlists'>('player');
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLIFrameElement>(null);

  // YouTube video embedding function
  const getYouTubeEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1&origin=${window.location.origin}&playsinline=1&iv_load_policy=3&fs=0&showinfo=0&autohide=1`;
  };

  // Sample playlist data with real YouTube video IDs
  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: '1',
      name: 'CloudHop Vibes',
      tracks: [
        {
          id: '1',
          title: 'Electric Dreams',
          artist: 'Synthwave Artist',
          duration: '4:05',
          videoId: 'M7lc1UVf-VE', // Real YouTube video ID
          thumbnail: 'https://img.youtube.com/vi/M7lc1UVf-VE/default.jpg',
        },
        {
          id: '2',
          title: 'Digital Horizon',
          artist: 'Cyber Producer',
          duration: '3:18',
          videoId: 'dQw4w9WgXcQ', // Real YouTube video ID
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg',
        },
        {
          id: '3',
          title: 'Neon Nights',
          artist: 'Retro Wave',
          duration: '5:12',
          videoId: '9JZQ3ZtK8pE', // Real YouTube video ID
          thumbnail: 'https://img.youtube.com/vi/9JZQ3ZtK8pE/default.jpg',
        },
      ],
    },
    {
      id: '2',
      name: 'Focus Flow',
      tracks: [
        {
          id: '4',
          title: 'Ambient Space',
          artist: 'Cosmic Sounds',
          duration: '7:00',
          videoId: 'lFcSrYw-ARY',
          thumbnail: 'https://img.youtube.com/vi/lFcSrYw-ARY/default.jpg',
        },
      ],
    },
  ]);

  // Real YouTube Music search using the service
  const searchYouTubeMusic = async (query: string) => {
    setIsLoading(true);
    try {
      const results = await ytmusicService.search(query);
      // Convert service response to our Track format
      const tracks: Track[] = results.map((result, index) => ({
        id: `search-${index}`,
        title: result.title,
        artist: result.artist,
        album: result.album,
        duration: result.duration,
        videoId: result.videoId,
        thumbnail: result.thumbnail,
      }));
      setSearchResults(tracks);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      searchYouTubeMusic(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const togglePlayPause = () => {
    if (!currentTrack) return;
    setIsPlaying(!isPlaying);
  };

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setCurrentTime(0);

    // Update iframe src if we have a videoId
    if (track.videoId && playerRef.current) {
      playerRef.current.src = getYouTubeEmbedUrl(track.videoId);
    }
  };

  const formatTime = (time: number | string) => {
    if (typeof time === 'string') {
      return time; // Already formatted as "M:SS"
    }
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const skipToNext = () => {
    if (!currentTrack || !playlists[0]) return;
    const currentPlaylist = playlists[0];
    const currentIndex = currentPlaylist.tracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % currentPlaylist.tracks.length;
    playTrack(currentPlaylist.tracks[nextIndex]);
  };

  const skipToPrevious = () => {
    if (!currentTrack || !playlists[0]) return;
    const currentPlaylist = playlists[0];
    const currentIndex = currentPlaylist.tracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? currentPlaylist.tracks.length - 1 : currentIndex - 1;
    playTrack(currentPlaylist.tracks[prevIndex]);
  };

  return (
    <div className="bg-[#0E1430] rounded-lg border border-[#1E3A5F] p-4">
      {/* Hidden audio element */}
      <audio ref={audioRef} />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#53C8FF] flex items-center gap-2">
          <Icons.Music className="w-5 h-5" />
          CloudHop Music
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('player')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              activeTab === 'player'
                ? 'bg-[#53C8FF] text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Player
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              activeTab === 'search'
                ? 'bg-[#53C8FF] text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Search
          </button>
          <button
            onClick={() => setActiveTab('playlists')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              activeTab === 'playlists'
                ? 'bg-[#53C8FF] text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Playlists
          </button>
        </div>
      </div>

      {/* Player Tab */}
      {activeTab === 'player' && (
        <div className="space-y-4">
          {/* Current Track Info */}
          {currentTrack ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-[#050819] rounded-lg">
                <img
                  src={
                    currentTrack.thumbnail ||
                    'https://via.placeholder.com/60x60/53C8FF/000000?text=M'
                  }
                  alt={currentTrack.title}
                  className="w-14 h-14 rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-white">{currentTrack.title}</h4>
                  <p className="text-sm text-white/60">{currentTrack.artist}</p>
                </div>
              </div>

              {/* YouTube Video Player */}
              {currentTrack.videoId && (
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <iframe
                    ref={playerRef}
                    src={getYouTubeEmbedUrl(currentTrack.videoId)}
                    className="w-full h-full"
                    title={currentTrack.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-white/40">
              <Icons.Music className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No track selected</p>
            </div>
          )}

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-white/60">
              <span>{formatTime(currentTime)}</span>
              <span>{currentTrack ? formatTime(currentTrack.duration) : '0:00'}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-[#53C8FF] h-2 rounded-full transition-all"
                style={{
                  width:
                    currentTrack && typeof currentTrack.duration === 'string'
                      ? `${Math.min((currentTime / 300) * 100, 100)}%` // Use 5 minutes as default max for string duration
                      : currentTrack
                        ? `${(currentTime / (currentTrack.duration as unknown as number)) * 100}%`
                        : '0%',
                }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() =>
                setRepeatMode(repeatMode === 'off' ? 'one' : repeatMode === 'one' ? 'all' : 'off')
              }
              className={`p-2 rounded-lg transition-colors ${
                repeatMode !== 'off' ? 'text-[#53C8FF]' : 'text-white/60 hover:text-white'
              }`}
            >
              <Icons.Repeat className="w-4 h-4" />
            </button>

            <button
              onClick={skipToPrevious}
              className="p-2 text-white/60 hover:text-white transition-colors"
            >
              <Icons.SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlayPause}
              className="p-3 bg-[#53C8FF] text-black rounded-full hover:bg-[#A3E7FF] transition-colors"
            >
              {isPlaying ? <Icons.Pause className="w-5 h-5" /> : <Icons.Play className="w-5 h-5" />}
            </button>

            <button
              onClick={skipToNext}
              className="p-2 text-white/60 hover:text-white transition-colors"
            >
              <Icons.SkipForward className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsShuffled(!isShuffled)}
              className={`p-2 rounded-lg transition-colors ${
                isShuffled ? 'text-[#53C8FF]' : 'text-white/60 hover:text-white'
              }`}
            >
              <Icons.Shuffle className="w-4 h-4" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3">
            <Icons.Volume2 className="w-4 h-4 text-white/60" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs text-white/60 w-8">{Math.round(volume * 100)}%</span>
          </div>
        </div>
      )}

      {/* Search Tab */}
      {activeTab === 'search' && (
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for songs, artists, albums..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-[#050819] border border-[#1E3A5F] rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#53C8FF]"
            />
            <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
          </div>

          {isLoading && (
            <div className="text-center py-4 text-white/40">
              <div className="animate-spin w-6 h-6 border-2 border-[#53C8FF] border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-sm">Searching...</p>
            </div>
          )}

          {searchResults.length > 0 && !isLoading && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {searchResults.map(track => (
                <div
                  key={track.id}
                  onClick={() => playTrack(track)}
                  className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                >
                  <img src={track.thumbnail} alt={track.title} className="w-10 h-10 rounded" />
                  <div className="flex-1">
                    <h5 className="text-sm font-medium text-white">{track.title}</h5>
                    <p className="text-xs text-white/60">{track.artist}</p>
                  </div>
                  <span className="text-xs text-white/40">{formatTime(track.duration)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Playlists Tab */}
      {activeTab === 'playlists' && (
        <div className="space-y-4">
          {playlists.map(playlist => (
            <div key={playlist.id} className="space-y-2">
              <h4 className="font-medium text-[#53C8FF]">{playlist.name}</h4>
              <div className="space-y-1 max-h-60 overflow-y-auto">
                {playlist.tracks.map(track => (
                  <div
                    key={track.id}
                    onClick={() => playTrack(track)}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      currentTrack?.id === track.id ? 'bg-[#53C8FF]/20' : 'hover:bg-white/5'
                    }`}
                  >
                    <img src={track.thumbnail} alt={track.title} className="w-8 h-8 rounded" />
                    <div className="flex-1">
                      <h5 className="text-sm font-medium text-white">{track.title}</h5>
                      <p className="text-xs text-white/60">{track.artist}</p>
                    </div>
                    {currentTrack?.id === track.id && isPlaying && (
                      <div className="flex gap-1">
                        <div className="w-1 h-3 bg-[#53C8FF] animate-pulse"></div>
                        <div className="w-1 h-3 bg-[#53C8FF] animate-pulse delay-75"></div>
                        <div className="w-1 h-3 bg-[#53C8FF] animate-pulse delay-150"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-4 pt-4 border-t border-[#1E3A5F] text-xs text-white/40 text-center">
        <p>Free Music Streaming • Powered by YouTube Music API</p>
        <p>No premium required • Ad-free experience</p>
      </div>
    </div>
  );
};

export default MusicPlayer;
