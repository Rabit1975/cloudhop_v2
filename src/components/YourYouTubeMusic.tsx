import React, { useState } from 'react';
import { useMusicEngine } from '../core/music/useMusicEngine';
import { Play, Pause, SkipForward, Volume2, Search, Music } from 'lucide-react';

const YourYouTubeMusic: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Use Music Engine Hooks
  const { loadTrack, currentTrack, isPlaying, play, pause, volume, setVolume } = useMusicEngine({ 
    role: 'owner', // Assuming owner for local user
    autoPlay: true 
  });

  // Search using your cookie via serverless function
  const searchYouTubeMusic = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const baseUrl =
        import.meta.env.MODE === 'production' ? 'https://cloudhop-v2.vercel.app/api' : '/api';

      const response = await fetch(
        `${baseUrl}/ytmusic/real-search?query=${encodeURIComponent(searchQuery)}`
      );

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data.tracks || []);
    } catch (error) {
      console.error('Search failed:', error);
      alert("Search failed. Make sure you're deployed on Vercel for this to work.");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayTrack = (track: any) => {
    loadTrack({
      id: track.videoId,
      title: track.title,
      artist: track.artist,
      duration: 0, // Duration would come from API in a real scenario
      provider: 'youtube',
      url: `https://www.youtube.com/watch?v=${track.videoId}`
    });
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-black to-purple-900/20 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Music className="w-6 h-6 text-red-500" />
          YouTube Music
        </h3>

        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <h4 className="text-green-400 font-medium mb-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Connected
          </h4>
          <p className="text-green-300 text-sm">
            Using secure connection to YouTube Music Library
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search songs, artists, or albums..."
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all"
                onKeyPress={e => e.key === 'Enter' && searchYouTubeMusic()}
              />
            </div>
            <button
              onClick={searchYouTubeMusic}
              disabled={isLoading}
              className="px-6 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 disabled:opacity-50 transition-all active:scale-95"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {/* Now Playing Widget */}
        {currentTrack && (
          <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                 {/* Thumbnail logic would go here */}
                 <Music className="w-10 h-10 text-gray-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-white mb-1">{currentTrack.title}</h4>
                <p className="text-gray-400">{currentTrack.artist}</p>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => isPlaying ? pause() : play()}
                  className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current pl-1" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Grid */}
        <div className="grid gap-4">
          {results.map((track, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/10"
              onClick={() => handlePlayTrack(track)}
            >
              <div className="w-12 h-12 bg-gray-800 rounded-lg overflow-hidden relative">
                {track.thumbnail && <img src={track.thumbnail} alt={track.title} className="w-full h-full object-cover" />}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-6 h-6 text-white fill-current" />
                </div>
              </div>
              <div className="flex-1">
                <h5 className="font-medium text-white group-hover:text-red-400 transition-colors">{track.title}</h5>
                <p className="text-sm text-gray-400">{track.artist} • {track.album}</p>
              </div>
              <div className="text-sm text-gray-500 font-mono">
                {track.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourYouTubeMusic;
