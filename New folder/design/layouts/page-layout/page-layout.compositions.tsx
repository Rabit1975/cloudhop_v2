import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { PageLayout } from './page-layout.js';

export const HopHubGeneral = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <PageLayout
          title="HopHub | General"
          description="Community general chat channel"
        >
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 'var(--spacing-medium)',
            color: 'var(--colors-text-primary)' 
          }}>
            <div style={{
              padding: 'var(--spacing-medium)',
              borderBottom: '1px solid var(--colors-border-subtle)',
              marginBottom: 'var(--spacing-medium)'
            }}>
              <h1 style={{ fontSize: 'var(--typography-sizes-heading-h3)', margin: 0 }}># general</h1>
              <p style={{ color: 'var(--colors-text-secondary)', margin: '4px 0 0' }}>The main hub for everyone.</p>
            </div>
            
            <div style={{
              backgroundColor: 'var(--colors-surface-primary)',
              padding: 'var(--spacing-large)',
              borderRadius: 'var(--borders-radius-medium)',
              boxShadow: 'var(--effects-shadows-small)'
            }}>
              <p style={{ margin: 0 }}>Welcome to the CloudHop nebula! This layout automatically centers content and handles responsiveness.</p>
            </div>
          </div>
        </PageLayout>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const MusicPlayerLayout = () => {
  const tabs = [
    { label: 'Discover', href: '/music/discover' },
    { label: 'Library', href: '/music/library' },
    { label: 'Playlists', href: '/music/playlists' },
  ];

  return (
    <MemoryRouter initialEntries={['/music/library']}>
      <CloudrabbitTheme>
        <PageLayout
          title="Music Studio"
          description="Your personal music space"
          tabs={tabs}
        >
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
            gap: 'var(--spacing-large)' 
          }}>
            {[1, 2, 3, 4].map((item) => (
              <div key={item} style={{
                backgroundColor: 'var(--colors-surface-primary)',
                borderRadius: 'var(--borders-radius-medium)',
                overflow: 'hidden',
                boxShadow: 'var(--effects-shadows-medium)'
              }}>
                <div style={{ 
                  height: '140px', 
                  backgroundColor: 'var(--colors-surface-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--colors-text-secondary)'
                }}>
                  Album Art
                </div>
                <div style={{ padding: 'var(--spacing-medium)' }}>
                  <div style={{ fontWeight: 'bold', color: 'var(--colors-text-primary)' }}>Synthwave Mix {item}</div>
                  <div style={{ fontSize: 'var(--typography-sizes-caption-default)', color: 'var(--colors-text-secondary)' }}>Various Artists</div>
                </div>
              </div>
            ))}
          </div>
        </PageLayout>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const GameHubDark = () => {
  const tabs = [
    { label: 'Featured', href: '/games/featured' },
    { label: 'Arcade', href: '/games/arcade' },
    { label: 'Unity Showcase', href: '/games/unity' },
  ];

  return (
    <MemoryRouter initialEntries={['/games/featured']}>
      <CloudrabbitTheme initialTheme="dark">
        <PageLayout
          title="GameHub"
          description="Play and create games"
          tabs={tabs}
        >
          <div style={{
            background: 'var(--effects-gradients-primary)',
            borderRadius: 'var(--borders-radius-large)',
            padding: 'var(--spacing-xl)',
            color: 'var(--colors-text-inverse)',
            boxShadow: 'var(--effects-shadows-glow)',
            marginBottom: 'var(--spacing-large)'
          }}>
            <h2 style={{ fontSize: 'var(--typography-sizes-display-small)', margin: '0 0 var(--spacing-small)' }}>
              Neon Racer 2049
            </h2>
            <p style={{ maxWidth: '600px', fontSize: 'var(--typography-sizes-body-large)' }}>
              Experience high-speed racing in a retro-futuristic world. Now available in the arcade.
            </p>
            <button style={{
              marginTop: 'var(--spacing-medium)',
              padding: 'var(--spacing-small) var(--spacing-large)',
              backgroundColor: 'var(--colors-surface-background)',
              color: 'var(--colors-text-default)',
              border: 'none',
              borderRadius: 'var(--borders-radius-full)',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Play Now
            </button>
          </div>

          <div style={{ display: 'flex', gap: 'var(--spacing-medium)', overflowX: 'auto', paddingBottom: 'var(--spacing-small)' }}>
             {[1, 2, 3, 4].map(i => (
               <div key={i} style={{
                 minWidth: '240px',
                 height: '160px',
                 backgroundColor: 'var(--colors-surface-secondary)',
                 borderRadius: 'var(--borders-radius-medium)',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 color: 'var(--colors-text-secondary)',
                 border: '1px solid var(--colors-border-subtle)'
               }}>
                 Game Thumbnail {i}
               </div>
             ))}
          </div>
        </PageLayout>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};