import { renderHook } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { useUpdateSpace } from './use-update-space.js';

describe('useUpdateSpace', () => {
  it('should return a updateSpace function', () => {
    const { result } = renderHook(() => useUpdateSpace(), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    expect(result.current.updateSpace).toBeInstanceOf(Function);
  });
});