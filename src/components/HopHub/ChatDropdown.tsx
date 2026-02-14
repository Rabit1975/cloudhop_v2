import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Conversation, ConversationType } from '../../types/hophub';

interface ChatDropdownProps {
  conversations: Conversation[];
  selectedConversationId?: string;
  onSelectConversation: (id: string) => void;
  onCreateGroup?: () => void;
  onCreateChannel?: () => void;
  onSearch?: (query: string) => void;
  className?: string;
}

export default function ChatDropdown({
  conversations,
  selectedConversationId,
  onSelectConversation,
  onCreateGroup,
  onCreateChannel,
  onSearch,
  className,
}: ChatDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'groups' | 'channels' | 'dms'>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter conversations based on active tab and search
  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    switch (activeTab) {
      case 'groups':
        return conv.type === 'GROUP';
      case 'channels':
        return conv.type === 'CHANNEL';
      case 'dms':
        return conv.type === 'DM';
      default:
        return true;
    }
  });

  const getConversationIcon = (type: ConversationType) => {
    switch (type) {
      case 'GROUP':
        return '👥';
      case 'CHANNEL':
        return '📢';
      case 'DM':
        return '💬';
      default:
        return '💬';
    }
  };

  const getConversationColor = (type: ConversationType) => {
    switch (type) {
      case 'GROUP':
        return 'from-purple-400 to-pink-500';
      case 'CHANNEL':
        return 'from-cyan-400 to-blue-500';
      case 'DM':
        return 'from-green-400 to-teal-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getUnreadCount = (conversation: Conversation) => {
    return conversation.unreadCount || 0;
  };

  return (
    <div ref={dropdownRef} className={cn("relative z-[99999]", className)}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.009 9.009 0 00-4.952-2.951 9.003 9.003 0 00-9.002 9.002c0 4.418 4.03 8 9 8s9-3.582 9-8z" />
        </svg>
        <span className="text-white font-medium">Chats</span>
        <svg className={cn(
          "w-4 h-4 text-white transition-transform",
          isOpen && "rotate-180"
        )} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-32 left-4 w-96 bg-black border border-white/20 rounded-lg shadow-2xl z-[99999] overflow-hidden"
            style={{ transform: 'translate3d(0, 0, 0)' }}
          >
            {/* Search Bar */}
            <div className="p-4 border-b border-white/10">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:border-cyan-400"
                  autoFocus
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              {[
                { id: 'all', label: 'All', icon: '📱' },
                { id: 'groups', label: 'Groups', icon: '👥' },
                { id: 'channels', label: 'Channels', icon: '📢' },
                { id: 'dms', label: 'DMs', icon: '💬' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "text-cyan-400 bg-white/10"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Create Buttons */}
            <div className="p-4 border-b border-white/10 flex gap-2">
              <button
                onClick={() => {
                  onCreateGroup?.();
                  setIsOpen(false);
                }}
                className="flex-1 px-3 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors text-sm font-medium"
              >
                + Create Group
              </button>
              <button
                onClick={() => {
                  onCreateChannel?.();
                  setIsOpen(false);
                }}
                className="flex-1 px-3 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors text-sm font-medium"
              >
                + Create Channel
              </button>
            </div>

            {/* Conversation List */}
            <div className="overflow-y-auto max-h-[400px]">
              {filteredConversations.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p>No conversations found</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredConversations.map((conversation) => {
                    const unreadCount = getUnreadCount(conversation);
                    const isSelected = conversation.id === selectedConversationId;
                    
                    return (
                      <motion.button
                        key={conversation.id}
                        onClick={() => {
                          onSelectConversation(conversation.id);
                          setIsOpen(false);
                        }}
                        className={cn(
                          "w-full p-3 flex items-center gap-3 hover:bg-white/10 transition-colors text-left",
                          isSelected && "bg-white/10"
                        )}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Avatar */}
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold",
                          `bg-gradient-to-br ${getConversationColor(conversation.type)}`
                        )}>
                          {conversation.imageUrl ? (
                            <img 
                              src={conversation.imageUrl} 
                              alt={conversation.name} 
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <>
                              <span>{conversation.name?.charAt(0).toUpperCase()}</span>
                              <span className="text-xs ml-1">{getConversationIcon(conversation.type)}</span>
                            </>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-white font-medium truncate">
                                {conversation.name || 'Untitled'}
                              </span>
                              {conversation.type === 'CHANNEL' && (
                                <span className="text-xs text-cyan-400">#{conversation.name?.toLowerCase()}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {unreadCount > 0 && (
                                <span className="px-2 py-1 bg-cyan-500 text-white text-xs rounded-full">
                                  {unreadCount}
                                </span>
                              )}
                              <span className="text-xs text-gray-400">
                                {conversation.lastMessage ? 
                                  new Date(conversation.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) :
                                  new Date(conversation.updatedAt || conversation.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                }
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-1">
                            <div className="text-gray-400 text-sm truncate">
                              {conversation.lastMessage ? 
                                conversation.lastMessage.text.length > 50 ? 
                                  conversation.lastMessage.text.substring(0, 50) + '...' :
                                  conversation.lastMessage.text
                                : conversation.description
                              }
                            </div>
                            
                            {/* Member count for groups/channels */}
                            {conversation.type !== 'DM' && (
                              <span className="text-xs text-gray-400">
                                {conversation.members.length} members
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Status indicators */}
                        <div className="flex flex-col items-end gap-1">
                          {/* Online status for DMs */}
                          {conversation.type === 'DM' && conversation.members.length > 0 && (
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          )}
                          
                          {/* Pinned indicator */}
                          {false && (
                            <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{filteredConversations.length} conversations</span>
                <span>Click to select</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
