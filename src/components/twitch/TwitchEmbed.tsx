// TwitchEmbed.tsx
// A clean, reusable Twitch player component for CloudHop

import React from 'react';
import { SecurityValidator } from '../../core/security/validation';

export interface TwitchEmbedProps {
  channel: string;
  theme?: 'dark' | 'light';
  width?: number;
  height?: number;
  autoplay?: boolean;
  muted?: boolean;
  chat?: boolean;
}

export const TwitchEmbed: React.FC<TwitchEmbedProps> = props => {
  // Validate inputs
  const validatedChannel = SecurityValidator.validateChannel(props.channel);
  const validatedTheme = SecurityValidator.validateTheme(props.theme || 'dark');

  // Secure URL construction with proper encoding
  const playerParams = new URLSearchParams({
    channel: validatedChannel,
    parent: window.location.hostname || 'localhost',
    autoplay: props.autoplay ? 'true' : 'false',
    muted: props.muted ? 'true' : 'false',
    theme: validatedTheme,
  });

  const playerSrc = `https://player.twitch.tv/?${playerParams}`;
  const chatSrc = `https://www.twitch.tv/embed/${validatedChannel}/chat?parent=localhost&darkpopout=${validatedTheme === 'dark'}`;

  return (
    <div style={{ display: 'flex', gap: '8px', width: props.width, height: props.height }}>
      <iframe
        src={playerSrc}
        style={{ flex: 1, border: 'none' }}
        allowFullScreen
        title={`Twitch Player - ${validatedChannel}`}
      />
      {props.chat && (
        <iframe
          src={chatSrc}
          style={{ flex: 3, border: 'none' }}
          title={`Twitch Chat - ${validatedChannel}`}
        />
      )}
    </div>
  );
};
