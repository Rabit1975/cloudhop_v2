import { MediaAttachment } from './media-attachment.js';
import { mockMediaAttachment } from './media-attachment.mock.js';

describe('MediaAttachment', () => {
  it('should create a MediaAttachment instance', () => {
    const mediaAttachment = mockMediaAttachment();
    expect(mediaAttachment).toBeInstanceOf(MediaAttachment);
  });

  it('should serialize to a plain object', () => {
    const mediaAttachment = mockMediaAttachment();
    const plainObject = mediaAttachment.toObject();
    expect(plainObject.id).toEqual(mediaAttachment.id);
    expect(plainObject.type).toEqual(mediaAttachment.type);
    expect(plainObject.url).toEqual(mediaAttachment.url);
    expect(plainObject.filename).toEqual(mediaAttachment.filename);
    expect(plainObject.size).toEqual(mediaAttachment.size);
  });

  it('should create a MediaAttachment from a plain object', () => {
    const mediaAttachment = mockMediaAttachment();
    const plainObject = mediaAttachment.toObject();
    const newMediaAttachment = MediaAttachment.from(plainObject);
    expect(newMediaAttachment).toBeInstanceOf(MediaAttachment);
    expect(newMediaAttachment.id).toEqual(mediaAttachment.id);
    expect(newMediaAttachment.type).toEqual(mediaAttachment.type);
  });
});