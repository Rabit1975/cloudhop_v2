import { type GameType } from '@cloudrabbit/gamehub.entities.game';

export type GamehubListGamesOptions = {
  offset?: number;
  limit?: number;
  categoryId?: string;
  search?: string;
  gameType?: GameType;
  tags?: string[];
};

export type GamehubGetGameOptions = {
  gameId: string;
};

export type GamehubCreateGameOptions = {
  name: string;
  description: string;
  categoryId: string;
  gameType: GameType;
  playUrl?: string;
  unityGameId?: string;
  imageUrls: string[];
  videoUrls?: string[];
  publisher?: string;
  developer?: string;
  releaseDate?: string;
  tags?: string[];
};

export type GamehubUpdateGameOptions = {
  gameId: string;
  name?: string;
  description?: string;
  categoryId?: string;
  gameType?: GameType;
  playUrl?: string;
  unityGameId?: string;
  imageUrls?: string[];
  videoUrls?: string[];
  publisher?: string;
  developer?: string;
  releaseDate?: string;
  tags?: string[];
};

export type GamehubDeleteGameOptions = {
  gameId: string;
};

export type GamehubGame = {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  gameType: GameType;
  playUrl?: string;
  unityGameId?: string;
  imageUrls: string[];
  videoUrls?: string[];
  publisher?: string;
  developer?: string;
  releaseDate?: string;
  tags?: string[];
  createdAt: string;
  updatedAt?: string;
};