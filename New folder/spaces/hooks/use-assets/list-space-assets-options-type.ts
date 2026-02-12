export type ListSpaceAssetsOptions = {
  spaceId: string;
  /**
   * Filter by content ID.
   * Note: This filter might not be supported by the current server schema and could be ignored.
   */
  contentId?: string;
  mimeType?: string;
  search?: string;
  uploadedBy?: string;
  limit?: number;
  offset?: number;
};