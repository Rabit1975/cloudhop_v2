import { renderHook } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockContent } from '@cloudrabbit/spaces.entities.content';
import { useContentList } from './use-content-list.js';
import { useContent } from './use-content.js';

describe('useContentList', () => {
  it('should return the mock content list', () => {
    const mockData = [mockContent({ id: '1' }), mockContent({ id: '2' })];
    const { result } = renderHook(() => useContentList({ spaceId: 'test', mockData }), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    expect(result.current.contents.length).toBe(2);
    expect(result.current.contents[0].id).toBe('1');
  });
});

describe('useContent', () => {
  it('should return the mock content item', () => {
    const mockData = mockContent({ id: '1' });
    const { result } = renderHook(() => useContent({ contentId: '1', spaceId: 'test', mockData }), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    expect(result.current.content?.id).toBe('1');
  });
});