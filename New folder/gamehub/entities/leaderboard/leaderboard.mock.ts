import { Leaderboard } from './leaderboard.js';
import { PlainLeaderboard } from './leaderboard-type.js';

/**
 * Creates a mock Leaderboard instance with optional overrides.
 * @param overrides Partial properties to override the default mock data.
 * @returns A mocked Leaderboard entity.
 */
export function mockLeaderboard(overrides?: Partial<PlainLeaderboard>): Leaderboard {
  const defaultLeaderboard: PlainLeaderboard = {
    leaderboardId: 'lb-default-01',
    gameId: 'game-default-01',
    scores: [
      {
        userId: 'user-001',
        score: 1500,
        timestamp: Date.now(),
      },
      {
        userId: 'user-002',
        score: 1200,
        timestamp: Date.now() - 3600000,
      },
      {
        userId: 'user-003',
        score: 950,
        timestamp: Date.now() - 7200000,
      },
    ],
  };

  return Leaderboard.from({ ...defaultLeaderboard, ...overrides });
}

/**
 * Generates a list of mock Leaderboard entities.
 * @returns An array of Leaderboard instances.
 */
export function mockLeaderboards(): Leaderboard[] {
  return [
    mockLeaderboard({
      leaderboardId: 'lb-arcade-01',
      gameId: 'game-arcade-01',
      scores: [
        { userId: 'player-one', score: 5000, timestamp: 1672531200000 },
        { userId: 'player-two', score: 4500, timestamp: 1672617600000 },
      ],
    }),
    mockLeaderboard({
      leaderboardId: 'lb-puzzle-02',
      gameId: 'game-puzzle-02',
      scores: [
        { userId: 'solver-x', score: 300, timestamp: 1672704000000 },
      ],
    }),
  ];
}