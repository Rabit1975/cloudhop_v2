import { fetchYouTube, getBearerToken } from '../../_shared.js';

export default async function handler(req: any, res: any) {
  if (req.method && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = getBearerToken(req);
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const response = await fetchYouTube<{ items?: unknown[] }>(
      'https://www.googleapis.com/youtube/v3/videos',
      token,
      {
        part: 'snippet,contentDetails,statistics',
        myRating: 'like',
        maxResults: 50,
      }
    );

    return res.status(200).json(response.items || []);
  } catch (caughtError: any) {
    console.error('Music liked videos fetch failed:', caughtError?.message || caughtError);
    return res.status(500).json({ error: 'Failed to fetch liked videos' });
  }
}
