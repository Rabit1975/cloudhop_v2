import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Message, MessageReaction, MessageStatus, MessageType } from '../../types/hophub';

interface AdvancedMessageBubbleProps {
  message: Message;
  isSelf: boolean;
  senderName: string;
  senderAvatar?: string;
  showAvatar?: boolean;
  showSenderName?: boolean;
  showTimestamp?: boolean;
  showStatus?: boolean;
  onReply?: (messageId: string) => void;
  onReact?: (messageId: string, emoji: string) => void;
  onForward?: (messageId: string) => void;
  onEdit?: (messageId: string) => void;
  onDelete?: (messageId: string) => void;
  onPin?: (messageId: string) => void;
  onStar?: (messageId: string) => void;
  className?: string;
}

const commonReactions = ['👍', '❤️', '😂', '😮', '😢', '🔥', '👎', '🎉'];

export default function AdvancedMessageBubble({
  message,
  isSelf,
  senderName,
  senderAvatar,
  showAvatar = true,
  showSenderName = true,
  showTimestamp = true,
  showStatus = true,
  onReply,
  onReact,
  onForward,
  onEdit,
  onDelete,
  onPin,
  onStar,
  className,
}: AdvancedMessageBubbleProps) {
  const [showActions, setShowActions] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const hasMedia = message.mediaAttachments && message.mediaAttachments.length > 0;
  const hasReactions = message.reactions && message.reactions.length > 0;
  const isEdited = message.editHistory && message.editHistory.editCount > 0;
  const isForwarded = message.forwardedFrom;
  const isReply = message.replyTo;
  const isScheduled = message.scheduleInfo && message.scheduleInfo.isScheduled;
  const isSelfDestructing = message.selfDestructInfo && message.selfDestructInfo.isSelfDestructing;

  const getStatusIcon = () => {
    switch (message.status) {
      case 'SENDING':
        return <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />;
      case 'SENT':
        return <div className="w-2 h-2 bg-blue-400 rounded-full" />;
      case 'DELIVERED':
        return <div className="w-2 h-2 bg-blue-500 rounded-full" />;
      case 'READ':
        return <div className="w-2 h-2 bg-green-500 rounded-full" />;
      case 'FAILED':
        return <div className="w-2 h-2 bg-red-500 rounded-full" />;
      default:
        return null;
    }
  };

  const getPriorityBadge = () => {
    switch (message.priority) {
      case 'URGENT':
        return <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">Urgent</span>;
      case 'SILENT':
        return <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">Silent</span>;
      default:
        return null;
    }
  };

  const renderMediaAttachment = (attachment: any) => {
    const { type, url, thumbnailUrl, filename, size, duration } = attachment;

    switch (type) {
      case 'image':
        return (
          <div className="rounded-lg overflow-hidden bg-black/20">
            <img
              src={url}
              alt={filename || 'Image'}
              className="max-w-full h-auto rounded-lg"
              loading="lazy"
            />
          </div>
        );

      case 'video':
        return (
          <div className="rounded-lg overflow-hidden bg-black/20">
            <video
              src={url}
              className="max-w-full h-auto rounded-lg"
              controls
              poster={thumbnailUrl}
            />
            {duration && (
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
              </div>
            )}
          </div>
        );

      case 'audio':
        return (
          <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-white text-sm font-medium">{filename || 'Audio'}</div>
              <div className="text-gray-400 text-xs">
                {size && `${(size / 1024 / 1024).toFixed(2)} MB`}
                {duration && ` • ${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`}
              </div>
            </div>
            <audio src={url} controls className="w-32" />
          </div>
        );

      case 'document':
        return (
          <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-white text-sm font-medium">{filename || 'Document'}</div>
              <div className="text-gray-400 text-xs">
                {size && `${(size / 1024 / 1024).toFixed(2)} MB`}
              </div>
            </div>
            <button
              onClick={() => window.open(url, '_blank')}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>
        );

      default:
        return (
          <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
            <div className="w-10 h-10 bg-gray-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-white text-sm font-medium">{filename || 'File'}</div>
              <div className="text-gray-400 text-xs">
                {size && `${(size / 1024 / 1024).toFixed(2)} MB`}
              </div>
            </div>
            <button
              onClick={() => window.open(url, '_blank')}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>
        );
    }
  };

  const renderReactions = () => {
    if (!hasReactions) return null;

    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {message.reactions.map((reaction, index) => (
          <button
            key={index}
            onClick={() => onReact?.(message.id, reaction.emoji)}
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-full text-sm transition-colors",
              reaction.isFromCurrentUser
                ? "bg-cyan-500/30 text-cyan-300 border border-cyan-400/50"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            )}
          >
            <span>{reaction.emoji}</span>
            <span className="text-xs">{reaction.count}</span>
          </button>
        ))}
      </div>
    );
  };

  const renderLocation = () => {
    if (!message.location) return null;

    return (
      <div className="p-3 bg-white/10 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-white text-sm font-medium">Location Shared</div>
            <div className="text-gray-400 text-xs">
              {message.location.address || `${message.location.latitude.toFixed(6)}, ${message.location.longitude.toFixed(6)}`}
            </div>
          </div>
          <button
            onClick={() => window.open(`https://maps.google.com/?q=${message.location.latitude},${message.location.longitude}`, '_blank')}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  const renderPoll = () => {
    if (!message.pollData) return null;

    const totalVotes = message.pollData.options.reduce((sum, option) => sum + option.votes.length, 0);

    return (
      <div className="p-3 bg-white/10 rounded-lg">
        <div className="text-white font-medium mb-3">{message.pollData.question}</div>
        <div className="space-y-2">
          {message.pollData.options.map((option, index) => {
            const percentage = totalVotes > 0 ? (option.votes.length / totalVotes) * 100 : 0;
            const isWinner = message.pollData.isClosed && option.votes.length === Math.max(...message.pollData.options.map(o => o.votes.length));

            return (
              <div key={index} className="relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-white">{option.text}</span>
                  <span className="text-xs text-gray-400">{option.votes.length} votes</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className={cn(
                      "h-2 rounded-full transition-all",
                      isWinner ? "bg-green-500" : "bg-cyan-500"
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 text-xs text-gray-400">
          {totalVotes} votes • {message.pollData.isClosed ? 'Closed' : 'Open'}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className={cn(
        "group flex gap-3 p-4 rounded-lg transition-all",
        isSelf ? "flex-row-reverse" : "flex-row",
        isHovered && "bg-white/5",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Avatar */}
      {showAvatar && (
        <div className={cn("flex-shrink-0", isSelf && "order-2")}>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
            {senderAvatar ? (
              <img src={senderAvatar} alt={senderName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-sm font-bold">
                {senderName.split(' ').map(n => n[0]).join('')}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Message Content */}
      <div className={cn("flex-1 max-w-[70%]", isSelf && "order-1")}>
        {/* Sender Name */}
        {showSenderName && !isSelf && (
          <div className="text-xs text-gray-400 mb-1">{senderName}</div>
        )}

        {/* Message Bubble */}
        <motion.div
          className={cn(
            "relative p-3 rounded-2xl",
            isSelf
              ? "bg-cyan-500 text-white"
              : "bg-white/10 text-white"
          )}
          whileTap={{ scale: 0.98 }}
        >
          {/* Priority Badge */}
          {getPriorityBadge() && (
            <div className="absolute -top-2 -right-2">
              {getPriorityBadge()}
            </div>
          )}

          {/* Forwarded Indicator */}
          {isForwarded && (
            <div className="flex items-center gap-1 mb-2 text-xs opacity-70">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <span>Forwarded from {isForwarded.originalSenderName}</span>
            </div>
          )}

          {/* Reply Indicator */}
          {isReply && (
            <div className="mb-2 p-2 bg-black/20 rounded-lg border-l-2 border-cyan-400">
              <div className="text-xs opacity-70">Replying to {isReply.originalMessageSender}</div>
              <div className="text-sm truncate">{isReply.originalMessageText}</div>
            </div>
          )}

          {/* Media Attachments */}
          {hasMedia && (
            <div className="space-y-2 mb-2">
              {message.mediaAttachments.map((attachment, index) => (
                <div key={index}>{renderMediaAttachment(attachment)}</div>
              ))}
            </div>
          )}

          {/* Message Text */}
          {message.text && (
            <div className="whitespace-pre-wrap break-words">
              {message.text}
            </div>
          )}

          {/* Location */}
          {renderLocation()}

          {/* Poll */}
          {renderPoll()}

          {/* Timestamp and Status */}
          <div className={cn(
            "flex items-center gap-2 mt-2 text-xs",
            isSelf ? "text-cyan-100" : "text-gray-400"
          )}>
            {showTimestamp && <span>{formattedTime}</span>}
            {isEdited && <span>edited</span>}
            {isScheduled && <span>scheduled</span>}
            {isSelfDestructing && <span className="text-red-400">self-destructing</span>}
            {isSelf && showStatus && getStatusIcon()}
          </div>
        </motion.div>

        {/* Reactions */}
        {renderReactions()}

        {/* Action Buttons */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={cn(
                "flex gap-1 mt-2",
                isSelf ? "justify-end" : "justify-start"
              )}
            >
              <button
                onClick={() => setShowReactionPicker(!showReactionPicker)}
                className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                title="React"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>

              <button
                onClick={() => onReply?.(message.id)}
                className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                title="Reply"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </button>

              <button
                onClick={() => onForward?.(message.id)}
                className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                title="Forward"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              {isSelf && (
                <>
                  <button
                    onClick={() => onEdit?.(message.id)}
                    className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>

                  <button
                    onClick={() => onDelete?.(message.id)}
                    className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </>
              )}

              <button
                onClick={() => onPin?.(message.id)}
                className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                title="Pin"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>

              <button
                onClick={() => onStar?.(message.id)}
                className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                title="Star"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reaction Picker */}
        <AnimatePresence>
          {showReactionPicker && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={cn(
                "absolute bottom-full mb-2 p-2 bg-black/95 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl z-50",
                isSelf ? "right-0" : "left-0"
              )}
            >
              <div className="grid grid-cols-4 gap-1">
                {commonReactions.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      onReact?.(message.id, emoji);
                      setShowReactionPicker(false);
                    }}
                    className="p-2 hover:bg-white/10 rounded transition-colors text-lg"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
