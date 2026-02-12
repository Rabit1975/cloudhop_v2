import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { ForgotPassword } from './forgot-password.js';

export const BasicForgotPassword = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--colors-surface-background)' }}>
          <ForgotPassword />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const DarkModeForgotPassword = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ 
          minHeight: '100vh', 
          backgroundColor: 'var(--colors-surface-background)',
          backgroundImage: 'var(--effects-gradients-nebula)',
          backgroundSize: 'cover'
        }}>
          <ForgotPassword />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};