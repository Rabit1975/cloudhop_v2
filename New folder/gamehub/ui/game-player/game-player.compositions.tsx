import React from 'react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { GamePlayer } from './game-player.js';

const COVER_IMAGE = 'https://storage.googleapis.com/bit-generated-images/images/image_a_dynamic__close_up_shot_of_a__0_1770832617236.png';

export const Html5GameWithCover = () => {
  return (
    <MockProvider>
      <div style={{ width: '100%', maxWidth: '800px', padding: '24px' }}>
        <GamePlayer
          title="Cosmic Explorer"
          platform="html5"
          gameUrl="about:blank"
          coverUrl={COVER_IMAGE}
        />
      </div>
    </MockProvider>
  );
};

export const UnityGameAutoPlay = () => {
  return (
    <MockProvider>
      <div style={{ width: '100%', maxWidth: '800px', padding: '24px' }}>
        <GamePlayer
          title="Nebula Racer 3D"
          platform="unity"
          gameUrl="about:blank"
          autoPlay
        />
      </div>
    </MockProvider>
  );
};

export const GameHubShowcase = () => {
  return (
    <MockProvider>
      <div style={{ 
        padding: '32px', 
        backgroundColor: 'var(--colors-surface-background)',
        minHeight: '100vh',
        color: 'var(--colors-text-primary)'
      }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            fontSize: 'var(--typography-sizes-heading-h3)',
            marginBottom: '8px',
            marginTop: 0
          }}>
            GameHub
          </h2>
          <p style={{ color: 'var(--colors-text-secondary)', margin: 0 }}>
            Curated HTML5 and Unity experiences.
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '32px'
        }}>
          <GamePlayer
            title="Space Strategy"
            platform="html5"
            gameUrl="about:blank"
            coverUrl={COVER_IMAGE}
            style={{ height: '240px', minHeight: 'auto' }}
          />
          <GamePlayer
            title="Alien Shooter"
            platform="unity"
            gameUrl="about:blank"
            coverUrl={COVER_IMAGE}
            style={{ height: '240px', minHeight: 'auto' }}
          />
           <GamePlayer
            title="Galaxy Quest"
            platform="html5"
            gameUrl="about:blank"
            coverUrl={COVER_IMAGE}
            style={{ height: '240px', minHeight: 'auto' }}
          />
        </div>
      </div>
    </MockProvider>
  );
};