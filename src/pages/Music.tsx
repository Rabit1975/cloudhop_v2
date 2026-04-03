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
  Loader,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
  videoId?: string;
}

interface YouTubePlaylistItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: { url: string };
    };
    resourceId: {
      videoId: string;
    };
    channelTitle: string;
  };
  contentDetails: {
    videoPublishedAt: string;
  };
}

interface Playlist {
  id: string;
  name: string;
  songs: Song[];
}

interface User {
  email: string;
  name: string;
  picture: string;
}

export default function Music() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loadingPlaylists, setLoadingPlaylists] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [isShuffle, setIsShuffle] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  const allSongs = playlists.flatMap((p) => p.songs);
  const currentSong = allSongs[currentSongIndex];

  // Check for OAuth callback on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('oauth_token');
    const userJson = params.get('oauth_user');
    const oauthError = params.get('oauth_error');

    if (oauthError) {
      console.error('❌ OAuth error:', oauthError);
      alert(`Authentication failed: ${oauthError}`);
      return;
    }

    if (token && userJson) {
      try {
        const userData = JSON.parse(decodeURIComponent(userJson));
        setAccessToken(token);
        setUser(userData);
        setIsAuthenticated(true);
        
        // Set auth flag so router allows access to /app
        localStorage.setItem('cloudhop_authenticated', 'true');
        localStorage.setItem('cloudhop_user', userData.name || userData.email);
        
        // Clean URL
        window.history.replaceState({}, document.title, '/app?tab=music');
        
        console.log('✅ Authenticated as:', userData.email);
      } catch (e) {
        console.error('❌ Failed to parse user data:', e);
      }
    }
  }, []);

  // Fetch playlists when authenticated
  useEffect(() => {
    if (!isAuthenticated || !accessToken) return;

    const fetchPlaylists = async () => {
      setLoadingPlaylists(true);
      try {
        // Fetch user's playlists
        console.log('📡 Fetching YouTube playlists...');
        const playlistsRes = await fetch('http://localhost:3001/youtube/playlists', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!playlistsRes.ok) {
          const errorText = await playlistsRes.text();
          console.error('❌ Playlists API error:', playlistsRes.status, errorText);
          throw new Error(`Failed to fetch playlists: ${playlistsRes.status}`);
        }
        const youTubePlaylists = await playlistsRes.json();
        console.log('✅ Found playlists:', youTubePlaylists.length);

        // Fetch items for each playlist
        const loadedPlaylists: Playlist[] = [];

        for (const yt of youTubePlaylists) {
          console.log(`📂 Loading playlist: ${yt.snippet.title}`);
          const itemsRes = await fetch(
            `http://localhost:3001/youtube/playlist/${yt.id}/items`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );

          if (!itemsRes.ok) {
            console.warn(`⚠️ Failed to fetch items for ${yt.snippet.title}`);
            continue;
          }
          const items = await itemsRes.json();
          console.log(`  └─ ${items.length} songs`);

          // Convert YouTube items to Song format
          const songs = items.map((item: YouTubePlaylistItem) => ({
            id: item.id,
            title: item.snippet.title,
            artist: item.snippet.channelTitle,
            duration: 0,
            videoId: item.snippet.resourceId.videoId,
          }));

          loadedPlaylists.push({
            id: yt.id,
            name: yt.snippet.title,
            songs,
          });
        }

        // Fetch liked videos
        console.log('💚 Fetching liked videos...');
        const likedRes = await fetch('http://localhost:3001/youtube/liked', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (likedRes.ok) {
          const likedVideos = await likedRes.json();
          console.log('✅ Found liked videos:', likedVideos.length);
          const likedSongs = likedVideos.map((video: any) => ({
            id: video.id,
            title: video.snippet.title,
            artist: video.snippet.channelTitle,
            duration: 0,
            videoId: video.id,
          }));

          if (likedSongs.length > 0) {
            loadedPlaylists.unshift({
              id: 'liked',
              name: '❤️ Liked Videos',
              songs: likedSongs,
            });
          }
        } else {
          console.warn('⚠️ Failed to fetch liked videos');
        }

        console.log('🎵 Total playlists loaded:', loadedPlaylists.length);
        setPlaylists(loadedPlaylists);
      } catch (error) {
        console.error('🔴 Error fetching playlists:', error);
        alert(`Error loading playlists: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setLoadingPlaylists(false);
      }
    };

    fetchPlaylists();
  }, [isAuthenticated, accessToken]);

  // Advance progress bar when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= (currentSong?.duration ?? 300)) {
          handleNext();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, currentSongIndex]);

  const handleYouTubeLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/google/url');
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('OAuth error:', error);
      alert('Failed to initiate Google Sign-In. Make sure backend is running on port 3001.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setAccessToken(null);
    setPlaylists([]);
  };

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
            className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-bold text-lg hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-cyan-500/40 mb-4"
          >
            Sign In with Google
          </button>
          <div className="text-xs text-muted-foreground mt-6 px-4">
            ⚙️ Make sure the OAuth backend is running on port 3001
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
          {/* YouTube player */}
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
                {user && (
                  <div className="text-xs text-muted-foreground text-right">
                    <div className="flex items-center gap-2">
                      {user.picture && (
                        <img src={user.picture} alt={user.name} className="w-6 h-6 rounded-full" />
                      )}
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-[10px]">{user.email}</div>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-cyan-400 hover:text-cyan-300 transition-all flex items-center gap-1 mt-2"
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

            {/* Progress bar */}
            <div className="mb-2">
              <div
                className="h-2 bg-secondary rounded-full overflow-hidden mb-2 cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = (e.clientX - rect.left) / rect.width;
                  setCurrentTime(Math.floor(pct * (currentSong?.duration || 300)));
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all"
                  style={{
                    width: `${((currentTime || 0) / (currentSong?.duration || 300)) * 100}%`,
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
          <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
            Your Playlists
            {loadingPlaylists && <Loader className="w-3 h-3 animate-spin" />}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{allSongs.length} songs total</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {playlists.length === 0 && !loadingPlaylists && (
            <div className="px-4 py-6 text-center">
              <p className="text-xs text-muted-foreground">No playlists found</p>
            </div>
          )}
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
                            {song.artist}
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
      </div>
    </div>
  );
}
