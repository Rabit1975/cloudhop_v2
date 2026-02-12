import React from 'react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { createMockFriendRequest } from '@cloudrabbit/people.entities.friend-request';
import { FriendRequestCard } from './friend-request-card.js';
import type { UserProfile } from './user-profile-type.js';

const mockUserProfile: UserProfile = {
  id: 'user_active',
  userId: 'user_active',
  username: 'nebula_walker',
  email: 'walker@nebula.io',
  displayName: 'Nebula Walker',
  profilePicture: 'https://storage.googleapis.com/bit-generated-images/images/image_a_sleek__modern_ui_component_f_0_1770835143864.png',
  bio: 'Exploring the digital frontier.',
  createdAt: '2023-01-01T00:00:00Z',
  presenceStatus: 'online',
  socialConnections: [],
  // @ts-ignore
  toObject: () => ({ id: '', userId: '', displayName: '', imageUrl: '' }), // Added a basic toObject return
  firstName: 'Nebula',
  lastName: 'Walker',
  statusMessage: '', // Added to satisfy required property
};

const mockRequest = createMockFriendRequest({
  id: 'req_123',
  fromUserId: mockUserProfile.id,
  toUserId: 'user_me',
  status: 'pending',
});


const mockUserProfileNoAvatar: UserProfile = {
  id: 'user_anon',
  userId: 'user_anon',
  username: 'AnonymousUser',
  email: 'anon@cloudhop.io',
  displayName: 'Ghost Rider',
  profilePicture: '', // Added to satisfy required profilePicture
  createdAt: '2023-02-01T00:00:00Z',
  presenceStatus: 'offline',
  socialConnections: [],
  // @ts-ignore
  toObject: () => ({ id: '', userId: '', displayName: '', imageUrl: '' }), // Added a basic toObject return
  firstName: 'Ghost',
  lastName: 'Rider',
  statusMessage: '', // Added to satisfy required property
};

const mockRequestNoAvatar = createMockFriendRequest({
  id: 'req_456',
  fromUserId: mockUserProfileNoAvatar.id,
  toUserId: 'user_me',
  status: 'pending',
});

export const DefaultFriendRequest = () => {
  return (
    <MockProvider>
      <div style={{ padding: '48px', backgroundColor: 'var(--colors-surface-background)' }}>
        <FriendRequestCard
          request={mockRequest}
          userProfileMock={mockUserProfile}
        />
      </div>
    </MockProvider>
  );
};

export const WithoutAvatarImage = () => {
  return (
    <MockProvider>
      <div style={{ padding: '48px', backgroundColor: 'var(--colors-surface-background)' }}>
        <FriendRequestCard
          request={mockRequestNoAvatar}
          userProfileMock={mockUserProfileNoAvatar}
        />
      </div>
    </MockProvider>
  );
};

export const DarkModeRequest = () => {
  return (
    <MockProvider>
      <div style={{
        padding: '48px',
        backgroundColor: '#0f172a',
        backgroundImage: 'var(--effects-gradients-nebula)',
        color: 'white'
      }}>
        <FriendRequestCard
          request={mockRequest}
          userProfileMock={mockUserProfile}
        />
      </div>
    </MockProvider>
  );
};

export const GridDisplay = () => {
  return (
    <MockProvider>
      <div style={{
        padding: '48px',
        backgroundColor: 'var(--colors-surface-background)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '24px'
      }}>
        <FriendRequestCard request={mockRequest} userProfileMock={mockUserProfile} />
        <FriendRequestCard
          request={mockRequestNoAvatar}
          userProfileMock={mockUserProfileNoAvatar}
        />
        <FriendRequestCard
          request={createMockFriendRequest()}
          userProfileMock={{
            ...mockUserProfile,
            id: 'random',
            userId: 'random',
            displayName: 'Random User',
            username: 'randomuser',
            profilePicture: 'https://example.com/random_avatar.png', // Added to satisfy required profilePicture
            // @ts-ignore
            toObject: () => ({ id: '', userId: '', displayName: '', imageUrl: '' }), // Added a basic toObject return
            firstName: 'Random',
            lastName: 'User',
            statusMessage: '', // Added to satisfy required property
          }}
        />
      </div>
    </MockProvider>
  );
};