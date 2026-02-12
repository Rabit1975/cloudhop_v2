import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { AiGenerateIcon } from './ai-generate-icon.js';

export const BasicAiGenerateIcon = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '24px', color: 'var(--colors-text-primary)' }}>
        <AiGenerateIcon />
      </div>
    </CloudrabbitTheme>
  );
};

export const IconSizes = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', color: 'var(--colors-text-primary)' }}>
        <AiGenerateIcon size={16} />
        <AiGenerateIcon size={24} />
        <AiGenerateIcon size={32} />
        <AiGenerateIcon size={48} />
      </div>
    </CloudrabbitTheme>
  );
};

export const IconColors = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px' }}>
        <AiGenerateIcon color="var(--colors-primary-default)" />
        <AiGenerateIcon color="var(--colors-secondary-default)" />
        <AiGenerateIcon color="var(--colors-status-positive-default)" />
        <AiGenerateIcon color="var(--colors-status-info-default)" />
      </div>
    </CloudrabbitTheme>
  );
};

export const GenerateButton = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '24px' }}>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          backgroundColor: 'var(--colors-primary-default)',
          color: 'var(--colors-primary-contrast)',
          border: 'none',
          borderRadius: 'var(--borders-radius-medium)',
          cursor: 'pointer',
          fontSize: 'var(--typography-sizes-body-medium)',
          fontWeight: 'var(--typography-font-weight-medium)',
          boxShadow: 'var(--effects-shadows-medium)'
        }}>
          <AiGenerateIcon />
          <span>Generate with AI</span>
        </button>
      </div>
    </CloudrabbitTheme>
  );
};