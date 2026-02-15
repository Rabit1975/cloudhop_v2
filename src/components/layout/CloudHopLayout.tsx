import React, { useState, ReactNode } from 'react';
import { Menu, X, LogOut, Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { cn } from '@/lib/utils';
import YouTubeMusicIntegration from '../YouTubeMusicIntegration';
import GameHub from '../GameHub/GameHub';
import SpacesWithChat from '../HopHub/SpacesWithChat';
import RabbitAI from '../RabbitAI/RabbitAI';
import { motion, AnimatePresence } from 'framer-motion';
import MusicSystemSelector from '../music/MusicSystemSelector';

interface CloudHopLayoutProps {
  children: React.ReactNode;
  activeTab?: 'hophub' | 'music' | 'gamehub' | 'spaces' | 'unified';
  onTabChange?: (tab: 'hophub' | 'music' | 'gamehub' | 'spaces' | 'unified') => void;
  activeSection?: 'home' | 'hophub' | 'meetings' | 'settings' | 'twitch';
  onSectionChange?: (section: 'home' | 'hophub' | 'meetings' | 'settings' | 'twitch') => void;
  onLogout?: () => void;
}

export default function CloudHopLayout({
  children,
  activeTab,
  onTabChange,
  activeSection = 'home',
  onSectionChange,
  onLogout,
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
      <nav 
        className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40 backdrop-blur-sm relative"
      >
        <div className="flex items-center gap-4">
          <Logo size={32} />
        </div>
        
        {/* Main Navigation - Vertical Layout */}
        <div className="flex flex-col sm:flex-row items-center gap-2 ml-8">
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
                'px-4 py-2 rounded text-sm font-medium transition-all w-full sm:w-auto relative',
                activeSection === item.section
                  ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              )}
            >
              {item.label}
              {/* HopHub Dropdown Indicator */}
              {item.id === 'hophub' && (
                <svg className="absolute -bottom-1 -right-1 w-2 h-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7" />
                </svg>
              )}
            </button>
          ))}
        </div>
        
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

        <button 
          onClick={onLogout}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold text-sm hover:opacity-90 transition-all active:scale-95"
        >
          Logout
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden p-2 hover:bg-white/10 rounded-lg text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* MAIN CONTENT AREA */}
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
            <MusicSystemSelector />
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
