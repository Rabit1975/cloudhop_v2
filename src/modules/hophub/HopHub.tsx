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
import GalaxyBackground from '../../hopspaces/components/GalaxyBackground';
import { useHubData } from './useHubData';
import { View } from '../../types';

interface HopHubProps {
  user: any;
  onNavigate: (view: View) => void;
  onLogout?: () => void;
}

type HubTab = 'hopspaces' | 'music' | 'gamehub';
type SpaceSubTab = 'groups' | 'channels';

export const HopHub: React.FC<HopHubProps> = ({ user, onNavigate, onLogout }) => {
  const { groups, channels, createGroup, createChannel } = useHubData();
  const [activeTab, setActiveTab] = useState<HubTab>('hopspaces');
  const [activeSpaceTab, setActiveSpaceTab] = useState<SpaceSubTab>('groups');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [selectedSpace, setSelectedSpace] = useState<HopSpace | null>(null);

  // Modal states
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showCreateSpaceModal, setShowCreateSpaceModal] = useState(false);
  
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Use visibility manager for performance
  // const { ref: hubRef, visible: hubVisible } = useVisibility('HopHub');

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
    try {
      const result = await createGroup(groupData.name, groupData.description);
      if (result) {
        setShowCreateGroupModal(false);
      } else {
        // Fallback for demo/offline mode if Supabase fails
        console.warn('Supabase create failed, check configuration');
        setShowCreateGroupModal(false);
      }
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const handleCreateChannelSubmit = async (channelData: any) => {
    try {
      // Default to first group if not specified, or handle appropriately
      const defaultGroupId = groups.length > 0 ? groups[0].id : null;
      
      if (!defaultGroupId) {
        alert('Please create a group first before creating a channel.');
        return;
      }

      const result = await createChannel(
        defaultGroupId, 
        channelData.name, 
        'chat', // Default type
        channelData.description
      );
      
      if (result) {
        setShowCreateChannelModal(false);
      } else {
         console.warn('Supabase create failed, check configuration');
         setShowCreateChannelModal(false);
      }
    } catch (error) {
      console.error('Error creating channel:', error);
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
    <GalaxyBackground mood={selectedSpace?.mood || 'calm'}>
      <div className="h-full w-full flex flex-col bg-transparent relative z-50">
        {/* HopHub Header */}
        <div className="h-14 bg-black/20 backdrop-blur-sm border-b border-white/10 flex items-center px-4 gap-4">
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
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
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

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-black/90 border border-white/20 rounded-lg shadow-xl overflow-hidden z-[100] backdrop-blur-xl">
                <div className="p-2 border-b border-white/10">
                  <p className="text-xs text-white/50 px-2 py-1">Signed in as</p>
                  <p className="text-sm text-white font-medium px-2 truncate">{user?.name || 'User'}</p>
                </div>
                <div className="p-1">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onNavigate(View.PROFILE);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                  >
                    👤 Profile
                  </button>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onNavigate(View.SETTINGS);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                  >
                    ⚙️ Settings
                  </button>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onNavigate(View.MEETINGS);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                  >
                    📹 Meetings
                  </button>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onNavigate(View.TWITCH);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                  >
                    🟣 Twitch
                  </button>
                </div>
                <div className="p-1 border-t border-white/10">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      if (onLogout) {
                        onLogout();
                      } else {
                        onNavigate(View.SPECTRUM);
                      }
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/10 rounded-md transition-colors"
                  >
                    🚪 Sign Out
                  </button>
                </div>
              </div>
            )}
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
            activeSpaceTab={activeSpaceTab}
            selectedChatId={selectedChatId}
            selectedSpace={selectedSpace}
            onChatSelect={handleChatSelect}
            onSpaceSelect={handleSpaceSelect}
            spaces={mockSpaces}
            groups={groups}
            channels={channels}
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
            groups={groups}
            channels={channels}
            user={user}
          />

          {/* Right Panel */}
          <HubRightPanel
            activeTab={activeTab}
            selectedChatId={selectedChatId}
            selectedSpace={selectedSpace}
            user={user}
            groups={groups}
            channels={channels}
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
    </GalaxyBackground>
  );
};
