// GfnTypes.ts
// CloudHop × GeForce NOW
// Type definitions for the GeForce NOW runtime integration.
// ------------------------------------------------------------
// This module defines all typed contracts for the GFN runtime.

export namespace GfnTypes {
  // ------------------------------------------------------------
  // Runtime
  // ------------------------------------------------------------

  export interface RuntimeVersion {
    major: number
    minor: number
    patch: number
    build?: string
    raw: string
  }

  export interface Capabilities {
    supportsCloudSaves: boolean
    supportsNetworkDiagnostics: boolean
    supportsTelemetry: boolean
    supportsSessionPause: boolean
    supportsSessionResume: boolean
    maxBitrate?: number
    supportedCodecs?: string[]
  }

  // ------------------------------------------------------------
  // Session Lifecycle
  // ------------------------------------------------------------

  export interface LaunchResult {
    success: boolean
    sessionId?: string
    error?: string
  }

  export interface SessionStatus {
    sessionId: string
    appId: string
    state: SessionState
    startTime: number
    duration?: number
  }

  export enum SessionState {
    Idle = "idle",
    Launching = "launching",
    Active = "active",
    Paused = "paused",
    Ending = "ending",
    Ended = "ended",
    Error = "error"
  }

  export interface SessionResult {
    success: boolean
    sessionId?: string
    error?: string
  }

  // ------------------------------------------------------------
  // Network Diagnostics
  // ------------------------------------------------------------

  export interface NetworkDiagnostics {
    timestamp: number
    latency: number
    jitter: number
    packetLoss: number
    bandwidth: {
      download: number
      upload: number
    }
    connection: {
      type: string
      quality: NetworkQuality
    }
  }

  export enum NetworkQuality {
    Excellent = "excellent",
    Good = "good",
    Fair = "fair",
    Poor = "poor",
    Critical = "critical"
  }

  // ------------------------------------------------------------
  // Telemetry
  // ------------------------------------------------------------

  export interface TelemetryFrame {
    timestamp: number
    fps: number
    frameTime: number
    encoderLatency: number
    decoderLatency: number
    networkLatency: number
    totalLatency: number
    bitrate: number
    resolution: {
      width: number
      height: number
    }
    codec: string
  }

  // ------------------------------------------------------------
  // Cloud Saves
  // ------------------------------------------------------------

  export interface CloudSave {
    id: string
    appId: string
    name: string
    size: number
    timestamp: number
    metadata?: Record<string, unknown>
  }

  export interface CloudSaveList {
    saves: CloudSave[]
    totalSize: number
    quota?: number
  }
}
