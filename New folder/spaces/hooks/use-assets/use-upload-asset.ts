import { useMutation, gql } from '@apollo/client';
import { Asset } from '@cloudrabbit/spaces.entities.asset';
import { mapToAsset } from './asset-mapper.js';
import { UploadSpaceAssetOptions } from './upload-space-asset-options-type.js';

export const UPLOAD_ASSET_MUTATION = gql`
  mutation UploadSpaceAsset($spaceId: ID!, $filename: String!, $fileData: String!, $mimeType: String!, $metadata: AiJSON) {
    spacesUploadSpaceAsset(options: {
      spaceId: $spaceId,
      filename: $filename,
      fileData: $fileData,
      mimeType: $mimeType,
      metadata: $metadata
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

export type UseUploadAssetResult = {
  uploadAsset: (options: UploadSpaceAssetOptions) => Promise<Asset | undefined>;
  loading: boolean;
  error?: Error;
};

/**
 * Hook to upload a new asset.
 */
export function useUploadAsset(): UseUploadAssetResult {
  const [mutate, { loading, error }] = useMutation(UPLOAD_ASSET_MUTATION);

  const uploadAsset = async (options: UploadSpaceAssetOptions) => {
    try {
      const { spaceId, filename, fileData, mimeType, metadata } = options;
      const result = await mutate({
        variables: {
          spaceId,
          filename,
          fileData,
          mimeType,
          metadata,
        },
      });

      if (result.data?.spacesUploadSpaceAsset) {
        return mapToAsset(result.data.spacesUploadSpaceAsset);
      }
      return undefined;
    } catch (err) {
      console.error('Upload asset error:', err);
      throw err;
    }
  };

  return {
    uploadAsset,
    loading,
    error,
  };
}