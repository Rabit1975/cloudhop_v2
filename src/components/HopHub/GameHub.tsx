import { useState } from "react";
import { Play, ArrowRight, Download, Share2, Star, Users, Zap } from "lucide-react";
import { cn } from "../../lib/utils";

interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  players: number;
  genre: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

export default function GameHub() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const strikeForce: Game = {
    id: "strikeforce",
    title: "StrikeForce",
    description:
      "Experience intense tactical combat in a dystopian future. Command elite units through strategic battlefield encounters with stunning real-time graphics and immersive gameplay.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F9a635ebefcaf44018ad40aa521cab19d%2Fd8b559bb38684b52ae3727c74a1826fc?format=webp",
    rating: 4.8,
    players: 12543,
    genre: "Strategy / Action",
    stats: [
      { label: "Campaign Length", value: "20+ Hours" },
      { label: "Multiplayer", value: "Supported" },
      { label: "Max Players", value: "4v4" },
    ],
  };

  const games: Game[] = [
    {
      id: "game-1",
      title: "Cyber Nexus",
      description: "Explore a neon-lit cyberpunk metropolis in this immersive RPG.",
      image: "https://via.placeholder.com/300x200?text=Cyber+Nexus",
      rating: 4.6,
      players: 8234,
      genre: "RPG",
    },
    {
      id: "game-2",
      title: "Void Runner",
      description: "High-speed racing through space anomalies and cosmic hazards.",
      image: "https://via.placeholder.com/300x200?text=Void+Runner",
      rating: 4.5,
      players: 6543,
      genre: "Racing",
    },
    {
      id: "game-3",
      title: "Nexus Breach",
      description: "Puzzle your way through a digital consciousness.",
      image: "https://via.placeholder.com/300x200?text=Nexus+Breach",
      rating: 4.7,
      players: 5432,
      genre: "Puzzle",
    },
    {
      id: "game-4",
      title: "Phantom Echo",
      description: "Stealth-based action in shadowy urban environments.",
      image: "https://via.placeholder.com/300x200?text=Phantom+Echo",
      rating: 4.4,
      players: 4321,
      genre: "Action",
    },
  ];

  const handlePlayClick = () => {
    setIsPlaying(true);
    // In real app, this would load the Unity WebGL build
    console.log("Loading game:", selectedGame?.id || strikeForce.id);
  };

  if (isPlaying && selectedGame) {
    return (
      <div className="h-full w-full bg-black flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-400/20 glass-panel relative z-10">
          <h2 className="text-white font-bold">{selectedGame.title}</h2>
          <button
            onClick={() => setIsPlaying(false)}
            className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 transition-all"
          >
            Back to Details
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-purple-900/20 to-black">
          <div className="text-center text-gray-400">
            <Zap className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
            <p className="text-lg font-semibold mb-2">Loading {selectedGame.title}...</p>
            <p className="text-sm">Game build will load here</p>
          </div>
        </div>
      </div>
    );
  }

  // If a game is selected but not playing (Detail View)
  if (selectedGame) {
    return (
      <div className="h-full overflow-y-auto p-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-black pointer-events-none" />
        
        <button
          onClick={() => setSelectedGame(null)}
          className="mb-6 flex items-center text-cyan-400 hover:text-white transition-colors z-10 relative"
        >
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to GameHub
        </button>

        <div className="flex gap-8 relative z-10">
          <div className="w-1/3 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-cyan-400/30 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
            <img 
              src={selectedGame.image} 
              alt={selectedGame.title} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{selectedGame.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <span className="flex items-center"><Star className="w-4 h-4 text-yellow-400 mr-1" /> {selectedGame.rating}</span>
                  <span className="flex items-center"><Users className="w-4 h-4 text-cyan-400 mr-1" /> {selectedGame.players.toLocaleString()} Playing</span>
                  <span className="bg-white/10 px-2 py-1 rounded">{selectedGame.genre}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {selectedGame.description}
            </p>

            <div className="flex gap-4 mb-8">
              <button 
                onClick={handlePlayClick}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-bold flex items-center hover:opacity-90 transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              >
                <Play className="w-5 h-5 mr-2 fill-current" /> Play Now
              </button>
              <button className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {selectedGame.stats && (
              <div className="grid grid-cols-3 gap-4">
                {selectedGame.stats.map((stat, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl">
                    <div className="text-gray-400 text-sm mb-1">{stat.label}</div>
                    <div className="text-white font-bold">{stat.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard View
  return (
    <div className="h-full overflow-y-auto p-8 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-black pointer-events-none" />

      {/* Featured Hero */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 mb-12 group h-[500px]">
        <div className="absolute inset-0">
          <img 
            src={strikeForce.image} 
            alt="StrikeForce" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 p-12 w-2/3">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-xs font-bold mb-4">
            FEATURED HERO
          </div>
          <h1 className="text-6xl font-black text-white mb-4 tracking-tight uppercase italic drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
            Strike<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Force</span>
          </h1>
          <p className="text-gray-200 text-lg mb-8 max-w-xl">
            {strikeForce.description}
          </p>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setSelectedGame(strikeForce)}
              className="px-8 py-3 rounded-full bg-cyan-400 text-black font-bold flex items-center hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)]"
            >
              <Play className="w-5 h-5 mr-2 fill-current" /> View Details
            </button>
            <div className="flex items-center gap-4 text-sm font-medium text-white">
              <span className="flex items-center"><Star className="w-4 h-4 text-yellow-400 mr-1" /> {strikeForce.rating}</span>
              <span className="flex items-center"><Users className="w-4 h-4 text-cyan-400 mr-1" /> {strikeForce.players.toLocaleString()} players</span>
              <span className="text-gray-400">{strikeForce.genre}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Games Grid */}
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Zap className="w-6 h-6 text-yellow-400 mr-2" /> Trending Now
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <div 
            key={game.id}
            onClick={() => setSelectedGame(game)}
            className="group relative bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all cursor-pointer hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
          >
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={game.image} 
                alt={game.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{game.title}</h3>
              <p className="text-xs text-gray-400 mb-3 line-clamp-2">{game.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center text-yellow-400"><Star className="w-3 h-3 mr-1" /> {game.rating}</span>
                <span className="text-gray-500">{game.genre}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
