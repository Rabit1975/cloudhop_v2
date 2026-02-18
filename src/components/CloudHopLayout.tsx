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
} from 'lucide-react';
import { cn } from '@/lib/utils';
import logoSplash from '../assets/logo-splash.png';
import nebulaBg from '../assets/nebula.png';

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

  return (
    <div className="flex h-screen w-full overflow-hidden relative">
      {/* Nebula background */}
      <img
        src={nebulaBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
      />
      <div className="absolute inset-0 bg-background/50 pointer-events-none" />

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
              U
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-background" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">
                CloudHopper
              </p>
              <p className="text-[10px] text-muted-foreground">Online</p>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-hidden relative z-10">{children}</main>
    </div>
  );
}
