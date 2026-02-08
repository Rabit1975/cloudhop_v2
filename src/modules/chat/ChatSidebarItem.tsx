import React, { useState } from 'react';
import { ChatOptionsMenu } from './ChatOptionsMenu';
import { EditChatModal } from './EditChatModal';
import { EditChannelModal } from './EditChannelModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { useChatActions } from '../../hooks/useChatActions';
import { Chat } from '../../types';

interface ChatSidebarItemProps {
    chat: Chat;
    isActive: boolean;
    userId: string;
    onSelect: () => void;
    onRefresh: () => void;
}

export const ChatSidebarItem: React.FC<ChatSidebarItemProps> = ({ 
    chat, 
    isActive, 
    userId,
    onSelect,
    onRefresh 
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const { updateChat, deleteChat, loading } = useChatActions(onRefresh);

  const isOwner = chat.created_by === userId;

  return (
    <>
        <button 
            onClick={onSelect}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all group relative ${isActive ? 'bg-[#53C8FF]/10 border border-[#53C8FF]/20' : 'hover:bg-white/5 border border-transparent'}`}
        >
            <div className="relative shrink-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${isActive ? 'bg-[#53C8FF] text-[#0A0F1F]' : 'bg-white/10 text-white'}`}>
                    {chat.is_group ? '👥' : (chat.title?.charAt(0) || '?')}
                </div>
                {chat.type && chat.type !== 'dm' && (
                    <div className="absolute -bottom-1 -right-1 bg-[#050819] rounded-full p-0.5">
                        <div className="w-4 h-4 bg-white/10 rounded-full flex items-center justify-center text-[8px]">
                            {chat.type === 'channel' ? '📢' : '👥'}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-sm font-bold truncate ${isActive ? 'text-[#53C8FF]' : 'text-white'}`}>{chat.title || 'Untitled'}</span>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-xs text-white/40 truncate max-w-[120px]">
                        {chat.description || 'Tap to chat'}
                    </p>
                </div>
            </div>

            {/* Options Menu Button (Only for Owner) */}
            {isOwner && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                        onClick={(e) => { e.stopPropagation(); setShowMenu(true); }}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                    </button>
                    {showMenu && (
                        <ChatOptionsMenu 
                            onEdit={() => { setShowEdit(true); setShowMenu(false); }} 
                            onDelete={() => { setShowDelete(true); setShowMenu(false); }} 
                            onClose={() => { setShowMenu(false); }} 
                        />
                    )}
                </div>
            )}
        </button>

      {showEdit && (
         chat.type === 'channel' ? (
            <EditChannelModal 
                channel={chat} 
                onSave={updates => updateChat(chat.id, updates)} 
                onClose={() => { setShowEdit(false); }} 
            />
         ) : (
            <EditChatModal 
                chat={chat} 
                onSave={updates => updateChat(chat.id, updates)} 
                onClose={() => setShowEdit(false)} 
            />
         )
      )}

      {showDelete && (
        <DeleteConfirmModal 
          title={`Delete ${chat.type === 'channel' ? 'Channel' : 'Chat'}`} 
          message={`Are you sure you want to delete "${chat.title}"? This action cannot be undone.`} 
          onConfirm={async () => {
              await deleteChat(chat.id);
              setShowDelete(false);
          }} 
          onCancel={() => { setShowDelete(false); }} 
          loading={loading}
        />
      )}
    </>
  );
};
