import React, { useState } from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MusicTrack } from '@cloudrabbit/music.entities.music-track';
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
    thumbnailUrl: 'https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_art_represent_0_1770835237668.png',
  }),
  MusicTrack.from({
    id: '2',
    title: 'Quantum Harmonix',
    artist: 'Cyber Soul',
    duration: 184,
    sourceType: 'upload',
    sourceIdentifier: 'track-2',
    isPublic: true,
    createdAt: new Date().toISOString(),
    thumbnailUrl: 'https://res.cloudinary.com/ddnr1ptva/image/upload/f_auto,q_auto/ai-images/get/gffce668d1b6797832f1d7dba09ba67552ad49526b33a6d1bb023de8e567d36dae567709006856068efe7e93c4598e73bf7d829d51f7af85c7fcd3c9015445f45_1280.jpg',
  }),
  MusicTrack.from({
    id: '3',
    title: 'Echoes of Andromeda',
    artist: 'Void Walker',
    duration: 256,
    sourceType: 'youtube',
    sourceIdentifier: 'track-3',
    isPublic: true,
    createdAt: new Date().toISOString(),
    thumbnailUrl: 'https://res.cloudinary.com/ddnr1ptva/image/upload/f_auto,q_auto/ai-images/get/g4f8212d40d87435630bc7092f5ccd565be2d74bbadd54d5a7bb41d87df7c3ad35d621026ae3ad3549aca4ee2d20627b6d35704cf280044ccd444d6a3c5f98235_1280.png',
  }),
  MusicTrack.from({
    id: '4',
    title: 'Digital Rain',
    artist: 'System 42',
    duration: 198,
    sourceType: 'external',
    sourceIdentifier: 'track-4',
    isPublic: true,
    createdAt: new Date().toISOString(),
    thumbnailUrl: 'https://res.cloudinary.com/ddnr1ptva/image/upload/f_auto,q_auto/ai-images/get/g80300701c6023ba8896389f73d60d82267095d895470f3cbc71853e965910e6559aed4ff850668d6ac5ea1118ce6bb2cfb2084c30a4aa536b196c1d4f873892c_1280.jpg',
  }),
  MusicTrack.from({
    id: '5',
    title: 'Midnight Protocol',
    artist: 'Binary Beats',
    duration: 220,
    sourceType: 'upload',
    sourceIdentifier: 'track-5',
    isPublic: true,
    createdAt: new Date().toISOString(),
    thumbnailUrl: 'https://res.cloudinary.com/ddnr1ptva/image/upload/f_auto,q_auto/ai-images/get/gdb7c6bd85b8e430ad199ef0664acfd3a32273bfc45ec380ac9ac4c4946149d8ddc135c51491006c9f06e655ae8e099845bb4b979d981d75374bdacc1bed065dc_1280.jpg',
  }),
];

export const BasicTrackList = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '32px', backgroundColor: 'var(--colors-surface-background)', minHeight: '100vh' }}>
        <h3 style={{ 
          margin: '0 0 24px 0', 
          color: 'var(--colors-text-primary)',
          fontSize: 'var(--typography-sizes-heading-h3)'
        }}>
          Trending Tracks
        </h3>
        <MusicTrackList tracks={MOCK_TRACKS} />
      </div>
    </CloudrabbitTheme>
  );
};

export const EditablePlaylist = () => {
  const [playlist, setPlaylist] = useState(MOCK_TRACKS);

  const handleRemove = (track: MusicTrack) => {
    setPlaylist((prev) => prev.filter((t) => t.id !== track.id));
  };

  const handlePlay = (track: MusicTrack) => {
    alert(`Playing: ${track.title}`);
  };

  return (
    <CloudrabbitTheme>
      <div style={{ padding: '32px', backgroundColor: 'var(--colors-surface-background)', minHeight: '100vh' }}>
        <h3 style={{ 
          margin: '0 0 24px 0', 
          color: 'var(--colors-text-primary)',
          fontSize: 'var(--typography-sizes-heading-h3)'
        }}>
          My Playlist
        </h3>
        <MusicTrackList 
          tracks={playlist}
          onPlay={handlePlay}
          onRemove={handleRemove}
        />
      </div>
    </CloudrabbitTheme>
  );
};

export const SearchResults = () => {
  const handleAddToPlaylist = (track: MusicTrack) => {
    alert(`Added "${track.title}" to playlist`);
  };

  const handlePlay = (track: MusicTrack) => {
    alert(`Previewing: ${track.title}`);
  };

  return (
    <CloudrabbitTheme>
      <div style={{ padding: '32px', backgroundColor: 'var(--colors-surface-background)', minHeight: '100vh' }}>
        <h3 style={{ 
          margin: '0 0 24px 0', 
          color: 'var(--colors-text-primary)',
          fontSize: 'var(--typography-sizes-heading-h3)'
        }}>
          Search Results
        </h3>
        <div style={{ 
          marginBottom: '24px', 
          padding: '16px', 
          backgroundColor: 'var(--colors-surface-secondary)', 
          borderRadius: 'var(--borders-radius-medium)',
          color: 'var(--colors-text-secondary)' 
        }}>
          Results for "Nebula"
        </div>
        <MusicTrackList 
          tracks={MOCK_TRACKS.slice(0, 3)}
          onPlay={handlePlay}
          onAddToPlaylist={handleAddToPlaylist}
        />
      </div>
    </CloudrabbitTheme>
  );
};

export const LoadingState = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '32px', backgroundColor: 'var(--colors-surface-background)', minHeight: '100vh' }}>
        <h3 style={{ 
          margin: '0 0 24px 0', 
          color: 'var(--colors-text-primary)',
          fontSize: 'var(--typography-sizes-heading-h3)'
        }}>
          Library
        </h3>
        <MusicTrackList 
          tracks={[]}
          loading={true}
        />
      </div>
    </CloudrabbitTheme>
  );
};