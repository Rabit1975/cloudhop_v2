import { Content } from './content.js';
import { mockContent } from './content.mock.js';

describe('Content', () => {
  it('should create a Content instance', () => {
    const content = mockContent();
    expect(content).toBeInstanceOf(Content);
  });

  it('should convert Content to PlainContent object', () => {
    const content = mockContent();
    const plainContent = content.toObject();
    expect(plainContent.id).toBe(content.id);
    expect(plainContent.spaceId).toBe(content.spaceId);
  });

  it('should create Content from PlainContent', () => {
    const content = mockContent();
    const plainContent = content.toObject();
    const newContent = Content.from(plainContent);
    expect(newContent).toBeInstanceOf(Content);
    expect(newContent.id).toBe(content.id);
  });
});