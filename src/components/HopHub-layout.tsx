import React, { useState } from 'react';
import { View } from '../types';
import GameHub from './GameHub-component';
import BackgroundImage from './Background-Image';

interface HopHubWrapperProps {
  children: React.ReactNode;
  currentView: View;
  onNavigate: (view: View) => void;
  onLogout: () => void;
}

// Simple icon fallbacks
const professionalIcons = {
  home: '🏠',
  chat: '💬',
  settings: '⚙️',
  search: '🔍',
  bell: '🔔',
  user: '👤',
  logout: '🚪',
  lightning: '⚡',
  meetings: '🤹',
  plus: '➕',
};

const HopHubWrapper: React.FC<HopHubWrapperProps> = ({
  children,
  currentView,
  onNavigate,
  onLogout,
}) => {
  const [selectedSubTab, setSelectedSubTab] = useState<string>('hophub');
  const [selectedChannel, setSelectedChannel] = useState<string>('general');
  const [messageInput, setMessageInput] = useState<string>('');
  const [messages, setMessages] = useState<
    Array<{ id: string; user: string; content: string; timestamp: string; color: string }>
  >([
    {
      id: '1',
      user: 'User',
      content: 'Welcome to general channel! 🎉',
      timestamp: '2:45 PM',
      color: '#53C8FF',
    },
    {
      id: '2',
      user: 'Admin',
      content: 'This is where we can chat about anything! 🚀',
      timestamp: '2:47 PM',
      color: '#10B981',
    },
  ]);
  const [theme] = useState<'light' | 'dark'>('dark');

  // Chat functionality
  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        user: 'You',
        content: messageInput,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        color: '#53C8FF',
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  const handleChannelSelect = (channelId: string) => {
    setSelectedChannel(channelId);
    console.log(`Switched to #${channelId} channel`);
  };

  const subNavItems = [
    { id: 'hophub', label: 'HopHub', icon: professionalIcons.chat },
    { id: 'music', label: 'Music', icon: '🎵' },
    { id: 'gamehub', label: 'GameHub', icon: '🎮' },
    { id: 'spaces', label: 'Spaces', icon: '🎨' },
  ];

  // Render left sidebar content based on sub-tab selection
  const getLeftSidebarContent = () => {
    switch (selectedSubTab) {
      case 'hophub':
        return (
          <div style={{ padding: '16px' }}>
            {/* Groups Section */}
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}
              >
                <h3 style={{ color: '#53C8FF', fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
                  👥 Groups
                </h3>
                <button
                  onClick={() => console.log('Add new group')}
                  style={{
                    background: 'linear-gradient(135deg, #53C8FF, #A3E7FF)',
                    border: 'none',
                    borderRadius: '6px',
                    width: '28px',
                    height: '28px',
                    color: 'white',
                    fontSize: '18px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  +
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <button
                  onClick={() => console.log('Joined Gaming Crew group')}
                  style={{
                    background: 'rgba(83, 200, 255, 0.1)',
                    border: '1px solid #53C8FF',
                    padding: '10px',
                    borderRadius: '6px',
                    color: '#53C8FF',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                    transition: 'all 0.2s',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>👥 Gaming Crew</span>
                    <span style={{ fontSize: '12px', opacity: '0.7' }}>24</span>
                  </div>
                </button>
                <button
                  onClick={() => console.log('Joined Music Lovers group')}
                  style={{
                    background: 'rgba(83, 200, 255, 0.1)',
                    border: '1px solid #53C8FF',
                    padding: '10px',
                    borderRadius: '6px',
                    color: '#53C8FF',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                    transition: 'all 0.2s',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>🎵 Music Lovers</span>
                    <span style={{ fontSize: '12px', opacity: '0.7' }}>42</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Channels Section */}
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}
              >
                <h3 style={{ color: '#53C8FF', fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
                  📢 Channels
                </h3>
                <button
                  onClick={() => console.log('Add new channel')}
                  style={{
                    background: 'linear-gradient(135deg, #53C8FF, #A3E7FF)',
                    border: 'none',
                    borderRadius: '6px',
                    width: '28px',
                    height: '28px',
                    color: 'white',
                    fontSize: '18px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  +
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <button
                  onClick={() => handleChannelSelect('announcements')}
                  style={{
                    background: 'rgba(83, 200, 255, 0.1)',
                    border: '1px solid #53C8FF',
                    padding: '10px',
                    borderRadius: '6px',
                    color: '#53C8FF',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                    transition: 'all 0.2s',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>📢 #announcements</span>
                    <span style={{ fontSize: '12px', opacity: '0.7' }}>150</span>
                  </div>
                </button>
                <button
                  onClick={() => handleChannelSelect('general')}
                  style={{
                    background:
                      selectedChannel === 'general'
                        ? 'rgba(83, 200, 255, 0.2)'
                        : 'rgba(83, 200, 255, 0.1)',
                    border:
                      selectedChannel === 'general' ? '2px solid #53C8FF' : '1px solid #53C8FF',
                    padding: '10px',
                    borderRadius: '6px',
                    color: '#53C8FF',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                    transition: 'all 0.2s',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>💬 #general</span>
                    <span style={{ fontSize: '12px', opacity: '0.7' }}>89</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );
      case 'music':
        return (
          <div style={{ padding: '16px' }}>
            <h3
              style={{
                color: '#53C8FF',
                marginBottom: '16px',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              🎵 YouTube Music
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => console.log('Playing Lofi Hip Hop')}
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid #10B981',
                  padding: '12px',
                  borderRadius: '6px',
                  color: '#10B981',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                🎵 Lofi Hip Hop Radio
              </button>
              <button
                onClick={() => console.log('Playing Chill Vibes')}
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid #10B981',
                  padding: '12px',
                  borderRadius: '6px',
                  color: '#10B981',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                🎸 Chill Vibes
              </button>
            </div>
          </div>
        );
      case 'gamehub':
        return (
          <div style={{ padding: '16px' }}>
            <h3
              style={{
                color: '#53C8FF',
                marginBottom: '16px',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              🎮 Game Hub
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => console.log('Loading Unity Games')}
                style={{
                  background: 'rgba(251, 146, 60, 0.1)',
                  border: '1px solid #FB923C',
                  padding: '12px',
                  borderRadius: '6px',
                  color: '#FB923C',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                🎮 Unity WebGL Games
              </button>
              <button
                onClick={() => console.log('Loading HTML5 Games')}
                style={{
                  background: 'rgba(251, 146, 60, 0.1)',
                  border: '1px solid #FB923C',
                  padding: '12px',
                  borderRadius: '6px',
                  color: '#FB923C',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                🌐 HTML5 Games
              </button>
            </div>
          </div>
        );
      case 'spaces':
        return (
          <div style={{ padding: '16px' }}>
            <h3
              style={{
                color: '#53C8FF',
                marginBottom: '16px',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              ✨ Creative Spaces
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => console.log('Opening Fluid Art Canvas')}
                style={{
                  background: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid #8B5CF6',
                  padding: '12px',
                  borderRadius: '6px',
                  color: '#8B5CF6',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                🎨 Fluid Art Canvas
              </button>
              <button
                onClick={() => console.log('Opening AI Art Generator')}
                style={{
                  background: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid #8B5CF6',
                  padding: '12px',
                  borderRadius: '6px',
                  color: '#8B5CF6',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                🤖 AI Art Generator
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div style={{ padding: '16px' }}>
            <h3 style={{ color: '#53C8FF', marginBottom: '8px' }}>HopHub</h3>
            <div style={{ color: 'white' }}>Select a sub-section from navigation above.</div>
          </div>
        );
    }
  };

  // Render main content based on sub-tab selection
  const renderMainContent = () => {
    switch (selectedSubTab) {
      case 'hophub':
        return (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Chat Header */}
            <div
              style={{
                background: 'rgba(83, 200, 255, 0.1)',
                border: '1px solid #53C8FF',
                borderRadius: '12px 12px 0 0',
                padding: '16px',
                marginBottom: '1px',
              }}
            >
              <h3 style={{ color: '#53C8FF', fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
                💬 #{selectedChannel}
              </h3>
              <p style={{ color: 'white', fontSize: '14px', margin: '4px 0 0 0' }}>
                {selectedChannel === 'general'
                  ? 'General discussion channel • 89 members'
                  : 'Announcements channel • 150 members'}
              </p>
            </div>

            {/* Messages Area */}
            <div
              style={{
                flex: 1,
                background: 'rgba(15, 23, 42, 0.3)',
                padding: '16px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {/* Render messages dynamically */}
              {messages.map(message => (
                <div
                  key={message.id}
                  style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${message.color}, ${message.color}CC)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '16px',
                    }}
                  >
                    {message.user[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '4px',
                      }}
                    >
                      <span style={{ color: message.color, fontWeight: 'bold', fontSize: '14px' }}>
                        {message.user}
                      </span>
                      <span style={{ color: '#888', fontSize: '12px' }}>{message.timestamp}</span>
                    </div>
                    <div
                      style={{
                        background: 'rgba(83, 200, 255, 0.1)',
                        border: '1px solid #53C8FF',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        color: 'white',
                        fontSize: '14px',
                        display: 'inline-block',
                      }}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid #53C8FF',
                borderRadius: '0 0 12px 12px',
                padding: '16px',
                display: 'flex',
                gap: '12px',
              }}
            >
              <input
                type="text"
                value={messageInput}
                onChange={e => setMessageInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                placeholder={`Message #${selectedChannel}`}
                style={{
                  flex: 1,
                  background: 'rgba(83, 200, 255, 0.1)',
                  border: '1px solid #53C8FF',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              <button
                onClick={handleSendMessage}
                style={{
                  background: 'linear-gradient(135deg, #53C8FF, #A3E7FF)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Send
              </button>
              <div style={{ textAlign: 'center', color: 'white' }}>
                <iframe
                  width="100%"
                  height="300"
                  src="https://www.youtube.com/embed/jfKfPfyJRdk"
                  style={{
                    borderRadius: '12px',
                    border: '2px solid #10B981',
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <p style={{ fontSize: '14px', marginTop: '12px', color: '#10B981' }}>
                  🎵 Lofi Hip Hop Radio - 24/7 Study Beats
                </p>
              </div>
            </div>

            {/* Music Controls */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid #10B981',
                borderRadius: '0 0 12px 12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <button
                onClick={() => console.log('Previous track')}
                style={{
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid #10B981',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  color: '#10B981',
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
              >
                ⏮️
              </button>
              <button
                onClick={() => console.log('Play/Pause')}
                style={{
                  background: 'linear-gradient(135deg, #10B981, #34D399)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '56px',
                  height: '56px',
                  color: 'white',
                  fontSize: '24px',
                  cursor: 'pointer',
                }}
              >
                ▶️
              </button>
              <button
                onClick={() => console.log('Next track')}
                style={{
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid #10B981',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  color: '#10B981',
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
              >
                ⏭️
              </button>
            </div>
          </div>
        );
      case 'gamehub':
        return <GameHub />;
      case 'spaces':
        return (
          <div style={{ padding: '16px' }}>
            <h3
              style={{
                color: '#53C8FF',
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: 'bold',
              }}
            >
              ✨ Creative Studio
            </h3>
            <div
              style={{
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid #8B5CF6',
                borderRadius: '12px',
                padding: '20px',
                minHeight: '300px',
              }}
            >
              <div style={{ textAlign: 'center', color: 'white' }}>
                <span style={{ fontSize: '48px', marginBottom: '16px', display: 'block' }}>✨</span>
                <p style={{ fontSize: '18px', marginBottom: '8px' }}>Fluid Art Canvas</p>
                <p style={{ fontSize: '14px', color: '#8B5CF6' }}>Coming soon</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div style={{ padding: '16px' }}>
            <h3 style={{ color: '#53C8FF', marginBottom: '8px' }}>HopHub</h3>
            <div style={{ color: 'white' }}>Select a sub-section from navigation above.</div>
          </div>
        );
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Nebula Background - Only for HopHub */}
      <BackgroundImage showNebula={true} />

      {/* Main Navigation Bar */}
      <div
        style={{
          height: '60px',
          background: theme === 'dark' ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          zIndex: 1000,
        }}
      >
        {/* Left Side - Logo and Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #53C8FF 0%, #A3E7FF 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            >
              CH
            </div>
            <div>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #53C8FF 0%, #A3E7FF 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: '#53C8FF',
                  textShadow: '0 0 20px rgba(83, 200, 255, 0.5)',
                }}
              >
                CloudHop
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <nav style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={() => onNavigate(View.DASHBOARD)}
              style={{
                background:
                  currentView === View.DASHBOARD ? 'rgba(83, 200, 255, 0.2)' : 'transparent',
                border:
                  currentView === View.DASHBOARD ? '1px solid #53C8FF' : '1px solid transparent',
                padding: '8px 12px',
                borderRadius: '6px',
                color:
                  currentView === View.DASHBOARD
                    ? '#53C8FF'
                    : theme === 'dark'
                      ? 'white'
                      : '#1E293B',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ fontSize: '16px' }}>{professionalIcons.home}</span>
              Home
            </button>
            <button
              onClick={() => onNavigate(View.CHAT)}
              style={{
                background: currentView === View.CHAT ? 'rgba(83, 200, 255, 0.2)' : 'transparent',
                border: currentView === View.CHAT ? '1px solid #53C8FF' : '1px solid transparent',
                padding: '8px 12px',
                borderRadius: '6px',
                color:
                  currentView === View.CHAT ? '#53C8FF' : theme === 'dark' ? 'white' : '#1E293B',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ fontSize: '16px' }}>{professionalIcons.chat}</span>
              HopHub
            </button>
            <button
              onClick={() => onNavigate(View.MEETINGS)}
              style={{
                background:
                  currentView === View.MEETINGS ? 'rgba(83, 200, 255, 0.2)' : 'transparent',
                border:
                  currentView === View.MEETINGS ? '1px solid #53C8FF' : '1px solid transparent',
                padding: '8px 12px',
                borderRadius: '6px',
                color:
                  currentView === View.MEETINGS
                    ? '#53C8FF'
                    : theme === 'dark'
                      ? 'white'
                      : '#1E293B',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ fontSize: '16px' }}>{professionalIcons.meetings}</span>
              HopMeets
            </button>
            <button
              onClick={() => onNavigate(View.SETTINGS)}
              style={{
                background:
                  currentView === View.SETTINGS ? 'rgba(83, 200, 255, 0.2)' : 'transparent',
                border:
                  currentView === View.SETTINGS ? '1px solid #53C8FF' : '1px solid transparent',
                padding: '8px 12px',
                borderRadius: '6px',
                color:
                  currentView === View.SETTINGS
                    ? '#53C8FF'
                    : theme === 'dark'
                      ? 'white'
                      : '#1E293B',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ fontSize: '16px' }}>{professionalIcons.settings}</span>
              Settings
            </button>
          </nav>
        </div>

        {/* Right Side - Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Search */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <input
              type="text"
              placeholder="Search apps, files, people..."
              style={{
                background: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
                padding: '8px 12px 8px 36px',
                borderRadius: '6px',
                color: theme === 'dark' ? 'white' : '#1E293B',
                fontSize: '14px',
                width: '240px',
                outline: 'none',
              }}
            />
            <button
              style={{
                position: 'absolute',
                right: '8px',
                background: 'transparent',
                border: 'none',
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              {professionalIcons.search}
            </button>
          </div>

          {/* User Profile */}
          <button
            onClick={onLogout}
            style={{
              background: 'linear-gradient(135deg, #53C8FF 0%, #4AB8FF 100%)',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#000',
            }}
          >
            {professionalIcons.user}
            <span style={{ marginLeft: '6px' }}>Logout</span>
          </button>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div
        style={{
          height: '50px',
          background: theme === 'dark' ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          gap: '16px',
        }}
      >
        {subNavItems.map(item => (
          <button
            key={item.id}
            onClick={() => setSelectedSubTab(item.id)}
            style={{
              background: selectedSubTab === item.id ? 'rgba(83, 200, 255, 0.2)' : 'transparent',
              border: selectedSubTab === item.id ? '1px solid #53C8FF' : '1px solid transparent',
              padding: '8px 16px',
              borderRadius: '6px',
              color:
                selectedSubTab === item.id ? '#53C8FF' : theme === 'dark' ? 'white' : '#1E293B',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '16px' }}>{item.icon}</span>
            <span style={{ fontWeight: 'medium' }}>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr 320px',
          height: 'calc(100vh - 110px)', // 60px main nav + 50px sub nav
          gap: '16px',
          padding: '0 20px',
        }}
      >
        {/* Left Sidebar */}
        <div
          style={{
            background: theme === 'dark' ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.5)',
            borderRight: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            overflow: 'auto',
          }}
        >
          {getLeftSidebarContent()}
        </div>

        {/* Middle Area */}
        <div
          style={{
            background: theme === 'dark' ? 'rgba(5, 8, 25, 0.3)' : 'rgba(255, 255, 255, 0.3)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {renderMainContent()}
        </div>

        {/* Right Sidebar - AI Assistant */}
        <div
          style={{
            background: theme === 'dark' ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.5)',
            borderLeft: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            padding: '16px',
            overflow: 'auto',
          }}
        >
          <div
            style={{
              background:
                'linear-gradient(135deg, rgba(83, 200, 255, 0.1) 0%, rgba(163, 231, 255, 0.1) 100%)',
              border: '1px solid rgba(83, 200, 255, 0.3)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '16px',
            }}
          >
            <h3 style={{ color: '#53C8FF', marginBottom: '12px', fontSize: '16px' }}>
              🤖 AI Assistant
            </h3>
            <div style={{ color: theme === 'dark' ? 'white' : '#1E293B', fontSize: '14px' }}>
              Hello! I'm your AI assistant. How can I help you today?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HopHubWrapper;
