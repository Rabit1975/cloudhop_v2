import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { MusicTrack } from '@cloudrabbit/music.entities.music-track';
import { AddToPlaylistButton } from './add-to-playlist-button.js';

const mockTrack = new MusicTrack(
  'track-1',
  'Stellar Drifting',
  245,
  'youtube',
  'abc12345',
  true,
  new Date().toISOString(),
  'Cosmic Beats',
  'https://storage.googleapis.com/bit-generated-images/images/image_a_futuristic_and_sleek_ui_desi_0_1770835129027.png'
);

export const BasicUsage = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ 
          padding: '100px', 
          display: 'flex', 
          justifyContent: 'center', 
          backgroundColor: 'var(--colors-surface-background)',
          minHeight: '400px' 
        }}>
          <AddToPlaylistButton track={mockTrack} />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const InCardContext = () => {
  const mockTrack2 = new MusicTrack(
    'track-2',
    'Galactic Groove',
    300,
    'external',
    'def67890',
    false,
    new Date().toISOString(),
    'Astro Funk',
    'https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_data_flow_and_0_1770832820622.png'
  );

  return (
    <MockProvider>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ 
          padding: '60px', 
          backgroundColor: 'var(--colors-surface-background)',
          minHeight: '500px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{ 
            width: '300px', 
            padding: '24px', 
            borderRadius: 'var(--borders-radius-large)',
            backgroundColor: 'var(--colors-surface-primary)',
            boxShadow: 'var(--effects-shadows-medium)',
            border: '1px solid var(--colors-border-subtle)'
          }}>
            <div style={{ 
              width: '100%', 
              height: '180px', 
              borderRadius: 'var(--borders-radius-medium)',
              marginBottom: '16px',
              backgroundImage: `url(${mockTrack2.thumbnailUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} />
            
            <h3 style={{ margin: '0 0 4px 0', fontSize: 'var(--typography-sizes-heading-h6)', color: 'var(--colors-text-primary)' }}>
              {mockTrack2.title}
            </h3>
            <p style={{ margin: '0 0 24px 0', color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)' }}>
              {mockTrack2.artist}
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <AddToPlaylistButton track={mockTrack2} />
            </div>
          </div>
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};