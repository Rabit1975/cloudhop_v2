import React from 'react';
import { HopSpace } from '../../hopspaces/utils/types';
import { useVisibility } from '../../hooks/useVisibility';
import { SpaceInterior } from '../../hopspaces/spaces/SpaceInterior';
import YouTubeMusic from '../YouTubeMusic';
import Twitch from '../Twitch';

type HubTab = 'messages' | 'groups' | 'channels' | 'spaces';
type SpaceSubTab = 'creative' | 'music' | 'twitch';

interface HubCenterProps {
  activeTab: HubTab;
  activeSpaceTab?: SpaceSubTab;
  selectedChatId: string | null;
  selectedSpace: HopSpace | null;
  user: any;
}

export const HubCenter: React.FC<HubCenterProps> = ({
  activeTab,
  activeSpaceTab = 'creative',
  selectedChatId,
  selectedSpace,
  user
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

    // Handle Spaces sub-tabs
    if (activeTab === 'spaces') {
      switch (activeSpaceTab) {
        case 'music':
          return (
            <div className="h-full w-full">
              <YouTubeMusic />
            </div>
          );
        case 'twitch':
          return (
            <div className="h-full w-full">
              <Twitch />
            </div>
          );
        case 'creative':
        default:
          // If a space is selected, show the space interior
          if (selectedSpace) {
            return (
              <div className="h-full w-full">
                <SpaceInterior space={selectedSpace} />
              </div>
            );
          }
          // Show creative spaces placeholder
          return (
            <div className="flex items-center justify-center h-full text-white/40">
              <div className="text-center">
                <div className="text-4xl mb-2">🎨</div>
                <div className="text-sm">Select a creative space to begin</div>
              </div>
            </div>
          );
      }
    }

    // Otherwise show the appropriate chat/workspace content
    switch (activeTab) {
      case 'messages':
        if (selectedChatId) {
          return (
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-white/10">
                <h3 className="text-white font-medium">Chat Window</h3>
                <p className="text-white/60 text-sm">Message interface will go here</p>
              </div>
              <div className="flex-1 flex items-center justify-center text-white/40">
                <div className="text-center">
                  <div className="text-4xl mb-2">💬</div>
                  <div className="text-sm">Chat content for {selectedChatId}</div>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="flex items-center justify-center h-full text-white/40">
            <div className="text-center">
              <div className="text-4xl mb-2">💬</div>
              <div className="text-sm">Select a conversation to start messaging</div>
            </div>
          </div>
        );

      case 'groups':
        return (
          <div className="flex items-center justify-center h-full text-white/40">
            <div className="text-center">
              <div className="text-4xl mb-2">👥</div>
              <div className="text-sm">Group workspace</div>
            </div>
          </div>
        );

      case 'channels':
        return (
          <div className="flex items-center justify-center h-full text-white/40">
            <div className="text-center">
              <div className="text-4xl mb-2">📢</div>
              <div className="text-sm">Channel workspace</div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full text-white/40">
            <div className="text-center">
              <div className="text-4xl mb-2">🏠</div>
              <div className="text-sm">HopHub Center</div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      ref={centerRef}
      className="flex-1 bg-[#050819] overflow-hidden"
    >
      {renderContent()}
    </div>
  );
};
