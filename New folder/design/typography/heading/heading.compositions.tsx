import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { Heading } from './heading.js';

export const BasicHeadingHierarchy = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
        <Heading element="h1">CloudHop Platform (H1)</Heading>
        <Heading element="h2">Communication Evolved (H2)</Heading>
        <Heading element="h3">HopHub Channels (H3)</Heading>
        <Heading element="h4">Direct Messages (H4)</Heading>
        <Heading element="h5">Online Users (H5)</Heading>
        <Heading element="h6">Settings (H6)</Heading>
      </div>
    </CloudrabbitTheme>
  );
};

export const DisplayHeadingsForMarketing = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <Heading element="h1" visualLevel="display-large">
            Experience the Nebula
          </Heading>
          <span style={{ color: 'var(--colors-text-secondary)', marginTop: '8px', display: 'block' }}>Display Large</span>
        </div>
        <div>
          <Heading element="h2" visualLevel="display-medium">
            Unified Digital Space
          </Heading>
          <span style={{ color: 'var(--colors-text-secondary)', marginTop: '8px', display: 'block' }}>Display Medium</span>
        </div>
        <div>
          <Heading element="h3" visualLevel="display-small">
            Seamless Connectivity
          </Heading>
          <span style={{ color: 'var(--colors-text-secondary)', marginTop: '8px', display: 'block' }}>Display Small</span>
        </div>
      </div>
    </CloudrabbitTheme>
  );
};

export const InverseColorOnNebula = () => {
  return (
    <CloudrabbitTheme>
      <div
        style={{
          padding: '48px',
          backgroundColor: 'var(--colors-surface-nebula)',
          background: 'var(--effects-gradients-nebula)',
          borderRadius: 'var(--borders-radius-large)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <Heading element="h2" visualLevel="display-small" inverseColor>
          Welcome to HopHub
        </Heading>
        <Heading element="h3" visualLevel="h4" inverseColor style={{ opacity: 0.9 }}>
          Connect with your community in real-time, share moments, and explore the galaxy of content.
        </Heading>
      </div>
    </CloudrabbitTheme>
  );
};

export const SemanticOverrides = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <Heading element="h1" visualLevel="h3">
            SEO Heavy Title
          </Heading>
          <p style={{ color: 'var(--colors-text-secondary)', margin: '4px 0 0' }}>
            This element is semantically an H1 for search engines, but visually styled as an H3 to fit the layout.
          </p>
        </div>
        <div style={{ padding: '16px', border: '1px solid var(--colors-border-default)', borderRadius: 'var(--borders-radius-medium)' }}>
          <Heading element="h6" visualLevel="h4">
            Card Title
          </Heading>
          <p style={{ color: 'var(--colors-text-secondary)', margin: '4px 0 0' }}>
            This element is semantically an H6 (lowest priority), but visually styled as an H4 for emphasis within the card.
          </p>
        </div>
      </div>
    </CloudrabbitTheme>
  );
};