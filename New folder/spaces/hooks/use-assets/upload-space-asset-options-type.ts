export type UploadSpaceAssetOptions = {
  spaceId: string;
  filename: string;
  fileData: string;
  mimeType: string;
  metadata?: Record<string, unknown>;
};