import React, { useState } from 'react';

interface SettingsProps {
  userId?: string;
}

const SettingsSimple: React.FC<SettingsProps> = ({ userId }) => {
  const [tab, setTab] = useState('General');
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoJoinMeetings, setAutoJoinMeetings] = useState(false);

  const menu = [
    { id: 'General', icon: '⚙️' },
    { id: 'Video & effects', icon: '📹' },
    { id: 'Audio', icon: '🎤' },
    { id: 'Notifications & sounds', icon: '🔔' },
    { id: 'Meetings', icon: '🤝' },
    { id: 'Profile', icon: '👤' },
    { id: 'Plans', icon: '💳' },
    { id: 'GitHub', icon: '🐙' },
  ];

  return (
    <div style={{
      padding: '24px',
      minHeight: '100vh',
      backgroundColor: '#050819',
      color: 'white'
    }}>
      <div style={{
        display: 'flex',
        gap: '24px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Sidebar Menu */}
        <div style={{
          width: '250px',
          background: 'rgba(26, 26, 26, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '16px',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#53C8FF'
          }}>
            Settings
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {menu.map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                style={{
                  background: tab === item.id ? 'rgba(83, 200, 255, 0.2)' : 'transparent',
                  border: tab === item.id ? '1px solid rgba(83, 200, 255, 0.4)' : '1px solid transparent',
                  color: 'white',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '14px',
                  fontWeight: tab === item.id ? '600' : '400',
                  transition: 'all 0.2s',
                  width: '100%',
                  textAlign: 'left'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = tab === item.id ? 'rgba(83, 200, 255, 0.3)' : 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = tab === item.id ? 'rgba(83, 200, 255, 0.2)' : 'transparent';
                }}
              >
                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                {item.id}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div style={{
          flex: 1,
          background: 'rgba(26, 26, 26, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '24px',
          backdropFilter: 'blur(10px)'
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: 'white'
          }}>
            {tab}
          </h1>

          {/* General Settings */}
          {tab === 'General' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#53C8FF' }}>
                  Appearance
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '4px' }}>Theme</div>
                      <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
                        Choose your preferred color theme
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => setTheme('dark')}
                        style={{
                          background: theme === 'dark' ? '#53C8FF' : 'transparent',
                          color: theme === 'dark' ? '#000' : 'white',
                          border: `1px solid ${theme === 'dark' ? '#53C8FF' : 'rgba(255, 255, 255, 0.2)'}`,
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontSize: '14px',
                          cursor: 'pointer'
                        }}
                      >
                        🌙 Dark
                      </button>
                      <button
                        onClick={() => setTheme('light')}
                        style={{
                          background: theme === 'light' ? '#53C8FF' : 'transparent',
                          color: theme === 'light' ? '#000' : 'white',
                          border: `1px solid ${theme === 'light' ? '#53C8FF' : 'rgba(255, 255, 255, 0.2)'}`,
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontSize: '14px',
                          cursor: 'pointer'
                        }}
                      >
                        ☀️ Light
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#53C8FF' }}>
                  Notifications
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '4px' }}>Desktop Notifications</div>
                      <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
                        Show notifications on your desktop
                      </div>
                    </div>
                    <button
                      onClick={() => setNotifications(!notifications)}
                      style={{
                        background: notifications ? '#53C8FF' : 'transparent',
                        color: notifications ? '#000' : 'white',
                        border: `1px solid ${notifications ? '#53C8FF' : 'rgba(255, 255, 255, 0.2)'}`,
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      {notifications ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '4px' }}>Sound Effects</div>
                      <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
                        Play sounds for notifications and actions
                      </div>
                    </div>
                    <button
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      style={{
                        background: soundEnabled ? '#53C8FF' : 'transparent',
                        color: soundEnabled ? '#000' : 'white',
                        border: `1px solid ${soundEnabled ? '#53C8FF' : 'rgba(255, 255, 255, 0.2)'}`,
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      {soundEnabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Video Settings */}
          {tab === 'Video & effects' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#53C8FF' }}>
                  Camera Settings
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '4px' }}>Camera</div>
                      <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
                        Select your camera device
                      </div>
                    </div>
                    <select style={{
                      background: '#050819',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}>
                      <option>Default Camera</option>
                      <option>HD Webcam</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '4px' }}>Video Quality</div>
                      <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
                        Choose video resolution
                      </div>
                    </div>
                    <select style={{
                      background: '#050819',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}>
                      <option>1080p HD</option>
                      <option>720p</option>
                      <option>480p</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Audio Settings */}
          {tab === 'Audio' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#53C8FF' }}>
                  Microphone Settings
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '4px' }}>Microphone</div>
                      <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
                        Select your microphone device
                      </div>
                    </div>
                    <select style={{
                      background: '#050819',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}>
                      <option>Default Microphone</option>
                      <option>Headset Mic</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Default content for other tabs */}
          {tab !== 'General' && tab !== 'Video & effects' && tab !== 'Audio' && (
            <div style={{
              padding: '40px',
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.6)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚧</div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: 'white' }}>
                Coming Soon
              </h3>
              <p style={{ fontSize: '16px' }}>
                {tab} settings are currently under development.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsSimple;
