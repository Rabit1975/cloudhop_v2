import type { NextApiRequest, NextApiResponse } from 'next';

interface YouTubeMusicTrack {
  videoId: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  thumbnail: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    // For now, return mock data until we implement the real API
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
      }
    ];

    // Filter results based on query
    const filteredResults = mockResults.filter(track => 
      track.title.toLowerCase().includes(query.toLowerCase()) ||
      track.artist.toLowerCase().includes(query.toLowerCase()) ||
      track.album.toLowerCase().includes(query.toLowerCase())
    );

    res.status(200).json({ tracks: filteredResults });
  } catch (error) {
    console.error('YouTube Music search error:', error);
    res.status(500).json({ error: 'Failed to search YouTube Music' });
  }
}
