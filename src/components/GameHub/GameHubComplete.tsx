import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TwitchIntegration from '../TwitchIntegration/TwitchIntegration';
import { 
  Gamepad2, 
  Users, 
  Star, 
  Play, 
  Search,
  Filter,
  Trophy,
  Clock,
  Zap,
  TrendingUp,
  Medal,
  Activity,
  Eye
} from 'lucide-react';

// Mock data for all components
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

const mockAchievements = [
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Complete 10 races in under 2 minutes each',
    icon: '🏎️',
    unlocked: true,
    rarity: 'rare'
  },
  {
    id: 'explorer',
    name: 'Space Explorer',
    description: 'Discover all hidden areas in Cosmic Quest',
    icon: '🌌',
    unlocked: true,
    rarity: 'common'
  },
  {
    id: 'champion',
    name: 'Arena Champion',
    description: 'Win 50 multiplayer matches',
    icon: '🏆',
    unlocked: false,
    rarity: 'legendary'
  }
];

const mockActivities = [
  {
    id: '1',
    type: 'played',
    gameId: '1',
    gameName: 'Nebula Racers',
    timestamp: '2 hours ago',
    details: 'Completed lap record: 1:23.456'
  },
  {
    id: '2',
    type: 'achievement',
    gameId: '2',
    gameName: 'Cosmic Quest',
    timestamp: '5 hours ago',
    details: 'Unlocked "Space Explorer" achievement'
  },
  {
    id: '3',
    type: 'streamed',
    gameId: '3',
    gameName: 'Starfighter Arena',
    timestamp: '1 day ago',
    details: 'Streamed for 2.5 hours'
  }
];

const mockLeaderboard = [
  {
    rank: 1,
    playerName: 'ProGamer123',
    score: 98750,
    game: 'Nebula Racers',
    avatar: '👨‍🚀'
  },
  {
    rank: 2,
    playerName: 'SpeedRunner',
    score: 87420,
    game: 'Nebula Racers',
    avatar: '🏃‍♂️'
  },
  {
    rank: 3,
    playerName: 'NinjaX',
    score: 76380,
    game: 'Starfighter Arena',
    avatar: '🥷'
  }
];

export function GameHubComplete() {
  const [activeTab, setActiveTab] = useState<'games' | 'twitch' | 'achievements' | 'activity' | 'leaderboard'>('games');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Racing', 'Adventure', 'Action', 'Multiplayer'];

  // Achievement Card Component
  const AchievementCard = ({ achievement }: { achievement: typeof mockAchievements[0] }) => (
    <Card className={`bg-black/20 backdrop-blur-sm border-white/10 ${achievement.unlocked ? 'border-yellow-500/50' : 'border-gray-500/50'} transition-all duration-300 hover:scale-105`}>
      <CardContent className="p-4 text-center">
        <div className="text-4xl mb-2">{achievement.icon}</div>
        <h3 className="text-white font-bold mb-1">{achievement.name}</h3>
        <p className="text-white/60 text-sm mb-3">{achievement.description}</p>
        <div className="flex items-center justify-between">
          <Badge className={achievement.unlocked ? 'bg-yellow-500 text-black' : 'bg-gray-500 text-white'}>
            {achievement.unlocked ? 'Unlocked' : 'Locked'}
          </Badge>
          <Badge variant="outline" className={`border-${achievement.rarity === 'legendary' ? 'orange' : achievement.rarity === 'rare' ? 'purple' : 'blue'}-500/50 text-${achievement.rarity === 'legendary' ? 'orange' : achievement.rarity === 'rare' ? 'purple' : 'blue'}-400`}>
            {achievement.rarity}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );

  // Activity Item Component
  const ActivityItem = ({ activity }: { activity: typeof mockActivities[0] }) => (
    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex-shrink-0"></div>
      <div className="flex-1">
        <h4 className="text-white font-medium">{activity.gameName}</h4>
        <p className="text-white/60 text-sm">{activity.details}</p>
      </div>
      <span className="text-white/40 text-xs">{activity.timestamp}</span>
    </div>
  );

  // Leaderboard Item Component
  const LeaderboardItem = ({ entry, index }: { entry: typeof mockLeaderboard[0]; index: number }) => (
    <div className={`flex items-center gap-3 p-3 rounded-lg ${index === 0 ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50' : 'bg-white/5 border-white/10'}`}>
      <div className="text-lg font-bold text-white w-8 text-center">
        {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
      </div>
      <div className="flex items-center gap-2 flex-1">
        <span className="text-2xl text-white/40">{entry.avatar}</span>
        <div>
          <div className="text-white font-medium">{entry.playerName}</div>
          <div className="text-white/60 text-sm">{entry.game}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-xl font-bold text-cyan-400">{entry.score.toLocaleString()}</div>
        <div className="text-white/40 text-xs">points</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Game Hub Complete
          </h1>
          <p className="text-white/60 text-lg">
            Full gaming experience with achievements, activity, and leaderboards
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
            <Input
              placeholder="Search games, achievements, players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/20 border-white/10 text-white placeholder-white/40"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-black/20 border border-white/10 text-white px-3 py-2 rounded-lg"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <Button variant="outline" className="border-white/20 text-white/80 hover:bg-white/10">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="mb-6">
          <TabsList className="bg-black/20 border border-white/10">
            <TabsTrigger value="games" className="text-white/80 data-[state=active]:text-cyan-400">
              <Gamepad2 className="w-4 h-4 mr-2" />
              Games
            </TabsTrigger>
            <TabsTrigger value="achievements" className="text-white/80 data-[state=active]:text-cyan-400">
              <Trophy className="w-4 h-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="activity" className="text-white/80 data-[state=active]:text-cyan-400">
              <Activity className="w-4 h-4 mr-2" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="text-white/80 data-[state=active]:text-cyan-400">
              <Medal className="w-4 h-4 mr-2" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="twitch" className="text-white/80 data-[state=active]:text-cyan-400">
              <Eye className="w-4 h-4 mr-2" />
              Twitch
            </TabsTrigger>
          </TabsList>

          {/* Games Tab */}
          <TabsContent value="games" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockGames.map(game => (
                <Card key={game.id} className="group bg-black/20 backdrop-blur-sm border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]">
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
                        {game.gameType}
                      </Badge>
                      <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                        {game.players}
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
              ))}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAchievements.map(achievement => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockActivities.map(activity => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Medal className="w-5 h-5 text-cyan-400" />
                  Global Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockLeaderboard.map((entry, index) => (
                    <LeaderboardItem key={entry.rank} entry={entry} index={index} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Twitch Tab */}
          <TabsContent value="twitch" className="space-y-6">
            <TwitchIntegration />
          </TabsContent>
        </Tabs>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <Card className="bg-black/20 backdrop-blur-sm border-white/10">
            <CardContent className="p-4 text-center">
              <Gamepad2 className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{mockGames.length}</div>
              <div className="text-white/60 text-sm">Total Games</div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/20 backdrop-blur-sm border-white/10">
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{mockAchievements.filter(a => a.unlocked).length}</div>
              <div className="text-white/60 text-sm">Achievements</div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/20 backdrop-blur-sm border-white/10">
            <CardContent className="p-4 text-center">
              <Activity className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{mockActivities.length}</div>
              <div className="text-white/60 text-sm">Activities</div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/20 backdrop-blur-sm border-white/10">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-white/60 text-sm">Always Online</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
