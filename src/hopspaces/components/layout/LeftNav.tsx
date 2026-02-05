import React, { useState } from 'react';
import { HopSpace } from '../../utils/types';
import { ProfileOrb } from '../navigation/ProfileOrb';
import { SpacesList } from '../navigation/SpacesList';
import { CreateSpaceButton } from '../navigation/CreateSpaceButton';
import { SearchSpaces } from '../navigation/SearchSpaces';
import { SettingsButton } from '../navigation/SettingsButton';

interface LeftNavProps {
  spaces: HopSpace[];
  selectedSpace: HopSpace | null;
  onSpaceSelect: (space: HopSpace) => void;
  onSpaceCreate: () => void;
  user: any;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const LeftNav: React.FC<LeftNavProps> = ({
  spaces,
  selectedSpace,
  onSpaceSelect,
  onSpaceCreate,
  user,
  isCollapsed,
  onToggleCollapse,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSpaces = spaces.filter(space =>
    space.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`
      bg-[#0a0d1f] border-r border-white/10 flex flex-col
      transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-16' : 'w-64'}
    `}
    >
      {/* Profile Orb */}
      <div className="p-4 border-b border-white/10">
        <ProfileOrb user={user} isCollapsed={isCollapsed} />
      </div>

      {/* Collapse Button */}
      <div className="p-2">
        <button
          onClick={onToggleCollapse}
          className="w-full p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      {!isCollapsed && (
        <>
          {/* Search Spaces */}
          <div className="p-4 border-b border-white/10">
            <SearchSpaces searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          </div>

          {/* Spaces List */}
          <div className="flex-1 overflow-y-auto p-4">
            <SpacesList
              spaces={filteredSpaces}
              selectedSpace={selectedSpace}
              onSpaceSelect={onSpaceSelect}
            />
          </div>

          {/* Create New Space Button */}
          <div className="p-4 border-t border-white/10">
            <CreateSpaceButton onCreateSpace={onSpaceCreate} />
          </div>

          {/* Settings */}
          <div className="p-4 border-t border-white/10">
            <SettingsButton />
          </div>
        </>
      )}
    </div>
  );
};
