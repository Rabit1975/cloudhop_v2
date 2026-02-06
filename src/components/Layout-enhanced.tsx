import React, { useState } from 'react';
import { View } from '../types';
import BackgroundImage from './Background-Image';

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
};

interface LayoutEnhancedProps {
  children: React.ReactNode;
  currentView: View;
  onNavigate: (view: View) => void;
  onLogout: () => void;
}

const LayoutEnhanced: React.FC<LayoutEnhancedProps> = ({
  children,
  currentView,
  onNavigate,
  onLogout,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [theme] = useState<'light' | 'dark'>('dark');

  const mainNavItems = [
    { id: View.DASHBOARD, label: 'Home', icon: professionalIcons.home },
    { id: View.CHAT, label: 'HopHub', icon: professionalIcons.chat },
    { id: View.MEETINGS, label: 'HopMeets', icon: professionalIcons.meetings },
    { id: View.SETTINGS, label: 'Settings', icon: professionalIcons.settings },
  ];

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <BackgroundImage showNebula={currentView === View.CHAT} />

      {/* Main Layout */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top Navigation Bar */}
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
              {mainNavItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  style={{
                    background: currentView === item.id ? 'rgba(83, 200, 255, 0.2)' : 'transparent',
                    border: currentView === item.id ? '1px solid #53C8FF' : '1px solid transparent',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    color:
                      currentView === item.id ? '#53C8FF' : theme === 'dark' ? 'white' : '#1E293B',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
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

            {/* Notifications */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                style={{
                  background: 'transparent',
                  border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
                  padding: '8px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  position: 'relative',
                  transition: 'all 0.2s',
                  color: theme === 'dark' ? 'white' : '#1E293B',
                }}
              >
                {professionalIcons.bell}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '8px',
                    background: theme === 'dark' ? '#080C22' : '#FFFFFF',
                    border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
                    borderRadius: '12px',
                    padding: '8px',
                    minWidth: '200px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  <div
                    style={{
                      padding: '12px',
                      fontSize: '14px',
                      color: theme === 'dark' ? '#FFFFFF' : '#1E293B',
                    }}
                  >
                    No new notifications
                  </div>
                </div>
              )}
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
                transition: 'all 0.2s',
              }}
            >
              {professionalIcons.user}
              <span style={{ marginLeft: '6px' }}>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutEnhanced;
