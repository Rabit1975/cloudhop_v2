import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { mockAchievements, Achievement } from '@cloudrabbit/gamehub.entities.achievement';
import { AchievementList } from './achievement-list.js';

const mocks = mockAchievements();
const image = 'https://storage.googleapis.com/bit-generated-images/images/image_futuristic_digital_game_achiev_0_1770833864729.png';

// Enhance mocks with the generated image for visual appeal
const enhancedMocks = mocks.map(m => new Achievement(
  m.id,
  m.gameId,
  m.name,
  m.description,
  image, // Use the provided generated image
  m.points,
  m.createdAt,
  m.updatedAt
));

const unlockedIds = [enhancedMocks[0].id, enhancedMocks[2].id];

export const BasicAchievementList = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ maxWidth: 600, padding: 24 }}>
        <AchievementList 
          achievements={enhancedMocks.slice(0, 3)} 
          unlockedAchievementIds={unlockedIds}
        />
      </div>
    </CloudrabbitTheme>
  );
};

export const AllLocked = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ maxWidth: 600, padding: 24 }}>
        <AchievementList 
          achievements={enhancedMocks.slice(0, 3)} 
          unlockedAchievementIds={[]} 
        />
      </div>
    </CloudrabbitTheme>
  );
};

export const AllUnlocked = () => {
  const allIds = enhancedMocks.map(a => a.id);
  return (
    <CloudrabbitTheme>
      <div style={{ maxWidth: 600, padding: 24 }}>
        <AchievementList 
          achievements={enhancedMocks.slice(0, 3)} 
          unlockedAchievementIds={allIds} 
        />
      </div>
    </CloudrabbitTheme>
  );
};

export const WithoutImages = () => {
  const noImageMocks = mocks.map(m => new Achievement(
    m.id,
    m.gameId,
    m.name,
    m.description,
    undefined, 
    m.points,
    m.createdAt,
    m.updatedAt
  ));

  return (
    <CloudrabbitTheme>
      <div style={{ maxWidth: 600, padding: 24 }}>
        <AchievementList 
          achievements={noImageMocks.slice(0, 3)} 
          unlockedAchievementIds={[noImageMocks[0].id]} 
        />
      </div>
    </CloudrabbitTheme>
  );
};

export const DarkMode = () => {
  return (
    <CloudrabbitTheme initialTheme="dark">
      <div style={{ 
        maxWidth: 600, 
        padding: 48, 
        backgroundColor: 'var(--colors-surface-background)',
        minHeight: 400
      }}>
        <h3 style={{ color: 'var(--colors-text-primary)', marginBottom: 24 }}>Game Achievements</h3>
        <AchievementList 
          achievements={enhancedMocks.slice(0, 4)} 
          unlockedAchievementIds={unlockedIds}
        />
      </div>
    </CloudrabbitTheme>
  );
};