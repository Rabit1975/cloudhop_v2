import React from 'react';
import { HopSpace } from '../../utils/types';
import { SpaceInfo } from '../panel/SpaceInfo';
import { MembersList } from '../panel/MembersList';
import { SpaceTools } from '../panel/SpaceTools';
import { LeonardoAI } from '../panel/LeonardoAI';

interface RightPanelProps {
  selectedSpace: HopSpace | null;
}

export const RightPanel: React.FC<RightPanelProps> = ({ selectedSpace }) => {
  if (!selectedSpace) {
    return (
      <div className="w-80 bg-[#0a0d1f] border-l border-white/10 flex items-center justify-center">
        <div className="text-white/40 text-center">
          <div className="text-4xl mb-2">✨</div>
          <div className="text-sm">Select a space to view details</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-[#0a0d1f] border-l border-white/10 flex flex-col">
      {/* Space Info */}
      <div className="p-4 border-b border-white/10">
        <SpaceInfo space={selectedSpace} />
      </div>

      {/* Members / Presence */}
      <div className="p-4 border-b border-white/10 flex-1 overflow-y-auto max-h-48">
        <MembersList space={selectedSpace} />
      </div>

      {/* Tools (space-specific) */}
      <div className="p-4 border-b border-white/10 flex-1 overflow-y-auto">
        <SpaceTools space={selectedSpace} />
      </div>

      {/* AI Guide (Leonardo) */}
      <div className="p-4 border-t border-white/10">
        <LeonardoAI space={selectedSpace} />
      </div>
    </div>
  );
};
