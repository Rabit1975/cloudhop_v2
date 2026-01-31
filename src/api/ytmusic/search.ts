// YouTube Music API - Vercel Serverless Function
// This will be deployed as a serverless function on Vercel

interface YouTubeMusicTrack {
  videoId: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  thumbnail: string;
}

export async function searchYouTubeMusic(query: string): Promise<YouTubeMusicTrack[]> {
  try {
    // For now, return enhanced mock data
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
    const filteredResults = mockResults.filter(track => 
      track.title.toLowerCase().includes(query.toLowerCase()) ||
      track.artist.toLowerCase().includes(query.toLowerCase()) ||
      track.album.toLowerCase().includes(query.toLowerCase())
    );

    return filteredResults;
  } catch (error) {
    console.error('YouTube Music search error:', error);
    throw new Error('Failed to search YouTube Music');
  }
}

// For Vercel serverless function deployment
export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const results = await searchYouTubeMusic(query);
    res.status(200).json({ tracks: results });
  } catch (error) {
    console.error('YouTube Music search error:', error);
    res.status(500).json({ error: 'Failed to search YouTube Music' });
  }
}
