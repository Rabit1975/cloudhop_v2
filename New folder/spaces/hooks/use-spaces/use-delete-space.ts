import { useMutation, gql } from '@apollo/client';
import { type DeleteSpaceOptions } from './delete-space-options-type.js';

const DELETE_SPACE = gql`
  mutation SpacesDeleteSpace($options: SpacesDeleteSpaceOptions!) {
    spacesDeleteSpace(options: $options)
  }
`;

export type UseDeleteSpaceResult = {
  /**
   * Function to execute the delete space mutation.
   */
  deleteSpace: (spaceId: string) => Promise<boolean>;

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
 * Hook to delete a space.
 * @returns The delete function, loading state, and error state.
 */
export function useDeleteSpace(): UseDeleteSpaceResult {
  const [mutate, { loading, error }] = useMutation(DELETE_SPACE);

  const deleteSpace = async (spaceId: string) => {
    const result = await mutate({
      variables: { options: { spaceId } },
    });
    return result.data.spacesDeleteSpace;
  };

  return { deleteSpace, loading, error };
}