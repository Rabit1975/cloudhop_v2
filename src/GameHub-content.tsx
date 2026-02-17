import React from 'react';

const GameHubContent: React.FC = () => {
  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <div style={{
        background: 'rgba(16, 185, 129, 0.2)',
        border: '2px solid #10B981',
        borderRadius: '8px',
        padding: '10px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <strong>🎮 GAMEHUB VIEW ACTIVE</strong>
      </div>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', color: '#10B981' }}>
        GameHub Engine
      </h1>
      
      <div style={{
        background: 'rgba(26, 35, 72, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#10B981' }}>Featured Games</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '12px',
            padding: '20px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              width: '100%',
              height: '150px',
              background: 'linear-gradient(135deg, #10B981, #53C8FF)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              marginBottom: '16px'
            }}>
              🚀
            </div>
            <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#10B981' }}>Space Racing 2077</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '12px' }}>
              High-speed space racing with multiplayer battles
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: '#10B981' }}>⭐ 4.8</span>
              <button style={{
                background: '#10B981',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                color: 'white',
                fontSize: '12px',
                cursor: 'pointer'
              }}>
                Play Now
              </button>
            </div>
          </div>
          
          <div style={{
            background: 'rgba(236, 72, 153, 0.1)',
            border: '1px solid rgba(236, 72, 153, 0.3)',
            borderRadius: '12px',
            padding: '20px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              width: '100%',
              height: '150px',
              background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              marginBottom: '16px'
            }}>
              ⚔️
            </div>
            <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#EC4899' }}>Cyber Warriors</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '12px' }}>
              Epic multiplayer battles in cyberpunk world
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: '#EC4899' }}>⭐ 4.6</span>
              <button style={{
                background: '#EC4899',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                color: 'white',
                fontSize: '12px',
                cursor: 'pointer'
              }}>
                Play Now
              </button>
            </div>
          </div>
          
          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '12px',
            padding: '20px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              width: '100%',
              height: '150px',
              background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              marginBottom: '16px'
            }}>
              🧩
            </div>
            <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#F59E0B' }}>Puzzle Quest</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '12px' }}>
              Mind-bending puzzles and brain teasers
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: '#F59E0B' }}>⭐ 4.9</span>
              <button style={{
                background: '#F59E0B',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                color: 'white',
                fontSize: '12px',
                cursor: 'pointer'
              }}>
                Play Now
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{
        background: 'rgba(26, 35, 72, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '24px'
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#10B981' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button style={{
            background: 'linear-gradient(135deg, #10B981, #53C8FF)',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 20px',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            🎮 Browse Games
          </button>
          
          <button style={{
            background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 20px',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            👥 Multiplayer
          </button>
          
          <button style={{
            background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 20px',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            🏆 Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameHubContent;
