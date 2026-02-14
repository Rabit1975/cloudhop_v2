import React from 'react';
import { HopSpace } from '../../hopspaces/utils/types';

type HubTab = 'hophub' | 'music' | 'gamehub' | 'spaces' | 'unified';

interface HubRightPanelProps {
  activeTab: HubTab;
  selectedChatId: string | null;
  selectedSpace: HopSpace | null;
  user: any;
  groups?: any[];
  channels?: any[];
}

export const HubRightPanel: React.FC<HubRightPanelProps> = ({
  activeTab,
  selectedChatId,
  selectedSpace,
  groups = [],
  channels = [],
}) => {
  if (activeTab !== 'hophub') return null;

  const selectedChat = 
    groups.find(g => g.id === selectedChatId) || 
    channels.find(c => c.id === selectedChatId);

  if (!selectedSpace && !selectedChat) return null;

  return (
    <div className="w-72 bg-black/40 backdrop-blur-md border-l border-white/10 flex flex-col h-full">
      {selectedChat ? (
        <>
          <div className="p-4 border-b border-white/10">
            <h3 className="text-white font-bold text-sm">
                {groups.find(g => g.id === selectedChatId) ? 'Group Info' : 'Channel Info'}
            </h3>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold text-white mb-2">{selectedChat.name}</h2>
            {selectedChat.description && (
                <p className="text-white/60 text-sm mb-4">{selectedChat.description}</p>
            )}
            
            {/* Mock data for members if not available in schema yet */}
            <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/60">Members</span>
                    <span className="text-white font-medium">{(selectedChat as any).members || Math.floor(Math.random() * 50) + 5}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-white/60">Online</span>
                    <span className="text-green-400 font-medium">{(selectedChat as any).online || Math.floor(Math.random() * 10) + 1}</span>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-white/80 text-xs font-bold uppercase mb-3">Shared Media</h4>
                <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="aspect-square bg-white/5 rounded-lg border border-white/5"></div>
                    ))}
                </div>
            </div>
          </div>
        </>
      ) : selectedSpace ? (
        <>
          <div className="p-4 border-b border-white/10">
            <h3 className="text-white font-bold text-sm">Space Details</h3>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold text-white mb-2">{selectedSpace.name}</h2>
            <p className="text-white/60 text-sm">{selectedSpace.description}</p>
            <div className="mt-4">
                <h4 className="text-white/80 text-xs font-bold uppercase mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                    {selectedSpace.tags?.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-white/10 rounded text-xs text-white/60">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10">
                 <h4 className="text-white/80 text-xs font-bold uppercase mb-2">Galaxy Position</h4>
                 <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="flex justify-between text-xs text-white/60">
                        <span>X: {selectedSpace.galaxy_position.x.toFixed(2)}</span>
                        <span>Y: {selectedSpace.galaxy_position.y.toFixed(2)}</span>
                    </div>
                 </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
