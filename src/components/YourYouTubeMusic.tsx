import React, { useState } from 'react';

const YourYouTubeMusic: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<any>(null);

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

  const playVideo = (track: any) => {
    setCurrentVideo(track);
  };

  return (
    <div className="bg-white/4 border border-white/8 rounded-lg p-6 max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-white mb-4">🎵 Your YouTube Music Library</h3>

      <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
        <h4 className="text-green-400 font-medium mb-2">✅ Using Your YouTube Music Cookie</h4>
        <p className="text-green-300 text-sm">
          Connected to your personal YouTube Music library with full search access
        </p>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search your YouTube Music library..."
            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-red-500 focus:bg-white/15"
            onKeyPress={e => e.key === 'Enter' && searchYouTubeMusic()}
          />
          <button
            onClick={searchYouTubeMusic}
            disabled={isLoading}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {/* Current Player */}
      {currentVideo && (
        <div className="mb-6 p-4 bg-white/10 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white font-medium">Now Playing:</h4>
            <button
              onClick={() => setCurrentVideo(null)}
              className="text-white/60 hover:text-white text-sm"
            >
              Close
            </button>
          </div>
          <div className="rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="300"
              src={`https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=1&controls=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full"
            />
          </div>
          <p className="text-white mt-2 font-medium">{currentVideo.title}</p>
          <p className="text-white/60">{currentVideo.artist}</p>
          {currentVideo.album && <p className="text-white/60 text-sm">{currentVideo.album}</p>}
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-white font-medium">Found {results.length} results:</h4>
          {results.map((track, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
              onClick={() => playVideo(track)}
            >
              <img src={track.thumbnail} alt={track.title} className="w-12 h-12 rounded" />
              <div className="flex-1">
                <p className="text-white font-medium">{track.title}</p>
                <p className="text-white/60 text-sm">{track.artist}</p>
                {track.album && <p className="text-white/40 text-xs">{track.album}</p>}
              </div>
              <div className="text-right">
                {track.duration && <p className="text-white/60 text-sm">{track.duration}</p>}
                <button className="text-red-400 hover:text-red-300 mt-1">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {results.length === 0 && searchQuery && !isLoading && (
        <div className="text-center py-8 text-white/60">
          <p>No results found for "{searchQuery}"</p>
          <p className="text-sm mt-2">Try a different search term</p>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <h4 className="text-blue-400 font-medium mb-2">🎯 How this works:</h4>
        <ul className="text-blue-300 text-sm space-y-1">
          <li>• Uses your personal YouTube Music cookie</li>
          <li>• Searches your actual library and recommendations</li>
          <li>• Serverless function bypasses CORS restrictions</li>
          <li>• Works when deployed on Vercel</li>
        </ul>
        <p className="text-blue-200 text-xs mt-2">
          Deploy to Vercel to enable full YouTube Music library access
        </p>
      </div>
    </div>
  );
};

export default YourYouTubeMusic;
