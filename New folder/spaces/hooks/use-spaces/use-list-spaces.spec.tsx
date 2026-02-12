import { renderHook } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { Space, SpaceVisibility, mockSpaces } from '@cloudrabbit/spaces.entities.space';
import { useListSpaces } from './use-list-spaces.js';

describe('useListSpaces', () => {
  it('should return a list of spaces when mock data is provided', () => {
    const mockData = mockSpaces();
    const { result } = renderHook(() => useListSpaces({}, { mockData }), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    expect(result.current.spaces).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it('should return loading state when fetching data', () => {
    const { result } = renderHook(() => useListSpaces(), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.spaces).toEqual([]);
    expect(result.current.error).toBeUndefined();
  });
});