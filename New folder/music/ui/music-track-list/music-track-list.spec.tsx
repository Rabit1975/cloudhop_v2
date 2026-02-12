import React from 'react';
import { render, screen } from '@testing-library/react';
import { MusicTrack } from '@cloudrabbit/music.entities.music-track';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { MusicTrackList } from './music-track-list.js';

const MOCK_TRACKS = [
  MusicTrack.from({
    id: '1',
    title: 'Neon Nebula',
    artist: 'Stellar Drifter',
    duration: 215,
    sourceType: 'upload',
    sourceIdentifier: 'track-1',
    isPublic: true,
    createdAt: new Date().toISOString(),
    thumbnailUrl: 'https://example.com/thumbnail1.jpg',
  }),
];

describe('MusicTrackList', () => {
  it('should render track titles', () => {
    render(
      <MockProvider>
        <MusicTrackList tracks={MOCK_TRACKS} />
      </MockProvider>
    );
    expect(screen.getByText('Neon Nebula')).toBeInTheDocument();
  });

  it('should display "No tracks found" when tracks array is empty', () => {
    render(
      <MockProvider>
        <MusicTrackList tracks={[]} />
      </MockProvider>
    );
    expect(screen.getByText('No tracks found')).toBeInTheDocument();
  });
});