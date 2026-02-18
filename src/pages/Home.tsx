import { useState } from 'react';
import { TrendingUp, Flame, Play, Users, ArrowRight, Gamepad2, Music, Globe, Tv } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeaturedStream {
  id: string;
  channelName: string;
  title: string;
  category: string;
  viewers: number;
  uptime: string;
  isLive: boolean;
}

type Tab = 'home' | 'hophub' | 'music' | 'gamehub' | 'spaces' | 'twitch' | 'hopmeetings' | 'settings' | 'profile';

export default function Home({ onTabChange }: { onTabChange?: (tab: Tab) => void }) {
  const [featuredStreams] = useState<FeaturedStream[]>([
    {
      id: '1',
      channelName: 'StreamMaster',
      title: '24/7 Gameplay Marathon - Come Hang Out!',
      category: 'Games',
      viewers: 3421,
      uptime: '4h 23m',
      isLive: true,
    },
    {
      id: '2',
      channelName: 'ArtisticCode',
      title: 'Web Dev Live Coding Session - Building React App',
      category: 'Creative',
      viewers: 1205,
      uptime: '2h 15m',
      isLive: true,
    },
    {
      id: '3',
      channelName: 'SpeedRunner',
      title: 'World Record Attempts - Speedrunning Marathon',
      category: 'Games',
      viewers: 5634,
      uptime: '6h 42m',
      isLive: true,
    },
  ]);

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-400 to-cyan-400 mb-2">
              Welcome to CloudHop
            </h1>
            <p className="text-muted-foreground text-lg">
              Your creative hub for gaming, streaming, music, and community
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="glass-panel rounded-xl p-6 border-cyan-400/30 hover:border-cyan-400/60 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-2">
                    Active Streams
                  </p>
                  <p className="text-3xl font-black text-cyan-400">2,847</p>
                </div>
                <div className="p-3 rounded-lg bg-cyan-500/20">
                  <Flame className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-6 border-magenta-400/30 hover:border-magenta-400/60 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-2">
                    Online Users
                  </p>
                  <p className="text-3xl font-black text-magenta-400">156K</p>
                </div>
                <div className="p-3 rounded-lg bg-magenta-500/20">
                  <Users className="w-5 h-5 text-magenta-400" />
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-6 border-purple-400/30 hover:border-purple-400/60 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-2">
                    Games Available
                  </p>
                  <p className="text-3xl font-black text-purple-400">500+</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-500/20">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Featured Twitch Streams */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Flame className="w-6 h-6 text-orange-400" />
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                  Trending on Twitch
                </h2>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 transition-all font-semibold">
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredStreams.map((stream) => (
                <div
                  key={stream.id}
                  className="group glass-panel rounded-lg overflow-hidden border-cyan-400/30 hover:border-cyan-400/60 transition-all hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer"
                >
                  <div className="relative h-40 bg-gradient-to-br from-cyan-900/30 to-magenta-900/20 flex items-center justify-center overflow-hidden">
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-red-600/90 px-3 py-1 rounded-full text-white text-xs font-bold z-10">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      LIVE
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-semibold">
                      <Users className="w-3 h-3" />
                      {stream.viewers.toLocaleString()}
                    </div>
                    <div className="text-center">
                      <div className="mb-2 opacity-60 group-hover:opacity-80 transition-opacity flex justify-center">
                        <Tv className="w-12 h-12 text-cyan-300" />
                      </div>
                      <p className="text-muted-foreground text-xs">
                        {stream.uptime}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground text-sm mb-1 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                      {stream.title}
                    </h3>
                    <p className="text-xs text-cyan-400 font-semibold mb-3">
                      {stream.channelName}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2 py-1 rounded bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-semibold">
                        {stream.category}
                      </span>
                      <button className="p-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 transition-all group-hover:scale-110">
                        <Play className="w-3 h-3 fill-current" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => onTabChange?.('twitch')} className="w-full group glass-panel rounded-xl p-8 border-cyan-400/30 hover:border-cyan-400/60 transition-all text-center hover:shadow-lg hover:shadow-cyan-500/20">
              <h3 className="text-2xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-400">
                Discover More Streams
              </h3>
              <p className="text-muted-foreground mb-4">
                Explore thousands of live streams, find new creators, and join
                the community
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-bold group-hover:opacity-90 transition-all">
                Go to Twitch
                <ArrowRight className="w-5 h-5" />
              </div>
            </button>
          </div>

          {/* Quick Access Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div onClick={() => onTabChange?.('gamehub')} className="glass-panel rounded-xl p-8 border-cyan-400/30 hover:border-cyan-400/60 transition-all hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer">
              <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                <Gamepad2 className="w-6 h-6 text-cyan-400" /> GameHub
              </h3>
              <p className="text-muted-foreground mb-4">
                Play 500+ HTML5 games, from classic arcade to modern adventures
              </p>
              <div className="flex items-center gap-2 text-cyan-400 font-semibold group hover:gap-3 transition-all">
                Explore Games
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div onClick={() => onTabChange?.('music')} className="glass-panel rounded-xl p-8 border-magenta-400/30 hover:border-magenta-400/60 transition-all hover:shadow-lg hover:shadow-magenta-500/20 cursor-pointer">
              <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                <Music className="w-6 h-6 text-pink-400" /> YouTube Music
              </h3>
              <p className="text-muted-foreground mb-4">
                Listen to your favorite music, create playlists, and watch music
                videos
              </p>
              <div className="flex items-center gap-2 text-magenta-400 font-semibold group hover:gap-3 transition-all">
                Listen Now
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div onClick={() => onTabChange?.('spaces')} className="glass-panel rounded-xl p-8 border-purple-400/30 hover:border-purple-400/60 transition-all hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer md:col-span-2">
              <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                <Globe className="w-6 h-6 text-purple-400" /> Spaces - Powered by RabbitAI
              </h3>
              <p className="text-muted-foreground mb-4">
                Create your own spaces for creativity, community, and personal
                reflection. Get personalized guidance from RabbitAI
              </p>
              <div className="flex items-center gap-2 text-purple-400 font-semibold group hover:gap-3 transition-all">
                Enter Your Spaces
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
