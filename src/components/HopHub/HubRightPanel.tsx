import React, { useState, useRef, useEffect } from 'react';
import { HopSpace } from '../../hopspaces/utils/types';
import { useVisibility } from '../../hooks/useVisibility';
import { rabbitAIService } from '../../services/RabbitAIService';
import { Icons } from '../../constants';

type HubTab = 'chat' | 'spaces' | 'music' | 'gamehub';

interface HubRightPanelProps {
  activeTab: HubTab;
  selectedChatId: string | null;
  selectedSpace: HopSpace | null;
  user: any;
}

interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const HubRightPanel: React.FC<HubRightPanelProps> = ({
  activeTab,
  selectedChatId,
  selectedSpace,
  user,
}) => {
  const { ref: rightPanelRef, visible: rightPanelVisible } = useVisibility('HubRightPanel');
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I'm Rabbit, your AI companion. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    try {
      // Contextual prompt based on active tab
      let context = `Current view: ${activeTab}. `;
      if (activeTab === 'chat' && selectedChatId) context += `Chat ID: ${selectedChatId}. `;
      if (activeTab === 'spaces' && selectedSpace) context += `Space: ${selectedSpace.name}. `;
      
      const responseText = await rabbitAIService.generateText(`${context} User asks: ${userMsg.content}`);
      
      const aiMsg: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting to my brain. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!rightPanelVisible) {
    return null;
  }

  return (
    <div ref={rightPanelRef} className="h-full bg-[#050819]/60 backdrop-blur-md border-l border-white/5 flex flex-col w-80 shadow-2xl relative z-20">
      {/* Header */}
      <div className="h-16 flex items-center px-6 border-b border-white/5 bg-[#0E1430]/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/20 animate-pulse-slow">
            🐰
          </div>
          <div>
            <h3 className="text-white font-bold italic tracking-wider">Rabbit AI</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-white/40 text-[10px] font-mono uppercase">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-transparent">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`
              w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 border border-white/5
              ${msg.role === 'assistant' ? 'bg-[#1E3A5F]/40 text-orange-400' : 'bg-white/10 text-white'}
            `}>
              {msg.role === 'assistant' ? '🐰' : '👤'}
            </div>
            <div className={`space-y-1 max-w-[80%] ${msg.role === 'user' ? 'items-end flex flex-col' : ''}`}>
              <div
                className={`
                  p-3 rounded-2xl text-xs leading-relaxed border shadow-lg backdrop-blur-sm
                  ${
                    msg.role === 'user'
                      ? 'bg-[#53C8FF]/20 text-white border-[#53C8FF]/30 rounded-tr-none'
                      : 'bg-[#0E1430]/80 text-white/80 border-white/10 rounded-tl-none'
                  }
                `}
              >
                {msg.content}
              </div>
              <span className="text-[10px] text-white/20 px-1">{msg.timestamp}</span>
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1E3A5F]/40 flex items-center justify-center text-sm shrink-0 border border-white/5">
              🐰
            </div>
            <div className="bg-[#0E1430]/80 border border-white/10 rounded-2xl rounded-tl-none p-3 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-[#0E1430]/60 border-t border-white/5 backdrop-blur-md">
        <div className="relative">
            <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Rabbit..."
            rows={1}
            className="w-full bg-[#080C22]/60 border border-[#1E3A5F] rounded-xl pl-4 pr-10 py-3 text-xs text-white placeholder-white/30 focus:border-[#53C8FF]/50 focus:ring-0 resize-none custom-scrollbar shadow-inner"
            style={{ minHeight: '42px', maxHeight: '100px' }}
            />
            <button
            onClick={handleSend}
            disabled={!input.trim() || isThinking}
            className="absolute right-2 bottom-2 p-1.5 bg-[#53C8FF] text-[#050819] rounded-lg hover:bg-[#40b8ee] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
            <Icons.Send className="w-3 h-3" />
            </button>
        </div>
        <div className="mt-2 flex justify-center gap-2">
            <span className="text-[9px] text-white/20 uppercase tracking-widest">Powered by Rabbit AI</span>
        </div>
      </div>
    </div>
  );
};
