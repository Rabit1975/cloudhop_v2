import React, { useState, ReactNode } from 'react';
import { Menu, X, LogOut, Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface CloudHopLayoutProps {
  children: React.ReactNode;
  activeTab?: 'hophub' | 'music' | 'gamehub' | 'spaces' | 'unified';
  onTabChange?: (tab: 'hophub' | 'music' | 'gamehub' | 'spaces' | 'unified') => void;
  activeSection?: 'home' | 'hophub' | 'meetings' | 'settings';
  onSectionChange?: (section: 'home' | 'hophub' | 'meetings' | 'settings') => void;
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
    { id: 'hophub' as const, label: 'HopHub', icon: '💬' },
    { id: 'music' as const, label: 'Music', icon: '🎵' },
    { id: 'gamehub' as const, label: 'Games', icon: '🎮' },
    { id: 'spaces' as const, label: 'Spaces', icon: '🌌' },
    { id: 'unified' as const, label: 'Unified', icon: '🎯' },
  ];

  return (
    <div className={cn(
      'min-h-screen transition-all duration-500',
      activeSection === 'home'
        ? 'home-bg'
        : 'bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900'
    )}>
      {/* Top Navigation - Fixed Bar */}
      <nav 
        className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40 backdrop-blur-sm relative"
      >
        <div className="flex items-center gap-4">
          <Logo size={32} />
        </div>
        
        {/* Main Navigation */}
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
                  ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50'
                  : 'text-white/80 hover:text-white hover:bg-white/10 border-transparent'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-white/80 hover:text-white hover:bg-white/10"
            onClick={() => console.log('Search clicked')}
          >
            <Search className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-white/80 hover:text-white hover:bg-white/10 relative"
            onClick={() => console.log('Notifications clicked')}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/80 hover:text-white hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-4 h-4" />
            </Button>
            
            {/* Dropdown Menu */}
            {mobileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-black/95 border border-white/20 rounded-lg shadow-2xl overflow-hidden z-[9999] backdrop-blur-xl">
                <div className="p-2 border-b border-white/10">
                  <p className="text-xs text-white/50 px-2 py-1">User Menu</p>
                </div>
                <div className="p-1">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSectionChange?.('settings');
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                  >
                    ⚙️ Settings
                  </button>
                  {onLogout && (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                    >
                      🚪 Logout
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {onLogout && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
