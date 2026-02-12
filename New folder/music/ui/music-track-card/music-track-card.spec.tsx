import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as linkNavigation from '@cloudrabbit/design.navigation.link';
import { mockMusicTracks } from '@cloudrabbit/music.entities.music-track';
import { MusicTrackCard } from './music-track-card.js';
import styles from './music-track-card.module.scss';

describe('MusicTrackCard', () => {
  it('should render the track title and artist', () => {
    const track = mockMusicTracks()[0].toObject();
    const { container } = render(
      <MemoryRouter>
        <MusicTrackCard track={track} />
      </MemoryRouter>
    );
    expect(container.querySelector(`.${styles.musicTrackCard} .${styles.title}`)).toHaveTextContent(track.title);
    expect(container.querySelector(`.${styles.musicTrackCard} .${styles.artist}`)).toHaveTextContent(track.artist || '');
  });

  it('should call onPlay when play button is clicked', () => {
    const track = mockMusicTracks()[0].toObject();
    const onPlay = vi.fn();
    const { container } = render(
      <MemoryRouter>
        <MusicTrackCard track={track} onPlay={onPlay} />
      </MemoryRouter>
    );
    const playButton = container.querySelector(`.${styles.playButton}`) as HTMLButtonElement;
    fireEvent.click(playButton);
    expect(onPlay).toHaveBeenCalledWith(track.id);
  });

  it('should navigate when the card is clicked and href is provided', () => {
    const track = mockMusicTracks()[0].toObject();
    const mockNavigate = vi.fn();
    
    // Mock the specific hook within the module
    vi.spyOn(linkNavigation, 'useNavigate').mockReturnValue(mockNavigate);

    const { container } = render(
      <MemoryRouter>
        <MusicTrackCard track={track} href="/music/123" />
      </MemoryRouter>
    );

    const card = container.querySelector(`.${styles.musicTrackCard}`) as HTMLDivElement;
    fireEvent.click(card);
    expect(mockNavigate).toHaveBeenCalledWith('/music/123');
  });
});