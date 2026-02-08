import React, { useState, useRef, useEffect } from 'react';
import { HopSpace } from '../../hopspaces/utils/types';
import { useVisibility } from '../../hooks/useVisibility';
import { VisibilityManager } from '../../utils/visibilityManager';
import { HubNavTabs } from './HubNavTabs';
import { HubLeftPanel } from './HubLeftPanel';
import { HubCenter } from './HubCenter';
import { HubRightPanel } from './HubRightPanel';
import { CreateGroupModal } from './CreateGroupModal';
import { CreateChannelModal } from './CreateChannelModal';
import { CreateSpaceModal } from './CreateSpaceModal';
import MusicPlayer from '../MusicPlayer';

interface HopHubProps {
  user: any;
  onNavigate: (view: any) => void;
}

type HubTab = 'chat' | 'spaces' | 'music' | 'gamehub';
type SpaceSubTab = 'groups' | 'channels';

export const HopHub: React.FC<HopHubProps> = ({ user, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<HubTab>('chat');
  const [activeSpaceTab, setActiveSpaceTab] = useState<SpaceSubTab>('groups');
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
      name: 'Fluid Art',
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
      tags: ['art', 'creative', 'visual'],
    },
    {
      id: '2',
      name: 'Ideas Space',
      type: 'ideas',
      mood: 'dreamy',
      created_at: new Date().toISOString(),
      cover_image_url: '',
      background_url: '',
      orbit_links: [],
      galaxy_position: { x: 0, y: 0, layer: 0 },
      glow_intensity: 0.8,
      metadata: {},
      description: 'General creative space',
      tags: ['creative', 'collaborative'],
    },
  ];

  const handleTabChange = (tab: HubTab) => {
    setActiveTab(tab);
    VisibilityManager.setActiveScreen(`hub-${tab}`);

    setSelectedChatId(null);
    setSelectedSpace(null);

    // Music and GameHub tabs are now handled internally, no external links
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

    // For now, add to mock data and show success
    try {
      // In a real implementation, this would call your API
      // const response = await fetch('/api/groups', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(groupData)
      // });

      // Mock success for now
      alert(`Group "${groupData.name}" created successfully!`);
      setShowCreateGroupModal(false);
    } catch (error) {
      console.error('Error creating group:', error);
      alert('Failed to create group. Please try again.');
    }
  };

  const handleCreateChannelSubmit = async (channelData: any) => {
    // TODO: Implement actual channel creation logic
    console.log('Creating channel:', channelData);

    try {
      // In a real implementation, this would call your API
      // const response = await fetch('/api/channels', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(channelData)
      // });

      // Mock success for now
      alert(`Channel "${channelData.name}" created successfully!`);
      setShowCreateChannelModal(false);
    } catch (error) {
      console.error('Error creating channel:', error);
      alert('Failed to create channel. Please try again.');
    }
  };

  const handleCreateSpaceSubmit = async (spaceData: any) => {
    // TODO: Implement actual space creation logic
    console.log('Creating space:', spaceData);

    try {
      // In a real implementation, this would call your API
      // const response = await fetch('/api/spaces', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(spaceData)
      // });

      // Mock success for now
      alert(`Space "${spaceData.name}" created successfully!`);
      setShowCreateSpaceModal(false);
    } catch (error) {
      console.error('Error creating space:', error);
      alert('Failed to create space. Please try again.');
    }
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
    VisibilityManager.setActiveScreen('hub-chat');
  };

  return (
    <div ref={hubRef} className="h-full w-full flex flex-col relative overflow-hidden">
      {/* Background with Nebula & Twinkle Effect */}
      <div className="absolute inset-0 z-0">
        <img src="/nebula.png" alt="Nebula" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0a0d1f]/40" /> {/* Overlay for text readability */}
        
        {/* Removed generic grid twinkle to respect alignment request */}
      </div>

      {/* HopHub Header */}
      <div className="h-14 border-b border-white/10 flex items-center px-4 gap-4 relative z-10 bg-black/20 backdrop-blur-md">
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
        <button
          className="
          p-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30
          rounded-lg text-white/80 hover:text-white text-sm relative
          transition-all duration-200
        "
        >
          <span>🔔</span>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">3</span>
          </div>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            className="
            p-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30
            rounded-lg text-white/80 hover:text-white text-sm
            transition-all duration-200
            flex items-center gap-2
          "
          >
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
      <div className="relative z-10">
        <HubNavTabs
          activeTab={activeTab}
          activeSpaceTab={activeSpaceTab}
          onTabChange={handleTabChange}
          onSpaceTabChange={setActiveSpaceTab}
        />
      </div>

      {/* Main HopHub Content */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Left Panel */}
        <HubLeftPanel
          activeTab={activeTab}
          activeSpaceTab={activeSpaceTab}
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
