# CloudHop Unity WebGL Integration

This directory contains the Unity WebGL build for audio-reactive 3D visualization in CloudHop's GameHub.

## Build Instructions

1. Open the Unity project in Unity Hub
2. Set build target to WebGL
3. Configure player settings:
   - Compression Format: Brotli
   - Data Caching: Enabled
   - Memory Size: 256 MB
4. Build to `unity-spectrum/build/`

## Integration

The built files are served via nginx and integrated into the React GameHub component.

## Audio Analysis

Uses Web Audio API for real-time frequency analysis:
- 7 frequency bands (sub-bass to ultra-high)
- Emotional state mapping (energy, valence, arousal, tension)
- Real-time data transmission to Unity

## Visual Effects

- Particle systems controlled by audio frequencies
- Dynamic lighting and materials
- Mood-based environment transitions
- Shader-based audio reactivity