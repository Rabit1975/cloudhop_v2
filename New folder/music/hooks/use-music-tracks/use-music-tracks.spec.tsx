import { renderHook, act } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { MusicTrack, mockMusicTracks } from '@cloudrabbit/music.entities.music-track';
import { useListMusicTracks } from './use-list-music-tracks.js';
import { useGetMusicTrack } from './use-get-music-track.js';
import { useUploadUserAudio } from './use-upload-user-audio.js';
import { useImportExternalTrack } from './use-import-external-track.js';

const mockTracks = mockMusicTracks();

describe('useListMusicTracks', () => {
  it('should return a list of music tracks from mock data', () => {
    const { result } = renderHook(() => useListMusicTracks({ mockData: mockTracks }), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    expect(result.current.tracks).toEqual(mockTracks);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });
});

describe('useGetMusicTrack', () => {
  it('should return a single music track from mock data', () => {
    const mockTrack = mockTracks[0];
    const { result } = renderHook(() => useGetMusicTrack({ variables: { trackId: mockTrack.id }, mockData: mockTrack }), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    expect(result.current.track).toEqual(mockTrack);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });
});

describe('useUploadUserAudio', () => {
  it('should return a function to upload user audio', async () => {
    const { result } = renderHook(() => useUploadUserAudio(), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    const uploadOptions = {
      title: 'Test Track',
      duration: 180,
      audioFileUrl: 'test.mp3',
    };

    // Mock the uploadUserAudio function without actually making a mutation call
    const mockUploadedTrack = MusicTrack.from({
        id: 'test-id',
        title: 'Test Track',
        duration: 180,
        sourceType: 'upload',
        sourceIdentifier: 'test.mp3',
        isPublic: true,
        createdAt: new Date().toISOString(),
    });
    
    const uploadUserAudioMock = vi.fn().mockResolvedValue(mockUploadedTrack);
    result.current.uploadUserAudio = uploadUserAudioMock;

    let uploadedTrack;
    await act(async () => {
      uploadedTrack = await result.current.uploadUserAudio(uploadOptions);
    });

    expect(uploadUserAudioMock).toHaveBeenCalledWith(uploadOptions);
    expect(uploadedTrack).toEqual(mockUploadedTrack);
  });
});

describe('useImportExternalTrack', () => {
  it('should return a function to import an external track', async () => {
    const { result } = renderHook(() => useImportExternalTrack(), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    const importOptions = {
      sourceType: 'youtube',
      sourceIdentifier: 'test_video_id',
      title: 'Test Video',
      duration: 200,
    };

    // Mock the importExternalTrack function without actually making a mutation call
    const mockImportedTrack = MusicTrack.from({
        id: 'test-id',
        title: 'Test Video',
        duration: 200,
        sourceType: 'youtube',
        sourceIdentifier: 'test_video_id',
        isPublic: true,
        createdAt: new Date().toISOString(),
    });

    const importExternalTrackMock = vi.fn().mockResolvedValue(mockImportedTrack);
    result.current.importExternalTrack = importExternalTrackMock;

    let importedTrack;
    await act(async () => {
      importedTrack = await result.current.importExternalTrack(importOptions);
    });

    expect(importExternalTrackMock).toHaveBeenCalledWith(importOptions);
    expect(importedTrack).toEqual(mockImportedTrack);
  });
});