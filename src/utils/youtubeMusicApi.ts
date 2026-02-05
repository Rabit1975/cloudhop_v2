// YouTube Music API using cookie-based authentication
// Based on Music Assistant approach

export interface YouTubeMusicTrack {
  videoId: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  thumbnail: string;
}

export interface YouTubeMusicPlaylist {
  id: string;
  title: string;
  description: string;
  trackCount: number;
  thumbnail: string;
}

class YouTubeMusicAPI {
  private cookie: string | null = null;
  private isAuthenticated = false;

  // Set authentication cookie (full cookie string)
  setCookie(cookie: string) {
    this.cookie = cookie;
    this.isAuthenticated = true;
    console.log('YouTube Music API authenticated with full cookie');
  }

  // Check if authenticated
  isAuthed(): boolean {
    return this.isAuthenticated && !!this.cookie;
  }

  // Get user's library/playlists
  async getLibrary(): Promise<YouTubeMusicPlaylist[]> {
    if (!this.isAuthed()) {
      throw new Error('Not authenticated with YouTube Music');
    }

    console.log('Attempting to fetch library...');

    try {
      // First, let's try a simpler request to test connectivity
      const testResponse = await fetch('https://music.youtube.com/verify_session', {
        method: 'GET',
        headers: {
          Cookie: this.cookie || '',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
          Referer: 'https://music.youtube.com/',
        },
        mode: 'cors',
      });

      console.log('Test response status:', testResponse.status);

      if (!testResponse.ok) {
        throw new Error(`Test request failed: ${testResponse.status}`);
      }

      // If test works, try the actual library request
      const response = await fetch(
        'https://music.youtube.com/youtubei/v1/browse?prettyPrint=false',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Cookie: this.cookie || '',
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
            'X-Goog-Authuser': '0',
            'X-Goog-Visitor-Id':
              'CgtTY0ZGV1VZLVQtMCjOh_bLBjIKCgJVUxIEGgAgWWLfAgrcAjE1LllUPUozMldUTmkzbU5GSUxKTFVyQ3VJNkQxLW5VYnJzWHlTbmFPTVhnNGpfX2FUMHpyam5uTDJKekp1N09jaHBwZHhCZUNVUElrMUVnSGttT19UOFd6eDc1NXNJU05KVnNyS3BxS1JlTzFJUDlsRmRVZVd6VHg3aHIxUEtCS05hcVBVa05BV0QtZ0swc2sxMFFxRU50SXcwUUtoTHVZZ0xYRDJDQzVCSVJEaTBWUVJCYU8tdHFZNXk2cUlKUDNEMEdGaGJDa0J6VkszQmk1S2N2OE9kcHpiZ09xb3Zyb09RSmVXV0I0X3pXUDF5RTJkOVJ4ckZFNjJzYzVNNDNUMEVYN0RLV2MydXh5b0JWR1dQUjk3aDRha2tuUm53RThVU0VZeVA2VzVyRDZqTE5nRjFINHE0VzQ3QlVhdzkzY2N1WWthVTZnMzJNS2U2WlZoY3F0SEZDQjBLUQ%3D%3D',
            'X-YouTube-Client-Name': '67',
            'X-YouTube-Client-Version': '1.20260128.03.00',
            'X-YouTube-Device':
              'cbr=Chrome&cbrver=144.0.0.0&ceng=WebKit&cengver=537.36&cos=Windows&cosver=10.0&cplatform=DESKTOP',
            'X-YouTube-Identity-Token': 'QUFFLUhqbEFWUmZrLV90NHYyOUlrQ0ZubG9XU2hNcnpXQXw=',
          },
          body: JSON.stringify({
            context: {
              client: {
                clientName: 'WEB_REMIX',
                clientVersion: '1.20260128.03.00',
                hl: 'en',
                gl: 'US',
                visitorData:
                  'CgtTY0ZGV1VZLVQtMCjOh_bLBjIKCgJVUxIEGgAgWWLfAgrcAjE1LllUPUozMldUTmkzbU5GSUxKTFVyQ3VJNkQxLW5VYnJzWHlTbmFPTVhnNGpfX2FUMHpyam5uTDJKekp1N09jaHBwZHhCZUNVUElrMUVnSGttT19UOFd6eDc1NXNJU05KVnNyS3BxS1JlTzFJUDlsRmRVZVd6VHg3aHIxUEtCS05hcVBVa05BV0QtZ0swc2sxMFFxRU50SXcwUUtoTHVZZ0xYRDJDQzVCSVJEaTBWUVJCYU8tdHFZNXk2cUlKUDNEMEdGaGJDa0J6VkszQmk1S2N2OE9kcHpiZ09xb3Zyb09RSmVXV0I0X3pXUDF5RTJkOVJ4ckZFNjJzYzVNNDNUMEVYN0RLV2MydXh5b0JWR1dQUjk3aDRha2tuUm53RThVU0VZeVA2VzVyRDZqTE5nRjFINHE0VzQ3QlVhdzkzY2N1WWthVTZnMzJNS2U2WlZoY3F0SEZDQjBLUQ%3D%3D',
              },
            },
            browseId: 'FEmusic_library_landing',
          }),
          mode: 'cors',
        }
      );

