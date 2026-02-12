import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MusicStudioProject } from '@cloudrabbit/music.entities.music-studio-project';
import { MusicTrack } from '@cloudrabbit/music.entities.music-track';
import { MusicStudioEditor } from './music-studio-editor.js';

// --- Mock Data Generators ---
const createMockTrack = (id: string, title: string, duration: number) => {
  return new MusicTrack(
    id,
    title,
    duration,
    'upload',
    `source-${id}`,
    true,
    new Date().toISOString()
  );
};

const mockProject = new MusicStudioProject(
  'project-1',
  'Neon Nights Remix',
  'user-1',
  new Date().toISOString(),
  [
    createMockTrack('track-1', 'Synth Lead', 45),
    createMockTrack('track-2', 'Bass Line', 60),
    createMockTrack('track-3', 'Drum Kit 808', 120),
    createMockTrack('track-4', 'Ambient Pad', 90),
  ]
);

export const EmptyEditor = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme initialTheme="dark">
        <MusicStudioEditor />
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const WithLoadedProject = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme initialTheme="dark">
        <MusicStudioEditor 
          project={mockProject}
          onSave={() => console.log('Saving project...')}
          onPublish={() => console.log('Publishing project...')}
        />
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const LightThemeEditor = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme initialTheme="light">
        <MusicStudioEditor 
          project={mockProject} 
        />
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};