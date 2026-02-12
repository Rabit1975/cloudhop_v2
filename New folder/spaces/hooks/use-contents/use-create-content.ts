import { useMutation, gql } from '@apollo/client';
import { Content } from '@cloudrabbit/spaces.entities.content';
import { SpacesCreateSpaceContentOptions, ContentApiData } from './content-api-type.js';

const CREATE_SPACE_CONTENT_MUTATION = gql`
  mutation CreateSpaceContent($options: SpacesCreateSpaceContentOptions!) {
    spacesCreateSpaceContent(options: $options) {
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

export type UseCreateContentResult = {
  /**
   * Function to trigger the create content mutation.
   */
  createContent: (options: SpacesCreateSpaceContentOptions) => Promise<Content | undefined>;
  
  /**
   * The created content item.
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
 * A hook to create a new content item.
 * @returns An object containing the create function and mutation state.
 */
export function useCreateContent(): UseCreateContentResult {
  const [mutate, { data, loading, error }] = useMutation(CREATE_SPACE_CONTENT_MUTATION);

  const createContent = async (options: SpacesCreateSpaceContentOptions) => {
    const result = await mutate({
      variables: { options },
    });

    if (result.data?.spacesCreateSpaceContent) {
      const item: ContentApiData = result.data.spacesCreateSpaceContent;
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

  const content = data?.spacesCreateSpaceContent ? Content.from({
    id: data.spacesCreateSpaceContent.id,
    spaceId: data.spacesCreateSpaceContent.spaceId,
    title: data.spacesCreateSpaceContent.name,
    body: data.spacesCreateSpaceContent.description || '',
    type: data.spacesCreateSpaceContent.type,
    creatorId: data.spacesCreateSpaceContent.createdBy,
    assets: [],
    createdAt: data.spacesCreateSpaceContent.createdAt,
    updatedAt: data.spacesCreateSpaceContent.updatedAt,
  }) : undefined;

  return {
    createContent,
    data: content,
    loading,
    error: error?.message,
  };
}