import React, { useState, useEffect } from 'react';
import XPBar from './XPBar';
import PuterDemo from './PuterDemo';
import { Icons, CloudHopLogo } from '../constants';
import { View, Meeting } from '../types';
import { useSpace } from '../contexts/SpaceContext';
import { api } from '../services/mockApi';
import { useVisibility } from '../hooks/useVisibility';

interface DashboardProps {
  onNavigate: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { currentSpace } = useSpace();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Use visibility manager for performance
  const { ref: dashboardRef, visible: dashboardVisible } = useVisibility('Dashboard');

  // Fetch Initial Data
  useEffect(() => {
    if (!dashboardVisible) return; // Don't fetch if not visible

    const loadData = async () => {
      setIsLoading(true);
      const meetingsData = await api.getMeetings();
      setMeetings(meetingsData);
      setIsLoading(false);
    };
    void loadData();
  }, [dashboardVisible]);

  return (
    <div ref={dashboardRef} className="space-y-10 italic">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 animate-fade-in">
        <div className="flex items-center gap-6">
          <CloudHopLogo size={48} variant="main" />
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-1 uppercase italic tracking-tighter">
              {currentSpace.name}
            </h1>
            <p className="text-white/30 font-medium text-lg italic">
              {currentSpace.id === 'global-space' ? 'Global Dashboard' : 'Active Space Session'}
            </p>
          </div>
        </div>
        <div className="w-full lg:w-96 bg-[#0E1430] border border-[#1E3A5F] p-6 rounded-[24px] shadow-2xl relative group overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-20">
            <Icons.AI className="w-4 h-4" />
          </div>
          <XPBar xp={1250} level={5} nextLevelXP={2000} />
        </div>
      </div>

      {/* Main Grid - Simplified without fake activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Welcome Message */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#0E1430] border border-white/5 rounded-[28px] p-7 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#53C8FF]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#53C8FF] mb-8 opacity-60 italic">
              Welcome to CloudHop
            </h3>

            <div className="text-center py-16">
              <div className="text-6xl mb-6">🌌</div>
              <h2 className="text-2xl font-bold text-white mb-4">Your Emotional Universe Awaits</h2>
              <p className="text-white/60 max-w-md mx-auto mb-8">
                Navigate to HopHub to connect with others, or explore Spaces to create and
                collaborate.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => onNavigate(View.CHAT)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl text-white font-medium transition-all"
                >
                  Open HopHub
                </button>
                <button
                  onClick={() => onNavigate(View.ARCADE)}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-xl text-white font-medium transition-all"
                >
                  Explore GameHub
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Schedule & AI */}
        <div className="space-y-8">
          <div className="bg-[#0E1430] border border-white/5 rounded-[28px] p-7 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#53C8FF]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#53C8FF] mb-8 opacity-60 italic">
              Space Schedule
            </h3>

            <div className="space-y-3">
              {meetings.map(mtg => (
                <div
                  key={mtg.id}
                  className="flex items-center justify-between p-5 bg-[#0D1A2A] rounded-2xl border border-[#1E3A5F] group hover:border-[#53C8FF]/50 transition-all shadow-lg"
                >
                  <div>
                    <div className="text-sm font-black tracking-tight group-hover:text-[#53C8FF] transition-all uppercase">
                      {mtg.title}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="text-[10px] text-white/40 font-black uppercase tracking-widest italic">
                        {mtg.time}
                      </div>
                      <div className="w-1 h-1 rounded-full bg-white/20"></div>
                      <div className="text-[9px] text-white/20 font-medium">
                        {mtg.participants.length} Attending
                      </div>
                    </div>
                  </div>
                  <button
                    className="px-6 py-2.5 bg-[#53C8FF]/10 text-[#53C8FF] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#53C8FF] hover:text-[#0A0F1F] transition-all italic"
                    aria-label={`Join meeting: ${mtg.title}`}
                  >
                    Hop In
                  </button>
                </div>
              ))}
              {meetings.length === 0 && (
                <p className="text-xs text-white/20 font-bold py-10 text-center uppercase tracking-widest italic">
                  No pending meetings.
                </p>
              )}
            </div>
          </div>

          <PuterDemo />
        </div>
      </div>
    </div>
  );
};

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-[#0E1430] border border-white/5 rounded-[28px] p-7 shadow-2xl relative overflow-hidden group">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#53C8FF]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#53C8FF] mb-8 opacity-60 italic">
      {title}
    </h3>
    {children}
  </div>
);

const ShortcutLink: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <button className="flex flex-col items-center justify-center gap-4 p-6 rounded-[24px] bg-white/5 hover:bg-white/10 transition-all border border-white/5 hover:border-[#53C8FF]/30 group shadow-lg">
    <div className="text-[#53C8FF]/40 group-hover:text-[#53C8FF] transition-all group-hover:scale-110 duration-500">
      {icon}
    </div>
    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 group-hover:text-[#53C8FF] transition-all whitespace-nowrap italic">
      {label}
    </span>
  </button>
);

export default Dashboard;
