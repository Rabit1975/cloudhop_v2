import { useEffect, useRef } from 'react';
import { Game } from '../types/games';
import { useStrikeForce } from '../context/StrikeForceContext';

interface ConstellationNode {
  x: number;
  y: number;
  game?: Game;
  isCenter?: boolean;
}

const archetypeColors = {
  wanderer: 'rgba(120,180,255,0.7)',
  circle: 'rgba(255,160,200,0.7)',
  network: 'rgba(200,140,255,0.7)',
  stormweave: 'rgba(255,120,120,0.7)',
  crown: 'rgba(255,220,140,0.7)',
  action: 'rgba(255,100,100,0.7)',
  adventure: 'rgba(100,255,100,0.7)',
  rpg: 'rgba(200,140,255,0.7)',
  fps: 'rgba(255,120,120,0.7)',
  strategy: 'rgba(255,220,140,0.7)',
  default: 'rgba(255,255,255,0.7)',
};

// Helper function to get related games for a specific game
function getRelatedGames(game: Game, allGames: Game[]): Game[] {
  if (!game.related || game.related.length === 0) return [];

  return game.related
    .map(id => allGames.find(g => g.id === id))
    .filter((g): g is Game => g !== undefined);
}

export function useConstellationLinking(
  centerGame: Game | null,
  relatedGames: Game[],
  canvasId: string = 'related-constellation'
) {
  const animationRef = useRef<number>();
  const timeRef = useRef(0);
  const { hoveredNode, setNebulaBloom, selectedGame } = useStrikeForce();
  const previousNodesRef = useRef<ConstellationNode[]>([]);

  // Handle nebula bloom on hover
  useEffect(() => {
    if (hoveredNode) {
      setNebulaBloom(0.4); // bloom intensity
    } else {
      setNebulaBloom(0);
    }
  }, [hoveredNode, setNebulaBloom]);

  // Use selectedGame as the center game for recentering
  const actualCenterGame = selectedGame || centerGame;
  const actualRelatedGames = selectedGame
    ? getRelatedGames(selectedGame, relatedGames)
    : relatedGames;

  useEffect(() => {
    if (!actualCenterGame || !actualRelatedGames.length) return;

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const center = { x: canvas.width / 2, y: canvas.height / 2 };
    const nodes = generateNodePositions(center.x, center.y, actualRelatedGames.length, 180);

    // Add game data to nodes
    const constellationNodes: ConstellationNode[] = [
      { x: center.x, y: center.y, game: actualCenterGame, isCenter: true },
      ...nodes.map((node, i) => ({ ...node, game: actualRelatedGames[i] })),
    ];

    // Determine color based on game archetype
    const primaryTag = actualCenterGame.tags[0]?.toLowerCase() || 'default';
    const color =
      archetypeColors[primaryTag as keyof typeof archetypeColors] || archetypeColors.default;

    // Store current nodes for animation
    previousNodesRef.current = constellationNodes;

    // Start animation
    const animate = () => {
      timeRef.current += 0.002;

      const driftedNodes = constellationNodes.map((node, i) => {
        if (node.isCenter) return node;

        const driftAmount = 3;
        return {
          ...node,
          x: node.x + Math.sin(timeRef.current + i * 0.5) * driftAmount,
          y: node.y + Math.cos(timeRef.current + i * 0.5) * driftAmount,
        };
      });

      const hoveredIndex = actualRelatedGames.findIndex(g => g.id === hoveredNode);

      drawConstellation(ctx, center, driftedNodes.slice(1), color, hoveredIndex);

      // Draw center star
      drawCenterStar(ctx, center, color);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [actualCenterGame, actualRelatedGames, hoveredNode, canvasId]);
}

function generateNodePositions(
  centerX: number,
  centerY: number,
  count: number,
  radius: number = 180
): ConstellationNode[] {
  const nodes: ConstellationNode[] = [];

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2; // Start from top
    nodes.push({
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    });
  }

  return nodes;
}

function drawConstellation(
  ctx: CanvasRenderingContext2D,
  center: { x: number; y: number },
  nodes: ConstellationNode[],
  color: string,
  hoveredIndex: number = -1
) {
  // Clear canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Draw connecting lines between adjacent nodes (constellation ring)
  ctx.strokeStyle = color.replace('0.7', '0.3'); // Dimmer for ring
  ctx.lineWidth = 1.2;
  ctx.lineCap = 'round';

  nodes.forEach((node, i) => {
    const nextNode = nodes[(i + 1) % nodes.length];
    const isHovered = i === hoveredIndex;

    ctx.beginPath();
    ctx.moveTo(node.x, node.y);
    ctx.lineTo(nextNode.x, nextNode.y);
    ctx.strokeStyle = isHovered ? color.replace('0.7', '0.6') : color.replace('0.7', '0.3');
    ctx.lineWidth = isHovered ? 1.8 : 1.2;
    ctx.stroke();
  });

  // Draw lines from center to each node
  nodes.forEach((node, i) => {
    const isHovered = i === hoveredIndex;

    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(node.x, node.y);
    ctx.strokeStyle = isHovered ? color.replace('0.7', '1.0') : color;
    ctx.lineWidth = isHovered ? 2.2 : 1.2;
    ctx.stroke();
  });

  // Draw orbiting nodes
  nodes.forEach((node, i) => {
    const isHovered = i === hoveredIndex;

    // Glow effect
    const glowRadius = isHovered ? 16 : 12;
    const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius);
    gradient.addColorStop(0, isHovered ? color.replace('0.7', '1.0') : color.replace('0.7', '0.8'));
    gradient.addColorStop(1, color.replace('0.7', '0'));

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
    ctx.fill();

    // Core node
    const coreRadius = isHovered ? 6 : 4;
    ctx.fillStyle = isHovered ? color.replace('0.7', '1.0') : color;
    ctx.beginPath();
    ctx.arc(node.x, node.y, coreRadius, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawCenterStar(
  ctx: CanvasRenderingContext2D,
  center: { x: number; y: number },
  color: string
) {
  // Larger glow for center star
  const gradient = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, 20);
  gradient.addColorStop(0, color.replace('0.7', '1'));
  gradient.addColorStop(0.5, color.replace('0.7', '0.5'));
  gradient.addColorStop(1, color.replace('0.7', '0'));

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(center.x, center.y, 20, 0, Math.PI * 2);
  ctx.fill();

  // Core center star
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(center.x, center.y, 6, 0, Math.PI * 2);
  ctx.fill();

  // Inner bright core
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.beginPath();
  ctx.arc(center.x, center.y, 2, 0, Math.PI * 2);
  ctx.fill();
}
