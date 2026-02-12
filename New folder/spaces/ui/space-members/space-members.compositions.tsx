import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { UserProfile } from './index.js'; // Import UserProfile type from re-exported source
import { SpaceMembers } from './space-members.js';

const mockImage = "https://storage.googleapis.com/bit-generated-images/images/image_a_vibrant__diverse_group_of_yo_0_1770834035481.png";

// Mock User Data
// @ts-ignore The mock data here might not cover all properties required by the external UserProfile type.
const mockUsers: Record<string, UserProfile> = {
  'user-1': {
    id: 'user-1',
    username: 'alice_wonder',
    displayName: 'Alice Wonderland',
    bio: 'Digital artist and space explorer. Loving the nebula vibes!',
    imageUrl: mockImage,
  },
  'user-2': {
    id: 'user-2',
    username: 'bob_builder',
    displayName: 'Bob The Builder',
    bio: 'Constructing digital realities one block at a time.',
    imageUrl: mockImage,
  },
  'user-3': {
    id: 'user-3',
    username: 'charlie_chap',
    displayName: 'Charlie Chaplin',
    bio: 'Silent but expressive.',
  },
  'user-4': {
    id: 'user-4',
    username: 'dora_explorer',
    displayName: 'Dora Explorer',
    bio: 'Exploring new spaces every day.',
  },
  'user-5': {
    id: 'user-5',
    username: 'eve_online',
    displayName: 'Eve Online',
    bio: 'Spaceship commander.',
  },
  'user-6': {
    id: 'user-6',
    username: 'frank_ocean',
    displayName: 'Frank Ocean',
    bio: 'Music producer and visual artist.',
  },
};

const memberIds = ['user-1', 'user-2', 'user-3', 'user-4', 'user-5', 'user-6'];

export const BasicSpaceMembers = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ padding: '40px', backgroundColor: 'var(--colors-surface-background)' }}>
          <h3 style={{ marginBottom: '16px', color: 'var(--colors-text-primary)' }}>Space Members</h3>
          <SpaceMembers members={memberIds.slice(0, 4)} mockProfiles={mockUsers} />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const LimitedDisplayWithCounter = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ padding: '40px', backgroundColor: 'var(--colors-surface-background)' }}>
          <h3 style={{ marginBottom: '16px', color: 'var(--colors-text-primary)' }}>Limited Display (+More)</h3>
          <SpaceMembers members={memberIds} maxDisplay={3} mockProfiles={mockUsers} />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const LargeAvatars = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ padding: '40px', backgroundColor: 'var(--colors-surface-background)' }}>
          <h3 style={{ marginBottom: '16px', color: 'var(--colors-text-primary)' }}>Large Avatars</h3>
          <SpaceMembers 
            members={memberIds.slice(0, 3)} 
            avatarSize="lg" 
            mockProfiles={mockUsers} 
          />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const DarkThemeMembers = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ 
          padding: '40px', 
          backgroundColor: 'var(--colors-surface-background)',
          minHeight: '200px',
          color: 'var(--colors-text-primary)'
        }}>
          <h3 style={{ marginBottom: '16px' }}>Dark Theme Members</h3>
          <SpaceMembers members={memberIds} maxDisplay={4} mockProfiles={mockUsers} />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};