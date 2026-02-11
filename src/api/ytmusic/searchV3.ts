// YouTube Data API v3 Search Implementation
// Requires VITE_YOUTUBE_API_KEY in .env

export interface YouTubeVideo {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  publishedAt: string;
  description: string;
}

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

export async function searchYouTube(query: string, maxResults = 10): Promise<YouTubeVideo[]> {
  if (!API_KEY) {
    console.warn('VITE_YOUTUBE_API_KEY is missing. Returning mock data.');
    return getMockVideos(query);
  }

  try {
    const url = new URL(BASE_URL);
    url.searchParams.append('part', 'snippet');
    url.searchParams.append('maxResults', maxResults.toString());
    url.searchParams.append('q', query);
    url.searchParams.append('type', 'video');
    url.searchParams.append('key', API_KEY);
    // Restrict to music if needed
    url.searchParams.append('videoCategoryId', '10'); // 10 is Music

    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorData = await response.json();
      console.error('YouTube API Error:', errorData);
      throw new Error(`YouTube API Error: ${response.status}`);
    }

    const data = await response.json();

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
      publishedAt: item.snippet.publishedAt,
      description: item.snippet.description,
    }));
  } catch (error) {
    console.error('Failed to fetch from YouTube API:', error);
    return getMockVideos(query);
  }
}

// Fallback Mock Data
function getMockVideos(query: string): YouTubeVideo[] {
  return [
    {
      id: 'mock-1',
      title: `Mock Result for ${query} - LoFi Beats`,
      channelTitle: 'CloudHop Music',
      thumbnail: 'https://via.placeholder.com/640x360?text=LoFi+Beats',
      publishedAt: new Date().toISOString(),
      description: 'Relaxing beats to code to.',
    },
    {
      id: 'mock-2',
      title: `Best of Synthwave 2026`,
      channelTitle: 'Neon Vibes',
      thumbnail: 'https://via.placeholder.com/640x360?text=Synthwave',
      publishedAt: new Date().toISOString(),
      description: 'Retro futuristic sounds.',
    },
    {
      id: 'mock-3',
      title: `Ambient Space Soundscape`,
      channelTitle: 'Deep Space',
      thumbnail: 'https://via.placeholder.com/640x360?text=Space+Ambient',
      publishedAt: new Date().toISOString(),
      description: 'Deep focus music for deep work.',
    },
  ];
}
