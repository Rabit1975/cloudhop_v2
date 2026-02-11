import { useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume2,
  Heart,
  MoreVertical,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [userEmail, setUserEmail] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off");
  const [isShuffle, setIsShuffle] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleYouTubeLogin = () => {
    // TODO: Connect to your YouTube API auth
    // Call your YouTube authentication endpoint
    console.log("Initiating YouTube login...");
    // Example: window.location.href = '/api/youtube-auth';
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail("");
    // TODO: Clear YouTube auth tokens
  };

  // Placeholder playlists - replace with YouTube API data
  const playlists: Playlist[] = [
    {
      id: "favorites",
      name: "Liked Songs",
      songs: [
        {
          id: "1",
          title: "Doomed",
          artist: "Iann Dior",
          duration: 234,
          videoId: "placeholder1",
        },
        {
          id: "2",
          title: "I Grew Up In This",
          artist: "By Relazione",
          duration: 210,
          videoId: "placeholder2",
        },
        {
          id: "3",
          title: "I'm losing it",
          artist: "Uo the Don",
          duration: 194,
          videoId: "placeholder3",
        },
      ],
    },
    {
      id: "recent",
      name: "Recently Played",
      songs: [
        {
          id: "4",
          title: "SOC - Artificial Intelligence",
          artist: "Skyler Casting",
          duration: 219,
          videoId: "placeholder4",
        },
        {
          id: "5",
          title: "Crash",
          artist: "One Less Lonely Girl",
          duration: 207,
          videoId: "placeholder5",
        },
      ],
    },
  ];

  const allSongs = playlists.flatMap((p) => p.songs);
  const currentSong = allSongs[currentSongIndex];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // TODO: Connect to YouTube API - play/pause video
  };

  const handleNext = () => {
    if (isShuffle) {
      setCurrentSongIndex(Math.floor(Math.random() * allSongs.length));
    } else {
      setCurrentSongIndex((prev) => (prev + 1) % allSongs.length);
    }
    setCurrentTime(0);
    setIsPlaying(true);
    // TODO: Connect to YouTube API - load next video
  };

  const handlePrevious = () => {
    if (currentTime > 3) {
      setCurrentTime(0);
    } else {
      setCurrentSongIndex((prev) =>
        prev === 0 ? allSongs.length - 1 : prev - 1
      );
    }
    setCurrentTime(0);
    // TODO: Connect to YouTube API - load previous video
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleRepeat = () => {
    const modes: ("off" | "all" | "one")[] = ["off", "all", "one"];
    const currentIndex = modes.indexOf(repeatMode);
    setRepeatMode(modes[(currentIndex + 1) % modes.length]);
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="h-full w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-purple-900/20 via-transparent to-black">
        <div className="glass-panel rounded-2xl border-cyan-400/30 p-12 max-w-md w-full text-center">
          <div className="text-6xl mb-6">🎵</div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-400 mb-2">
            YouTube Music
          </h1>
          <p className="text-gray-400 mb-8">
            Sign in with your Google account to access your playlists, favorites, and watch music videos
          </p>

          <button
            onClick={handleYouTubeLogin}
            className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-bold text-lg hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-cyan-500/40 mb-4 flex items-center justify-center gap-3"
          >
            <span className="text-xl">🔐</span>
            Sign In with Google
          </button>

          <div className="text-xs text-gray-500 mt-6 px-4">
            You'll be able to access your YouTube Music account, playlists, liked songs, and watch music videos with your credentials.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-hidden flex gap-4 p-4 bg-gradient-to-br from-purple-900/20 via-transparent to-black">
      {/* Main Player Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Video Player */}
        <div className="flex-1 glass-panel rounded-xl overflow-hidden border-cyan-400/30 mb-4 flex flex-col">
          {/* Video Area */}
          <div className="flex-1 bg-black flex items-center justify-center relative">
            {currentSong?.videoId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentSong.videoId}?autoplay=${
                  isPlaying ? 1 : 0
                }`}
                title={currentSong.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-4">🎵</div>
                <p className="text-gray-400">Video Player Area</p>
                <p className="text-sm text-gray-500 mt-2">
                  YouTube videos will load here
                </p>
              </div>
            )}
          </div>

          {/* Now Playing Info */}
          <div className="px-6 py-4 border-t border-cyan-400/20">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white">
                  {currentSong?.title || "No song selected"}
                </h2>
                <p className="text-sm text-gray-400">
                  {currentSong?.artist || "Unknown artist"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {userEmail && (
                  <div className="text-xs text-gray-400 text-right">
                    <div>{userEmail}</div>
                    <button
                      onClick={handleLogout}
                      className="text-cyan-400 hover:text-cyan-300 transition-all flex items-center gap-1 mt-1"
                    >
                      <LogOut className="w-3 h-3" />
                      Sign Out
                    </button>
                  </div>
                )}
                <button
                  onClick={() => setLiked(!liked)}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    liked
                      ? "bg-red-500/20 text-red-400"
                      : "bg-white/5 text-gray-400 hover:text-white"
                  )}
                >
                  <Heart
                    className={cn("w-5 h-5", liked && "fill-current")}
                  />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-2">
              <div className="h-1 bg-gray-700 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
                  style={{
                    width: `${((currentTime || 0) / (currentSong?.duration || 1)) * 100}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(currentSong?.duration || 0)}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsShuffle(!isShuffle)}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  isShuffle
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "text-gray-400 hover:text-white"
                )}
              >
                <Shuffle className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevious}
                  className="p-2 hover:bg-white/10 rounded-lg text-white transition-all"
                >
                  <SkipBack className="w-5 h-5" />
                </button>

                <button
                  onClick={handlePlayPause}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-bold hover:opacity-90 transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-cyan-500/40"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5 fill-current" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-current" />
                      Play
                    </>
                  )}
                </button>

                <button
                  onClick={handleNext}
                  className="p-2 hover:bg-white/10 rounded-lg text-white transition-all"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={toggleRepeat}
                  className={cn(
                    "p-2 rounded-lg transition-all text-sm",
                    repeatMode !== "off"
                      ? "bg-cyan-500/20 text-cyan-400"
                      : "text-gray-400 hover:text-white"
                  )}
                  title={`Repeat: ${repeatMode}`}
                >
                  <Repeat className="w-4 h-4" />
                  {repeatMode === "one" && (
                    <span className="text-xs ml-1">1</span>
                  )}
                </button>

                <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                  <Volume2 className="w-4 h-4 text-gray-400" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-24 h-1 bg-gray-700 rounded-full cursor-pointer"
                  />
                  <span className="text-xs text-gray-400 w-6">{volume}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Playlists Sidebar */}
      <div className="w-72 glass-panel rounded-xl overflow-hidden border-magenta-400/30 flex flex-col">
        <div className="px-4 py-4 border-b border-magenta-400/20 bg-magenta-500/10">
          <h3 className="font-bold text-white text-sm">Your Playlists</h3>
          <p className="text-xs text-gray-400 mt-1">
            {allSongs.length} songs total
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {playlists.map((playlist) => (
            <div key={playlist.id}>
              <div className="px-4 py-3 border-b border-white/5">
                <p className="text-sm font-semibold text-white mb-3">
                  {playlist.name}
                </p>
                <div className="space-y-1">
                  {playlist.songs.map((song, idx) => (
                    <button
                      key={song.id}
                      onClick={() => {
                        setCurrentSongIndex(
                          allSongs.findIndex((s) => s.id === song.id)
                        );
                        setCurrentTime(0);
                        setIsPlaying(true);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-xs transition-all",
                        currentSong?.id === song.id
                          ? "bg-cyan-500/20 border border-cyan-400/50 text-cyan-300"
                          : "text-gray-300 hover:bg-white/5"
                      )}
                    >
                      <div className="font-medium truncate">{song.title}</div>
                      <div className="text-gray-500 truncate">
                        {song.artist} • {formatTime(song.duration)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Playlist Button */}
        <div className="px-4 py-3 border-t border-magenta-400/20">
          <button className="w-full px-4 py-2 rounded-lg bg-magenta-500/20 border border-magenta-400/50 text-magenta-300 hover:bg-magenta-500/30 transition-all text-sm font-medium">
            + New Playlist
          </button>
        </div>
      </div>
    </div>
  );
}
