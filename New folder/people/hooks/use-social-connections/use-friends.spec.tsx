import { renderHook } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { useFriends } from './use-friends.js';
import { UserProfile } from './user-profile-type.js';

const mockFriends: UserProfile[] = [
  {
    userId: '1',
    username: 'testuser1',
    email: 'test1@example.com',
    displayName: 'Test User 1',
    imageUrl: 'http://example.com/image1.jpg',
    bio: 'Test bio 1',
    company: 'Test Company 1',
    statusMessage: 'Test status 1',
    presenceStatus: 'online', // Changed to 'online'
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-02T00:00:00.000Z',
  },
  {
    userId: '2',
    username: 'testuser2',
    email: 'test2@example.com',
    displayName: 'Test User 2',
    imageUrl: 'http://example.com/image2.jpg',
    bio: 'Test bio 2',
    company: 'Test Company 2',
    statusMessage: 'Test status 2',
    presenceStatus: 'offline', // Changed to 'offline'
    createdAt: '2024-02-01T00:00:00.000Z',
    updatedAt: '2024-02-02T00:00:00.000Z',
  },
];

it('should return friends from mock data', () => {
  const { result } = renderHook(() => useFriends({ mockData: mockFriends }), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  expect(result.current.friends).toEqual(mockFriends);
  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBeUndefined();
});

it('should return empty friends array when no mock data is provided', () => {
  const { result } = renderHook(() => useFriends({ mockData: [] }), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  expect(result.current.friends).toEqual([]);
  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBeUndefined();
});