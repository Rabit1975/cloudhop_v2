import { useQuery, gql } from '@apollo/client';
import { Content } from '@cloudrabbit/spaces.entities.content';
import { SpacesListSpaceContentsOptions, ContentApiData } from './content-api-type.js';

export type UseContentListOptions = SpacesListSpaceContentsOptions & {
  /**
   * Mock data to be returned for testing or preview purposes.
   */
  mockData?: Content[];
};

export type UseContentListResult = {
  /**
   * The list of content items.
   */
  contents: Content[];
  
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

const LIST_SPACE_CONTENTS_QUERY = gql`
  query ListSpaceContents($options: SpacesListSpaceContentsOptions!) {
    spacesListSpaceContents(options: $options) {
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
 * A hook to fetch a list of content items within a space.
 * @param options - The options for listing content, including filters and pagination.
 * @returns An object containing the list of content items, loading state, and error information.
 */
export function useContentList(options: UseContentListOptions): UseContentListResult {
  const { mockData, ...queryOptions } = options;
  const skip = Boolean(mockData);

  const { data, loading, error, refetch } = useQuery(LIST_SPACE_CONTENTS_QUERY, {
    variables: { options: queryOptions },
    skip,
  });

  if (mockData) {
    return {
      contents: mockData,
      loading: false,
      error: undefined,
      refetch: () => {},
    };
  }

  const contents = data?.spacesListSpaceContents?.map((item: ContentApiData) => 
    Content.from({
      id: item.id,
      spaceId: item.spaceId,
      title: item.name,
      body: item.description || '',
      type: item.type,
      creatorId: item.createdBy,
      assets: [], // Schema does not return assets list directly on content object currently
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    })
  ) || [];

  return {
    contents,
    loading,
    error: error?.message,
    refetch,
  };
}