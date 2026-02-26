import { useState } from 'react';
import { Download, Play, ExternalLink, Star, Users, Zap } from 'lucide-react';

interface BlizzardGame {
  id: string;
  title: string;
  description: string;
  image: string;
  genres: string[];
  playerCount: string;
  rating: number;
  youtubeTrailerId?: string;
  downloadLink: string;
  features: string[];
}

const blizzardGames: BlizzardGame[] = [
  {
    id: 'overwatch2',
    title: 'Overwatch 2',
    description: 'A free-to-play, 5v5 team-based hero shooter by Blizzard Entertainment featuring over 30 characters (tanks, damage, support) and fast-paced, objective-based combat.',
    image: '/games/Overwatch SoJourn.png',
    genres: ['Hero Shooter', 'Team-Based', 'Competitive'],
    playerCount: '50M+',
    rating: 8.5,
    youtubeTrailerId: 'GKXS_YA9s7E', // Official Overwatch 2 Trailer
    downloadLink: 'https://battle.net/download/overwatch2',
    features: [
      '5v5 Competitive Gameplay',
      '30+ Unique Heroes',
      '3 Role Classes (Tank, Damage, Support)',
      'Cross-Platform Play',
      'Seasonal Content Updates',
      'Ranked Competitive Mode',
      'Free-to-Play Model',
    ],
  },
];

export default function BlizzardGamesShowcase() {
  const [selectedGame, setSelectedGame] = useState<BlizzardGame>(blizzardGames[0]);
  const [showTrailer, setShowTrailer] = useState(false);

  const handleDownloadClick = () => {
    window.open(selectedGame.downloadLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
              <span className="text-2xl">⚔️</span>
            </div>
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">
              Blizzard Entertainment
            </h1>
          </div>
          <p className="text-slate-400 text-lg">Experience world-class gaming from Blizzard</p>
        </div>

        {/* Featured Game Section */}
        <div className="rounded-2xl overflow-hidden border border-slate-700 backdrop-blur-sm bg-slate-900/50 shadow-2xl">
          {/* Game Hero */}
          <div className="relative h-96 overflow-hidden group">
            {/* Artwork Background */}
            <img
              src={selectedGame.image}
              alt={selectedGame.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/50 to-transparent" />

            {/* Play Trailer Button */}
            {selectedGame.youtubeTrailerId && (
              <button
                onClick={() => setShowTrailer(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300"
              >
                <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-500 transition-colors shadow-lg">
                  <Play className="w-10 h-10 fill-white text-white ml-1" />
                </div>
              </button>
            )}
          </div>

          {/* Game Info */}
          <div className="p-8 space-y-6">
            <div>
              <h2 className="text-4xl font-black mb-2">{selectedGame.title}</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{selectedGame.rating}/10</span>
                </div>
                <div className="flex items-center gap-1 text-cyan-400">
                  <Users className="w-5 h-5" />
                  <span className="font-bold">{selectedGame.playerCount} Players</span>
                </div>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed mb-4">
                {selectedGame.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedGame.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/50 text-orange-300 text-sm font-semibold"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {selectedGame.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-lg">&nbsp;</h3>
                <ul className="space-y-2">
                  {selectedGame.features.slice(4).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={handleDownloadClick}
                className="flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-lg transition-all active:scale-95 shadow-lg shadow-orange-600/50"
              >
                <Download className="w-5 h-5" />
                Download Now
              </button>
              <a
                href="https://www.blizzard.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600 text-white font-bold text-lg transition-all hover:bg-slate-800"
              >
                <ExternalLink className="w-5 h-5" />
                Visit Blizzard
              </a>
            </div>
          </div>
        </div>

        {/* YouTube Trailer Section */}
        {selectedGame.youtubeTrailerId && !showTrailer && (
          <div className="rounded-2xl border border-slate-700 backdrop-blur-sm bg-slate-900/50 p-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Play className="w-6 h-6 text-red-500 fill-red-500" />
              Official Trailer
            </h3>
            <button
              onClick={() => setShowTrailer(true)}
              className="w-full rounded-xl overflow-hidden group cursor-pointer"
            >
              <div className="relative h-64 bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <Play className="w-16 h-16 fill-red-500 text-red-500 group-hover:scale-110 transition-transform" />
                </div>
                <img
                  src={`https://img.youtube.com/vi/${selectedGame.youtubeTrailerId}/maxresdefault.jpg`}
                  alt="Trailer thumbnail"
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
              </div>
            </button>
          </div>
        )}

        {/* Trailer Modal */}
        {showTrailer && selectedGame.youtubeTrailerId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-4xl">
              <button
                onClick={() => setShowTrailer(false)}
                className="mb-4 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-all"
              >
                ← Close
              </button>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedGame.youtubeTrailerId}?autoplay=1`}
                  title={`${selectedGame.title} Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-bold mb-2">Official Website</h3>
            <p className="text-slate-400 mb-4">Visit the official Blizzard Entertainment website for more information.</p>
            <a
              href="https://www.blizzard.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 font-bold flex items-center gap-2"
            >
              blizzard.com <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-bold mb-2">Battle.net Launcher</h3>
            <p className="text-slate-400 mb-4">Download and manage all Blizzard games through Battle.net.</p>
            <a
              href="https://battle.net/download"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 font-bold flex items-center gap-2"
            >
              Download Battle.net <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-bold mb-2">Community & Support</h3>
            <p className="text-slate-400 mb-4">Join the community and get support from Blizzard.</p>
            <a
              href="https://www.reddit.com/r/Overwatch"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 font-bold flex items-center gap-2"
            >
              Community <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Additional Games Placeholder */}
        <div className="rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur-sm p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
          <p className="text-slate-400 mb-6">
            More Blizzard Entertainment games including Diablo IV, World of Warcraft, StarCraft II, and more!
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {['Diablo IV', 'World of Warcraft', 'StarCraft II', 'Hearthstone'].map((game) => (
              <span
                key={game}
                className="px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-semibold"
              >
                {game}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
