import { renderHook } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { useDeleteSpace } from './use-delete-space.js';

describe('useDeleteSpace', () => {
  it('should return a deleteSpace function', () => {
    const { result } = renderHook(() => useDeleteSpace(), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    expect(result.current.deleteSpace).toBeInstanceOf(Function);
  });
});