import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { UserProfile } from './index.js'; // Import UserProfile type from re-exported source
import { SpaceMembers } from './space-members.js';
import styles from './space-members.module.scss';

// @ts-ignore The mock data here might not cover all properties required by the external UserProfile type.
const mockUsers: Record<string, UserProfile> = {
  'user-1': {
    id: 'user-1',
    username: 'alice_wonder',
    displayName: 'Alice Wonderland',
    bio: 'Digital artist and space explorer. Loving the nebula vibes!',
    imageUrl: 'mock-image-url',
  },
  'user-2': {
    id: 'user-2',
    username: 'bob_builder',
    displayName: 'Bob The Builder',
    bio: 'Constructing digital realities one block at a time.',
    imageUrl: 'mock-image-url',
  },
};

const memberIds = ['user-1', 'user-2'];

describe('SpaceMembers', () => {
  it('should render member avatars', () => {
    const { container } = render(
      <MockProvider>
        <SpaceMembers members={memberIds} mockProfiles={mockUsers} />
      </MockProvider>
    );

    const avatarElements = container.querySelectorAll(`.${styles.itemWrapper}`);
    expect(avatarElements.length).toBe(2);
  });

  it('should display a counter when maxDisplay is reached', () => {
    const { container } = render(
      <MockProvider>
        <SpaceMembers members={memberIds} maxDisplay={1} mockProfiles={mockUsers} />
      </MockProvider>
    );

    const counterElement = container.querySelector(`.${styles.moreCount}`);
    expect(counterElement).toBeInTheDocument();
    expect((counterElement as HTMLElement).textContent).toBe('+1');
  });
});