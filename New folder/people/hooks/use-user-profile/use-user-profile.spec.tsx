import { renderHook } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockUserProfile } from '@cloudrabbit/people.entities.user-profile';
import { useUserProfile } from './use-user-profile.js';

it('should return the user profile', () => {
  const mockData = mockUserProfile({ userId: 'test-user' });
  const { result } = renderHook(() => useUserProfile('test-user', { mockData }), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  expect(result.current.userProfile?.userId).toBe('test-user');
  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBeUndefined();
});

it('should handle loading state', () => {
  const { result } = renderHook(() => useUserProfile('test-user'), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  // Simulate loading state.  In a real scenario, Apollo would handle this.
  // Here we just check that it initializes to false and doesn't throw.
  expect(result.current.loading).toBe(true);
});