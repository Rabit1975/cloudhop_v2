// TwitchPresenceBadge.tsx
// CloudHop × Twitch - Live presence badge component
// Shows live status and viewer count for a channel

import React, { useEffect, useState } from "react";
import { TwitchStreamInfo } from "../../../core/twitch";

interface TwitchPresenceBadgeProps {
  channel: string;
  showViewers?: boolean;
  showCategory?: boolean;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

export const TwitchPresenceBadge: React.FC<TwitchPresenceBadgeProps> = ({
  channel,
  showViewers = true,
  showCategory = false,
  size = "medium",
  onClick,
}) => {
  const [streamInfo, setStreamInfo] = useState<TwitchStreamInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const info = await window.twitch.getStreamInfo(channel);
        setStreamInfo(info);
      } catch (error) {
        console.error(`Failed to fetch status for ${channel}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [channel]);

  const sizeStyles = {
    small: { fontSize: "10px", padding: "2px 6px", gap: "4px" },
    medium: { fontSize: "12px", padding: "4px 8px", gap: "6px" },
    large: { fontSize: "14px", padding: "6px 12px", gap: "8px" },
  };

  const style = sizeStyles[size];

  if (loading) {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          ...style,
          background: "rgba(255,255,255,0.1)",
          borderRadius: "12px",
          opacity: 0.5,
        }}
      >
        <span>●</span>
        <span>{channel}</span>
      </div>
    );
  }

  if (!streamInfo?.is_live) {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          ...style,
          background: "rgba(255,255,255,0.05)",
          borderRadius: "12px",
          opacity: 0.6,
          cursor: onClick ? "pointer" : "default",
        }}
        onClick={onClick}
      >
        <span style={{ color: "#666" }}>●</span>
        <span>{channel}</span>
        <span style={{ opacity: 0.5, fontSize: "0.9em" }}>Offline</span>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        ...style,
        background: "rgba(255,0,0,0.15)",
        border: "1px solid rgba(255,0,0,0.3)",
        borderRadius: "12px",
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
      title={streamInfo.title}
    >
      <span style={{ color: "#ff0000" }}>●</span>
      <span style={{ fontWeight: 600 }}>{streamInfo.user_name}</span>
      <span style={{ color: "#ff0000", fontWeight: 600 }}>LIVE</span>
      {showViewers && (
        <span style={{ opacity: 0.8 }}>
          {streamInfo.viewers.toLocaleString()} viewers
        </span>
      )}
      {showCategory && streamInfo.category && (
        <span style={{ opacity: 0.7, fontSize: "0.9em" }}>
          {streamInfo.category}
        </span>
      )}
    </div>
  );
};
