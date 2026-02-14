import { renderHook, act } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { GameActivity, mockGameActivities, PlainGameActivity, GameActivityType } from '@cloudrabbit/gamehub.entities.game-activity';
import { useGameActivity } from './use-game-activity.js';
import * as useUserAchievementsModule from './use-user-achievements.js';
import * as useSubmitScoreModule from './use-submit-score.js';
import * as useAwardAchievementModule from './use-award-achievement.js';

describe('useGameActivity', () => {
  it('should return the activities from mock data', () => {
    const mockData = mockGameActivities();
    const { result } = renderHook(() => useGameActivity({ mockData }), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    expect(result.current.activities).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it('should call refetch when logActivity is called with a played activity', async () => {
    const mockRefetch = vi.fn();
    const mockSubmitScore = vi.fn().mockResolvedValue(
      GameActivity.from({
        id: 'new-activity-123',
        userId: 'user123',
        gameId: 'game456',
        type: 'played',
        timestamp: new Date().toISOString(),
        details: { score: 100 },
      })
    );
    const mockAwardAchievement = vi.fn(async (userId: string, achievementId: string, gameId?: string) =>
      GameActivity.from({
        id: 'new-activity-456',
        userId,
        gameId: gameId || 'unknown',
        type: 'achieved',
        timestamp: new Date().toISOString(),
        details: { achievementId },
      })
    );

    vi.spyOn(useUserAchievementsModule, 'useUserAchievements').mockReturnValue({
      activities: [],
      loading: false,
      error: undefined,
      refetch: mockRefetch,
    });
    vi.spyOn(useSubmitScoreModule, 'useSubmitScore').mockReturnValue({
      submitScore: mockSubmitScore,
      loading: false,
      error: undefined,
    });
    vi.spyOn(useAwardAchievementModule, 'useAwardAchievement').mockReturnValue({
      awardAchievement: mockAwardAchievement,
      loading: false,
      error: undefined,
    });

    const { result } = renderHook(() => useGameActivity({ userId: 'user123' }), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    const activity: PlainGameActivity = {
      userId: 'user123',
      gameId: 'game456',
      type: 'played' as GameActivityType,
      timestamp: new Date().toISOString(),
      details: { score: 100 },
    };

    await act(async () => {
      await result.current.logActivity(activity);
    });

    expect(mockSubmitScore).toHaveBeenCalledWith(activity.gameId, activity.details?.score);
    expect(mockRefetch).toHaveBeenCalled();
  });
});