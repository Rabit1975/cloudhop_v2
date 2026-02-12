import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { AddIcon } from './add-icon.js';

export const BasicAddIcon = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ padding: '24px', color: 'var(--colors-text-primary)' }}>
          <AddIcon />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const IconSizes = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', color: 'var(--colors-text-primary)' }}>
          <AddIcon size={16} />
          <AddIcon size={24} />
          <AddIcon size={32} />
          <AddIcon size={48} />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const ColoredIcons = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px' }}>
          <AddIcon color="var(--colors-primary-default)" />
          <AddIcon color="var(--colors-secondary-default)" />
          <AddIcon color="var(--colors-status-positive-default)" />
          <AddIcon color="var(--colors-text-secondary)" />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const AddButtonContext = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ padding: '24px', display: 'flex', gap: '16px' }}>
           {/* Simulate a circular 'Add Server' button */}
           <button style={{
             width: '48px',
             height: '48px',
             borderRadius: '50%',
             backgroundColor: 'var(--colors-surface-secondary)',
             border: '1px dashed var(--colors-border-default)',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             cursor: 'pointer',
             color: 'var(--colors-status-positive-default)',
             transition: 'all 0.2s ease'
           }}>
             <AddIcon size={24} />
           </button>

           {/* Text button */}
           <button style={{
             display: 'flex',
             alignItems: 'center',
             gap: '8px',
             padding: '8px 16px',
             backgroundColor: 'var(--colors-primary-default)',
             color: 'var(--colors-primary-contrast)',
             border: 'none',
             borderRadius: 'var(--borders-radius-medium)',
             cursor: 'pointer'
           }}>
             <AddIcon size={20} />
             <span>Create Space</span>
           </button>
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};