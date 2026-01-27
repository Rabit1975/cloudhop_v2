import React from 'react';
import { HopSpace } from '../../hopspaces/utils/types';
import { useVisibility } from '../../hooks/useVisibility';

type HubTab = 'messages' | 'groups' | 'channels' | 'spaces';

interface HubLeftPanelProps {
  activeTab: HubTab;
  selectedChatId: string | null;
  selectedSpace: HopSpace | null;
  onChatSelect: (chatId: string) => void;
  onSpaceSelect: (space: HopSpace) => void;
  spaces: HopSpace[];
  user: any;
}

export const HubLeftPanel: React.FC<HubLeftPanelProps> = ({
  activeTab,
  selectedChatId,
  selectedSpace,
  onChatSelect,
  onSpaceSelect,
  spaces,
  user
}) => {
  const { ref: leftPanelRef, visible: leftPanelVisible } = useVisibility('HubLeftPanel');

  // Mock data for different tabs
  const mockChats = [
    { id: '1', title: 'General Lobby', type: 'group', unread: 3 },
    { id: '2', title: 'Crypto Talk', type: 'group', unread: 0 },
    { id: '3', title: 'Daily News', type: 'channel', unread: 12 },
    { id: '4', title: 'Dev Team', type: 'group', unread: 1 }
  ];

  const mockGroups = [
    { id: '1', name: 'CloudHop Team', members: 24, online: 8 },
    { id: '2', name: 'Crypto Enthusiasts', members: 156, online: 42 },
    { id: '3', name: 'Art Collective', members: 89, online: 23 }
  ];

  const mockChannels = [
    { id: '1', name: '#general', topic: 'General discussion' },
    { id: '2', name: '#announcements', topic: 'Important updates' },
    { id: '3', name: '#random', topic: 'Off-topic chat' },
    { id: '4', name: '#dev-talk', topic: 'Development discussions' }
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
      case 'messages':
        return (
          <div className="p-4 space-y-2">
            <h3 className="text-white font-medium text-sm uppercase tracking-wider mb-4">Messages</h3>
            {mockChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onChatSelect(chat.id)}
                className={`
                  w-full p-3 rounded-lg text-left transition-all duration-200
                  flex items-center justify-between
                  ${selectedChatId === chat.id
                    ? 'bg-purple-500/20 border border-purple-500/30'
                    : 'bg-white/5 border border-transparent hover:bg-white/10'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <span className="text-white text-sm">💬</span>
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{chat.title}</div>
                    <div className="text-white/60 text-xs capitalize">{chat.type}</div>
                  </div>
                </div>
                {chat.unread > 0 && (
                  <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">{chat.unread}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        );

      case 'groups':
        return (
          <div className="p-4 space-y-2">
            <h3 className="text-white font-medium text-sm uppercase tracking-wider mb-4">Groups</h3>
            {mockGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => onChatSelect(group.id)}
                className="
                  w-full p-3 rounded-lg text-left transition-all duration-200
                  bg-white/5 border border-transparent hover:bg-white/10
                "
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white font-medium text-sm">{group.name}</div>
                  <div className="text-green-400 text-xs">{group.online} online</div>
                </div>
                <div className="text-white/60 text-xs">{group.members} members</div>
              </button>
            ))}
          </div>
        );

      case 'channels':
        return (
          <div className="p-4 space-y-2">
            <h3 className="text-white font-medium text-sm uppercase tracking-wider mb-4">Channels</h3>
            {mockChannels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => onChatSelect(channel.id)}
                className={`
                  w-full p-3 rounded-lg text-left transition-all duration-200
                  ${selectedChatId === channel.id
                    ? 'bg-purple-500/20 border border-purple-500/30'
                    : 'bg-white/5 border border-transparent hover:bg-white/10'
                  }
                `}
              >
                <div className="text-white font-medium text-sm">{channel.name}</div>
                <div className="text-white/60 text-xs mt-1">{channel.topic}</div>
              </button>
            ))}
          </div>
        );

      case 'spaces':
        return (
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium text-sm uppercase tracking-wider">Spaces</h3>
              <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-xs transition-colors">
                + New Space
              </button>
            </div>
            {spaces.map((space) => (
              <button
                key={space.id}
                onClick={() => onSpaceSelect(space)}
                className={`
                  w-full p-3 rounded-lg text-left transition-all duration-200
                  flex items-center gap-3
                  ${selectedSpace?.id === space.id
                    ? 'bg-purple-500/20 border border-purple-500/30'
                    : 'bg-white/5 border border-transparent hover:bg-white/10'
                  }
                `}
              >
                <div className="text-lg">
                  {space.type === 'music' && '🎵'}
                  {space.type === 'fluid_art' && '🎨'}
                  {space.type === 'ideas' && '💡'}
                  {space.type === 'world' && '🌍'}
                  {space.type === 'anima' && '🜂'}
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium text-sm">{space.name}</div>
                  <div className="text-white/60 text-xs capitalize">{space.type.replace('_', ' ')}</div>
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
    <div
      ref={leftPanelRef}
      className="w-80 bg-[#0a0d1f] border-r border-white/10 flex flex-col"
    >
      {renderContent()}
    </div>
  );
};
