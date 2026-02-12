import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { HopHubUserStatusDisplay } from './hop-hub-user-status-display.js';

export const BasicStatus = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '24px' }}>
        <HopHubUserStatusDisplay message="Exploring the nebula 🚀" />
      </div>
    </CloudrabbitTheme>
  );
};

export const InSidebarContext = () => {
  return (
    <CloudrabbitTheme initialTheme="dark">
      <div style={{
        width: '280px',
        padding: '16px',
        backgroundColor: 'rgba(30, 41, 59, 0.6)',
        borderRadius: 'var(--borders-radius-medium)',
        border: '1px solid var(--colors-border-subtle)',
        backdropFilter: 'var(--effects-blur-medium)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--colors-primary-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--colors-text-inverse)',
            fontWeight: 'bold',
            flexShrink: 0
          }}>
            SE
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <span style={{ 
              fontWeight: 'var(--typography-font-weight-semi-bold)', 
              color: 'var(--colors-text-primary)',
              fontSize: 'var(--typography-sizes-body-small)'
            }}>
              SpaceExplorer
            </span>
            <HopHubUserStatusDisplay message="In a meeting • Do not disturb" />
          </div>
        </div>
      </div>
    </CloudrabbitTheme>
  );
};

export const LongStatusTruncation = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ width: '200px', padding: '24px', border: '1px dashed var(--colors-border-default)' }}>
        <div style={{ 
          fontSize: '12px', 
          color: 'var(--colors-text-secondary)', 
          marginBottom: '8px',
          fontFamily: 'var(--typography-font-family)'
        }}>
          Restricted Width (200px)
        </div>
        <HopHubUserStatusDisplay message="Listening to CloudHop FM • Chill Beats for Coding and Focus 🎵" />
      </div>
    </CloudrabbitTheme>
  );
};