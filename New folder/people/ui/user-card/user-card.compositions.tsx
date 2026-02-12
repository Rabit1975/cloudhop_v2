import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockUserProfile } from '@cloudrabbit/people.entities.user-profile';
import { UserCard } from './user-card.js';

const mockImage = "https://storage.googleapis.com/bit-generated-images/images/image_realistic_high_resolution_port_0_1770835141174.png";

const user1 = mockUserProfile({
  firstName: 'Alice',
  lastName: 'Nebula',
  profilePicture: mockImage,
  presenceStatus: 'online',
  statusMessage: 'Designing the future of Hop 🎨'
});

const user2 = mockUserProfile({
  firstName: 'Bob',
  lastName: 'Starwalker',
  profilePicture: undefined,
  presenceStatus: 'busy',
  statusMessage: 'In a meeting 📅'
});

const user3 = mockUserProfile({
  firstName: 'Charlie',
  lastName: 'Comet',
  profilePicture: "https://res.cloudinary.com/ddnr1ptva/image/upload/f_auto,q_auto/ai-images/get/gd4e268a614b5d656a47502a036ca8e71ac41b40aaa54dde8064aa38b5d2cf0c26bb58f264097ddfc9f3b223a9932a63a345facb1b7111b426c5a02d1494f23a8_1280.jpg",
  presenceStatus: 'away',
  statusMessage: 'AFK - Lunch break 🍔'
});

const user4 = mockUserProfile({
  firstName: 'Dave',
  lastName: 'Darkstar',
  presenceStatus: 'offline',
  statusMessage: undefined
});

export const BasicUserCard = () => {
  return (
    <MockProvider>
      <div style={{ padding: '32px', maxWidth: '300px' }}>
        <UserCard user={user1} />
      </div>
    </MockProvider>
  );
};

export const UserGrid = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ 
          padding: '48px', 
          backgroundColor: 'var(--colors-surface-background)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '24px'
        }}>
          <UserCard user={user1} />
          <UserCard user={user2} />
          <UserCard user={user3} />
          <UserCard user={user4} />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const Variants = () => {
  return (
    <MockProvider>
      <div style={{ display: 'flex', gap: '24px', padding: '32px', flexWrap: 'wrap', backgroundColor: 'var(--colors-surface-background)' }}>
        <div style={{ width: '240px' }}>
          <h4 style={{ marginBottom: '16px', color: 'var(--colors-text-primary)' }}>Elevated (Default)</h4>
          <UserCard user={user1} variant="elevated" />
        </div>
        <div style={{ width: '240px' }}>
          <h4 style={{ marginBottom: '16px', color: 'var(--colors-text-primary)' }}>Outlined</h4>
          <UserCard user={user1} variant="outlined" />
        </div>
        <div style={{ width: '240px' }}>
          <h4 style={{ marginBottom: '16px', color: 'var(--colors-text-primary)' }}>Default</h4>
          <UserCard user={user1} variant="default" />
        </div>
      </div>
    </MockProvider>
  );
};

export const DarkModePreview = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ 
          padding: '48px', 
          background: 'var(--effects-gradients-nebula)',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ width: '280px' }}>
             <UserCard user={user1} variant="glow" />
          </div>
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};