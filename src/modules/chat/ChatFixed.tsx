import React, { useState, useEffect, useRef } from 'react';
import { Icons } from '../../lib/constants';
import CallOverlay from './CallOverlay';
import Modal from '../../components/Modal';
import { useWebRTC } from '../../hooks/useWebRTC';
import { supabase } from '../../lib/supabaseClient';
import { CallHistory } from '../../types/call';
import { Message, ReactionSummary } from '../../types/message';
import { motion, AnimatePresence } from 'framer-motion';
import { rabbitAIService } from '../../services/RabbitAIService';

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
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [showCallHistory, setShowCallHistory] = useState(false);
  const [callHistory, setCallHistory] = useState<CallHistory[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingMessageId, setDeletingMessageId] = useState<string | null>(null);

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

  const handleTyping = () => {
    // Handle typing indicator
  };

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
                  className="px-4 py-2 rounded-xl text-sm font-bold bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEFT SIDEBAR: Chat List - Only show when in HopHub */}
      {activeTab === 'hophub' && (
        <div className="w-80 flex flex-col border-r border-white/5 relative z-10 bg-transparent/50 backdrop-blur-sm">
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-white/5 shrink-0">
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg bg-[#53C8FF]/10 flex items-center justify-center text-[#53C8FF]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </button>
              <span className="font-black italic tracking-tighter text-lg">HopHub</span>
            </div>
            <button
              onClick={() => setIsComposeOpen(true)}
              className="w-10 h-10 rounded-full bg-[#53C8FF] text-[#0A0F1F] flex items-center justify-center transition-transform shadow-lg shadow-[#53C8FF]/20 hover:scale-110"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          </div>

          {/* Call History Toggle Only */}
          <div className="p-2 border-b border-white/5 flex justify-end">
            <button
              onClick={() => setShowCallHistory(!showCallHistory)}
              className={`p-1.5 rounded-lg transition-colors ${showCallHistory ? 'bg-[#53C8FF] text-[#0A0F1F]' : 'bg-white/5 text-white/40 hover:text-white'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
            {showCallHistory ? (
              <div className="space-y-2">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-[#53C8FF] mb-2 px-2">
                  Call History
                </h3>
                {callHistory.map(call => (
                  <div
                    key={call.id}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${call.status === 'missed' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">
                        {call.caller_id === userId ? 'Outgoing' : 'Incoming'}
                      </p>
                      <p className="text-[10px] text-white/40">
                        {new Date(call.started_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Groups Section */}
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Groups</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold">
                        G
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium text-sm">General Lobby</div>
                        <div className="text-gray-400 text-xs">AI Intelligence • 23 members</div>
                      </div>
                      <div className="text-gray-400 text-xs">2:45 PM</div>
                    </div>
                  </div>
                </div>

                {/* Channels Section */}
                <div className="p-4 border-t border-white/5">
                  <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Channels</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-[#53C8FF]/20 flex items-center justify-center text-[#53C8FF]">
                        <span className="text-lg">#</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium text-sm">#general</div>
                        <div className="text-gray-400 text-xs">Main discussion channel</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Split Layout: Chat (3/4) + AI Features (1/4) */}
      <div className="flex-1 flex gap-4 p-4">
        {/* Chat Area - 3/4 width */}
        <div className="flex-[3] flex flex-col border border-white/5 rounded-2xl overflow-hidden shadow-2xl relative bg-transparent/50 backdrop-blur-sm">
          {/* Chat content without header */}
          <div className="flex-1 overflow-hidden">
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
                  placeholder="Type a message..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                />
                <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">
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
    </div>
  );
}
