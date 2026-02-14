import React from 'react';
import { cn } from '../../lib/utils';
import type { PresenceIndicatorProps } from '../../types/people';

const statusColors = {
  online: 'bg-green-500',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
  offline: 'bg-gray-500',
  invisible: 'bg-gray-400'
};

const statusSizes = {
  small: 'w-2 h-2',
  medium: 'w-3 h-3',
  large: 'w-4 h-4'
};

export const PresenceIndicator: React.FC<PresenceIndicatorProps> = ({
  status,
  size = 'medium',
  className,
  style
}) => {
  return (
    <span
      className={cn(
        'rounded-full border-2 border-black/20',
        statusColors[status],
        statusSizes[size],
        className
      )}
      style={style}
      title={`User is ${status}`}
      aria-label={`Status: ${status}`}
      role="status"
    />
  );
};
