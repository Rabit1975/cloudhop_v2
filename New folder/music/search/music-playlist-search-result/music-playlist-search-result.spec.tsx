import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchResult } from '@cloudrabbit/search.entities.search-result';
import { MusicPlaylist } from '@cloudrabbit/music.entities.music-playlist';
import { MusicPlaylistSearchResult } from './music-playlist-search-result.js';

const createMockPlaylistResult = (
  id: string,
  name: string,
  description: string,
  trackCount: number
): SearchResult => {
  const tracks = Array(trackCount).fill({});
  
  const playlist = new MusicPlaylist(
    id,
    name,
    'owner-1',
    true,
    tracks as any[],
    new Date().toISOString(),
    description
  );

  return new SearchResult(`result-${id}`, playlist as any, 1);
};

describe('MusicPlaylistSearchResult', () => {
  it('should render the playlist name', () => {
    const result = createMockPlaylistResult('1', 'Test Playlist', 'A test playlist', 10);
    render(
      <MemoryRouter>
        <MusicPlaylistSearchResult result={result} />
      </MemoryRouter>
    );
    const titleElement = screen.getByText('Test Playlist');
    expect(titleElement).toBeInTheDocument();
  });

  it('should render the track count with correct pluralization', () => {
    const resultSingle = createMockPlaylistResult('2', 'Playlist Single', 'Single track', 1);
    render(
      <MemoryRouter>
        <MusicPlaylistSearchResult result={resultSingle} />
      </MemoryRouter>
    );
    expect(screen.getByText('1 track')).toBeInTheDocument();

    const resultMultiple = createMockPlaylistResult('3', 'Playlist Multiple', 'Multiple tracks', 5);
    render(
      <MemoryRouter>
        <MusicPlaylistSearchResult result={resultMultiple} />
      </MemoryRouter>
    );
    expect(screen.getByText('5 tracks')).toBeInTheDocument();
  });

  it('should render "No description available" when description is empty', () => {
    const result = createMockPlaylistResult('4', 'Playlist No Desc', '', 5);
    render(
      <MemoryRouter>
        <MusicPlaylistSearchResult result={result} />
      </MemoryRouter>
    );
    const descriptionElement = screen.getByText('No description available for this playlist.');
    expect(descriptionElement).toBeInTheDocument();
  });
});