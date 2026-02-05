import React from 'react';
import { HopSpace } from '../../hopspaces/utils/types';
import { useVisibility } from '../../hooks/useVisibility';
import { SpaceInterior } from '../../hopspaces/spaces/SpaceInterior';
import Twitch from '../Twitch';
import MusicPlayer from '../MusicPlayer';
import GameHub from '../GameHub';

type HubTab = 'hopspaces' | 'music' | 'gamehub';
type SpaceSubTab = 'groups' | 'channels';

interface HubCenterProps {
  activeTab: HubTab;
  activeSpaceTab?: SpaceSubTab;
  selectedChatId: string | null;
  selectedSpace: HopSpace | null;
  user: any;
}

export const HubCenter: React.FC<HubCenterProps> = ({
  activeTab,
  activeSpaceTab = 'groups',
  selectedChatId,
  selectedSpace,
  user,
}) => {
  const { ref: centerRef, visible: centerVisible } = useVisibility('HubCenter');

  const renderContent = () => {
    if (!centerVisible) {
      return (
        <div className="flex items-center justify-center h-full text-white/40">
          <div className="text-center">
            <div className="text-2xl mb-2">🌙</div>
            <div className="text-sm">Content paused</div>
          </div>
        </div>
      );
    }

    // Handle HopSpaces sub-tabs
    if (activeTab === 'hopspaces') {
      if (activeSpaceTab === 'groups' || activeSpaceTab === 'channels') {
        if (selectedChatId) {
          return (
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-white/10">
                <h3 className="text-white font-medium capitalize">{activeSpaceTab} Chat</h3>
                <p className="text-white/60 text-sm">Message interface will go here</p>
              </div>
              <div className="flex-1 flex items-center justify-center text-white/40">
                <div className="text-center">
                  <div className="text-4xl mb-2">{activeSpaceTab === 'groups' ? '👥' : '📢'}</div>
                  <div className="text-sm">
                    {activeSpaceTab} content for {selectedChatId}
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="flex items-center justify-center h-full text-white/40">
            <div className="text-center">
              <div className="text-4xl mb-2">{activeSpaceTab === 'groups' ? '👥' : '�'}</div>
              <div className="text-sm">
                Select a {activeSpaceTab.slice(0, -1)} to start messaging
              </div>
            </div>
          </div>
        );
      }
      // If a space is selected, show the space interior
      if (selectedSpace) {
        return (
          <div className="h-full w-full">
            <SpaceInterior space={selectedSpace} />
          </div>
        );
      }
      // Show spaces placeholder
      return (
        <div className="flex items-center justify-center h-full text-white/40">
          <div className="text-center">
            <div className="text-4xl mb-2">🌌</div>
            <div className="text-sm">Select a space to begin</div>
          </div>
        </div>
      );
    }

    // Handle Music tab
    if (activeTab === 'music') {
      return (
        <div className="h-full w-full">
          <MusicPlayer />
        </div>
      );
    }

    // Handle GameHub tab
    if (activeTab === 'gamehub') {
      return (
        <div className="h-full w-full">
          <GameHub />
        </div>
      );
    }

    // Default fallback
    return (
      <div className="flex items-center justify-center h-full text-white/40">
        <div className="text-center">
          <div className="text-4xl mb-2">🏠</div>
          <div className="text-sm">HopHub Center</div>
        </div>
      </div>
    );
  };

  return (
    <div ref={centerRef} className="flex-1 bg-[#050819] overflow-hidden">
      {renderContent()}
    </div>
  );
};
