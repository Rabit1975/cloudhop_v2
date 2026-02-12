import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { AiIcon } from './ai-icon.js';

export const BasicAiIcon = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '24px', color: 'var(--colors-text-primary)' }}>
        <AiIcon />
      </div>
    </CloudrabbitTheme>
  );
};

export const AiIconSizes = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', color: 'var(--colors-text-primary)' }}>
        <AiIcon size={16} />
        <AiIcon size={24} />
        <AiIcon size={32} />
        <AiIcon size={48} />
      </div>
    </CloudrabbitTheme>
  );
};

export const AiIconColors = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px' }}>
        <AiIcon color="var(--colors-primary-default)" />
        <AiIcon color="var(--colors-secondary-default)" />
        <AiIcon color="var(--colors-status-positive-default)" />
        <AiIcon color="var(--colors-status-info-default)" />
      </div>
    </CloudrabbitTheme>
  );
};