// twitch.d.ts
// Type definitions for window.twitch API exposed via preload bridge

import { TwitchStream, TwitchStreamInfo } from "../core/twitch";

declare global {
  interface Window {
    twitch: {
      getFollowedStreams: () => Promise<TwitchStream[]>;
      getRecommendedStreams: () => Promise<TwitchStream[]>;
      getStreamInfo: (channel: string) => Promise<TwitchStreamInfo | null>;
      getChatMessages: (channel: string) => Promise<string[]>;
    };
  }
}

export {};
