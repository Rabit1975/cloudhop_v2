import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { MusicTrack } from '@cloudrabbit/music.entities.music-track';
import { useListMusicPlaylists, useAddTrackToMusicPlaylist, useCreateMusicPlaylist } from '@cloudrabbit/music.hooks.use-music-playlists';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import styles from './add-to-playlist-button.module.scss';
import { AddToPlaylistButton } from './add-to-playlist-button.js';

const mockTrack = new MusicTrack(
  'track-1',
  'Stellar Drifting',
  245,
  'youtube',
  'abc12345',
  true,
  new Date().toISOString(),
  'Cosmic Beats',
  'https://example.com/thumbnail.jpg'
);

vi.mock('@cloudrabbit/music.hooks.use-music-playlists', () => ({
  useListMusicPlaylists: vi.fn(() => [[], { loading: false, error: undefined, refetch: vi.fn() }]),
  useAddTrackToMusicPlaylist: vi.fn(() => [vi.fn(() => Promise.resolve()), { loading: false, error: undefined, data: undefined }]),
  useCreateMusicPlaylist: vi.fn(() => [vi.fn(() => Promise.resolve()), { loading: false, error: undefined, data: undefined }]),
}));

describe('AddToPlaylistButton', () => {
  it('should render the "Add to Playlist" button', () => {
    const { container } = render(
      <MockProvider>
        <CloudrabbitTheme>
          <AddToPlaylistButton track={mockTrack} />
        </CloudrabbitTheme>
      </MockProvider>
    );

    const button = container.querySelector(`.${styles.triggerButton}`);
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Add to Playlist');
  });

  it('should display "No playlists found" when there are no playlists', () => {
    const { container } = render(
      <MockProvider>
        <CloudrabbitTheme>
          <AddToPlaylistButton track={mockTrack} />
        </CloudrabbitTheme>
      </MockProvider>
    );

    const triggerButton = container.querySelector(`.${styles.triggerButton}`);
    fireEvent.click(triggerButton as Element);

    const emptyState = container.querySelector(`.${styles.emptyState}`);
    expect(emptyState).toBeInTheDocument();
    expect(emptyState).toHaveTextContent('No playlists found');
  });
});