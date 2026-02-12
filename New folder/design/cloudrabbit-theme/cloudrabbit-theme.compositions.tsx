import React from 'react';
import { TokenViewer } from '@bitdesign/sparks.sparks-theme';
import { CloudrabbitTheme } from './cloudrabbit-theme.js';
import { useTheme } from './cloudrabbit-theme-provider.js';

const ViewTokens = () => {
  const theme = useTheme();
  return <TokenViewer theme={theme} />;
};

export const BasicThemeUsage = () => {
  return (
    <CloudrabbitTheme>
      <ViewTokens />
    </CloudrabbitTheme>
  );
};

export const CloudHopBrandBook = () => {
  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div style={{ marginBottom: '48px' }}>
      <h2 style={{ 
        fontSize: 'var(--typography-sizes-heading-h3)', 
        borderBottom: '1px solid var(--colors-border-default)', 
        paddingBottom: '16px',
        marginBottom: '24px'
      }}>
        {title}
      </h2>
      {children}
    </div>
  );

  const ColorSwatch = ({ name, variable }: { name: string, variable: string }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ 
        height: '80px', 
        borderRadius: 'var(--borders-radius-medium)', 
        backgroundColor: `var(${variable})`,
        boxShadow: 'var(--effects-shadows-small)'
      }} />
      <span style={{ fontSize: 'var(--typography-sizes-caption-default)', color: 'var(--colors-text-secondary)' }}>
        {name}
      </span>
      <code style={{ fontSize: '10px', color: 'var(--colors-text-secondary)' }}>{variable}</code>
    </div>
  );

  return (
    <CloudrabbitTheme>
      <div style={{ 
        padding: '64px', 
        maxWidth: '1200px', 
        margin: '0 auto', 
        backgroundColor: 'var(--colors-surface-background)',
        minHeight: '100vh'
      }}>
        <header style={{ marginBottom: '64px', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: 'var(--typography-sizes-display-medium)', 
            background: 'var(--effects-gradients-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px'
          }}>
            CloudHop Design System
          </h1>
          <p style={{ fontSize: 'var(--typography-sizes-body-large)', color: 'var(--colors-text-secondary)' }}>
            Modular Operating System for Next-Gen Communication
          </p>
        </header>

        <Section title="Colors">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            <ColorSwatch name="Primary Default" variable="--colors-primary-default" />
            <ColorSwatch name="Secondary Default" variable="--colors-secondary-default" />
            <ColorSwatch name="Background" variable="--colors-surface-background" />
            <ColorSwatch name="Surface Secondary" variable="--colors-surface-secondary" />
          </div>
        </Section>

        <Section title="Typography">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h1 style={{ fontSize: 'var(--typography-sizes-display-large)', margin: 0 }}>Display Large</h1>
              <span style={{ color: 'var(--colors-text-secondary)' }}>Inter / 64px</span>
            </div>
            <div>
              <h2 style={{ fontSize: 'var(--typography-sizes-heading-h1)', margin: 0 }}>Heading 1</h2>
              <span style={{ color: 'var(--colors-text-secondary)' }}>Inter / 36px</span>
            </div>
            <div>
              <p style={{ fontSize: 'var(--typography-sizes-body-large)', margin: 0 }}>
                Body Large - The quick brown fox jumps over the lazy dog.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Components & Shadows">
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            <div style={{ 
              padding: '32px', 
              borderRadius: 'var(--borders-radius-large)', 
              backgroundColor: 'var(--colors-surface-primary)',
              boxShadow: 'var(--effects-shadows-medium)',
              flex: 1,
              minWidth: '280px'
            }}>
              <h4 style={{ marginTop: 0 }}>Card Component</h4>
              <p style={{ color: 'var(--colors-text-secondary)' }}>This card uses the medium shadow and primary surface color.</p>
              <button style={{ 
                marginTop: '16px',
                padding: '10px 20px',
                backgroundColor: 'var(--colors-primary-default)',
                color: 'var(--colors-primary-contrast)',
                border: 'none',
                borderRadius: 'var(--borders-radius-medium)',
                cursor: 'pointer',
                fontWeight: 'var(--typography-font-weight-medium)'
              }}>
                Action Button
              </button>
            </div>
            
            <div style={{ 
              padding: '32px', 
              borderRadius: 'var(--borders-radius-large)', 
              backgroundColor: 'var(--colors-surface-primary)',
              boxShadow: 'var(--effects-shadows-glow)',
              flex: 1,
              minWidth: '280px',
              border: '1px solid var(--colors-primary-default)'
            }}>
              <h4 style={{ marginTop: 0 }}>Glow Effect</h4>
              <p style={{ color: 'var(--colors-text-secondary)' }}>Special cards can utilize the glow shadow for emphasis.</p>
            </div>
          </div>
        </Section>
      </div>
    </CloudrabbitTheme>
  );
};

