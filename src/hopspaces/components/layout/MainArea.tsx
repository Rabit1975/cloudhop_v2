import React from 'react';
import { HopSpace } from '../../utils/types';
import { HomeScreen } from '../HomeScreen';
import { SpaceInterior } from '../../spaces/SpaceInterior';

interface MainAreaProps {
  selectedSpace: HopSpace | null;
}

export const MainArea: React.FC<MainAreaProps> = ({ selectedSpace }) => {
  if (!selectedSpace) {
    return <HomeScreen />;
  }

  return (
    <div className="flex-1 bg-[#050819] overflow-hidden">
      <SpaceInterior space={selectedSpace} />
    </div>
  );
};
