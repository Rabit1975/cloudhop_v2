import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { ThemeToggler } from '@cloudrabbit/design.actions.theme-toggler';
import { Header } from './header.js';
import type { HeaderLink } from './header-link-type.js';

const SAMPLE_LINKS: HeaderLink[] = [
  { label: 'HopHub', href: '/hophub', authenticated: true },
  { label: 'HopMeets', href: '/hopmeets', authenticated: true },
  { label: 'Music', href: '/music', authenticated: true },
  { label: 'Spaces', href: '/spaces', authenticated: true },
  { label: 'Features', href: '/features', authenticated: false },
  { label: 'Pricing', href: '/pricing', authenticated: false },
];

const UserAvatar = () => (
  <div style={{
    width: 32,
    height: 32,
    borderRadius: '50%',
    backgroundColor: 'var(--colors-secondary-default)',
    color: 'var(--colors-secondary-contrast)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }}>
    CH
  </div>
);

const NotificationIcon = () => (
  <button style={{
    background: 'transparent',
    border: 'none',
    color: 'var(--colors-text-secondary)',
    cursor: 'pointer',
    padding: 8,
    display: 'flex'
  }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  </button>
);

export const GuestHeader = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ minHeight: '300px', backgroundColor: 'var(--colors-surface-background)' }}>
          <Header 
            name="CloudHop"
            links={SAMPLE_LINKS}
            authenticated={false}
            actions={[ThemeToggler]}
          />
          <div style={{ padding: '64px', textAlign: 'center' }}>
            <h1 style={{ color: 'var(--colors-text-primary)' }}>Welcome to CloudHop</h1>
            <p style={{ color: 'var(--colors-text-secondary)' }}>The next-generation communication platform.</p>
          </div>
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const AuthenticatedHeader = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ minHeight: '300px', backgroundColor: 'var(--colors-surface-background)' }}>
          <Header 
            name="CloudHop"
            slogan="Beta"
            links={SAMPLE_LINKS}
            authenticated={true}
            actions={[ThemeToggler, NotificationIcon]}
            userBarItems={[UserAvatar]}
          />
          <div style={{ padding: '48px', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ color: 'var(--colors-text-primary)' }}>My Dashboard</h2>
            <div style={{ 
              marginTop: '24px', 
              padding: '24px', 
              backgroundColor: 'var(--colors-surface-secondary)',
              borderRadius: 'var(--borders-radius-medium)'
            }}>
              <p style={{ color: 'var(--colors-text-primary)', margin: 0 }}>Recent activity in #general...</p>
            </div>
          </div>
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const DarkModeHeader = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ 
          minHeight: '300px', 
          backgroundColor: 'var(--colors-surface-background)',
          backgroundImage: 'var(--effects-gradients-nebula)',
          backgroundSize: 'cover'
        }}>
          <Header 
            name="CloudHop"
            links={SAMPLE_LINKS}
            authenticated={true}
            actions={[ThemeToggler]}
            userBarItems={[UserAvatar]}
            className="custom-header-dark"
            style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(10px)' }}
          />
          <div style={{ padding: '48px', color: 'var(--colors-text-primary)' }}>
            <h1>Space</h1>
            <p>Nebula effects active.</p>
          </div>
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const HeaderWithSearch = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ minHeight: '300px', backgroundColor: 'var(--colors-surface-background)' }}>
          <Header 
            name="CloudHop"
            links={SAMPLE_LINKS}
            authenticated={true}
            actions={[ThemeToggler]}
            userBarItems={[UserAvatar]}
          >
            <div style={{ 
              maxWidth: '400px', 
              width: '100%', 
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <input 
                placeholder="Search..." 
                style={{
                  width: '100%',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: '1px solid var(--colors-border-default)',
                  backgroundColor: 'var(--colors-surface-secondary)',
                  color: 'var(--colors-text-primary)'
                }}
              />
            </div>
          </Header>
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};