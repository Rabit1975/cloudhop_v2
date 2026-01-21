// StrikeCoreTwitchEventLog.tsx
// CloudHop × StrikeCore - Twitch event activity log
// Tracks and displays Twitch-related events (streams going live, etc.)

import React, { useEffect, useState } from "react";
import { TwitchStream } from "../../../core/twitch";

interface TwitchEvent {
  id: string;
  type: "stream_live" | "stream_offline" | "stream_title_change" | "stream_category_change";
  timestamp: number;
  channel: string;
  data: {
    title?: string;
    category?: string;
    viewers?: number;
    previousTitle?: string;
    previousCategory?: string;
  };
}

export const StrikeCoreTwitchEventLog: React.FC = () => {
  const [events, setEvents] = useState<TwitchEvent[]>([]);
  const [previousStreams, setPreviousStreams] = useState<Map<string, TwitchStream>>(new Map());

  useEffect(() => {
    const checkForEvents = async () => {
      try {
        const currentStreams = await window.twitch.getFollowedStreams();
        const newEvents: TwitchEvent[] = [];

        // Check for new live streams
        currentStreams.forEach((stream) => {
          const previous = previousStreams.get(stream.login);

          if (!previous && stream.is_live) {
            // Stream just went live
            newEvents.push({
              id: `${stream.id}-live-${Date.now()}`,
              type: "stream_live",
              timestamp: Date.now(),
              channel: stream.user_name,
              data: {
                title: stream.title,
                category: stream.category,
                viewers: stream.viewers,
              },
            });
          } else if (previous && stream.is_live) {
            // Check for title change
            if (previous.title !== stream.title) {
              newEvents.push({
                id: `${stream.id}-title-${Date.now()}`,
                type: "stream_title_change",
                timestamp: Date.now(),
                channel: stream.user_name,
                data: {
                  title: stream.title,
                  previousTitle: previous.title,
                },
              });
            }

            // Check for category change
            if (previous.category !== stream.category) {
              newEvents.push({
                id: `${stream.id}-category-${Date.now()}`,
                type: "stream_category_change",
                timestamp: Date.now(),
                channel: stream.user_name,
                data: {
                  category: stream.category,
                  previousCategory: previous.category,
                },
              });
            }
          }
        });

        // Check for streams that went offline
        previousStreams.forEach((previous, login) => {
          const current = currentStreams.find((s) => s.login === login);
          if (previous.is_live && (!current || !current.is_live)) {
            newEvents.push({
              id: `${previous.id}-offline-${Date.now()}`,
              type: "stream_offline",
              timestamp: Date.now(),
              channel: previous.user_name,
              data: {},
            });
          }
        });

        if (newEvents.length > 0) {
          setEvents((prev) => [...newEvents, ...prev].slice(0, 50)); // Keep last 50 events
        }

        // Update previous streams map
        const newMap = new Map<string, TwitchStream>();
        currentStreams.forEach((stream) => {
          newMap.set(stream.login, stream);
        });
        setPreviousStreams(newMap);
      } catch (error) {
        console.error("Failed to check for Twitch events:", error);
      }
    };

    checkForEvents();
    const interval = setInterval(checkForEvents, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [previousStreams]);

  const getEventIcon = (type: TwitchEvent["type"]) => {
    switch (type) {
      case "stream_live":
        return "🔴";
      case "stream_offline":
        return "⚫";
      case "stream_title_change":
        return "📝";
      case "stream_category_change":
        return "🎮";
      default:
        return "•";
    }
  };

  const getEventMessage = (event: TwitchEvent) => {
    switch (event.type) {
      case "stream_live":
        return (
          <>
            <strong>{event.channel}</strong> went live
            {event.data.category && <span> playing {event.data.category}</span>}
          </>
        );
      case "stream_offline":
        return (
          <>
            <strong>{event.channel}</strong> went offline
          </>
        );
      case "stream_title_change":
        return (
          <>
            <strong>{event.channel}</strong> changed title to "{event.data.title}"
          </>
        );
      case "stream_category_change":
        return (
          <>
            <strong>{event.channel}</strong> switched to {event.data.category}
          </>
        );
      default:
        return `${event.channel} - ${event.type}`;
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "just now";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div>
        <h3 style={{ margin: 0, fontSize: "16px" }}>StrikeCore Event Log</h3>
        <div style={{ opacity: 0.6, fontSize: "12px", marginTop: "2px" }}>
          Live Activity Feed
        </div>
      </div>

      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {events.length === 0 && (
          <div style={{ opacity: 0.5, padding: "16px", textAlign: "center" }}>
            No recent events
          </div>
        )}

        {events.map((event) => (
          <div
            key={event.id}
            style={{
              padding: "8px 10px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.03)",
              marginBottom: "4px",
              display: "flex",
              gap: "8px",
              alignItems: "start",
            }}
          >
            <div style={{ fontSize: "16px", lineHeight: 1 }}>
              {getEventIcon(event.type)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "13px", lineHeight: 1.4 }}>
                {getEventMessage(event)}
              </div>
              <div style={{ fontSize: "11px", opacity: 0.5, marginTop: "2px" }}>
                {formatTimestamp(event.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
