import React from 'react';

interface ProfileOrbProps {
  user: any;
  isCollapsed: boolean;
}

export const ProfileOrb: React.FC<ProfileOrbProps> = ({ user, isCollapsed }) => {
  if (isCollapsed) {
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
        <span className="text-white text-xs font-bold">
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
        <span className="text-white text-sm font-bold">
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </span>
      </div>
      <div className="flex-1">
        <div className="text-white font-medium text-sm">{user?.name || 'User'}</div>
        <div className="text-white/60 text-xs">Level {user?.level || 1}</div>
      </div>
    </div>
  );
};
