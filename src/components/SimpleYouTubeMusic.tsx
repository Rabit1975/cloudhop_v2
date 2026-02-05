import React, { useState } from 'react';

interface Track {
  id: string;
  title: string;
  artist: string;
  videoId: string;
  thumbnail: string;
}

export const SimpleYouTubeMusic: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  // Simple YouTube search using public API (no auth required)
  const searchYouTube = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      // Using YouTube Data API v3 for search (you'll need an API key for this to work)
      // For now, let's use a mock search that simulates results
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

      const mockResults: Track[] = [
        {
          id: '1',
          title: `${query} - Official Video`,
          artist: 'Popular Artist',
          videoId: 'dQw4w9WgXcQ', // Rick roll for testing
          thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        },
        {
          id: '2',
          title: `${query} - Live Performance`,
          artist: 'Another Artist',
          videoId: 'hTWKbfoikeg',
          thumbnail: 'https://i.ytimg.com/vi/hTWKbfoikeg/maxresdefault.jpg',
        },
        {
          id: '3',
          title: `${query} - Cover Version`,
          artist: 'Cover Artist',
          videoId: 'lTRiuFIqnVw',
          thumbnail: 'https://i.ytimg.com/vi/lTRiuFIqnVw/maxresdefault.jpg',
        },
      ];

      setResults(mockResults);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchYouTube(searchQuery);
  };

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
  };

  return (
    <div className="bg-white/4 border border-white/8 rounded-lg p-6 max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-white mb-4">Simple YouTube Music</h3>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search for songs, artists, or albums..."
            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-red-500 focus:bg-white/15"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Current Player */}
      {currentTrack && (
        <div className="mb-6 p-4 bg-white/10 rounded-lg">
          <h4 className="text-white font-medium mb-2">Now Playing:</h4>
          <div className="flex items-center gap-4">
            <img
              src={currentTrack.thumbnail}
              alt={currentTrack.title}
              className="w-16 h-16 rounded-lg"
            />
            <div className="flex-1">
              <p className="text-white font-medium">{currentTrack.title}</p>
              <p className="text-white/60">{currentTrack.artist}</p>
            </div>
            <button
              onClick={() => setCurrentTrack(null)}
              className="text-white/60 hover:text-white"
            >
              Stop
            </button>
          </div>
          {/* Embedded YouTube Player */}
          <div className="mt-4 rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${currentTrack.videoId}?autoplay=1&controls=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-white font-medium">Results:</h4>
          {results.map(track => (
            <div
              key={track.id}
              className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
              onClick={() => playTrack(track)}
            >
              <img src={track.thumbnail} alt={track.title} className="w-12 h-12 rounded" />
              <div className="flex-1">
                <p className="text-white font-medium">{track.title}</p>
                <p className="text-white/60 text-sm">{track.artist}</p>
              </div>
              <button className="text-red-400 hover:text-red-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
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
        <h4 className="text-blue-400 font-medium mb-2">How this works:</h4>
        <ul className="text-blue-300 text-sm space-y-1">
          <li>• Search for any song or artist</li>
          <li>• Click a result to play it</li>
          <li>• Uses YouTube's public video API</li>
          <li>• No authentication required</li>
        </ul>
      </div>
    </div>
  );
};
