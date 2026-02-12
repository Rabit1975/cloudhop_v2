import { v4 as uuid } from 'uuid';
import { GameActivity } from './game-activity.js';

export function mockGameActivities() {
  return [
    GameActivity.from({
      id: uuid(),
      userId: 'user-01',
      gameId: 'game-01',
      type: 'played',
      timestamp: new Date().toISOString(),
      details: {
        score: 1500,
      },
    }),
    GameActivity.from({
      id: uuid(),
      userId: 'user-02',
      gameId: 'game-02',
      type: 'achieved',
      timestamp: new Date().toISOString(),
      details: {
        achievementId: 'ach-01',
      },
    }),
    GameActivity.from({
      id: uuid(),
      userId: 'user-01',
      gameId: 'game-03',
      type: 'streamed',
      timestamp: new Date().toISOString(),
      details: {
        streamId: 'stream-01',
      },
    }),
  ];
}