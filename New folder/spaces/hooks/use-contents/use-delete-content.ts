import { useMutation, gql } from '@apollo/client';
import { SpacesDeleteSpaceContentOptions } from './content-api-type.js';

const DELETE_SPACE_CONTENT_MUTATION = gql`
  mutation DeleteSpaceContent($options: SpacesDeleteSpaceContentOptions!) {
    spacesDeleteSpaceContent(options: $options)
  }
`;

export type UseDeleteContentResult = {
  /**
   * Function to trigger the delete content mutation.
   */
  deleteContent: (options: SpacesDeleteSpaceContentOptions) => Promise<boolean>;
  
  /**
   * Whether the deletion was successful.
   */
  data?: boolean;
  
  /**
   * Whether the mutation is in progress.
   */
  loading: boolean;
  
  /**
   * Error message if the mutation failed.
   */
  error?: string;
};

/**
 * A hook to delete a content item.
 * @returns An object containing the delete function and mutation state.
 */
export function useDeleteContent(): UseDeleteContentResult {
  const [mutate, { data, loading, error }] = useMutation(DELETE_SPACE_CONTENT_MUTATION);

  const deleteContent = async (options: SpacesDeleteSpaceContentOptions) => {
    const result = await mutate({
      variables: { options },
    });

    return Boolean(result.data?.spacesDeleteSpaceContent);
  };

  return {
    deleteContent,
    data: data?.spacesDeleteSpaceContent,
    loading,
    error: error?.message,
  };
}