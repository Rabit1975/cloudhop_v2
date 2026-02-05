import React from 'react';
import { HopSpace } from '../../utils/types';

interface MembersListProps {
  space: HopSpace;
}

export const MembersList: React.FC<MembersListProps> = ({ space }) => {
  // Mock members data - in real app this would come from the space metadata or API
  const mockMembers = [
    { id: '1', name: 'You', avatar: '👤', isOnline: true, isOwner: true },
    { id: '2', name: 'Alice', avatar: '🎨', isOnline: true, isOwner: false },
    { id: '3', name: 'Bob', avatar: '🎵', isOnline: false, isOwner: false },
  ];

  return (
    <div className="space-y-3">
      <h4 className="text-white font-medium text-sm uppercase tracking-wider">
        Members ({mockMembers.length})
      </h4>

      <div className="space-y-2">
        {mockMembers.map(member => (
          <div
            key={member.id}
            className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="relative">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">
                {member.avatar}
              </div>
              {member.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-[#0a0d1f]"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm truncate">
                {member.name}
                {member.isOwner && <span className="ml-1 text-xs text-yellow-400">👑</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white text-xs transition-colors">
        + Invite Members
      </button>
    </div>
  );
};
