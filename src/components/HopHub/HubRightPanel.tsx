import React from 'react';
import { HopSpace } from '../../hopspaces/utils/types';
import { useVisibility } from '../../hooks/useVisibility';

type HubTab = 'hopspaces' | 'music' | 'gamehub';

interface HubRightPanelProps {
  activeTab: HubTab;
  selectedChatId: string | null;
  selectedSpace: HopSpace | null;
  user: any;
}

export const HubRightPanel: React.FC<HubRightPanelProps> = ({
  activeTab,
  selectedChatId,
  selectedSpace,
  user,
}) => {
  const { ref: rightPanelRef, visible: rightPanelVisible } = useVisibility('HubRightPanel');

  const renderContent = () => {
    if (!rightPanelVisible) {
      return (
        <div className="flex items-center justify-center h-full text-white/40">
          <div className="text-center">
            <div className="text-2xl mb-2">🌙</div>
            <div className="text-sm">Panel paused</div>
          </div>
        </div>
      );
    }

    // If in hopspaces mode and a space is selected, show space context
    if (activeTab === 'hopspaces' && selectedSpace) {
      return (
        <div className="p-4 space-y-4">
          {/* Space Info */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-white font-medium mb-3">Space Info</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="text-2xl">
                  {selectedSpace.type === 'music' && '🎵'}
                  {selectedSpace.type === 'fluid_art' && '🎨'}
                  {selectedSpace.type === 'ideas' && '💡'}
                  {selectedSpace.type === 'world' && '🌍'}
                  {selectedSpace.type === 'anima' && '🦋'}
                </div>
                <div>
                  <div className="text-white font-medium">{selectedSpace.name}</div>
                  <div className="text-white/60 text-xs capitalize">
                    {selectedSpace.type.replace('_', ' ')}
                  </div>
                </div>
              </div>
              {selectedSpace.description && (
                <p className="text-white/80 text-sm">{selectedSpace.description}</p>
              )}
              {selectedSpace.mood && (
                <div className="flex items-center gap-2">
                  <span className="text-white/60 text-xs">Mood:</span>
                  <span className="px-2 py-1 bg-white/10 rounded text-white/80 text-xs">
                    {selectedSpace.mood}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Members */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-white font-medium mb-3">Members</h3>
            <div className="space-y-2">
              {[
                { id: '1', name: 'You', avatar: '👤', isOnline: true, isOwner: true },
                { id: '2', name: 'Alice', avatar: '🎨', isOnline: true, isOwner: false },
                { id: '3', name: 'Bob', avatar: '🎵', isOnline: false, isOwner: false },
              ].map(member => (
                <div key={member.id} className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                  <div className="relative">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">
                      {member.avatar}
                    </div>
                    {member.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-[#0a0d1f]"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-white text-sm">
                      {member.name}
                      {member.isOwner && <span className="ml-1 text-xs text-yellow-400">👑</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-white font-medium mb-3">Tools</h3>
            <div className="grid grid-cols-3 gap-2">
              {selectedSpace.type === 'music' &&
                [
                  { icon: '🎹', name: 'Piano' },
                  { icon: '🎸', name: 'Guitar' },
                  { icon: '🥁', name: 'Drums' },
                  { icon: '🎚️', name: 'Mixer' },
                  { icon: '🎼', name: 'Sheet' },
                  { icon: '💾', name: 'Export' },
                ].map(tool => (
                  <button
                    key={tool.name}
                    className="aspect-square bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg flex items-center justify-center text-sm transition-colors"
                    title={tool.name}
                  >
                    {tool.icon}
                  </button>
                ))}

              {selectedSpace.type === 'fluid_art' &&
                [
                  { icon: '🖌️', name: 'Brush' },
                  { icon: '🎨', name: 'Colors' },
                  { icon: '📚', name: 'Layers' },
                  { icon: '✨', name: 'Effects' },
                  { icon: '🔄', name: 'Transform' },
                  { icon: '💾', name: 'Save' },
                ].map(tool => (
                  <button
                    key={tool.name}
                    className="aspect-square bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg flex items-center justify-center text-sm transition-colors"
                    title={tool.name}
                  >
                    {tool.icon}
                  </button>
                ))}
            </div>
          </div>

          {/* AI Guide */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <span>🎭</span>
              Leonardo AI
            </h3>
            <div className="space-y-3">
              <div className="text-white/80 text-xs">
                {selectedSpace.type === 'music' &&
                  "I'm your AI music composer. I can help you create melodies, harmonies, and rhythms."}
                {selectedSpace.type === 'fluid_art' &&
                  "I'm your AI art assistant. I can suggest color palettes, brush techniques, and creative ideas."}
                {selectedSpace.type === 'ideas' &&
                  "I'm your AI brainstorming partner. I can help organize thoughts and generate new concepts."}
                {selectedSpace.type === 'world' &&
                  "I'm your AI world builder. I can help design environments, scenes, and 3D spaces."}
                {selectedSpace.type === 'anima' &&
                  "I'm your AI spiritual guide. I can help with symbolic interpretations and ritual design."}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask Leonardo anything..."
                  className="flex-1 p-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/40 text-xs"
                />
                <button className="px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white text-xs transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Handle Music tab
    if (activeTab === 'music') {
      return (
        <div className="flex items-center justify-center h-full text-white/40">
          <div className="text-center">
            <div className="text-4xl mb-2">🎵</div>
            <div className="text-sm">Music player loaded</div>
          </div>
        </div>
      );
    }

    // Handle GameHub tab
    if (activeTab === 'gamehub') {
      return (
        <div className="flex items-center justify-center h-full text-white/40">
          <div className="text-center">
            <div className="text-4xl mb-2">🎮</div>
            <div className="text-sm">GameHub loaded</div>
          </div>
        </div>
      );
    }

    // Otherwise show chat/group/channel context
    if (selectedChatId) {
      return (
        <div className="p-4 space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-white font-medium mb-3">Chat Info</h3>
            <div className="space-y-2">
              <div className="text-white/80 text-sm">Chat details and members will appear here</div>
            </div>
          </div>
        </div>
      );
    }

    // Default fallback
    return (
      <div className="flex items-center justify-center h-full text-white/40">
        <div className="text-center">
          <div className="text-4xl mb-2">ℹ️</div>
          <div className="text-sm">Select something to see details</div>
        </div>
      </div>
    );
  };

  return (
    <div ref={rightPanelRef} className="w-80 bg-[#0a0d1f] border-l border-white/10 flex flex-col">
      {renderContent()}
    </div>
  );
};
