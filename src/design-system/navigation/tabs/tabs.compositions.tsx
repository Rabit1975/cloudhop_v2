import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { Tabs } from './tabs.js';

export const BasicNavigation = () => {
  const tabs = [
    { label: 'HopHub', href: '/hophub' },
    { label: 'HopMeets', href: '/hopmeets' },
    { label: 'Music', href: '/music' },
    { label: 'Spaces', href: '/spaces' },
    { label: 'GameHub', href: '/gamehub' },
  ];

  return (
    <MemoryRouter initialEntries={['/hophub']}>
      <CloudrabbitTheme>
        <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)', minHeight: '200px' }}>
          <Tabs tabs={tabs} />
          <div style={{ padding: 'var(--spacing-medium) 0', color: 'var(--colors-text-secondary)' }}>
            <p>Content for HopHub...</p>
          </div>
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const ActiveTabExample = () => {
  const tabs = [
    { label: 'Overview', href: '/overview' },
    { label: 'Activity', href: '/activity' },
    { label: 'Settings', href: '/settings' },
  ];

  return (
    <MemoryRouter initialEntries={['/activity']}>
      <CloudrabbitTheme>
        <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)', minHeight: '150px' }}>
          <h3 style={{ margin: '0 0 var(--spacing-medium)', color: 'var(--colors-text-primary)' }}>User Profile</h3>
          <Tabs tabs={tabs} />
          <div style={{ marginTop: 'var(--spacing-large)', padding: 'var(--spacing-medium)', border: '1px dashed var(--colors-border-default)', borderRadius: 'var(--borders-radius-medium)' }}>
            Currently viewing: <strong>Activity</strong>
          </div>
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const DarkThemeWithIcons = () => {
  const iconStyle = { width: '16px', height: '16px', fill: 'currentColor' };

  const tabs = [
    {
      label: 'Chat',
      href: '/chat',
      icon: (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
      ),
    },
    {
      label: 'Calls',
      href: '/calls',
      icon: (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.26-.27.36-.66.25-1.01-.37-1.11-.56-2.3-.56-3.53 0-.55-.45-1-1-1H4.39c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
        </svg>
      ),
    },
    {
      label: 'People',
      href: '/people',
      icon: (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      ),
    },
  ];

  return (
    <MemoryRouter initialEntries={['/chat']}>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{
          padding: 'var(--spacing-xl)',
          backgroundColor: 'var(--colors-surface-background)',
          color: 'var(--colors-text-primary)',
          minHeight: '300px',
        }}>
          <div style={{ marginBottom: 'var(--spacing-large)' }}>
            <h2 style={{ fontSize: 'var(--typography-sizes-heading-h4)', margin: 0 }}>Community Space</h2>
            <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)' }}>
              Manage your community interactions
            </p>
          </div>
          <Tabs tabs={tabs} />
          <div style={{
            marginTop: 'var(--spacing-large)',
            padding: 'var(--spacing-large)',
            backgroundColor: 'var(--colors-surface-secondary)',
            borderRadius: 'var(--borders-radius-medium)',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--colors-text-secondary)'
          }}>
            Active Tab Content Area
          </div>
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};