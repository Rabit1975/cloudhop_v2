import React, { useState } from 'react';
import { HopSpace } from '../utils/types';
import { LeftNav } from './layout/LeftNav';
import { MainArea } from './layout/MainArea';
import { RightPanel } from './layout/RightPanel';
import { BottomBar } from './layout/BottomBar';
import { TopHeader } from './layout/TopHeader';
import { HomeScreen } from './HomeScreen';

interface HopSpacesProps {
  spaces: HopSpace[];
  selectedSpace: HopSpace | null;
  onSpaceSelect: (space: HopSpace) => void;
  onSpaceCreate: () => void;
  user: any;
}

export const HopSpaces: React.FC<HopSpacesProps> = ({
  spaces,
  selectedSpace,
  onSpaceSelect,
  onSpaceCreate,
  user,
}) => {
  const [isLeftNavCollapsed, setIsLeftNavCollapsed] = useState(false);

  return (
    <div className="h-screen w-full bg-[#050819] text-white overflow-hidden flex flex-col">
      {/* Top Header - Global HopSpaces Header */}
      <TopHeader user={user} />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - Navigation Column */}
        <LeftNav
          spaces={spaces}
          selectedSpace={selectedSpace}
          onSpaceSelect={onSpaceSelect}
          onSpaceCreate={onSpaceCreate}
          user={user}
          isCollapsed={isLeftNavCollapsed}
          onToggleCollapse={() => setIsLeftNavCollapsed(!isLeftNavCollapsed)}
        />

        {/* Center - The Main Room / Space Interior */}
        <MainArea selectedSpace={selectedSpace} />

        {/* Right Side - Contextual Panel */}
        <RightPanel selectedSpace={selectedSpace} />
      </div>

      {/* Bottom - Action Bar */}
      {selectedSpace && <BottomBar selectedSpace={selectedSpace} />}
    </div>
  );
};
