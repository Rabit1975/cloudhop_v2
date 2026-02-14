import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { NebulaBackground } from './nebula-background.js';

export const BasicNebula = () => {
  return (
    <CloudrabbitTheme>
      <NebulaBackground>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100%',
          minHeight: '400px',
          color: 'var(--colors-text-primary)',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            fontSize: 'var(--typography-sizes-display-medium)',
            margin: '0 0 var(--spacing-medium) 0'
          }}>
            CloudHop Social
          </h1>
          <p style={{ 
            fontSize: 'var(--typography-sizes-body-large)',
            maxWidth: '600px',
            color: 'var(--colors-text-secondary)'
          }}>
            Experience the next generation of social interaction with our immersive nebula environment.
          </p>
        </div>
      </NebulaBackground>
    </CloudrabbitTheme>
  );
};

export const SocialHubLogin = () => {
  return (
    <CloudrabbitTheme initialTheme="dark">
      <NebulaBackground intensified>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh',
          width: '100%'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '400px',
            padding: '48px',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'var(--effects-blur-medium)',
            borderRadius: 'var(--borders-radius-large)',
            border: '1px solid var(--colors-border-subtle)',
            boxShadow: 'var(--effects-shadows-large)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                backgroundColor: 'var(--colors-primary-default)',
                borderRadius: '50%',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                boxShadow: 'var(--effects-shadows-glow)'
              }}>
                CH
              </div>
              <h2 style={{ margin: 0, fontSize: 'var(--typography-sizes-heading-h3)' }}>Welcome Back</h2>
              <p style={{ color: 'var(--colors-text-secondary)', marginTop: '8px' }}>Enter the nebula to continue</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input 
                type="text" 
                placeholder="Email address"
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--borders-radius-medium)',
                  border: '1px solid var(--colors-border-default)',
                  backgroundColor: 'var(--colors-surface-secondary)',
                  color: 'var(--colors-text-primary)',
                  fontSize: '16px'
                }}
              />
              <input 
                type="password" 
                placeholder="Password"
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--borders-radius-medium)',
                  border: '1px solid var(--colors-border-default)',
                  backgroundColor: 'var(--colors-surface-secondary)',
                  color: 'var(--colors-text-primary)',
                  fontSize: '16px'
                }}
              />
              <button style={{
                padding: '12px',
                borderRadius: 'var(--borders-radius-medium)',
                backgroundColor: 'var(--colors-primary-default)',
                color: 'var(--colors-text-inverse)',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '16px',
                marginTop: '8px'
              }}>
                Log In
              </button>
            </div>
          </div>
        </div>
      </NebulaBackground>
    </CloudrabbitTheme>
  );
};

export const HopHubInterface = () => {
  return (
    <CloudrabbitTheme initialTheme="dark">
      <div style={{ height: '600px', position: 'relative', overflow: 'hidden' }}>
        <NebulaBackground style={{ position: 'absolute', height: '100%', minHeight: 'unset' }}>
          <div style={{ 
            display: 'flex', 
            height: '100%', 
            width: '100%',
            color: 'var(--colors-text-primary)'
          }}>
            {/* Server Sidebar */}
            <div style={{ 
              width: '72px', 
              backgroundColor: 'rgba(15, 23, 42, 0.8)', 
              backdropFilter: 'var(--effects-blur-medium)',
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              padding: '16px 0',
              gap: '16px',
              borderRight: '1px solid var(--colors-border-subtle)',
              zIndex: 2
            }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '50%', 
                  backgroundColor: i === 1 ? 'var(--colors-primary-default)' : 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: i === 1 ? 'var(--effects-shadows-glow)' : 'none',
                  transition: 'all 0.2s ease',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  {i === 1 ? 'CH' : `S${i}`}
                </div>
              ))}
            </div>

            {/* Channel Sidebar */}
            <div style={{ 
              width: '240px', 
              backgroundColor: 'rgba(30, 41, 59, 0.4)', 
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              backdropFilter: 'var(--effects-blur-small)',
              borderRight: '1px solid var(--colors-border-subtle)',
              zIndex: 1
            }}>
              <div style={{ 
                fontSize: 'var(--typography-sizes-heading-h5)', 
                fontWeight: 'bold', 
                marginBottom: '24px',
                color: 'var(--colors-text-primary)'
              }}>
                CloudHop HQ
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <div style={{ 
                  textTransform: 'uppercase', 
                  fontSize: '11px', 
                  color: 'var(--colors-text-secondary)',
                  fontWeight: 'bold',
                  marginBottom: '12px'
                }}>
                  HopHub Channels
                </div>
                {['# general', '# announcements', '# random', '# music-lounge'].map(channel => (
                  <div key={channel} style={{ 
                    padding: '8px 12px', 
                    borderRadius: '4px',
                    cursor: 'pointer',
                    color: channel === '# general' ? 'var(--colors-text-primary)' : 'var(--colors-text-secondary)',
                    backgroundColor: channel === '# general' ? 'rgba(255,255,255,0.1)' : 'transparent',
                    marginBottom: '4px',
                    fontSize: '14px'
                  }}>
                    {channel}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div style={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column',
              position: 'relative'
            }}>
              {/* Header */}
              <div style={{ 
                height: '64px', 
                borderBottom: '1px solid var(--colors-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 24px',
                backgroundColor: 'rgba(15, 23, 42, 0.2)',
                backdropFilter: 'var(--effects-blur-small)'
              }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}># general</span>
                <span style={{ marginLeft: '16px', fontSize: '14px', color: 'var(--colors-text-secondary)' }}>
                  Welcome to the nebula...
                </span>
              </div>

              {/* Chat Messages */}
              <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
                 {[
                  { user: 'Alice', time: '10:42 AM', text: 'Has anyone seen the new nebula theme update?' },
                  { user: 'Bob', time: '10:45 AM', text: 'Yes! The gradients are so smooth. Really gives that "Space" vibe.' },
                  { user: 'Charlie', time: '10:48 AM', text: 'I love the new "Glow" shadow effects on the active server icons.' }
                ].map((msg, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      backgroundColor: `hsl(${220 + (idx * 40)}, 70%, 60%)`,
                      flexShrink: 0
                    }} />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 'bold', color: 'var(--colors-primary-default)' }}>{msg.user}</span>
                        <span style={{ fontSize: '12px', color: 'var(--colors-text-secondary)' }}>{msg.time}</span>
                      </div>
                      <div style={{ lineHeight: '1.5', color: 'var(--colors-text-default)' }}>{msg.text}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div style={{ padding: '24px' }}>
                <div style={{ 
                  backgroundColor: 'rgba(0,0,0,0.3)', 
                  padding: '16px', 
                  borderRadius: '8px',
                  color: 'var(--colors-text-secondary)',
                  border: '1px solid var(--colors-border-subtle)'
                }}>
                  Message #general...
                </div>
              </div>
            </div>
          </div>
        </NebulaBackground>
      </div>
    </CloudrabbitTheme>
  );
};