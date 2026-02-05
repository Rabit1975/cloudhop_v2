import type { NebulaShape } from '../../engine/galaxyState';
import { useGalaxy } from '../../../context/GalaxyContext';

export default function NebulaLayer({ nebula }: { nebula: NebulaShape }) {
  const { nebulaBloom } = useGalaxy();
  const hue = nebula.colorShift * 180;
  const brightness = nebula.brightness;

  return (
    <div
      className="nebula-stack"
      style={{
        filter: `brightness(${1 + nebulaBloom}) blur(${nebulaBloom * 10}px) hue-rotate(${hue}deg) brightness(${brightness})`,
        transition: 'filter 0.3s ease-out',
      }}
    >
      <div className="nebula-layer nebula-A" data-drift="0.01" />
      <div className="nebula-layer nebula-B" data-drift="0.03" />
      <div className="nebula-layer nebula-C" data-drift="0.06" />
      <div className="nebula-layer nebula-stars" data-drift="0.1" />
    </div>
  );
}
