import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

// Game data from public/games folder
const games = [
  {
    id: 'snake',
    name: 'Snake Game',
    description: 'Classic snake game with modern graphics',
    category: 'Arcade',
    players: 'Single',
    rating: 4.5,
    image: '/games/snake/icon.png',
    path: '/games/snake/index.html',
    tags: ['classic', 'retro', 'arcade']
  },
  {
    id: 'tetris',
    name: 'Tetris',
    description: 'Block-stacking puzzle game',
    category: 'Puzzle',
    players: 'Single',
    rating: 4.8,
    image: '/games/tetris/icon.png',
    path: '/games/tetris/index.html',
    tags: ['puzzle', 'classic', 'addictive']
  },
  {
    id: 'space-shooter',
    name: 'Space Shooter',
    description: 'Defend Earth from alien invasion',
    category: 'Action',
    players: 'Single',
    rating: 4.2,
    image: '/games/space-shooter/icon.png',
    path: '/games/space-shooter/index.html',
    tags: ['action', 'space', 'shooter']
  },
  {
    id: 'poker',
    name: 'Texas Hold\'em',
    description: 'Multiplayer poker game',
    category: 'Card',
    players: 'Multi',
    rating: 4.6,
    image: '/games/poker/icon.png',
    path: '/games/poker/index.html',
    tags: ['card', 'multiplayer', 'casino']
  },
  {
    id: 'chess',
    name: 'Chess',
    description: 'Classic strategy board game',
    category: 'Strategy',
    players: 'Multi',
    rating: 4.9,
    image: '/games/chess/icon.png',
    path: '/games/chess/index.html',
    tags: ['strategy', 'board', 'classic']
  },
  {
    id: 'racing',
    name: 'Racing Game',
    description: 'High-speed racing action',
    category: 'Racing',
    players: 'Single',
    rating: 4.3,
    image: '/games/racing/icon.png',
    path: '/games/racing/index.html',
    tags: ['racing', 'speed', 'action']
  }
];

const categories = ['All', 'Arcade', 'Puzzle', 'Action', 'Card', 'Strategy', 'Racing'];

export function GameHubEnhanced() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState<typeof games[0] | null>(null);

  const filteredGames = games.filter(game => {
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handlePlayGame = (game: typeof games[0]) => {
    setSelectedGame(game);
    // Open game in new window or iframe
    window.open(game.path, '_blank');
  };

  const GameCard = ({ game }: { game: typeof games[0] }) => (
    <Card className="group bg-black/20 backdrop-blur-sm border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]">
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
              {game.name}
            </CardTitle>
            <CardDescription className="text-white/60 text-sm mt-1">
              {game.description}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white/80 text-sm">{game.rating}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">
            {game.category}
          </Badge>
          <Badge variant="outline" className="border-purple-500/50 text-purple-400">
            {game.players} Player
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {game.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs bg-white/10 text-white/60">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            onClick={() => handlePlayGame(game)}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-black font-semibold"
          >
            <Play className="w-4 h-4 mr-2" />
            Play Now
          </Button>
          <Button
            variant="outline"
            className="border-white/20 text-white/80 hover:bg-white/10"
          >
            <Users className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Game Hub
          </h1>
          <p className="text-white/60 text-lg">
            Choose from {games.length} amazing games
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
            <Input
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/20 border-white/10 text-white placeholder-white/40"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-white/20 text-white/80 hover:bg-white/10">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Categories */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
          <TabsList className="bg-black/20 border border-white/10">
            {categories.map(category => (
              <TabsTrigger
                key={category}
                value={category}
                className="text-white/80 data-[state=active]:text-cyan-400 data-[state=active]:bg-cyan-500/20"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-black/20 backdrop-blur-sm border-white/10">
            <CardContent className="p-4 text-center">
              <Gamepad2 className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{games.length}</div>
              <div className="text-white/60 text-sm">Total Games</div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/20 backdrop-blur-sm border-white/10">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">1.2K</div>
              <div className="text-white/60 text-sm">Active Players</div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/20 backdrop-blur-sm border-white/10">
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">47</div>
              <div className="text-white/60 text-sm">Tournaments</div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/20 backdrop-blur-sm border-white/10">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-white/60 text-sm">Always Online</div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Section */}
        <Card className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Featured Game
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">Chess Championship</h3>
                <p className="text-white/60">Join the weekly tournament and win prizes!</p>
              </div>
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                Join Tournament
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
