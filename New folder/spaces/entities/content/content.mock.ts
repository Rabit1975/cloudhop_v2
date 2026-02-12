import { v4 as uuid } from 'uuid';
import { Content } from './content.js';
import { PlainContent } from './content-type.js';

/**
 * Generates a mock Content entity with optional overrides.
 */
export function mockContent(overrides: Partial<PlainContent> = {}): Content {
  const defaultContent: PlainContent = {
    id: uuid(),
    spaceId: uuid(),
    title: 'Project Proposal 2024',
    body: '## Overview\nThis is a proposal for the Q1 initiatives...',
    type: 'document',
    creatorId: uuid(),
    assets: [uuid(), uuid()],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return Content.from({ ...defaultContent, ...overrides });
}

/**
 * Generates a list of mock Content entities.
 */
export function mockContentList(count: number = 3): Content[] {
  return Array.from({ length: count }, (_, index) =>
    mockContent({
      title: `Content Item ${index + 1}`,
      type: index % 2 === 0 ? 'document' : 'image',
    })
  );
}