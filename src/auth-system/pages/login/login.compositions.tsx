import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { Login } from './login.js';

export const BasicLogin = () => {
  return (
    <MockProvider>
      <Login />
    </MockProvider>
  );
};

export const DarkThemeLogin = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme initialTheme="dark">
        <Login />
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const LoginWithRedirectSimulation = () => {
  return (
    <MockProvider>
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route
            path="/"
            element={
              <div
                style={{
                  padding: '48px',
                  textAlign: 'center',
                  color: 'var(--colors-text-primary)',
                  fontFamily: 'var(--typography-font-family)',
                }}
              >
                <h1 style={{ fontSize: 'var(--typography-sizes-heading-h3)', marginBottom: '16px' }}>
                  Dashboard (Protected)
                </h1>
                <p style={{ color: 'var(--colors-text-secondary)' }}>
                  User successfully authenticated and redirected here.
                </p>
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </MemoryRouter>
    </MockProvider>
  );
};