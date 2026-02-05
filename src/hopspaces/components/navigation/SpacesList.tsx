import React from 'react';
import { HopSpace } from '../../utils/types';

interface SpacesListProps {
  spaces: HopSpace[];
  selectedSpace: HopSpace | null;
  onSpaceSelect: (space: HopSpace) => void;
}

export const SpacesList: React.FC<SpacesListProps> = ({ spaces, selectedSpace, onSpaceSelect }) => {
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
    <div className="space-y-2">
      {spaces.map(space => (
        <button
          key={space.id}
          onClick={() => onSpaceSelect(space)}
          className={`
            w-full p-3 rounded-lg text-left transition-all duration-200
            flex items-center gap-3 group
            ${
              selectedSpace?.id === space.id
                ? 'bg-white/20 border border-white/30'
                : 'bg-white/5 border border-transparent hover:bg-white/10 hover:border-white/20'
            }
          `}
        >
          <div className="text-lg">{getSpaceIcon(space.type)}</div>
          <div className="flex-1 min-w-0">
            <div className="text-white font-medium text-sm truncate">{space.name}</div>
            <div className="text-white/60 text-xs truncate">{space.type.replace('_', ' ')}</div>
          </div>
        </button>
      ))}

      {spaces.length === 0 && (
        <div className="text-center py-8 text-white/40 text-sm">
          No spaces yet. Create your first space!
        </div>
      )}
    </div>
  );
};