      if (!response.ok) {
        console.error('Library response status:', response.status);
        console.error('Library response headers:', response.headers);
        throw new Error(`Failed to fetch library: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Library response data:', data);
      return this.parseLibraryResponse(data);
    } catch (error) {
      console.error('Error fetching library:', error);

      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error(
          'CORS error: YouTube Music blocks cross-origin requests. This method may not work from a web app.'
        );
      }

      throw error;
    }
  }

  // Search YouTube Music
  async search(query: string): Promise<YouTubeMusicTrack[]> {
    if (!this.isAuthed()) {
      throw new Error('Not authenticated with YouTube Music');
    }

    try {
      const response = await fetch(
        'https://music.youtube.com/youtubei/v1/search?prettyPrint=false',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Cookie: this.cookie || '',
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          },
          body: JSON.stringify({
            context: {
              client: {
                clientName: 'WEB_REMIX',
                clientVersion: '1.20220606.03.00',
              },
            },
            query: query,
            params: 'Eg-KAQwIARAAGAAgACgAqABQAFYAwKABoQChAKEAMQBRQCFGAAQAFoAqgQChAEEAUQAQ',
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to search');
      }

      const data = await response.json();
      return this.parseSearchResponse(data);
    } catch (error) {
      console.error('Error searching:', error);
      throw error;
    }
  }

  // Get playlist details
  async getPlaylist(playlistId: string): Promise<YouTubeMusicTrack[]> {
    if (!this.isAuthed()) {
      throw new Error('Not authenticated with YouTube Music');
    }

    try {
      const response = await fetch(
        'https://music.youtube.com/youtubei/v1/browse?prettyPrint=false',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Cookie: this.cookie || '',
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          },
          body: JSON.stringify({
            context: {
              client: {
                clientName: 'WEB_REMIX',
                clientVersion: '1.20220606.03.00',
              },
            },
            browseId: playlistId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch playlist');
      }

      const data = await response.json();
      return this.parsePlaylistResponse(data);
    } catch (error) {
      console.error('Error fetching playlist:', error);
      throw error;
    }
  }

  // Helper: Parse library response
  private parseLibraryResponse(data: any): YouTubeMusicPlaylist[] {
    const playlists: YouTubeMusicPlaylist[] = [];

    try {
      const contents =
        data.contents?.singleColumnBrowseResultsRenderer?.tabs?.[0]?.tabRenderer?.content
          ?.sectionListRenderer?.contents;

      if (contents) {
        contents.forEach((section: any) => {
          const items = section?.musicShelfRenderer?.contents;
          if (items) {
            items.forEach((item: any) => {
              const playlist = item?.musicTwoRowItemRenderer;
              if (playlist) {
                playlists.push({
                  id: playlist.navigationEndpoint?.browseEndpoint?.browseId || '',
                  title: playlist.title?.runs?.[0]?.text || '',
                  description: playlist.subtitle?.runs?.[0]?.text || '',
                  trackCount: parseInt(playlist.subtitle?.runs?.[2]?.text || '0'),
                  thumbnail:
                    playlist.thumbnailRenderer?.musicThumbnailRenderer?.thumbnail?.thumbnails?.[0]
                      ?.url || '',
                });
              }
            });
          }
        });
      }
    } catch (error) {
      console.error('Error parsing library response:', error);
    }

    return playlists;
  }

  // Helper: Parse search response
  private parseSearchResponse(data: any): YouTubeMusicTrack[] {
    const tracks: YouTubeMusicTrack[] = [];

    try {
      const contents =
        data.contents?.tabbedSearchResultsRenderer?.tabs?.[0]?.tabRenderer?.content
          ?.sectionListRenderer?.contents;

      if (contents) {
        contents.forEach((section: any) => {
          const items = section?.musicShelfRenderer?.contents;
          if (items) {
            items.forEach((item: any) => {
              const track = item?.musicResponsiveListItemRenderer;
              if (track) {
                tracks.push({
                  videoId: track.navigationEndpoint?.watchEndpoint?.videoId || '',
                  title:
                    track.flexColumns?.[0]?.musicResponsiveListItemFlexColumnRenderer?.text
                      ?.runs?.[0]?.text || '',
                  artist:
                    track.flexColumns?.[1]?.musicResponsiveListItemFlexColumnRenderer?.text
                      ?.runs?.[0]?.text || '',
                  album:
                    track.flexColumns?.[2]?.musicResponsiveListItemFlexColumnRenderer?.text
                      ?.runs?.[0]?.text || '',
                  duration:
                    track.fixedColumns?.[0]?.musicResponsiveListItemFixedColumnRenderer?.text
                      ?.runs?.[0]?.text || '',
                  thumbnail:
                    track.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails?.[0]?.url || '',
                });
              }
            });
          }
        });
      }
    } catch (error) {
      console.error('Error parsing search response:', error);
    }

    return tracks;
  }

  // Helper: Parse playlist response
  private parsePlaylistResponse(data: any): YouTubeMusicTrack[] {
    const tracks: YouTubeMusicTrack[] = [];

    try {
      const contents =
        data.contents?.singleColumnBrowseResultsRenderer?.tabs?.[0]?.tabRenderer?.content
          ?.sectionListRenderer?.contents;

      if (contents) {
        contents.forEach((section: any) => {
          const items = section?.musicPlaylistShelfRenderer?.contents;
          if (items) {
            items.forEach((item: any) => {
              const track = item?.musicResponsiveListItemRenderer;
              if (track) {
                tracks.push({
                  videoId: track.navigationEndpoint?.watchEndpoint?.videoId || '',
                  title:
                    track.flexColumns?.[0]?.musicResponsiveListItemFlexColumnRenderer?.text
                      ?.runs?.[0]?.text || '',
                  artist:
                    track.flexColumns?.[1]?.musicResponsiveListItemFlexColumnRenderer?.text
                      ?.runs?.[0]?.text || '',
                  album:
                    track.flexColumns?.[2]?.musicResponsiveListItemFlexColumnRenderer?.text
                      ?.runs?.[0]?.text || '',
                  duration:
                    track.fixedColumns?.[0]?.musicResponsiveListItemFixedColumnRenderer?.text
                      ?.runs?.[0]?.text || '',
                  thumbnail:
                    track.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails?.[0]?.url || '',
                });
              }
            });
          }
        });
      }
    } catch (error) {
      console.error('Error parsing playlist response:', error);
    }

    return tracks;
  }
}

export const youtubeMusicAPI = new YouTubeMusicAPI();
