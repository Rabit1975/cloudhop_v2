import React, { useState, useEffect } from 'react';
import { View } from '../types';

interface DashboardProps {
  onNavigate: (view: View) => void;
}

const DashboardCompact: React.FC<DashboardProps> = ({ onNavigate }) => {
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

  const [friends] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      status: 'online',
      activity: 'In HopHub General',
      avatar: '👩‍💼',
      lastSeen: null,
    },
    {
      id: 2,
      name: 'Mike Johnson',
      status: 'online',
      activity: 'Playing Cyber Racing 2077',
      avatar: '👨‍💻',
      lastSeen: null,
    },
    {
      id: 4,
      name: 'Alex Kumar',
      status: 'online',
      activity: 'In meeting',
      avatar: '👨‍🔬',
      lastSeen: null,
    },
  ]);

  const [isFriendsExpanded, setIsFriendsExpanded] = useState(true);
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
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '20px',
        }}
      >
        {/* Friends Online */}
        <div
          style={{
            background: 'rgba(26, 26, 26, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '16px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <button
            onClick={() => setIsFriendsExpanded(!isFriendsExpanded)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#53C8FF',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '100%',
              justifyContent: 'space-between',
              padding: '0',
              marginBottom: isFriendsExpanded ? '16px' : '0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>👥</span>
              Friends Online
              <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
                ({friends.filter(f => f.status === 'online').length} online)
              </span>
            </div>
            {isFriendsExpanded ? professionalIcons.chevronUp : professionalIcons.chevronDown}
          </button>

          {isFriendsExpanded && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {friends.map((friend, index) => (
                <div
                  key={index}
                  style={{
                    background:
                      friend.status === 'online'
                        ? 'rgba(83, 200, 255, 0.1)'
                        : 'rgba(255, 255, 255, 0.05)',
                    border:
                      friend.status === 'online'
                        ? '1px solid rgba(83, 200, 255, 0.3)'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.backgroundColor =
                      friend.status === 'online'
                        ? 'rgba(83, 200, 255, 0.15)'
                        : 'rgba(255, 255, 255, 0.08)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.backgroundColor =
                      friend.status === 'online'
                        ? 'rgba(83, 200, 255, 0.1)'
                        : 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        background:
                          friend.status === 'online'
                            ? 'linear-gradient(135deg, #4ECDC4 0%, #44A3AA 100%)'
                            : 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        position: 'relative',
                      }}
                    >
                      {friend.avatar}
                      {friend.status === 'online' && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '-2px',
                            right: '-2px',
                            width: '10px',
                            height: '10px',
                            background: '#4ECDC4',
                            borderRadius: '50%',
                            border: '2px solid #050819',
                          }}
                        />
                      )}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>
                          {friend.name}
                        </span>
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background:
                              friend.status === 'online'
                                ? '#4ECDC4'
                                : friend.status === 'away'
                                  ? '#FFD93D'
                                  : friend.status === 'busy'
                                    ? '#FF6B6B'
                                    : '#94A3B8',
                          }}
                        />
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: '11px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        marginTop: '2px',
                      }}
                    >
                      {friend.activity}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        // Start chat with friend
                        onNavigate(View.CHAT);
                      }}
                      style={{
                        background: 'rgba(83, 200, 255, 0.2)',
                        border: '1px solid rgba(83, 200, 255, 0.4)',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        fontSize: '10px',
                        color: '#53C8FF',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.backgroundColor = 'rgba(83, 200, 255, 0.3)';
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.backgroundColor = 'rgba(83, 200, 255, 0.2)';
                      }}
                    >
                      💬
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        // Invite to game
                        onNavigate(View.ARCADE);
                      }}
                      style={{
                        background: 'rgba(83, 200, 255, 0.2)',
                        border: '1px solid rgba(83, 200, 255, 0.4)',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        fontSize: '10px',
                        color: '#53C8FF',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.backgroundColor = 'rgba(83, 200, 255, 0.3)';
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.backgroundColor = 'rgba(83, 200, 255, 0.2)';
                      }}
                    >
                      🎮
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Channels & Chats */}
        <div
          style={{
            background: 'rgba(26, 26, 26, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '16px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <button
            onClick={() => setIsChannelsExpanded(!isChannelsExpanded)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#53C8FF',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '100%',
              justifyContent: 'space-between',
              padding: '0',
              marginBottom: isChannelsExpanded ? '16px' : '0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>💬</span>
              Channels & Chats
              <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
                ({channels.length} total, {channels.filter(c => c.active).length} active)
              </span>
            </div>
            {isChannelsExpanded ? professionalIcons.chevronUp : professionalIcons.chevronDown}
          </button>

          {isChannelsExpanded && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {channels.map((channel, index) => (
                <div
                  key={index}
                  style={{
                    background: channel.active
                      ? 'rgba(83, 200, 255, 0.1)'
                      : 'rgba(255, 255, 255, 0.05)',
                    border: channel.active
                      ? '1px solid rgba(83, 200, 255, 0.3)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.backgroundColor = channel.active
                      ? 'rgba(83, 200, 255, 0.15)'
                      : 'rgba(255, 255, 255, 0.08)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.backgroundColor = channel.active
                      ? 'rgba(83, 200, 255, 0.1)'
                      : 'rgba(255, 255, 255, 0.05)';
                  }}
                  onClick={() => onNavigate(View.CHAT)}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '12px' }}>{channel.active ? '🟢' : '⚪'}</span>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>
                        {channel.name}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: '12px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        marginTop: '2px',
                      }}
                    >
                      {channel.members} members
                    </p>
                  </div>
                  {channel.unread > 0 && (
                    <div
                      style={{
                        background: '#53C8FF',
                        color: '#000',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: 'bold',
                      }}
                    >
                      {channel.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Gaming Hub */}
        <div
          style={{
            background: 'rgba(26, 26, 26, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '16px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <button
            onClick={() => setIsGamingExpanded(!isGamingExpanded)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#53C8FF',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '100%',
              justifyContent: 'space-between',
              padding: '0',
              marginBottom: isGamingExpanded ? '16px' : '0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>🎮</span>
              Gaming Hub
              <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
                ({games.length} games)
              </span>
            </div>
            {isGamingExpanded ? professionalIcons.chevronUp : professionalIcons.chevronDown}
          </button>

          {isGamingExpanded && (
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
          )}
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
        <button
          onClick={() => setIsActivityExpanded(!isActivityExpanded)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#53C8FF',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
            justifyContent: 'space-between',
            padding: '0',
            marginBottom: isActivityExpanded ? '16px' : '0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>📊</span>
            Recent Activity
            <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
              ({recentActivity.length} items)
            </span>
          </div>
          {isActivityExpanded ? professionalIcons.chevronUp : professionalIcons.chevronDown}
        </button>

        {isActivityExpanded && (
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
        )}
      </div>
    </div>
  );
};

export default DashboardCompact;
