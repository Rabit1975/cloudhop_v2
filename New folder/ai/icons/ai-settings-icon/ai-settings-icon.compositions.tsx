import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { AiSettingsIcon } from './ai-settings-icon.js';

export const BasicAiSettingsIcon = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '24px', color: 'var(--colors-text-primary)' }}>
        <AiSettingsIcon />
      </div>
    </CloudrabbitTheme>
  );
};

export const IconSizes = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', color: 'var(--colors-text-primary)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <AiSettingsIcon size={16} />
          <span style={{ fontSize: '12px', color: 'var(--colors-text-secondary)' }}>16px</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <AiSettingsIcon size={24} />
          <span style={{ fontSize: '12px', color: 'var(--colors-text-secondary)' }}>24px</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <AiSettingsIcon size={32} />
          <span style={{ fontSize: '12px', color: 'var(--colors-text-secondary)' }}>32px</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <AiSettingsIcon size={48} />
          <span style={{ fontSize: '12px', color: 'var(--colors-text-secondary)' }}>48px</span>
        </div>
      </div>
    </CloudrabbitTheme>
  );
};

export const IconColors = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px' }}>
        <AiSettingsIcon color="var(--colors-primary-default)" />
        <AiSettingsIcon color="var(--colors-secondary-default)" />
        <AiSettingsIcon color="var(--colors-status-negative-default)" />
        <AiSettingsIcon color="var(--colors-status-warning-default)" />
      </div>
    </CloudrabbitTheme>
  );
};

export const SettingsMenuExample = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ 
        padding: '24px',
        backgroundColor: 'var(--colors-surface-background)',
        color: 'var(--colors-text-primary)' 
      }}>
        <div style={{ 
          width: '280px',
          padding: '8px',
          borderRadius: 'var(--borders-radius-medium)',
          backgroundColor: 'var(--colors-surface-primary)',
          boxShadow: 'var(--effects-shadows-medium)'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            padding: '12px 16px',
            borderRadius: 'var(--borders-radius-small)',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          >
            <AiSettingsIcon color="var(--colors-text-secondary)" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 'var(--typography-sizes-body-small)', fontWeight: 'var(--typography-font-weight-medium)' }}>
                AI Configuration
              </span>
              <span style={{ fontSize: '12px', color: 'var(--colors-text-secondary)' }}>
                Model parameters & preferences
              </span>
            </div>
          </div>
        </div>
      </div>
    </CloudrabbitTheme>
  );
};