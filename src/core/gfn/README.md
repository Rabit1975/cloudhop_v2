# CloudHop × GeForce NOW Integration

This directory contains the abstract runtime contract for CloudHop's GeForce NOW integration.

## Architecture

The GFN integration follows a clean architectural pattern:

```
┌─────────────────────────────────────┐
│   CloudHop Subsystems               │
│   (Music, Gaming, UI, etc.)         │
└─────────────┬───────────────────────┘
              │
              │ depends on
              ▼
┌─────────────────────────────────────┐
│   GfnClient (Abstract Interface)    │ ◄── This Layer
│   - Defines the contract            │
│   - No implementation details        │
└─────────────┬───────────────────────┘
              │
              │ implemented by
              ▼
┌─────────────────────────────────────┐
│   Electron Native Bridge             │
│   (Platform-specific implementation) │
└─────────────────────────────────────┘
```

## Files

### `GfnClient.ts`
The **authoritative abstract interface** that all CloudHop subsystems depend on. This defines the contract that the Electron native bridge MUST implement.

**No mocks. No placeholders. No assumptions.**

### `GfnTypes.ts`
Complete type definitions for all GFN runtime contracts. Organized by functional area:
- **Runtime**: Version and capability detection
- **Session Lifecycle**: App launching, session management
- **Network Diagnostics**: Real-time network quality monitoring
- **Telemetry**: Frame-by-frame performance metrics
- **Cloud Saves**: Cloud save management

## Usage

```typescript
import { GfnClient, GfnTypes } from "cloudhop-os-v2"

// Implement the abstract class in your Electron native bridge
class ElectronGfnBridge extends GfnClient {
  async getRuntimeVersion(): Promise<GfnTypes.RuntimeVersion> {
    // Native implementation
  }
  
  async launchApp(appId: string): Promise<GfnTypes.LaunchResult> {
    // Native implementation
  }
  
  // ... implement all abstract methods
}
```

## Design Principles

1. **OS-Grade Surface**: This is not a library or SDK. It's the core OS contract.
2. **Type Safety**: All methods are fully typed with the `GfnTypes` namespace.
3. **No Implementation Details**: The abstract class contains zero implementation.
4. **Single Source of Truth**: This is the authoritative interface for all CloudHop.

## Integration Points

CloudHop subsystems that depend on GFN functionality should:
1. Import and use the `GfnClient` abstract type
2. Receive a concrete implementation via dependency injection
3. Never import or depend on the Electron bridge directly

This ensures clean separation between CloudHop's OS layer and platform-specific implementations.
