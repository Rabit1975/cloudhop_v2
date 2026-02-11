import React, { useState } from 'react';

const YouTubeVideoPlayer: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [currentVideo, setCurrentVideo] = useState('');
  const [error, setError] = useState('');

  // Extract video ID from YouTube URL
  const extractVideoId = (url: string): string => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return '';
  };

  const playVideo = () => {
    const videoId = extractVideoId(videoUrl.trim());
    if (videoId) {
      setCurrentVideo(videoId);
      setError('');
    } else {
      setError('Please enter a valid YouTube URL or video ID');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      playVideo();
    }
  };

  // Popular music videos for quick testing
  const popularVideos = [
    { title: "Dua Lipa - Don't Start Now", id: 'hTWKbfoikeg' },
    { title: 'Queen - Bohemian Rhapsody', id: 'fEvM-OUbaKs' },
    { title: 'Martin Garrix - Animals', id: 'lTRiuFIqnVw' },
    { title: 'Billie Eilish - bad guy', id: 'DyDfgMOUjCI' },
    { title: 'The Weeknd - Blinding Lights', id: '4NRXx6U8ABQ' },
  ];

  return (
    <div className="w-full space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">YouTube Music Video Player</h3>

      {/* URL Input */}
      <div>
        <label className="block text-white/80 text-sm font-medium mb-2">
          YouTube Video URL or ID
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={videoUrl}
            onChange={e => setVideoUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Paste YouTube URL or video ID..."
            className="flex-1 px-4 py-2 bg-black/30 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-black/40"
          />
          <button
            onClick={playVideo}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Play
          </button>
        </div>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>

      {/* Current Video Player */}
      {currentVideo && (
        <div>
          <h4 className="text-white font-medium mb-3">Now Playing:</h4>
          <div className="rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1&controls=1&rel=0`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Popular Music Videos */}
      <div>
        <h4 className="text-white font-medium mb-3">Popular Music Videos (click to play):</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {popularVideos.map(video => (
            <button
              key={video.id}
              onClick={() => {
                setCurrentVideo(video.id);
                setError('');
              }}
              className="text-left p-3 bg-black/20 border border-cyan-400/20 rounded-lg hover:bg-cyan-400/10 transition-colors"
            >
              <p className="text-white font-medium text-sm">{video.title}</p>
              <p className="text-cyan-400 text-xs">Click to play</p>
            </button>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="p-4 bg-cyan-500/10 border border-cyan-400/20 rounded-lg">
        <h4 className="text-cyan-400 font-medium mb-2">How to use:</h4>
        <ul className="text-cyan-300 text-sm space-y-1">
          <li>• Paste any YouTube music video URL</li>
          <li>• Or paste just the video ID (the part after v=)</li>
          <li>• Click popular videos to play instantly</li>
          <li>• Works with any YouTube music video</li>
        </ul>
        <p className="text-cyan-200 text-xs mt-2">
          Example: https://www.youtube.com/watch?v=hTWKbfoikeg
        </p>
      </div>
    </div>
  );
};

export default YouTubeVideoPlayer;
