// Twitch Service - Secure API Integration
import { TwitchAPI } from '../core/twitch/TwitchAPI';
import { TwitchValidator } from '../core/twitch/validation';

interface StreamInfo {
  channel: string;
  title: string;
  game: string;
  viewers: number;
  thumbnail: string;
  isLive: boolean;
}

interface UserInfo {
  id: string;
  login: string;
  displayName: string;
  description: string;
  profileImageUrl: string;
  viewCount: number;
  createdAt: string;
  broadcasterType: 'partner' | 'affiliate' | '';
}

export class TwitchService {
  private api: TwitchAPI;

  constructor(clientId?: string) {
    this.api = new TwitchAPI(clientId);
  }

  async getStreamInfo(channel: string): Promise<StreamInfo | null> {
    try {
      const validatedChannel = TwitchValidator.validateChannel(channel);
      const streamData = await this.api.getStreamInfo(validatedChannel);

      if (!streamData) {
        return {
          channel: validatedChannel,
          title: '',
          game: '',
          viewers: 0,
          thumbnail: '',
          isLive: false,
        };
      }

      return {
        channel: validatedChannel,
        title: streamData.title,
        game: streamData.game_name,
        viewers: streamData.viewer_count,
        thumbnail: streamData.thumbnail_url,
        isLive: streamData.type === 'live',
      };
    } catch (error) {
      console.error('TwitchService: Error getting stream info:', error);
      return null;
    }
  }

  async getUserInfo(channel: string): Promise<UserInfo | null> {
    try {
      const validatedChannel = TwitchValidator.validateChannel(channel);
      const userData = await this.api.getUserInfo(validatedChannel);

      if (!userData) {
        return null;
      }

      return {
        id: userData.id,
        login: userData.login,
        displayName: userData.display_name,
        description: userData.description,
        profileImageUrl: userData.profile_image_url,
        viewCount: userData.view_count,
        createdAt: userData.created_at,
        broadcasterType: userData.broadcaster_type as 'partner' | 'affiliate' | '',
      };
    } catch (error) {
      console.error('TwitchService: Error getting user info:', error);
      return null;
    }
  }

  async getRecentMessages(channel: string): Promise<any[]> {
    try {
      const validatedChannel = TwitchValidator.validateChannel(channel);
      return await this.api.getRecentMessages(validatedChannel);
    } catch (error) {
      console.error('TwitchService: Error getting recent messages:', error);
      return [];
    }
  }

  // Check if a channel is currently live
  async isChannelLive(channel: string): Promise<boolean> {
    try {
      const streamInfo = await this.getStreamInfo(channel);
      return streamInfo?.isLive || false;
    } catch (error) {
      console.error('TwitchService: Error checking if channel is live:', error);
      return false;
    }
  }

  // Get multiple stream infos (for dashboard/multi-view)
  async getMultipleStreamInfos(channels: string[]): Promise<StreamInfo[]> {
    try {
      const validatedChannels = channels.map(channel => TwitchValidator.validateChannel(channel));

      const promises = validatedChannels.map(channel =>
        this.getStreamInfo(channel).catch(() => null)
      );

      const results = await Promise.all(promises);
      return results.filter((info): info is StreamInfo => info !== null);
    } catch (error) {
      console.error('TwitchService: Error getting multiple stream infos:', error);
      return [];
    }
  }
}

// Singleton instance
export const twitchService = new TwitchService();
