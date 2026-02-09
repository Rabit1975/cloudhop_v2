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

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate, user, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { id: View.DASHBOARD, label: 'Home', icon: Icons.Home },
    { id: View.CHAT, label: 'HopHub', icon: Icons.Chat },
    { id: View.MEETINGS, label: 'HopMeets', icon: Icons.Meetings },
    { id: View.ARCADE, label: 'GameHub', icon: Icons.Arcade },
  ];

  return (
    <div className="flex h-screen bg-[#050819] text-white">
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? 'w-64' : 'w-24'} bg-[#080C22] flex flex-col transition-all duration-500 border-r border-white/5`}
      >
        <button
          className="p-4 flex items-center gap-3 h-16 border-b border-white/5"
          onClick={() => onNavigate(View.DASHBOARD)}
        >
          <div className="w-7 h-7 bg-[#53C8FF] rounded-lg" />
          {isSidebarOpen && <span className="font-bold text-lg">CloudHop</span>}
        </button>

        <nav className="flex-1 px-4 mt-8 space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  isActive ? 'bg-[#1A2348] text-[#53C8FF]' : 'text-white/80 hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                {isSidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-[#080C22] border-b border-white/5 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h2 className="text-sm font-bold text-[#53C8FF]">{currentView}</h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-3">
              <img src={user?.avatar || ''} className="w-8 h-8 rounded-lg" alt="Avatar" />
              <span>{user?.name}</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
