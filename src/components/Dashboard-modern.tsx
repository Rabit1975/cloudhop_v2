import React, { useState, useEffect } from 'react';
import { View } from '../types';

interface DashboardProps {
  onNavigate: (view: View) => void;
}

const DashboardModern: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [userStats, setUserStats] = useState({
    totalChannels: 12,
    activeChannels: 3,
    totalChats: 28,
    unreadMessages: 7,
    gamingHours: 156,
    lastGame: 'Cyber Racing 2077',
    lastPlayed: '2 hours ago',
    meetingsToday: 2,
    nextMeeting: 'Team Standup - 3:00 PM',
  });

  const [recentActivity] = useState([
    {
      type: 'chat',
      title: 'HopHub General',
      message: 'Sarah: Hey everyone!',
      time: '5 min ago',
      icon: '💬',
    },
    {
      type: 'game',
      title: 'Cyber Racing 2077',
      message: 'New high score achieved!',
      time: '2 hours ago',
      icon: '🎮',
    },
    {
      type: 'meeting',
      title: 'Design Review',
      message: 'Meeting ended successfully',
      time: '3 hours ago',
      icon: '📹',
    },
    {
      type: 'channel',
      title: 'Dev Team',
      message: 'New project created',
      time: '5 hours ago',
      icon: '📢',
    },
  ]);

  const [quickActions] = useState([
    {
      title: 'Start Meeting',
      icon: '📹',
      action: () => onNavigate(View.MEETINGS),
      color: '#53C8FF',
    },
    { title: 'Join HopHub', icon: '💬', action: () => onNavigate(View.CHAT), color: '#53C8FF' },
    { title: 'Play Games', icon: '🎮', action: () => onNavigate(View.ARCADE), color: '#53C8FF' },
    { title: 'Music', icon: '🎵', action: () => onNavigate(View.MUSIC), color: '#53C8FF' },
  ]);

  // Professional SVG icons
  const professionalIcons = {
    meeting: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M23 7l-7 5 7 5V7z" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
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
    game: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M6 12h4" />
        <path d="M14 12h4" />
      </svg>
    ),
    music: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
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

  // State for collapsible sections
  const [isChannelsExpanded, setIsChannelsExpanded] = useState(true);
  const [isGamingExpanded, setIsGamingExpanded] = useState(true);
  const [isActivityExpanded, setIsActivityExpanded] = useState(true);

  const [channels] = useState([
    { name: 'HopHub General', members: 245, active: true, unread: 3 },
    { name: 'Dev Team', members: 18, active: true, unread: 0 },
    { name: 'Gaming Squad', members: 67, active: false, unread: 1 },
    { name: 'Music Lounge', members: 89, active: false, unread: 0 },
  ]);

  const [games] = useState([
    { name: 'Cyber Racing 2077', lastPlayed: '2 hours ago', progress: 67, hours: 45 },
    { name: 'Space Warriors', lastPlayed: 'Yesterday', progress: 23, hours: 12 },
    { name: 'Puzzle Master', lastPlayed: '3 days ago', progress: 89, hours: 8 },
  ]);

  return (
    <div
      style={{
        padding: '16px',
        minHeight: '100vh',
        backgroundColor: '#050819',
        color: 'white',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '4px',
              background: 'linear-gradient(135deg, #53C8FF 0%, #A3E7FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Welcome back!
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            Here's what's happening in your CloudHop space today
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
          }}
        >
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              style={{
                background: `linear-gradient(135deg, ${action.color} 0%, ${action.color}CC 100%)`,
                color: '#000',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s',
                boxShadow: `0 2px 12px ${action.color}33`,
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = `0 4px 20px ${action.color}44`;
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 2px 12px ${action.color}33`;
              }}
            >
              <span style={{ fontSize: '14px' }}>{action.icon}</span>
              {action.title}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            background: 'rgba(26, 26, 26, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            padding: '14px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p
                style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '2px' }}
              >
                Active Channels
              </p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#53C8FF' }}>
                {userStats.activeChannels}
              </p>
              <p style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)' }}>
                of {userStats.totalChannels} total
              </p>
            </div>
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
              }}
            >
              💬
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(26, 26, 26, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            padding: '14px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p
                style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '2px' }}
              >
                Unread Messages
              </p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#53C8FF' }}>
                {userStats.unreadMessages}
              </p>
              <p style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)' }}>
                across {userStats.totalChats} chats
              </p>
            </div>
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
              }}
            >
              📬
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(26, 26, 26, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            padding: '14px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p
                style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '2px' }}
              >
                Gaming Hours
              </p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#53C8FF' }}>
                {userStats.gamingHours}
              </p>
              <p style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)' }}>total playtime</p>
            </div>
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
              }}
            >
              🎮
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(26, 26, 26, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            padding: '14px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p
                style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '2px' }}
              >
                Meetings Today
              </p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#53C8FF' }}>
                {userStats.meetingsToday}
              </p>
              <p style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)' }}>
                next: {userStats.nextMeeting}
              </p>
            </div>
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
              }}
            >
              📹
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div
        style={{
          display: 'grid',

{isChannelsExpanded && (
<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
{channels.map((channel, index) => (
<div
key={index}
style={{
background: channel.active ? 'rgba(83, 200, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
border: channel.active ? '1px solid rgba(83, 200, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
borderRadius: '8px',
padding: '12px',
cursor: 'pointer',
transition: 'all 0.2s',
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center'
}}
onMouseOver={(e) => {
e.currentTarget.style.backgroundColor = channel.active ? 'rgba(83, 200, 255, 0.15)' : 'rgba(255, 255, 255, 0.08)';
}}
onMouseOut={(e) => {
e.currentTarget.style.backgroundColor = channel.active ? 'rgba(83, 200, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)';
}}
onClick={() => onNavigate(View.CHAT)}
>
<div>
<div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
<span style={{ fontSize: '12px' }}>
{channel.active ? '🟢' : '⚪'}
</span>
<span style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>
{channel.name}
</span>
</div>
<p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '2px' }}>
{channel.members} members
</p>
</div>
{channel.unread > 0 && (
<div style={{
background: '#53C8FF',
color: '#000',
borderRadius: '50%',
width: '20px',
height: '20px',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
fontSize: '10px',
fontWeight: 'bold'
}}>
{channel.unread}
</div>
)}
</div>
))}
</div>
)}

</div>

        <div
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '16px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#53C8FF',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '20px' }}>🎮</span>
            Gaming Hub
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {games.map((game, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                }}
                onClick={() => onNavigate(View.ARCADE)}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '6px',
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>
                    {game.name}
                  </span>
                  <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)' }}>
                    {game.lastPlayed}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        height: '4px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '2px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${game.progress}%`,
                          background: 'linear-gradient(90deg, #53C8FF 0%, #4AB8FF 100%)',
                          borderRadius: '2px',
                          transition: 'width 0.3s ease',
                        }}
                      />
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)' }}>
                    {game.progress}%
                  </span>
                </div>

                <p
                  style={{
                    fontSize: '11px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    marginTop: '6px',
                  }}
                >
                  {game.hours} hours played
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div
        style={{
          background: 'rgba(26, 26, 26, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '16px',
          backdropFilter: 'blur(10px)',
          marginTop: '20px',
        }}
      >
        <h2
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#53C8FF',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '20px' }}>📊</span>
          Recent Activity
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '12px',
          }}
        >
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
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
                }}
              >
                {activity.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '2px',
                  }}
                >
                  {activity.title}
                </p>
                <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)' }}>
                  {activity.message}
                </p>
              </div>
              <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)' }}>
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardModern;
