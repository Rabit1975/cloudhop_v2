import React, { useState, ReactNode } from 'react';
import { Menu, X, LogOut, Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '../../lib/utils';
import YouTubeMusicIntegration from '../YouTubeMusicIntegration';
import GameHub from '../GameHub/GameHub';
import SpacesWithChat from '../HopHub/SpacesWithChat';
import RabbitAI from '../RabbitAI/RabbitAI';

interface CloudHopLayoutProps {
  children: ReactNode;
  activeTab: 'hophub' | 'music' | 'gamehub' | 'spaces';
  onTabChange: (tab: 'hophub' | 'music' | 'gamehub' | 'spaces') => void;
  activeSection?: 'home' | 'hophub' | 'meetings' | 'settings';
  onSectionChange?: (section: 'home' | 'hophub' | 'meetings' | 'settings') => void;
}

export default function CloudHopLayout({
  children,
  activeTab,
  onTabChange,
  activeSection = 'home',
  onSectionChange,
}: CloudHopLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const hophubTabs = [
    { id: 'hophub' as const, label: 'HopHub', icon: '🏠' },
    { id: 'music' as const, label: 'Music', icon: '🎵' },
    { id: 'gamehub' as const, label: 'GameHub', icon: '🎮' },
    { id: 'spaces' as const, label: 'Spaces', icon: '🌌' },
  ];

  return (
    <div
      className={cn(
        'h-screen w-screen overflow-hidden flex flex-col relative',
        activeSection === 'hophub'
          ? 'hophub-bg'
          : activeSection === 'home'
            ? 'home-bg'
            : 'bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900'
      )}
    >
      {/* Top Navigation - Fixed Bar */}
      <nav className="glass-panel flex items-center justify-between px-6 py-4 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img src="/hopglow.png" alt="CloudHop" className="w-8 h-8 rounded object-contain" />
            <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">
              CloudHop
            </span>
          </div>

          {/* Main Navigation - Always visible */}
          <div className="hidden sm:flex items-center gap-1 ml-8">
            {[
              { id: 'home' as const, label: 'Home', section: 'home' as const },
              { id: 'hophub' as const, label: 'HopHub', section: 'hophub' as const },
              { id: 'meetings' as const, label: 'HopMeetings', section: 'meetings' as const },
              { id: 'settings' as const, label: 'Settings', section: 'settings' as const },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => onSectionChange?.(item.section)}
                className={cn(
                  'px-4 py-2 rounded text-sm font-medium transition-all',
                  activeTab === 'hophub' && activeSection === item.section
                    ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center bg-white/5 rounded-lg px-3 py-2 border border-white/10">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search apps, files, people..."
              className="bg-transparent ml-2 text-sm text-white placeholder-gray-500 outline-none w-48"
            />
          </div>

          <button className="p-2 hover:bg-white/10 rounded-lg transition-all text-cyan-400">
            <Bell className="w-5 h-5" />
          </button>

          <RabbitAI size="sm" />

          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold text-sm hover:opacity-90 transition-all active:scale-95">
            Logout
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 hover:bg-white/10 rounded-lg text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Secondary Navigation - Only visible when in HopHub section */}
      {activeSection === 'hophub' && (
        <div className="glass-panel flex items-center gap-2 px-6 py-3 border-b border-white/10 overflow-x-auto relative z-10">
          {/* Search Box */}
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search chats, channels, groups..."
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 text-sm"
            />
          </div>
          
          {/* Tab Buttons with Dropdowns */}
          {hophubTabs.map(tab => (
            <div key={tab.id} className="relative">
              <button
                onClick={() => {
                  // For hophub tabs, just change the activeTab (stays in hophub section)
                  // For other tabs, just change the activeTab
                  onTabChange(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all flex items-center gap-2',
                  activeTab === tab.id
                    ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-400/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                )}
              >
                <span>{tab.icon}</span>
                {tab.label}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              {activeTab === tab.id && (
                <div className="absolute top-full mt-1 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg shadow-xl z-50">
                  {tab.id === 'hophub' && (
                    <>
                      <button className="block w-full text-left px-4 py-2 text-white hover:bg-white/10 text-sm">
                        💬 Group Chat
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-white hover:bg-white/10 text-sm">
                        📢 Channels
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-white hover:bg-white/10 text-sm">
                        👥 Direct Messages
                      </button>
                    </>
                  )}
                  {tab.id === 'spaces' && (
                    <>
                      <button className="block w-full text-left px-4 py-2 text-white hover:bg-white/10 text-sm">
                        🎨 Fluid Art
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-white hover:bg-white/10 text-sm">
                        🌌 Creative Spaces
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-white hover:bg-white/10 text-sm">
                        🎭 Role Play
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <main className="flex-1 overflow-hidden relative">
        {/* Show content based on active tab */}
        {activeTab === 'hophub' ? (
          <div className="flex h-full">
            {/* Main content area - full width */}
            <div className="flex-1">
              {children}
            </div>
          </div>
        ) : activeTab === 'music' ? (
          <div className="w-full h-full">
            <YouTubeMusicIntegration />
          </div>
        ) : activeTab === 'gamehub' ? (
          <div className="w-full h-full">
            <GameHub />
          </div>
        ) : activeTab === 'spaces' ? (
          <div className="w-full h-full">
            <SpacesWithChat />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <p>Content not found</p>
          </div>
        )}
      </main>
    </div>
  );
}
