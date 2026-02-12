import { MusicPlaylist } from './music-playlist.js';
import { mockMusicPlaylists } from './music-playlist.mock.js';

describe('MusicPlaylist', () => {
  it('should have a MusicPlaylist.from() method', () => {
    expect(MusicPlaylist.from).toBeTruthy();
  });

  it('should create a MusicPlaylist instance from a plain object', () => {
    const mockPlaylist = mockMusicPlaylists()[0];
    const playlist = MusicPlaylist.from(mockPlaylist.toObject());

    expect(playlist).toBeInstanceOf(MusicPlaylist);
    expect(playlist.id).toBe(mockPlaylist.id);
  });

  it('should serialize a MusicPlaylist instance to a plain object', () => {
    const mockPlaylist = mockMusicPlaylists()[0];
    const plainObject = mockPlaylist.toObject();

    expect(typeof plainObject).toBe('object');
    expect(plainObject.id).toBe(mockPlaylist.id);
  });
});