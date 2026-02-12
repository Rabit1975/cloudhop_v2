import { useMutation, gql } from '@apollo/client';
import { Content } from '@cloudrabbit/spaces.entities.content';
import { SpacesUpdateSpaceContentOptions, ContentApiData } from './content-api-type.js';

const UPDATE_SPACE_CONTENT_MUTATION = gql`
  mutation UpdateSpaceContent($options: SpacesUpdateSpaceContentOptions!) {
    spacesUpdateSpaceContent(options: $options) {
      id
      spaceId
      type
      name
      description
      createdBy
      createdAt
      updatedAt
      status
      contentData
    }
  }
`;

export type UseUpdateContentResult = {
  /**
   * Function to trigger the update content mutation.
   */
  updateContent: (options: SpacesUpdateSpaceContentOptions) => Promise<Content | undefined>;
  
  /**
   * The updated content item.
   */
  data?: Content;
  
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
 * A hook to update an existing content item.
 * @returns An object containing the update function and mutation state.
 */
export function useUpdateContent(): UseUpdateContentResult {
  const [mutate, { data, loading, error }] = useMutation(UPDATE_SPACE_CONTENT_MUTATION);

  const updateContent = async (options: SpacesUpdateSpaceContentOptions) => {
    const result = await mutate({
      variables: { options },
    });

    if (result.data?.spacesUpdateSpaceContent) {
      const item: ContentApiData = result.data.spacesUpdateSpaceContent;
      return Content.from({
        id: item.id,
        spaceId: item.spaceId,
        title: item.name,
        body: item.description || '',
        type: item.type,
        creatorId: item.createdBy,
        assets: [],
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      });
    }
    return undefined;
  };

  const content = data?.spacesUpdateSpaceContent ? Content.from({
    id: data.spacesUpdateSpaceContent.id,
    spaceId: data.spacesUpdateSpaceContent.spaceId,
    title: data.spacesUpdateSpaceContent.name,
    body: data.spacesUpdateSpaceContent.description || '',
    type: data.spacesUpdateSpaceContent.type,
    creatorId: data.spacesUpdateSpaceContent.createdBy,
    assets: [],
    createdAt: data.spacesUpdateSpaceContent.createdAt,
    updatedAt: data.spacesUpdateContent.updatedAt,
  }) : undefined;

  return {
    updateContent,
    data: content,
    loading,
    error: error?.message,
  };
}