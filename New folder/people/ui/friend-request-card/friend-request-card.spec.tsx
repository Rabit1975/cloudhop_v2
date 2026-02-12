import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { createMockFriendRequest } from '@cloudrabbit/people.entities.friend-request';
import { FriendRequestCard } from './friend-request-card.js';
import type { UserProfile } from './user-profile-type.js';
import styles from './friend-request-card.module.scss';

// Mock the hooks from '@cloudrabbit/people.hooks.use-friend-requests'
const mockAcceptFriendRequestFn = vi.fn();
const mockRejectFriendRequestFn = vi.fn();

vi.mock('@cloudrabbit/people.hooks.use-friend-requests', () => ({
  useAcceptFriendRequest: () => ({
    acceptFriendRequest: mockAcceptFriendRequestFn,
    loading: false,
    error: undefined,
  }),
  useRejectFriendRequest: () => ({
    rejectFriendRequest: mockRejectFriendRequestFn,
    loading: false,
    error: undefined,
  }),
}));

const mockUserProfile: UserProfile = {
  id: 'user_active',
  userId: 'user_active',
  username: 'nebula_walker',
  email: 'walker@nebula.io',
  displayName: 'Nebula Walker',
  profilePicture: 'https://example.com/avatar.png',
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


describe('FriendRequestCard', () => {
  beforeEach(() => {
    mockAcceptFriendRequestFn.mockClear();
    mockRejectFriendRequestFn.mockClear();
  });

  it('should render the card with user details', () => {
    const { container } = render(
      <MockProvider>
        <FriendRequestCard request={mockRequest} userProfileMock={mockUserProfile} />
      </MockProvider>
    );

    expect(container.querySelector(`.${styles.name}`)).toHaveTextContent('Nebula Walker');
  });

  it('should call acceptFriendRequest when Accept button is clicked', () => {
    render(
      <MockProvider>
        <FriendRequestCard
          request={mockRequest}
          userProfileMock={mockUserProfile}
        />
      </MockProvider>
    );

    const acceptButton = screen.getByText('Accept');
    fireEvent.click(acceptButton);

    expect(mockAcceptFriendRequestFn).toHaveBeenCalledTimes(1);
    expect(mockAcceptFriendRequestFn).toHaveBeenCalledWith(mockRequest.id);
  });

  it('should call rejectFriendRequest when Reject button is clicked', () => {
    render(
      <MockProvider>
        <FriendRequestCard
          request={mockRequest}
          userProfileMock={mockUserProfile}
        />
      </MockProvider>
    );

    const rejectButton = screen.getByText('Reject');
    fireEvent.click(rejectButton);

    expect(mockRejectFriendRequestFn).toHaveBeenCalledTimes(1);
    expect(mockRejectFriendRequestFn).toHaveBeenCalledWith(mockRequest.id);
  });

  it('should render initials when there is no avatar', () => {
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

    const { container } = render(
      <MockProvider>
        <FriendRequestCard
          request={createMockFriendRequest({ fromUserId: mockUserProfileNoAvatar.id })}
          userProfileMock={mockUserProfileNoAvatar}
        />
      </MockProvider>
    );

    // Initial letters are derived from username, 'AnonymousUser' -> 'An'
    expect(container.querySelector(`.${styles.avatar}`)).toHaveTextContent('An');
  });
});