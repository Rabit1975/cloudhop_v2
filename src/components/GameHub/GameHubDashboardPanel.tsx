import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Gamepad2, 
  Star, 
  Play,
  Eye,
  Trophy,
  Clock,
  Users
} from 'lucide-react';

// Mock games data
const mockGames = [
  {
    id: '1',
    name: 'Nebula Racers',
    gameType: 'html5',
    tags: ['Racing', 'Sci-Fi'],
    imageUrls: ['https://storage.googleapis.com/bit-generated-images/images/image_a_stunning__futuristic_game_da_0_1770835130519.png'],
    rating: 4.5,
    players: 'Single',
    description: 'High-speed racing through nebulas and galaxies'
  },
  {
    id: '2',
    name: 'Cosmic Quest',
    gameType: 'unity',
    tags: ['Adventure', 'RPG'],
    imageUrls: ['https://storage.googleapis.com/bit-generated-images/images/image_a_stunning__futuristic_game_da_0_1770835130519.png'],
    rating: 4.8,
    players: 'Multi',
    description: 'Epic space adventure with RPG elements'
  },
  {
    id: '3',
    name: 'Starfighter Arena',
    gameType: 'external_stream',
    tags: ['Action', 'Multiplayer'],
    imageUrls: ['https://storage.googleapis.com/bit-generated-images/images/image_a_stunning__futuristic_game_da_0_1770835130519.png'],
    rating: 4.2,
    players: 'Multi',
    description: 'Intense multiplayer space combat'
  }
];

// Default games data
const defaultGames = [
  {
    id: '1',
    name: 'Nebula Racers',
    gameType: 'html5',
    tags: ['Racing', 'Sci-Fi'],
    imageUrls: ['https://storage.googleapis.com/bit-generated-images/images/image_a_stunning__futuristic_game_da_0_1770835130519.png'],
    rating: 4.5,
    players: 'Single',
    description: 'High-speed racing through nebulas and galaxies'
  }
];

export type GameHubDashboardPanelProps = {
  /**
   * Additional class name for the panel.
   */
  className?: string;

  /**
   * Maximum number of games to display.
   * @default 3
   */
  limit?: number;

  /**
   * Mock data for preview or testing purposes.
   */
  mockGames?: typeof mockGames;
};

export function GameHubDashboardPanel({ 
  className, 
  limit = 3,
  mockGames: providedMockGames
}: GameHubDashboardPanelProps) {
  const games = providedMockGames || defaultGames.slice(0, limit);
  const hasGames = games && games.length > 0;

  return (
    <Card className={`bg-black/20 backdrop-blur-sm border-white/10 ${className || ''}`}>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-white flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-cyan-400" />
          Featured Games
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20"
          onClick={() => window.location.href = '/gamehub'}
        >
          <Eye className="w-4 h-4 mr-1" />
          View All
        </Button>
      </CardHeader>
      
      <CardContent className="p-4">
        {hasGames ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {games.map((game) => (
              <div key={game.id} className="group">
                <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
                  {/* Game Image */}
                  <div className="w-full h-32 bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center overflow-hidden">
                    <img 
                      src={game.imageUrls[0]} 
                      alt={game.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-game.png';
                      }}
                    />
                  </div>
                  
                  {/* Game Info */}
                  <div className="p-3">
                    <h3 className="text-white font-semibold mb-1 group-hover:text-cyan-400 transition-colors">
                      {game.name}
                    </h3>
                    <p className="text-white/60 text-sm mb-2 line-clamp-2">
                      {game.description}
                    </p>
                    
                    {/* Game Stats */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white/80 text-sm">{game.rating}</span>
                        </div>
                        <Badge variant="outline" className="border-cyan-500/50 text-cyan-400 text-xs">
                          {game.players}
                        </Badge>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {game.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-white/10 text-white/60">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-black font-semibold"
                      onClick={() => console.log(`Play ${game.name}`)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Play Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <Gamepad2 className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Games Available</h3>
            <p className="text-white/60 mb-4">
              Check back later for new games in the hub
            </p>
            <Button 
              onClick={() => window.location.href = '/gamehub'}
              className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-black font-semibold"
            >
              <Gamepad2 className="w-4 h-4 mr-2" />
              Browse Games
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
