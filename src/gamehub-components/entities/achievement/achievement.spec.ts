import { Achievement } from './achievement.js';
import { mockAchievements } from './achievement.mock.js';

describe('Achievement', () => {
  it('should create an Achievement instance from a plain object', () => {
    const mock = mockAchievements()[0];
    const achievement = Achievement.from(mock.toObject());
    expect(achievement).toBeInstanceOf(Achievement);
  });

  it('should serialize an Achievement into a plain object', () => {
    const mock = mockAchievements()[0];
    const plainAchievement = mock.toObject();
    expect(plainAchievement).toEqual({
      id: expect.any(String),
      gameId: expect.any(String),
      name: expect.any(String),
      description: expect.any(String),
      iconUrl: expect.any(String),
      points: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: undefined,
    });
  });
});