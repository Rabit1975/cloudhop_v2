import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { ThemeToggler } from './theme-toggler.js';

export const BasicUsage = () => {
  return (
    <CloudrabbitTheme>
      <div style={{
        padding: '48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        minHeight: '200px',
        backgroundColor: 'var(--colors-surface-background)',
        color: 'var(--colors-text-primary)',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}>
        <h3 style={{ margin: 0 }}>Theme Toggler</h3>
        <ThemeToggler />
        <span style={{ color: 'var(--colors-text-secondary)' }}>
          Click to switch theme
        </span>
      </div>
    </CloudrabbitTheme>
  );
};

export const DarkModeInitial = () => {
  return (
    <CloudrabbitTheme initialTheme="dark">
      <div style={{
        padding: '48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        minHeight: '200px',
        backgroundColor: 'var(--colors-surface-background)',
        color: 'var(--colors-text-primary)',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}>
        <h3 style={{ margin: 0 }}>Dark Mode Initial</h3>
        <ThemeToggler />
        <span style={{ color: 'var(--colors-text-secondary)' }}>
          Starts in dark mode
        </span>
      </div>
    </CloudrabbitTheme>
  );
};

export const HeaderIntegration = () => {
  return (
    <CloudrabbitTheme>
      <div style={{
        backgroundColor: 'var(--colors-surface-background)',
        color: 'var(--colors-text-primary)',
        minHeight: '300px',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}>
        <header style={{
          height: '64px',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--colors-border-default)',
          backgroundColor: 'var(--colors-surface-primary)'
        }}>
          <span style={{ fontWeight: 'bold', fontSize: '18px' }}>CloudHop</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', color: 'var(--colors-text-secondary)' }}>Dashboard</span>
            <span style={{ fontSize: '14px', color: 'var(--colors-text-secondary)' }}>Settings</span>
            <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--colors-border-default)' }} />
            <ThemeToggler />
          </div>
        </header>
        <main style={{ padding: '32px' }}>
          <h1 style={{ fontSize: 'var(--typography-sizes-heading-h2)', marginTop: 0 }}>Welcome back</h1>
          <p style={{ color: 'var(--colors-text-secondary)', maxWidth: '600px', lineHeight: '1.6' }}>
            This composition demonstrates the theme toggler integrated into a typical application header.
            Try switching themes to see how the interface adapts.
          </p>
          <div style={{ 
            marginTop: '32px',
            padding: '24px',
            borderRadius: 'var(--borders-radius-medium)',
            backgroundColor: 'var(--colors-surface-secondary)',
            border: '1px solid var(--colors-border-subtle)'
          }}>
            <h4 style={{ margin: '0 0 16px 0' }}>Content Card</h4>
            <p style={{ margin: 0 }}>Card content adapts to the selected theme.</p>
          </div>
        </main>
      </div>
    </CloudrabbitTheme>
  );
};