export const HopHubDarkInterface = () => {
  return (
    <CloudrabbitTheme initialTheme="dark">
      <div style={{ 
        display: 'flex', 
        height: '600px', 
        width: '100%', 
        overflow: 'hidden',
        color: 'var(--colors-text-primary)',
        fontFamily: 'var(--typography-font-family)'
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
          borderRight: '1px solid var(--colors-border-subtle)'
        }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '50%', 
              backgroundColor: i === 1 ? 'var(--colors-primary-default)' : 'var(--colors-surface-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: i === 1 ? 'var(--effects-shadows-glow)' : 'none',
              transition: 'all 0.2s ease'
            }}>
              {i === 1 ? 'CH' : ''}
            </div>
          ))}
        </div>

        {/* Channel Sidebar */}
        <div style={{ 
          width: '240px', 
          backgroundColor: 'rgba(30, 41, 59, 0.6)', 
          padding: '24px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ 
            fontSize: 'var(--typography-sizes-heading-h4)', 
            fontWeight: 'bold', 
            marginBottom: '24px' 
          }}>
            CloudHop HQ
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <div style={{ 
              textTransform: 'uppercase', 
              fontSize: '11px', 
              color: 'var(--colors-text-secondary)',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              HopHub Channels
            </div>
            {['# general', '# announcements', '# random', '# music-lounge'].map(channel => (
              <div key={channel} style={{ 
                padding: '8px', 
                borderRadius: '4px',
                cursor: 'pointer',
                color: channel === '# general' ? 'var(--colors-text-primary)' : 'var(--colors-text-secondary)',
                backgroundColor: channel === '# general' ? 'var(--colors-surface-secondary)' : 'transparent'
              }}>
                {channel}
              </div>
            ))}
          </div>

          <div>
            <div style={{ 
              textTransform: 'uppercase', 
              fontSize: '11px', 
              color: 'var(--colors-text-secondary)',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              HopMeets
            </div>
            {['🔊 Daily Standup', '🔊 Design Sync'].map(channel => (
              <div key={channel} style={{ 
                padding: '8px', 
                color: 'var(--colors-text-secondary)',
                cursor: 'pointer'
              }}>
                {channel}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
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
            backgroundColor: 'rgba(15, 23, 42, 0.4)'
          }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}># general</span>
            <span style={{ marginLeft: '16px', fontSize: '14px', color: 'var(--colors-text-secondary)' }}>
              Welcome to the nebula...
            </span>
          </div>

          {/* Chat Area */}
          <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { user: 'Alice', time: '10:42 AM', text: 'Has anyone seen the new nebula theme update? It looks amazing!' },
              { user: 'Bob', time: '10:45 AM', text: 'Yes! The gradients are so smooth. Really gives that "Space" vibe we wanted for CloudHop.' },
              { user: 'Charlie', time: '10:48 AM', text: 'I love the new "Glow" shadow effects on the active server icons.' }
            ].map((msg, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '16px' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  backgroundColor: `hsl(${idx * 120}, 60%, 60%)` 
                }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 'bold', color: 'var(--colors-primary-default)' }}>{msg.user}</span>
                    <span style={{ fontSize: '12px', color: 'var(--colors-text-secondary)' }}>{msg.time}</span>
                  </div>
                  <div style={{ lineHeight: '1.5' }}>{msg.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div style={{ padding: '24px' }}>
            <div style={{ 
              backgroundColor: 'var(--colors-surface-secondary)', 
              padding: '16px', 
              borderRadius: '8px',
              color: 'var(--colors-text-secondary)'
            }}>
              Message #general...
            </div>
          </div>
        </div>
      </div>
    </CloudrabbitTheme>
  );
};