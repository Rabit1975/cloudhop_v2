// TwitchEmbed.tsx
// A clean, reusable Twitch player component for CloudHop

import React from "react";

export interface TwitchEmbedProps {
  channel: string;      // Twitch channel name
  chat?: boolean;       // show chat?
  height?: string;      // height of the embed
  width?: string;       // width of the embed
  theme?: "dark" | "light";
}

export const TwitchEmbed: React.FC<TwitchEmbedProps> = ({
  channel,
  chat = false,
  height = "400px",
  width = "100%",
  theme = "dark",
}) => {
  const playerSrc = `https://player.twitch.tv/?channel=${channel}&parent=localhost&autoplay=true&muted=false&theme=${theme}`;
  const chatSrc = `https://www.twitch.tv/embed/${channel}/chat?parent=localhost&darkpopout=${theme === "dark"}`;

  return (
    <div style={{ display: "flex", gap: "8px", width, height }}>
      <iframe
        src={playerSrc}
        style={{ flex: chat ? 3 : 1, border: "none" }}
        allowFullScreen
        title={`Twitch Player - ${channel}`}
      />
      {chat && (
        <iframe
          src={chatSrc}
          style={{ flex: 1, border: "none" }}
          title={`Twitch Chat - ${channel}`}
        />
      )}
    </div>
  );
};
