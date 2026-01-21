// StrikeCoreTwitchPanel.tsx
// CloudHop OS - StrikeCore Twitch Intelligence Dashboard Panel
// Displays live followed streams and recommended streams with tactical aesthetic

import React, { useEffect, useState } from "react";
import { TwitchStream } from "../../core/twitch";

export const StrikeCoreTwitchPanel: React.FC = () => {
  const [followed, setFollowed] = useState<TwitchStream[]>([]);
  const [recommended, setRecommended] = useState<TwitchStream[]>([]);

  useEffect(() => {
    const load = async () => {
      const f = await window.twitch.getFollowedStreams();
      const r = await window.twitch.getRecommendedStreams();
      setFollowed(f);
      setRecommended(r);
    };

    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <h3 style={{ margin: 0, fontSize: "16px" }}>StrikeCore Twitch Intelligence</h3>
        <div style={{ opacity: 0.6, fontSize: "12px", marginTop: "2px" }}>
          Live Presence · Discovery Feed
        </div>
      </div>

      {/* Followed Live */}
      <div>
        <div style={{ fontWeight: 600, marginBottom: "6px" }}>Followed Live</div>
        {followed.length === 0 && (
          <div style={{ opacity: 0.5 }}>No followed streams live</div>
        )}

        {followed.map((s) => (
          <div
            key={s.id}
            style={{
              padding: "8px 10px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.04)",
              marginBottom: "6px",
            }}
          >
            <div style={{ fontWeight: 600 }}>{s.user_name}</div>
            <div style={{ opacity: 0.7, fontSize: "12px" }}>
              {s.title}
              <br />
              {s.category} · {s.viewers} viewers
            </div>
          </div>
        ))}
      </div>

      {/* Recommended */}
      <div>
        <div style={{ fontWeight: 600, marginBottom: "6px" }}>Recommended</div>

        {recommended.map((s) => (
          <div
            key={s.id}
            style={{
              padding: "8px 10px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.04)",
              marginBottom: "6px",
            }}
          >
            <div style={{ fontWeight: 600 }}>{s.user_name}</div>
            <div style={{ opacity: 0.7, fontSize: "12px" }}>
              {s.title}
              <br />
              {s.category} · {s.viewers} viewers
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
