import { useEffect, useState, useRef } from 'react';

export interface StarNode {
  id: string;
  x: number;
  y: number;
  size: number;
  brightness: number;
  resonance: number;
  clusterId: string;
}

export interface Edge {
  from: string;
  to: string;
  strength: number;
  archetype: string;
}

export interface Constellation {
  nodes: StarNode[];
  edges: Edge[];
  clusters: Map<string, { archetype: string; centerX: number; centerY: number; gravity: number }>;
  turbulence: number;
  gravity: number;
  resonance: number;
  season: string;
}

const lerp = (start: number, end: number, t: number): number => {
  return start + (end - start) * t;
};

export function useConstellationEvolution(sectionClass: string) {
  const [constellation, setConstellation] = useState<Constellation>({
    nodes: [],
    edges: [],
    clusters: new Map(),
    turbulence: 0.3,
    gravity: 0.5,
    resonance: 1.0,
    season: 'bloom',
  });

  const svgRef = useRef<SVGSVGElement>(null);

  // Evolution animation loop
  useEffect(() => {
    let animationFrame: number;
    let lastTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const deltaTime = (now - lastTime) / 1000; // Convert to seconds

      // Update resonance based on emotional state
      constellation.nodes.forEach(node => {
        const targetResonance = 1.0 + Math.sin(now / 1000 + node.id.charCodeAt(0) * 0.1) * 0.3;
        node.resonance = lerp(node.resonance, targetResonance, deltaTime * 0.5);
      });

      // Apply turbulence jitter during storms
      const stormIntensity = constellation.season === 'storm' ? 1.0 : 0.2;
      constellation.nodes.forEach(node => {
        const jitterX = (Math.random() - 0.5) * stormIntensity * 4;
        const jitterY = (Math.random() - 0.5) * stormIntensity * 4;
        node.x += jitterX;
        node.y += jitterY;
      });

      // Apply gravity shifts to clusters
      constellation.clusters.forEach(cluster => {
        const targetGravity =
          constellation.season === 'surge' ? 0.8 : constellation.season === 'frost' ? 0.2 : 0.5;
        cluster.gravity = lerp(cluster.gravity, targetGravity, deltaTime * 0.3);

        // Update cluster center based on gravity
        const nodesInCluster = constellation.nodes.filter(node => node.clusterId === cluster.id);
        if (nodesInCluster.length > 0) {
          const centerX =
            nodesInCluster.reduce((sum, node) => sum + node.x, 0) / nodesInCluster.length;
          const centerY =
            nodesInCluster.reduce((sum, node) => sum + node.y, 0) / nodesInCluster.length;
          cluster.centerX = lerp(cluster.centerX, centerX, deltaTime * 0.2);
          cluster.centerY = lerp(cluster.centerY, centerY, deltaTime * 0.2);
        }
      });

      // Growth during bloom or surge
      if (constellation.season === 'bloom' || constellation.season === 'surge') {
        if (Math.random() < 0.02) {
          // 2% chance per frame
          const clusterId = Array.from(constellation.clusters.keys())[
            Math.floor(Math.random() * constellation.clusters.size)
          ];
          const cluster = clusterId ? constellation.clusters.get(clusterId) : null;

          if (cluster) {
            const newNode: StarNode = {
              id: `star-${Date.now()}-${Math.random()}`,
              x: cluster.centerX + (Math.random() - 0.5) * 100,
              y: cluster.centerY + (Math.random() - 0.5) * 100,
              size: 2 + Math.random() * 3,
              brightness: 0.5 + Math.random() * 0.5,
              resonance: 0.8 + Math.random() * 0.4,
              clusterId: cluster.id,
            };
            constellation.nodes.push(newNode);
          }
        }
      }

      // Archetype shifting based on emotional cycles
      if (Math.random() < 0.01) {
        // 1% chance per frame
        constellation.edges.forEach(edge => {
          const archetypes = ['connection', 'energy', 'harmony', 'tension', 'flow'];
          edge.archetype = archetypes[Math.floor(Math.random() * archetypes.length)];
        });
      }

      lastTime = now;
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [constellation]);

  // Update SVG visualization
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    svg.innerHTML = ''; // Clear previous content

    // Create edges (lines between stars)
    constellation.edges.forEach(edge => {
      const fromNode = constellation.nodes.find(n => n.id === edge.from);
      const toNode = constellation.nodes.find(n => n.id === edge.to);

      if (fromNode && toNode) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', fromNode.x.toString());
        line.setAttribute('y1', fromNode.y.toString());
        line.setAttribute('x2', toNode.x.toString());
        line.setAttribute('y2', toNode.y.y.toString());
        line.setAttribute('stroke', `rgba(255, 255, 255, ${edge.strength * 0.3})`);
        line.setAttribute('stroke-width', '1');
        line.setAttribute('stroke-linecap', 'round');

        // Add archetype-based styling
        if (edge.archetype === 'energy') {
          line.setAttribute('stroke', 'rgba(255, 100, 100, 0.6)');
        } else if (edge.archetype === 'harmony') {
          line.setAttribute('stroke', 'rgba(100, 255, 100, 0.6)');
        } else if (edge.archetype === 'tension') {
          line.setAttribute('stroke', 'rgba(255, 100, 255, 0.6)');
        }

        svg.appendChild(line);
      }
    });

    // Create nodes (stars)
    constellation.nodes.forEach(node => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', node.x.toString());
      circle.setAttribute('cy', node.y.toString());
      circle.setAttribute('r', node.size.toString());

      // Apply resonance glow
      const glowIntensity = node.resonance * 0.8;
      circle.setAttribute('fill', `rgba(255, 255, 255, ${glowIntensity})`);
      circle.setAttribute('filter', `blur(${node.size}px)`);

      svg.appendChild(circle);
    });
  }, [constellation]);

  // Seasonal evolution
  const setSeason = (season: string) => {
    setConstellation(prev => ({ ...prev, season }));
  };

  // Manual updates
  const addNode = (node: Omit<StarNode, 'id'>) => {
    const newNode: StarNode = {
      ...node,
      id: `star-${Date.now()}-${Math.random()}`,
    };
    setConstellation(prev => ({ ...prev, nodes: [...prev.nodes, newNode] }));
  };

  const addEdge = (
    from: string,
    to: string,
    strength: number = 0.5,
    archetype: string = 'connection'
  ) => {
    const newEdge: Edge = { from, to, strength, archetype };
    setConstellation(prev => ({ ...prev, edges: [...prev.edges, newEdge] }));
  };

  return {
    constellation,
    setSeason,
    addNode,
    addEdge,
    svgRef,
    currentShape: constellation,
  };
}
