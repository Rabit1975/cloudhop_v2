import type { Constellation } from './galaxyState';

export function stepConstellation(current: Constellation, mood: string): Constellation {
  const resonanceTarget = getResonanceForMood(mood);
  const turbulenceTarget = getTurbulenceForMood(mood);
  const gravityTarget = getGravityForMood(mood);
  const growthTarget = getGrowthForMood(mood);

  const resonance = lerp(current.resonance, resonanceTarget, 0.05);
  const turbulence = lerp(current.turbulence, turbulenceTarget, 0.05);
  const gravity = lerp(current.gravity, gravityTarget, 0.05);
  const growth = lerp(current.growth, growthTarget, 0.05);

  const nodes = current.nodes.map(node => ({
    ...node,
    brightness: lerp(node.brightness, resonance, 0.08),
    x: node.x + (Math.random() - 0.5) * turbulence,
    y: node.y + (Math.random() - 0.5) * turbulence,
  }));

  const edges = current.edges.map(edge => ({
    ...edge,
    intensity: lerp(edge.intensity, resonance, 0.05),
  }));

  const evolved = maybeGrowConstellation({
    ...current,
    nodes,
    edges,
    resonance,
    turbulence,
    gravity,
    growth,
  });

  return evolved;
}

function maybeGrowConstellation(c: Constellation): Constellation {
  if (c.growth < 0.7 || c.nodes.length > 32) return c;
  const id = `star-${Date.now()}`;
  const center = c.nodes[0] ?? { x: 50, y: 50 };
  const newNode = {
    id,
    x: center.x + (Math.random() - 0.5) * 40,
    y: center.y + (Math.random() - 0.5) * 40,
    brightness: 0.5,
    pulse: 0,
    jitter: 0.2,
  };
  return {
    ...c,
    nodes: [...c.nodes, newNode],
    edges: [...c.edges, { from: c.nodes[0]?.id ?? id, to: id, intensity: 0.5 }],
  };
}

function getResonanceForMood(mood: string): number {
  switch (mood) {
    case 'bloom':
      return 1.3;
    case 'surge':
      return 1.5;
    case 'storm':
      return 0.8;
    case 'frost':
      return 0.6;
    case 'drift':
    default:
      return 1.0;
  }
}

function getTurbulenceForMood(mood: string): number {
  switch (mood) {
    case 'bloom':
      return 0.2;
    case 'surge':
      return 0.6;
    case 'storm':
      return 0.9;
    case 'frost':
      return 0.1;
    case 'drift':
    default:
      return 0.3;
  }
}

function getGravityForMood(mood: string): number {
  switch (mood) {
    case 'bloom':
      return 0.4;
    case 'surge':
      return 0.8;
    case 'storm':
      return 0.6;
    case 'frost':
      return 0.2;
    case 'drift':
    default:
      return 0.5;
  }
}

function getGrowthForMood(mood: string): number {
  switch (mood) {
    case 'bloom':
      return 0.9;
    case 'surge':
      return 0.8;
    case 'storm':
      return 0.3;
    case 'frost':
      return 0.1;
    case 'drift':
    default:
      return 0.5;
  }
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
