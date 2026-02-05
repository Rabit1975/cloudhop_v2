// YouTube Music Search API using your cookie
// This runs on Vercel serverless, bypassing CORS

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  // Your YouTube Music cookie
  const YT_COOKIE = '15.YT=SQ8ZinnDYxYeZW3Axo9TxXv4GZ5-TG2ERh4QAd0j2dhGGfkyesHv9roTNjeHXBH5y_Dznw051gOSLXauWnP7ZrHZ7Ey_wXw6n6LZCDxCejwHmmPI5nRxn5A5dY_Io46ePbKw2Li1UClc8gKQZs5YZfD-QT8WMmCsVlFX0WPWotVn_n8zMei4dEP-UfTSFGogBvaprEethYuzQPjhvykPc3mWKrQYDaZq-SnZ_vQqyRmcgBF6MuZ-zI84iC5XNEe-0Am5tUhTjDAHOB6542YFv9PCwVRQR-OF-_BtxPQdDN62LZS_gXnbHSzm1-Dv6gkM8eaNjRcnwSiShJnbRUjo8g';

  try {
    const response = await fetch('https://music.youtube.com/youtubei/v1/search?prettyPrint=false', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': YT_COOKIE,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
        'X-Goog-Authuser': '0',
        'X-YouTube-Client-Name': '67',
        'X-YouTube-Client-Version': '1.20260128.03.00'
      },
      body: JSON.stringify({
        context: {
          client: {
            clientName: 'WEB_REMIX',
            clientVersion: '1.20260128.03.00',
            hl: 'en',
            gl: 'US'
          }
        },
        query: query,
        params: 'Eg-KAQwIARAAGAAgACgAqABQAFYAwKABoQChAKEAMQBRQCFGAAQAFoAqgQChAEEAUQAQ'
      })
    });

    if (!response.ok) {
      console.error('YouTube Music API request failed:', response.status);
      return res.status(500).json({ error: 'YouTube Music API request failed' });
    }

    const data = await response.json();
    const tracks: any[] = [];

    try {
      const contents = data.contents?.tabbedSearchResultsRenderer?.tabs?.[0]?.tabRenderer?.content?.sectionListRenderer?.contents;
      
      if (contents) {
        contents.forEach((section: any) => {
          const items = section?.musicShelfRenderer?.contents;
          if (items) {
            items.forEach((item: any) => {
              const track = item?.musicResponsiveListItemRenderer;
              if (track) {
                const videoId = track.navigationEndpoint?.watchEndpoint?.videoId;
                if (videoId) {
                  tracks.push({
                    videoId: videoId,
                    title: track.flexColumns?.[0]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.[0]?.text || '',
                    artist: track.flexColumns?.[1]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.[0]?.text || '',
                    album: track.flexColumns?.[2]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.[0]?.text || '',
                    duration: track.fixedColumns?.[0]?.musicResponsiveListItemFixedColumnRenderer?.text?.runs?.[0]?.text || '',
                    thumbnail: track.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails?.[0]?.url || ''
                  });
                }
              }
            });
          }
        });
      }
    } catch (parseError) {
      console.error('Error parsing YouTube Music response:', parseError);
    }

    res.status(200).json({ tracks: tracks || [] });

  } catch (error) {
    console.error('YouTube Music search error:', error);
    res.status(500).json({ error: 'Failed to search YouTube Music' });
  }
}
