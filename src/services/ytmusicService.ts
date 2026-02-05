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
    this.baseUrl =
      process.env.NODE_ENV === 'production' ? 'https://your-app.vercel.app/api' : '/api';
  }

  // Authenticate with YouTube Music using cookies
  async authenticate(cookie: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/ytmusic/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cookie }),
      });

      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: data.success,
        message: data.message,
      };
    } catch (error) {
      console.error('YouTube Music authentication error:', error);
      return {
        success: false,
        message: 'Failed to authenticate with YouTube Music',
      };
    }
  }

  // Search YouTube Music
  async search(query: string, cookie?: string): Promise<YouTubeMusicTrack[]> {
    try {
      // Use real API endpoint with cookie authentication
      const response = await fetch(
        `${this.baseUrl}/ytmusic/search?query=${encodeURIComponent(query)}${cookie ? `&cookie=${encodeURIComponent(cookie)}` : ''}`
      );

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.tracks || [];
    } catch (error) {
      console.error('YouTube Music search error:', error);
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
      // Lofi & Chill
      {
        videoId: 'jfKfPfyJRdk',
        title: 'lofi hip hop radio - beats to relax/study to',
        artist: 'Lofi Girl',
        album: 'Lofi Hip Hop',
        duration: '0:00',
        thumbnail: 'https://i.ytimg.com/vi/jfKfPfyJRdk/maxresdefault.jpg',
      },
      {
        videoId: 'DWcJFNfaw9c',
        title: 'Chill Vibes - Relaxing Music',
        artist: 'Chill Music',
        album: 'Relaxation',
        duration: '0:00',
        thumbnail: 'https://i.ytimg.com/vi/DWcJFNfaw9c/maxresdefault.jpg',
      },
      {
        videoId: '4xDlrWkYp3E',
        title: 'Peaceful Piano - Relaxing Music',
        artist: 'Piano Peace',
        album: 'Calm Piano',
        duration: '1:00:00',
        thumbnail: 'https://i.ytimg.com/vi/4xDlrWkYp3E/maxresdefault.jpg',
      },

      // Electronic & EDM
      {
        videoId: 'lTRiuFIqnVw',
        title: 'Martin Garrix - Animals (Official Video)',
        artist: 'Martin Garrix',
        album: 'Animals',
        duration: '5:03',
        thumbnail: 'https://i.ytimg.com/vi/lTRiuFIqnVw/maxresdefault.jpg',
      },
      {
        videoId: 'kTJczUoc26U',
        title: 'Avicii - Levels',
        artist: 'Avicii',
        album: 'Levels',
        duration: '3:18',
        thumbnail: 'https://i.ytimg.com/vi/kTJczUoc26U/maxresdefault.jpg',
      },
      {
        videoId: '9bZkp7q19f0',
        title: 'PSY - GANGNAM STYLE',
        artist: 'PSY',
        album: 'PSY 6甲 Part 1',
        duration: '4:13',
        thumbnail: 'https://i.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg',
      },

      // Pop
      {
        videoId: 'hTWKbfoikeg',
        title: "Dua Lipa - Don't Start Now",
        artist: 'Dua Lipa',
        album: 'Future Nostalgia',
        duration: '3:03',
        thumbnail: 'https://i.ytimg.com/vi/hTWKbfoikeg/maxresdefault.jpg',
      },
      {
        videoId: 'kJQP7kiw5Fk',
        title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
        artist: 'Luis Fonsi',
        album: 'Despacito',
        duration: '4:41',
        thumbnail: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/maxresdefault.jpg',
      },
      {
        videoId: 'YQHsXMglC9A',
        title: 'Adele - Hello',
        artist: 'Adele',
        album: '25',
        duration: '6:07',
        thumbnail: 'https://i.ytimg.com/vi/YQHsXMglC9A/maxresdefault.jpg',
      },
      {
        videoId: '09R8_2nJtjg',
        title: 'Ed Sheeran - Shape of You',
        artist: 'Ed Sheeran',
        album: '÷ (Divide)',
        duration: '3:53',
        thumbnail: 'https://i.ytimg.com/vi/09R8_2nJtjg/maxresdefault.jpg',
      },

      // Rock & Classic
      {
        videoId: 'fEvM-OUbaKs',
        title: 'Queen - Bohemian Rhapsody',
        artist: 'Queen',
        album: 'A Night at the Opera',
        duration: '5:55',
        thumbnail: 'https://i.ytimg.com/vi/fEvM-OUbaKs/maxresdefault.jpg',
      },
      {
        videoId: 'hT_nvWreIhg',
        title: 'Nirvana - Smells Like Teen Spirit',
        artist: 'Nirvana',
        album: 'Nevermind',
        duration: '5:01',
        thumbnail: 'https://i.ytimg.com/vi/hT_nvWreIhg/maxresdefault.jpg',
      },
      {
        videoId: '1w7OgIMMRc4',
        title: 'Led Zeppelin - Stairway to Heaven',
        artist: 'Led Zeppelin',
        album: 'Led Zeppelin IV',
        duration: '8:02',
        thumbnail: 'https://i.ytimg.com/vi/1w7OgIMMRc4/maxresdefault.jpg',
      },

      // Hip Hop & Rap
      {
        videoId: 'vpdiVwJ3m8M',
        title: "Drake - God's Plan",
        artist: 'Drake',
        album: 'Scorpion',
        duration: '3:19',
        thumbnail: 'https://i.ytimg.com/vi/vpdiVwJ3m8M/maxresdefault.jpg',
      },
      {
        videoId: '6JCLY0Rlx6Q',
        title: 'Eminem - Lose Yourself',
        artist: 'Eminem',
        album: '8 Mile',
        duration: '5:26',
        thumbnail: 'https://i.ytimg.com/vi/6JCLY0Rlx6Q/maxresdefault.jpg',
      },
      {
        videoId: 'UJeMA7geogo',
        title: 'Kendrick Lamar - HUMBLE.',
        artist: 'Kendrick Lamar',
        album: 'DAMN.',
        duration: '2:57',
        thumbnail: 'https://i.ytimg.com/vi/UJeMA7geogo/maxresdefault.jpg',
      },

      // R&B & Soul
      {
        videoId: 'C-u5mLJmKjM',
        title: 'The Weeknd - Blinding Lights',
        artist: 'The Weeknd',
        album: 'After Hours',
        duration: '3:20',
        thumbnail: 'https://i.ytimg.com/vi/C-u5mLJmKjM/maxresdefault.jpg',
      },
      {
        videoId: 'yo4QfS5r3h8',
        title: 'Bruno Mars - 24K Magic',
        artist: 'Bruno Mars',
        album: '24K Magic',
        duration: '3:46',
        thumbnail: 'https://i.ytimg.com/vi/yo4QfS5r3h8/maxresdefault.jpg',
      },

      // Country
      {
        videoId: 'lY2yjAdb6HQ',
        title: 'Luke Combs - Beautiful Crazy',
        artist: 'Luke Combs',
        album: 'Beautiful Crazy',
        duration: '3:44',
        thumbnail: 'https://i.ytimg.com/vi/lY2yjAdb6HQ/maxresdefault.jpg',
      },

      // Alternative & Indie
      {
        videoId: 'gC7v7U_3HwA',
        title: 'Imagine Dragons - Believer',
        artist: 'Imagine Dragons',
        album: 'Evolve',
        duration: '3:24',
        thumbnail: 'https://i.ytimg.com/vi/gC7v7U_3HwA/maxresdefault.jpg',
      },
      {
        videoId: 'RgKAFK5djSk',
        title: 'Twenty One Pilots - Stressed Out',
        artist: 'Twenty One Pilots',
        album: 'Blurryface',
        duration: '3:22',
        thumbnail: 'https://i.ytimg.com/vi/RgKAFK5djSk/maxresdefault.jpg',
      },

      // Latin & Reggaeton
      {
        videoId: 'DYVP4_2b0dY',
        title: 'Bad Bunny - Tití Me Preguntó',
        artist: 'Bad Bunny',
        album: 'Un Verano Sin Ti',
        duration: '4:21',
        thumbnail: 'https://i.ytimg.com/vi/DYVP4_2b0dY/maxresdefault.jpg',
      },

      // Metal
      {
        videoId: '1lWJXDG2i0A',
        title: 'Metallica - Enter Sandman',
        artist: 'Metallica',
        album: 'Metallica',
        duration: '5:32',
        thumbnail: 'https://i.ytimg.com/vi/1lWJXDG2i0A/maxresdefault.jpg',
      },
      {
        videoId: '8SgI5hlhCpE',
        title: 'Wind Walker - Wasteland',
        artist: 'Wind Walker',
        album: 'Wasteland',
        duration: '3:45',
        thumbnail: 'https://i.ytimg.com/vi/8SgI5hlhCpE/maxresdefault.jpg',
      },
      {
        videoId: 'LXbDYNWtO-0',
        title: 'Wind Walker - The Cave',
        artist: 'Wind Walker',
        album: 'Into the Dark',
        duration: '4:12',
        thumbnail: 'https://i.ytimg.com/vi/LXbDYNWtO-0/maxresdefault.jpg',
      },
      {
        videoId: '2nL5vCjz4qQ',
        title: 'Caskets - More Than Misery',
        artist: 'Caskets',
        album: 'More Than Misery',
        duration: '3:28',
        thumbnail: 'https://i.ytimg.com/vi/2nL5vCjz4qQ/maxresdefault.jpg',
      },
      {
        videoId: 'HqK8Q3c3J3Q',
        title: 'Caskets - Blind Love',
        artist: 'Caskets',
        album: 'Lost Souls',
        duration: '3:56',
        thumbnail: 'https://i.ytimg.com/vi/HqK8Q3c3J3Q/maxresdefault.jpg',
      },

      // Jazz & Blues
      {
        videoId: 'vmDDOFXSgAs',
        title: 'Miles Davis - So What',
        artist: 'Miles Davis',
        album: 'Kind of Blue',
        duration: '9:22',
        thumbnail: 'https://i.ytimg.com/vi/vmDDOFXSgAs/maxresdefault.jpg',
      },
    ];

    // Filter results based on query
    return mockResults.filter(
      track =>
        track.title.toLowerCase().includes(query.toLowerCase()) ||
        track.artist.toLowerCase().includes(query.toLowerCase()) ||
        track.album.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export const ytmusicService = new YouTubeMusicService();
