import React from 'react';
import { HopSpace } from '../../utils/types';

interface BottomBarProps {
  selectedSpace: HopSpace;
}

export const BottomBar: React.FC<BottomBarProps> = ({ selectedSpace }) => {
  const getBottomBarActions = (type: string) => {
    switch (type) {
      case 'music':
        return {
          primary: { icon: '▶️', label: 'Play', action: 'play' },
          secondary: [
            { icon: '⏹️', label: 'Stop', action: 'stop' },
            { icon: '⏺️', label: 'Record', action: 'record' },
            { icon: '🎵', label: 'Tempo', action: 'tempo' },
            { icon: '🎹', label: 'Key', action: 'key' },
            { icon: '💾', label: 'Export', action: 'export' },
          ],
        };
      case 'fluid_art':
        return {
          primary: { icon: '🖌️', label: 'Paint', action: 'paint' },
          secondary: [
            { icon: '↩️', label: 'Undo', action: 'undo' },
            { icon: '↪️', label: 'Redo', action: 'redo' },
            { icon: '💾', label: 'Save', action: 'save' },
            { icon: '📤', label: 'Export', action: 'export' },
            { icon: '🎲', label: 'Random', action: 'randomize' },
          ],
        };
      case 'ideas':
        return {
          primary: { icon: '📝', label: 'Add Note', action: 'add-note' },
          secondary: [
            { icon: '🔗', label: 'Connect', action: 'connect' },
            { icon: '🧠', label: 'Brainstorm', action: 'brainstorm' },
            { icon: '🏷️', label: 'Tag', action: 'tag' },
            { icon: '📤', label: 'Export', action: 'export' },
          ],
        };
      case 'world':
        return {
          primary: { icon: '🏔️', label: 'Explore', action: 'explore' },
          secondary: [
            { icon: '✋', label: 'Move', action: 'move' },
            { icon: '🔄', label: 'Rotate', action: 'rotate' },
            { icon: '📏', label: 'Scale', action: 'scale' },
            { icon: '➕', label: 'Add Object', action: 'add-object' },
          ],
        };
      case 'anima':
        return {
          primary: { icon: '🔮', label: 'Invoke', action: 'invoke' },
          secondary: [
            { icon: '🌟', label: 'Transform', action: 'transform' },
            { icon: '💫', label: 'Meditate', action: 'meditate' },
            { icon: '🜂', label: 'Ritual', action: 'ritual' },
            { icon: '💾', label: 'Save State', action: 'save-state' },
          ],
        };
      default:
        return {
          primary: { icon: '✨', label: 'Create', action: 'create' },
          secondary: [],
        };
    }
  };

  const actions = getBottomBarActions(selectedSpace.type);

  return (
    <div className="h-16 bg-[#0a0d1f] border-t border-white/10 flex items-center px-4 gap-4">
      {/* Primary Action */}
      <button
        className="
        px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 
        hover:from-purple-700 hover:to-blue-700
        rounded-lg font-medium text-white text-sm
        transition-all duration-200 transform hover:scale-105
        flex items-center gap-2
      "
      >
        <span>{actions.primary.icon}</span>
        {actions.primary.label}
      </button>

      {/* Secondary Tools */}
      <div className="flex items-center gap-2">
        {actions.secondary.map(tool => (
          <button
            key={tool.action}
            className="
              p-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30
              rounded-lg text-white/80 hover:text-white text-sm
              transition-all duration-200
              flex items-center gap-1
            "
            title={tool.label}
          >
            <span>{tool.icon}</span>
            <span className="hidden sm:inline">{tool.label}</span>
          </button>
        ))}
      </div>

      {/* AI Assist Button */}
      <div className="ml-auto">
        <button
          className="
          p-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 hover:border-purple-500/50
          rounded-lg text-purple-300 hover:text-purple-200 text-sm
          transition-all duration-200
          flex items-center gap-2
        "
        >
          <span>🤖</span>
          <span className="hidden sm:inline">AI Assist</span>
        </button>
      </div>

      {/* Space Settings */}
      <button
        className="
        p-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30
        rounded-lg text-white/80 hover:text-white text-sm
        transition-all duration-200
      "
        title="Space Settings"
      >
        ⚙️
      </button>
    </div>
  );
};
