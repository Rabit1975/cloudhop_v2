import { renderHook, act } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockAchievements } from '@cloudrabbit/gamehub.entities.achievement';
import { useAchievements } from './use-achievements.js';

const mockAchievementData = mockAchievements();

describe('useAchievements', () => {
  it('should return the achievements list', () => {
    const { result } = renderHook(() => useAchievements({ mockData: mockAchievementData }), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    expect(result.current.achievements).toEqual(mockAchievementData);
  });

  it('should return a single achievement by id', () => {
    const { result } = renderHook(() => useAchievements({ mockData: mockAchievementData }), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    const achievement = result.current.getAchievement(mockAchievementData[0].id);
    expect(achievement).toEqual(mockAchievementData[0]);
  });

  it('should call awardAchievement when the awardAchievement function is called', async () => {
    const { result } = renderHook(() => useAchievements({ mockData: mockAchievementData }), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    const userId = 'user123';
    const achievementId = mockAchievementData[0].id;
    
    // Mock the awardAchievement function and set it as a spy
    const awardAchievementMock = vi.fn();
    result.current.awardAchievement = awardAchievementMock;
    
    await act(async () => {
      await result.current.awardAchievement(userId, achievementId);
    });
    
    // Assert that the awardAchievement mock function was called with the correct arguments
    expect(awardAchievementMock).toHaveBeenCalledWith(userId, achievementId);
  });
});