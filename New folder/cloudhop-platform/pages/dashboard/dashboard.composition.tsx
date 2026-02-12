import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { PanelCard } from '@cloudrabbit/cloudhop-platform.ui.panel-card';
import { Dashboard } from './dashboard.js';
import type { DashboardPanelType } from './dashboard-panel-type.js';

// --- Mock Components for Panels ---

const HopHubChatPanel = () => (
  <PanelCard 
    title="HopHub: #general" 
    variant="nebula"
    actions={<span style={{ fontSize: '12px', color: 'var(--colors-text-secondary)' }}>3 new</span>}
  >
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '12px',
      height: '100%',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[
          { user: 'Alice', text: 'Has anyone seen the new design?' },
          { user: 'Bob', text: 'Yeah, the nebula effect is cool!' }
        ].map((msg, i) => (
          <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '13px' }}>
            <span style={{ fontWeight: 'bold', color: 'var(--colors-primary-default)' }}>{msg.user}:</span>
            <span style={{ color: 'var(--colors-text-secondary)' }}>{msg.text}</span>
          </div>
        ))}
      </div>
      <input 
        placeholder="Send a message..." 
        style={{ 
          width: '100%', 
          padding: '8px', 
          borderRadius: '4px',
          border: '1px solid var(--colors-border-subtle)',
          background: 'rgba(0,0,0,0.2)',
          color: 'var(--colors-text-primary)'
        }} 
      />
    </div>
  </PanelCard>
);

const HopMeetsPanel = () => (
  <PanelCard title="HopMeets: Daily Standup" variant="default">
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100%',
      gap: '16px',
      textAlign: 'center'
    }}>
      <div style={{ 
        width: '64px', 
        height: '64px', 
        borderRadius: '50%', 
        backgroundColor: 'var(--colors-surface-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px'
      }}>
        🎥
      </div>
      <div>
        <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Meeting in Progress</div>
        <div style={{ fontSize: '12px', color: 'var(--colors-text-secondary)' }}>4 participants • 12:45 duration</div>
      </div>
      <button style={{
        padding: '8px 16px',
        backgroundColor: 'var(--colors-status-positive-default)',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Join Meeting
      </button>
    </div>
  </PanelCard>
);

const MusicStudioPanel = () => (
  <PanelCard title="Music Studio" variant="clean">
    <div style={{ position: 'relative', height: '100%', borderRadius: '8px', overflow: 'hidden' }}>
      <img 
        src="https://storage.googleapis.com/bit-generated-images/images/image_a_modern__clean__and_futuristi_0_1770835142797.png" 
        alt="Music Cover"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '12px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
        color: '#fff'
      }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Lo-Fi Beats to Code To</div>
        <div style={{ fontSize: '12px', opacity: 0.8 }}>Now Playing</div>
      </div>
    </div>
  </PanelCard>
);

const panelConfig: DashboardPanelType[] = [
  { name: 'hophub', weight: 10, component: HopHubChatPanel },
  { name: 'hopmeets', weight: 20, component: HopMeetsPanel },
  { name: 'music', weight: 30, component: MusicStudioPanel },
];

export const MainDashboard = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ minHeight: '100vh', background: 'var(--colors-surface-background)' }}>
          <Dashboard panels={panelConfig} />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const EmptyDashboardState = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ minHeight: '100vh', background: 'var(--colors-surface-background)' }}>
          <Dashboard panels={[]} />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};