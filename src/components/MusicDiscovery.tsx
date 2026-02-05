import React, { useState } from 'react';

const MusicDiscovery: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');

  // Curated music collections - no API needed
  const musicCollections = [
    {
      name: '🔥 Trending Now',
      videos: [
        { title: 'Sabrina Carpenter - Espresso', id: 'tRcO7lK5-N8' },
        { title: 'Post Malone - I Had Some Help', id: '8kGgZZI9l9U' },
        { title: 'Kendrick Lamar - Not Like Us', id: 'sTVzdJr_5a0' },
        { title: 'Tommy Richman - Million Dollar Baby', id: '0KSOMA7QBU0' },
      ],
    },
    {
      name: '🎸 Rock Classics',
      videos: [
        { title: 'Queen - Bohemian Rhapsody', id: 'fEvM-OUbaKs' },
        { title: 'Led Zeppelin - Stairway to Heaven', id: 'QkF3oxziUI4' },
        { title: 'Pink Floyd - Another Brick in the Wall', id: 'YR5ApYxk2-U' },
        { title: 'The Eagles - Hotel California', id: 'E_oi7Rv4-3M' },
      ],
    },
    {
      name: '🎹 Chill & Study',
      videos: [
        { title: 'Lofi Hip Hop Radio - 24/7 Chill', id: 'jfKfPfyJRdk' },
        { title: 'Jazz for Studying', id: 'Dx5qFachd3A' },
        { title: 'Ambient Music for Focus', id: '2JzMps4OqgM' },
        { title: 'Classical Music for Concentration', id: '4Tr0otuiQuU' },
      ],
    },
    {
      name: '🎵 80s Hits',
      videos: [
        { title: 'Michael Jackson - Billie Jean', id: 'Zi_XLOBDo_Y' },
        { title: 'Madonna - Like a Prayer', id: '2PvMq9sQs8Q' },
        { title: 'Prince - Purple Rain', id: 'TvnYmWpDTr8' },
        { title: 'A-ha - Take On Me', id: 'djV11Xbc914' },
      ],
    },
    {
      name: '🎤 Hip Hop Essentials',
      videos: [
        { title: 'Drake - Hotline Bling', id: 'uxpDa-c-4Mc' },
        { title: 'Kendrick Lamar - HUMBLE', id: 'tvTRZj-IZ1k' },
        { title: 'Travis Scott - SICKO MODE', id: '6UHJN9k8W6E' },
        { title: 'Cardi B - WAP', id: 'hER0S5Q5m5w' },
      ],
    },
    {
      name: '🎹 Electronic & EDM',
      videos: [
        { title: 'Daft Punk - One More Time', id: 'FGBhQbmPwH8' },
        { title: 'Avicii - Levels', id: '_ovdm2yA4K4' },
        { title: 'Skrillex - Bangarang', id: 'YGBFj-tR3pE' },
        { title: 'Deadmau5 - Strobe', id: 'gO9k3X8LkLw' },
      ],
    },
  ];

  const playVideo = (title: string, videoId: string) => {
    setCurrentVideo(videoId);
    setCurrentTitle(title);
  };

  return (
    <div className="bg-white/4 border border-white/8 rounded-lg p-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-6">🎵 Music Discovery</h3>

      {/* Current Player */}
      {currentVideo && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-medium">Now Playing:</h4>
            <button
              onClick={() => {
                setCurrentVideo('');
                setCurrentTitle('');
              }}
              className="text-white/60 hover:text-white px-3 py-1 bg-white/10 rounded-lg text-sm"
            >
              Close Player
            </button>
          </div>
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
          <p className="text-white/80 mt-3 text-center font-medium">{currentTitle}</p>
        </div>
      )}

      {/* Music Collections */}
      <div className="space-y-6">
        {musicCollections.map((collection, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-4">
            <h4 className="text-lg font-bold text-white mb-3">{collection.name}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {collection.videos.map((video, videoIndex) => (
                <button
                  key={videoIndex}
                  onClick={() => playVideo(video.title, video.id)}
                  className="text-left p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all hover:scale-105 group"
                >
                  <div className="aspect-video bg-black/30 rounded mb-2 overflow-hidden">
                    <img
                      src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <p className="text-white text-sm font-medium line-clamp-2">{video.title}</p>
                  <p className="text-white/60 text-xs mt-1">Click to play</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
        <h4 className="text-purple-400 font-medium mb-2">🎧 How it works:</h4>
        <ul className="text-purple-300 text-sm space-y-1">
          <li>• Browse curated music collections</li>
          <li>• Click any video to play instantly</li>
          <li>• No searching, no URLs to copy</li>
          <li>• Just discover and play music</li>
        </ul>
      </div>
    </div>
  );
};

export default MusicDiscovery;
