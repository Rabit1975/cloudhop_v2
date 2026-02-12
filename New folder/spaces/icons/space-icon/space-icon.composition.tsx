import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { SpaceIcon } from './space-icon.js';

export const BasicSpaceIcon = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '24px' }}>
        <SpaceIcon />
      </div>
    </CloudrabbitTheme>
  );
};

export const SizeVariations = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '24px', 
        padding: '24px',
        color: 'var(--colors-text-primary)' 
      }}>
        <SpaceIcon size={16} />
        <SpaceIcon size={24} />
        <SpaceIcon size={32} />
        <SpaceIcon size={48} />
      </div>
    </CloudrabbitTheme>
  );
};

export const ColorVariations = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '24px', 
        padding: '24px',
        backgroundColor: 'var(--colors-surface-background)' 
      }}>
        <SpaceIcon color="var(--colors-primary-default)" />
        <SpaceIcon color="var(--colors-secondary-default)" />
        <SpaceIcon color="var(--colors-status-info-default)" />
        <SpaceIcon color="var(--colors-text-secondary)" />
      </div>
    </CloudrabbitTheme>
  );
};

export const SidebarMenuItem = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ 
        padding: '24px', 
        backgroundColor: 'var(--colors-surface-background)',
        width: '280px' 
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 16px',
          backgroundColor: 'var(--colors-surface-primary)',
          borderRadius: 'var(--borders-radius-medium)',
          border: '1px solid var(--colors-border-subtle)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: 'var(--effects-shadows-small)'
        }}>
          <SpaceIcon size={20} color="var(--colors-primary-default)" />
          <span style={{ 
            fontSize: 'var(--typography-sizes-body-small)', 
            fontWeight: 'var(--typography-font-weight-medium)',
            color: 'var(--colors-text-primary)'
          }}>
            Creative Spaces
          </span>
        </div>
      </div>
    </CloudrabbitTheme>
  );
};