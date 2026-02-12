import { useQuery, gql } from '@apollo/client';
import { Content } from '@cloudrabbit/spaces.entities.content';
import { SpacesGetSpaceContentOptions, ContentApiData } from './content-api-type.js';

export type UseContentOptions = SpacesGetSpaceContentOptions & {
  /**
   * Mock data to be returned for testing or preview purposes.
   */
  mockData?: Content;
};

export type UseContentResult = {
  /**
   * The content item.
   */
  content?: Content;
  
  /**
   * Whether the data is loading.
   */
  loading: boolean;
  
  /**
   * Error message if the query failed.
   */
  error?: string;
  
  /**
   * Function to refetch the data.
   */
  refetch: () => void;
};

const GET_SPACE_CONTENT_QUERY = gql`
  query GetSpaceContent($options: SpacesGetSpaceContentOptions!) {
    spacesGetSpaceContent(options: $options) {
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

/**
 * A hook to fetch a single content item.
 * @param options - The options for retrieving the content, specifically contentId and spaceId.
 * @returns An object containing the content item, loading state, and error information.
 */
export function useContent(options: UseContentOptions): UseContentResult {
  const { mockData, ...queryOptions } = options;
  const skip = Boolean(mockData);

  const { data, loading, error, refetch } = useQuery(GET_SPACE_CONTENT_QUERY, {
    variables: { options: queryOptions },
    skip,
  });

  if (mockData) {
    return {
      content: mockData,
      loading: false,
      error: undefined,
      refetch: () => {},
    };
  }

  const rawContent: ContentApiData | undefined = data?.spacesGetSpaceContent;
  
  const content = rawContent ? Content.from({
    id: rawContent.id,
    spaceId: rawContent.spaceId,
    title: rawContent.name,
    body: rawContent.description || '',
    type: rawContent.type,
    creatorId: rawContent.createdBy,
    assets: [],
    createdAt: rawContent.createdAt,
    updatedAt: rawContent.updatedAt,
  }) : undefined;

  return {
    content,
    loading,
    error: error?.message,
    refetch,
  };
}