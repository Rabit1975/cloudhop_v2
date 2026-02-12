import React, { useMemo } from 'react';
import classNames from 'classnames';
import styles from './twitch-viewer.module.scss';

export type TwitchViewerProps = {
  /**
   * The name of the Twitch channel to embed (e.g. "ninja").
   * Takes precedence over twitchStreamUrl if both are provided.
   */
  channelName?: string;
  
  /**
   * The full URL of the Twitch stream (e.g. "https://www.twitch.tv/ninja").
   * Used to extract the channel name if channelName is not provided.
   */
  twitchStreamUrl?: string;

  /**
   * The parent domain(s) embedding the stream.
   * Required by Twitch Embed API for security.
   * Defaults to 'localhost' for development.
   */
  parentDomain?: string | string[];

  /**
   * Whether to autoplay the stream.
   * @default true
   */
  autoplay?: boolean;

  /**
   * Whether to start the stream muted.
   * @default false
   */
  muted?: boolean;

  /**
   * Custom class name for the container.
   */
  className?: string;

  /**
   * Custom inline styles for the container.
   */
  style?: React.CSSProperties;
};

export function TwitchViewer({
  channelName,
  twitchStreamUrl,
  parentDomain = 'localhost',
  autoplay = true,
  muted = false,
  className,
  style,
}: TwitchViewerProps) {
  const targetChannel = useMemo(() => {
    if (channelName) return channelName;
    if (twitchStreamUrl) {
      try {
        const url = new URL(twitchStreamUrl);
        const pathSegments = url.pathname.split('/').filter(Boolean);
        if (pathSegments.length > 0) return pathSegments[0];
      } catch (error) {
        // Fallback for simple string inputs that might not be full URLs but contain structure
        if (typeof twitchStreamUrl === 'string') {
          const parts = twitchStreamUrl.split('/').filter(Boolean);
          return parts[parts.length - 1];
        }
      }
    }
    return undefined;
  }, [channelName, twitchStreamUrl]);

  const embedSrc = useMemo(() => {
    if (!targetChannel) return null;

    const domains = Array.isArray(parentDomain) ? parentDomain : [parentDomain];
    const params = new URLSearchParams();
    params.append('channel', targetChannel);
    params.append('muted', String(muted));
    params.append('autoplay', String(autoplay));
    
    domains.forEach((domain) => {
      params.append('parent', domain);
    });

    return `https://player.twitch.tv/?${params.toString()}`;
  }, [targetChannel, parentDomain, muted, autoplay]);

  if (!embedSrc) {
    return (
      <div 
        className={classNames(styles.placeholder, className)} 
        style={style}
      >
        <span className={styles.message}>Channel not found</span>
      </div>
    );
  }

  return (
    <div 
      className={classNames(styles.twitchContainer, className)} 
      style={style}
    >
      <iframe
        src={embedSrc}
        className={styles.iframe}
        allowFullScreen
        scrolling="no"
        frameBorder="0"
        title={`Twitch stream: ${targetChannel}`}
      />
    </div>
  );
}