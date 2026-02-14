import { v4 as uuid } from 'uuid';
import { Achievement } from './achievement.js';
import { PlainAchievement } from './achievement-type.js';

export function mockAchievements(overrides: Partial<PlainAchievement> = {}): Achievement[] {
  const defaultAchievements: PlainAchievement[] = [
    {
      id: uuid(),
      gameId: 'game_123',
      name: 'First Win',
      description: 'Win your first game.',
      iconUrl: 'https://cdn.gamehub.com/achievements/first-win.png',
      points: 10,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuid(),
      gameId: 'game_123',
      name: 'Sharpshooter',
      description: 'Achieve 100% accuracy in a match.',
      iconUrl: 'https://cdn.gamehub.com/achievements/sharpshooter.png',
      points: 50,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuid(),
      gameId: 'game_456',
      name: 'Speed Runner',
      description: 'Complete the level in under 2 minutes.',
      iconUrl: 'https://cdn.gamehub.com/achievements/speed-runner.png',
      points: 100,
      createdAt: new Date().toISOString(),
    },
  ];

  return defaultAchievements.map((plain) =>
    Achievement.from({ ...plain, ...overrides })
  );
}