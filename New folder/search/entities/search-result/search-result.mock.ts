import { mockSearchableContents } from '@cloudrabbit/search.entities.searchable-content';
import { SearchResult } from './search-result.js';

export function mockSearchResults(): SearchResult[] {
  const contents = mockSearchableContents();
  
  return contents.map((content, index) => {
    return SearchResult.from({
      id: `result-${index + 1}`,
      content: content.toObject(),
      relevanceScore: Number((0.95 - (index * 0.05)).toFixed(2))
    });
  });
}