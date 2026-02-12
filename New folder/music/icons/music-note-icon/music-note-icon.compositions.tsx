import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MusicNoteIcon } from './music-note-icon.js';

export const BasicMusicNoteIcon = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '24px', color: 'var(--colors-text-primary)' }}>
        <MusicNoteIcon />
      </div>
    </CloudrabbitTheme>
  );
};

export const MusicNoteIconSizes = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', color: 'var(--colors-text-primary)' }}>
        <MusicNoteIcon size={16} />
        <MusicNoteIcon size={24} />
        <MusicNoteIcon size={32} />
        <MusicNoteIcon size={48} />
      </div>
    </CloudrabbitTheme>
  );
};

export const MusicNoteIconColors = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px' }}>
        <MusicNoteIcon color="var(--colors-primary-default)" />
        <MusicNoteIcon color="var(--colors-secondary-default)" />
        <MusicNoteIcon color="var(--colors-status-positive-default)" />
        <MusicNoteIcon color="var(--colors-status-negative-default)" />
      </div>
    </CloudrabbitTheme>
  );
};