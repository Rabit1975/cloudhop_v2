export type SpacesSpaceContentStatus = 'draft' | 'published' | 'archived';

export type SpacesCreateSpaceContentOptions = {
  spaceId: string;
  type: string;
  name: string;
  description?: string;
  contentData: Record<string, unknown>;
};

export type SpacesGetSpaceContentOptions = {
  contentId: string;
  spaceId: string;
};

export type SpacesListSpaceContentsOptions = {
  spaceId: string;
  type?: string;
  search?: string;
  createdBy?: string;
  status?: SpacesSpaceContentStatus;
  limit?: number;
  offset?: number;
};

export type SpacesUpdateSpaceContentOptions = {
  contentId: string;
  spaceId: string;
  name?: string;
  description?: string;
  contentData?: Record<string, unknown>;
  status?: SpacesSpaceContentStatus;
};

export type SpacesDeleteSpaceContentOptions = {
  contentId: string;
  spaceId: string;
};

/**
 * Represents the raw content data returned from the GraphQL API.
 * Used for mapping to the Content entity.
 */
export type ContentApiData = {
  id: string;
  spaceId: string;
  type: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
  contentData: Record<string, unknown>;
  status: SpacesSpaceContentStatus;
};