import React, { useState } from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { SelectList } from './select-list.js';
import type { SelectOption } from './select-option-type.js';

// SVG Icons for compositions
const HashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18" />
  </svg>
);

const SpeakerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

const StatusDot = ({ color }: { color: string }) => (
  <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: color }} />
);

export const BasicChannelSelector = () => {
  const [value, setValue] = useState('general');

  const options: SelectOption[] = [
    { value: 'general', label: 'general', icon: <HashIcon /> },
    { value: 'announcements', label: 'announcements', icon: <HashIcon /> },
    { value: 'random', label: 'random', icon: <HashIcon /> },
    { value: 'design', label: 'design-team', icon: <HashIcon /> },
  ];

  return (
    <CloudrabbitTheme>
      <div style={{ padding: '40px', maxWidth: '400px', minHeight: '350px' }}>
        <SelectList
          label="Select Destination Channel"
          placeholder="Choose a channel..."
          options={options}
          value={value}
          onChange={setValue}
        />
      </div>
    </CloudrabbitTheme>
  );
};

export const VoiceChannelSelector = () => {
  const [value, setValue] = useState('');

  const options: SelectOption[] = [
    { value: 'standup', label: 'Daily Standup', icon: <SpeakerIcon /> },
    { value: 'lounge', label: 'Music Lounge', icon: <SpeakerIcon /> },
    { value: 'gaming', label: 'Gaming Room 1', icon: <SpeakerIcon /> },
    { value: 'afk', label: 'AFK', icon: <SpeakerIcon /> },
  ];

  return (
    <CloudrabbitTheme>
      <div style={{ padding: '40px', maxWidth: '400px', minHeight: '350px' }}>
         <SelectList
          label="Join Voice Channel"
          placeholder="Select voice channel..."
          options={options}
          value={value}
          onChange={setValue}
        />
      </div>
    </CloudrabbitTheme>
  );
};

export const UserStatusWithNebula = () => {
  const [status, setStatus] = useState('online');

  const statusOptions: SelectOption[] = [
    { value: 'online', label: 'Online', icon: <StatusDot color="var(--colors-status-positive-default)" /> },
    { value: 'idle', label: 'Idle', icon: <StatusDot color="var(--colors-status-warning-default)" /> },
    { value: 'dnd', label: 'Do Not Disturb', icon: <StatusDot color="var(--colors-status-negative-default)" /> },
    { value: 'invisible', label: 'Invisible', icon: <StatusDot color="var(--colors-text-secondary)" /> },
  ];

  return (
    <CloudrabbitTheme initialTheme="dark">
      <div style={{ 
        padding: '60px', 
        minHeight: '400px',
        background: 'var(--colors-surface-background)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}>
        <div style={{ width: '100%', maxWidth: '320px' }}>
           <h3 style={{ color: 'var(--colors-text-primary)', marginBottom: '16px', fontWeight: 'bold' }}>Update Status</h3>
           <SelectList
            options={statusOptions}
            value={status}
            onChange={setStatus}
            placeholder="Set your status"
          />
          <div style={{ marginTop: '24px', color: 'var(--colors-text-secondary)', fontSize: '14px', lineHeight: '1.5' }}>
            Current status will be visible to all friends in the Nebula. Setting 'Do Not Disturb' will mute all notification sounds.
          </div>
        </div>
      </div>
    </CloudrabbitTheme>
  );
};

export const ProfileSettingsCard = () => {
  const [language, setLanguage] = useState('en');
  
  const languages: SelectOption[] = [
    { value: 'en', label: 'English (US)' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'ja', label: '日本語' },
  ];

  return (
    <CloudrabbitTheme>
      <div style={{ padding: '40px', minHeight: '500px', backgroundColor: 'var(--colors-surface-background)' }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '400px', 
          border: '1px solid var(--colors-border-default)',
          borderRadius: 'var(--borders-radius-large)',
          overflow: 'hidden',
          backgroundColor: 'var(--colors-surface-primary)',
          boxShadow: 'var(--effects-shadows-medium)'
        }}>
          <div style={{ 
            height: '160px', 
            width: '100%',
            backgroundImage: 'url(https://storage.googleapis.com/bit-generated-images/images/image_a_modern__sleek__and_user_frie_0_1770832609374.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
          <div style={{ padding: '24px' }}>
            <h2 style={{ marginTop: 0, marginBottom: '24px', fontSize: 'var(--typography-sizes-heading-h5)' }}>Profile Settings</h2>
            
            <div style={{ marginBottom: '24px' }}>
              <SelectList 
                label="Interface Language" 
                options={languages} 
                value={language} 
                onChange={setLanguage} 
              />
            </div>

            <div style={{ 
              paddingTop: '16px', 
              borderTop: '1px solid var(--colors-border-subtle)',
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              <button style={{
                padding: '8px 16px',
                backgroundColor: 'var(--colors-primary-default)',
                color: 'var(--colors-primary-contrast)',
                border: 'none',
                borderRadius: 'var(--borders-radius-medium)',
                cursor: 'pointer',
                fontSize: 'var(--typography-sizes-body-small)',
                fontWeight: 'var(--typography-font-weight-medium)'
              }}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </CloudrabbitTheme>
  );
};