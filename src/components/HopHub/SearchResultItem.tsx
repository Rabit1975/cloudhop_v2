import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SearchResultItemProps {
  id: string;
  title: string;
  description?: string;
  type: 'channel' | 'group' | 'dm' | 'message';
  onClick?: () => void;
  className?: string;
  imageUrl?: string;
  memberCount?: number;
  lastMessage?: string;
  unreadCount?: number;
  isOnline?: boolean;
}

export default function SearchResultItem({
  id,
  title,
  description,
  type,
  onClick,
  className,
  imageUrl,
  memberCount,
  lastMessage,
  unreadCount,
  isOnline
}: SearchResultItemProps) {
  const getTypeIcon = () => {
    switch (type) {
      case 'channel':
        return '📢';
      case 'group':
        return '👥';
      case 'dm':
        return '💬';
      case 'message':
        return '📄';
      default:
        return '💬';
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'channel':
        return 'from-cyan-400 to-blue-500';
      case 'group':
        return 'from-purple-400 to-pink-500';
      case 'dm':
        return 'from-green-400 to-teal-500';
      case 'message':
        return 'from-gray-400 to-gray-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <motion.div
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-3 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition-all",
        className
      )}
    >
      {/* Avatar/Icon */}
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm",
        `bg-gradient-to-br ${getTypeColor()}`
      )}>
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover rounded-full" />
        ) : (
          <span>{title.charAt(0).toUpperCase()}</span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium truncate">{title}</span>
            {type === 'channel' && (
              <span className="text-xs text-cyan-400">#{title.toLowerCase()}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount && unreadCount > 0 && (
              <span className="px-2 py-1 bg-cyan-500 text-white text-xs rounded-full">
                {unreadCount}
              </span>
            )}
            {isOnline && (
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-1">
          <div className="text-gray-300 text-sm truncate">
            {description || lastMessage || 'No description'}
          </div>
          
          {/* Member count for groups/channels */}
          {memberCount && (
            <span className="text-gray-400 text-xs">
              {memberCount} members
            </span>
          )}
        </div>
      </div>

      {/* Type indicator */}
      <div className="text-lg opacity-60">
        {getTypeIcon()}
      </div>
    </motion.div>
  );
}
