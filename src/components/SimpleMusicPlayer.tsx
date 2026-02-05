import React, { useState } from 'react';

const SimpleMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const tracks = [
    { title: 'Chill Vibes', artist: 'LoFi Beats', videoId: 'jfKfPfyJRdk' },
    { title: 'Study Music', artist: 'Focus Sounds', videoId: 'DWcJFNfaw9c' },
    { title: 'Gaming Music', artist: 'Epic Beats', videoId: 'lTRiuFIqnVw' },
  ];

  const playTrack = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  const currentVideo = tracks[currentTrack];

  return (
    <div className="bg-white/4 border border-white/8 rounded-lg p-6 max-w-md mx-auto">
      <h3 className="text-xl font-bold text-white mb-4">Simple Music Player</h3>

      {/* YouTube Player */}
      <div className="mb-4 rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="200"
          src={`https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=${isPlaying ? 1 : 0}&controls=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full"
        />
      </div>

      {/* Current Track Info */}
      <div className="text-center mb-4">
        <p className="text-white font-medium">{currentVideo.title}</p>
        <p className="text-white/60 text-sm">{currentVideo.artist}</p>
      </div>

      {/* Track List */}
      <div className="space-y-2">
        {tracks.map((track, index) => (
          <button
            key={index}
            onClick={() => playTrack(index)}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              currentTrack === index
                ? 'bg-red-600 text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{track.title}</p>
                <p className="text-sm opacity-80">{track.artist}</p>
              </div>
              {currentTrack === index && isPlaying && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 text-center text-white/40 text-xs">
        Simple YouTube player - no authentication needed
      </div>
    </div>
  );
};

export default SimpleMusicPlayer;
