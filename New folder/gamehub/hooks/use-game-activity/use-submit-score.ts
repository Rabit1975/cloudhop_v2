import { gql, useMutation } from '@apollo/client';
import { GameActivity } from '@cloudrabbit/gamehub.entities.game-activity';

export const SUBMIT_GAME_SCORE_MUTATION = gql`
  mutation SubmitGameScore($gameId: ID!, $score: Int!) {
    gamehubSubmitGameScore(options: { gameId: $gameId, score: $score }) {
      id
      gameId
      userId
      score
      createdAt
    }
  }
`;

export type SubmitScoreMutationFn = (
  gameId: string,
  score: number
) => Promise<GameActivity>;

export type UseSubmitScoreResult = {
  submitScore: SubmitScoreMutationFn;
  loading: boolean;
  error?: Error;
};

export function useSubmitScore(): UseSubmitScoreResult {
  const [mutate, { loading, error }] = useMutation(SUBMIT_GAME_SCORE_MUTATION);

  const submitScore = async (gameId: string, score: number) => {
    const response = await mutate({
      variables: {
        gameId,
        score,
      },
    });

    // Map the response to a GameActivity entity
    const data = response.data?.gamehubSubmitGameScore;
    
    return GameActivity.from({
      id: data.id,
      userId: data.userId,
      gameId: data.gameId,
      type: 'played',
      timestamp: data.createdAt,
      details: {
        score: data.score,
      },
    });
  };

  return {
    submitScore,
    loading,
    error: error || undefined,
  };
}