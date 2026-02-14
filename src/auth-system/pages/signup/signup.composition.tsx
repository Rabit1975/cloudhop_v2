import React from 'react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { Signup } from './signup.js';

export const BasicSignup = () => {
  return (
    <MockProvider>
      <Signup />
    </MockProvider>
  );
};

export const DarkModeSignup = () => {
  return (
    <MockProvider noTheme>
      <CloudrabbitTheme initialTheme="dark">
        <Signup />
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const MobileSignup = () => {
  return (
    <MockProvider>
      <div style={{ maxWidth: '375px', margin: '0 auto', border: '1px solid var(--colors-border-default)' }}>
        <Signup />
      </div>
    </MockProvider>
  );
};