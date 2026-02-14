import React from 'react';
import { cn } from '../../lib/utils';
import { PresenceIndicator } from './PresenceIndicator';
import { StatusMessage } from './StatusMessage';
import type { UserCardProps, UserProfile } from '../../types/people';

export const UserCard: React.FC<UserCardProps> = ({
  user,
  variant = 'elevated',
  className,
  style,
  onClick
}) => {
  const { firstName, lastName, profilePicture, presenceStatus, statusMessage, userId } = user;
  const fullName = `${firstName} ${lastName}`;

  const variantStyles = {
    default: 'bg-white/5 border border-white/10',
    elevated: 'bg-white/10 border border-white/20 shadow-lg',
    outlined: 'bg-transparent border border-white/20',
    glow: 'bg-white/10 border border-cyan-400/50 shadow-lg shadow-cyan-400/20'
  };

  return (
    <div
      className={cn(
        'p-4 rounded-xl cursor-pointer transition-all hover:scale-105 hover:bg-white/15',
        variantStyles[variant],
        className
      )}
      style={style}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {/* Avatar with presence indicator */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
            {profilePicture ? (
              <img 
                src={profilePicture} 
                alt={fullName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
            )}
          </div>
          <div className="absolute bottom-0 right-0">
            <PresenceIndicator status={presenceStatus} size="small" />
          </div>
        </div>

        {/* User info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium text-sm truncate">
            {fullName}
          </h3>
          {statusMessage && (
            <div className="mt-1">
              <StatusMessage message={statusMessage} />
            </div>
          )}
        </div>

        {/* Connection status */}
        <div className="flex items-center">
          <span className={cn(
            'text-xs px-2 py-1 rounded-full',
            presenceStatus === 'online' ? 'bg-green-500/20 text-green-400' :
            presenceStatus === 'away' ? 'bg-yellow-500/20 text-yellow-400' :
            presenceStatus === 'busy' ? 'bg-red-500/20 text-red-400' :
            'bg-gray-500/20 text-gray-400'
          )}>
            {presenceStatus}
          </span>
        </div>
      </div>
    </div>
  );
};
