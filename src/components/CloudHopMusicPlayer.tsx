import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../constants';
import { ytmusicService } from '../services/ytmusicService';
import { YouTubeMusicAuth } from './YouTubeMusicAuth';

// Missing icon components
const Minimize2 = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
  </svg>
);

const Maximize2 = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M15 3h6v6M9 21H3v-6M21 3l-6 6M3 21l6-6" />
  </svg>
);

const X = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const ExternalLink = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15,3 21,3 21,9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: string;
  thumbnail?: string;
  videoId?: string;
}

interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
}

const CloudHopMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'one' | 'all'>('off');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [activeTab, setActiveTab] = useState<'player' | 'search' | 'auth'>('player');
  const [isLoading, setIsLoading] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ytCookie, setYtCookie] = useState<string | null>(null);

  const playerRef = useRef<HTMLIFrameElement>(null);

  // Sample playlists with real YouTube video IDs
  const [playlists] = useState<Playlist[]>([
    {
      id: '1',
      name: 'CloudHop Favorites',
      tracks: [
        {
          id: '1',
          title: 'Queen - Bohemian Rhapsody',
          artist: 'Queen',
          duration: '5:55',
          videoId: 'fEvM-OUbaKs',
          thumbnail: 'https://img.youtube.com/vi/fEvM-OUbaKs/default.jpg',
        },
        {
          id: '2',
          title: 'The Weeknd - Blinding Lights',
          artist: 'The Weeknd',
          duration: '3:20',
          videoId: 'C-u5mLJmKjM',
          thumbnail: 'https://img.youtube.com/vi/C-u5mLJmKjM/default.jpg',
        },
        {
          id: '3',
          title: "Dua Lipa - Don't Start Now",
          artist: 'Dua Lipa',
          duration: '3:03',
          videoId: 'hTWKbfoikeg',
          thumbnail: 'https://img.youtube.com/vi/hTWKbfoikeg/default.jpg',
        },
        {
          id: '4',
          title: 'Ed Sheeran - Shape of You',
          artist: 'Ed Sheeran',
          duration: '3:53',
          videoId: '09R8_2nJtjg',
          thumbnail: 'https://img.youtube.com/vi/09R8_2nJtjg/default.jpg',
        },
        {
          id: '5',
          title: 'Imagine Dragons - Believer',
          artist: 'Imagine Dragons',
          duration: '3:24',
          videoId: 'gC7v7U_3HwA',
          thumbnail: 'https://img.youtube.com/vi/gC7v7U_3HwA/default.jpg',
        },
      ],
    },
    {
      id: '2',
      name: 'Chill & Study',
      tracks: [
        {
          id: '6',
          title: 'lofi hip hop radio - beats to relax/study to',
          artist: 'Lofi Girl',
          duration: '0:00',
          videoId: 'jfKfPfyJRdk',
          thumbnail: 'https://img.youtube.com/vi/jfKfPfyJRdk/default.jpg',
        },
        {
          id: '7',
          title: 'Peaceful Piano - Relaxing Music',
          artist: 'Piano Peace',
          duration: '1:00:00',
          videoId: '4xDlrWkYp3E',
          thumbnail: 'https://img.youtube.com/vi/4xDlrWkYp3E/default.jpg',
        },
        {
          id: '8',
          title: 'Chill Vibes - Relaxing Music',
          artist: 'Chill Music',
          duration: '0:00',
          videoId: 'DWcJFNfaw9c',
          thumbnail: 'https://img.youtube.com/vi/DWcJFNfaw9c/default.jpg',
        },
      ],
    },
    {
      id: '3',
      name: 'Rock Classics',
      tracks: [
        {
          id: '9',
          title: 'Led Zeppelin - Stairway to Heaven',
          artist: 'Led Zeppelin',
          duration: '8:02',
          videoId: '1w7OgIMMRc4',
          thumbnail: 'https://img.youtube.com/vi/1w7OgIMMRc4/default.jpg',
        },
        {
          id: '10',
          title: 'Nirvana - Smells Like Teen Spirit',
          artist: 'Nirvana',
          duration: '5:01',
          videoId: 'hT_nvWreIhg',
          thumbnail: 'https://img.youtube.com/vi/hT_nvWreIhg/default.jpg',
        },
        {
          id: '11',
          title: 'Metallica - Enter Sandman',
          artist: 'Metallica',
          duration: '5:32',
          videoId: '1lWJXDG2i0A',
          thumbnail: 'https://img.youtube.com/vi/1lWJXDG2i0A/default.jpg',
        },
      ],
    },
    {
      id: '4',
      name: 'Hip Hop Essentials',
      tracks: [
        {
          id: '12',
          title: "Drake - God's Plan",
          artist: 'Drake',
          duration: '3:19',
          videoId: 'vpdiVwJ3m8M',
          thumbnail: 'https://img.youtube.com/vi/vpdiVwJ3m8M/default.jpg',
        },
        {
          id: '13',
          title: 'Eminem - Lose Yourself',
          artist: 'Eminem',
          duration: '5:26',
          videoId: '6JCLY0Rlx6Q',
          thumbnail: 'https://img.youtube.com/vi/6JCLY0Rlx6Q/default.jpg',
        },
        {
          id: '14',
          title: 'Kendrick Lamar - HUMBLE.',
          artist: 'Kendrick Lamar',
          duration: '2:57',
          videoId: 'UJeMA7geogo',
          thumbnail: 'https://img.youtube.com/vi/UJeMA7geogo/default.jpg',
        },
      ],
    },
    {
      id: '5',
      name: 'Electronic Vibes',
      tracks: [
        {
          id: '15',
          title: 'Martin Garrix - Animals',
          artist: 'Martin Garrix',
          duration: '5:03',
          videoId: 'lTRiuFIqnVw',
          thumbnail: 'https://img.youtube.com/vi/lTRiuFIqnVw/default.jpg',
        },
        {
          id: '16',
          title: 'Avicii - Levels',
          artist: 'Avicii',
          duration: '3:18',
          videoId: 'kTJczUoc26U',
          thumbnail: 'https://img.youtube.com/vi/kTJczUoc26U/default.jpg',
        },
        {
          id: '17',
          title: 'PSY - GANGNAM STYLE',
          artist: 'PSY',
          duration: '4:13',
          videoId: '9bZkp7q19f0',
          thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/default.jpg',
        },
      ],
    },
  ]);

  // YouTube video embedding function
  const getYouTubeEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1&origin=${window.location.origin}&playsinline=1&iv_load_policy=3&fs=0&showinfo=0&autohide=1`;
  };

  // Search YouTube Music
  const searchYouTubeMusic = async (query: string) => {
    console.log('🔍 Searching for:', query);
    setIsLoading(true);
    try {
      const results = await ytmusicService.search(query, ytCookie || undefined);
      console.log('🎵 Search results:', results);
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
      console.log('✅ Set search results:', tracks.length, 'tracks');
    } catch (error) {
      console.error('❌ Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle authentication
  const handleAuthenticated = (cookie: string) => {
    setYtCookie(cookie);
    setIsAuthenticated(true);
    setActiveTab('search');
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
      return time;
    }
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
    <div className="h-full w-full flex flex-col bg-transparent">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#53C8FF] to-[#A3E7FF] rounded-lg flex items-center justify-center shadow-lg">
            <Icons.Music className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">CloudHop Music</h3>
            <p className="text-xs text-white/60">Premium YouTube Music Experience</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1"></span>
            Premium
          </div>
          <button
            onClick={() => setShowVideo(!showVideo)}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all hover:scale-105"
            title={showVideo ? 'Hide Video' : 'Show Video'}
          >
            {showVideo ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-4 border-b border-white/10">
        {[
          { id: 'player', label: 'Now Playing', icon: Icons.Play },
          { id: 'search', label: 'Search', icon: Icons.Search },
          { id: 'auth', label: 'YouTube Music', icon: Icons.MusicNote },
          { id: 'playlists', label: 'Playlists', icon: Icons.MusicNote },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-[#53C8FF] to-[#A3E7FF] text-black shadow-lg'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{tab.label}</span>
            {tab.id === 'auth' && isAuthenticated && (
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Player Tab */}
        {activeTab === 'player' && (
          <div className="p-4 space-y-4">
            {/* Video Player */}
            {currentTrack && showVideo && (
              <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
                <iframe
                  ref={playerRef}
                  src={currentTrack.videoId ? getYouTubeEmbedUrl(currentTrack.videoId) : ''}
                  className="w-full h-full"
                  title={currentTrack.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}

            {/* Current Track Info */}
            {currentTrack ? (
              <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      currentTrack.thumbnail ||
                      'https://via.placeholder.com/60x60/53C8FF/000000?text=M'
                    }
                    alt={currentTrack.title}
                    className="w-16 h-16 rounded-lg shadow-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white">{currentTrack.title}</h4>
                    <p className="text-sm text-white/60">{currentTrack.artist}</p>
                    <p className="text-xs text-white/40">{currentTrack.album}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/60">{formatTime(currentTrack.duration)}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Icons.Music className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/40">No track selected</p>
              </div>
            )}

            {/* Controls */}
            <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center justify-center gap-4 mb-4">
                <button
                  onClick={() =>
                    setRepeatMode(
                      repeatMode === 'off' ? 'one' : repeatMode === 'one' ? 'all' : 'off'
                    )
                  }
                  className={`p-2 rounded-lg transition-all ${
                    repeatMode !== 'off' ? 'text-[#53C8FF]' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Icons.Repeat className="w-4 h-4" />
                </button>

                <button
                  onClick={skipToPrevious}
                  className="p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  <Icons.SkipBack className="w-5 h-5" />
                </button>

                <button
                  onClick={togglePlayPause}
                  className="p-4 bg-gradient-to-r from-[#53C8FF] to-[#A3E7FF] text-black rounded-full hover:from-[#A3E7FF] hover:to-[#53C8FF] transition-all transform hover:scale-105 shadow-lg"
                >
                  {isPlaying ? (
                    <Icons.Pause className="w-6 h-6" />
                  ) : (
                    <Icons.Play className="w-6 h-6" />
                  )}
                </button>

                <button
                  onClick={skipToNext}
                  className="p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  <Icons.SkipForward className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setIsShuffled(!isShuffled)}
                  className={`p-2 rounded-lg transition-all ${
                    isShuffled ? 'text-[#53C8FF]' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Icons.Shuffle className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-white/60">
                  <span>{formatTime(currentTime)}</span>
                  <span>{currentTrack ? formatTime(currentTrack.duration) : '0:00'}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#53C8FF] to-[#A3E7FF] h-2 rounded-full transition-all"
                    style={{
                      width:
                        currentTrack && typeof currentTrack.duration === 'string'
                          ? `${Math.min((currentTime / 300) * 100, 100)}%`
                          : currentTrack
                            ? `${(currentTime / (currentTrack.duration as unknown as number)) * 100}%`
                            : '0%',
                    }}
                  />
                </div>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3 mt-4">
                <Icons.Volume2 className="w-4 h-4 text-white/60" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={e => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xs text-white/60 w-8">{Math.round(volume * 100)}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Search Tab */}
        {activeTab === 'search' && (
          <div className="p-4 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for songs, artists, albums..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#53C8FF] focus:bg-white/15 transition-all"
              />
              <Icons.Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            </div>

            {isLoading && (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-2 border-[#53C8FF] border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-white/60">Searching...</p>
              </div>
            )}

            {searchResults.length > 0 && !isLoading && (
              <div className="space-y-2">
                {searchResults.map(track => (
                  <div
                    key={track.id}
                    onClick={() => playTrack(track)}
                    className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer transition-all hover:scale-[1.02] border border-white/10"
                  >
                    <img src={track.thumbnail} alt={track.title} className="w-12 h-12 rounded-lg" />
                    <div className="flex-1">
                      <h5 className="text-sm font-medium text-white">{track.title}</h5>
                      <p className="text-xs text-white/60">{track.artist}</p>
                    </div>
                    <span className="text-xs text-white/40">{formatTime(track.duration)}</span>
                  </div>
                ))}
              </div>
            )}

            {!isLoading && searchQuery && searchResults.length === 0 && (
              <div className="text-center py-8">
                <Icons.Search className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <h3 className="text-white font-medium mb-2">No results found</h3>
                <p className="text-white/60 text-sm">
                  Try searching for "queen", "drake", "lofi", or "imagine dragons"
                </p>
                <p className="text-white/40 text-xs mt-2">
                  Debug: Query "{searchQuery}" returned 0 results
                </p>
              </div>
            )}
          </div>
        )}

        {/* Authentication Tab */}
        {activeTab === 'auth' && (
          <div className="p-4">
            <YouTubeMusicAuth
              onAuthenticated={handleAuthenticated}
              isAuthenticated={isAuthenticated}
            />
          </div>
        )}

        {/* Playlists Tab */}
        {activeTab === 'playlists' && (
          <div className="p-4 space-y-4">
            {playlists.map(playlist => (
              <div key={playlist.id} className="bg-white/10 rounded-lg p-4 border border-white/10">
                <h4 className="text-lg font-bold text-white mb-3">{playlist.name}</h4>
                <div className="space-y-2">
                  {playlist.tracks.map(track => (
                    <div
                      key={track.id}
                      onClick={() => playTrack(track)}
                      className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg cursor-pointer transition-all"
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CloudHopMusicPlayer;
