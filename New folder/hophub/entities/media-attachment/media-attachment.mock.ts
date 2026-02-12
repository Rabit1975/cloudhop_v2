import { v4 as uuid } from 'uuid';
import { MediaAttachment } from './media-attachment.js';
import { PlainMediaAttachment } from './media-attachment-type.js';

export function mockMediaAttachments(
  overrides?: Partial<PlainMediaAttachment>[]
): MediaAttachment[] {
  const defaults: PlainMediaAttachment[] = [
    {
      id: uuid(),
      type: 'image',
      url: 'https://example.com/images/vacation.jpg',
      thumbnailUrl: 'https://example.com/images/vacation-thumb.jpg',
      filename: 'vacation.jpg',
      size: 1024 * 1024 * 2.5, // 2.5 MB
    },
    {
      id: uuid(),
      type: 'video',
      url: 'https://example.com/videos/demo.mp4',
      thumbnailUrl: 'https://example.com/videos/demo-thumb.jpg',
      filename: 'demo.mp4',
      size: 1024 * 1024 * 15, // 15 MB
    },
    {
      id: uuid(),
      type: 'file',
      url: 'https://example.com/docs/project-specs.pdf',
      filename: 'project-specs.pdf',
      size: 1024 * 500, // 500 KB
    },
  ];

  const data = overrides
    ? defaults.map((item, index) => ({ ...item, ...(overrides[index] || {}) }))
    : defaults;

  return data.map((plain) => MediaAttachment.from(plain));
}

export function mockMediaAttachment(
  override?: Partial<PlainMediaAttachment>
): MediaAttachment {
  const plain: PlainMediaAttachment = {
    id: uuid(),
    type: 'image',
    url: 'https://example.com/images/avatar.jpg',
    thumbnailUrl: 'https://example.com/images/avatar-thumb.jpg',
    filename: 'avatar.jpg',
    size: 1024 * 50, // 50 KB
    ...override,
  };
  return MediaAttachment.from(plain);
}