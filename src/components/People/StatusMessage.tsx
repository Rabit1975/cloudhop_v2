import React from 'react';
import { cn } from '../../lib/utils';
import type { StatusMessageProps } from '../../types/people';

export const StatusMessage: React.FC<StatusMessageProps> = ({
  message,
  maxLength = 50,
  className
}) => {
  const truncatedMessage = message.length > maxLength 
    ? `${message.substring(0, maxLength)}...` 
    : message;

  return (
    <p 
      className={cn(
        'text-xs text-gray-400 italic',
        className
      )}
      title={message}
    >
      {truncatedMessage || 'No status message'}
    </p>
  );
};
