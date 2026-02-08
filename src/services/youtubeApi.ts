
interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
    description: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
  };
}

export class YouTubeApiService {
  private getApiUrl(endpoint: string) {
    // In development, we point to the production server to access the API keys
    // securely stored in Vercel environment variables.
    const isDev = import.meta.env.DEV;
    const baseUrl = isDev ? 'https://cloudhop.tech' : '';
    return `${baseUrl}/api/${endpoint}`;
  }

  async searchVideos(query: string, maxResults = 20): Promise<YouTubeVideo[]> {
    try {
      const url = this.getApiUrl(`youtube/search?q=${encodeURIComponent(query)}`);
      
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('YouTube API Error:', errorData);
        throw new Error(`YouTube API Error: ${response.statusText}`);
      }

      // The serverless function returns the items array directly
      const items: YouTubeVideo[] = await response.json();
      return items;
    } catch (error) {
      console.error('Failed to search YouTube:', error);
      // Return empty array instead of throwing to prevent UI crash
      return [];
    }
  }

  async getChannelVideos(channelId: string, maxResults = 20): Promise<YouTubeVideo[]> {
    // TODO: Implement getChannelVideos in the serverless function if needed
    console.warn('getChannelVideos not implemented in serverless function yet');
    return [];
  }
}

// Singleton instance
export const youtubeApi = new YouTubeApiService();
