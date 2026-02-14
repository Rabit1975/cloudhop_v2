import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { User } from '@cloudrabbit/cloudhop-platform.entities.user';
import { vi } from 'vitest';
import { UserBar } from './user-bar.js';
import styles from './user-bar.module.scss';

// Define spies for the functions returned by useAuth
const mockLogin = vi.fn();
const mockSignup = vi.fn();
const mockLogout = vi.fn();

// This object will hold the current mocked return value for useAuth.
// It allows individual tests to set the state (user, loading) for the hook.
let mockAuthReturn: {
  user: User | null;
  loading: boolean;
  login: typeof mockLogin;
  signup: typeof mockSignup;
  logout: typeof mockLogout;
};

// Mock useAuth globally for this test file.
// The mock implementation will check if an initialMockUser is passed directly to the hook,
// otherwise it will use the globally configured mockAuthReturn state.
vi.mock('@cloudrabbit/cloudhop-platform.hooks.use-auth', () => ({
  useAuth: (initialMockUser?: User) => {
    return {
      // If mockUser is passed directly to useAuth (via UserBar's mockUser prop),
      // that user should take precedence. Otherwise, use the globally set user.
      user: initialMockUser !== undefined ? initialMockUser : mockAuthReturn.user,
      loading: mockAuthReturn.loading,
      login: mockAuthReturn.login,
      signup: mockAuthReturn.signup,
      logout: mockAuthReturn.logout,
    };
  },
}));

const mockUser = User.from({
  id: 'u1',
  userId: 'user-01',
  username: 'NebulaWalker',
  displayName: 'Nebula Walker',
  email: 'nebula@cloudhop.com',
  roles: [],
  imageUrl: 'https://example.com/avatar.png'
});

describe('UserBar', () => {
  beforeEach(() => {
    // Reset all mock functions before each test
    mockLogin.mockClear();
    mockSignup.mockClear();
    mockLogout.mockClear();

    // Set the default state for useAuth: logged out and not loading
    mockAuthReturn = {
      user: null,
      loading: false,
      login: mockLogin,
      signup: mockSignup,
      logout: mockLogout,
    };
  });

  it('should render login and signup buttons when user is not logged in', () => {
    // For this test, useAuth should return user: null, which is our default mockAuthReturn state.
    render(
      <MockProvider>
        <UserBar />
      </MockProvider>
    );

    expect(screen.getByText('Log in')).toBeInTheDocument();
    expect(screen.getByText('Get started')).toBeInTheDocument();
    expect(screen.queryByText('Nebula Walker')).not.toBeInTheDocument(); // Ensure user details are not present
  });

  it('should render user avatar and dropdown when user is logged in', () => {
    // For this test, UserBar receives mockUser, which gets passed to useAuth.
    // Our mocked useAuth will then return this mockUser.
    render(
      <MockProvider>
        <UserBar mockUser={mockUser} />
      </MockProvider>
    );

    const userTrigger = screen.getByText('Nebula Walker').closest(`.${styles.userTrigger}`);
    expect(userTrigger).toBeInTheDocument();
    expect(screen.getByAltText('NebulaWalker')).toBeInTheDocument(); // Check avatar alt text
    expect(screen.getByText('Nebula Walker')).toBeInTheDocument(); // Check user's display name
    expect(screen.getByText('nebula@cloudhop.com')).toBeInTheDocument(); // Check user's email
  });

  it('should call logout when sign out is clicked', async () => {
    // For this test, UserBar receives mockUser (logged in state).
    render(
      <MockProvider>
        <UserBar mockUser={mockUser} />
      </MockProvider>
    );

    // Find the user trigger element by its display name and click it to open the dropdown
    const userTrigger = screen.getByText('Nebula Walker').closest(`.${styles.userTrigger}`);
    fireEvent.click(userTrigger as Element);

    // Wait for the "Sign Out" button to appear in the dropdown and click it
    const signOutButton = await screen.findByRole('button', { name: /Sign Out/i });
    fireEvent.click(signOutButton);

    // Expect the mockLogout function to have been called
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it('should display loading state', () => {
    // Set the useAuth mock to be in a loading state for this test
    mockAuthReturn.loading = true;

    render(
      <MockProvider>
        <UserBar />
      </MockProvider>
    );

    // In loading state, login/signup buttons should not be present
    expect(screen.queryByText('Log in')).not.toBeInTheDocument();
    expect(screen.queryByText('Get started')).not.toBeInTheDocument();

    // The Avatar component in loading state will show initials "CH" (default letters)
    expect(screen.getByText('CH')).toBeInTheDocument();
  });
});