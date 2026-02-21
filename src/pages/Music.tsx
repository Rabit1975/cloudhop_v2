import { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume2,
  Heart,
  LogOut,
  Music as MusicIcon,
  Lock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
  videoId?: string;
}

interface Playlist {
  id: string;
  name: string;
  songs: Song[];
}

export default function Music() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [isShuffle, setIsShuffle] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  const playlists: Playlist[] = [
    {
      id: 'favorites',
      name: 'Liked Songs',
      songs: [
        { id: '1', title: 'Blinding Lights', artist: 'The Weeknd', duration: 200, videoId: '4NRXx6U8ABQ' },
        { id: '2', title: 'Shape of You', artist: 'Ed Sheeran', duration: 234, videoId: 'JGwWNGJdvx8' },
        { id: '3', title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', duration: 270, videoId: 'OPf0YbXqDm0' },
      ],
    },
    {
      id: 'recent',
      name: 'Recently Played',
      songs: [
        { id: '4', title: 'Sunflower', artist: 'Post Malone & Swae Lee', duration: 158, videoId: 'ApXoWvfEYVU' },
        { id: '5', title: 'Stay With Me', artist: 'Sam Smith', duration: 172, videoId: 'pB-5XG-DbAA' },
      ],
    },
  ];

  const allSongs = playlists.flatMap((p) => p.songs);
  const currentSong = allSongs[currentSongIndex];

  // Advance progress bar when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= (currentSong?.duration ?? 0)) {
          // auto-advance to next song
          handleNext();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, currentSongIndex]);

  const handlePlaySong = (songId: string) => {
    const idx = allSongs.findIndex((s) => s.id === songId);
    if (idx === currentSongIndex) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSongIndex(idx);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentSongIndex(
      isShuffle
        ? Math.floor(Math.random() * allSongs.length)
        : (currentSongIndex + 1) % allSongs.length
    );
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (currentTime > 3) {
      setCurrentTime(0);
    } else {
      setCurrentSongIndex(
        currentSongIndex === 0 ? allSongs.length - 1 : currentSongIndex - 1
      );
      setCurrentTime(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleRepeat = () => {
    const modes: ('off' | 'all' | 'one')[] = ['off', 'all', 'one'];
    setRepeatMode(modes[(modes.indexOf(repeatMode) + 1) % modes.length]);
  };

  const handleYouTubeLogin = () => {
    setIsAuthenticated(true);
    setUserEmail('user@gmail.com');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
  };

  if (!isAuthenticated) {
    return (
      <div className="h-full w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-purple-900/20 via-transparent to-black">
        <div className="glass-panel rounded-2xl border-cyan-400/30 p-12 max-w-md w-full text-center">
          <MusicIcon className="w-16 h-16 mx-auto mb-6 text-cyan-400" />
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-400 mb-2">
            YouTube Music
          </h1>
          <p className="text-muted-foreground mb-8">
            Sign in with your Google account to access your playlists,
            favorites, and watch music videos
          </p>
          <button
            onClick={handleYouTubeLogin}
            className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-bold text-lg hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-cyan-500/40 mb-4 flex items-center justify-center gap-3"
          >
            <Lock className="w-5 h-5" /> Sign In with Google
          </button>
          <div className="text-xs text-muted-foreground mt-6 px-4">
            You'll be able to access your YouTube Music account, playlists,
            liked songs, and watch music videos with your credentials.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-hidden flex gap-4 p-4 bg-gradient-to-br from-purple-900/20 via-transparent to-black">
      {/* Video + Controls */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 glass-panel rounded-xl overflow-hidden border-cyan-400/30 mb-4 flex flex-col">
          {/* YouTube player — key forces full remount on song change so autoplay works */}
          <div className="flex-1 bg-black flex items-center justify-center relative">
            {currentSong?.videoId ? (
              <iframe
                key={`${currentSong.id}-${isPlaying}`}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentSong.videoId}?autoplay=${isPlaying ? 1 : 0}&rel=0`}
                title={currentSong.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 'none' }}
              />
            ) : (
              <div className="text-center">
                <MusicIcon className="w-12 h-12 mx-auto mb-4 text-cyan-400/40" />
                <p className="text-muted-foreground">Video Player Area</p>
                <p className="text-sm text-muted-foreground mt-2">
                  YouTube videos will load here
                </p>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="px-6 py-4 border-t border-cyan-400/20">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground">
                  {currentSong?.title || 'No song selected'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {currentSong?.artist || 'Unknown artist'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {userEmail && (
                  <div className="text-xs text-muted-foreground text-right">
                    <div>{userEmail}</div>
                    <button
                      onClick={handleLogout}
                      className="text-cyan-400 hover:text-cyan-300 transition-all flex items-center gap-1 mt-1"
                    >
                      <LogOut className="w-3 h-3" /> Sign Out
                    </button>
                  </div>
                )}
                <button
                  onClick={() => setLiked(!liked)}
                  className={cn(
                    'p-2 rounded-lg transition-all',
                    liked
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-white/5 text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Heart className={cn('w-5 h-5', liked && 'fill-current')} />
                </button>
              </div>
            </div>

            {/* Progress bar — clickable scrub */}
            <div className="mb-2">
              <div
                className="h-2 bg-secondary rounded-full overflow-hidden mb-2 cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = (e.clientX - rect.left) / rect.width;
                  setCurrentTime(Math.floor(pct * (currentSong?.duration || 1)));
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all"
                  style={{
                    width: `${((currentTime || 0) / (currentSong?.duration || 1)) * 100}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(currentSong?.duration || 0)}</span>
              </div>
            </div>

            {/* Playback controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsShuffle(!isShuffle)}
                className={cn(
                  'p-2 rounded-lg transition-all',
                  isShuffle
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Shuffle className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevious}
                  className="p-2 hover:bg-white/10 rounded-lg text-foreground transition-all"
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                <button
                  onClick={handlePlayPause}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-bold hover:opacity-90 transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-cyan-500/40"
                >
                  {isPlaying ? (
                    <><Pause className="w-5 h-5 fill-current" /> Pause</>
                  ) : (
                    <><Play className="w-5 h-5 fill-current" /> Play</>
                  )}
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 hover:bg-white/10 rounded-lg text-foreground transition-all"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleRepeat}
                  className={cn(
                    'p-2 rounded-lg transition-all text-sm',
                    repeatMode !== 'off'
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                  title={`Repeat: ${repeatMode}`}
                >
                  <Repeat className="w-4 h-4" />
                  {repeatMode === 'one' && <span className="text-xs ml-1">1</span>}
                </button>
                <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                  <Volume2 className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-24 h-1 bg-secondary rounded-full cursor-pointer"
                  />
                  <span className="text-xs text-muted-foreground w-6">{volume}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Playlist sidebar */}
      <div className="w-72 glass-panel rounded-xl overflow-hidden border-magenta-400/30 flex flex-col">
        <div className="px-4 py-4 border-b border-magenta-400/20 bg-magenta-500/10">
          <h3 className="font-bold text-foreground text-sm">Your Playlists</h3>
          <p className="text-xs text-muted-foreground mt-1">{allSongs.length} songs total</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {playlists.map((playlist) => (
            <div key={playlist.id}>
              <div className="px-4 py-3 border-b border-white/5">
                <p className="text-sm font-semibold text-foreground mb-3">{playlist.name}</p>
                <div className="space-y-1">
                  {playlist.songs.map((song) => {
                    const isActive = currentSong?.id === song.id;
                    return (
                      <button
                        key={song.id}
                        onClick={() => handlePlaySong(song.id)}
                        className={cn(
                          'w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center gap-2',
                          isActive
                            ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300'
                            : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                        )}
                      >
                        <div className={cn(
                          'w-6 h-6 rounded flex items-center justify-center flex-shrink-0 text-[10px] font-bold',
                          isActive && isPlaying
                            ? 'bg-cyan-500 text-black animate-pulse'
                            : 'bg-white/10 text-muted-foreground'
                        )}>
                          {isActive && isPlaying ? '▶' : <Play className="w-3 h-3" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{song.title}</div>
                          <div className="text-muted-foreground truncate">
                            {song.artist} • {formatTime(song.duration)}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 border-t border-magenta-400/20">
          <button className="w-full px-4 py-2 rounded-lg bg-magenta-500/20 border border-magenta-400/50 text-magenta-300 hover:bg-magenta-500/30 transition-all text-sm font-medium">
            + New Playlist
          </button>
        </div>
      </div>
    </div>
  );
}
