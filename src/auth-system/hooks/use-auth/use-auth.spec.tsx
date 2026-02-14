import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { User, UserRole } from '@cloudrabbit/cloudhop-platform.entities.user';
import { useApolloClient, gql } from '@apollo/client';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { useAuth } from './use-auth.js';
import { GET_CURRENT_USER } from './use-current-user.js';

// Define a variable to hold the mock resetStore spy
const mockResetStore = vi.fn();

// Mock the useApolloClient hook
vi.mock('@apollo/client', async (importOriginal) => {
  const actualApolloClient = await importOriginal<typeof import('@apollo/client')>();
  return {
    ...actualApolloClient,
    useApolloClient: vi.fn(() => ({
      resetStore: mockResetStore, // Return the shared mockResetStore
    })),
  };
});

// Define GraphQL operations (copied from use-auth.ts for consistency)
const LOGIN_USER = gql`
  mutation LoginUser($options: LoginUserOptions!) {
    loginUser(options: $options) {
      id
      userId
      username
      email
      imageUrl
      roles
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($options: CreateUserOptions!) {
    createUser(options: $options) {
      id
      userId
      username
      email
      imageUrl
      roles
    }
  }
`;

const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser
  }
`;

describe('useAuth', () => {
  const mockUserInstance = new User('123', 'testuser', 'Test User', 'test@example.com', [UserRole.User], null);

  // Mock for a successful logout mutation
  const logoutMock: MockedResponse = {
    request: {
      query: LOGOUT_USER,
    },
    result: {
      data: {
        logoutUser: true, // Assuming logoutUser returns true or a simple success value
      },
    },
  };

  // Mock for GET_CURRENT_USER returning null (no user logged in)
  const getCurrentUserNullMock: MockedResponse = {
    request: {
      query: GET_CURRENT_USER,
    },
    result: {
      data: {
        getCurrentUser: null,
      },
    },
  };

  // Mock for GET_CURRENT_USER returning the mockUserInstance data, explicitly structured for Apollo
  const mockUserApolloData: {
    id: string;
    userId: string;
    username: string;
    email: string;
    imageUrl: string | null;
    roles: UserRole[];
  } = {
    id: mockUserInstance.id, 
    userId: mockUserInstance.id, 
    username: mockUserInstance.username,
    email: mockUserInstance.email,
    imageUrl: mockUserInstance.imageUrl,
    roles: mockUserInstance.roles,
  };


  // Helper component to wrap tests with MockedProvider
  const TestWrapper = ({ children, mocks = [] }: { children: React.ReactNode; mocks?: MockedResponse[] }) => (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  );

  // Mock for a successful login mutation
  const loginSuccessMock: MockedResponse = {
    request: {
      query: LOGIN_USER,
      variables: { options: { email: 'test@example.com', password: 'password123' } },
    },
    result: {
      data: {
        loginUser: {
          id: '123',
          userId: '123',
          username: 'testuser',
          email: 'test@example.com',
          imageUrl: null,
          roles: [],
        },
      },
    },
  };

  // Mock for a successful signup mutation
  const signupSuccessMock: MockedResponse = {
    request: {
      query: CREATE_USER,
      variables: { options: { name: 'New User', email: 'newuser@example.com', password: 'securepassword' } },
    },
    result: {
      data: {
        createUser: {
          id: '456',
          userId: '456',
          username: 'New User',
          email: 'newuser@example.com',
          imageUrl: null,
          roles: [],
        },
      },
    },
  };

  // Mock for the signed-up user after a successful signup
  const signupSuccessUserMock: MockedResponse = {
    request: { query: GET_CURRENT_USER },
    result: {
      data: {
        getCurrentUser: {
          id: '456',
          userId: '456',
          username: 'New User',
          email: 'newuser@example.com',
          imageUrl: null,
          roles: [],
        },
      },
    },
  };


  it('should return the authenticated user when mockUser is provided', () => {
    const { result } = renderHook(() => useAuth(mockUserInstance), {
      wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>, // No Apollo mocks needed for this path
    });
    expect(result.current.user).toBe(mockUserInstance);
    expect(result.current.loading).toBe(false);
  });

  it('should logout a user (full flow)', async () => {
    // Reset the mock before each test that uses it, to ensure clean state
    mockResetStore.mockClear(); 

    const mocks = [
      // Initial user fetch
      { request: { query: GET_CURRENT_USER }, result: { data: { getCurrentUser: mockUserApolloData } } },
      logoutMock, // Logout mutation
      // User fetch after logout (should be null)
      { request: { query: GET_CURRENT_USER }, result: { data: { getCurrentUser: null } } },
    ];

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <TestWrapper mocks={mocks}>{children}</TestWrapper>,
    });

    // Wait for initial user load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.user?.id).toBe(mockUserInstance.id);
    });

    await act(async () => {
      await result.current.logout();
    });

    // Wait for logout and subsequent state update (user becomes null)
    await waitFor(() => {
      expect(mockResetStore).toHaveBeenCalledTimes(1); 
      expect(result.current.loading).toBe(false);
      expect(result.current.user).toBeNull();
    });
  });

  it('should login a user and update user state', async () => {
    const mocks = [
      getCurrentUserNullMock, // Initial state: no user
      loginSuccessMock,       // Login mutation
      // Refetch after login: user is now logged in. Use the explicitly structured mock data.
      { request: { query: GET_CURRENT_USER }, result: { data: { getCurrentUser: mockUserApolloData } } }, 
    ];
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <TestWrapper mocks={mocks}>{children}</TestWrapper>,
    });

    // Initially, user is null and loading is true because of the initial GET_CURRENT_USER query
    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(true);

    await act(async () => {
      await result.current.login({ email: 'test@example.com', password: 'password123' });
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.user?.id).toBe('123');
      expect(result.current.user?.username).toBe('testuser');
    });
  });

  it('should signup a user and update user state', async () => {
    const mocks = [
      getCurrentUserNullMock, // Initial state: no user
      signupSuccessMock,      // Signup mutation
      signupSuccessUserMock,  // Refetch after signup: new user is now logged in
    ];
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <TestWrapper mocks={mocks}>{children}</TestWrapper>,
    });

    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(true);
    await act(async () => {
      await result.current.signup({ name: 'New User', email: 'newuser@example.com', password: 'securepassword' });
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.user?.id).toBe('456');
      expect(result.current.user?.username).toBe('New User');
    });
  });
});