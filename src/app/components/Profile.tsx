import { 
  Trophy, 
  Clock, 
  Star, 
  Target,
  Award,
  TrendingUp,
  Calendar,
  Gamepad2,
  Twitch
} from "lucide-react";

const userStats = {
  name: "John Doe",
  username: "JohnD_Gaming",
  level: 42,
  experience: 8750,
  experienceToNext: 10000,
  joinDate: "January 2024",
  totalHours: 284,
  achievements: 127,
  gamesOwned: 48,
  completionRate: 73,
  steamLinked: true,
  twitchLinked: true,
  steamUsername: "JohnD_Gaming",
  twitchUsername: "JohnDPlays",
};

const recentAchievements = [
  {
    id: 1,
    name: "Speed Demon",
    description: "Complete 10 races under par time",
    game: "Velocity Racers",
    rarity: 8.3,
    unlockedDate: "2 days ago",
  },
  {
    id: 2,
    name: "Master Strategist",
    description: "Win 100 ranked matches",
    game: "Battle Legends",
    rarity: 3.2,
    unlockedDate: "5 days ago",
  },
  {
    id: 3,
    name: "Treasure Hunter",
    description: "Find all hidden collectibles",
    game: "Fantasy Realm",
    rarity: 12.5,
    unlockedDate: "1 week ago",
  },
  {
    id: 4,
    name: "Perfect Run",
    description: "Complete a mission without taking damage",
    game: "Cyber Nexus 2077",
    rarity: 5.7,
    unlockedDate: "1 week ago",
  },
];

const badges = [
  { id: 1, name: "Early Adopter", icon: Star, color: "from-yellow-500 to-orange-500" },
  { id: 2, name: "100 Hour Club", icon: Clock, color: "from-blue-500 to-cyan-500" },
  { id: 3, name: "Achievement Hunter", icon: Trophy, color: "from-purple-500 to-pink-500" },
  { id: 4, name: "Game Collector", icon: Gamepad2, color: "from-green-500 to-emerald-500" },
];

export function Profile() {
  const experiencePercentage = (userStats.experience / userStats.experienceToNext) * 100;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"></div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative -mt-20">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center border-4 border-slate-900">
                <span className="text-4xl font-bold">JD</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-1">{userStats.name}</h1>
                  <p className="text-slate-400 mb-2">@{userStats.username}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {userStats.joinDate}</span>
                    </div>
                  </div>
                  {/* Connected Platforms */}
                  <div className="flex items-center gap-2">
                    {userStats.steamLinked && (
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm border border-blue-500/30">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10c.93 0 1.83-.13 2.68-.37L8.5 18.4l-.11-.02a3.5 3.5 0 0 1 0-6.98l7.52-3.2A10 10 0 0 0 12 2m0 1.5a8.5 8.5 0 0 1 8.5 8.5 8.5 8.5 0 0 1-8.5 8.5 8.5 8.5 0 0 1-8.5-8.5 8.5 8.5 0 0 1 8.5-8.5m5.5 5a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5A2.5 2.5 0 0 0 20 11a2.5 2.5 0 0 0-2.5-2.5m0 1c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S16 11.33 16 10.5s.67-1.5 1.5-1.5M8.5 12.5a2 2 0 0 0-2 2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2z"/>
                        </svg>
                        <span>{userStats.steamUsername}</span>
                      </div>
                    )}
                    {userStats.twitchLinked && (
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-lg text-sm border border-purple-500/30">
                        <Twitch className="w-4 h-4" />
                        <span>{userStats.twitchUsername}</span>
                      </div>
                    )}
                  </div>
                </div>
                <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                  Edit Profile
                </button>
              </div>
              
              {/* Level Progress */}
              <div className="mt-6 p-4 bg-slate-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Level {userStats.level}</span>
                  <span className="text-sm text-slate-400">
                    {userStats.experience} / {userStats.experienceToNext} XP
                  </span>
                </div>
                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                    style={{ width: `${experiencePercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-3">
            <Clock className="w-6 h-6" />
          </div>
          <div className="text-2xl font-bold mb-1">{userStats.totalHours}</div>
          <div className="text-sm text-slate-400">Total Hours</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-3">
            <Trophy className="w-6 h-6" />
          </div>
          <div className="text-2xl font-bold mb-1">{userStats.achievements}</div>
          <div className="text-sm text-slate-400">Achievements</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-3">
            <Target className="w-6 h-6" />
          </div>
          <div className="text-2xl font-bold mb-1">{userStats.gamesOwned}</div>
          <div className="text-sm text-slate-400">Games Owned</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-3">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="text-2xl font-bold mb-1">{userStats.completionRate}%</div>
          <div className="text-sm text-slate-400">Completion Rate</div>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="flex flex-col items-center p-4 bg-slate-800 rounded-lg hover:bg-slate-750 transition-colors"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${badge.color} rounded-full flex items-center justify-center mb-3`}>
                <badge.icon className="w-8 h-8" />
              </div>
              <span className="text-sm text-center">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Achievements</h2>
          <button className="text-sm text-purple-400 hover:text-purple-300">View All</button>
        </div>
        <div className="space-y-3">
          {recentAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-start gap-4 p-4 bg-slate-800 rounded-lg hover:bg-slate-750 transition-colors"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-8 h-8" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold mb-1">{achievement.name}</h3>
                <p className="text-sm text-slate-400 mb-2">{achievement.description}</p>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-purple-400">{achievement.game}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400">{achievement.rarity}% of players</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400">{achievement.unlockedDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}