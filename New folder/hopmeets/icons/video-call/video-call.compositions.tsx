import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { VideoCall } from './video-call.js';

export const BasicVideoCall = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '24px', color: 'var(--colors-text-primary)' }}>
        <VideoCall />
      </div>
    </CloudrabbitTheme>
  );
};

export const VideoCallSizes = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '24px', 
        padding: '24px', 
        color: 'var(--colors-text-primary)' 
      }}>
        <VideoCall size={16} />
        <VideoCall size={24} />
        <VideoCall size={32} />
        <VideoCall size={48} />
      </div>
    </CloudrabbitTheme>
  );
};

export const HopMeetsControl = () => {
  return (
    <CloudrabbitTheme initialTheme="dark">
      <div style={{ 
        padding: '48px', 
        backgroundColor: 'var(--colors-surface-background)', 
        display: 'flex', 
        justifyContent: 'center' 
      }}>
        <button style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          backgroundColor: 'var(--colors-primary-default)',
          color: 'var(--colors-primary-contrast)',
          border: 'none',
          padding: '12px 24px',
          borderRadius: 'var(--borders-radius-full)',
          fontSize: 'var(--typography-sizes-body-large)',
          fontWeight: 'var(--typography-font-weight-medium)',
          cursor: 'pointer',
          boxShadow: 'var(--effects-shadows-glow)'
        }}>
          <VideoCall size={24} />
          <span>Start New Meeting</span>
        </button>
      </div>
    </CloudrabbitTheme>
  );
};