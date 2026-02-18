import { useState } from 'react';
import {
  Search,
  Play,
  Users,
  Heart,
  Share2,
  Volume2,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TwitchStream {
  id: string;
  channelName: string;
  title: string;
  category: string;
  viewers: number;
  thumbnail: string;
  isLive: boolean;
  uptime: string;
}

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  badge?: string;
}

export default function Twitch() {
  const [streams] = useState<TwitchStream[]>([
    {
      id: '1',
      channelName: 'StreamMaster',
      title: '24/7 Gameplay Marathon - Come Hang Out!',
      category: 'Just Chatting',
      viewers: 3421,
      thumbnail: '🎮',
      isLive: true,
      uptime: '4h 23m',
    },
    {
      id: '2',
      channelName: 'ArtisticCode',
      title: 'Web Dev Live Coding Session - Building React App',
      category: 'Creative',
      viewers: 1205,
      thumbnail: '💻',
      isLive: true,
      uptime: '2h 15m',
    },
    {
      id: '3',
      channelName: 'SpeedRunner',
      title: 'World Record Attempts - Speedrunning Marathon',
      category: 'Games',
      viewers: 5634,
      thumbnail: '🏃',
      isLive: true,
      uptime: '6h 42m',
    },
    {
      id: '4',
      channelName: 'MusicProducer',
      title: 'Beat Making Session - Chill Hip Hop Vibes',
      category: 'Music',
      viewers: 892,
      thumbnail: '🎵',
      isLive: true,
      uptime: '1h 30m',
    },
    {
      id: '5',
      channelName: 'GamingGuild',
      title: 'Co-op Adventure Games with Friends',
      category: 'Games',
      viewers: 2156,
      thumbnail: '⚔️',
      isLive: true,
      uptime: '3h 5m',
    },
  ]);

  const [selectedStream, setSelectedStream] = useState<TwitchStream | null>(
    streams[0]
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      username: 'Viewer123',
      message: 'Amazing stream! Keep it up! 🎉',
      timestamp: new Date(Date.now() - 30000),
    },
    {
      id: '2',
      username: 'StreamFan',
      message: 'Love the vibe',
      timestamp: new Date(Date.now() - 20000),
    },
    {
      id: '3',
      username: 'TwitchMod',
      message: 'Follow the channel!',
      timestamp: new Date(Date.now() - 10000),
      badge: 'mod',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isFollowed, setIsFollowed] = useState(false);

  const filteredStreams = streams.filter((stream) => {
    const matchesSearch =
      stream.channelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stream.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || stream.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(streams.map((s) => s.category)));

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages([
      ...chatMessages,
      {
        id: String(chatMessages.length + 1),
        username: 'You',
        message: chatInput,
        timestamp: new Date(),
      },
    ]);
    setChatInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full w-full overflow-hidden flex gap-4 p-4 bg-gradient-to-br from-purple-900/20 via-transparent to-black">
      <div className="flex-1 flex flex-col overflow-hidden">
        {selectedStream && (
          <div className="glass-panel rounded-xl overflow-hidden border-cyan-400/30 mb-4 flex flex-col flex-shrink-0">
            <div className="relative h-80 bg-black flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-magenta-900/20" />
              <div className="text-center relative z-10">
                <div className="text-8xl mb-4">{selectedStream.thumbnail}</div>
                <p className="text-muted-foreground text-lg">
                  {selectedStream.title}
                </p>
              </div>
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 px-4 py-2 rounded-full z-20">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-white font-bold text-sm">LIVE</span>
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 z-20">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-white font-semibold">
                  {selectedStream.viewers.toLocaleString()} watching
                </span>
              </div>
            </div>
            <div className="p-6 border-t border-cyan-400/20">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-black text-foreground mb-1">
                    {selectedStream.title}
                  </h2>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg font-bold text-cyan-400">
                      {selectedStream.channelName}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-xs font-semibold">
                      {selectedStream.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Streaming for {selectedStream.uptime}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFollowed(!isFollowed)}
                    className={cn(
                      'px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2',
                      isFollowed
                        ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300'
                        : 'bg-gradient-to-r from-cyan-500 to-cyan-400 text-black hover:opacity-90'
                    )}
                  >
                    <Heart
                      className={cn('w-4 h-4', isFollowed && 'fill-current')}
                    />
                    {isFollowed ? 'Following' : 'Follow'}
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg text-muted-foreground hover:text-foreground transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Volume2 className="w-4 h-4 text-muted-foreground" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="70"
                  className="flex-1 max-w-xs h-1 bg-secondary rounded-full cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
        <div className="flex-1 overflow-y-auto flex flex-col">
          <div className="mb-6 flex-shrink-0">
            <div className="relative group mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-magenta-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition-all" />
              <div className="relative flex items-center bg-black/50 rounded-lg px-4 py-3 border border-cyan-400/50 group-hover:border-cyan-400/80 transition-all">
                <Search className="w-5 h-5 text-cyan-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search channels or games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  'px-4 py-2 rounded-full font-bold text-sm transition-all whitespace-nowrap',
                  !selectedCategory
                    ? 'bg-gradient-to-r from-cyan-500 to-magenta-500 text-white shadow-lg shadow-cyan-500/50'
                    : 'bg-white/5 border border-cyan-400/30 text-muted-foreground hover:border-cyan-400/60'
                )}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    'px-4 py-2 rounded-full font-bold text-sm transition-all whitespace-nowrap',
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-cyan-500 to-magenta-500 text-white shadow-lg shadow-cyan-500/50'
                      : 'bg-white/5 border border-cyan-400/30 text-muted-foreground hover:border-cyan-400/60'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStreams.map((stream) => (
              <button
                key={stream.id}
                onClick={() => setSelectedStream(stream)}
                className={cn(
                  'group glass-panel rounded-lg overflow-hidden border transition-all text-left hover:scale-105',
                  selectedStream?.id === stream.id
                    ? 'border-cyan-400/80 shadow-lg shadow-cyan-500/30'
                    : 'border-cyan-400/20 hover:border-cyan-400/60'
                )}
              >
                <div className="relative h-32 bg-gradient-to-br from-cyan-900/30 to-magenta-900/20 flex items-center justify-center overflow-hidden">
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-600/90 px-2 py-1 rounded text-white text-xs font-bold z-10">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    LIVE
                  </div>
                  <div className="text-4xl opacity-60 group-hover:opacity-80 transition-opacity">
                    {stream.thumbnail}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-foreground text-sm mb-1 line-clamp-2">
                    {stream.title}
                  </h3>
                  <p className="text-xs text-cyan-400 font-semibold mb-2">
                    {stream.channelName}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-magenta-400">
                      <Users className="w-3 h-3" />
                      <span>{stream.viewers.toLocaleString()}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {stream.category}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="w-80 glass-panel rounded-xl overflow-hidden border-magenta-400/30 flex flex-col">
        <div className="px-4 py-4 border-b border-magenta-400/20 bg-magenta-500/10">
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-4 h-4 text-magenta-400" />
            <h3 className="font-bold text-foreground">Live Chat</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Chatting with{' '}
            {selectedStream ? 'on ' + selectedStream.channelName : 'stream'}
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {chatMessages.map((msg) => (
            <div key={msg.id} className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-cyan-300">
                  {msg.username}
                </span>
                {msg.badge && (
                  <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 font-bold">
                    {msg.badge}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground ml-0.5">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
        <div className="border-t border-magenta-400/20 p-3 flex gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            className="flex-1 rounded-lg px-3 py-2 bg-white/5 border border-magenta-400/30 text-foreground placeholder-muted-foreground outline-none text-sm focus:border-magenta-400/60 focus:bg-white/10 transition-all"
          />
          <button
            onClick={handleSendMessage}
            disabled={!chatInput.trim()}
            className={cn(
              'px-3 py-2 rounded-lg font-medium transition-all text-sm',
              chatInput.trim()
                ? 'bg-gradient-to-r from-magenta-500 to-magenta-400 text-white hover:opacity-90'
                : 'bg-secondary text-muted-foreground cursor-not-allowed opacity-50'
            )}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
