import React, { useState } from 'react';
import { View, User } from '../types';
import { CloudHopLogo, Icons } from '../constants';
import { useSpace } from '../contexts/SpaceContext';
import { useSettings } from '../hooks/useSettings';
import AIAssistant from './AIAssistant';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  onNavigate: (view: View) => void;
  user: User | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate, user, onLogout }) => {
  const { currentSpace } = useSpace();
  const { settings, profile } = useSettings(); // Added profile from useSettings
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const mainNavItems = [
    { id: View.DASHBOARD, label: 'Home', icon: Icons.Home },
    { id: View.CHAT, label: 'HopHub', icon: Icons.Chat },
    { id: View.MEETINGS, label: 'HopMeetings', icon: Icons.Meetings },
    { id: View.SETTINGS, label: 'Settings', icon: Icons.Settings },
  ];

  console.log(
    '🚀 LAYOUT LOADED - Current main nav items:',
    mainNavItems.map(item => item.label)
  );

  const viewLabels: Record<View, string> = {
    [View.SPECTRUM]: 'The Spectrum',
    [View.DASHBOARD]: 'Home',
    [View.CHAT]: 'HopHub',
    [View.MEETINGS]: 'HopMeets',
    [View.MUSIC]: 'Music Player',
    [View.ARCADE]: 'GameHub Engine',
    [View.GAME_SERVICE]: 'CloudHop Game Service',
    [View.TWITCH]: 'Twitch',
    [View.PROFILE]: 'Digital ID',
    [View.SETTINGS]: 'System Config',
    [View.AI_TOOLS]: 'AI Agent Studio',
    [View.AUTH]: 'Authentication',
  };

  const isLightMode = settings.colorMode === 'Light Mode';
  const bgClass = isLightMode ? 'bg-[#F0F2F5] text-slate-900' : 'bg-[#050819] text-white';
  const sidebarClass = isLightMode ? 'bg-white border-gray-200' : 'bg-[#080C22] border-white/5';
  const contentBgClass = isLightMode ? 'bg-[#F0F2F5]' : 'bg-[#050819]';
  const headerClass = isLightMode
    ? 'bg-white/60 border-gray-200 text-slate-900'
    : 'bg-[#080C22]/60 border-white/5';

  return (
    <div
      className={`flex flex-col h-screen overflow-hidden italic selection:bg-[#53C8FF]/30 ${bgClass}`}
    >
      {/* Top Navigation Bar */}
      <header
        className={`h-16 shrink-0 backdrop-blur-2xl flex items-center justify-between px-6 border-b z-10 ${headerClass}`}
      >
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-3 h-12 cursor-pointer hover:bg-white/5 transition-all px-4 rounded-xl"
            onClick={() => onNavigate(View.DASHBOARD)}
            aria-label="Go to Dashboard"
          >
            <CloudHopLogo size={32} variant="neon" className="gpu-accelerated shrink-0" />
            <span className="font-bold text-lg tracking-tight animate-fade-in italic uppercase text-[#53C8FF]">
              CloudHop
            </span>
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex items-center gap-2">
          {mainNavItems.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                aria-label={`Navigate to ${item.label}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? 'bg-[#1A2348] text-[#53C8FF] shadow-[0_4px_12px_rgba(0,0,0,0.4)] ring-1 ring-[#53C8FF]/20'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                {Icon({
                  className: `w-5 h-5 shrink-0 transition-transform duration-500 ${isActive ? 'text-[#53C8FF] scale-110' : 'group-hover:scale-110'}`,
                })}
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
              }}
              className="flex items-center gap-3 hover:bg-white/5 pl-1 py-1 pr-3 rounded-full transition-all border border-transparent hover:border-white/10"
              aria-label="Open profile menu"
            >
              <img
                src={profile.avatar_url || user?.avatar || ''}
                className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 shadow-lg gpu-accelerated"
                alt={`Avatar of ${profile.display_name || user?.name}`}
              />
              <div className="hidden md:block text-left">
                <div className="text-sm font-semibold leading-none mb-1 italic">
                  {profile.display_name || user?.name}
                </div>
                <div className="text-xs text-[#53C8FF] font-semibold uppercase tracking-wide leading-none opacity-60 italic">
                  Lvl {user?.level}
                </div>
              </div>
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-[#10233A] border border-[#1E3A5F] rounded-xl shadow-2xl p-2 z-50 animate-fade-in overflow-hidden">
                <button
                  onClick={() => {
                    onNavigate(View.PROFILE);
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all italic"
                >
                  My ID
                </button>
                <hr className="my-2 border-white/5" />
                <button
                  onClick={() => {
                    onLogout();
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-red-500/10 text-red-400 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all italic"
                >
                  Exit
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className={`flex-1 flex relative overflow-hidden ${contentBgClass}`}>
        <main className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="flex-1 p-6 optimize-render flex items-center justify-center">
            {children}
          </div>
        </main>
      </div>

      {/* Notifications - temporarily disabled */}
      <div className="fixed top-4 right-4 z-[200] space-y-3 w-72 pointer-events-none">
        {/* Notifications will be re-enabled when WebSocket is fixed */}
      </div>

      {/* Global AI Assistant */}
      <AIAssistant currentView={currentView} />
    </div>
  );
};

export default Layout;
