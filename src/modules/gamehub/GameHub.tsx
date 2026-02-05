// GameHub.tsx
// CloudHop × GameHub - StrikeCore Ops Console for Gaming
// Combines GFN runtime, Twitch streams, and activity monitoring

import React, { useEffect, useState } from "react";
import { TwitchEmbed } from "../../components/twitch/TwitchEmbed";
import { TwitchPresenceBadge } from "../../components/twitch/badge/TwitchPresenceBadge";
import { StrikeCoreTwitchEventLog } from "../strikecore/eventlog/StrikeCoreTwitchEventLog";
import { TwitchOverlay } from "../../components/twitch/overlay/TwitchOverlay";

interface GameHubProps {
  runtime: any;           // CloudHopRuntime / StrikeCoreRuntime instance
  defaultChannel?: string;
}

interface GameSession {
  gameName: string;
  appId: string;
  startTime: number;
  status: "launching" | "active" | "paused" | "ended";
}

export const GameHub: React.FC<GameHubProps> = ({
  runtime,
  defaultChannel = "shroud",
}) => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [twitchChannel, setTwitchChannel] = useState(defaultChannel);
  const [session, setSession] = useState<GameSession | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [gfnStatus, setGfnStatus] = useState<string>("idle");

  useEffect(() => {
    if (!runtime) return;

    const onSessionStart = (s: any) => {
      setCurrentGame(s.gameName ?? "Unknown");
      setSession({
        gameName: s.gameName ?? "Unknown",
        appId: s.appId ?? "",
        startTime: Date.now(),
        status: "active",
      });
      setGfnStatus("active");
    };

    const onSessionEnd = () => {
      setCurrentGame(null);
      setSession(null);
      setGfnStatus("idle");
    };

    const onSessionPause = () => {
      if (session) {
        setSession({ ...session, status: "paused" });
      }
      setGfnStatus("paused");
    };

    const onSessionResume = () => {
      if (session) {
        setSession({ ...session, status: "active" });
      }
      setGfnStatus("active");
    };

    runtime.on("session:start", onSessionStart);
    runtime.on("session:end", onSessionEnd);
    runtime.on("session:pause", onSessionPause);
    runtime.on("session:resume", onSessionResume);

    return () => {
      runtime.off("session:start", onSessionStart);
      runtime.off("session:end", onSessionEnd);
      runtime.off("session:pause", onSessionPause);
      runtime.off("session:resume", onSessionResume);
    };
  }, [runtime, session]);

  useEffect(() => {
    // Handle close overlay events
    const handleCloseOverlay = () => {
      setShowOverlay(false);
    };

    window.addEventListener("closeOverlay", handleCloseOverlay as any);
    return () => window.removeEventListener("closeOverlay", handleCloseOverlay as any);
  }, []);

  const getStatusColor = () => {
    switch (gfnStatus) {
      case "active":
        return "#00ff00";
      case "paused":
        return "#ffaa00";
      case "launching":
        return "#00aaff";
      default:
        return "#666666";
    }
  };

  const getSessionDuration = () => {
    if (!session) return "00:00";
    const duration = Math.floor((Date.now() - session.startTime) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#0a0a0a",
        color: "#ffffff",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Top Bar - StrikeCore Status + Presence */}
      <div
        style={{
          padding: "12px 20px",
          background: "rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ fontSize: "18px", fontWeight: 700 }}>
            ⚡ GameHub <span style={{ opacity: 0.5, fontSize: "14px" }}>StrikeCore</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 12px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: getStatusColor(),
              }}
            />
            <span style={{ fontSize: "12px", textTransform: "uppercase" }}>
              {gfnStatus}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <TwitchPresenceBadge channel={twitchChannel} size="small" />
          <button
            onClick={() => setShowOverlay(!showOverlay)}
            style={{
              padding: "6px 12px",
              background: showOverlay ? "rgba(147,51,234,0.2)" : "rgba(255,255,255,0.05)",
              border: showOverlay ? "1px solid #9333ea" : "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              color: "white",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            {showOverlay ? "Hide" : "Show"} Overlay
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left Panel - Current Game / GFN Session */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            borderRight: "1px solid rgba(255,255,255,0.1)",
            overflowY: "auto",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 600 }}>
              Current Session
            </h2>
            <div style={{ opacity: 0.6, fontSize: "12px", marginTop: "4px" }}>
              GeForce NOW Runtime
            </div>
          </div>

          {session ? (
            <div>
              <div
                style={{
                  padding: "20px",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "12px",
                  marginBottom: "16px",
                }}
              >
                <div style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>
                  {session.gameName}
                </div>
                <div style={{ opacity: 0.7, fontSize: "14px", marginBottom: "12px" }}>
                  App ID: {session.appId}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    paddingTop: "12px",
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div>
                    <div style={{ opacity: 0.5, fontSize: "11px" }}>STATUS</div>
                    <div style={{ fontSize: "14px", fontWeight: 600, marginTop: "2px" }}>
                      {session.status.toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <div style={{ opacity: 0.5, fontSize: "11px" }}>DURATION</div>
                    <div style={{ fontSize: "14px", fontWeight: 600, marginTop: "2px" }}>
                      {getSessionDuration()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Session Controls */}
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => runtime?.pauseSession?.()}
                  disabled={session.status !== "active"}
                  style={{
                    flex: 1,
                    padding: "10px",
                    background:
                      session.status === "active"
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: session.status === "active" ? "white" : "#666",
                    cursor: session.status === "active" ? "pointer" : "not-allowed",
                  }}
                >
                  ⏸ Pause
                </button>
                <button
                  onClick={() => runtime?.resumeSession?.()}
                  disabled={session.status !== "paused"}
                  style={{
                    flex: 1,
                    padding: "10px",
                    background:
                      session.status === "paused"
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: session.status === "paused" ? "white" : "#666",
                    cursor: session.status === "paused" ? "pointer" : "not-allowed",
                  }}
                >
                  ▶ Resume
                </button>
                <button
                  onClick={() => runtime?.endSession?.()}
                  style={{
                    flex: 1,
                    padding: "10px",
                    background: "rgba(255,0,0,0.1)",
                    border: "1px solid rgba(255,0,0,0.3)",
                    borderRadius: "8px",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  ⏹ End
                </button>
              </div>
            </div>
          ) : (
            <div
              style={{
                padding: "40px",
                textAlign: "center",
                opacity: 0.5,
                background: "rgba(255,255,255,0.02)",
                borderRadius: "12px",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎮</div>
              <div style={{ fontSize: "16px" }}>No active game session</div>
              <div style={{ fontSize: "12px", marginTop: "4px" }}>
                Launch a game from GeForce NOW to begin
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Twitch Stream */}
        <div
          style={{
            width: "500px",
            padding: "20px",
            overflowY: "auto",
            background: "rgba(255,255,255,0.01)",
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 600 }}>
              Live Stream
            </h2>
            <div style={{ opacity: 0.6, fontSize: "12px", marginTop: "4px" }}>
              Twitch Integration
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <input
              type="text"
              value={twitchChannel}
              onChange={(e) => setTwitchChannel(e.target.value)}
              placeholder="Enter channel name..."
              style={{
                width: "100%",
                padding: "10px 12px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "white",
                fontSize: "14px",
              }}
            />
          </div>

          <TwitchEmbed channel={twitchChannel} width="100%" height="280px" />
        </div>
      </div>

      {/* Bottom Bar - Events / Logs */}
      <div
        style={{
          height: "300px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.02)",
          overflowY: "auto",
          padding: "20px",
        }}
      >
        <StrikeCoreTwitchEventLog />
      </div>

      {/* Floating Overlay */}
      {showOverlay && <TwitchOverlay channel={twitchChannel} />}
    </div>
  );
};
