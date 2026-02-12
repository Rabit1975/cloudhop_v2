import { renderHook } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockUserProfiles } from '@cloudrabbit/people.entities.user-profile';
import { useUserProfiles } from './use-user-profiles.js';

it('should return a list of user profiles', () => {
  const mockData = mockUserProfiles();
  const { result } = renderHook(() => useUserProfiles({ mockData }), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  expect(result.current.userProfiles).toEqual(mockData);
  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBeUndefined();
});

it('should handle loading state', () => {
  const { result } = renderHook(() => useUserProfiles(), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  expect(result.current.loading).toBe(true);
});