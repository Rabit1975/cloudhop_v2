import React from 'react';

const HopHubContent: React.FC = () => {
  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <div
        style={{
          background: 'rgba(83, 200, 255, 0.2)',
          border: '2px solid #53C8FF',
          borderRadius: '8px',
          padding: '10px',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        <strong>🎯 HOPHUB VIEW ACTIVE</strong>
      </div>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', color: '#53C8FF' }}>
        HopHub - Communication Hub
      </h1>

      <div
        style={{
          background: 'rgba(26, 35, 72, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '20px',
        }}
      >
        <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#53C8FF' }}>
          Welcome to HopHub
        </h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '16px' }}>
          Your unified communication center for groups, channels, and spaces.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
          }}
        >
          <div
            style={{
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#8B5CF6' }}>🗨️ Groups</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
              Create and manage community groups
            </p>
          </div>

          <div
            style={{
              background: 'rgba(236, 72, 153, 0.1)',
              border: '1px solid rgba(236, 72, 153, 0.3)',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#EC4899' }}>📢 Channels</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
              Organized communication channels
            </p>
          </div>

          <div
            style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#10B981' }}>🌌 Spaces</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
              Virtual meeting spaces and events
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          background: 'rgba(26, 35, 72, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '24px',
        }}
      >
        <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#53C8FF' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            style={{
              background: 'linear-gradient(135deg, #53C8FF, #3B82F6)',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 20px',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            ➕ Create Group
          </button>

          <button
            style={{
              background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 20px',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            📢 Join Channel
          </button>

          <button
            style={{
              background: 'linear-gradient(135deg, #10B981, #F59E0B)',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 20px',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            🌌 Browse Spaces
          </button>
        </div>
      </div>
    </div>
  );
};

export default HopHubContent;
