import { Game } from './game.js';
import { mockGameList } from './game.mock.js';

describe('Game', () => {
  it('should create a Game instance from a plain object', () => {
    const plainGame = mockGameList[0];
    const game = Game.from(plainGame);

    expect(game).toBeInstanceOf(Game);
    expect(game.id).toEqual(plainGame.id);
    expect(game.name).toEqual(plainGame.name);
  });

  it('should serialize a Game instance into a plain object', () => {
    const plainGame = mockGameList[0];
    const game = Game.from(plainGame);
    const gameAsPlainObject = game.toObject();

    expect(gameAsPlainObject).toEqual(plainGame);
  });

  it('should create a Game instance with empty arrays for optional array properties if not provided', () => {
    const plainGame = mockGameList[0];
    const game = Game.from(plainGame);

    expect(game.imageUrls).toBeDefined();
    expect(game.videoUrls).toBeDefined();
    expect(game.tags).toBeDefined();
  });
});