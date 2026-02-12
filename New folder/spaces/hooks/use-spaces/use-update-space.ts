import { useMutation, gql } from '@apollo/client';
import { Space } from '@cloudrabbit/spaces.entities.space';
import { type UpdateSpaceOptions } from './update-space-options-type.js';

const UPDATE_SPACE = gql`
  mutation SpacesUpdateSpace($options: SpacesUpdateSpaceOptions!) {
    spacesUpdateSpace(options: $options) {
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

export type UseUpdateSpaceResult = {
  /**
   * Function to execute the update space mutation.
   */
  updateSpace: (options: UpdateSpaceOptions) => Promise<Space>;

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
 * Hook to update an existing space.
 * @returns The update function, loading state, and error state.
 */
export function useUpdateSpace(): UseUpdateSpaceResult {
  const [mutate, { loading, error }] = useMutation(UPDATE_SPACE);

  const updateSpace = async (options: UpdateSpaceOptions) => {
    const result = await mutate({
      variables: { options },
    });
    return Space.from({ ...result.data.spacesUpdateSpace, members: [] });
  };

  return { updateSpace, loading, error };
}