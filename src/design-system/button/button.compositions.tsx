import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { Button } from './button.js';

export const ButtonVariations = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: 'var(--spacing-xl)', display: 'flex', gap: 'var(--spacing-medium)', alignItems: 'center', backgroundColor: 'var(--colors-surface-background)' }}>
        <Button appearance="primary">Create Server</Button>
        <Button appearance="secondary">Join Channel</Button>
        <Button appearance="tertiary">Cancel</Button>
      </div>
    </CloudrabbitTheme>
  );
};

export const NavigationButtons = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ padding: 'var(--spacing-xl)', display: 'flex', gap: 'var(--spacing-medium)', backgroundColor: 'var(--colors-surface-background)' }}>
          <Button href="/hop-hub" appearance="primary">
            Go to HopHub
          </Button>
          <Button href="https://unity.com" external appearance="secondary">
            Unity Asset Store
          </Button>
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const ButtonStates = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: 'var(--spacing-xl)', display: 'flex', gap: 'var(--spacing-medium)', backgroundColor: 'var(--colors-surface-background)' }}>
        <Button disabled appearance="primary">Connecting...</Button>
        <Button disabled appearance="secondary">Offline</Button>
        <Button disabled appearance="tertiary">Muted</Button>
      </div>
    </CloudrabbitTheme>
  );
};

export const NebulaHeroAction = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ 
          padding: 'var(--spacing-xxl)', 
          backgroundColor: 'var(--colors-surface-background)',
          backgroundImage: 'var(--effects-gradients-nebula)',
          backgroundSize: 'cover',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 'var(--spacing-large)',
          borderRadius: 'var(--borders-radius-large)',
          overflow: 'hidden'
        }}>
          <h1 style={{ margin: 0, fontSize: 'var(--typography-sizes-display-small)', color: 'var(--colors-text-primary)' }}>
            Welcome to CloudHop
          </h1>
          <p style={{ margin: 0, maxWidth: '400px', color: 'var(--colors-text-secondary)', lineHeight: 'var(--typography-line-height-base)' }}>
            Your unified operating system for communication, gaming, and creativity. Join the nebula today.
          </p>
          <div style={{ display: 'flex', gap: 'var(--spacing-medium)' }}>
            <Button href="/signup" appearance="primary">Get Started</Button>
            <Button href="/tour" appearance="secondary">Take a Tour</Button>
          </div>
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};