import React, { useState, useEffect, useRef } from 'react';
import { View } from '../types';
import { Icons } from '../constants';
import { rabbitAIService } from '../../services/RabbitAIService';

interface AIAssistantProps {
  currentView: View;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [input, setInput] = useState('');
  
  // Auto-scroll to bottom of response
  const responseRef = useRef<HTMLDivElement>(null);

  const getContextActions = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return [
          { label: 'Daily Briefing', prompt: 'Generate a daily briefing based on my recent activity and upcoming meetings.' },
          { label: 'Suggest Focus', prompt: 'Analyze my schedule and suggest a key focus area for today.' },
          { label: 'Review Activity', prompt: 'Summarize my recent XP gains and community interactions.' }
        ];
      case View.MEETINGS:
        return [
          { label: 'Start Transcription', prompt: 'Initialize transcription service for this meeting.' },
          { label: 'Summarize Discussion', prompt: 'Provide a summary of the current meeting conversation.' },
          { label: 'Extract Action Items', prompt: 'List all action items and assigned tasks from this meeting.' }
        ];
      case View.WORLD: // HopHub
        return [
          { label: 'Summarize Channel', prompt: 'Summarize the last 50 messages in this channel.' },
          { label: 'Draft Post', prompt: 'Help me draft an engaging announcement for this community.' },
          { label: 'Moderation Scan', prompt: 'Scan recent messages for community guideline violations.' }
        ];
      case View.CHAT:
        return [
          { label: 'Suggest Reply', prompt: 'Suggest a professional yet friendly reply to the last message.' },
          { label: 'Translate Chat', prompt: 'Translate the recent messages into English.' },
          { label: 'Tone Check', prompt: 'Analyze the tone of my current draft message.' }
        ];
      case View.ARCADE:
        return [
          { label: 'Game Strategy', prompt: 'Give me tips for the currently selected game.' },
          { label: 'Find Players', prompt: 'Help me find active players looking for a match.' }
        ];
      default:
        return [
          { label: 'General Help', prompt: 'How can CloudHop help me be more productive?' },
          { label: 'System Status', prompt: 'Check system health and connectivity.' }
        ];
    }
  };

  const handleAction = async (prompt: string) => {
    setIsThinking(true);
    setResponse(null);
    
    try {
      // Construct a context-aware system prompt
      const systemContext = `You are CloudHop AI, an intelligent assistant embedded in a collaboration platform.
      Current Context: User is in the "${currentView}" view.
      
      View Descriptions:
      - DASHBOARD: Personal overview, schedule, XP.
      - MEETINGS: Video conferencing, transcription, action items.
      - WORLD (HopHub): Community channels, announcements, moderation.
      - CHAT (RabbitChat): Direct messages, team chat.
      - ARCADE (GameHub): Gaming, matchmaking.
      
      Your goal is to be helpful, concise, and professional. Use markdown for formatting.`;

      const fullPrompt = `${systemContext}\n\nUser Request: ${prompt}`;
      
      const result = await rabbitAIService.generateText(fullPrompt);

      setResponse(result);
    } catch (error) {
      console.error('AI Error:', error);
      setResponse("I'm having trouble connecting to the neural network. Please try again later.");
    } finally {
      setIsThinking(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleAction(input);
    setInput('');
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_0_30px_rgba(83,200,255,0.3)] hover:shadow-[0_0_50px_rgba(83,200,255,0.6)] ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        } bg-gradient-to-br from-[#53C8FF] to-[#0084FF] border border-white/20`}
      >
        <Icons.Sparkles className="w-6 h-6 text-white animate-pulse" />
      </button>

      {/* AI Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-96 bg-[#0E1430]/95 backdrop-blur-xl border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-[#53C8FF]/10 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#53C8FF] to-[#0084FF] flex items-center justify-center shadow-lg">
                <Icons.Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold">CloudHop AI</h3>
                <p className="text-xs text-[#53C8FF]">RabbitAI Powered</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/5 rounded-lg text-white/60 hover:text-white transition-colors"
            >
              <Icons.Close className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Quick Actions */}
            {!response && !isThinking && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider">
                  Suggested Actions
                </h4>
                <div className="grid gap-2">
                  {getContextActions().map((action, i) => (
                    <button
                      key={i}
                      onClick={() => handleAction(action.prompt)}
                      className="text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#53C8FF]/30 transition-all group"
                    >
                      <div className="text-sm font-medium text-white group-hover:text-[#53C8FF] transition-colors">
                        {action.label}
                      </div>
                      <div className="text-xs text-white/40 mt-1 truncate">
                        {action.prompt}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Thinking State */}
            {isThinking && (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-4 border-[#53C8FF]/20 animate-ping"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-t-[#53C8FF] animate-spin"></div>
                </div>
                <p className="text-[#53C8FF] text-sm font-medium animate-pulse">
                  Processing Request...
                </p>
              </div>
            )}

            {/* Response */}
            {response && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider">
                    AI Response
                  </h4>
                  <button 
                    onClick={() => setResponse(null)}
                    className="text-xs text-[#53C8FF] hover:underline"
                  >
                    Clear
                  </button>
                </div>
                <div 
                    ref={responseRef}
                    className="p-4 rounded-xl bg-gradient-to-br from-[#53C8FF]/10 to-[#0084FF]/5 border border-[#53C8FF]/20 text-white/90 text-sm leading-relaxed whitespace-pre-wrap shadow-inner"
                >
                  {response}
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/5 bg-[#080C22]/50">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="w-full bg-[#0E1430] text-white placeholder-white/30 text-sm rounded-xl py-3 pl-4 pr-12 border border-white/10 focus:border-[#53C8FF]/50 focus:outline-none focus:ring-1 focus:ring-[#53C8FF]/50 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isThinking}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-[#53C8FF] text-[#080C22] hover:bg-[#0084FF] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Icons.Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIAssistant;
