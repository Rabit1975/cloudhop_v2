import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { StatusMessage } from './status-message.js';

export const BasicUsage = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '32px' }}>
        <StatusMessage message="Working from home 🏠" />
      </div>
    </CloudrabbitTheme>
  );
};

export const LongMessageTruncated = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ 
        padding: '32px', 
        width: '200px', 
        border: '1px dashed var(--colors-border-default)',
        borderRadius: '8px'
      }}>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--colors-text-secondary)' }}>
          Restricted Width (200px)
        </div>
        <StatusMessage message="Listening to CloudHop FM • Chill Beats for Coding and Focus 🎵" />
      </div>
    </CloudrabbitTheme>
  );
};

export const UserProfileCard = () => {
  return (
    <CloudrabbitTheme>
      <div style={{
        padding: '24px',
        backgroundColor: 'var(--colors-surface-primary)',
        borderRadius: 'var(--borders-radius-large)',
        width: '300px',
        boxShadow: 'var(--effects-shadows-medium)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: 'var(--colors-primary-default)',
          color: 'var(--colors-text-inverse)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '18px',
          flexShrink: 0
        }}>
          JD
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, gap: '4px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '16px', color: 'var(--colors-text-primary)' }}>
            John Doe
          </span>
          <StatusMessage message="In a meeting - do not disturb" />
        </div>
      </div>
    </CloudrabbitTheme>
  );
};

export const DarkModeContext = () => {
  return (
    <CloudrabbitTheme initialTheme="dark">
      <div style={{
        padding: '48px',
        background: 'var(--effects-gradients-nebula)',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 20px',
          backgroundColor: 'rgba(30, 41, 59, 0.7)',
          backdropFilter: 'var(--effects-blur-medium)',
          borderRadius: 'var(--borders-radius-full)',
          border: '1px solid var(--colors-border-subtle)',
          maxWidth: '100%'
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--colors-status-positive-default)' }} />
          <StatusMessage message="Exploring the nebula 🚀" />
        </div>
      </div>
    </CloudrabbitTheme>
  );
};