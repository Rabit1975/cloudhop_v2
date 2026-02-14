import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { CtaButton } from './cta-button.js';

export const BasicCta = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ 
          padding: 'var(--spacing-xl)', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '150px' 
        }}>
          <CtaButton>Join CloudHop</CtaButton>
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const CtaVariations = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ 
          padding: 'var(--spacing-xl)', 
          display: 'flex', 
          gap: 'var(--spacing-large)', 
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          minHeight: '150px'
        }}>
          <CtaButton appearance="primary">Get Started</CtaButton>
          <CtaButton appearance="secondary">View Pricing</CtaButton>
          <CtaButton appearance="tertiary">Learn More</CtaButton>
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const HeroSectionExample = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{
          padding: '80px 40px',
          minHeight: '500px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 'var(--spacing-xl)',
          backgroundColor: 'var(--colors-surface-background)',
          backgroundImage: 'var(--effects-gradients-nebula)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'var(--colors-text-primary)'
        }}>
          <h1 style={{ 
            fontSize: 'var(--typography-sizes-display-medium)', 
            margin: 0,
            maxWidth: '800px',
            lineHeight: 'var(--typography-line-height-heading)'
          }}>
            Unified Communication for the Modern Web
          </h1>
          <p style={{ 
            fontSize: 'var(--typography-sizes-body-large)', 
            color: 'var(--colors-text-secondary)',
            margin: 0,
            maxWidth: '600px',
            lineHeight: 'var(--typography-line-height-base)'
          }}>
            Experience high-definition video, real-time chat, and creative spaces all in one modular operating system. Join the nebula today.
          </p>
          <div style={{ display: 'flex', gap: 'var(--spacing-medium)', marginTop: 'var(--spacing-large)' }}>
            <CtaButton href="/signup" appearance="primary">Start Free Trial</CtaButton>
            <CtaButton href="/demo" appearance="secondary">Watch Demo</CtaButton>
          </div>
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};