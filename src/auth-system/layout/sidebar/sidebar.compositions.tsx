import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { Sidebar } from './sidebar.js';
import type { NavItem } from './nav-item-type.js';

// --- Icons ---
const HomeIcon = (props: any) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const ChatIcon = (props: any) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const MusicIcon = (props: any) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 18V5l12-2v13"></path>
    <circle cx="6" cy="18" r="3"></circle>
    <circle cx="18" cy="16" r="3"></circle>
  </svg>
);

const GameIcon = (props: any) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="6" width="20" height="12" rx="2"></rect>
    <path d="M6 12h4m-2-2v4m10-2h.01m-3.01 0h.01"></path>
  </svg>
);

const SettingsIcon = (props: any) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

// --- Data ---
const navItems: NavItem[] = [
  { name: 'hophub', label: 'HopHub', href: '/hophub', icon: ChatIcon },
  { name: 'hopmeets', label: 'HopMeets', href: '/hopmeets', icon: HomeIcon },
  { name: 'music', label: 'Music Studio', href: '/music', icon: MusicIcon },
  { name: 'gamehub', label: 'GameHub', href: '/gamehub', icon: GameIcon },
  { name: 'spaces', label: 'Spaces', href: '/spaces', icon: SettingsIcon },
];

const mockUser = {
  id: '123',
  userId: 'user-123',
  email: 'test@cloudhop.com',
  username: 'CloudHopper',
  imageUrl: 'https://storage.googleapis.com/bit-generated-images/images/image_a_modern__sleek__and_minimalis_0_1770834010085.png'
};

export const DefaultSidebar = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ height: '600px', display: 'flex', backgroundColor: 'var(--colors-surface-background)' }}>
          <Sidebar items={navItems} mockUser={mockUser} />
          <div style={{ flex: 1, padding: '24px', color: 'var(--colors-text-primary)' }}>
            <h1>Main Content</h1>
            <p>Sidebar is expanded by default.</p>
          </div>
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const CollapsedSidebar = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ height: '600px', display: 'flex', backgroundColor: 'var(--colors-surface-background)' }}>
          <Sidebar items={navItems} initialOpen={false} mockUser={mockUser} />
          <div style={{ flex: 1, padding: '24px', color: 'var(--colors-text-primary)' }}>
            <h1>Compact View</h1>
            <p>Sidebar is collapsed by default. Hover over icons to see tooltips.</p>
          </div>
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const UnauthenticatedView = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ height: '300px', display: 'flex', backgroundColor: 'var(--colors-surface-background)', border: '1px dashed var(--colors-border-default)' }}>
          <Sidebar items={navItems} mockUser={null} />
          <div style={{ flex: 1, padding: '24px', color: 'var(--colors-text-primary)' }}>
            <h1>Guest View</h1>
            <p>The sidebar should not be visible because no user is authenticated.</p>
          </div>
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const DarkModeSidebar = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ height: '600px', display: 'flex', backgroundColor: 'var(--colors-surface-background)' }}>
          <Sidebar items={navItems} mockUser={mockUser} />
          <div style={{ flex: 1, padding: '24px', color: 'var(--colors-text-primary)' }}>
            <h1>Dark Mode</h1>
            <p>Sidebar in dark theme with nebula effects.</p>
          </div>
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};