import React from 'react';

const SettingsContent: React.FC = () => {
  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <div style={{
        background: 'rgba(245, 158, 11, 0.2)',
        border: '2px solid #F59E0B',
        borderRadius: '8px',
        padding: '10px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <strong>🎯 SETTINGS VIEW ACTIVE</strong>
      </div>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', color: '#F59E0B' }}>
        CloudHop Settings
      </h1>
      
      <div style={{
        background: 'rgba(26, 35, 72, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#F59E0B' }}>Settings Categories</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          <div style={{
            background: 'rgba(83, 200, 255, 0.1)',
            border: '1px solid rgba(83, 200, 255, 0.3)',
            borderRadius: '8px',
            padding: '16px',
            cursor: 'pointer'
          }}>
            <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#53C8FF' }}>⚙️ General</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
              Basic app settings and preferences
            </p>
          </div>
          
          <div style={{
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '8px',
            padding: '16px',
            cursor: 'pointer'
          }}>
            <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#8B5CF6' }}>🎥 Video & Effects</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
              Camera settings and visual effects
            </p>
          </div>
          
          <div style={{
            background: 'rgba(236, 72, 153, 0.1)',
            border: '1px solid rgba(236, 72, 153, 0.3)',
            borderRadius: '8px',
            padding: '16px',
            cursor: 'pointer'
          }}>
            <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#EC4899' }}>🔊 Audio</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
              Microphone and speaker settings
            </p>
          </div>
          
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '8px',
            padding: '16px',
            cursor: 'pointer'
          }}>
            <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#10B981' }}>🔔 Notifications</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
              Alert and notification preferences
            </p>
          </div>
        </div>
      </div>
      
      <div style={{
        background: 'rgba(26, 35, 72, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '24px'
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#F59E0B' }}>Quick Settings</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Dark Mode</span>
            <div style={{
              width: '50px',
              height: '25px',
              background: '#53C8FF',
              borderRadius: '25px',
              position: 'relative',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '21px',
                height: '21px',
                background: 'white',
                borderRadius: '50%',
                position: 'absolute',
                right: '2px',
                top: '2px'
              }} />
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Notifications</span>
            <div style={{
              width: '50px',
              height: '25px',
              background: '#53C8FF',
              borderRadius: '25px',
              position: 'relative',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '21px',
                height: '21px',
                background: 'white',
                borderRadius: '50%',
                right: '2px',
                top: '2px',
                position: 'absolute'
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsContent;
