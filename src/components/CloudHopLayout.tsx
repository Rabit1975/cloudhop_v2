import { useState } from 'react';
import {
  Home,
  MessageSquare,
  Music,
  Gamepad2,
  Globe,
  Tv,
  Video,
  ChevronLeft,
  ChevronRight,
  Settings,
  User,
  Send,
  X,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import logoSplash from '../assets/logo-splash.png';
import nebulaBg from '../assets/nebula3.jpg';

type Tab =
  | 'home'
  | 'hophub'
  | 'music'
  | 'gamehub'
  | 'spaces'
  | 'twitch'
  | 'hopmeetings'
  | 'settings'
  | 'profile';

interface CloudHopLayoutProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  children: React.ReactNode;
}

const NAV_ITEMS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
  {
    id: 'hophub',
    label: 'HopHub',
    icon: <MessageSquare className="w-5 h-5" />,
  },
  { id: 'music', label: 'Music', icon: <Music className="w-5 h-5" /> },
  { id: 'gamehub', label: 'GameHub', icon: <Gamepad2 className="w-5 h-5" /> },
  { id: 'spaces', label: 'Spaces', icon: <Globe className="w-5 h-5" /> },
  { id: 'twitch', label: 'Twitch', icon: <Tv className="w-5 h-5" /> },
  {
    id: 'hopmeetings',
    label: 'HopMeetings',
    icon: <Video className="w-5 h-5" />,
  },
];

const BOTTOM_NAV: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
];

export default function CloudHopLayout({
  activeTab,
  onTabChange,
  children,
}: CloudHopLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState<{role:'user'|'ai'; text:string}[]>([
    { role: 'ai', text: "Hey! I'm RabbitAI 🐰 Your smart assistant for CloudHop. Ask me anything about games, music, meetings, or just chat!" }
  ]);
  const [aiInput, setAiInput] = useState('');
  const username = localStorage.getItem('profile_displayName') || localStorage.getItem('cloudhop_user') || 'CloudHopper';
  const userInitial = username.charAt(0).toUpperCase();

  const sendAiMessage = () => {
    if (!aiInput.trim()) return;
    const userMsg = aiInput.trim();
    setAiInput('');
    setAiMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      let reply = "I'm here to help! 🐰 Try asking me about games, music, or what to do on CloudHop.";
      if (lower.includes('game')) reply = "🎮 Head to GameHub for 500+ games! Try classics like 2048, Geometry Dash, or Cookie Clicker.";
      else if (lower.includes('music')) reply = "🎵 Go to YouTube Music to listen to songs and watch videos. Sign in to access your playlists!";
      else if (lower.includes('meet') || lower.includes('call')) reply = "📹 HopMeetings lets you start video or audio calls with your friends!";
      else if (lower.includes('twitch') || lower.includes('stream')) reply = "📺 Check out the Twitch tab to watch live streams and discover creators!";
      else if (lower.includes('space')) reply = "🌍 Spaces is your personal creativity corner powered by RabbitAI. Write, reflect, and create!";
      else if (lower.includes('chat') || lower.includes('message')) reply = "💬 HopHub is the chat hub — join channels, message friends, and create groups!";
      else if (lower.includes('hello') || lower.includes('hi')) reply = `Hey ${username}! 👋 Great to see you on CloudHop!`;
      setAiMessages(prev => [...prev, { role: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden relative">
      {/* Nebula background */}
      <img
        src={nebulaBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Sidebar */}
      <aside
        className={cn(
          'relative z-10 flex flex-col glass-panel border-r border-white/10 transition-all duration-300',
          collapsed ? 'w-16' : 'w-56'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-3 py-4 border-b border-white/10">
          <img
            src={logoSplash}
            alt="CloudHop"
            className="w-10 h-10 rounded-lg object-contain flex-shrink-0"
          />
          {!collapsed && (
            <div className="min-w-0">
              <h1 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-400 truncate">
                CloudHop
              </h1>
              <p className="text-[10px] text-muted-foreground truncate">
                Hop In, Cloud On
              </p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-2 space-y-1 px-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                activeTab === item.id
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              )}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom nav */}
        <div className="border-t border-white/10 py-2 px-2 space-y-1">
          {BOTTOM_NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                activeTab === item.id
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              )}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-3 border-t border-white/10 text-muted-foreground hover:text-foreground transition-all flex items-center justify-center"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        {/* User avatar */}
        <div className="px-3 py-3 border-t border-white/10 flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-magenta-500 flex items-center justify-center text-xs font-bold text-white">
              {userInitial}
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-background" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">
                {username}
              </p>
              <p className="text-[10px] text-muted-foreground">Online</p>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-hidden relative z-10">{children}</main>

      {/* RabbitAI Floating Panel */}
      {aiOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 glass-panel rounded-2xl border-cyan-400/30 flex flex-col overflow-hidden shadow-2xl shadow-cyan-500/20" style={{height:'420px'}}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-cyan-400/20 bg-gradient-to-r from-cyan-900/40 to-purple-900/40">
            <img src="/rabbitavatar1.PNG" alt="RabbitAI" className="w-9 h-9 rounded-full object-cover border-2 border-cyan-400/50" />
            <div className="flex-1">
              <p className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-400">RabbitAI</p>
              <p className="text-[10px] text-green-400">● Online</p>
            </div>
            <button onClick={() => setAiOpen(false)} className="p-1 hover:bg-white/10 rounded text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
            {aiMessages.map((msg, i) => (
              <div key={i} className={cn('flex gap-2', msg.role === 'user' ? 'flex-row-reverse' : '')}>
                {msg.role === 'ai' && (
                  <img src="/rabbitavatar1.PNG" alt="AI" className="w-6 h-6 rounded-full object-cover flex-shrink-0 mt-1" />
                )}
                <div className={cn(
                  'max-w-[220px] px-3 py-2 rounded-xl text-xs leading-relaxed',
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-cyan-500/80 to-cyan-600/80 text-white rounded-br-none'
                    : 'glass-panel border-magenta-400/30 text-foreground rounded-bl-none'
                )}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          {/* Input */}
          <div className="border-t border-cyan-400/20 p-3 flex gap-2">
            <input
              type="text"
              value={aiInput}
              onChange={e => setAiInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendAiMessage()}
              placeholder="Ask RabbitAI anything..."
              className="flex-1 bg-white/5 border border-cyan-400/30 rounded-lg px-3 py-2 text-xs text-foreground placeholder-muted-foreground outline-none focus:border-cyan-400/60"
            />
            <button onClick={sendAiMessage} className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 text-black hover:opacity-90 transition-all">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* RabbitAI Toggle Button */}
      <button
        onClick={() => setAiOpen(!aiOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl shadow-cyan-500/40 hover:scale-110 transition-all overflow-hidden border-2 border-cyan-400/60"
        title="Open RabbitAI"
      >
        <img src="/rabbitavatar1.PNG" alt="RabbitAI" className="w-full h-full object-cover" />
        {!aiOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-magenta-500 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        )}
      </button>
    </div>
  );
}
