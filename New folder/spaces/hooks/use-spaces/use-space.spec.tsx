import { renderHook } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { Space } from '@cloudrabbit/spaces.entities.space';
import { useSpace } from './use-space.js';

describe('useSpace', () => {
  it('should return the space data when mock data is provided', () => {
    const mockSpace = new Space(
      '1',
      'Test Space',
      'owner1',
      [],
      'public', // Changed from SpaceVisibility.public to 'public'
      '2024-01-01T00:00:00.000Z'
    );

    const { result } = renderHook(() => useSpace('1', { mockData: mockSpace }), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    expect(result.current.space).toEqual(mockSpace);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it('should return loading state when fetching data', () => {
    const { result } = renderHook(() => useSpace('1'), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.space).toBeUndefined();
    expect(result.current.error).toBeUndefined();
  });
});