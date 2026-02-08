import React from 'react';
import { HopSpace } from '../../hopspaces/utils/types';
import { useVisibility } from '../../hooks/useVisibility';

type HubTab = 'chat' | 'spaces' | 'music' | 'gamehub';
type SpaceSubTab = 'groups' | 'channels';

interface HubLeftPanelProps {
  activeTab: HubTab;
  activeSpaceTab?: SpaceSubTab;
  selectedChatId: string | null;
  selectedSpace: HopSpace | null;
  onChatSelect: (chatId: string) => void;
  onSpaceSelect: (space: HopSpace) => void;
  spaces: HopSpace[];
  user: any;
  onCreateGroup?: () => void;
  onCreateChannel?: () => void;
  onCreateSpace?: () => void;
}

export const HubLeftPanel: React.FC<HubLeftPanelProps> = ({
  activeTab,
  activeSpaceTab = 'groups',
  selectedChatId,
  selectedSpace,
  onChatSelect,
  onSpaceSelect,
  spaces,
  user,
  onCreateGroup,
  onCreateChannel,
  onCreateSpace,
}) => {
  const { ref: leftPanelRef, visible: leftPanelVisible } = useVisibility('HubLeftPanel');

  // Mock data for different tabs
  const mockGroups = [
    { id: '1', name: 'Gaming Crew', members: 24, online: 8 },
    { id: '2', name: 'Music Lovers', members: 42, online: 12 },
    { id: '3', name: 'CloudHop Team', members: 89, online: 23 },
  ];

  const mockChannels = [
    { id: '1', name: '#general', topic: 'General discussion' },
    { id: '2', name: '#announcements', topic: 'Important updates' },
    { id: '3', name: '#random', topic: 'Off-topic chat' },
    { id: '4', name: '#dev-talk', topic: 'Development discussions' },
  ];

  const mockPlaylists = [
    { id: 'p1', name: 'Lofi Focus', songs: 120 },
    { id: 'p2', name: 'Cyberpunk Vibes', songs: 45 },
    { id: 'p3', name: 'Deep Space Ambient', songs: 32 },
  ];

  const mockGames = [
    { id: 'g1', name: 'Cyber Racer', genre: 'Racing' },
    { id: 'g2', name: 'Space Invaders 3D', genre: 'Arcade' },
    { id: 'g3', name: 'Neon Tetris', genre: 'Puzzle' },
  ];

  const renderContent = () => {
    if (!leftPanelVisible) {
      return (
        <div className="flex items-center justify-center h-full text-white/40">
          <div className="text-center">
            <div className="text-2xl mb-2">🌙</div>
            <div className="text-sm">Panel paused</div>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'chat':
        if (activeSpaceTab === 'groups') {
          return (
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#53C8FF] font-black text-xs uppercase tracking-[0.2em] italic opacity-80">Groups</h3>
                <button
                  onClick={onCreateGroup}
                  className="px-2 py-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded text-white text-[10px] font-bold uppercase tracking-wider hover:from-purple-500 hover:to-blue-500 transition-all"
                >
                  + New
                </button>
              </div>
              {mockGroups.map(group => (
                <button
                  key={group.id}
                  onClick={() => onChatSelect(group.id)}
                  className={`
                    w-full p-4 rounded-xl text-left transition-all duration-300 group relative overflow-hidden border
                    ${
                        selectedChatId === group.id
                        ? 'bg-[#1E3A5F]/40 border-[#53C8FF]/50 shadow-[0_0_20px_rgba(83,200,255,0.1)]'
                        : 'bg-[#0E1430] border-white/5 hover:border-white/10 hover:bg-[#151b3b]'
                    }
                  `}
                >
                  {selectedChatId === group.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#53C8FF]"></div>
                  )}
                  <div className="flex items-center justify-between mb-1">
                    <div className={`font-bold text-sm italic ${selectedChatId === group.id ? 'text-white' : 'text-white/80'}`}>
                      {group.name}
                    </div>
                    <div className="text-[#00ff9d] text-[10px] font-mono">{group.online} ON</div>
                  </div>
                  <div className="text-white/40 text-xs font-medium">{group.members} members</div>
                </button>
              ))}
            </div>
          );
        } else {
          return (
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#53C8FF] font-black text-xs uppercase tracking-[0.2em] italic opacity-80">
                  Channels
                </h3>
                <button
                  onClick={onCreateChannel}
                  className="px-2 py-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded text-white text-[10px] font-bold uppercase tracking-wider hover:from-purple-500 hover:to-blue-500 transition-all"
                >
                  + New
                </button>
              </div>
              {mockChannels.map(channel => (
                <button
                  key={channel.id}
                  onClick={() => onChatSelect(channel.id)}
                  className={`
                    w-full p-4 rounded-xl text-left transition-all duration-300 group relative overflow-hidden border
                    ${
                      selectedChatId === channel.id
                        ? 'bg-[#1E3A5F]/40 border-[#53C8FF]/50 shadow-[0_0_20px_rgba(83,200,255,0.1)]'
                        : 'bg-[#0E1430] border-white/5 hover:border-white/10 hover:bg-[#151b3b]'
                    }
                  `}
                >
                  {selectedChatId === channel.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#53C8FF]"></div>
                  )}
                  <div className={`font-bold text-sm italic ${selectedChatId === channel.id ? 'text-white' : 'text-white/80'}`}>
                    {channel.name}
                  </div>
                  <div className="text-white/40 text-xs mt-1">{channel.topic}</div>
                </button>
              ))}
            </div>
          );
        }

      case 'spaces':
        return (
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#53C8FF] font-black text-xs uppercase tracking-[0.2em] italic opacity-80">Spaces</h3>
              <button
                onClick={onCreateSpace}
                className="px-2 py-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded text-white text-[10px] font-bold uppercase tracking-wider hover:from-purple-500 hover:to-blue-500 transition-all"
              >
                + New
              </button>
            </div>
            {spaces.map(space => (
              <button
                key={space.id}
                onClick={() => onSpaceSelect(space)}
                className={`
                  w-full p-3 rounded-xl text-left transition-all duration-300 flex items-center gap-3 border
                  ${
                    selectedSpace?.id === space.id
                      ? 'bg-[#1E3A5F]/40 border-[#53C8FF]/50 shadow-[0_0_20px_rgba(83,200,255,0.1)]'
                      : 'bg-[#0E1430] border-white/5 hover:border-white/10 hover:bg-[#151b3b]'
                  }
                `}
              >
                <div className="text-xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                  {space.type === 'music' && '🎵'}
                  {space.type === 'fluid_art' && '🎨'}
                  {space.type === 'ideas' && '💡'}
                  {space.type === 'world' && '🌍'}
                  {space.type === 'anima' && '🦋'}
                </div>
                <div className="flex-1">
                  <div className={`font-bold text-sm italic ${selectedSpace?.id === space.id ? 'text-white' : 'text-white/80'}`}>
                    {space.name}
                  </div>
                  <div className="text-white/40 text-xs">{space.description}</div>
                </div>
              </button>
            ))}
          </div>
        );

      case 'music':
        return (
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#53C8FF] font-black text-xs uppercase tracking-[0.2em] italic opacity-80">Library</h3>
            </div>
             {/* "Full Version" placeholder logic - no preselected lists */}
            <div className="p-4 rounded-xl bg-[#0E1430]/40 border border-[#53C8FF]/20 text-center">
                <div className="text-2xl mb-2">🎧</div>
                <div className="text-sm font-bold text-white italic">Your Music</div>
                <div className="text-xs text-white/50 mt-1">
                   Access your full library and favorites in the center panel.
                </div>
            </div>
            
             <button className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-left flex items-center gap-3 transition-all group">
                <span className="text-lg group-hover:scale-110 transition-transform">❤️</span>
                <span className="text-sm font-bold text-white/80 italic">Liked Songs</span>
             </button>
             <button className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-left flex items-center gap-3 transition-all group">
                <span className="text-lg group-hover:scale-110 transition-transform">🕒</span>
                <span className="text-sm font-bold text-white/80 italic">Recent</span>
             </button>
          </div>
        );

      case 'gamehub':
        return (
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#53C8FF] font-black text-xs uppercase tracking-[0.2em] italic opacity-80">Active Games</h3>
            </div>
            {mockGames.map(game => (
              <button
                key={game.id}
                className="w-full p-4 rounded-xl text-left bg-[#0E1430] border border-white/5 hover:border-[#53C8FF]/30 hover:bg-[#151b3b] transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-xs">
                    🎮
                  </div>
                  <div>
                    <div className="font-bold text-sm italic text-white/80 group-hover:text-white">{game.name}</div>
                    <div className="text-white/40 text-xs">{game.genre}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div ref={leftPanelRef} className="h-full w-64 bg-[#050819]/60 backdrop-blur-md border-r border-white/5 overflow-y-auto custom-scrollbar shrink-0">
      {renderContent()}
    </div>
  );
};
