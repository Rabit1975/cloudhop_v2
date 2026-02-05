import React, { useState } from 'react';
import { View, User } from '../types';
import { Icons } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  onNavigate: (view: View) => void;
  user: User | null;
  onLogout: () => void;
}

const LayoutSimple: React.FC<LayoutProps> = ({
  children,
  currentView,
  onNavigate,
  user,
  onLogout,
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const mainNavItems = [
    { id: View.DASHBOARD, label: 'Home', icon: Icons.Home },
    { id: View.CHAT, label: 'HopHub', icon: Icons.Chat },
    { id: View.MEETINGS, label: 'HopMeetings', icon: Icons.Meetings },
    { id: View.SETTINGS, label: 'Settings', icon: Icons.Settings },
  ];

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

  return (
    <div className="flex h-screen bg-[#050819] text-white overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-[#080C22] border-r border-gray-800 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#53C8FF] rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">C</span>
            </div>
            {isSidebarOpen && <span className="text-xl font-bold text-[#53C8FF]">CloudHop</span>}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {mainNavItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  currentView === item.id
                    ? 'bg-[#53C8FF] text-black'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {isSidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-sm">👤</span>
            </div>
            {isSidebarOpen && (
              <div className="flex-1">
                <div className="text-sm font-medium">User</div>
                <div className="text-xs text-gray-400">Online</div>
              </div>
            )}
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="p-1 hover:bg-gray-800 rounded"
            >
              ▼
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 bg-[#080C22] border-b border-gray-800 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-800 rounded-lg"
            >
              ☰
            </button>
            <h1 className="text-xl font-semibold text-[#53C8FF]">{viewLabels[currentView]}</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-800 rounded-lg">🔍</button>
            <button className="p-2 hover:bg-gray-800 rounded-lg">🔔</button>
            <button className="p-2 hover:bg-gray-800 rounded-lg">⚙️</button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default LayoutSimple;
