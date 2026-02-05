export type NebulaShape = {
  noiseSeed: number;
  turbulence: number;
  swirl: number;
  clusterBias: number;
  brightness: number;
  colorShift: number;
};

export type StarNode = {
  id: string;
  x: number;
  y: number;
  brightness: number;
  pulse: number;
  jitter: number;
};

export type StarEdge = {
  from: string;
  to: string;
  intensity: number;
};

export type Constellation = {
  id: string;
  nodes: StarNode[];
  edges: StarEdge[];
  resonance: number;
  turbulence: number;
  gravity: number;
  growth: number;
};

export type GalaxyState = {
  nebula: NebulaShape;
  constellation: Constellation;
  mood: 'bloom' | 'drift' | 'surge' | 'storm' | 'frost';
};

export const initialGalaxyState: GalaxyState = {
  nebula: {
    noiseSeed: 0.5,
    turbulence: 0.3,
    swirl: 0.0,
    clusterBias: 0.5,
    brightness: 1.0,
    colorShift: 0.0,
  },
  constellation: {
    id: 'main-constellation',
    nodes: [
      { id: 'star-1', x: 20, y: 30, brightness: 0.8, pulse: 0, jitter: 0.2 },
      { id: 'star-2', x: 40, y: 20, brightness: 0.6, pulse: 0, jitter: 0.2 },
      { id: 'star-3', x: 30, y: 50, brightness: 0.9, pulse: 0, jitter: 0.2 },
      { id: 'star-4', x: 60, y: 40, brightness: 0.7, pulse: 0, jitter: 0.2 },
      { id: 'star-5', x: 50, y: 70, brightness: 0.8, pulse: 0, jitter: 0.2 },
    ],
    edges: [
      { from: 'star-1', to: 'star-2', intensity: 0.7 },
      { from: 'star-2', to: 'star-3', intensity: 0.5 },
      { from: 'star-3', to: 'star-4', intensity: 0.6 },
      { from: 'star-4', to: 'star-5', intensity: 0.8 },
    ],
    resonance: 1.0,
    turbulence: 0.3,
    gravity: 0.5,
    growth: 0.5,
  },
  mood: 'drift',
};
