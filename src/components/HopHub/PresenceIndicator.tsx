import React from 'react';
import { cn } from '../../lib/utils';

type PresenceStatus = 'online' | 'away' | 'busy' | 'offline';

interface PresenceIndicatorProps {
  status: PresenceStatus;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  showPulse?: boolean;
}

export default function PresenceIndicator({ 
  status, 
  size = 'medium', 
  className,
  showPulse = false 
}: PresenceIndicatorProps) {
  const sizeClasses = {
    small: 'w-2 h-2',
    medium: 'w-3 h-3',
    large: 'w-4 h-4'
  };

  const statusColors = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
    offline: 'bg-gray-500'
  };

  return (
    <div 
      className={cn(
        'rounded-full border-2 border-black/30',
        sizeClasses[size],
        statusColors[status],
        showPulse && status === 'online' && 'animate-pulse',
        className
      )}
    />
  );
}
