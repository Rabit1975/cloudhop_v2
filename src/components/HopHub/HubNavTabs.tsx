import React from 'react';

type HubTab = 'messages' | 'groups' | 'channels' | 'spaces';

interface HubNavTabsProps {
  activeTab: HubTab;
  onTabChange: (tab: HubTab) => void;
}

export const HubNavTabs: React.FC<HubNavTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { key: HubTab; label: string; icon: string }[] = [
    { key: 'messages', label: 'Messages', icon: '💬' },
    { key: 'groups', label: 'Groups', icon: '👥' },
    { key: 'channels', label: 'Channels', icon: '📢' },
    { key: 'spaces', label: 'Spaces', icon: '🌌' }
  ];

  return (
    <div className="flex border-b border-white/10 bg-[#0a0d1f]">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`
            flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200
            border-b-2 ${activeTab === tab.key
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
  );
};
