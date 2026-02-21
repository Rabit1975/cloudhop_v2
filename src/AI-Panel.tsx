import React, { useState, useRef, useEffect } from 'react';
import { Bot, Brain, Palette, Music, X, Send } from 'lucide-react';
import { View } from './types';

interface AIPanelProps {
  currentView: View;
  isVisible: boolean;
  onClose: () => void;
}

const AIPanel: React.FC<AIPanelProps> = ({ currentView, isVisible, onClose }) => {
  const [activeTab, setActiveTab] = useState<'assistant' | 'rabbitai' | 'music'>('assistant');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [artPrompt, setArtPrompt] = useState('');
  const responseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [response]);

  const getContextActions = () => {
    switch (currentView) {
      case View.DASHBOARD: return ['Daily Briefing', 'Suggest Focus', 'Review Activity', 'Plan Day'];
      case View.CHAT:      return ['Summarize Chat', 'Suggest Response', 'Analyze Mood', 'Find Topics'];
      case View.MEETINGS:  return ['Prepare Meeting', 'Take Notes', 'Summarize Discussion', 'Action Items'];
      case View.ARCADE:    return ['Game Strategy', 'Find Players', 'Game Tips', 'Performance Analysis'];
      case View.MUSIC:     return ['Find Music', 'Mood Playlist', 'Discover Artists', 'Create Mix'];
      default:             return ['General Help', 'Explain Feature', 'Suggestion', 'Analysis'];
    }
  };

  const handleAssistantMessage = () => {
    if (!message.trim()) return;
    setIsThinking(true);
    setMessage('');
    setTimeout(() => {
      setResponse("I'm RabbitAI, your CloudHop assistant. I can help you navigate features, answer questions about CloudHop, and assist with your creative projects. What would you like to know?");
      setIsThinking(false);
    }, 1200);
  };

  if (!isVisible) return null;

  const tabStyle = (tab: string): React.CSSProperties => ({
    background: activeTab === tab ? 'rgba(83,200,255,0.2)' : 'transparent',
    border: `1px solid ${activeTab === tab ? 'rgba(83,200,255,0.4)' : 'transparent'}`,
    color: activeTab === tab ? '#53C8FF' : 'rgba(255,255,255,0.7)',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  });

  return (
    <div style={{
      position: 'fixed', right: '20px', bottom: '20px',
      width: '400px', height: '600px',
      background: 'rgba(14,20,48,0.95)',
      border: '1px solid rgba(83,200,255,0.3)',
      borderRadius: '16px', backdropFilter: 'blur(20px)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      display: 'flex', flexDirection: 'column', zIndex: 1000,
    }}>
      {/* Header */}
      <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg,#53C8FF 0%,#A3E7FF 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={16} color="#0A0F1F" />
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'white', margin: 0 }}>Rabbit AI</h3>
        </div>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}>
          <X size={18} />
        </button>
      </div>

      {/* Tabs */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '8px' }}>
        <button onClick={() => setActiveTab('assistant')} style={tabStyle('assistant')}>
          <Brain size={12} /> Assistant
        </button>
        <button onClick={() => setActiveTab('rabbitai')} style={tabStyle('rabbitai')}>
          <Palette size={12} /> RabbitAI
        </button>
        <button onClick={() => setActiveTab('music')} style={tabStyle('music')}>
          <Music size={12} /> Music
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {/* ── ASSISTANT TAB ── */}
        {activeTab === 'assistant' && (
          <>
            <div style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>Quick Actions:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {getContextActions().map(action => (
                  <button key={action} onClick={() => setMessage(`Help me with ${action.toLowerCase()}`)}
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', cursor: 'pointer' }}>
                    {action}
                  </button>
                ))}
              </div>
            </div>
            <div ref={responseRef} style={{ flex: 1, padding: '16px', overflow: 'auto' }}>
              {response && (
                <div style={{ background: 'rgba(83,200,255,0.1)', border: '1px solid rgba(83,200,255,0.3)', borderRadius: '8px', padding: '12px', fontSize: '14px', lineHeight: '1.5', color: 'white' }}>
                  {response}
                </div>
              )}
              {isThinking && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px', color: '#53C8FF', fontSize: '14px' }}>
                  <Brain size={14} />
                  <span>Processing...</span>
                </div>
              )}
            </div>
            <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="text" value={message} onChange={e => setMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAssistantMessage()}
                  placeholder="Ask Rabbit AI anything..."
                  style={{ flex: 1, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', padding: '8px 12px', color: 'white', fontSize: '14px', outline: 'none' }} />
                <button onClick={handleAssistantMessage} disabled={isThinking}
                  style={{ background: '#53C8FF', color: '#000', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: isThinking ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center' }}>
                  <Send size={14} />
                </button>
              </div>
            </div>
          </>
        )}

        {/* ── RABBITAI IMAGE TAB ── */}
        {activeTab === 'rabbitai' && (
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#53C8FF', marginBottom: '4px' }}>RabbitAI Creative Studio</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.5' }}>
                Describe what you want RabbitAI to create — avatars, artwork, backgrounds, and more.
              </div>
            </div>
            <textarea value={artPrompt} onChange={e => setArtPrompt(e.target.value)}
              placeholder="e.g. A neon cyberpunk avatar with cyan and purple tones..."
              style={{ width: '100%', height: '100px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '10px 12px', color: 'white', fontSize: '13px', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
            <button
              style={{ background: 'linear-gradient(135deg,#53C8FF,#7C3AED)', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Palette size={16} /> Generate with RabbitAI
            </button>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
              RabbitAI image generation coming soon — connect your API key in Settings to activate.
            </div>
          </div>
        )}

        {/* ── YOUTUBE MUSIC TAB ── */}
        {activeTab === 'music' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#53C8FF', marginBottom: '4px' }}>YouTube Music</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.5' }}>
                Open YouTube Music in a new tab to stream your library, playlists, and discover new music.
              </div>
            </div>
            <button
              onClick={() => window.open('https://music.youtube.com', '_blank')}
              style={{ background: 'linear-gradient(135deg,#FF0000,#CC0000)', color: '#fff', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <Music size={18} /> Open YouTube Music
            </button>
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '14px' }}>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px', fontWeight: '600' }}>Quick Links</div>
              {[
                { label: 'My Library', url: 'https://music.youtube.com/library' },
                { label: 'Explore', url: 'https://music.youtube.com/explore' },
                { label: 'Liked Music', url: 'https://music.youtube.com/playlist?list=LM' },
              ].map(link => (
                <button key={link.label} onClick={() => window.open(link.url, '_blank')}
                  style={{ display: 'block', width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: '#53C8FF', fontSize: '13px', padding: '6px 0', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPanel;
