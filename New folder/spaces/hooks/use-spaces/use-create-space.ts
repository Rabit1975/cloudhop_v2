import { useMutation, gql } from '@apollo/client';
import { Space } from '@cloudrabbit/spaces.entities.space';
import { type CreateSpaceOptions } from './create-space-options-type.js';

const CREATE_SPACE = gql`
  mutation SpacesCreateSpace($options: SpacesCreateSpaceOptions!) {
    spacesCreateSpace(options: $options) {
      id
      name
      description
      ownerId
      createdAt
      updatedAt
      visibility
    }
  }
`;

export type UseCreateSpaceResult = {
  /**
   * Function to execute the create space mutation.
   */
  createSpace: (options: CreateSpaceOptions) => Promise<Space>;

  /**
   * Indicates if the mutation is currently in progress.
   */
  loading: boolean;

  /**
   * Error object if the mutation failed.
   */
  error?: Error;
};

/**
 * Hook to create a new space.
 * @returns The create function, loading state, and error state.
 */
export function useCreateSpace(): UseCreateSpaceResult {
  const [mutate, { loading, error }] = useMutation(CREATE_SPACE);

  const createSpace = async (options: CreateSpaceOptions) => {
    const result = await mutate({
      variables: { options },
    });
    return Space.from({ ...result.data.spacesCreateSpace, members: [] });
  };

  return { createSpace, loading, error };
}