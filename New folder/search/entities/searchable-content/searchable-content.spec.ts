import { SearchableContent } from './searchable-content.js';
import { mockSearchableContents } from './searchable-content.mock.js';

describe('SearchableContent', () => {
  it('should create a SearchableContent instance from a plain object', () => {
    const plainObject = {
      id: '123',
      type: 'test',
      title: 'Test Content',
      description: 'This is a test',
      url: '/test',
      keywords: ['test', 'content'],
    };
    const searchableContent = SearchableContent.from(plainObject);
    expect(searchableContent).toBeInstanceOf(SearchableContent);
    expect(searchableContent.id).toBe('123');
  });

  it('should serialize a SearchableContent instance to a plain object', () => {
    const searchableContent = mockSearchableContents()[0];
    const plainObject = searchableContent.toObject();
    expect(plainObject).toEqual({
      id: searchableContent.id,
      type: searchableContent.type,
      title: searchableContent.title,
      description: searchableContent.description,
      url: searchableContent.url,
      thumbnail: searchableContent.thumbnail,
      keywords: searchableContent.keywords,
    });
  });

  it('should handle undefined description and keywords', () => {
    const plainObject = {
      id: '456',
      type: 'example',
      title: 'Example Content',
      url: '/example',
    };
    // With `PlainSearchableContent` having optional description and keywords,
    // this `as any` is no longer needed.
    const searchableContent = SearchableContent.from(plainObject);
    expect(searchableContent.description).toBe('');
    expect(searchableContent.keywords).toEqual([]);
  });
});