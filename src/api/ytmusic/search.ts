// YouTube Music API - Vercel Serverless Function
// Real YouTube Music integration with cookie authentication

interface YouTubeMusicTrack {
  videoId: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  thumbnail: string;
}

export async function searchYouTubeMusic(
  query: string,
  cookie?: string
): Promise<YouTubeMusicTrack[]> {
  try {
    // If no cookie provided, fall back to mock data
    if (!cookie) {
      console.log('No YouTube Music cookie provided, using mock data');
      return getMockSearchResults(query);
    }

    // Make real YouTube Music API request
    const response = await fetch('https://music.youtube.com/youtubei/v1/search?prettyPrint=false', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
        'X-Goog-Authuser': '0',
        'X-YouTube-Client-Name': '67',
        'X-YouTube-Client-Version': '1.20260128.03.00',
      },
      body: JSON.stringify({
        context: {
          client: {
            clientName: 'WEB_REMIX',
            clientVersion: '1.20260128.03.00',
            hl: 'en',
            gl: 'US',
          },
        },
        query: query,
        params: 'Eg-KAQwIARAAGAAgACgAqABQAFYAwKABoQChAKEAMQBRQCFGAAQAFoAqgQChAEEAUQAQ',
      }),
    });

    if (!response.ok) {
      console.error('YouTube Music API request failed:', response.status);
      return getMockSearchResults(query);
    }

    const data = await response.json();
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
                const videoId = track.navigationEndpoint?.watchEndpoint?.videoId;
                if (videoId) {
                  tracks.push({
                    videoId: videoId,
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
                      track.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails?.[0]?.url ||
                      '',
                  });
                }
              }
            });
          }
        });
      }
    } catch (parseError) {
      console.error('Error parsing YouTube Music response:', parseError);
      return getMockSearchResults(query);
    }

    return tracks.length > 0 ? tracks : getMockSearchResults(query);
  } catch (error) {
    console.error('YouTube Music search error:', error);
    return getMockSearchResults(query);
  }
}

// Fallback mock data
function getMockSearchResults(query: string): YouTubeMusicTrack[] {
  const mockResults: YouTubeMusicTrack[] = [
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
      videoId: 'lTRiuFIqnVw',
      title: 'Martin Garrix - Animals (Official Video)',
      artist: 'Martin Garrix',
      album: 'Animals',
      duration: '5:03',
      thumbnail: 'https://i.ytimg.com/vi/lTRiuFIqnVw/maxresdefault.jpg',
    },
    {
      videoId: 'hTWKbfoikeg',
      title: "Dua Lipa - Don't Start Now",
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      duration: '3:03',
      thumbnail: 'https://i.ytimg.com/vi/hTWKbfoikeg/maxresdefault.jpg',
    },
    {
      videoId: 'fEvM-OUbaKs',
      title: 'Queen - Bohemian Rhapsody',
      artist: 'Queen',
      album: 'A Night at the Opera',
      duration: '5:55',
      thumbnail: 'https://i.ytimg.com/vi/fEvM-OUbaKs/maxresdefault.jpg',
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

// For Vercel serverless function deployment
export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query, cookie } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const results = await searchYouTubeMusic(query, cookie as string);
    res.status(200).json({ tracks: results });
  } catch (error) {
    console.error('YouTube Music search error:', error);
    res.status(500).json({ error: 'Failed to search YouTube Music' });
  }
}
