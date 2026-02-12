import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { Badge } from './badge.js';

export const BasicBadges = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', padding: '24px' }}>
        <Badge label="Neutral" color="neutral" />
        <Badge label="Primary" color="primary" />
        <Badge label="Secondary" color="secondary" />
        <Badge label="Success" color="positive" />
        <Badge label="Warning" color="warning" />
        <Badge label="Error" color="negative" />
        <Badge label="Info" color="info" />
      </div>
    </CloudrabbitTheme>
  );
};

export const BadgeVariants = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ width: '80px', color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)' }}>Solid</span>
          <Badge label="Primary" color="primary" variant="solid" />
          <Badge label="Positive" color="positive" variant="solid" />
          <Badge label="Neutral" color="neutral" variant="solid" />
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ width: '80px', color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)' }}>Outline</span>
          <Badge label="Primary" color="primary" variant="outline" />
          <Badge label="Positive" color="positive" variant="outline" />
          <Badge label="Neutral" color="neutral" variant="outline" />
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ width: '80px', color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)' }}>Subtle</span>
          <Badge label="Primary" color="primary" variant="subtle" />
          <Badge label="Positive" color="positive" variant="subtle" />
          <Badge label="Neutral" color="neutral" variant="subtle" />
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ width: '80px', color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)' }}>Ghost</span>
          <Badge label="Primary" color="primary" variant="ghost" />
          <Badge label="Positive" color="positive" variant="ghost" />
          <Badge label="Neutral" color="neutral" variant="ghost" />
        </div>
      </div>
    </CloudrabbitTheme>
  );
};

export const WithIcons = () => {
  const StarIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
  
  const CircleIcon = () => (
    <svg width="0.75em" height="0.75em" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" />
    </svg>
  );

  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', gap: '16px', padding: '24px', alignItems: 'center' }}>
        <Badge label="Featured" icon={<StarIcon />} color="warning" variant="subtle" />
        <Badge label="Online" icon={<CircleIcon />} color="positive" variant="outline" size="sm" />
        <Badge label="Premium" icon={<StarIcon />} color="secondary" variant="solid" />
      </div>
    </CloudrabbitTheme>
  );
};

export const GameHubTags = () => {
   return (
    <CloudrabbitTheme>
      <div style={{ 
        padding: '32px', 
        maxWidth: '400px', 
        backgroundColor: 'var(--colors-surface-primary)',
        borderRadius: 'var(--borders-radius-large)',
        boxShadow: 'var(--effects-shadows-medium)'
      }}>
        <h3 style={{ 
          margin: '0 0 16px 0', 
          color: 'var(--colors-text-primary)',
          fontSize: 'var(--typography-sizes-heading-h5)'
        }}>
          Nebula Racers: Infinite
        </h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Badge label="Racing" color="neutral" size="sm" variant="outline" />
            <Badge label="Multiplayer" color="neutral" size="sm" variant="outline" />
            <Badge label="New Update" color="info" size="sm" variant="subtle" />
            <Badge label="-20% SALE" color="positive" size="sm" variant="solid" />
        </div>
        <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
           <span style={{ fontSize: 'var(--typography-sizes-body-small)', color: 'var(--colors-text-secondary)' }}>Status:</span>
           <Badge label="Live" color="positive" size="sm" variant="subtle" icon={
             <span style={{ 
               display: 'block', 
               width: '6px', 
               height: '6px', 
               borderRadius: '50%', 
               backgroundColor: 'currentColor' 
             }} />
           } />
        </div>
      </div>
    </CloudrabbitTheme>
   );
};