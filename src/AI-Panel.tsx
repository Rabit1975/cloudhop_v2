import React, { useState, useRef, useEffect } from 'react';
import { View } from '../types';

interface AIPanelProps {
  currentView: View;
  isVisible: boolean;
  onClose: () => void;
}

const AIPanel: React.FC<AIPanelProps> = ({ currentView, isVisible, onClose }) => {
  const [activeTab, setActiveTab] = useState<'assistant' | 'leonardo' | 'music'>('assistant');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [musicPrompt, setMusicPrompt] = useState('');
  const [artPrompt, setArtPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [response]);

  const getContextActions = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return [
          'Daily Briefing',
          'Suggest Focus',
          'Review Activity',
          'Plan Day'
        ];
      case View.CHAT:
        return [
          'Summarize Chat',
          'Suggest Response',
          'Analyze Mood',
          'Find Topics'
        ];
      case View.MEETINGS:
        return [
          'Prepare Meeting',
          'Take Notes',
          'Summarize Discussion',
          'Action Items'
        ];
      case View.ARCADE:
        return [
          'Game Strategy',
          'Find Players',
          'Game Tips',
          'Performance Analysis'
        ];
      case View.MUSIC:
        return [
          'Generate Playlist',
          'Mood Analysis',
          'Discover Music',
          'Create Mix'
        ];
      default:
        return ['General Help', 'Explain Feature', 'Suggestion', 'Analysis'];
    }
  };

  const handleAssistantMessage = async () => {
    if (!message.trim()) return;
    
    setIsThinking(true);
    const userMessage = message;
    setMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const responses = {
        [View.DASHBOARD]: "I've analyzed your dashboard activity. You have 3 unread messages, 1 meeting today at 3 PM, and your gaming progress is at 67%. I suggest focusing on responding to messages first, then preparing for the meeting.",
        [View.CHAT]: "Based on the chat context, I can see there are active discussions in HopHub General and Dev Team. The mood seems collaborative. Consider responding to Sarah's message about the new project.",
        [View.MEETINGS]: "For your upcoming meeting, I recommend reviewing the agenda items: project updates, timeline review, and resource allocation. I can help prepare talking points.",
        [View.ARCADE]: "Your gaming stats show you're strong in Cyber Racing 2077. Try focusing on the racing line optimization and consider joining the evening gaming session with Mike.",
        [View.MUSIC]: "I can generate a playlist based on your current mood and activity. Would you prefer something energetic for focus or relaxing for creativity?",
      };
      
      setResponse(responses[currentView as keyof typeof responses] || "I'm here to help! What would you like to know?");
      setIsThinking(false);
    }, 1500);
  };

  const handleArtGeneration = async () => {
    if (!artPrompt.trim()) return;
    
    setIsThinking(true);
    
    // Simulate Leonardo AI image generation
    setTimeout(() => {
      // Generate a placeholder image URL (in real implementation, this would call Leonardo AI)
      const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(artPrompt)}/400/300.jpg`;
      setGeneratedImage(imageUrl);
      setIsThinking(false);
    }, 2000);
  };

  const handleMusicGeneration = async () => {
    if (!musicPrompt.trim()) return;
    
    setIsThinking(true);
    
    // Simulate AI playlist generation
    setTimeout(() => {
      const mockPlaylist = [
        "Cosmic Journey - Electronic Dreams",
        "Neon Nights - Synthwave Collection", 
        "Digital Horizon - Future Bass",
        "Quantum Beats - Experimental Electronic",
        "CloudHop Theme - Ambient Mix"
      ];
      setCurrentPlaylist(mockPlaylist);
      setIsThinking(false);
    }, 1500);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      right: '20px',
      bottom: '20px',
      width: '400px',
      height: '600px',
      background: 'rgba(14, 20, 48, 0.95)',
      border: '1px solid rgba(83, 200, 255, 0.3)',
      borderRadius: '16px',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, #53C8FF 0%, #A3E7FF 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px'
          }}>
            🤖
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
            Rabbit AI
          </h3>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          ✕
        </button>
      </div>

      {/* Tabs */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        gap: '8px'
      }}>
        <button
          onClick={() => setActiveTab('assistant')}
          style={{
            background: activeTab === 'assistant' ? 'rgba(83, 200, 255, 0.2)' : 'transparent',
            border: activeTab === 'assistant' ? '1px solid rgba(83, 200, 255, 0.4)' : '1px solid transparent',
            color: activeTab === 'assistant' ? '#53C8FF' : 'rgba(255, 255, 255, 0.7)',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          🧠 Assistant
        </button>
        <button
          onClick={() => setActiveTab('leonardo')}
          style={{
            background: activeTab === 'leonardo' ? 'rgba(83, 200, 255, 0.2)' : 'transparent',
            border: activeTab === 'leonardo' ? '1px solid rgba(83, 200, 255, 0.4)' : '1px solid transparent',
            color: activeTab === 'leonardo' ? '#53C8FF' : 'rgba(255, 255, 255, 0.7)',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          🎨 Leonardo
        </button>
        <button
          onClick={() => setActiveTab('music')}
          style={{
            background: activeTab === 'music' ? 'rgba(83, 200, 255, 0.2)' : 'transparent',
            border: activeTab === 'music' ? '1px solid rgba(83, 200, 255, 0.4)' : '1px solid transparent',
            color: activeTab === 'music' ? '#53C8FF' : 'rgba(255, 255, 255, 0.7)',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          🎵 Music
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Assistant Tab */}
        {activeTab === 'assistant' && (
          <>
            {/* Quick Actions */}
            <div style={{ padding: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                Quick Actions:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {getContextActions().map((action) => (
                  <button
                    key={action}
                    onClick={() => setMessage(`Help me with ${action.toLowerCase()}`)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div ref={responseRef} style={{ flex: 1, padding: '16px', overflow: 'auto' }}>
              {response && (
                <div style={{
                  background: 'rgba(83, 200, 255, 0.1)',
                  border: '1px solid rgba(83, 200, 255, 0.3)',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '14px',
                  lineHeight: '1.4',
                  color: 'white'
                }}>
                  {response}
                </div>
              )}
              {isThinking && (
                <div style={{ textAlign: 'center', padding: '20px', color: '#53C8FF' }}>
                  <div style={{ fontSize: '14px' }}>🤔 Thinking...</div>
                </div>
              )}
            </div>

            {/* Input */}
            <div style={{ padding: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAssistantMessage()}
                  placeholder="Ask Rabbit AI anything..."
                  style={{
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={handleAssistantMessage}
                  disabled={isThinking}
                  style={{
                    background: '#53C8FF',
                    color: '#000',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: isThinking ? 'not-allowed' : 'pointer'
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </>
        )}

        {/* Leonardo AI Tab */}
        {activeTab === 'leonardo' && (
          <>
            <div style={{ padding: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#53C8FF' }}>
                🎨 Leonardo AI Art Generation
              </div>
              <textarea
                value={artPrompt}
                onChange={(e) => setArtPrompt(e.target.value)}
                placeholder="Describe what you want to create..."
                style={{
                  width: '100%',
                  height: '80px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'none'
                }}
              />
              <button
                onClick={handleArtGeneration}
                disabled={isThinking}
                style={{
                  background: '#53C8FF',
                  color: '#000',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: isThinking ? 'not-allowed' : 'pointer',
                  width: '100%',
                  marginTop: '12px'
                }}
              >
                {isThinking ? 'Generating...' : 'Generate Art'}
              </button>

              {generatedImage && (
                <div style={{ marginTop: '16px' }}>
                  <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                    Generated Art:
                  </div>
                  <img
                    src={generatedImage}
                    alt="Generated art"
                    style={{
                      width: '100%',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {/* Music Tab */}
        {activeTab === 'music' && (
          <>
            <div style={{ padding: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#53C8FF' }}>
                🎵 AI Music Engine
              </div>
              <textarea
                value={musicPrompt}
                onChange={(e) => setMusicPrompt(e.target.value)}
                placeholder="Describe the mood or activity for music..."
                style={{
                  width: '100%',
                  height: '60px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'none'
                }}
              />
              <button
                onClick={handleMusicGeneration}
                disabled={isThinking}
                style={{
                  background: '#53C8FF',
                  color: '#000',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: isThinking ? 'not-allowed' : 'pointer',
                  width: '100%',
                  marginTop: '12px'
                }}
              >
                {isThinking ? 'Generating...' : 'Generate Playlist'}
              </button>

              {currentPlaylist.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                    Generated Playlist:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {currentPlaylist.map((song, index) => (
                      <div
                        key={index}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '6px',
                          padding: '8px 12px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <span style={{ fontSize: '12px', color: 'white' }}>
                          {index + 1}. {song}
                        </span>
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          style={{
                            background: 'rgba(83, 200, 255, 0.2)',
                            border: '1px solid rgba(83, 200, 255, 0.4)',
                            color: '#53C8FF',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '10px',
                            cursor: 'pointer'
                          }}
                        >
                          {isPlaying ? '⏸️' : '▶️'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIPanel;
