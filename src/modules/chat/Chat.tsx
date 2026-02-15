import React, { useState, useEffect, useRef } from 'react';
import { Icons } from '../../lib/constants';
import CallOverlay from './CallOverlay';
import { PeopleSection } from '../../components/People/PeopleSection';
import Modal from '../../components/Modal';
import { useWebRTC } from '../../hooks/useWebRTC';
import { supabase } from '../../lib/supabaseClient';
import { CallHistory } from '../../types/call';
import { Message, ReactionSummary } from '../../types/message';
import { motion, AnimatePresence } from 'framer-motion';
import rabbitAIService from '../../services/RabbitAIService';
import { cn } from '../../lib/utils';
import ChatDropdown from '../../components/HopHub/ChatDropdown';
import AdvancedMessageInput from '../../components/HopHub/AdvancedMessageInput';
import AdvancedMessageBubble from '../../components/HopHub/AdvancedMessageBubble';
import PresenceIndicator from '../../components/HopHub/PresenceIndicator';
import DashboardPanel from '../../components/HopHub/DashboardPanel';
import { Conversation, ConversationType } from '../../types/hophub';

interface Chat {
  id: string;
  title: string;
  type: 'space' | 'direct' | 'group';
  participants?: string[];
  last_message?: string;
  created_at: string;
  updated_at: string;
}

