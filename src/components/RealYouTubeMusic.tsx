import React, { useState } from 'react';

const RealYouTubeMusic: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<any>(null);
  const [apiKey, setApiKey] = useState('');

  // Simple YouTube Data API v3 search
  const searchYouTube = async () => {
    if (!searchQuery.trim() || !apiKey.trim()) {
      alert('Please enter both search query and API key');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&videoCategoryId=10&maxResults=20&key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      setResults(data.items || []);
    } catch (error) {
      console.error('Search failed:', error);
      alert('Search failed. Check your API key and try again.');
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

      {/* API Key Input */}
      <div className="mb-4">
        <label className="block text-white/80 text-sm font-medium mb-2">
          YouTube Data API Key (get one free from Google Cloud Console)
        </label>
        <input
          type="password"
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
          placeholder="YOUR_API_KEY..."
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-red-500 focus:bg-white/15"
        />
      </div>

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
          <p className="text-white mt-2">{currentVideo.snippet.title}</p>
          <p className="text-white/60 text-sm">{currentVideo.snippet.channelTitle}</p>
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

      {/* Instructions */}
      <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <h4 className="text-yellow-400 font-medium mb-2">🔑 How to get API Key:</h4>
        <ol className="text-yellow-300 text-sm space-y-1 list-decimal list-inside">
          <li>Go to Google Cloud Console</li>
          <li>Create new project or use existing</li>
          <li>Enable YouTube Data API v3</li>
          <li>Create credentials → API Key</li>
          <li>Copy and paste the key above</li>
        </ol>
        <p className="text-yellow-200 text-xs mt-2">Free tier: 10,000 queries per day</p>
      </div>
    </div>
  );
};

export default RealYouTubeMusic;
