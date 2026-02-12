import React from 'react';
import { render } from '@testing-library/react';
import { mockAchievements, Achievement } from '@cloudrabbit/gamehub.entities.achievement';
import { AchievementList } from './achievement-list.js';

const mocks = mockAchievements();
const image = 'https://example.com/image.png';

const enhancedMocks = mocks.map(m => new Achievement(
  m.id,
  m.gameId,
  m.name,
  m.description,
  image,
  m.points,
  m.createdAt,
  m.updatedAt
));

it('should render the achievement list', () => {
  const { container } = render(<AchievementList achievements={enhancedMocks} />);
  const achievementItems = container.querySelectorAll('.achievementItem');
  expect(achievementItems.length).toBe(enhancedMocks.length);
});

it('should display unlocked achievements with the correct class', () => {
  const unlockedAchievementIds = [enhancedMocks[0].id];
  const { container } = render(<AchievementList achievements={enhancedMocks} unlockedAchievementIds={unlockedAchievementIds} />);
  const unlockedAchievement = container.querySelector('.achievementItem.unlocked');
  expect(unlockedAchievement).toBeInTheDocument();
});

it('should display locked achievements with the correct class', () => {
  const unlockedAchievementIds: string[] = [];
  const { container } = render(<AchievementList achievements={enhancedMocks} unlockedAchievementIds={unlockedAchievementIds} />);
  const lockedAchievement = container.querySelector('.achievementItem.locked');
  expect(lockedAchievement).toBeInTheDocument();
});