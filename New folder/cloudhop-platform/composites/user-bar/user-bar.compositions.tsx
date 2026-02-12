import React from 'react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { User } from '@cloudrabbit/cloudhop-platform.entities.user';
import { UserBar } from './user-bar.js';
import type { UserBarMenuItem } from './user-bar-menu-item-type.js';

const mockUser = User.from({
  id: 'u1',
  userId: 'user-01',
  username: 'NebulaWalker',
  displayName: 'Nebula Walker',
  email: 'nebula@cloudhop.com',
  roles: [],
  imageUrl: 'https://storage.googleapis.com/bit-generated-images/images/image_a_modern_and_minimalist_user_a_0_1770835130247.png'
});

const menuItems: UserBarMenuItem[] = [
  { label: 'Profile', href: '/profile', icon: <span>👤</span> },
  { label: 'Settings', href: '/settings', icon: <span>⚙️</span> },
  { label: 'Help', onClick: () => alert('Help clicked'), icon: <span>❓</span> },
];

export const LoggedOutUserBar = () => {
  return (
    <MockProvider>
      <div style={{ 
        padding: '24px', 
        backgroundColor: 'var(--colors-surface-background)',
        display: 'flex',
        justifyContent: 'flex-end',
        borderBottom: '1px solid var(--colors-border-subtle)'
      }}>
        <UserBar />
      </div>
    </MockProvider>
  );
};

export const LoggedInUserBar = () => {
  return (
    <MockProvider>
      <div style={{ 
        padding: '24px', 
        backgroundColor: 'var(--colors-surface-background)',
        display: 'flex',
        justifyContent: 'flex-end',
        borderBottom: '1px solid var(--colors-border-subtle)',
        height: '300px' // Height for dropdown
      }}>
        <UserBar 
          mockUser={mockUser} 
          menuItems={menuItems} 
        />
      </div>
    </MockProvider>
  );
};

export const LoggedInWithNebulaTheme = () => {
  return (
    <MockProvider> {/* Replaced MemoryRouter with MockProvider as per rules */}
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ 
          padding: '24px', 
          backgroundColor: 'var(--colors-surface-background)',
          backgroundImage: 'var(--effects-gradients-nebula)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '300px',
          borderBottom: '1px solid var(--colors-border-subtle)'
        }}>
          <h2 style={{ margin: 0, color: 'var(--colors-text-primary)' }}>CloudHop</h2>
          <UserBar 
            mockUser={mockUser} 
            menuItems={menuItems} 
          />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};