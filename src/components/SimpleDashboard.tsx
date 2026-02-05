import React from 'react';
import { View } from '../types';
import { Icons } from '../constants';

interface SimpleDashboardProps {
  onNavigate: (view: View) => void;
}

const SimpleDashboard: React.FC<SimpleDashboardProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Centered Rabbit Logo */}
      <div className="flex-center mb-8">
        <div className="text-6xl mb-4">🐰</div>
      </div>

      {/* Welcome */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">CloudHop</h1>
        <p className="text-white/60 text-sm">Choose your destination</p>
      </div>

      {/* Compact Navigation Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-md w-full">
        {/* HopHub */}
        <button
          onClick={() => onNavigate(View.CHAT)}
          className="p-3 bg-[#0E1430] border border-white/10 rounded-lg hover:border-[#53C8FF]/50 transition-all group flex-center flex-col"
        >
          <Icons.Chat className="w-5 h-5 text-[#53C8FF] mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs text-white font-medium">HopHub</span>
        </button>

        {/* HopMeets */}
        <button
          onClick={() => onNavigate(View.MEETINGS)}
          className="p-3 bg-[#0E1430] border border-white/10 rounded-lg hover:border-[#53C8FF]/50 transition-all group flex-center flex-col"
        >
          <Icons.Meetings className="w-5 h-5 text-[#53C8FF] mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs text-white font-medium">HopMeets</span>
        </button>

        {/* HopSpaces */}
        <button
          onClick={() => onNavigate(View.CORE)}
          className="p-3 bg-[#0E1430] border border-white/10 rounded-lg hover:border-[#53C8FF]/50 transition-all group flex-center flex-col"
        >
          <Icons.Communities className="w-5 h-5 text-[#53C8FF] mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs text-white font-medium">HopSpaces</span>
        </button>

        {/* GameHub */}
        <button
          onClick={() => onNavigate(View.ARCADE)}
          className="p-3 bg-[#0E1430] border border-white/10 rounded-lg hover:border-[#53C8FF]/50 transition-all group flex-center flex-col"
        >
          <Icons.Arcade className="w-5 h-5 text-[#53C8FF] mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs text-white font-medium">GameHub</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => onNavigate(View.PROFILE)}
          className="p-3 bg-[#0E1430] border border-white/10 rounded-lg hover:border-[#53C8FF]/50 transition-all group flex-center flex-col"
        >
          <Icons.Profile className="w-5 h-5 text-[#53C8FF] mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs text-white font-medium">Profile</span>
        </button>

        {/* Settings */}
        <button
          onClick={() => onNavigate(View.SETTINGS)}
          className="p-3 bg-[#0E1430] border border-white/10 rounded-lg hover:border-[#53C8FF]/50 transition-all group flex-center flex-col"
        >
          <Icons.Settings className="w-5 h-5 text-[#53C8FF] mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs text-white font-medium">Settings</span>
        </button>
      </div>

      {/* Status */}
      <div className="mt-8">
        <div className="flex items-center gap-2 px-3 py-1 bg-[#1A2348] rounded-full">
          <div className="w-1.5 h-1.5 bg-[#3DD68C] rounded-full animate-pulse"></div>
          <span className="text-xs text-[#3DD68C] font-medium">Online</span>
        </div>
      </div>
    </div>
  );
};

export default SimpleDashboard;
