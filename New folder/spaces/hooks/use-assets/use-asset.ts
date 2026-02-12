import { useQuery, gql } from '@apollo/client';
import { Asset } from '@cloudrabbit/spaces.entities.asset';
import { mapToAsset } from './asset-mapper.js';
import { GetSpaceAssetOptions } from './get-space-asset-options-type.js';

export const GET_ASSET_QUERY = gql`
  query GetSpaceAsset($assetId: ID!, $spaceId: ID!) {
    spacesGetSpaceAsset(options: {
      assetId: $assetId,
      spaceId: $spaceId
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

export type UseAssetOptions = GetSpaceAssetOptions & {
  mockData?: Asset;
};

export type UseAssetResult = {
  asset?: Asset;
  loading: boolean;
  error?: Error;
  refetch: () => void;
};

/**
 * Hook to fetch a single asset.
 */
export function useAsset(options: UseAssetOptions): UseAssetResult {
  const { mockData, assetId, spaceId } = options;
  const skip = !!mockData;

  const { data, loading, error, refetch } = useQuery(GET_ASSET_QUERY, {
    skip,
    variables: {
      assetId,
      spaceId,
    },
  });

  if (mockData) {
    return {
      asset: mockData,
      loading: false,
      error: undefined,
      refetch: () => {},
    };
  }

  const asset = data?.spacesGetSpaceAsset
    ? mapToAsset(data.spacesGetSpaceAsset)
    : undefined;

  return {
    asset,
    loading,
    error,
    refetch,
  };
}