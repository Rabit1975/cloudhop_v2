// TwitchOverlay.tsx
// CloudHop × Twitch - Floating, draggable stream overlay for GameHub
// Renderer-side React component that sits on top of the IPC bridge

import React, { useState } from "react";
import { TwitchEmbed } from "../TwitchEmbed";

interface TwitchOverlayProps {
  channel: string;
  initialX?: number;
  initialY?: number;
}

export const TwitchOverlay: React.FC<TwitchOverlayProps> = ({
  channel,
  initialX = 40,
  initialY = 40,
}) => {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [collapsed, setCollapsed] = useState(false);

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const onMouseUp = () => setDragging(false);

  return (
    <div
      style={{
        position: "fixed",
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        zIndex: 9999,
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        background: "rgba(0,0,0,0.95)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {/* Header Bar */}
      <div
        onMouseDown={onMouseDown}
        style={{
          padding: "8px 12px",
          background: "rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          cursor: "move",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          userSelect: "none",
        }}
      >
        <div style={{ fontSize: "12px", fontWeight: 600, opacity: 0.9 }}>
          🔴 {channel}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "14px",
              padding: "0 4px",
            }}
          >
            {collapsed ? "▢" : "−"}
          </button>
          <button
            onClick={() => {
              // Close overlay - parent component should handle this
              const event = new CustomEvent("closeOverlay", { detail: { channel } });
              window.dispatchEvent(event);
            }}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "14px",
              padding: "0 4px",
            }}
          >
            ×
          </button>
        </div>
      </div>

      {/* Stream Content */}
      {!collapsed && (
        <div style={{ width: "400px", height: "225px" }}>
          <TwitchEmbed channel={channel} width="400px" height="225px" />
        </div>
      )}
    </div>
  );
};
