import { mockMusicTracks } from '@cloudrabbit/music.entities.music-track';
import { MusicPlaylist } from './music-playlist.js';

export function mockMusicPlaylists() {
  const tracks = mockMusicTracks();

  return [
    MusicPlaylist.from({
      id: 'playlist-1',
      name: 'Chill Vibes',
      description: 'Relaxing beats for coding and focus.',
      ownerId: 'user-1',
      isPublic: true,
      tracks: [tracks[0].toObject()],
      createdAt: new Date().toISOString(),
    }),
    MusicPlaylist.from({
      id: 'playlist-2',
      name: 'Gym Hits',
      description: 'High energy workout music.',
      ownerId: 'user-2',
      isPublic: false,
      tracks: [tracks[0].toObject()],
      createdAt: new Date().toISOString(),
    }),
    MusicPlaylist.from({
      id: 'playlist-3',
      name: 'Road Trip',
      description: 'Classic hits for the long road.',
      ownerId: 'user-1',
      isPublic: true,
      tracks: [],
      createdAt: new Date().toISOString(),
    }),
  ];
}