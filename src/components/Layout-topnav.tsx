import React, { useState } from 'react';
import { View, User } from '../types';

interface LayoutTopNavProps {
  children: React.ReactNode;
  currentView: View;
  onNavigate: (view: View) => void;
  user: User | null;
  onLogout: () => void;
}

const LayoutTopNav: React.FC<LayoutTopNavProps> = ({ children, currentView, onNavigate, user, onLogout }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const mainNavItems = [
    { id: View.DASHBOARD, label: 'Home', icon: '🏠' },
    { id: View.CHAT, label: 'HopHub', icon: '💬' },
    { id: View.MEETINGS, label: 'HopMeetings', icon: '📹' },
    { id: View.SETTINGS, label: 'Settings', icon: '⚙️' },
  ];

  const viewLabels: Record<View, string> = {
    [View.SPECTRUM]: 'The Spectrum',
    [View.DASHBOARD]: 'Home',
    [View.CHAT]: 'HopHub',
    [View.MEETINGS]: 'HopMeets',
    [View.MUSIC]: 'Music Player',
    [View.ARCADE]: 'GameHub Engine',
    [View.GAME_SERVICE]: 'CloudHop Game Service',
    [View.TWITCH]: 'Twitch',
    [View.PROFILE]: 'Digital ID',
    [View.SETTINGS]: 'System Config',
    [View.AI_TOOLS]: 'AI Agent Studio',
    [View.AUTH]: 'Authentication',
  };

  return (
    <div style={{
      backgroundColor: '#050819',
      color: 'white',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Fixed Top Navigation Bar */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        backgroundColor: '#080C22',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        backdropFilter: 'blur(12px)'
      }}>
        {/* Logo and Brand */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: 'linear-gradient(135deg, #53C8FF 0%, #A3E7FF 100%)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '16px',
            color: '#000',
            boxShadow: '0 4px 20px rgba(83, 200, 255, 0.3)'
          }}>
            CH
          </div>
          <span style={{
            fontSize: '20px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #53C8FF 0%, #A3E7FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            CloudHop
          </span>
        </div>

        {/* Main Navigation */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                background: currentView === item.id 
                  ? 'linear-gradient(135deg, #53C8FF 0%, #4AB8FF 100%)' 
                  : 'transparent',
                color: currentView === item.id ? '#000' : 'white',
                border: currentView === item.id ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                padding: '10px 18px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseOver={(e) => {
                if (currentView !== item.id) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }
              }}
              onMouseOut={(e) => {
                if (currentView !== item.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }
              }}
            >
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          {/* Search */}
          <button style={{
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '8px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}>
            🔍
          </button>

          {/* Notifications */}
          <button style={{
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '8px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            position: 'relative',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}>
            🔔
            <div style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '8px',
              height: '8px',
              background: '#FF6B6B',
              borderRadius: '50%'
            }} />
          </button>

          {/* User Profile */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
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
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                background: '#000',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px'
              }}>
                👤
              </div>
              User
              <span style={{ fontSize: '12px' }}>▼</span>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                background: '#080C22',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '8px',
                minWidth: '180px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
              }}>
                <button
                  onClick={() => {
                    onNavigate(View.PROFILE);
                    setShowProfileMenu(false);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left',
                    fontSize: '14px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  👤 Profile
                </button>
                <button
                  onClick={() => {
                    onNavigate(View.SETTINGS);
                    setShowProfileMenu(false);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left',
                    fontSize: '14px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  ⚙️ Settings
                </button>
                <div style={{
                  height: '1px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  margin: '4px 0'
                }} />
                <button
                  onClick={onLogout}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#FF6B6B',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left',
                    fontSize: '14px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 107, 107, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{
        flex: 1,
        marginTop: '70px',
        overflow: 'auto'
      }}>
        {children}
      </main>
    </div>
  );
};

export default LayoutTopNav;
