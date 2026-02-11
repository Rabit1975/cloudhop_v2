import { useState, useEffect } from "react";
import { Play, ArrowRight, Download, Share2, Star, Users, Zap, Maximize2, X, Search, Filter } from "lucide-react";
import { cn } from "../../lib/utils";

interface Game {
  id: string;
  name: string;
  category: string;
  description?: string;
  image?: string;
  rating?: number;
  players?: number;
  path?: string;
}

interface Manifest {
  games: Game[];
}

import React from 'react';

export default function GameHub() {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>(["All"]);

  // Fetch games manifest on mount
  useEffect(() => {
    fetch("/games-manifest.json")
      .then((res) => res.json())
      .then((data: Manifest) => {
        const gamesList = data.games.map(game => ({
          ...game,
          // Generate paths and placeholders if not provided
          path: `/games/${game.id}/index.html`,
          image: `/games/${game.id}/icon.png`, // Assuming icons exist or we fallback
          rating: 4.5 + Math.random() * 0.5, // Mock rating
          players: Math.floor(Math.random() * 10000) + 1000 // Mock player count
        }));
        setGames(gamesList);
        setFilteredGames(gamesList);
        
        // Extract unique categories
        const cats = ["All", ...new Set(gamesList.map(g => g.category))].sort();
        setCategories(cats);
      })
      .catch((err) => console.error("Failed to load games manifest:", err));
  }, []);

  // Filter games when search or category changes
  useEffect(() => {
    let result = games;

    if (selectedCategory !== "All") {
      result = result.filter((g) => g.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((g) => g.name.toLowerCase().includes(query));
    }

    setFilteredGames(result);
  }, [games, selectedCategory, searchQuery]);

  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
  };

  const handlePlayNow = () => {
    if (selectedGame) {
      setIsPlaying(true);
    }
  };

  const closeModal = () => {
    setIsPlaying(false);
    setSelectedGame(null);
  };

  return (
    <div className="h-full w-full overflow-hidden flex flex-col bg-gradient-to-br from-purple-900/20 via-transparent to-black">
      {/* Header */}
      <div className="glass-panel px-8 py-6 border-b border-cyan-400/20 relative z-10">
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-400 mb-2">
          GameHub Arcade
        </h1>
        <p className="text-gray-400">
          Play {games.length} instant HTML5 classics. No downloads required.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="px-8 py-4 flex flex-col md:flex-row gap-4 items-center border-b border-white/5 bg-black/20">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-cyan-400/50 focus:outline-none transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all border",
                selectedCategory === cat
                  ? "bg-cyan-500/20 border-cyan-400/50 text-cyan-300"
                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {selectedGame && !isPlaying ? (
          // Game Details View
          <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedGame(null)}
              className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" /> Back to Library
            </button>
            
            <div className="glass-panel rounded-2xl overflow-hidden border-cyan-400/30 p-8 flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3 aspect-square bg-gray-800 rounded-xl relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-gray-500">
                    <span className="text-6xl">🎮</span>
                 </div>
                 {/* Try to load icon, fallback handled by CSS/Layout */}
                 <img 
                  src={`/games/${selectedGame.id}/icon.png`}
                  alt={selectedGame.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                 />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-2">{selectedGame.name}</h2>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {selectedGame.category}
                      </span>
                      <span className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-current" /> {selectedGame.rating?.toFixed(1)}
                      </span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <Users className="w-4 h-4" /> {selectedGame.players?.toLocaleString()} players
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Experience {selectedGame.name} directly in your browser. No downloads, no installation, just instant fun.
                </p>
                
                <div className="flex gap-4">
                  <button 
                    onClick={handlePlayNow}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5 fill-current" /> Play Now
                  </button>
                  <button className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Games Grid
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredGames.map((game) => (
              <button
                key={game.id}
                onClick={() => handleGameClick(game)}
                className="group glass-panel rounded-xl overflow-hidden border-cyan-400/20 hover:border-cyan-400/60 transition-all hover:shadow-lg hover:shadow-cyan-400/20 text-left flex flex-col h-full hover:-translate-y-1"
              >
                <div className="h-40 bg-gray-800 relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-gray-500">
                      <span className="text-4xl">🎮</span>
                   </div>
                   <img 
                    src={`/games/${game.id}/icon.png`} 
                    alt={game.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                    }}
                   />
                   <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                   <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-cyan-500 text-black flex items-center justify-center transform translate-y-10 group-hover:translate-y-0 transition-transform shadow-lg">
                     <Play className="w-4 h-4 fill-current" />
                   </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">{game.name}</h3>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {game.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      {game.rating?.toFixed(1)}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Game Modal / Overlay */}
      {isPlaying && selectedGame && (
        <div className="absolute inset-0 z-50 bg-black flex flex-col animate-in fade-in duration-300">
          <div className="flex items-center justify-between px-6 py-3 bg-gray-900 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsPlaying(false)}
                className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <ArrowRight className="w-5 h-5 rotate-180" /> <span className="text-sm font-medium">Back to Details</span>
              </button>
              <div className="h-6 w-px bg-gray-700 mx-2"></div>
              <h2 className="font-bold text-white">{selectedGame.name}</h2>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={closeModal}
                className="p-2 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 relative bg-black">
            <iframe
              src={selectedGame.path}
              title={selectedGame.name}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
