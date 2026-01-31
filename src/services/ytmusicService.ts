// YouTube Music Service - Backend API Integration
// This service communicates with our Vercel serverless functions

interface YouTubeMusicTrack {
  videoId: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  thumbnail: string;
}

interface YouTubeMusicPlaylist {
  id: string;
  title: string;
  description: string;
  trackCount: number;
  thumbnail: string;
}

export class YouTubeMusicService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://your-app.vercel.app/api' 
      : '/api';
  }

  // Search YouTube Music
  async search(query: string): Promise<YouTubeMusicTrack[]> {
    try {
      const response = await fetch(`${this.baseUrl}/ytmusic/search?query=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.tracks || [];
    } catch (error) {
      console.error('YouTube Music search error:', error);
      // Fallback to mock data if API fails
      return this.getMockSearchResults(query);
    }
  }

  // Get user library (requires authentication)
  async getLibrary(cookie: string): Promise<YouTubeMusicPlaylist[]> {
    try {
      const response = await fetch(`${this.baseUrl}/ytmusic/library`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cookie }),
      });

      if (!response.ok) {
        throw new Error(`Library fetch failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.playlists || [];
    } catch (error) {
      console.error('YouTube Music library error:', error);
      return [];
    }
  }

  // Get playlist details
  async getPlaylist(playlistId: string): Promise<YouTubeMusicTrack[]> {
    try {
      const response = await fetch(`${this.baseUrl}/ytmusic/playlist?id=${playlistId}`);
      
      if (!response.ok) {
        throw new Error(`Playlist fetch failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.tracks || [];
    } catch (error) {
      console.error('YouTube Music playlist error:', error);
      return [];
    }
  }

  // Mock search results for fallback
  private getMockSearchResults(query: string): YouTubeMusicTrack[] {
    const mockResults: YouTubeMusicTrack[] = [
      {
        videoId: 'jfKfPfyJRdk',
        title: 'lofi hip hop radio - beats to relax/study to',
        artist: 'Lofi Girl',
        album: 'Lofi Hip Hop',
        duration: '0:00',
        thumbnail: 'https://i.ytimg.com/vi/jfKfPfyJRdk/maxresdefault.jpg'
      },
      {
        videoId: 'DWcJFNfaw9c',
        title: 'Chill Vibes - Relaxing Music',
        artist: 'Chill Music',
        album: 'Relaxation',
        duration: '0:00',
        thumbnail: 'https://i.ytimg.com/vi/DWcJFNfaw9c/maxresdefault.jpg'
      },
      {
        videoId: 'lTRiuFIqnVw',
        title: 'Martin Garrix - Animals (Official Video)',
        artist: 'Martin Garrix',
        album: 'Animals',
        duration: '5:03',
        thumbnail: 'https://i.ytimg.com/vi/lTRiuFIqnVw/maxresdefault.jpg'
      },
      {
        videoId: 'hTWKbfoikeg',
        title: 'Dua Lipa - Don\'t Start Now',
        artist: 'Dua Lipa',
        album: 'Future Nostalgia',
        duration: '3:03',
        thumbnail: 'https://i.ytimg.com/vi/hTWKbfoikeg/maxresdefault.jpg'
      },
      {
        videoId: 'fEvM-OUbaKs',
        title: 'Queen - Bohemian Rhapsody',
        artist: 'Queen',
        album: 'A Night at the Opera',
        duration: '5:55',
        thumbnail: 'https://i.ytimg.com/vi/fEvM-OUbaKs/maxresdefault.jpg'
      }
    ];

    // Filter results based on query
    return mockResults.filter(track => 
      track.title.toLowerCase().includes(query.toLowerCase()) ||
      track.artist.toLowerCase().includes(query.toLowerCase()) ||
      track.album.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export const ytmusicService = new YouTubeMusicService();
