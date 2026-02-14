import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { Paragraph } from './paragraph.js';

export const BasicParagraph = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '32px', maxWidth: '600px' }}>
        <Paragraph>
          CloudHop is a modular operating system for next-generation communication, combining real-time group chat, HD video meetings, music streaming, and creative tools into a unified digital experience.
        </Paragraph>
      </div>
    </CloudrabbitTheme>
  );
};

export const ParagraphSizes = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '32px', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <span style={{ fontSize: '12px', color: 'var(--colors-text-secondary)', display: 'block', marginBottom: '8px' }}>Large</span>
          <Paragraph size="large">
            Welcome to the nebula. CloudHop provides users with a seamless interface for social interaction.
          </Paragraph>
        </div>

        <div>
          <span style={{ fontSize: '12px', color: 'var(--colors-text-secondary)', display: 'block', marginBottom: '8px' }}>Medium</span>
          <Paragraph size="medium">
            HopHub allows for real-time chat with groups and channels, keeping you connected with your community.
          </Paragraph>
        </div>

        <div>
          <span style={{ fontSize: '12px', color: 'var(--colors-text-secondary)', display: 'block', marginBottom: '8px' }}>Default</span>
          <Paragraph size="default">
            HopMeets offers video conferencing and meeting rooms (Zoom Style) directly within the platform.
          </Paragraph>
        </div>

        <div>
          <span style={{ fontSize: '12px', color: 'var(--colors-text-secondary)', display: 'block', marginBottom: '8px' }}>Small</span>
          <Paragraph size="small">
            Powered by React and TypeScript. Copyright © 2024 CloudHop. All rights reserved.
          </Paragraph>
        </div>
      </div>
    </CloudrabbitTheme>
  );
};

export const InContextChat = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ 
        padding: '32px', 
        backgroundColor: 'var(--colors-surface-secondary)', 
        borderRadius: 'var(--borders-radius-large)',
        maxWidth: '400px'
      }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            backgroundColor: 'var(--colors-primary-default)' 
          }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '14px', color: 'var(--colors-text-primary)' }}>Alice</span>
              <span style={{ fontSize: '12px', color: 'var(--colors-text-secondary)' }}>10:42 AM</span>
            </div>
            <Paragraph size="default">
              Has anyone seen the new nebula theme update? It looks amazing! The gradients are so smooth.
            </Paragraph>
          </div>
        </div>
      </div>
    </CloudrabbitTheme>
  );
};

export const DarkModeMarketing = () => {
  return (
    <CloudrabbitTheme initialTheme="dark">
      <div style={{ 
        padding: '48px', 
        background: 'var(--effects-gradients-nebula)',
        color: 'var(--colors-text-primary)',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          fontSize: 'var(--typography-sizes-heading-h2)', 
          marginBottom: '16px',
          background: 'var(--effects-gradients-primary)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Experience the Nebula
        </h2>
        <div style={{ maxWidth: '600px' }}>
          <Paragraph size="large" style={{ color: 'var(--colors-text-secondary)' }}>
            The nebula background creates visual distinction for the social hub while keeping other sections focused and distraction-free.
          </Paragraph>
        </div>
      </div>
    </CloudrabbitTheme>
  );
};