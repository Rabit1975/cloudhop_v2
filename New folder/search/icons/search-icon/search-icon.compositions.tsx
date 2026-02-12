import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { SearchIcon } from './search-icon.js';

export const BasicSearchIcon = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '24px' }}>
        <SearchIcon />
      </div>
    </CloudrabbitTheme>
  );
};

export const SearchIconSizes = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '24px', 
        padding: '24px',
        color: 'var(--colors-text-primary)' 
      }}>
        <SearchIcon size={16} />
        <SearchIcon size={24} />
        <SearchIcon size={32} />
        <SearchIcon size={48} />
      </div>
    </CloudrabbitTheme>
  );
};

export const SearchIconColors = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '24px', 
        padding: '24px',
        backgroundColor: 'var(--colors-surface-background)' 
      }}>
        <SearchIcon color="var(--colors-primary-default)" />
        <SearchIcon color="var(--colors-secondary-default)" />
        <SearchIcon color="var(--colors-text-secondary)" />
        <SearchIcon color="var(--colors-status-positive-default)" />
      </div>
    </CloudrabbitTheme>
  );
};

export const SearchInputExample = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '24px', backgroundColor: 'var(--colors-surface-background)' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-small)',
          padding: 'var(--spacing-small) var(--spacing-medium)',
          backgroundColor: 'var(--colors-surface-secondary)',
          borderRadius: 'var(--borders-radius-medium)',
          maxWidth: '300px',
          border: '1px solid var(--colors-border-subtle)'
        }}>
          <SearchIcon size={20} color="var(--colors-text-secondary)" />
          <span style={{ 
            color: 'var(--colors-text-secondary)',
            fontSize: 'var(--typography-sizes-body-default)'
          }}>
            Search CloudHop...
          </span>
        </div>
      </div>
    </CloudrabbitTheme>
  );
};