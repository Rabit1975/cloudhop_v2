export type GamehubAchievement = {
  id: string;
  gameId: string;
  name: string;
  description: string;
  iconUrl?: string;
  points?: number;
  createdAt: string;
  updatedAt?: string;
};

export type GamehubUserAchievement = {
  id: string;
  userId: string;
  achievementId: string;
  unlockedAt: string;
};

export type GamehubListAchievementsOptions = {
  gameId?: string;
  limit?: number;
  offset?: number;
};

export type GamehubAwardAchievementOptions = {
  userId: string;
  achievementId: string;
};