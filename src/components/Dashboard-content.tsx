import React, { useState } from 'react';
import { View } from '../types';

interface DashboardContentProps {
  onNavigate: (view: View) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ onNavigate }) => {
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

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <div
        style={{
          background: 'rgba(255, 0, 0, 0.2)',
          border: '2px solid red',
          borderRadius: '8px',
          padding: '10px',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        <strong>🎯 DASHBOARD VIEW ACTIVE</strong>
      </div>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', color: '#53C8FF' }}>
        CloudHop Dashboard - Updated!
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '30px',
        }}
      >
        {/* Stats Cards */}
        <div
          style={{
            background: 'rgba(83, 200, 255, 0.1)',
            border: '1px solid rgba(83, 200, 255, 0.3)',
            borderRadius: '12px',
            padding: '20px',
          }}
        >
          <h3 style={{ fontSize: '18px', marginBottom: '12px', color: '#53C8FF' }}>
            Communication
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Total Channels</span>
              <span style={{ fontWeight: 'bold', color: '#53C8FF' }}>
                {userStats.totalChannels}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Active Now</span>
              <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>
                {userStats.activeChannels}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Unread Messages</span>
              <span style={{ fontWeight: 'bold', color: '#FF6B6B' }}>
                {userStats.unreadMessages}
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '12px',
            padding: '20px',
          }}
        >
          <h3 style={{ fontSize: '18px', marginBottom: '12px', color: '#8B5CF6' }}>Gaming Hub</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Gaming Hours</span>
              <span style={{ fontWeight: 'bold', color: '#8B5CF6' }}>{userStats.gamingHours}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Last Game</span>
              <span style={{ fontWeight: 'bold', color: '#8B5CF6' }}>{userStats.lastGame}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Last Played</span>
              <span style={{ fontWeight: 'bold', color: '#8B5CF6' }}>{userStats.lastPlayed}</span>
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(236, 72, 153, 0.1)',
            border: '1px solid rgba(236, 72, 153, 0.3)',
            borderRadius: '12px',
            padding: '20px',
          }}
        >
          <h3 style={{ fontSize: '18px', marginBottom: '12px', color: '#EC4899' }}>Meetings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Today</span>
              <span style={{ fontWeight: 'bold', color: '#EC4899' }}>
                {userStats.meetingsToday}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Next Meeting</span>
              <span style={{ fontWeight: 'bold', color: '#EC4899' }}>{userStats.nextMeeting}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div
        style={{
          background: 'rgba(26, 35, 72, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '24px',
        }}
      >
        <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#53C8FF' }}>Quick Actions</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
          }}
        >
          <button
            onClick={() => onNavigate(View.CHAT)}
            style={{
              background: 'linear-gradient(135deg, #53C8FF, #3B82F6)',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 20px',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(83, 200, 255, 0.3)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            🗨️ Open HopHub
          </button>

          <button
            onClick={() => onNavigate(View.MUSIC)}
            style={{
              background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 20px',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.3)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            🎵 Play Music
          </button>

          <button
            onClick={() => onNavigate(View.ARCADE)}
            style={{
              background: 'linear-gradient(135deg, #10B981, #F59E0B)',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 20px',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            🎮 Game Hub
          </button>

          <button
            onClick={() => onNavigate(View.SETTINGS)}
            style={{
              background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 20px',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(245, 158, 11, 0.3)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            ⚙️ Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
