import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { Event } from './event.js';

export const BasicEvent = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '24px', color: 'var(--colors-text-primary)' }}>
        <Event />
      </div>
    </CloudrabbitTheme>
  );
};

export const EventSizes = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', color: 'var(--colors-text-primary)' }}>
        <Event size={16} />
        <Event size={24} />
        <Event size={32} />
        <Event size={48} />
      </div>
    </CloudrabbitTheme>
  );
};

export const EventColors = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px' }}>
        <Event color="var(--colors-primary-default)" />
        <Event color="var(--colors-secondary-default)" />
        <Event color="var(--colors-status-positive-default)" />
        <Event color="var(--colors-status-negative-default)" />
      </div>
    </CloudrabbitTheme>
  );
};