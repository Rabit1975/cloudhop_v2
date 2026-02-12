import { useMutation, gql } from '@apollo/client';
import { DeleteSpaceAssetOptions } from './delete-space-asset-options-type.js';

export const DELETE_ASSET_MUTATION = gql`
  mutation DeleteSpaceAsset($assetId: ID!, $spaceId: ID!) {
    spacesDeleteSpaceAsset(options: {
      assetId: $assetId,
      spaceId: $spaceId
    })
  }
`;

export type UseDeleteAssetResult = {
  deleteAsset: (options: DeleteSpaceAssetOptions) => Promise<boolean>;
  loading: boolean;
  error?: Error;
};

/**
 * Hook to delete an existing asset.
 */
export function useDeleteAsset(): UseDeleteAssetResult {
  const [mutate, { loading, error }] = useMutation(DELETE_ASSET_MUTATION);

  const deleteAsset = async (options: DeleteSpaceAssetOptions) => {
    try {
      const { assetId, spaceId } = options;
      const result = await mutate({
        variables: {
          assetId,
          spaceId,
        },
      });

      return Boolean(result.data?.spacesDeleteSpaceAsset);
    } catch (err) {
      console.error('Delete asset error:', err);
      throw err;
    }
  };

  return {
    deleteAsset,
    loading,
    error,
  };
}