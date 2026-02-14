import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import SearchResultItem from './SearchResultItem';
import { Conversation } from '../../types/hophub';

interface DashboardPanelProps {
  title: string;
  conversations: Conversation[];
  loading?: boolean;
  error?: string;
  onViewAll?: () => void;
  className?: string;
  maxItems?: number;
}

export default function DashboardPanel({
  title,
  conversations,
  loading = false,
  error,
  onViewAll,
  className,
  maxItems = 5
}: DashboardPanelProps) {
  const displayConversations = conversations.slice(0, maxItems);

  if (loading) {
    return (
      <div className={cn("bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6", className)}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">{title}</h3>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
              <div className="w-10 h-10 bg-white/10 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <div className="w-3/4 h-4 bg-white/10 rounded animate-pulse mb-2"></div>
                <div className="w-1/2 h-3 bg-white/10 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6", className)}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">{title}</h3>
        </div>
        <div className="text-center py-8">
          <svg className="w-12 h-12 mx-auto mb-4 text-red-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className={cn("bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6", className)}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">{title}</h3>
        </div>
        <div className="text-center py-8">
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.009 9.009 0 00-4.952-2.951 9.003 9.003 0 00-9.002 9.002c0 4.418 4.03 8 9 8s9-3.582 9-8z" />
          </svg>
          <p className="text-gray-400">No conversations found</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">{title}</h3>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
          >
            View All
          </button>
        )}
      </div>

      <div className="space-y-2">
        {displayConversations.map((conversation, index) => (
          <motion.div
            key={conversation.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <SearchResultItem
              id={conversation.id}
              title={conversation.name || 'Untitled'}
              description={conversation.description}
              type={conversation.type.toLowerCase() as any}
              memberCount={conversation.members.length}
              unreadCount={conversation.unreadCount}
              onClick={() => console.log('Open conversation:', conversation.id)}
            />
          </motion.div>
        ))}
      </div>

      {conversations.length > maxItems && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <button
            onClick={onViewAll}
            className="w-full text-center text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
          >
            View {conversations.length - maxItems} more conversations
          </button>
        </div>
      )}
    </div>
  );
}
