import React from 'react';
import { HopSpace } from '../../hopspaces/utils/types';
import { HubChatArea } from '../../components/HopHub/HubChatArea';
import { CloudHopMusicPlayer } from '../../components/CloudHopMusicPlayer';
import GalaxyHomeScreen from '../spaces/GalaxyHomeScreen';

type HubTab = 'hophub' | 'music' | 'gamehub' | 'spaces' | 'unified';
type SpaceSubTab = 'groups' | 'channels';

interface HubCenterProps {
  activeTab: HubTab;
  activeSpaceTab: SpaceSubTab;
  selectedChatId: string | null;
  selectedSpace: HopSpace | null;
  user: any;
  groups?: any[];
  channels?: any[];
  spaces?: HopSpace[];
}

export const HubCenter: React.FC<HubCenterProps> = ({
  activeTab,
  selectedChatId,
  selectedSpace,
  groups = [],
  channels = [],
  spaces = [],
}) => {
  
  // Resolve selected chat details
  const selectedChat = 
    groups.find(g => g.id === selectedChatId) || 
    channels.find(c => c.id === selectedChatId);

  const chatName = selectedChat?.name || (selectedSpace ? selectedSpace.name : 'Select a Chat');
  const chatType = groups.find(g => g.id === selectedChatId) ? 'group' : 'channel';

  return (
    <div className="flex-1 bg-black/20 backdrop-blur-sm relative overflow-hidden flex flex-col">
      {activeTab === 'music' ? (
        <div className="flex-1 flex flex-col overflow-hidden">
           <CloudHopMusicPlayer />
        </div>
      ) : activeTab === 'gamehub' ? (
        <div className="flex-1 flex items-center justify-center text-white">
          <div className="text-center p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="text-6xl mb-4">🎮</div>
            <h2 className="text-2xl font-bold mb-2">Game Hub</h2>
            <p className="text-white/60 mb-6">Multiplayer games coming soon.</p>
            <div className="flex gap-4 justify-center">
                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center text-2xl border border-white/5">♟️</div>
                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center text-2xl border border-white/5">🎲</div>
                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center text-2xl border border-white/5">🃏</div>
            </div>
          </div>
        </div>
      ) : activeTab === 'hophub' ? (
        selectedChatId && selectedChat ? (
          <HubChatArea 
            chatId={selectedChatId} 
            chatName={chatName} 
            type={chatType} 
          />
        ) : selectedSpace ? (
           // If a space is selected but no specific chat (or space acts as chat)
           // For now, treat space selection as entering the space.
           <div className="flex-1 flex items-center justify-center text-white">
             <div className="text-center">
               <h2 className="text-2xl font-bold mb-2">{selectedSpace.name}</h2>
               <p className="text-white/60 mb-4">{selectedSpace.description}</p>
               <button className="px-6 py-2 bg-purple-600 rounded-lg font-bold hover:bg-purple-700 transition-colors">
                 Enter Space
               </button>
             </div>
           </div>
        ) : (
          // Default: Show Galaxy Home Screen (Spaces Map)
          <div className="w-full h-full">
            <GalaxyHomeScreen 
              spaces={spaces} 
              onCreateSpace={() => {}} // Handle create space
              onEnterSpace={() => {}} // Handle enter space
              galaxyMood="calm"
            />
          </div>
        )
      ) : null}
    </div>
  );
};
