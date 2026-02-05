// GfnClient.ts
// CloudHop × GeForce NOW
// Abstract runtime contract for the Electron native bridge.
// ------------------------------------------------------------
// This is the authoritative interface that all CloudHop subsystems
// depend on. The Electron native layer MUST implement this surface.

import { GfnTypes } from "./GfnTypes"

export abstract class GfnClient {
  // ------------------------------------------------------------
  // Runtime
  // ------------------------------------------------------------

  abstract getRuntimeVersion(): Promise<GfnTypes.RuntimeVersion>

  abstract getRuntimeCapabilities(): Promise<GfnTypes.Capabilities>

  // ------------------------------------------------------------
  // Session Lifecycle
  // ------------------------------------------------------------

  abstract launchApp(appId: string): Promise<GfnTypes.LaunchResult>

  abstract startSession(appId: string): Promise<GfnTypes.SessionStatus>

  abstract pauseSession(): Promise<GfnTypes.SessionResult>

  abstract resumeSession(): Promise<GfnTypes.SessionResult>

  abstract endSession(): Promise<GfnTypes.SessionResult>

  // ------------------------------------------------------------
  // Network Diagnostics
  // ------------------------------------------------------------

  abstract getNetworkDiagnostics(): Promise<GfnTypes.NetworkDiagnostics>

  // ------------------------------------------------------------
  // Telemetry
  // ------------------------------------------------------------

  abstract getTelemetryFrame(): Promise<GfnTypes.TelemetryFrame>

  // ------------------------------------------------------------
  // Cloud Saves
  // ------------------------------------------------------------

  abstract listCloudSaves(appId: string): Promise<GfnTypes.CloudSaveList>
}
