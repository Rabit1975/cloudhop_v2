import React from 'react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { PresenceIndicator } from './presence-indicator.js';

export const AllStatuses = () => {
  return (
    <MockProvider>
      <div style={{ 
        display: 'flex', 
        gap: '32px', 
        padding: '24px', 
        backgroundColor: 'var(--colors-surface-background)',
        color: 'var(--colors-text-primary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PresenceIndicator status="online" />
          <span>Online</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PresenceIndicator status="away" />
          <span>Away</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PresenceIndicator status="busy" />
          <span>Busy</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PresenceIndicator status="offline" />
          <span>Offline</span>
        </div>
      </div>
    </MockProvider>
  );
};

export const DifferentSizes = () => {
  return (
    <MockProvider>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '24px', 
        padding: '24px',
        backgroundColor: 'var(--colors-surface-background)',
        color: 'var(--colors-text-primary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <PresenceIndicator status="online" size="small" />
          <span style={{ fontSize: '12px' }}>Small (8px)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <PresenceIndicator status="online" size="medium" />
          <span style={{ fontSize: '14px' }}>Medium (12px)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <PresenceIndicator status="online" size="large" />
          <span style={{ fontSize: '16px' }}>Large (16px)</span>
        </div>
      </div>
    </MockProvider>
  );
};

export const UserAvatarContext = () => {
  const users = [
    { name: 'Alice Dev', status: 'online' as const, avatarColor: 'hsl(250, 60%, 60%)' },
    { name: 'Bob Design', status: 'busy' as const, avatarColor: 'hsl(150, 60%, 40%)' },
    { name: 'Charlie PM', status: 'away' as const, avatarColor: 'hsl(30, 80%, 60%)' },
    { name: 'Dave Ops', status: 'offline' as const, avatarColor: 'hsl(200, 20%, 40%)' },
  ];

  return (
    <MockProvider>
      <div style={{ 
        width: '300px',
        padding: '16px', 
        borderRadius: 'var(--borders-radius-medium)',
        backgroundColor: 'var(--colors-surface-secondary)',
        color: 'var(--colors-text-primary)'
      }}>
        <h4 style={{ 
          margin: '0 0 16px 0', 
          fontSize: '12px', 
          textTransform: 'uppercase', 
          color: 'var(--colors-text-secondary)' 
        }}>
          Team Members
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {users.map((user) => (
            <div key={user.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <div style={{ position: 'relative', width: '32px', height: '32px' }}>
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  borderRadius: '50%', 
                  backgroundColor: user.avatarColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#fff'
                }}>
                  {user.name.charAt(0)}
                </div>
                <div style={{ 
                  position: 'absolute', 
                  bottom: '-2px', 
                  right: '-2px', 
                  backgroundColor: 'var(--colors-surface-secondary)',
                  borderRadius: '50%',
                  padding: '2px'
                }}>
                  <PresenceIndicator status={user.status} size="small" />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '500' }}>{user.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--colors-text-secondary)' }}>
                  {user.status === 'offline' ? 'Last seen 2h ago' : user.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockProvider>
  );
};