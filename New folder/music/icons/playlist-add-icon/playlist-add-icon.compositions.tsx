import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { PlaylistAddIcon } from './playlist-add-icon.js';

export const BasicPlaylistAddIcon = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '24px', color: 'var(--colors-text-primary)' }}>
        <PlaylistAddIcon />
      </div>
    </CloudrabbitTheme>
  );
};

export const IconSizes = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', color: 'var(--colors-text-primary)' }}>
        <PlaylistAddIcon size={16} />
        <PlaylistAddIcon size={24} />
        <PlaylistAddIcon size={32} />
        <PlaylistAddIcon size={48} />
      </div>
    </CloudrabbitTheme>
  );
};

export const IconColors = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px' }}>
        <PlaylistAddIcon color="var(--colors-primary-default)" />
        <PlaylistAddIcon color="var(--colors-secondary-default)" />
        <PlaylistAddIcon color="var(--colors-status-positive-default)" />
        <PlaylistAddIcon color="var(--colors-text-secondary)" />
      </div>
    </CloudrabbitTheme>
  );
};

export const AddToPlaylistButton = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '24px' }}>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: 'var(--colors-surface-secondary)',
            color: 'var(--colors-text-primary)',
            border: '1px solid var(--colors-border-default)',
            borderRadius: 'var(--borders-radius-medium)',
            cursor: 'pointer',
            fontSize: 'var(--typography-sizes-body-small)',
            fontFamily: 'var(--typography-font-family)'
          }}
        >
          <PlaylistAddIcon size={16} />
          <span>Add to Queue</span>
        </button>
      </div>
    </CloudrabbitTheme>
  );
};