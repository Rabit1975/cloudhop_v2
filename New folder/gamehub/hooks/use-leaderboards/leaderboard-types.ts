export type GamehubGameType = 'html5' | 'unity' | 'external_stream';

export type GamehubLeaderboardEntry = {
  rank: number;
  gameScoreId: string;
  userId: string;
  score: number;
  username: string;
  profileImageUrl?: string;
};

export type GamehubGameScore = {
  id: string;
  gameId: string;
  userId: string;
  score: number;
  createdAt: string;
};

export type GamehubGetLeaderboardOptions = {
  gameId: string;
  limit?: number;
  offset?: number;
};

export type GamehubSubmitGameScoreOptions = {
  gameId: string;
  score: number;
};

export type GetLeaderboardQueryData = {
  gamehubGetLeaderboard: GamehubLeaderboardEntry[];
};

export type GetLeaderboardQueryVariables = {
  gameId: string;
  limit?: number;
  offset?: number;
};

export type SubmitGameScoreMutationData = {
  gamehubSubmitGameScore: GamehubGameScore;
};

export type SubmitGameScoreMutationVariables = {
  gameId: string;
  score: number;
};