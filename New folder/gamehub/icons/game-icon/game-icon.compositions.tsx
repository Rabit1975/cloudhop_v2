import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { GameIcon } from './game-icon.js';

export const BasicGameIcon = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '24px', color: 'var(--colors-text-primary)' }}>
        <GameIcon />
      </div>
    </CloudrabbitTheme>
  );
};

export const IconSizes = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', color: 'var(--colors-text-primary)' }}>
        <GameIcon size={16} />
        <GameIcon size={24} />
        <GameIcon size={32} />
        <GameIcon size={48} />
      </div>
    </CloudrabbitTheme>
  );
};

export const IconColors = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px' }}>
        <GameIcon color="var(--colors-primary-default)" />
        <GameIcon color="var(--colors-secondary-default)" />
        <GameIcon color="var(--colors-status-positive-default)" />
        <GameIcon color="var(--colors-status-negative-default)" />
      </div>
    </CloudrabbitTheme>
  );
};

export const GameHubShowcase = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ 
        padding: '32px', 
        backgroundColor: 'var(--colors-surface-background)',
        maxWidth: '400px'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          padding: '16px',
          backgroundColor: 'var(--colors-surface-secondary)',
          borderRadius: 'var(--borders-radius-medium)',
          boxShadow: 'var(--effects-shadows-medium)',
          color: 'var(--colors-text-primary)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            backgroundColor: 'var(--colors-primary-default)',
            borderRadius: 'var(--borders-radius-small)',
            color: 'var(--colors-primary-contrast)'
          }}>
            <GameIcon size={24} color="currentColor" />
          </div>
          <div>
            <div style={{ fontWeight: 'bold' }}>GameHub</div>
            <div style={{ fontSize: '12px', color: 'var(--colors-text-secondary)' }}>Play now</div>
          </div>
        </div>
      </div>
    </CloudrabbitTheme>
  );
};