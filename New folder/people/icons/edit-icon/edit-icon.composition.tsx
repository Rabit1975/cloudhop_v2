import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { EditIcon } from './edit-icon.js';

export const BasicEditIcon = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '24px', color: 'var(--colors-text-primary)' }}>
        <EditIcon />
      </div>
    </CloudrabbitTheme>
  );
};

export const EditIconSizes = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', color: 'var(--colors-text-primary)' }}>
        <EditIcon size={16} />
        <EditIcon size={24} />
        <EditIcon size={32} />
        <EditIcon size={48} />
      </div>
    </CloudrabbitTheme>
  );
};

export const EditIconColors = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px' }}>
        <EditIcon color="var(--colors-primary-default)" />
        <EditIcon color="var(--colors-secondary-default)" />
        <EditIcon color="var(--colors-status-positive-default)" />
        <EditIcon color="var(--colors-status-negative-default)" />
      </div>
    </CloudrabbitTheme>
  );
};