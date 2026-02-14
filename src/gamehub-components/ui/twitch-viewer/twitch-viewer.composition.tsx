import React from 'react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { TwitchViewer } from './twitch-viewer.js';

export const BasicChannel = () => {
  return (
    <MockProvider>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
        <h3 style={{ 
          color: 'var(--colors-text-primary)', 
          fontFamily: 'var(--typography-font-family)',
          marginBottom: '16px'
        }}>
          Live Channel Embed
        </h3>
        <TwitchViewer channelName="twitch" />
      </div>
    </MockProvider>
  );
};

export const FromStreamUrl = () => {
  return (
    <MockProvider>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
        <h3 style={{ 
          color: 'var(--colors-text-primary)', 
          fontFamily: 'var(--typography-font-family)',
          marginBottom: '16px'
        }}>
          Embed via URL
        </h3>
        <TwitchViewer 
          twitchStreamUrl="https://www.twitch.tv/rocketleague" 
          muted={true}
        />
      </div>
    </MockProvider>
  );
};

export const GameHubShowcase = () => {
  return (
    <MockProvider>
      <div style={{ 
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'var(--colors-surface-background)',
        color: 'var(--colors-text-primary)',
        fontFamily: 'var(--typography-font-family)',
        padding: '48px 24px'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
            <div>
              <h1 style={{ 
                margin: 0, 
                fontSize: 'var(--typography-sizes-display-small)',
                background: 'var(--effects-gradients-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: 'var(--typography-letter-spacing-tight)'
              }}>
                GameHub
              </h1>
              <p style={{ 
                margin: '8px 0 0', 
                color: 'var(--colors-text-secondary)',
                fontSize: 'var(--typography-sizes-body-large)'
              }}>
                Top trending streams in CloudHop
              </p>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              padding: '6px 12px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid var(--colors-status-negative-default)',
              borderRadius: 'var(--borders-radius-full)',
              color: 'var(--colors-status-negative-default)',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              <span style={{ 
                display: 'block', 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                backgroundColor: 'currentColor' 
              }} />
              LIVE NOW
            </div>
          </header>

          <div style={{ 
            backgroundColor: 'var(--colors-surface-primary)',
            borderRadius: 'var(--borders-radius-large)',
            padding: '24px',
            boxShadow: 'var(--effects-shadows-medium)',
            border: '1px solid var(--colors-border-subtle)'
          }}>
            <TwitchViewer 
              channelName="riotgames" 
              muted={true}
              style={{ 
                borderRadius: 'var(--borders-radius-medium)',
                marginBottom: '20px'
              }}
            />
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <img 
                src="https://storage.googleapis.com/bit-generated-images/images/image_a_futuristic__minimalist_digit_0_1770832613543.png" 
                alt="Streamer Avatar"
                style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '16px',
                  objectFit: 'cover',
                  border: '2px solid var(--colors-surface-tertiary)'
                }} 
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <h3 style={{ margin: 0, fontSize: 'var(--typography-sizes-heading-h5)' }}>
                    Official Tournament Stream
                  </h3>
                  <span style={{ 
                    color: 'var(--colors-primary-default)', 
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}>
                    245K Viewers
                  </span>
                </div>
                <div style={{ color: 'var(--colors-text-secondary)', fontSize: '14px', marginBottom: '12px' }}>
                  Riot Games Official • League of Legends
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Esports', 'MOBA', 'Competitive'].map(tag => (
                    <span key={tag} style={{ 
                      padding: '4px 12px', 
                      backgroundColor: 'var(--colors-surface-secondary)', 
                      borderRadius: 'var(--borders-radius-full)',
                      fontSize: '12px',
                      color: 'var(--colors-text-secondary)',
                      fontWeight: '500'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MockProvider>
  );
};