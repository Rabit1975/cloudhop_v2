import { useQuery, gql } from '@apollo/client';
import { Asset } from '@cloudrabbit/spaces.entities.asset';
import { mapToAsset } from './asset-mapper.js';
import { ListSpaceAssetsOptions } from './list-space-assets-options-type.js';

export const LIST_ASSETS_QUERY = gql`
  query ListSpaceAssets($spaceId: ID!, $mimeType: String, $search: String, $uploadedBy: ID, $limit: Int, $offset: Int) {
    spacesListSpaceAssets(options: {
      spaceId: $spaceId,
      mimeType: $mimeType,
      search: $search,
      uploadedBy: $uploadedBy,
      limit: $limit,
      offset: $offset
    }) {
      id
      spaceId
      filename
      url
      mimeType
      size
      uploadedBy
      uploadedAt
      metadata
    }
  }
`;

export type UseAssetsOptions = ListSpaceAssetsOptions & {
  mockData?: Asset[];
};

export type UseAssetsResult = {
  assets: Asset[];
  loading: boolean;
  error?: Error;
  refetch: () => void;
};

/**
 * Hook to list assets within a space.
 * Accepts an optional mockData array for testing or preview.
 */
export function useAssets(options: UseAssetsOptions): UseAssetsResult {
  const { mockData, spaceId, mimeType, search, uploadedBy, limit, offset } = options;

  const skip = !!mockData;

  const { data, loading, error, refetch } = useQuery(LIST_ASSETS_QUERY, {
    skip,
    variables: {
      spaceId,
      mimeType,
      search,
      uploadedBy,
      limit,
      offset,
    },
  });

  if (mockData) {
    return {
      assets: mockData,
      loading: false,
      error: undefined,
      refetch: () => {},
    };
  }

  const assets = data?.spacesListSpaceAssets
    ? data.spacesListSpaceAssets.map(mapToAsset)
    : [];

  return {
    assets,
    loading,
    error,
    refetch,
  };
}