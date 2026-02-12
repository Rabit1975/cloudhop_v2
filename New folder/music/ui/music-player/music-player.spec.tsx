import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MusicTrack } from '@cloudrabbit/music.entities.music-track';
import { MusicPlayer } from './music-player.js';
import styles from './music-player.module.scss';

const mockTrack = MusicTrack.from({
  id: '1',
  title: 'Test Track',
  artist: 'Test Artist',
  duration: 100,
  sourceType: 'upload',
  sourceIdentifier: 'file-123',
  isPublic: true,
  createdAt: new Date().toISOString(),
  thumbnailUrl: 'https://example.com/thumbnail.jpg'
});

describe('MusicPlayer', () => {
  it('should render track information', () => {
    const { container } = render(<MusicPlayer track={mockTrack} />);
    expect(container.querySelector(`.${styles.title}`)?.textContent).toBe('Test Track');
    expect(container.querySelector(`.${styles.artist}`)?.textContent).toBe('Test Artist');
  });

  it('should call onPlay when play button is clicked', () => {
    const onPlay = vi.fn();
    const { container } = render(<MusicPlayer track={mockTrack} onPlay={onPlay} />);
    const playButton = container.querySelector(`.${styles.playPauseButton}`);
    fireEvent.click(playButton as Element);
    expect(onPlay).toHaveBeenCalled();
  });

  it('should call onSeek when progress is changed', () => {
    const onSeek = vi.fn();
    const { container } = render(<MusicPlayer track={mockTrack} onSeek={onSeek} />);
    const progressInput = container.querySelector(`.${styles.rangeInput}`) as HTMLInputElement;
    fireEvent.change(progressInput, { target: { value: '50' } });
    expect(onSeek).toHaveBeenCalledWith(50);
  });
});