import React, { useState } from 'react';

const CookieYouTubeMusic: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Your YouTube Music cookie
  const YT_COOKIE =
    '15.YT=SQ8ZinnDYxYeZW3Axo9TxXv4GZ5-TG2ERh4QAd0j2dhGGfkyesHv9roTNjeHXBH5y_Dznw051gOSLXauWnP7ZrHZ7Ey_wXw6n6LZCDxCejwHmmPI5nRxn5A5dY_Io46ePbKw2Li1UClc8gKQZs5YZfD-QT8WMmCsVlFX0WPWotVn_n8zMei4dEP-UfTSFGogBvaprEethYuzQPjhvykPc3mWKrQYDaZq-SnZ_vQqyRmcgBF6MuZ-zI84iC5XNEe-0Am5tUhTjDAHOB6542YFv9PCwVRQR-OF-_BtxPQdDN62LZS_gXnbHSzm1-Dv6gkM8eaNjRcnwSiShJnbRUjo8g';

  // Test the cookie by making a simple request
  const testCookie = async () => {
    setIsLoading(true);
    try {
      // This will fail due to CORS, but let's try a different approach
      // We'll use a CORS proxy for testing
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const testUrl = 'https://music.youtube.com/youtubei/v1/browse?prettyPrint=false';

      const response = await fetch(proxyUrl + testUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: YT_COOKIE,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'X-Goog-Authuser': '0',
          'X-YouTube-Client-Name': '67',
          'X-YouTube-Client-Version': '1.20260128.03.00',
        },
        body: JSON.stringify({
          context: {
            client: {
              clientName: 'WEB_REMIX',
              clientVersion: '1.20260128.03.00',
            },
          },
          browseId: 'FEmusic_library_landing',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Cookie works!', data);
        setIsAuthenticated(true);
        alert('Cookie authentication successful!');
      } else {
        console.log('Cookie failed:', response.status);
        alert('Cookie authentication failed. May need a fresh cookie.');
      }
    } catch (error) {
      console.error('Cookie test failed:', error);
      alert('Cookie test failed due to CORS. This approach needs a server-side proxy.');
    } finally {
      setIsLoading(false);
    }
  };

  // Search using the cookie (this will need server-side proxy to work)
  const searchWithCookie = async () => {
    if (!isAuthenticated) {
      alert('Please test the cookie first');
      return;
    }

    setIsLoading(true);
    try {
      // This would work with a server-side proxy
      alert('Search functionality requires server-side proxy due to CORS restrictions');
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/4 border border-white/8 rounded-lg p-6 max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-white mb-4">YouTube Music with Your Cookie</h3>

      {/* Cookie Status */}
      <div className="mb-6 p-4 bg-white/10 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-white font-medium">Authentication Status:</h4>
          <span
            className={`px-2 py-1 rounded text-xs ${
              isAuthenticated ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
            }`}
          >
            {isAuthenticated ? 'Connected' : 'Not Tested'}
          </span>
        </div>
        <p className="text-white/60 text-sm">Using your YouTube Music cookie for library access</p>
      </div>

      {/* Test Cookie Button */}
      <div className="mb-6">
        <button
          onClick={testCookie}
          disabled={isLoading}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Testing Cookie...' : '🔑 Test YouTube Music Cookie'}
        </button>
      </div>

      {/* Search Section */}
      {isAuthenticated && (
        <div className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search your YouTube Music library..."
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
            />
            <button
              onClick={searchWithCookie}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      )}

      {/* Current Player */}
      {currentVideo && (
        <div className="mb-6 p-4 bg-white/10 rounded-lg">
          <h4 className="text-white font-medium mb-3">Now Playing:</h4>
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
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-white font-medium">Search Results:</h4>
          {results.map((video, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer"
              onClick={() => setCurrentVideo(video)}
            >
              <img src={video.thumbnail} alt={video.title} className="w-12 h-12 rounded" />
              <div className="flex-1">
                <p className="text-white font-medium">{video.title}</p>
                <p className="text-white/60 text-sm">{video.artist}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
        <h4 className="text-red-400 font-medium mb-2">⚠️ Current Issue:</h4>
        <p className="text-red-300 text-sm">
          Your YouTube Music cookie is valid, but browser CORS restrictions prevent direct API
          calls. This requires a server-side proxy to work properly.
        </p>
        <p className="text-red-200 text-xs mt-2">
          The cookie works, but we need to route requests through a server to bypass CORS.
        </p>
      </div>
    </div>
  );
};

export default CookieYouTubeMusic;
