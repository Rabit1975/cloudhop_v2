import React from 'react';
import { HopSpace } from '../../utils/types';

interface SpaceToolsProps {
  space: HopSpace;
}

export const SpaceTools: React.FC<SpaceToolsProps> = ({ space }) => {
  const getToolsForSpaceType = (type: string) => {
    switch (type) {
      case 'music':
        return [
          { icon: '🎹', name: 'Piano', action: 'piano' },
          { icon: '🎸', name: 'Guitar', action: 'guitar' },
          { icon: '🥁', name: 'Drums', action: 'drums' },
          { icon: '🎚️', name: 'Mixer', action: 'mixer' },
          { icon: '🎼', name: 'Sheet Music', action: 'sheet' },
        ];
      case 'fluid_art':
        return [
          { icon: '🖌️', name: 'Brush', action: 'brush' },
          { icon: '🎨', name: 'Colors', action: 'colors' },
          { icon: '📚', name: 'Layers', action: 'layers' },
          { icon: '✨', name: 'Effects', action: 'effects' },
          { icon: '🔄', name: 'Transform', action: 'transform' },
        ];
      case 'ideas':
        return [
          { icon: '📝', name: 'Note', action: 'note' },
          { icon: '🔗', name: 'Connect', action: 'connect' },
          { icon: '🧠', name: 'Mind Map', action: 'mindmap' },
          { icon: '📋', name: 'Templates', action: 'templates' },
          { icon: '🏷️', name: 'Tags', action: 'tags' },
        ];
      case 'world':
        return [
          { icon: '🏔️', name: 'Terrain', action: 'terrain' },
          { icon: '🌳', name: 'Vegetation', action: 'vegetation' },
          { icon: '💡', name: 'Lighting', action: 'lighting' },
          { icon: '🎬', name: 'Camera', action: 'camera' },
          { icon: '🎭', name: 'Objects', action: 'objects' },
        ];
      case 'anima':
        return [
          { icon: '🔮', name: 'Oracle', action: 'oracle' },
          { icon: '🌙', name: 'Moon Phase', action: 'moon' },
          { icon: '🕯️', name: 'Ritual', action: 'ritual' },
          { icon: '🜂', name: 'Elements', action: 'elements' },
          { icon: '💫', name: 'Symbols', action: 'symbols' },
        ];
      default:
        return [];
    }
  };

  const tools = getToolsForSpaceType(space.type);

  return (
    <div className="space-y-3">
      <h4 className="text-white font-medium text-sm uppercase tracking-wider">
        Tools
      </h4>
      
      <div className="grid grid-cols-3 gap-2">
        {tools.map((tool) => (
          <button
            key={tool.action}
            className="
              p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20
              rounded-lg transition-all duration-200 group
              flex flex-col items-center gap-1
            "
            title={tool.name}
          >
            <div className="text-lg group-hover:scale-110 transition-transform">
              {tool.icon}
            </div>
            <div className="text-xs text-white/60 group-hover:text-white">
              {tool.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
