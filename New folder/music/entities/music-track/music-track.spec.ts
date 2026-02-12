import { describe, it, expect } from 'vitest';
import { MusicTrack } from './music-track.js';
import { musicTrackMocks } from './music-track.mock.js';

describe('MusicTrack', () => {
  it('should create a MusicTrack instance from a plain object', () => {
    const plain = musicTrackMocks[0];
    const musicTrack = MusicTrack.from(plain);

    expect(musicTrack).toBeInstanceOf(MusicTrack);
    expect(musicTrack.id).toEqual(plain.id);
    expect(musicTrack.title).toEqual(plain.title);
  });

  it('should serialize a MusicTrack instance to a plain object', () => {
    const plain = musicTrackMocks[0];
    const musicTrack = MusicTrack.from(plain);
    const serialized = musicTrack.toObject();

    expect(serialized).toEqual(plain);
  });

  it('should create a MusicTrack with the correct properties', () => {
    const plain = musicTrackMocks[1];
    const musicTrack = MusicTrack.from(plain);

    expect(musicTrack.id).toBe(plain.id);
    expect(musicTrack.title).toBe(plain.title);
    expect(musicTrack.duration).toBe(plain.duration);
  });
});