import { renderHook } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockMusicStudioProjects } from '@cloudrabbit/music.entities.music-studio-project';
import { useMusicStudioProjects } from './use-music-studio-projects.js';

describe('useMusicStudioProjects', () => {
  it('should return projects from mock data', () => {
    const mockData = mockMusicStudioProjects();
    const { result } = renderHook(() => useMusicStudioProjects('owner1', { mockData }), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    expect(result.current.projects).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it('should handle loading state', () => {
    const { result } = renderHook(() => useMusicStudioProjects('owner1', { skip: true }), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });
    expect(result.current.loading).toBe(false);
  });
});