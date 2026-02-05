import React from 'react';

const MusicContent: React.FC = () => {
  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <div style={{
        background: 'rgba(236, 72, 153, 0.2)',
        border: '2px solid #EC4899',
        borderRadius: '8px',
        padding: '10px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <strong>🎵 MUSIC VIEW ACTIVE</strong>
      </div>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', color: '#EC4899' }}>
        YouTube Music Hub
      </h1>
      
      <div style={{
        background: 'rgba(26, 35, 72, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#EC4899' }}>Music Player</h2>
        
        <div style={{
          background: 'rgba(236, 72, 153, 0.1)',
          border: '1px solid rgba(236, 72, 153, 0.3)',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px'
            }}>
              🎵
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '18px', marginBottom: '4px', color: '#EC4899' }}>Now Playing</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '8px' }}>
                Cosmic Journey - Space Vibes
              </p>
              <div style={{
                width: '100%',
                height: '4px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '2px',
                position: 'relative'
              }}>
                <div style={{
                  width: '40%',
                  height: '100%',
                  background: '#EC4899',
                  borderRadius: '2px'
                }} />
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer'
            }}>
              ⏮️
            </button>
            <button style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: '#EC4899',
              border: 'none',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer'
            }}>
              ▶️
            </button>
            <button style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer'
            }}>
              ⏭️
            </button>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          <div style={{
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '8px',
            padding: '16px',
            cursor: 'pointer'
          }}>
            <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#8B5CF6' }}>🎸 Rock</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
              High energy rock playlist
            </p>
          </div>
          
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '8px',
            padding: '16px',
            cursor: 'pointer'
          }}>
            <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#10B981' }}>🎹 Chill</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
              Relaxing vibes and lofi
            </p>
          </div>
          
          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '8px',
            padding: '16px',
            cursor: 'pointer'
          }}>
            <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#F59E0B' }}>🎵 Electronic</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
              EDM and electronic beats
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicContent;
