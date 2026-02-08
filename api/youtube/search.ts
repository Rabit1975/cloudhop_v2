
export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { q } = req.query;
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    console.error('Server configuration error: Missing YOUTUBE_API_KEY');
    return res.status(500).json({ error: 'Server configuration error: Missing API Key' });
  }

  if (!q) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${encodeURIComponent(
    q as string
  )}&type=video&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error('YouTube API Error:', data);
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data.items);
  } catch (error: any) {
    console.error('YouTube Search Failed:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
