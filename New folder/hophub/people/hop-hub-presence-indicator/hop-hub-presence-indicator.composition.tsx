import React from 'react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { HopHubPresenceIndicator } from './hop-hub-presence-indicator.js';

export const StatusGallery = () => {
  return (
    <MockProvider>
      <div style={{ 
        display: 'flex', 
        gap: '24px', 
        padding: '24px', 
        backgroundColor: 'var(--colors-surface-background)',
        borderRadius: 'var(--borders-radius-medium)'
      }}>
        {(['online', 'away', 'busy', 'offline'] as const).map(status => (
          <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HopHubPresenceIndicator status={status} />
            <span style={{ 
              color: 'var(--colors-text-primary)', 
              textTransform: 'capitalize',
              fontSize: 'var(--typography-sizes-body-small)'
            }}>
              {status}
            </span>
          </div>
        ))}
      </div>
    </MockProvider>
  );
};

export const AvatarIntegration = () => {
  return (
    <MockProvider>
      <div style={{ 
        padding: '32px', 
        backgroundColor: 'var(--colors-surface-background)',
        display: 'flex',
        gap: '24px'
      }}>
        {/* Large Avatar */}
        <div style={{ position: 'relative', width: '48px', height: '48px' }}>
          <div style={{ 
            width: '100%', 
            height: '100%', 
            borderRadius: 'var(--borders-radius-full)', 
            backgroundColor: '#6366f1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>
            JD
          </div>
          <div style={{ position: 'absolute', bottom: '-2px', right: '-2px' }}>
            <HopHubPresenceIndicator status="online" size="large" />
          </div>
        </div>

        {/* Medium Avatar */}
        <div style={{ position: 'relative', width: '40px', height: '40px' }}>
          <div style={{ 
            width: '100%', 
            height: '100%', 
            borderRadius: 'var(--borders-radius-full)', 
            backgroundColor: '#ec4899',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            AB
          </div>
          <div style={{ position: 'absolute', bottom: '-2px', right: '-2px' }}>
            <HopHubPresenceIndicator status="busy" size="medium" />
          </div>
        </div>

        {/* Small Avatar */}
        <div style={{ position: 'relative', width: '32px', height: '32px' }}>
          <div style={{ 
            width: '100%', 
            height: '100%', 
            borderRadius: 'var(--borders-radius-full)', 
            backgroundColor: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            T
          </div>
          <div style={{ position: 'absolute', bottom: '-2px', right: '-2px' }}>
            <HopHubPresenceIndicator status="away" size="small" />
          </div>
        </div>
      </div>
    </MockProvider>
  );
};

export const ChannelUserList = () => {
  const users = [
    { name: 'Sarah Connor', status: 'online', color: '#8b5cf6' },
    { name: 'John Doe', status: 'busy', color: '#f43f5e' },
    { name: 'Kyle Reese', status: 'offline', color: '#64748b' },
  ] as const;

  return (
    <MockProvider>
      <div style={{ 
        width: '240px', 
        padding: '16px', 
        backgroundColor: 'var(--colors-surface-secondary)',
        borderRadius: 'var(--borders-radius-medium)'
      }}>
        <div style={{ 
          fontSize: 'var(--typography-sizes-caption-default)', 
          fontWeight: 'bold', 
          color: 'var(--colors-text-secondary)',
          marginBottom: '12px',
          textTransform: 'uppercase'
        }}>
          Online — {users.length}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {users.map(user => (
            <div key={user.name} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              padding: '6px',
              borderRadius: 'var(--borders-radius-small)',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}>
              <div style={{ position: 'relative', width: '32px', height: '32px' }}>
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  borderRadius: 'var(--borders-radius-full)', 
                  backgroundColor: user.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px'
                }}>
                  {user.name.charAt(0)}
                </div>
                <div style={{ position: 'absolute', bottom: '-2px', right: '-2px' }}>
                  <HopHubPresenceIndicator status={user.status} size="small" />
                </div>
              </div>
              <span style={{ 
                color: user.status === 'offline' ? 'var(--colors-text-secondary)' : 'var(--colors-text-primary)',
                fontSize: 'var(--typography-sizes-body-small)',
                opacity: user.status === 'offline' ? 0.7 : 1
              }}>
                {user.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MockProvider>
  );
};