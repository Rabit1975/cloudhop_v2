import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { Card } from './card.js';

const imageUrl = "https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_art__flowing__0_1770832599185.png";

export const BasicCard = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ maxWidth: 400, padding: 32 }}>
        <Card title="Welcome to CloudHop">
          <p style={{ margin: 0, lineHeight: '1.5' }}>
            Experience the modular operating system for next-generation communication.
            Combine chat, video, music, and gaming in one unified interface.
          </p>
        </Card>
      </div>
    </CloudrabbitTheme>
  );
};

export const GameHubInteractiveCard = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ maxWidth: 360, padding: 32 }}>
        <Card
          title="Cyber Odyssey"
          image={imageUrl}
          imageAlt="Digital abstract art representing a game world"
          interactive
          variant="outlined"
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--colors-text-secondary)', fontWeight: 500 }}>RPG • Adventure</span>
              <button style={{
                background: 'var(--colors-primary-default)',
                color: 'var(--colors-primary-contrast)',
                border: 'none',
                padding: '8px 16px',
                borderRadius: 'var(--borders-radius-medium)',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '12px'
              }}>
                Play Now
              </button>
            </div>
          }
        >
          <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
            Dive into the neon-soaked streets of the digital frontier.
            A masterpiece showcase on the GameHub platform.
          </p>
        </Card>
      </div>
    </CloudrabbitTheme>
  );
};

export const NebulaGlowMusicCard = () => {
  return (
    <CloudrabbitTheme initialTheme="dark">
      <div style={{
        padding: 48,
        background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ width: 340 }}>
          <Card
            variant="glow"
            interactive
            image={imageUrl}
            header={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  display: 'block',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: 'var(--colors-status-positive-default)',
                  boxShadow: '0 0 8px var(--colors-status-positive-default)'
                }} />
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--colors-text-primary)', letterSpacing: '0.5px' }}>
                  LIVE ON AIR
                </span>
              </div>
            }
          >
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', color: 'var(--colors-text-primary)' }}>
              Deep Space Lo-Fi
            </h3>
            <p style={{ margin: 0, color: 'var(--colors-text-secondary)', fontSize: '14px', lineHeight: '1.5' }}>
              Broadcasting relaxing beats for coding and creative sessions across the Nebula.
            </p>
          </Card>
        </div>
      </div>
    </CloudrabbitTheme>
  );
};

export const HopMeetsScheduleCard = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ maxWidth: 420, padding: 32 }}>
        <Card
          variant="elevated"
          header={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <span style={{ fontWeight: 'bold', color: 'var(--colors-text-primary)' }}>Design Sync</span>
              <span style={{
                backgroundColor: 'var(--colors-surface-tertiary)',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '12px',
                color: 'var(--colors-text-secondary)',
                fontWeight: 500
              }}>
                10:00 AM
              </span>
            </div>
          }
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <span style={{ 
                fontSize: '13px', 
                color: 'var(--colors-primary-default)', 
                cursor: 'pointer',
                fontWeight: 600
              }}>
                Join Meeting &rarr;
              </span>
            </div>
          }
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ display: 'flex' }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: `hsl(${200 + i * 20}, 60%, 80%)`,
                  border: '2px solid var(--colors-surface-secondary)',
                  marginLeft: i > 1 ? -10 : 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  U{i}
                </div>
              ))}
            </div>
            <span style={{ fontSize: '12px', color: 'var(--colors-text-secondary)' }}>+4 others attending</span>
          </div>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--colors-text-secondary)', lineHeight: '1.5' }}>
            Weekly synchronization for the CloudHop product design team. 
            Reviewing new card components and nebula themes.
          </p>
        </Card>
      </div>
    </CloudrabbitTheme>
  );
};