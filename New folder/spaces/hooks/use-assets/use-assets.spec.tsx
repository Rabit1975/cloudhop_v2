import { renderHook } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockAssets } from '@cloudrabbit/spaces.entities.asset';
import { useAssets } from './use-assets.js';

describe('useAssets', () => {
  it('should return assets from mockData', () => {
    const mockData = mockAssets(2);
    const { result } = renderHook(() => useAssets({ spaceId: 'test-space', mockData }), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    expect(result.current.assets).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it('should return loading true when data is loading', () => {
    const { result } = renderHook(() => useAssets({ spaceId: 'test-space' }), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    expect(result.current.loading).toBe(true);
  });
});