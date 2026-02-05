import React from 'react';

const TwitchContent: React.FC = () => {
  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <div style={{
        background: 'rgba(139, 92, 246, 0.2)',
        border: '2px solid #8B5CF6',
        borderRadius: '8px',
        padding: '10px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <strong>🎮 TWITCH VIEW ACTIVE</strong>
      </div>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', color: '#8B5CF6' }}>
        Twitch Stream Hub
      </h1>
      
      <div style={{
        background: 'rgba(26, 35, 72, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#8B5CF6' }}>Live Streams</h2>
        
        <div style={{
          background: 'rgba(139, 92, 246, 0.1)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{
              width: '120px',
              height: '80px',
              background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              🎮
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h3 style={{ fontSize: '16px', color: '#8B5CF6' }}>ProGamer123</h3>
                <span style={{
                  background: '#EF4444',
                  color: 'white',
                  fontSize: '10px',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  LIVE
                </span>
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '8px' }}>
                Speedrunning CloudHop - World Record Attempt!
              </p>
              <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>
                <span>👁️ 1.2K viewers</span>
                <span>🎮 Action</span>
                <span>⏱️ 2:34:15</span>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          <div style={{
            background: 'rgba(236, 72, 153, 0.1)',
            border: '1px solid rgba(236, 72, 153, 0.3)',
            borderRadius: '8px',
            padding: '16px',
            cursor: 'pointer'
          }}>
            <div style={{
              width: '100%',
              height: '120px',
              background: 'linear-gradient(135deg, #EC4899, #F59E0B)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              marginBottom: '12px'
            }}>
              🎯
            </div>
            <h3 style={{ fontSize: '16px', marginBottom: '4px', color: '#EC4899' }}>FPSMaster</h3>
            <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
              Competitive FPS gameplay
            </p>
            <div style={{ fontSize: '11px', color: '#EF4444', marginTop: '4px' }}>
              🔴 523 viewers
            </div>
          </div>
          
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '8px',
            padding: '16px',
            cursor: 'pointer'
          }}>
            <div style={{
              width: '100%',
              height: '120px',
              background: 'linear-gradient(135deg, #10B981, #53C8FF)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              marginBottom: '12px'
            }}>
              🎨
            </div>
            <h3 style={{ fontSize: '16px', marginBottom: '4px', color: '#10B981' }}>CreativeArtist</h3>
            <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
              Digital art & design
            </p>
            <div style={{ fontSize: '11px', color: '#EF4444', marginTop: '4px' }}>
              🔴 287 viewers
            </div>
          </div>
          
          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '8px',
            padding: '16px',
            cursor: 'pointer'
          }}>
            <div style={{
              width: '100%',
              height: '120px',
              background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              marginBottom: '12px'
            }}>
              🎲
            </div>
            <h3 style={{ fontSize: '16px', marginBottom: '4px', color: '#F59E0B' }}>RPGStreamer</h3>
            <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
              Role-playing games
            </p>
            <div style={{ fontSize: '11px', color: '#EF4444', marginTop: '4px' }}>
              🔴 156 viewers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwitchContent;
