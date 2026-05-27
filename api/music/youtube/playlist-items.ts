import { fetchYouTube, getBearerToken } from '../_shared.js';

export default async function handler(req: any, res: any) {
  if (req.method && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = getBearerToken(req);
  const playlistId = req.query.playlistId;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  if (!playlistId || typeof playlistId !== 'string') {
    return res.status(400).json({ error: 'playlistId is required' });
  }

  try {
    const response = await fetchYouTube<{ items?: unknown[] }>(
      'https://www.googleapis.com/youtube/v3/playlistItems',
      token,
      {
        part: 'snippet,contentDetails',
        playlistId,
        maxResults: 50,
      }
    );

    return res.status(200).json(response.items || []);
  } catch (caughtError: any) {
    console.error('Music playlist items fetch failed:', caughtError?.message || caughtError);
    return res.status(500).json({ error: 'Failed to fetch playlist items' });
  }
}
