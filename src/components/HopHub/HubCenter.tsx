import React from 'react';
import { HopSpace } from '../../hopspaces/utils/types';
import { useVisibility } from '../../hooks/useVisibility';
import { SpaceInterior } from '../../hopspaces/spaces/SpaceInterior';
import OAuthYouTubeMusic from '../OAuthYouTubeMusic';
import GameHub from '../GameHub';
import { SpectrumRuntime } from '../../core/spectrum/SpectrumRuntime';
import { SpectrumCanvas } from '../../components/spectrum/SpectrumCanvas';
import { HubChatArea } from './HubChatArea';

type HubTab = 'chat' | 'spaces' | 'music' | 'gamehub';
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
        <div className="flex items-center justify-center h-full text-white/40 bg-[#0E1430]/60 backdrop-blur-md">
          <div className="text-center">
            <div className="text-2xl mb-2">🌙</div>
            <div className="text-sm italic">Content paused</div>
          </div>
        </div>
      );
    }

    // Handle Chat tab (Groups & Channels)
    if (activeTab === 'chat') {
      if (selectedChatId) {
        // Find name from mock data (conceptually, in reality would come from store)
        const chatName = activeSpaceTab === 'groups' 
            ? ['Gaming Crew', 'Music Lovers', 'CloudHop Team'][parseInt(selectedChatId) - 1] || 'Group Chat'
            : ['#general', '#announcements', '#random', '#dev-talk'][parseInt(selectedChatId) - 1] || '#channel';

        return (
            <div className="h-full w-full">
                <HubChatArea 
                    chatId={selectedChatId}
                    chatName={chatName}
                    type={activeSpaceTab === 'groups' ? 'group' : 'channel'}
                />
            </div>
        );
      }
      return (
        <div className="flex items-center justify-center h-full text-white/40">
          <div className="text-center p-8 border border-white/5 rounded-3xl bg-[#080C22]/40 backdrop-blur-md shadow-xl">
            <div className="text-5xl mb-4 opacity-50">{activeSpaceTab === 'groups' ? '👥' : '📢'}</div>
            <h3 className="text-xl font-bold text-white mb-2 italic">Select a {activeSpaceTab.slice(0, -1)}</h3>
            <div className="text-sm text-white/50 max-w-xs mx-auto">
              Choose a conversation from the left panel to start messaging.
            </div>
          </div>
        </div>
      );
    }

    // Handle Spaces tab (HopSpaces)
    if (activeTab === 'spaces') {
      if (selectedSpace) {
        return (
          <div className="h-full w-full bg-[#0E1430]/60 backdrop-blur-md">
            <SpaceInterior space={selectedSpace} />
          </div>
        );
      }
      return (
        <div className="flex items-center justify-center h-full text-white/40">
          <div className="text-center p-8 border border-white/5 rounded-3xl bg-[#080C22]/40 backdrop-blur-md shadow-xl">
            <div className="text-5xl mb-4 opacity-50">🌌</div>
            <h3 className="text-xl font-bold text-white mb-2 italic">Enter a Space</h3>
            <div className="text-sm text-white/50 max-w-xs mx-auto">
              Select a HopSpace from the left panel to immerse yourself.
            </div>
          </div>
        </div>
      );
    }

    // Handle Music tab
    if (activeTab === 'music') {
      return (
        <SpectrumRuntime>
          <div className="h-full w-full relative bg-transparent">
            <div className="absolute inset-0 z-0">
               <SpectrumCanvas showNebula={false} showParticles={true} showOrbits={true} />
            </div>
            <div className="relative z-10 h-full w-full bg-[#050819]/60 backdrop-blur-md">
              <OAuthYouTubeMusic />
            </div>
          </div>
        </SpectrumRuntime>
      );
    }

    // Handle GameHub tab
    if (activeTab === 'gamehub') {
      return (
        <div className="h-full w-full bg-[#0E1430]/60 backdrop-blur-md">
          <GameHub />
        </div>
      );
    }

    // Default fallback
    return (
      <div className="flex items-center justify-center h-full text-white/40 bg-[#0E1430]/60 backdrop-blur-md">
        <div className="text-center">
          <div className="text-4xl mb-2">🏠</div>
          <div className="text-sm">HopHub Center</div>
        </div>
      </div>
    );
  };

  return (
    <div ref={centerRef} className="flex-1 bg-transparent overflow-hidden relative shadow-2xl z-10">
      {renderContent()}
    </div>
  );
};
