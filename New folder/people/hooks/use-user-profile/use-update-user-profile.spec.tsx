import { renderHook, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import { UserProfile } from '@cloudrabbit/people.entities.user-profile';
import { useUpdateUserProfile } from './use-update-user-profile.js';

// Define the mutation, as it's not exported from the hook file.
const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($displayName: String, $bio: String, $company: String, $imageUrl: String) {
    peopleUpdateUserProfile(options: { displayName: $displayName, bio: $bio, company: $company, imageUrl: $imageUrl }) {
      userId
      username
      email
      displayName
      imageUrl
      bio
      company
      statusMessage
      presenceStatus
      createdAt
      updatedAt
    }
  }
`;

it('should call the update mutation', async () => {
  const mockUpdateResult = {
    request: {
      query: UPDATE_USER_PROFILE,
      variables: { displayName: 'New Name' },
    },
    result: {
      data: {
        peopleUpdateUserProfile: {
          userId: 'test-user-id-123',
          username: 'testuser',
          email: 'test@example.com',
          displayName: 'New Name',
          imageUrl: 'https://example.com/new.jpg',
          bio: 'This is my new bio.',
          company: 'Test Company',
          statusMessage: 'Online',
          presenceStatus: 'ONLINE',
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-01T00:00:00Z',
          __typename: 'UserProfile',
        },
      },
    },
  };

  const { result } = renderHook(() => useUpdateUserProfile(), {
    wrapper: ({ children }) => (
      <MockedProvider mocks={[mockUpdateResult]} addTypename={false}>
        {children}
      </MockedProvider>
    ),
  });

  let caughtError;
  let updatedProfile: UserProfile | undefined;

  try {
    await act(async () => {
      updatedProfile = await result.current.updateUserProfile({ displayName: 'New Name' });
    });
  } catch (e: any) {
    caughtError = e;
  }

  expect(caughtError).toBeUndefined();
  expect(updatedProfile).toBeInstanceOf(UserProfile);
  expect(updatedProfile?.firstName).toBe('New');
  expect(updatedProfile?.lastName).toBe('Name');
  expect(updatedProfile?.email).toBe('test@example.com');
  expect(updatedProfile?.profilePicture).toBe('https://example.com/new.jpg');
});