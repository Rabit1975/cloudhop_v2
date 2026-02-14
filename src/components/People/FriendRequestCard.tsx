import React from 'react';
import { cn } from '../../lib/utils';
import { UserCard } from './UserCard';
import { Button } from '../ui/button';
import type { FriendRequestCardProps, FriendRequest, UserProfile } from '../../types/people';

interface FriendRequestCardProps {
  request: FriendRequest;
  sender?: UserProfile;
  onAccept?: () => void;
  onDecline?: () => void;
  onBlock?: () => void;
  className?: string;
}

export const FriendRequestCard: React.FC<FriendRequestCardProps> = ({
  request,
  sender,
  onAccept,
  onDecline,
  onBlock,
  className
}) => {
  const statusColors = {
    pending: 'border-yellow-400/50 bg-yellow-400/10',
    accepted: 'border-green-400/50 bg-green-400/10',
    declined: 'border-red-400/50 bg-red-400/10',
    blocked: 'border-gray-400/50 bg-gray-400/10'
  };

  const statusText = {
    pending: 'Pending',
    accepted: 'Accepted',
    declined: 'Declined',
    blocked: 'Blocked'
  };

  return (
    <div className={cn(
      'p-4 rounded-xl border transition-all',
      statusColors[request.status],
      className
    )}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Friend Request</span>
          <span className={cn(
            'text-xs px-2 py-1 rounded-full',
            request.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
            request.status === 'accepted' ? 'bg-green-500/20 text-green-400' :
            request.status === 'declined' ? 'bg-red-500/20 text-red-400' :
            'bg-gray-500/20 text-gray-400'
          )}>
            {statusText[request.status]}
          </span>
        </div>
        <span className="text-xs text-gray-500">
          {new Date(request.createdAt).toLocaleDateString()}
        </span>
      </div>

      {sender && (
        <UserCard 
          user={sender}
          variant="default"
          className="mb-3"
        />
      )}

      {request.status === 'pending' && (
        <div className="flex gap-2">
          <Button
            onClick={onAccept}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white"
            size="sm"
          >
            Accept
          </Button>
          <Button
            onClick={onDecline}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white"
            size="sm"
          >
            Decline
          </Button>
          <Button
            onClick={onBlock}
            className="bg-gray-500 hover:bg-gray-600 text-white"
            size="sm"
          >
            Block
          </Button>
        </div>
      )}
    </div>
  );
};
