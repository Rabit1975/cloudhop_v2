import { MusicTrack } from './music-track.js';
import { MusicTrackPlain } from './music-track-type.js';

export const musicTrackMocks: MusicTrackPlain[] = [
  {
    id: 'track-01',
    title: 'Neon Nights',
    artist: 'Cyberwave',
    duration: 215,
    sourceType: 'youtube',
    sourceIdentifier: 'dQw4w9WgXcQ',
    thumbnailUrl: 'https://res.cloudinary.com/ddnr1ptva/image/upload/f_auto,q_auto/ai-images/get/gd447ce973b15c84ff10dffa608c8a7c3ab75976c1e9c06a25f5a42edd63ce5aef62d91f05fc4422d397dc6e29d5239f8db486c99c1ce858e9393131e6ebc3638_1280.jpg',
    isPublic: true,
    createdAt: '2023-10-27T10:00:00Z',
    uploaderId: 'user-01',
  },
  {
    id: 'track-02',
    title: 'Midnight Drive',
    artist: 'Synth Heroes',
    duration: 180,
    sourceType: 'upload',
    sourceIdentifier: 'https://example.com/audio/midnight-drive.mp3',
    thumbnailUrl: 'https://res.cloudinary.com/ddnr1ptva/image/upload/f_auto,q_auto/ai-images/get/g3abe76473c6c0dd0d599c161bfba15c808093ae91da48c76fb0a0632bc8cec7d5ac9313b417057db3580d50166f33b264abd99217d2f50c5fd983e970e9395b7_1280.jpg',
    isPublic: true,
    createdAt: '2023-10-26T14:30:00Z',
    uploaderId: 'user-02',
  },
  {
    id: 'track-03',
    title: 'Ethereal Dreams',
    artist: 'Lofi Girl',
    duration: 240,
    sourceType: 'external',
    sourceIdentifier: 'ext-12345',
    thumbnailUrl: 'https://res.cloudinary.com/ddnr1ptva/image/upload/f_auto,q_auto/ai-images/get/gaf719e7aa70409e352f930ca087d14c28a313ef6369c6cf47bf185abc5e0c9beb64a3843184cd48e614b00e304fa94218c16dd1ed01d3d1616d8b4ba6ff64fe2_1280.jpg',
    isPublic: true,
    createdAt: '2023-10-25T09:15:00Z',
    uploaderId: 'user-03',
  },
  {
    id: 'track-04',
    title: 'Urban Jungle',
    artist: 'Beat Master',
    duration: 195,
    sourceType: 'youtube',
    sourceIdentifier: 'v=abcdefg',
    thumbnailUrl: 'https://res.cloudinary.com/ddnr1ptva/image/upload/f_auto,q_auto/ai-images/get/gbb7620f3fa677bcef969a80e0c49a61d90c176884e66c0be7c47bd88d29922c9beea8e6bbbdfed50d51748d1d51c1b3889ea4803530d940af221f053706e235a_1280.jpg',
    isPublic: true,
    createdAt: '2023-10-24T16:20:00Z',
    uploaderId: 'user-01',
  },
  {
    id: 'track-05',
    title: 'Silent Echoes',
    artist: 'The Void',
    duration: 300,
    sourceType: 'upload',
    sourceIdentifier: 'https://example.com/audio/silent-echoes.wav',
    thumbnailUrl: 'https://res.cloudinary.com/ddnr1ptva/image/upload/f_auto,q_auto/ai-images/get/ga5e3b0f7193ab41f6612e77af474409d5812b89d466b10b1913114b94127bfe3b81e8684b3f672e8f0f98c7a0f1144cd94ac1bdb61bbe2e18c5aac81db89611f_1280.jpg',
    isPublic: false,
    createdAt: '2023-10-23T11:50:00Z',
    uploaderId: 'user-04',
  }
];

export function mockMusicTracks(): MusicTrack[] {
  return musicTrackMocks.map((plain) => MusicTrack.from(plain));
}