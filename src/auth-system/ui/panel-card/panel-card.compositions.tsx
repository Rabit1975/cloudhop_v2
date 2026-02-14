import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { PanelCard } from './panel-card.js';

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const VideoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const ActionButton = ({ label, primary }: { label: string, primary?: boolean }) => (
  <button style={{
    padding: '6px 12px',
    borderRadius: 'var(--borders-radius-medium)',
    border: primary ? 'none' : '1px solid var(--colors-border-default)',
    backgroundColor: primary ? 'var(--colors-primary-default)' : 'transparent',
    color: primary ? 'var(--colors-primary-contrast)' : 'var(--colors-text-secondary)',
    fontSize: 'var(--typography-sizes-caption-default)',
    cursor: 'pointer',
    fontWeight: 'var(--typography-font-weight-medium)',
    transition: 'all 0.2s ease'
  }}>
    {label}
  </button>
);

export const HopHubChannelPanel = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ 
          padding: '40px', 
          maxWidth: '400px', 
          height: '500px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
        }}>
          <PanelCard
            title="# general"
            variant="nebula"
            icon={<ChatIcon />}
            actions={<ActionButton label="View Thread" />}
            footer={
              <input 
                placeholder="Message #general..." 
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  borderRadius: 'var(--borders-radius-medium)',
                  border: 'none',
                  backgroundColor: 'rgba(30, 41, 59, 0.5)',
                  color: 'var(--colors-text-primary)',
                  boxSizing: 'border-box'
                }} 
              />
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', flex: 1 }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--colors-primary-default)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '4px', color: 'var(--colors-text-primary)' }}>Neo</div>
                  <div style={{ fontSize: '14px', color: 'var(--colors-text-secondary)', lineHeight: 1.4 }}>
                    Has anyone checked out the new Music Studio module? The nebula effects are insane! 🌌
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--colors-secondary-default)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '4px', color: 'var(--colors-text-primary)' }}>Trinity</div>
                  <div style={{ fontSize: '14px', color: 'var(--colors-text-secondary)', lineHeight: 1.4 }}>
                    I'm in a HopMeet right now, but I'll check it out after.
                  </div>
                </div>
              </div>
            </div>
          </PanelCard>
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const HopMeetsControlPanel = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ padding: '40px', maxWidth: '350px' }}>
          <PanelCard
            title="Meeting Controls"
            variant="clean"
            icon={<VideoIcon />}
            actions={<div style={{ color: 'var(--colors-text-secondary)' }}><SettingsIcon /></div>}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '8px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--colors-text-secondary)' }}>Microphone</span>
                <span style={{ color: 'var(--colors-status-positive-default)', fontWeight: 'bold' }}>On</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--colors-text-secondary)' }}>Camera</span>
                <span style={{ color: 'var(--colors-status-positive-default)', fontWeight: 'bold' }}>On</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--colors-text-secondary)' }}>Screen Share</span>
                <span style={{ color: 'var(--colors-status-negative-default)', fontWeight: 'bold' }}>Off</span>
              </div>
              <div style={{ marginTop: '16px', display: 'flex', gap: '8px', paddingTop: '16px', borderTop: '1px solid var(--colors-border-subtle)' }}>
                 <ActionButton label="Leave Call" />
                 <ActionButton label="Invite Others" primary />
              </div>
            </div>
          </PanelCard>
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const EmptyStateLoading = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ padding: '40px', maxWidth: '300px', height: '250px' }}>
          <PanelCard
            title="Upcoming Events"
            loading
            variant="default"
          />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};