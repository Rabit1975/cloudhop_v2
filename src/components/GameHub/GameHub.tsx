import React, { useState, useEffect } from "react";
import { Search, ChevronRight, Play, ArrowRight, Download, Share2, Star, Users, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

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
    image: "/Robotninja .png",
    rating: 4.8,
    players: 12543,
    genre: "Action",
    stats: [
      { label: "Active Players", value: "12.5K" },
      { label: "Avg. Session", value: "25 min" },
      { label: "Completion Rate", value: "87%" }
    ]
  };

  const games: Game[] = [
    strikeForce,
    // Add more games here as needed
  ];

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setIsPlaying(false);
  };

  const handlePlayGame = () => {
    if (selectedGame) {
      setIsPlaying(true);
      // In a real implementation, this would open the game
      setTimeout(() => {
        setIsPlaying(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Game Hub</h1>
          <p className="text-gray-300">Choose from our collection of exciting games</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Games List */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {games.map((game) => (
                <div
                  key={game.id}
                  onClick={() => handleGameSelect(game)}
                  className={cn(
                    "bg-white/10 backdrop-blur-sm rounded-lg p-6 cursor-pointer transition-all hover:bg-white/20 border border-white/20",
                    selectedGame?.id === game.id && "ring-2 ring-purple-500 bg-white/20"
                  )}
                >
                  <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{game.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{game.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-white">{game.rating}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{game.players.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                      {game.genre}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Game Details Panel */}
          <div className="lg:col-span-1">
            {selectedGame ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="aspect-video mb-6 rounded-lg overflow-hidden">
                  <img
                    src={selectedGame.image}
                    alt={selectedGame.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">{selectedGame.title}</h2>
                <p className="text-gray-300 mb-6">{selectedGame.description}</p>
                
                {selectedGame.stats && (
                  <div className="mb-6 space-y-3">
                    {selectedGame.stats.map((stat, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">{stat.label}</span>
                        <span className="text-white font-semibold">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={handlePlayGame}
                    disabled={isPlaying}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {isPlaying ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Play Now
                      </>
                    )}
                  </button>
                  <button className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <Share2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Select a Game</h3>
                <p className="text-gray-400 text-sm">Choose a game from the list to view details and play</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
