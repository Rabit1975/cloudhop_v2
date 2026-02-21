import { 
  TrendingUp, 
  Clock, 
  Trophy, 
  Target,
  Play,
  Star,
  Flame
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { FeaturedCarousel } from "./FeaturedCarousel";
import { LiveStreamSection } from "./LiveStreamSection";
import { IntegrationsPanel } from "./IntegrationsPanel";

const stats = [
  { 
    icon: Clock, 
    label: "Hours Played", 
    value: "284", 
    change: "+12%",
    color: "from-blue-500 to-cyan-500"
  },
  { 
    icon: Trophy, 
    label: "Achievements", 
    value: "127", 
    change: "+5",
    color: "from-yellow-500 to-orange-500"
  },
  { 
    icon: Target, 
    label: "Games Owned", 
    value: "48", 
    change: "+3",
    color: "from-purple-500 to-pink-500"
  },
  { 
    icon: Flame, 
    label: "Current Streak", 
    value: "12", 
    change: "days",
    color: "from-red-500 to-orange-500"
  },
];

const recentGames = [
  {
    id: 1,
    title: "Cyber Nexus 2077",
    image: "https://images.unsplash.com/photo-1664092815283-19c6196f5319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBnYW1pbmclMjBuZW9ufGVufDF8fHx8MTc3MTE3Njg1MXww&ixlib=rb-4.1.0&q=80&w=1080",
    hoursPlayed: 42.5,
    lastPlayed: "2 hours ago",
    progress: 68
  },
  {
    id: 2,
    title: "Fantasy Realm",
    image: "https://images.unsplash.com/photo-1765606290905-b9d377ea4d5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwZ2FtZSUyMG1lZGlldmFsfGVufDF8fHx8MTc3MTE3Njg1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    hoursPlayed: 156.3,
    lastPlayed: "Yesterday",
    progress: 89
  },
  {
    id: 3,
    title: "Starship Commander",
    image: "https://images.unsplash.com/photo-1762441112136-4dfc6edf58e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHNjaS1maSUyMGdhbWV8ZW58MXx8fHwxNzcxMTY4OTM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    hoursPlayed: 23.1,
    lastPlayed: "3 days ago",
    progress: 34
  },
];

const achievements = [
  { id: 1, name: "Speed Demon", description: "Complete 10 races under par time", rarity: 8.3 },
  { id: 2, name: "Master Strategist", description: "Win 100 ranked matches", rarity: 3.2 },
  { id: 3, name: "Treasure Hunter", description: "Find all hidden collectibles", rarity: 12.5 },
];

const friends = [
  { id: 1, name: "Sarah_M", status: "online", game: "Playing Cyber Nexus 2077" },
  { id: 2, name: "Alex_K", status: "online", game: "Playing Fantasy Realm" },
  { id: 3, name: "Mike_R", status: "away", game: "Away" },
  { id: 4, name: "Emma_L", status: "offline", game: "Last seen 2 hours ago" },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Featured Games Carousel */}
      <FeaturedCarousel />

      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
        <p className="text-slate-400">Ready to continue your gaming journey?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs text-green-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Live Streams Section */}
      <LiveStreamSection />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Playing */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Continue Playing</h2>
            <button className="text-sm text-purple-400 hover:text-purple-300">View All</button>
          </div>

          <div className="space-y-4">
            {recentGames.map((game) => (
              <div
                key={game.id}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-purple-500 transition-all group"
              >
                <div className="flex">
                  <div className="w-48 h-32 relative overflow-hidden">
                    <ImageWithFallback
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50">
                        <Play className="w-6 h-6 ml-1" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold mb-1">{game.title}</h3>
                      <p className="text-sm text-slate-400">Last played: {game.lastPlayed}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-purple-400">{game.progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                          style={{ width: `${game.progress}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span>{game.hoursPlayed} hours played</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Integrations */}
          <IntegrationsPanel />

          {/* Recent Achievements */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Recent Achievements
              </h3>
            </div>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg hover:bg-slate-750 transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium mb-1">{achievement.name}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{achievement.description}</p>
                    <p className="text-xs text-purple-400 mt-1">{achievement.rarity}% of players</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Friends Online */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Friends Online</h3>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                2 online
              </span>
            </div>
            <div className="space-y-2">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">{friend.name[0]}</span>
                    </div>
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${
                        friend.status === "online"
                          ? "bg-green-500"
                          : friend.status === "away"
                          ? "bg-yellow-500"
                          : "bg-slate-500"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{friend.name}</div>
                    <div className="text-xs text-slate-400 truncate">{friend.game}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}