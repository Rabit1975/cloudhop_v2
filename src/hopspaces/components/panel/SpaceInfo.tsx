import React from 'react';
import { HopSpace } from '../../utils/types';

interface SpaceInfoProps {
  space: HopSpace;
}

export const SpaceInfo: React.FC<SpaceInfoProps> = ({ space }) => {
  const getSpaceIcon = (type: string) => {
    switch (type) {
      case 'music':
        return '🎵';
      case 'fluid_art':
        return '🎨';
      case 'ideas':
        return '💡';
      case 'world':
        return '🌍';
      case 'anima':
        return '🜂';
      default:
        return '✨';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="text-2xl">{getSpaceIcon(space.type)}</div>
        <div className="flex-1">
          <h3 className="text-white font-semibold">{space.name}</h3>
          <div className="text-white/60 text-xs uppercase tracking-wider">
            {space.type.replace('_', ' ')}
          </div>
        </div>
      </div>

      {space.description && (
        <p className="text-white/80 text-sm leading-relaxed">{space.description}</p>
      )}

      {space.mood && (
        <div className="flex items-center gap-2">
          <span className="text-white/60 text-xs">Mood:</span>
          <span className="px-2 py-1 bg-white/10 rounded text-white/80 text-xs">{space.mood}</span>
        </div>
      )}

      {space.tags && space.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {space.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-purple-300 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
