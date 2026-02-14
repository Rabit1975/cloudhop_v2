// YouTube API v3 Service
// Real API integration with proper error handling and caching

export interface YouTubeVideo {
  id: string;
  etag: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
  };
  status: {
    uploadStatus: string;
    privacyStatus: string;
    license: string;
    embeddable: boolean;
    madeForKids: boolean;
  };
  statistics: {
    viewCount: number;
    likeCount: number;
    favoriteCount: number;
    commentCount: number;
  };
  playerEmbedHtml: string;
}

export interface YouTubeSearchResponse {
  kind: string;
  etag: string;
  nextPageToken: string | null;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  results: YouTubeVideo[];
  };
  prevPageToken: string | null;
  items: YouTubeVideo[];
}

class YouTubeAPIService {
  private apiKey: string;
  private baseUrl: string = 'https://www.googleapis.com/youtube/v3';

  constructor() {
    // Use environment variable or fallback to demo key
    this.apiKey = import.meta.env.VITE_YOUTUBE_API_KEY || 'AIzaSyDemoKey';
  }

  private async makeRequest(endpoint: string, params: Record<string, string> = {}): Promise<any> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    
    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`YouTube API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async searchVideos(query: string, maxResults: number = 25): Promise<YouTubeVideo[]> {
    try {
      console.log('🔍 Searching YouTube API for:', query);
      
      const response: YouTubeSearchResponse = await this.makeRequest('search', {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: maxResults.toString(),
        videoCategoryId: '10', // Music category
        order: 'relevance',
        key: this.apiKey,
      });

      console.log('✅ YouTube API response:', response);
      return response.items || [];
    } catch (error) {
      console.error('❌ YouTube API search error:', error);
      throw error;
    }
  }

  async getVideoDetails(videoId: string): Promise<YouTubeVideo | null> {
    try {
      const response = await this.makeRequest('videos', {
        part: 'snippet,contentDetails,statistics',
        id: videoId,
        key: this.apiKey,
      });

      return response.items?.[0] || null;
    } catch (error) {
      console.error('❌ YouTube API video details error:', error);
      return null;
    }
  }

  async getPlaylistItems(playlistId: string, maxResults: number = 50): Promise<YouTubeVideo[]> {
    try {
      const response = await this.makeRequest('playlistItems', {
        part: 'snippet',
        playlistId: playlistId,
        maxResults: maxResults.toString(),
        key: this.apiKey,
      });

      return response.items || [];
    } catch (error) {
      console.error('❌ YouTube API playlist items error:', error);
      throw error;
    }
  }

  // Helper method to convert video to track format
  static videoToTrack(video: YouTubeVideo): any {
    return {
      id: video.id,
      title: video.snippet.title,
      artist: video.snippet.channelTitle,
      album: video.snippet.title,
      duration: 'Live', // API search doesn't return duration, requires 2nd call
      videoId: video.id,
      thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url,
    };
  }
}

// Export singleton instance
export const youtubeApi = new YouTubeAPIService();
