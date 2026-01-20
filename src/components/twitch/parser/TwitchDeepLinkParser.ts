// TwitchDeepLinkParser.ts
// CloudHop × Twitch - Deep link parser for twitch:// URLs
// Handles Twitch protocol links and extracts channel/video/clip information

export interface TwitchDeepLink {
  type: "channel" | "video" | "clip" | "category" | "unknown";
  identifier: string;
  params?: Record<string, string>;
  raw: string;
}

export class TwitchDeepLinkParser {
  /**
   * Parse a Twitch deep link URL
   * Supports:
   * - twitch://stream/channel
   * - twitch://video/12345
   * - twitch://clip/ClipSlug
   * - twitch://category/GameName
   * - https://twitch.tv/channel
   * - https://www.twitch.tv/videos/12345
   */
  static parse(url: string): TwitchDeepLink | null {
    if (!url) return null;

    // Handle twitch:// protocol
    if (url.startsWith("twitch://")) {
      return this.parseTwitchProtocol(url);
    }

    // Handle https://twitch.tv URLs
    if (url.includes("twitch.tv")) {
      return this.parseTwitchWeb(url);
    }

    return null;
  }

  private static parseTwitchProtocol(url: string): TwitchDeepLink {
    const raw = url;
    const withoutProtocol = url.replace("twitch://", "");
    const [type, ...rest] = withoutProtocol.split("/");
    const identifier = rest.join("/");

    switch (type.toLowerCase()) {
      case "stream":
      case "channel":
        return {
          type: "channel",
          identifier,
          raw,
        };

      case "video":
        return {
          type: "video",
          identifier,
          raw,
        };

      case "clip":
        return {
          type: "clip",
          identifier,
          raw,
        };

      case "category":
      case "game":
        return {
          type: "category",
          identifier: decodeURIComponent(identifier),
          raw,
        };

      default:
        return {
          type: "unknown",
          identifier,
          raw,
        };
    }
  }

  private static parseTwitchWeb(url: string): TwitchDeepLink {
    const raw = url;

    try {
      const urlObj = new URL(url);
      const path = urlObj.pathname;
      const params: Record<string, string> = {};
      urlObj.searchParams.forEach((value, key) => {
        params[key] = value;
      });

      // Channel: https://twitch.tv/channelname
      if (path.match(/^\/[^\/]+$/)) {
        const channel = path.substring(1);
        return {
          type: "channel",
          identifier: channel,
          params,
          raw,
        };
      }

      // Video: https://twitch.tv/videos/12345
      const videoMatch = path.match(/^\/videos\/(\d+)/);
      if (videoMatch) {
        return {
          type: "video",
          identifier: videoMatch[1],
          params,
          raw,
        };
      }

      // Clip: https://twitch.tv/clip/SlugName or https://clips.twitch.tv/SlugName
      const clipMatch = path.match(/^\/clip\/([^\/]+)/) || path.match(/^\/([^\/]+)$/);
      if (clipMatch && (urlObj.hostname.includes("clips.") || path.startsWith("/clip/"))) {
        return {
          type: "clip",
          identifier: clipMatch[1],
          params,
          raw,
        };
      }

      // Category: https://twitch.tv/directory/category/GameName
      const categoryMatch = path.match(/^\/directory\/category\/([^\/]+)/);
      if (categoryMatch) {
        return {
          type: "category",
          identifier: decodeURIComponent(categoryMatch[1]),
          params,
          raw,
        };
      }

      return {
        type: "unknown",
        identifier: path,
        params,
        raw,
      };
    } catch (error) {
      return {
        type: "unknown",
        identifier: url,
        raw,
      };
    }
  }

  /**
   * Convert a deep link back to a standard Twitch URL
   */
  static toWebUrl(link: TwitchDeepLink): string {
    switch (link.type) {
      case "channel":
        return `https://twitch.tv/${link.identifier}`;

      case "video":
        return `https://twitch.tv/videos/${link.identifier}`;

      case "clip":
        return `https://clips.twitch.tv/${link.identifier}`;

      case "category":
        return `https://twitch.tv/directory/category/${encodeURIComponent(link.identifier)}`;

      default:
        return link.raw;
    }
  }

  /**
   * Check if a URL is a valid Twitch link
   */
  static isValidTwitchUrl(url: string): boolean {
    return url.startsWith("twitch://") || url.includes("twitch.tv");
  }
}
