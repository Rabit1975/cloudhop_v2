import type { NebulaShape } from './galaxyState';

export function stepNebula(current: NebulaShape, mood: string): NebulaShape {
  const target = getTargetShapeForMood(mood);
  return {
    noiseSeed: lerp(current.noiseSeed, target.noiseSeed, 0.01),
    turbulence: lerp(current.turbulence, target.turbulence, 0.02),
    swirl: lerp(current.swirl, target.swirl, 0.015),
    clusterBias: lerp(current.clusterBias, target.clusterBias, 0.02),
    brightness: lerp(current.brightness, target.brightness, 0.03),
    colorShift: lerp(current.colorShift, target.colorShift, 0.02),
  };
}

function getTargetShapeForMood(mood: string): NebulaShape {
  switch (mood) {
    case 'bloom':
      return {
        noiseSeed: 0.3,
        turbulence: 0.2,
        swirl: 0.1,
        clusterBias: 0.4,
        brightness: 1.2,
        colorShift: 0.2,
      };
    case 'surge':
      return {
        noiseSeed: 0.7,
        turbulence: 0.6,
        swirl: 0.3,
        clusterBias: 0.7,
        brightness: 1.4,
        colorShift: 0.5,
      };
    case 'storm':
      return {
        noiseSeed: 0.9,
        turbulence: 0.9,
        swirl: 0.5,
        clusterBias: 0.8,
        brightness: 1.1,
        colorShift: 0.7,
      };
    case 'frost':
      return {
        noiseSeed: 0.2,
        turbulence: 0.3,
        swirl: 0.05,
        clusterBias: 0.3,
        brightness: 0.8,
        colorShift: -0.3,
      };
    case 'drift':
    default:
      return {
        noiseSeed: 0.4,
        turbulence: 0.25,
        swirl: 0.08,
        clusterBias: 0.5,
        brightness: 1.0,
        colorShift: 0.0,
      };
  }
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
