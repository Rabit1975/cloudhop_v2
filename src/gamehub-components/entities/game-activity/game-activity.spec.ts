import { GameActivity } from './game-activity.js';
import type { PlainGameActivity } from './plain-game-activity-type.js';

describe('GameActivity', () => {
  it('should create a GameActivity instance from a plain object', () => {
    const plainObject: PlainGameActivity = {
      userId: 'user123',
      gameId: 'game456',
      type: 'played',
      timestamp: new Date().toISOString(),
    };

    const gameActivity = GameActivity.from(plainObject);

    expect(gameActivity).toBeInstanceOf(GameActivity);
    expect(gameActivity.userId).toBe(plainObject.userId);
    expect(gameActivity.gameId).toBe(plainObject.gameId);
    expect(gameActivity.type).toBe(plainObject.type);
  });

  it('should convert a GameActivity instance to a plain object', () => {
    const gameActivity = new GameActivity(
      'activity1',
      'user123',
      'game456',
      'played',
      new Date().toISOString(),
      { score: 100 }
    );

    const plainObject = gameActivity.toObject();

    expect(plainObject.userId).toBe('user123');
    expect(plainObject.gameId).toBe('game456');
    expect(plainObject.details).toEqual({ score: 100 });
  });
});