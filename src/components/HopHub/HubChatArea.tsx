import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../../constants';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isMe: boolean;
  avatar?: string;
}

interface HubChatAreaProps {
  chatId: string;
  chatName: string; // e.g., "#general" or "Music Lovers"
  type: 'group' | 'channel';
}

export const HubChatArea: React.FC<HubChatAreaProps> = ({ chatId, chatName, type }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Alice',
      content: 'Hey everyone! Welcome to CloudHop!',
      timestamp: '10:30 AM',
      isMe: false,
      avatar: '🎨',
    },
    {
      id: '2',
      sender: 'You',
      content: 'The new interface looks amazing. Love the dark mode.',
      timestamp: '10:32 AM',
      isMe: true,
      avatar: '👤',
    },
    {
      id: '3',
      sender: 'Bob',
      content: 'Has anyone tried the new Music visualizer yet?',
      timestamp: '10:35 AM',
      isMe: false,
      avatar: '🎵',
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'You',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      avatar: '👤',
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0E1430]/60 backdrop-blur-md">
      {/* Header */}
      <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#0E1430]/40 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/20">
            {type === 'group' ? '👥' : '#'}
          </div>
          <div>
            <h2 className="text-white font-bold italic tracking-wide">{chatName}</h2>
            <p className="text-white/40 text-xs font-medium">
              {type === 'group' ? '89 members • 23 online' : 'General discussion channel'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/60 hover:text-white">
            <Icons.Search className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/60 hover:text-white">
            <Icons.Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 ${msg.isMe ? 'flex-row-reverse' : ''} group`}
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg shrink-0 border border-white/5">
              {msg.avatar}
            </div>

            {/* Message Bubble */}
            <div className={`max-w-[70%] space-y-1 ${msg.isMe ? 'items-end flex flex-col' : ''}`}>
              <div className="flex items-baseline gap-2">
                <span className="text-white/90 text-sm font-bold">{msg.sender}</span>
                <span className="text-white/30 text-[10px]">{msg.timestamp}</span>
              </div>
              <div
                className={`
                  p-4 rounded-2xl text-sm leading-relaxed shadow-lg backdrop-blur-sm border
                  ${
                    msg.isMe
                      ? 'bg-gradient-to-br from-[#53C8FF] to-[#0088CC] text-[#050819] font-medium rounded-tr-none border-[#53C8FF]/50'
                      : 'bg-[#1E3A5F]/40 text-white/90 rounded-tl-none border-white/5 group-hover:bg-[#1E3A5F]/60 transition-colors'
                  }
                `}
              >
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-[#0E1430]/40 border-t border-white/5 backdrop-blur-md">
        <div className="flex items-end gap-3 bg-[#080C22]/60 border border-[#1E3A5F] rounded-3xl p-2 shadow-inner focus-within:border-[#53C8FF]/50 focus-within:shadow-[0_0_20px_rgba(83,200,255,0.1)] transition-all duration-300">
            <button className="p-3 text-white/40 hover:text-[#53C8FF] transition-colors rounded-full hover:bg-white/5">
                <Icons.Add className="w-5 h-5" />
            </button>
            <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Message ${chatName}...`}
                rows={1}
                className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-white/30 py-3 max-h-32 min-h-[44px] resize-none custom-scrollbar"
                style={{ height: '44px' }}
            />
            <button 
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className={`
                    p-3 rounded-2xl transition-all duration-300 transform
                    ${inputValue.trim() 
                        ? 'bg-[#53C8FF] text-[#050819] hover:scale-105 shadow-[0_0_15px_rgba(83,200,255,0.3)]' 
                        : 'bg-white/5 text-white/20 cursor-not-allowed'}
                `}
            >
                <Icons.Send className="w-5 h-5" />
            </button>
            
            {/* AI Assistant Button */}
            <button 
                onClick={() => {
                    const aiMessage = {
                        id: Date.now().toString(),
                        sender: 'Mr. Rabbit AI',
                        content: '🐰 Hello! I\'m Mr. Rabbit, your AI assistant. How can I help you today?',
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        isMe: false,
                        avatar: '🤖'
                    };
                    setMessages(prev => [...prev, aiMessage]);
                }}
                className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-all duration-300 transform shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                title="Chat with Mr. Rabbit AI"
            >
                🤖
            </button>
            
            {/* Video Call Button */}
            <button 
                onClick={() => {
                    const callMessage = {
                        id: Date.now().toString(),
                        sender: 'System',
                        content: '📞 Starting video call... Join the meeting room: https://cloudhop.call/' + chatId,
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        isMe: false,
                        avatar: '📹'
                    };
                    setMessages(prev => [...prev, callMessage]);
                    // Open video call in new window
                    window.open(`https://cloudhop.call/${chatId}`, '_blank');
                }}
                className="p-3 rounded-2xl bg-gradient-to-r from-green-500 to-teal-500 text-white hover:scale-105 transition-all duration-300 transform shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                title="Start Video Call"
            >
                📞
            </button>
            
            {/* Screen Share Button */}
            <button 
                onClick={() => {
                    const shareMessage = {
                        id: Date.now().toString(),
                        sender: 'System',
                        content: '🖥️ Screen sharing started for ' + chatName,
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        isMe: false,
                        avatar: '🖥️'
                    };
                    setMessages(prev => [...prev, shareMessage]);
                    // Start screen sharing
                    navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                        .then(stream => {
                            console.log('Screen sharing started:', stream);
                        })
                        .catch(err => console.error('Screen sharing error:', err));
                }}
                className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:scale-105 transition-all duration-300 transform shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                title="Share Screen"
            >
                🖥️
            </button>
        </div>
        <div className="text-center mt-2">
             <p className="text-[10px] text-white/20 uppercase tracking-widest">StrikeCore Secure Messaging</p>
        </div>
      </div>
    </div>
  );
};