interface ChatProps {
  userId?: string;
  activeTab?: string;
}

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  onTyping: () => void;
  placeholder: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onTyping, placeholder }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-6 bg-[#080C22]/80 backdrop-blur-lg border-t border-white/5">
      <div className="flex items-end gap-3 bg-[#0D1A2A] border border-[#1E3A5F] rounded-3xl p-3">
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={onTyping}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white placeholder-gray-400 resize-none outline-none text-sm"
          rows={1}
        />
        <button
          onClick={handleSend}
          className="w-10 h-10 bg-[#53C8FF] hover:bg-[#4AB8FF] text-[#0A0F1F] rounded-full flex items-center justify-center transition-all hover:scale-110"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default function Chat({ userId: userIdProp, activeTab = 'hophub' }: ChatProps) {
  const [activeFolder, setActiveFolder] = useState<string>('All');
  const [activeSidebarTab, setActiveSidebarTab] = useState<'channels' | 'people'>('channels');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [showCallHistory, setShowCallHistory] = useState(false);
  const [callHistory, setCallHistory] = useState<CallHistory[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>('general-chat');
  const [selectedGroup, setSelectedGroup] = useState<string>('general-lobby');
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newChannelName, setNewChannelName] = useState('');
  const [groups, setGroups] = useState([
    { id: 'general-lobby', name: 'General Lobby', chatId: 'general-chat', members: 23, description: 'AI Intelligence' },
    { id: 'dev-team', name: 'Dev Team', chatId: 'dev-chat', members: 8, description: 'Development' }
  ]);
  const [channels, setChannels] = useState([
    { 
      id: 'general-channel', 
      name: '#general', 
      description: 'Main discussion channel',
      members: [
        { id: '1', name: 'Alice Johnson', status: 'online', statusMessage: 'Working on CloudHop features 🚀', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice' },
        { id: '2', name: 'Bob Smith', status: 'busy', statusMessage: 'In a meeting', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob' },
        { id: '3', name: 'Carol Williams', status: 'away', statusMessage: 'Away from keyboard', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carol' }
      ]
    },
    { 
      id: 'random-channel', 
      name: '#random', 
      description: 'Random conversations',
      members: [
        { id: '4', name: 'David Brown', status: 'online', statusMessage: '', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david' },
        { id: '5', name: 'Eve Davis', status: 'online', statusMessage: 'Let\'s connect!', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=eve' }
      ]
    }
  ]);
  
  // Mock conversations for dropdown
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 'general-chat',
      type: 'GROUP',
      name: 'General Lobby',
      description: 'Main chat for everyone',
      members: [
        { userId: 'user-1', role: 'admin', joinedAt: new Date().toISOString(), permissions: { canSendMessages: true, canSendMedia: true, canSendStickers: true, canSendPolls: true, canChangeInfo: false, canAddMembers: false, canPinMessages: false, canManageTopics: false } },
        { userId: 'user-2', role: 'member', joinedAt: new Date().toISOString(), permissions: { canSendMessages: true, canSendMedia: true, canSendStickers: true, canSendPolls: true, canChangeInfo: false, canAddMembers: false, canPinMessages: false, canManageTopics: false } }
      ],
      createdAt: new Date().toISOString(),
      unreadCount: 3,
      lastMessage: {
        id: '1',
        conversationId: 'general-chat',
        senderId: 'user-1',
        text: 'Welcome to the general chat!',
        type: 'TEXT',
        createdAt: new Date().toISOString(),
        mediaAttachments: [],
        reactions: [],
        status: 'READ',
        priority: 'NORMAL',
        isPinned: false,
        isStarred: false,
        readBy: ['user-1', 'user-2'],
        deliveredTo: ['user-1', 'user-2'],
        isEncrypted: false,
        isSecretMessage: false,
        canForward: true,
        canSave: true,
        canScreenshot: true
      }
    },
    {
      id: 'dev-chat',
      type: 'GROUP',
      name: 'Dev Team',
      description: 'Development team discussions',
      members: [
        { userId: 'dev-1', role: 'admin', joinedAt: new Date().toISOString(), permissions: { canSendMessages: true, canSendMedia: true, canSendStickers: true, canSendPolls: true, canChangeInfo: true, canAddMembers: true, canPinMessages: true, canManageTopics: true } }
      ],
      createdAt: new Date().toISOString(),
      unreadCount: 0,
      lastMessage: {
        id: '2',
        conversationId: 'dev-chat',
        senderId: 'dev-1',
        text: 'Working on the new features',
        type: 'TEXT',
        createdAt: new Date().toISOString(),
        mediaAttachments: [],
        reactions: [],
        status: 'READ',
        priority: 'NORMAL',
        isPinned: false,
        isStarred: false,
        readBy: ['dev-1'],
        deliveredTo: ['dev-1'],
        isEncrypted: false,
        isSecretMessage: false,
        canForward: true,
        canSave: true,
        canScreenshot: true
      }
    },
    {
      id: 'general-channel',
      type: 'CHANNEL',
      name: 'general',
      description: 'Main discussion channel',
      members: [
        { userId: 'user-1', role: 'admin', joinedAt: new Date().toISOString(), permissions: { canSendMessages: true, canSendMedia: true, canSendStickers: true, canSendPolls: true, canChangeInfo: false, canAddMembers: false, canPinMessages: false, canManageTopics: false } }
      ],
      createdAt: new Date().toISOString(),
      unreadCount: 5,
      lastMessage: {
        id: '3',
        conversationId: 'general-channel',
        senderId: 'user-1',
        text: 'Welcome to #general channel!',
        type: 'TEXT',
        createdAt: new Date().toISOString(),
        mediaAttachments: [],
        reactions: [
          { emoji: '👍', count: 3, userIds: ['user-1', 'user-2', 'user-3'], isFromCurrentUser: false }
        ],
        status: 'READ',
        priority: 'NORMAL',
        isPinned: false,
        isStarred: false,
        readBy: ['user-1', 'user-2', 'user-3'],
        deliveredTo: ['user-1', 'user-2', 'user-3'],
        isEncrypted: false,
        isSecretMessage: false,
        canForward: true,
        canSave: true,
        canScreenshot: true
      }
    },
    {
      id: 'random-channel',
      type: 'CHANNEL',
      name: 'random',
      description: 'Random conversations',
      members: [
        { userId: 'user-1', role: 'member', joinedAt: new Date().toISOString(), permissions: { canSendMessages: true, canSendMedia: true, canSendStickers: true, canSendPolls: true, canChangeInfo: false, canAddMembers: false, canPinMessages: false, canManageTopics: false } }
      ],
      createdAt: new Date().toISOString(),
      unreadCount: 0,
      lastMessage: {
        id: '4',
        conversationId: 'random-channel',
        senderId: 'user-1',
        text: 'Random stuff goes here!',
        type: 'TEXT',
        createdAt: new Date().toISOString(),
        mediaAttachments: [],
        reactions: [],
        status: 'READ',
        priority: 'NORMAL',
        isPinned: false,
        isStarred: false,
        readBy: ['user-1'],
        deliveredTo: ['user-1'],
        isEncrypted: false,
        isSecretMessage: false,
        canForward: true,
        canSave: true,
        canScreenshot: true
      }
    },
    {
      id: 'dm-alice',
      type: 'DM',
      name: 'Alice Johnson',
      description: 'Direct message with Alice',
      members: [
        { userId: 'alice', role: 'member', joinedAt: new Date().toISOString(), permissions: { canSendMessages: true, canSendMedia: true, canSendStickers: true, canSendPolls: true, canChangeInfo: false, canAddMembers: false, canPinMessages: false, canManageTopics: false } }
      ],
      createdAt: new Date().toISOString(),
      unreadCount: 1,
      lastMessage: {
        id: '5',
        conversationId: 'dm-alice',
        senderId: 'alice',
        text: 'Hey! How are you doing?',
        type: 'TEXT',
        createdAt: new Date().toISOString(),
        mediaAttachments: [],
        reactions: [],
        status: 'DELIVERED',
        priority: 'NORMAL',
        isPinned: false,
        isStarred: false,
        readBy: [],
        deliveredTo: ['alice'],
        isEncrypted: true,
        isSecretMessage: false,
        canForward: false,
        canSave: true,
        canScreenshot: false
      }
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingMessageId, setDeletingMessageId] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showConversationMenu, setShowConversationMenu] = useState(false);

  const userId = userIdProp || 'demo-user';

  const {
    callState,
    localStream,
    remoteStream,
    startCall,
    acceptCall,
    rejectCall,
    endCall,
    incomingCallFrom,
    toggleMic,
    toggleCamera,
    switchCamera,
    toggleSpeaker,
    isMicOn,
    isCameraOn,
  } = useWebRTC(userId);

  const currentChat = chats.find(chat => chat.id === selectedChatId);

  const handleSendMessage = (content: string) => {
    if (!selectedChatId) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender_id: userId,
      chat_id: selectedChatId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      reactions: []
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      const newGroup = {
        id: newGroupName.toLowerCase().replace(/\s+/g, '-'),
        name: newGroupName,
        chatId: `chat-${Date.now()}`,
        members: 1,
        description: 'Custom group'
      };
      setGroups(prev => [...prev, newGroup]);
      setNewGroupName('');
      setShowCreateGroupModal(false);
      setSelectedGroup(newGroup.id);
      setSelectedChatId(newGroup.chatId);
    }
  };

  const handleCreateChannel = () => {
    if (newChannelName.trim()) {
      const newChannel = {
        id: newChannelName.toLowerCase().replace(/\s+/g, '-'),
        name: `#${newChannelName}`,
        description: `#${newChannelName} channel`,
        members: [
          {
            id: userId,
            name: 'Current User',
            status: 'online',
            statusMessage: 'Channel creator',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`
          }
        ]
      };
      setChannels(prev => [...prev, newChannel]);
      setNewChannelName('');
      setShowCreateChannelModal(false);
      setSelectedChatId(newChannel.id);
      setSelectedGroup(null);
    }
  };

  // Search functions
  const searchAllItems = (query: string) => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    const results: any[] = [];
    
    // Search groups
    groups.forEach(group => {
      if (group.name.toLowerCase().includes(lowerQuery) ||
          group.description.toLowerCase().includes(lowerQuery)) {
        results.push({ ...group, type: 'group' });
      }
    });
    
    // Search channels
    channels.forEach(channel => {
      if (channel.name.toLowerCase().includes(lowerQuery) ||
          channel.description.toLowerCase().includes(lowerQuery)) {
        results.push({ ...channel, type: 'channel' });
      }
    });
    
    // Search chats
    chats.forEach(chat => {
      if (chat.title.toLowerCase().includes(lowerQuery) ||
          (chat.last_message && chat.last_message.toLowerCase().includes(lowerQuery))) {
        results.push({ ...chat, type: 'chat' });
      }
    });
    
    // Mock people data for search
    const people = [
      { id: '1', name: 'Alice Johnson', status: 'online', statusMessage: 'Working on CloudHop features 🚀', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice', type: 'person' },
      { id: '2', name: 'Bob Smith', status: 'busy', statusMessage: 'In a meeting', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob', type: 'person' },
      { id: '3', name: 'Carol Williams', status: 'away', statusMessage: 'Away from keyboard', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carol', type: 'person' },
      { id: '4', name: 'David Brown', status: 'online', statusMessage: '', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david', type: 'person' },
      { id: '5', name: 'Eve Davis', status: 'online', statusMessage: 'Let\'s connect!', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=eve', type: 'person' }
    ];
    
    people.forEach(person => {
      if (person.name.toLowerCase().includes(lowerQuery) ||
          (person.statusMessage && person.statusMessage.toLowerCase().includes(lowerQuery))) {
        results.push(person);
      }
    });
    
    return results;
  };

  const searchResults = searchAllItems(searchQuery);

  // Initialize with sample messages for different chats
  useEffect(() => {
    const messageTemplates = {
      'general-chat': [
        { id: '1', content: 'Welcome to General Lobby! 🚀', sender_id: 'System', chat_id: 'general-chat', created_at: new Date(Date.now() - 300000).toISOString(), updated_at: new Date(Date.now() - 300000).toISOString(), reactions: [] },
        { id: '2', content: 'This is the main chat interface', sender_id: 'CloudRabbit', chat_id: 'general-chat', created_at: new Date(Date.now() - 240000).toISOString(), updated_at: new Date(Date.now() - 240000).toISOString(), reactions: [] }
      ],
      'dev-chat': [
        { id: '1', content: 'Dev team check-in! 👨‍💻', sender_id: 'DevLead', chat_id: 'dev-chat', created_at: new Date(Date.now() - 180000).toISOString(), updated_at: new Date(Date.now() - 180000).toISOString(), reactions: [] },
        { id: '2', content: 'Working on the new features', sender_id: 'Developer', chat_id: 'dev-chat', created_at: new Date(Date.now() - 120000).toISOString(), updated_at: new Date(Date.now() - 120000).toISOString(), reactions: [] }
      ],
      'general-channel': [
        { id: '1', content: 'Welcome to #general channel! 💬', sender_id: 'Bot', chat_id: 'general-channel', created_at: new Date(Date.now() - 200000).toISOString(), updated_at: new Date(Date.now() - 200000).toISOString(), reactions: [] },
        { id: '2', content: 'General discussions here', sender_id: 'User', chat_id: 'general-channel', created_at: new Date(Date.now() - 100000).toISOString(), updated_at: new Date(Date.now() - 100000).toISOString(), reactions: [] }
      ],
      'random-channel': [
        { id: '1', content: 'Random stuff goes here! 🎲', sender_id: 'RandomUser', chat_id: 'random-channel', created_at: new Date(Date.now() - 150000).toISOString(), updated_at: new Date(Date.now() - 150000).toISOString(), reactions: [] },
        { id: '2', content: 'Anyone up for a game?', sender_id: 'Gamer', chat_id: 'random-channel', created_at: new Date(Date.now() - 50000).toISOString(), updated_at: new Date(Date.now() - 50000).toISOString(), reactions: [] }
      ]
    };
    
    setMessages(messageTemplates[selectedChatId as keyof typeof messageTemplates] || messageTemplates['general-chat']);
  }, [selectedChatId]);

  return (
    <div className="h-full flex gap-1 overflow-hidden animate-fade-in font-sans relative">
      <AnimatePresence>
        {deletingMessageId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <div className="bg-[#0E1430] border border-white/10 p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4">
              <h3 className="text-lg font-bold text-white mb-2">Delete Message?</h3>
              <p className="text-sm text-white/60 mb-6">
                Are you sure you want to delete this message? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeletingMessageId(null)}
                  className="px-4 py-2 rounded-xl text-sm font-bold text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setDeletingMessageId(null)}
                  className="px-4 py-2 rounded-xl text-sm font-bold bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CHAT AREA - Full width with dropdown */}
      {activeTab === 'hophub' && (
        <div className="flex flex-col h-full">
          {/* Header with Chat Dropdown */}
          <div className="flex items-center justify-between p-4 border-b border-white/20 bg-black/40 backdrop-blur-sm relative z-10">
            <div className="flex items-center gap-4">
              <ChatDropdown
                conversations={conversations}
                selectedConversationId={selectedChatId || ''}
                onSelectConversation={setSelectedChatId}
                onCreateGroup={() => setShowCreateGroupModal(true)}
                onCreateChannel={() => setShowCreateChannelModal(true)}
                className="flex-1 max-w-xs"
              />
              
              {/* Current Conversation Info */}
              {selectedChatId && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                      {conversations.find(c => c.id === selectedChatId)?.name?.charAt(0).toUpperCase() || 'C'}
                    </div>
                    <div>
                      <div className="text-white font-medium">
                        {conversations.find(c => c.id === selectedChatId)?.name || 'Select a chat'}
                      </div>
                      <div className="text-gray-300 text-xs">
                        {conversations.find(c => c.id === selectedChatId)?.members.length || 0} members
                      </div>
                    </div>
                  </div>
                  
                  {/* Conversation Menu */}
                  <div className="relative z-[99999]">
                    <button
                      onClick={() => setShowConversationMenu(!showConversationMenu)}
                      className="p-2 bg-white/20 rounded-lg text-white/60 hover:text-white transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                    
                    {/* Conversation Menu Dropdown */}
                    <AnimatePresence>
                      {showConversationMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full right-0 mt-2 w-48 bg-black border border-white/30 rounded-lg shadow-xl z-[99999]"
                          style={{ transform: 'translate3d(0, 0, 0)' }}
                        >
                          <div className="p-1">
                            <button
                              onClick={() => {
                                console.log('View conversation info');
                                setShowConversationMenu(false);
                              }}
                              className="w-full px-3 py-2 text-left text-white hover:bg-white/10 rounded-lg transition-colors text-sm flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Conversation Info
                            </button>
                            
                            <button
                              onClick={() => {
                                console.log('Search in conversation');
                                setShowConversationMenu(false);
                              }}
                              className="w-full px-3 py-2 text-left text-white hover:bg-white/10 rounded-lg transition-colors text-sm flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                              Search Messages
                            </button>
                            
                            <button
                              onClick={() => {
                                console.log('Toggle notifications');
                                setShowConversationMenu(false);
                              }}
                              className="w-full px-3 py-2 text-left text-white hover:bg-white/10 rounded-lg transition-colors text-sm flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                              </svg>
                              Notifications
                            </button>
                            
                            <div className="border-t border-white/10 my-1"></div>
                            
                            <button
                              onClick={() => {
                                console.log('Pin conversation');
                                setShowConversationMenu(false);
                              }}
                              className="w-full px-3 py-2 text-left text-white hover:bg-white/10 rounded-lg transition-colors text-sm flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                              </svg>
                              Pin Conversation
                            </button>
                            
                            <button
                              onClick={() => {
                                console.log('Archive conversation');
                                setShowConversationMenu(false);
                              }}
                              className="w-full px-3 py-2 text-left text-white hover:bg-white/10 rounded-lg transition-colors text-sm flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                              </svg>
                              Archive
                            </button>
                            
                            <div className="border-t border-white/10 my-1"></div>
                            
                            <button
                              onClick={() => {
                                console.log('Leave conversation');
                                setShowConversationMenu(false);
                              }}
                              className="w-full px-3 py-2 text-left text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              Leave Conversation
                            </button>
                            
                            <button
                              onClick={() => {
                                console.log('Delete conversation');
                                setShowConversationMenu(false);
                              }}
                              className="w-full px-3 py-2 text-left text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete Conversation
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCallHistory(!showCallHistory)}
                className={`p-2 rounded-lg transition-colors ${
                  showCallHistory ? 'bg-[#53C8FF] text-[#0A0F1F]' : 'bg-white/20 text-white/60 hover:text-white'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Call History Overlay */}
          <AnimatePresence>
            {showCallHistory && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-4 mt-2 w-96 bg-black/95 backdrop-blur-lg border border-white/30 rounded-lg shadow-xl z-50"
              >
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-3">Call History</h3>
                  <div className="space-y-2">
                    {callHistory.map(call => (
                      <div key={call.id} className="flex items-center gap-3 p-2 bg-white/20 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-white text-sm">Call with {call.callerName || 'Unknown'}</div>
                          <div className="text-gray-300 text-xs">{call.duration || 'Unknown duration'}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages Area */}
          <div className="flex-1 overflow-hidden bg-black/30 backdrop-blur-sm">
            {selectedChatId ? (
              <div className="flex flex-col h-full">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <AdvancedMessageBubble
                      key={message.id}
                      message={message}
                      isSelf={message.senderId === userId}
                      senderName={message.senderId === userId ? 'You' : 'User'}
                      onReply={(id) => console.log('Reply to:', id)}
                      onReact={(id, emoji) => console.log('React:', id, emoji)}
                      onForward={(id) => console.log('Forward:', id)}
                      onEdit={(id) => console.log('Edit:', id)}
                      onDelete={(id) => console.log('Delete:', id)}
                      onPin={(id) => console.log('Pin:', id)}
                      onStar={(id) => console.log('Star:', id)}
                    />
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-white/20 bg-black/40">
                  <AdvancedMessageInput
                    onSendMessage={(messageData) => {
                      console.log('Send message:', messageData);
                      // Add message to messages array
                    }}
                    onFileUpload={(files) => {
                      console.log('Upload files:', files);
                    }}
                    onVoiceRecord={(audioBlob) => {
                      console.log('Voice record:', audioBlob);
                    }}
                    onLocationShare={(location) => {
                      console.log('Share location:', location);
                    }}
                    onPollCreate={(poll) => {
                      console.log('Create poll:', poll);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-300">
                <div className="text-center max-w-md">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.009 9.009 0 00-4.952-2.951 9.003 9.003 0 00-9.002 9.002c0 4.418 4.03 8 9 8s9-3.582 9-8z" />
                  </svg>
                  <p className="text-lg font-medium mb-2">Select a conversation</p>
                  <p className="text-sm mb-6">Choose from the dropdown above to start chatting</p>
                  
                  {/* Recent Conversations Dashboard */}
                  <DashboardPanel
                    title="Recent Conversations"
                    conversations={conversations.slice(0, 3)}
                    onViewAll={() => console.log('View all conversations')}
                    className="mt-8"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Split Layout: Chat (3/4) + AI Features (1/4) */}
      <div className="flex-1 flex gap-4 p-4">
        {/* Chat Area - 3/4 width */}
        <div className="flex-[3] flex flex-col border border-white/5 rounded-2xl overflow-hidden shadow-2xl relative bg-transparent/50 backdrop-blur-sm">
          {/* Chat content with dynamic header */}
          <div className="flex-1 overflow-hidden">
            {/* Chat Header */}
            <div className="border-b border-white/5 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold">
                  {selectedGroup ? selectedGroup.charAt(0).toUpperCase() : selectedChatId?.charAt(1).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold">
                    {selectedGroup === 'general-lobby' && 'General Lobby'}
                    {selectedGroup === 'dev-team' && 'Dev Team'}
                    {selectedChatId === 'general-channel' && '#general'}
                    {selectedChatId === 'random-channel' && '#random'}
                    {selectedChatId === 'general-chat' && 'General Lobby'}
                    {selectedChatId === 'dev-chat' && 'Dev Team'}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {selectedGroup === 'general-lobby' && 'AI Intelligence • 23 members'}
                    {selectedGroup === 'dev-team' && 'Development • 8 members'}
                    {selectedChatId === 'general-channel' && 'Main discussion channel'}
                    {selectedChatId === 'random-channel' && 'Random conversations'}
                    {selectedChatId === 'general-chat' && 'AI Intelligence • 23 members'}
                    {selectedChatId === 'dev-chat' && 'Development • 8 members'}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chat messages area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
              {messages.map((message, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                      {message.sender_id?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-semibold text-sm">{message.sender_id}</span>
                        <span className="text-gray-400 text-xs">{new Date(message.created_at).toLocaleTimeString()}</span>
                      </div>
                      <div className="text-gray-300 text-sm">{message.content}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message input */}
            <div className="border-t border-white/5 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={messages.find(m => m.id === 'temp')?.content || ''}
                  onChange={(e) => {
                    const tempMessage = {
                      id: 'temp',
                      content: e.target.value,
                      sender_id: userId,
                      chat_id: selectedChatId || 'default',
                      created_at: new Date().toISOString(),
                      updated_at: new Date().toISOString(),
                      reactions: []
                    };
                    setMessages(prev => {
                      const filtered = prev.filter(m => m.id !== 'temp');
                      return e.target.value ? [...filtered, tempMessage] : filtered;
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const tempMessage = messages.find(m => m.id === 'temp');
                      if (tempMessage?.content.trim()) {
                        const newMessage = {
                          ...tempMessage,
                          id: Date.now().toString(),
                          created_at: new Date().toISOString(),
                        };
                        setMessages(prev => [...prev.filter(m => m.id !== 'temp'), newMessage]);
                      }
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                />
                <button 
                  onClick={() => {
                    const tempMessage = messages.find(m => m.id === 'temp');
                    if (tempMessage?.content.trim()) {
                      const newMessage = {
                        ...tempMessage,
                        id: Date.now().toString(),
                        created_at: new Date().toISOString(),
                      };
                      setMessages(prev => [...prev.filter(m => m.id !== 'temp'), newMessage]);
                    }
                  }}
                  className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Features Panel - 1/4 width */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-transparent/50 backdrop-blur-sm border border-white/5 rounded-2xl p-4">
            <h3 className="text-white font-bold mb-4">AI Features</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 text-white">
                🤖 AI Assistant
              </button>
              <button className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 text-white">
                📝 Smart Summaries
              </button>
              <button className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 text-white">
                🔍 Smart Search
              </button>
              <button className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 text-white">
                🎨 AI Art Generator
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Call Overlay */}
      {callState !== 'idle' && (
        <CallOverlay
          callState={callState}
          localStream={localStream}
          remoteStream={remoteStream}
          incomingCallFrom={incomingCallFrom}
          onAccept={acceptCall}
          onReject={rejectCall}
          onEnd={endCall}
          toggleMic={toggleMic}
          toggleCamera={toggleCamera}
          switchCamera={switchCamera}
          toggleSpeaker={toggleSpeaker}
          isMicOn={isMicOn}
          isCameraOn={isCameraOn}
          callerName={incomingCallFrom || 'Unknown'}
          callerAvatar={`https://api.dicebear.com/7.x/avataaars/svg?seed=${incomingCallFrom}`}
        />
      )}

      {/* Create Group Modal */}
      {showCreateGroupModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-black/90 border border-white/20 rounded-2xl p-6 w-96">
            <h3 className="text-white font-semibold text-lg mb-4">Create New Group</h3>
            <input
              type="text"
              placeholder="Group name..."
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 mb-4"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCreateGroupModal(false);
                  setNewGroupName('');
                }}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGroup}
                className="flex-1 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Channel Modal */}
      {showCreateChannelModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-black/90 border border-white/20 rounded-2xl p-6 w-96">
            <h3 className="text-white font-semibold text-lg mb-4">Create New Channel</h3>
            <input
              type="text"
              placeholder="Channel name..."
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 mb-4"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCreateChannelModal(false);
                  setNewChannelName('');
                }}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateChannel}
                className="flex-1 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
