import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AddSpaceIcon } from './add-space-icon.js';

export const BasicAddSpaceIcon = () => {
  return (
    <MemoryRouter>
      <div style={{ padding: '24px', color: 'var(--colors-text-primary)' }}>
        <AddSpaceIcon />
      </div>
    </MemoryRouter>
  );
};

export const IconSizes = () => {
  return (
    <MemoryRouter>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', color: 'var(--colors-text-primary)' }}>
        <AddSpaceIcon size={16} />
        <AddSpaceIcon size={24} />
        <AddSpaceIcon size={32} />
        <AddSpaceIcon size={48} />
      </div>
    </MemoryRouter>
  );
};

export const IconColors = () => {
  return (
    <MemoryRouter>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px' }}>
        <AddSpaceIcon color="var(--colors-primary-default)" />
        <AddSpaceIcon color="var(--colors-secondary-default)" />
        <AddSpaceIcon color="var(--colors-status-positive-default)" />
        <AddSpaceIcon color="var(--colors-text-secondary)" />
      </div>
    </MemoryRouter>
  );
};

export const AddSpaceButton = () => {
  return (
    <MemoryRouter>
      <div style={{ padding: '24px' }}>
        <button 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            padding: '12px 24px',
            backgroundColor: 'var(--colors-surface-secondary)',
            border: '1px solid var(--colors-border-default)',
            borderRadius: 'var(--borders-radius-medium)',
            color: 'var(--colors-text-primary)',
            cursor: 'pointer',
            fontSize: 'var(--typography-sizes-body-default)',
            transition: 'background-color 0.2s'
          }}
        >
          <AddSpaceIcon size={20} />
          <span>Create New Space</span>
        </button>
      </div>
    </MemoryRouter>
  );
};