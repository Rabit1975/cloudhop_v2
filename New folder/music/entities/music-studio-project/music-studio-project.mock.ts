import { mockMusicTracks } from '@cloudrabbit/music.entities.music-track';
import { MusicStudioProject } from './music-studio-project.js';

export function mockMusicStudioProjects() {
  const tracks = mockMusicTracks();

  return [
    MusicStudioProject.from({
      id: 'project-1',
      name: 'Summer Remix 2024',
      ownerId: 'user-01',
      lastEditedAt: new Date().toISOString(),
      layers: tracks.map((track) => track.toObject()),
    }),
    MusicStudioProject.from({
      id: 'project-2',
      name: 'Podcast Intro',
      ownerId: 'user-02',
      lastEditedAt: new Date().toISOString(),
      layers: [tracks[0].toObject()],
    }),
    MusicStudioProject.from({
      id: 'project-3',
      name: 'Empty Session',
      ownerId: 'user-01',
      lastEditedAt: new Date().toISOString(),
      layers: [],
    }),
  ];
}