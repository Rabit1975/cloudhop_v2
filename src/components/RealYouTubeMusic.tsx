import React, { useState, useEffect } from 'react';
import { youtubeApi } from '../services/youtubeApi';

const RealYouTubeMusic: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [currentVideo, setCurrentVideo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Search using the centralized YouTube Service (proxied to Vercel)
  const searchYouTube = async () => {
    if (!searchQuery.trim()) {
      alert('Please enter a search query');
      return;
    }

    setIsLoading(true);
    try {
      const items = await youtubeApi.searchVideos(searchQuery);
      setResults(items || []);
    } catch (error) {
      console.error('Search failed:', error);
      alert('Search failed. Please ensure the backend is deployed.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const playVideo = (video: any) => {
    setCurrentVideo(video);
  };

  return (
    <div className="bg-white/4 border border-white/8 rounded-lg p-6 max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-white mb-4">Real YouTube Music Search</h3>

      {/* Search Input */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search for music..."
            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-red-500 focus:bg-white/15"
            onKeyPress={e => e.key === 'Enter' && searchYouTube()}
          />
          <button
            onClick={searchYouTube}
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
              src={`https://www.youtube.com/embed/${currentVideo.id.videoId}?autoplay=1&controls=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-white font-medium">Results ({results.length}):</h4>
          {results.map(video => (
            <div
              key={video.id.videoId}
              className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
              onClick={() => playVideo(video)}
            >
              <img
                src={video.snippet.thumbnails.default.url}
                alt={video.snippet.title}
                className="w-12 h-12 rounded"
              />
              <div className="flex-1">
                <p className="text-white font-medium text-sm">{video.snippet.title}</p>
                <p className="text-white/60 text-xs">{video.snippet.channelTitle}</p>
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

    </div>
  );
};

export default RealYouTubeMusic;
