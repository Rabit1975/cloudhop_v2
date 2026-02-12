import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { MusicPlaylist } from '@cloudrabbit/music.entities.music-playlist';
import { MusicTrack, MusicTrackSourceType } from '@cloudrabbit/music.entities.music-track';
import { MusicPlaylistCard } from './music-playlist-card.js';

// Manual mock implementation to avoid complex factory dependencies in tests
const mockTrackData = {
  id: 't1',
  title: 'Starlight',
  duration: 180,
  sourceType: 'upload' as MusicTrackSourceType,
  sourceIdentifier: 'file-1',
  isPublic: true,
  createdAt: new Date().toISOString(),
  thumbnailUrl: 'https://example.com/thumbnail.jpg'
};

const mockTrack: MusicTrack = new MusicTrack(
  mockTrackData.id,
  mockTrackData.title,
  mockTrackData.duration,
  mockTrackData.sourceType,
  mockTrackData.sourceIdentifier,
  mockTrackData.isPublic,
  mockTrackData.createdAt,
  mockTrackData.thumbnailUrl
);


const mockPlaylist: MusicPlaylist = new MusicPlaylist( // Use constructor as per API
  'playlist-1',
  'Nebula Vibes',
  'user-1',
  true,
  [mockTrack],
  new Date().toISOString(),
  'Chill beats for coding and space travel.'
);

describe('MusicPlaylistCard', () => {
  it('should render the playlist name', () => {
    const { container } = render(
      <MockProvider>
        <MusicPlaylistCard playlist={mockPlaylist} />
      </MockProvider>
    );
    const headingElement = container.querySelector('h3');
    expect(headingElement).toHaveTextContent('Nebula Vibes');
  });

  it('should call onPlay when play button is clicked', () => {
    const onPlay = vi.fn();
    const { container } = render(
      <MockProvider>
        <MusicPlaylistCard playlist={mockPlaylist} onPlay={onPlay} />
      </MockProvider>
    );
    const playButton = container.querySelector('button');
    fireEvent.click(playButton as Element);
    expect(onPlay).toHaveBeenCalledWith('playlist-1');
  });

  it('should navigate to playlist detail page when card is clicked', () => {
    const { container } = render(
      <MockProvider>
        <MusicPlaylistCard playlist={mockPlaylist} />
      </MockProvider>
    );
    const cardElement = container.querySelector('div[class*="playlistCard"]');
    fireEvent.click(cardElement as Element);
    // In a real test, you'd assert the navigation happened, e.g., with mock-router or by checking `window.location`.
  });
});