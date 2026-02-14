import { Leaderboard } from './leaderboard.js';
import { mockLeaderboard } from './leaderboard.mock.js';

describe('Leaderboard', () => {
  it('should create a Leaderboard instance from a plain object', () => {
    const leaderboard = mockLeaderboard();
    expect(leaderboard).toBeInstanceOf(Leaderboard);
  });

  it('should return the leaderboardId as the id', () => {
    const leaderboard = mockLeaderboard();
    expect(leaderboard.id).toBe(leaderboard.leaderboardId);
  });

  it('should serialize the Leaderboard entity into a plain object', () => {
    const leaderboard = mockLeaderboard();
    const plainObject = leaderboard.toObject();
    expect(plainObject.leaderboardId).toBe(leaderboard.leaderboardId);
    expect(plainObject.gameId).toBe(leaderboard.gameId);
  });
});