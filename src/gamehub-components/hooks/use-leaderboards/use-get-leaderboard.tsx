import { useLazyQuery, gql } from '@apollo/client';
import { Leaderboard, LeaderboardScore } from '@cloudrabbit/gamehub.entities.leaderboard';
import { useMemo, useState } from 'react';
import type { 
  GamehubLeaderboardEntry, 
  GetLeaderboardQueryData, 
  GetLeaderboardQueryVariables 
} from './leaderboard-types.js';

export const GET_LEADERBOARD = gql`
  query GamehubGetLeaderboard($gameId: ID!, $limit: Int, $offset: Int) {
    gamehubGetLeaderboard(options: { gameId: $gameId, limit: $limit, offset: $offset }) {
      rank
      gameScoreId
      userId
      score
      username
      profileImageUrl
    }
  }
`;

export type UseGetLeaderboardResult = [
  (variables: GetLeaderboardQueryVariables) => Promise<void>,
  {
    leaderboard?: Leaderboard;
    entries?: GamehubLeaderboardEntry[];
    loading: boolean;
    error?: Error;
  }
];

export type UseGetLeaderboardOptions = {
  mockData?: GamehubLeaderboardEntry[];
};

export function useGetLeaderboardLazy(options?: UseGetLeaderboardOptions): UseGetLeaderboardResult {
  const [mockLoading, setMockLoading] = useState(false);
  const [mockEntries, setMockEntries] = useState<GamehubLeaderboardEntry[] | undefined>(undefined);

  const [fetch, { data, loading, error }] = useLazyQuery<
    GetLeaderboardQueryData,
    GetLeaderboardQueryVariables
  >(GET_LEADERBOARD);

  const entries = options?.mockData ? mockEntries : data?.gamehubGetLeaderboard;
  const currentLoading = options?.mockData ? mockLoading : loading;
  
  const leaderboard = useMemo(() => {
    if (!entries) return undefined;
    
    // Map GraphQL entries to Entity scores
    // Note: Timestamp is not provided by this specific query, falling back to Date.now() 
    // or we would need to fetch score details separately if critical.
    const scores: LeaderboardScore[] = entries.map((entry) => ({
      userId: entry.userId,
      score: entry.score,
      timestamp: Date.now(), 
    }));

    // We assume gameId is consistent across entries or derived from context. 
    // Since we don't have gameId in the return data easily without passing it through, 
    // we generate a placeholder or would need to store the requested gameId.
    // For the entity creation, we'll use a generic ID if not available.
    return new Leaderboard('current-leaderboard', 'current-game', scores);
  }, [entries]);

  const trigger = async (variables: GetLeaderboardQueryVariables) => {
    if (options?.mockData) {
      setMockLoading(true);
      setMockEntries(options.mockData);
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          setMockLoading(false);
          resolve();
        }, 500); // Simulate network delay
      });
    }
    await fetch({ variables });
  };

  return [
    trigger,
    {
      leaderboard,
      entries,
      loading: currentLoading,
      error,
    },
  ];
}