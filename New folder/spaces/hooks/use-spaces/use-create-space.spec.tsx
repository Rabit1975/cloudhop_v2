import { renderHook } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { useCreateSpace } from './use-create-space.js';

describe('useCreateSpace', () => {
  it('should return a createSpace function', () => {
    const { result } = renderHook(() => useCreateSpace(), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    expect(result.current.createSpace).toBeInstanceOf(Function);
  });
});