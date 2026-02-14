import { gql, useMutation } from '@apollo/client';
import type { 
  SubmitGameScoreMutationData, 
  SubmitGameScoreMutationVariables 
} from './leaderboard-types.js';

export const SUBMIT_SCORE_MUTATION = gql`
  mutation GamehubSubmitGameScore($gameId: ID!, $score: Int!) {
    gamehubSubmitGameScore(options: { gameId: $gameId, score: $score }) {
      id
      gameId
      userId
      score
      createdAt
    }
  }
`;

export type UseSubmitScoreResult = {
  submitScore: (gameId: string, score: number) => Promise<void>;
  data?: SubmitGameScoreMutationData;
  loading: boolean;
  error?: Error;
};

export function useSubmitScoreMutation(): UseSubmitScoreResult {
  const [mutate, { data, loading, error }] = useMutation<
    SubmitGameScoreMutationData,
    SubmitGameScoreMutationVariables
  >(SUBMIT_SCORE_MUTATION);

  const submitScore = async (gameId: string, score: number) => {
    try {
      await mutate({
        variables: {
          gameId,
          score,
        },
      });
    } catch (err) {
      console.error('Failed to submit score:', err);
      throw err;
    }
  };

  return {
    submitScore,
    data: data || undefined,
    loading,
    error,
  };
}