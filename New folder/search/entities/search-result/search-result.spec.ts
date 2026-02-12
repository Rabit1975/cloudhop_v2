import { mockSearchableContents } from '@cloudrabbit/search.entities.searchable-content';
import { SearchResult } from './search-result.js';

it('has a SearchResult.from() method', () => {
  expect(SearchResult.from).toBeTruthy();
});

it('SearchResult.toObject() returns a plain object with correct values', () => {
  const mockContent = mockSearchableContents()[0];
  const searchResult = new SearchResult('test-id', mockContent, 0.8);
  const plainObject = searchResult.toObject();

  expect(plainObject.id).toBe('test-id');
  expect(plainObject.content).toEqual(mockContent.toObject());
  expect(plainObject.relevanceScore).toBe(0.8);
});