import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { UserIcon } from './user-icon.js';

export const BasicUserIcon = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '24px', color: 'var(--colors-text-primary)' }}>
        <UserIcon />
      </div>
    </CloudrabbitTheme>
  );
};

export const ColoredUserIcon = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '24px', display: 'flex', gap: '16px' }}>
        <UserIcon color="var(--colors-primary-default)" />
        <UserIcon color="var(--colors-secondary-default)" />
        <UserIcon color="var(--colors-status-positive-default)" />
      </div>
    </CloudrabbitTheme>
  );
};

export const SizedUserIcon = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--colors-text-primary)' }}>
        <UserIcon size={16} />
        <UserIcon size={24} />
        <UserIcon size={32} />
        <UserIcon size={48} />
      </div>
    </CloudrabbitTheme>
  );
};

export const UserProfilePreview = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '24px', color: 'var(--colors-text-primary)' }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          borderRadius: '50%', 
          backgroundColor: 'var(--colors-surface-secondary)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <UserIcon color="var(--colors-text-secondary)" />
        </div>
        <div>
          <div style={{ fontSize: 'var(--typography-sizes-body-small)', fontWeight: 'bold' }}>Anonymous User</div>
          <div style={{ fontSize: 'var(--typography-sizes-caption-default)', color: 'var(--colors-text-secondary)' }}>Online</div>
        </div>
      </div>
    </CloudrabbitTheme>
  );
};