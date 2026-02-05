import type { Constellation } from '../../engine/galaxyState';

export default function ConstellationLayer({ constellation }: { constellation: Constellation }) {
  return (
    <svg className="constellation-layer" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      {constellation.edges.map(edge => {
        const from = constellation.nodes.find(n => n.id === edge.from);
        const to = constellation.nodes.find(n => n.id === edge.to);
        if (!from || !to) return null;
        return (
          <line
            key={`${edge.from}-${edge.to}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="rgba(255,255,255,0.5)"
            strokeWidth={0.3 + edge.intensity * 0.4}
          />
        );
      })}
      {constellation.nodes.map(node => (
        <circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r={0.8 + node.brightness * 0.8}
          fill="white"
          opacity={0.5 + node.brightness * 0.5}
        />
      ))}
    </svg>
  );
}
