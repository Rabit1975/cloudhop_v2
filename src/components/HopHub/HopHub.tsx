import React, { useState } from 'react';
import { HopSpace } from '../../hopspaces/utils/types';
import { useVisibility } from '../../hooks/useVisibility';
import { VisibilityManager } from '../../utils/visibilityManager';

// Import new HopHub components
import { HubNavTabs } from './HubNavTabs';
import { HubLeftPanel } from './HubLeftPanel';
import { HubCenter } from './HubCenter';
import { HubRightPanel } from './HubRightPanel';
import { CreateGroupModal } from './CreateGroupModal';
import { CreateChannelModal } from './CreateChannelModal';
import { CreateSpaceModal } from './CreateSpaceModal';

interface HopHubProps {
  user: any;
  onNavigate: (view: any) => void;
}

type HubTab = 'messages' | 'groups' | 'channels' | 'spaces';
type SpaceSubTab = 'creative' | 'music' | 'twitch';

export const HopHub: React.FC<HopHubProps> = ({ user, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<HubTab>('messages');
  const [activeSpaceTab, setActiveSpaceTab] = useState<SpaceSubTab>('creative');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [selectedSpace, setSelectedSpace] = useState<HopSpace | null>(null);
  
  // Modal states
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showCreateSpaceModal, setShowCreateSpaceModal] = useState(false);

  // Use visibility manager for performance
  const { ref: hubRef, visible: hubVisible } = useVisibility('HopHub');

  // Mock spaces data - this will come from your spaces service
  const mockSpaces: HopSpace[] = [
    {
      id: '1',
      name: 'Music Studio',
      type: 'music',
      mood: 'dreamy',
      created_at: new Date().toISOString(),
      cover_image_url: '',
      background_url: '',
      orbit_links: [],
      galaxy_position: { x: 0, y: 0, layer: 0 },
      glow_intensity: 0.8,
      metadata: {},
      description: 'Create and explore music together',
      tags: ['music', 'collaborative', 'creative']
    },
    {
      id: '2',
      name: 'Art Canvas',
      type: 'fluid_art',
      mood: 'calm',
      created_at: new Date().toISOString(),
      cover_image_url: '',
      background_url: '',
      orbit_links: [],
      galaxy_position: { x: 0, y: 0, layer: 0 },
      glow_intensity: 0.6,
      metadata: {},
      description: 'Collaborative fluid art space',
      tags: ['art', 'creative', 'visual']
    }
  ];

  const handleTabChange = (tab: HubTab) => {
    setActiveTab(tab);
    VisibilityManager.setActiveScreen(`hub-${tab}`);
    
    // Reset selections when switching tabs
    setSelectedChatId(null);
    setSelectedSpace(null);
  };

  const handleSpaceSelect = (space: HopSpace) => {
    setSelectedSpace(space);
    VisibilityManager.setActiveScreen('hub-space-interior');
  };

  const handleCreateGroup = () => {
    setShowCreateGroupModal(true);
  };

  const handleCreateChannel = () => {
    setShowCreateChannelModal(true);
  };

  const handleCreateSpace = () => {
    setShowCreateSpaceModal(true);
  };

  const handleCreateGroupSubmit = async (groupData: any) => {
    // TODO: Implement actual group creation logic
    console.log('Creating group:', groupData);
    // Add to mock data or call API
  };

  const handleCreateChannelSubmit = async (channelData: any) => {
    // TODO: Implement actual channel creation logic
    console.log('Creating channel:', channelData);
    // Add to mock data or call API
  };

  const handleCreateSpaceSubmit = async (spaceData: any) => {
    // TODO: Implement actual space creation logic
    console.log('Creating space:', spaceData);
    // Add to mock data or call API
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
    VisibilityManager.setActiveScreen('hub-chat');
  };

  return (
    <div ref={hubRef} className="h-full w-full flex flex-col bg-[#0a0d1f]">
      {/* HopHub Header */}
      <div className="h-14 bg-[#0a0d1f] border-b border-white/10 flex items-center px-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <span className="text-white font-bold text-lg">HopHub</span>
        </div>
        
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages, groups, channels, spaces..."
              className="
                w-full p-2 pl-8 bg-white/10 border border-white/20 rounded-lg
                text-white placeholder-white/40 text-sm
                focus:outline-none focus:border-white/40 focus:bg-white/15
                transition-all duration-200
              "
            />
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/40">
              🔍
            </div>
          </div>
        </div>

        {/* Notifications */}
        <button className="
          p-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30
          rounded-lg text-white/80 hover:text-white text-sm relative
          transition-all duration-200
        ">
          <span>🔔</span>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">3</span>
          </div>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button className="
            p-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30
            rounded-lg text-white/80 hover:text-white text-sm
            transition-all duration-200
            flex items-center gap-2
          ">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <span className="hidden sm:inline text-sm">{user?.name || 'User'}</span>
            <span className="text-white/40">▼</span>
          </button>
        </div>
      </div>

      {/* HopHub Navigation Tabs */}
      <HubNavTabs 
        activeTab={activeTab} 
        activeSpaceTab={activeSpaceTab}
        onTabChange={handleTabChange} 
        onSpaceTabChange={setActiveSpaceTab}
      />

      {/* Main HopHub Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <HubLeftPanel
          activeTab={activeTab}
          selectedChatId={selectedChatId}
          selectedSpace={selectedSpace}
          onChatSelect={handleChatSelect}
          onSpaceSelect={handleSpaceSelect}
          spaces={mockSpaces}
          user={user}
          onCreateGroup={handleCreateGroup}
          onCreateChannel={handleCreateChannel}
          onCreateSpace={handleCreateSpace}
        />

        {/* Center Panel */}
        <HubCenter
          activeTab={activeTab}
          activeSpaceTab={activeSpaceTab}
          selectedChatId={selectedChatId}
          selectedSpace={selectedSpace}
          user={user}
        />

        {/* Right Panel */}
        <HubRightPanel
          activeTab={activeTab}
          selectedChatId={selectedChatId}
          selectedSpace={selectedSpace}
          user={user}
        />
      </div>

      {/* Modals */}
      <CreateGroupModal
        isOpen={showCreateGroupModal}
        onClose={() => setShowCreateGroupModal(false)}
        onCreateGroup={handleCreateGroupSubmit}
      />
      <CreateChannelModal
        isOpen={showCreateChannelModal}
        onClose={() => setShowCreateChannelModal(false)}
        onCreateChannel={handleCreateChannelSubmit}
      />
      <CreateSpaceModal
        isOpen={showCreateSpaceModal}
        onClose={() => setShowCreateSpaceModal(false)}
        onCreateSpace={handleCreateSpaceSubmit}
      />
    </div>
  );
};
