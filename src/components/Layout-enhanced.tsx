import React, { useState, useEffect } from 'react';
import { View } from '../types';
import AIToolsIntegrated from './AI-Tools-Integrated';
import BackgroundImage from './Background-Image';

interface LayoutEnhancedProps {
  children: React.ReactNode;
  currentView: View;
  onNavigate: (view: View) => void;
  user: any;
  onLogout: () => void;
}

const LayoutEnhanced: React.FC<LayoutEnhancedProps> = ({
  children,
  currentView,
  onNavigate,
  user,
  onLogout,
}) => {
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showQuickSettings, setShowQuickSettings] = useState(false);
  const [userStatus, setUserStatus] = useState<'online' | 'away' | 'busy' | 'invisible'>('online');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New message from Sarah',
      message: 'Hey! Are you free for a quick call?',
      time: '2 min ago',
      read: false,
    },
    {
      id: 2,
      title: 'HopSpace update',
      message: 'Your team completed the project milestone!',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      title: 'System maintenance',
      message: 'CloudHop will be updated tonight at 2 AM',
      time: '3 hours ago',
      read: true,
    },
  ]);

  // Puter.js script loading disabled due to CSP restrictions
  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = 'https://js.puter.com/v2/';
  //   script.async = true;
  //   document.head.appendChild(script);

  //   return () => {
  //     if (document.head.contains(script)) {
  //       document.head.removeChild(script);
  //     }
  //   };
  // }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Status colors for user presence
  const statusColors = {
    online: '#4CAF50',
    away: '#FF9800',
    busy: '#F44336',
    invisible: '#9E9E9E',
  };

  // Professional SVG icons
  const professionalIcons = {
    home: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
    chat: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    video: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="23,7 16,12 23,17 23,7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    settings: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 1.54l4.24 4.24M20.46 20.46l-4.24-4.24M1.54 20.46l4.24-4.24" />
      </svg>
    ),
    search: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
    lightning: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
      </svg>
    ),
    bell: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    user: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    chevronDown: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="6,9 12,15 18,9" />
      </svg>
    ),
    chevronUp: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="18,15 12,9 6,15" />
      </svg>
    ),
  };

  const statusLabels = {
    online: 'Online',
    away: 'Away',
    busy: 'Busy',
    invisible: 'Invisible',
  };

  const mainNavItems = [
    { id: View.DASHBOARD, label: 'Home', icon: professionalIcons.home },
    { id: View.CHAT, label: 'HopHub', icon: professionalIcons.chat },
    { id: View.MUSIC, label: 'Music', icon: '🎵' },
    { id: View.TWITCH, label: 'Twitch', icon: '🎮' },
    { id: View.ARCADE, label: 'GameHub', icon: '🎯' },
    { id: View.SETTINGS, label: 'Settings', icon: professionalIcons.settings },
  ];

  const handleNotificationClick = (notificationId: number) => {
    setNotifications(prev => prev.map(n => (n.id === notificationId ? { ...n, read: true } : n)));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <>
      {/* Background Image */}
      <BackgroundImage opacity={0.8} blur={0} />

      {/* Layout Container */}
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: theme === 'dark' ? '#050819' : '#F8FAFC',
          color: theme === 'dark' ? 'white' : '#1E293B',
          position: 'relative',
        }}
      >
        {/* Top Navigation Bar */}
        <header
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '70px',
            background:
              'linear-gradient(135deg, rgba(26, 32, 44, 0.95) 0%, rgba(5, 8, 25, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            borderBottom: '2px solid #53C8FF',
            boxShadow: '0 4px 20px rgba(83, 200, 255, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            zIndex: 1000,
          }}
        >
          {/* Logo and Brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #53C8FF 0%, #A3E7FF 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '18px',
                color: '#000',
                boxShadow: '0 4px 12px rgba(83, 200, 255, 0.3)',
                border: '2px solid #53C8FF',
              }}
            >
              CH
            </div>
            <h1
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #53C8FF 0%, #A3E7FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                color: '#53C8FF',
                textShadow: '0 0 20px rgba(83, 200, 255, 0.5)',
              }}
            >
              CloudHop
            </h1>
          </div>

          {/* Main Navigation */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {mainNavItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                style={{
                  background:
                    currentView === item.id
                      ? 'linear-gradient(135deg, #53C8FF 0%, #4AB8FF 100%)'
                      : 'transparent',
                  color: currentView === item.id ? '#000' : theme === 'dark' ? 'white' : '#1E293B',
                  border:
                    currentView === item.id
                      ? 'none'
                      : `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseOver={e => {
                  if (currentView !== item.id) {
                    e.currentTarget.style.backgroundColor =
                      theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
                  }
                }}
                onMouseOut={e => {
                  if (currentView !== item.id) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {/* Search */}
            <button
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
                transition: 'all 0.2s',
                color: theme === 'dark' ? 'white' : '#1E293B',
              }}
              onMouseOver={e => {
                e.currentTarget.style.backgroundColor =
                  theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {professionalIcons.search}
            </button>

            {/* Quick Settings Toggle */}
            <button
              onClick={() => setShowQuickSettings(!showQuickSettings)}
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
                transition: 'all 0.2s',
                color: theme === 'dark' ? 'white' : '#1E293B',
              }}

          {/* Quick Settings Toggle */}
          <button
            onClick={() => setShowQuickSettings(!showQuickSettings)}
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
              transition: 'all 0.2s',
              color: theme === 'dark' ? 'white' : '#1E293B',
            }}
          >
            {professionalIcons.lightning}
          </button>

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
              {unreadCount > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    width: '8px',
                    height: '8px',
                    background: '#FF6B6B',
                    borderRadius: '50%',
                  }}
                />
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div
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
                {unreadCount > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      width: '8px',
                      height: '8px',
                      background: '#FF6B6B',
                      borderRadius: '50%',
                    }}
                  />
                )}
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
                    minWidth: '320px',
                    maxHeight: '400px',
                    overflow: 'auto',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 12px',
                      borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                      marginBottom: '8px',
                    }}
                  >
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#53C8FF',
                          fontSize: '12px',
                          cursor: 'pointer',
                          padding: '4px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification.id)}
                      style={{
                        background: notification.read
                          ? 'transparent'
                          : theme === 'dark'
                            ? 'rgba(83, 200, 255, 0.1)'
                            : 'rgba(83, 200, 255, 0.05)',
                        border: notification.read
                          ? 'none'
                          : `1px solid ${theme === 'dark' ? 'rgba(83, 200, 255, 0.3)' : 'rgba(83, 200, 255, 0.2)'}`,
                        borderRadius: '8px',
                        padding: '12px',
                        marginBottom: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            background: 'linear-gradient(135deg, #53C8FF 0%, #4AB8FF 100%)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '16px',
                            flexShrink: 0,
                          }}
                        >
                          {notification.type === 'message'
                            ? '💬'
                            : notification.type === 'meeting'
                              ? '📹'
                              : notification.type === 'game'
                                ? '🎮'
                                : '🔔'}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginBottom: '4px',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '13px',
                                fontWeight: '600',
                                color: theme === 'dark' ? 'white' : '#1E293B',
                              }}
                            >
                              {notification.title}
                            </span>
                            <span
                              style={{
                                fontSize: '11px',
                                color:
                                  theme === 'dark'
                                    ? 'rgba(255, 255, 255, 0.6)'
                                    : 'rgba(0, 0, 0, 0.6)',
                              }}
                            >
                              {notification.time}
                            </span>
                          </div>
                          <p
                            style={{
                              fontSize: '12px',
                              color:
                                theme === 'dark'
                                  ? 'rgba(255, 255, 255, 0.8)'
                                  : 'rgba(0, 0, 0, 0.7)',
                              margin: 0,
                            }}
                          >
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

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
                  transition: 'all 0.2s',
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    background: '#000',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    position: 'relative',
                  }}
                >
                  {professionalIcons.user}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      right: '-2px',
                      width: '8px',
                      height: '8px',
                      background: statusColors[userStatus],
                      borderRadius: '50%',
                      border: '2px solid #53C8FF',
                    }}
                  />
                </div>
                User
                <span style={{ fontSize: '12px' }}>▼</span>
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
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
                  {/* Status Selector */}
                  <div style={{ padding: '8px 12px', marginBottom: '8px' }}>
                    <p
                      style={{
                        fontSize: '12px',
                        color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                        marginBottom: '8px',
                      }}
                    >
                      Status
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {Object.entries(statusLabels).map(([status, label]) => (
                        <button
                          key={status}
                          onClick={() => setUserStatus(status as any)}
                          style={{
                            background:
                              userStatus === status ? 'rgba(83, 200, 255, 0.1)' : 'transparent',
                            border:
                              userStatus === status ? '1px solid rgba(83, 200, 255, 0.3)' : 'none',
                            color: theme === 'dark' ? 'white' : '#1E293B',
                            padding: '6px 8px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '13px',
                            width: '100%',
                            textAlign: 'left',
                          }}
                        >
                          <div
                            style={{
                              width: '8px',
                              height: '8px',
                              background: statusColors[status as keyof typeof statusColors],
                              borderRadius: '50%',
                            }}
                          />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      height: '1px',
                      background:
                        theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                      margin: '8px 0',
                    }}
                  />

                  <button
                    onClick={() => {
                      onNavigate(View.PROFILE);
                      setShowProfileMenu(false);
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: theme === 'dark' ? 'white' : '#1E293B',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'left',
                      fontSize: '14px',
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
                      color: theme === 'dark' ? 'white' : '#1E293B',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'left',
                      fontSize: '14px',
                    }}
                  >
                    ⚙️ Global Settings
                  </button>
                  <div
                    style={{
                      height: '1px',
                      background:
                        theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                      margin: '8px 0',
                    }}
                  />
                  <button
                    onClick={onLogout}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#FF6B6B',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'left',
                      fontSize: '14px',
                    }}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Quick Settings Panel */}
        {showQuickSettings && (
          <div
            style={{
              position: 'fixed',
              top: '80px',
              right: '24px',
              background: theme === 'dark' ? '#080C22' : '#FFFFFF',
              border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
              borderRadius: '12px',
              padding: '16px',
              minWidth: '280px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              zIndex: 999,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <span style={{ fontSize: '16px', fontWeight: '600' }}>Quick Settings</span>
              <button
                onClick={() => setShowQuickSettings(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: theme === 'dark' ? 'white' : '#1E293B',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '4px',
                }}
              >
                ×
              </button>
            </div>

            {/* Theme Toggle */}
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  fontSize: '14px',
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
                  marginBottom: '8px',
                  display: 'block',
                }}
              >
                Theme
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setTheme('dark')}
                  style={{
                    background: theme === 'dark' ? '#53C8FF' : 'transparent',
                    color: theme === 'dark' ? '#000' : theme === 'dark' ? 'white' : '#1E293B',
                    border: `1px solid ${theme === 'dark' ? '#53C8FF' : 'rgba(0, 0, 0, 0.2)'}`,
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    flex: 1,
                  }}
                >
                  🌙 Dark
                </button>
                <button
                  onClick={() => setTheme('light')}
                  style={{
                    background: theme === 'light' ? '#53C8FF' : 'transparent',
                    color: theme === 'light' ? '#000' : theme === 'dark' ? 'white' : '#1E293B',
                    border: `1px solid ${theme === 'light' ? '#53C8FF' : 'rgba(0, 0, 0, 0.2)'}`,
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    flex: 1,
                  }}
                >
                  ☀️ Light
                </button>
              </div>
            </div>

            {/* Contextual Settings Links */}
            <div
              style={{
                borderTop: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                paddingTop: '12px',
                marginTop: '12px',
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                  marginBottom: '8px',
                }}
              >
                Contextual Settings
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {currentView === View.MEETINGS && (
                  <button
                    onClick={() => {
                      /* Navigate to meeting settings */
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#53C8FF',
                      fontSize: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      padding: '4px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    📹 Meeting Settings
                  </button>
                )}
                {currentView === View.CHAT && (
                  <button
                    onClick={() => {
                      /* Navigate to HopHub settings */
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#53C8FF',
                      fontSize: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      padding: '4px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    💬 HopHub Settings
                  </button>
                )}
                <button
                  onClick={() => {
                    onNavigate(View.SETTINGS);
                    setShowQuickSettings(false);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#53C8FF',
                    fontSize: '12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    padding: '4px 8px',
                    borderRadius: '4px',
                  }}
                >
                  ⚙️ Global Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main
          style={{
            flex: 1,
            marginTop: '70px',
            overflow: 'auto',
          }}
        >
          {children}
        </main>
      </div>

      {/* AI Tools Integrated */}
      {/* AI Tools Panel - Disabled due to CSP issues */}
      {/* {showAITools && (
        <AIToolsIntegrated
          currentView={currentView}
          isVisible={showAITools}
          onClose={() => setShowAITools(false)}
        />
      )} */}
    </>
  );
};

export default LayoutEnhanced;
