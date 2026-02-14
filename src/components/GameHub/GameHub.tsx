import React, { useState, useEffect } from "react";
import { 
  Gamepad2, 
  Users, 
  Star, 
  Play, 
  Search,
  Filter,
  Trophy,
  Clock,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TwitchIntegration from '../TwitchIntegration/TwitchIntegration';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'games' | 'twitch'>('games');

  // Real HTML5 games from public/games folder
  const realGames: Game[] = [
    {
      id: "2048",
      title: "2048",
      description: "Classic sliding puzzle game with modern graphics",
      image: "/games/2048/2048.png",
      rating: 4.6,
      players: 1,
      genre: "Puzzle",
      stats: [
        { label: "Best Score", value: "2048" },
        { label: "Games Played", value: "156" }
      ]
    },
    {
      id: "asteroids",
      title: "Asteroids",
      description: "Classic space shooter with asteroids and power-ups",
      image: "/games/asteroids/asteroids.png",
      rating: 4.0,
      players: 1,
      genre: "Action",
      stats: [
        { label: "High Score", value: "25,000" },
        { label: "Asteroids Destroyed", value: "1,247" }
      ]
    },
    {
      id: "tetris",
      title: "Tetris",
      description: "Classic block-stacking puzzle game",
      image: "/games/tetris/tetris.png",
      rating: 4.5,
      players: 1,
      genre: "Puzzle",
      stats: [
        { label: "High Score", value: "15,000" },
        { label: "Lines Cleared", value: "150" }
      ]
    },
    {
      id: "snake",
      title: "Snake",
      description: "Classic snake game with smooth controls",
      image: "/games/snake/snake.png",
      rating: 4.2,
      players: 1,
      genre: "Arcade",
      stats: [
        { label: "High Score", value: "8,500" },
        { label: "Length", value: "45" }
      ]
    },
    {
      id: "pong",
      title: "Pong",
      description: "Classic table tennis game",
      image: "/games/pong/pong.png",
      rating: 4.3,
      players: 2,
      genre: "Sports",
      stats: [
        { label: "Rally Score", value: "21-18" },
        { label: "Longest Rally", value: "87" }
      ]
    },
    {
      id: "flappybird",
      title: "Flappy Bird",
      description: "Addictive flying bird game",
      image: "/games/flappybird/flappybird.png",
      rating: 4.4,
      players: 1,
      genre: "Arcade",
      stats: [
        { label: "High Score", value: "89" },
        { label: "Games Played", value: "234" }
      ]
    },
    {
      id: "fireboy-watergirl",
      title: "Fireboy & Watergirl",
      description: "Cooperative adventure game",
      image: "/games/fireboy-and-watergirl-1/fireboy-and-watergirl-1.png",
      rating: 4.7,
      players: 2,
      genre: "Adventure",
      stats: [
        { label: "Levels Completed", value: "32" },
        { label: "Time Played", value: "12 hours" }
      ]
    }
  ];

  const filteredGames = realGames.filter(game => 
    game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      }, 3000);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-sm border-b border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            Game Hub
          </h1>
          <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 border border-white/10">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-white placeholder-gray-400 outline-none w-64"
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2">
          {[
            { id: 'games' as const, label: 'Games', icon: <Zap className="w-4 h-4" /> },
            { id: 'twitch' as const, label: 'Twitch', icon: <Twitch className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-cyan-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {activeTab === 'games' ? (
          <>
            {/* Game Grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 overflow-y-auto">
              {filteredGames.map(game => (
            <div
              key={game.id}
              onClick={() => handleGameSelect(game)}
              className={cn(
                'bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-4 cursor-pointer transition-all hover:bg-white/10 hover:border-cyan-500/30',
                selectedGame?.id === game.id ? 'ring-2 ring-cyan-500' : ''
              )}
            >
              {/* Game Image */}
              <div className="w-full h-32 bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-game.png';
                  }}
                />
              </div>
              
              {/* Game Info */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">{game.title}</h3>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">{game.description}</p>
                
                {/* Game Stats */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-medium">{game.rating}</span>
                  </div>
                  {game.players && (
                    <div className="flex items-center gap-1 text-sm text-gray-300">
                      <Users className="w-4 h-4" />
                      <span>{game.players} players</span>
                    </div>
                  )}
                </div>

                {/* Game Stats Details */}
                {game.stats && (
                  <div className="space-y-1 text-xs">
                    {game.stats.map((stat, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-400">{stat.label}:</span>
                        <span className="text-white font-medium">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Play Button */}
                <button
                  onClick={handlePlayGame}
                  disabled={!selectedGame || isPlaying}
                  className={cn(
                    'w-full py-2 px-4 rounded-lg font-medium transition-all',
                    selectedGame?.id === game.id && !isPlaying
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600'
                      : 'bg-gray-700 text-gray-300 cursor-not-allowed'
                  )}
                >
                  {isPlaying && selectedGame?.id === game.id ? (
                    <span className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white/30 rounded-full animate-spin" />
                      <span className="ml-2">Loading...</span>
                    </span>
                  ) : selectedGame?.id === game.id ? (
                    'Play Game'
                  ) : (
                    'Select Game'
                  )}
                </button>
              </div>
            </div>
          ))}
            </div>
          </>
        ) : (
          <TwitchIntegration />
        )}
      </div>
    </div>
  );
}
