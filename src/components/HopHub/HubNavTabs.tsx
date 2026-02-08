import React from 'react';

type HubTab = 'chat' | 'spaces' | 'music' | 'gamehub';
type SpaceSubTab = 'groups' | 'channels';

interface HubNavTabsProps {
  activeTab: HubTab;
  activeSpaceTab?: SpaceSubTab;
  onTabChange: (tab: HubTab) => void;
  onSpaceTabChange?: (tab: SpaceSubTab) => void;
}

export const HubNavTabs: React.FC<HubNavTabsProps> = ({
  activeTab,
  activeSpaceTab = 'groups',
  onTabChange,
  onSpaceTabChange,
}) => {
  const mainTabs: { key: HubTab; label: string; icon: string }[] = [
    { key: 'chat', label: 'Chat', icon: '💬' },
    { key: 'spaces', label: 'HopSpaces', icon: '🌌' },
    { key: 'music', label: 'Music', icon: '🎵' },
    { key: 'gamehub', label: 'Arcade', icon: '🎮' },
  ];

  const spaceSubTabs: { key: SpaceSubTab; label: string; icon: string }[] = [
    { key: 'groups', label: 'Groups', icon: '👥' },
    { key: 'channels', label: 'Channels', icon: '📢' },
  ];

  return (
    <div className="bg-[#0a0d1f]/60 backdrop-blur-md">
      {/* Main Tabs */}
      <div className="flex border-b border-white/10">
        {mainTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`
              flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200
              border-b-2 ${
                activeTab === tab.key
                  ? 'border-purple-500 text-purple-300 bg-purple-500/10'
                  : 'border-transparent text-white/60 hover:text-white hover:bg-white/5'
              }
            `}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Space Sub-tabs - Only show when Chat tab is active */}
      {activeTab === 'chat' && onSpaceTabChange && (
        <div className="flex border-b border-white/5 bg-[#0f1424]">
          {spaceSubTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => onSpaceTabChange(tab.key)}
              className={`
                flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium transition-all duration-200
                border-b ${
                  activeSpaceTab === tab.key
                    ? 'border-blue-500 text-blue-300 bg-blue-500/10'
                    : 'border-transparent text-white/50 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <span className="text-sm">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
