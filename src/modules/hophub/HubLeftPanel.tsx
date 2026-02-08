import React from 'react';
import { HopSpace } from '../../hopspaces/utils/types';
import { useVisibility } from '../../hooks/useVisibility';

type HubTab = 'hopspaces' | 'music' | 'gamehub';
type SpaceSubTab = 'groups' | 'channels';

interface HubLeftPanelProps {
  activeTab: HubTab;
  activeSpaceTab?: SpaceSubTab;
  selectedChatId: string | null;
  selectedSpace: HopSpace | null;
  onChatSelect: (chatId: string) => void;
  onSpaceSelect: (space: HopSpace) => void;
  spaces: HopSpace[];
  groups?: any[];
  channels?: any[];
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
  groups = [],
  channels = [],
  user,
  onCreateGroup,
  onCreateChannel,
  onCreateSpace,
}) => {
  // const { ref: leftPanelRef, visible: leftPanelVisible } = useVisibility('HubLeftPanel');
  const leftPanelVisible = true;

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
      case 'hopspaces':
        if (activeSpaceTab === 'groups') {
          return (
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium text-sm uppercase tracking-wider">Groups</h3>
                <button
                  onClick={onCreateGroup}
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-xs transition-colors"
                >
                  + New Group
                </button>
              </div>
              {groups.map(group => (
                <button
                  key={group.id}
                  onClick={() => onChatSelect(group.id)}
                  className={`
                    w-full p-3 rounded-lg text-left transition-all duration-200
                    ${selectedChatId === group.id ? 'bg-purple-600/20 border border-purple-500/50' : 'bg-white/5 border border-transparent hover:bg-white/10'}
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-white font-medium text-sm">{group.name}</div>
                    <div className="text-green-400 text-xs">{group.online || 0} online</div>
                  </div>
                  <div className="text-white/60 text-xs">{group.members || 0} members</div>
                </button>
              ))}
            </div>
          );
        } else if (activeSpaceTab === 'channels') {
          return (
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium text-sm uppercase tracking-wider">
                  Channels
                </h3>
                <button
                  onClick={onCreateChannel}
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-xs transition-colors"
                >
                  + New Channel
                </button>
              </div>
              {channels.map(channel => (
                <button
                  key={channel.id}
                  onClick={() => onChatSelect(channel.id)}
                  className={`
                    w-full p-3 rounded-lg text-left transition-all duration-200
                    ${
                      selectedChatId === channel.id
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
        }
        return (
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium text-sm uppercase tracking-wider">Spaces</h3>
              <button
                onClick={onCreateSpace}
                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-xs transition-colors"
              >
                + New Space
              </button>
            </div>
            {spaces.map(space => (
              <button
                key={space.id}
                onClick={() => onSpaceSelect(space)}
                className={`
                  w-full p-3 rounded-lg text-left transition-all duration-200
                  flex items-center gap-3
                  ${
                    selectedSpace?.id === space.id
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
                  {space.type === 'anima' && '🦋'}
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium text-sm">{space.name}</div>
                  <div className="text-white/60 text-xs">{space.description}</div>
                </div>
              </button>
            ))}
          </div>
        );

      case 'music':
        return (
          <div className="flex items-center justify-center h-full text-white/40">
            <div className="text-center">
              <div className="text-2xl mb-2">🎵</div>
              <div className="text-sm">Music player loaded</div>
            </div>
          </div>
        );

      case 'gamehub':
        return (
          <div className="flex items-center justify-center h-full text-white/40">
            <div className="text-center">
              <div className="text-2xl mb-2">🎮</div>
              <div className="text-sm">GameHub loaded</div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-80 bg-black/40 backdrop-blur-md border-r border-white/10 flex flex-col h-full">
      {renderContent()}
    </div>
  );
};
