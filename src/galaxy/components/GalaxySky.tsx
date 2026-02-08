import NebulaLayer from './NebulaLayer';
import { useGalaxy } from '../../context/GalaxyContext';

export default function GalaxySky() {
  const { state } = useGalaxy();

  return (
    <div className="galaxy-sky">
      <NebulaLayer nebula={state.nebula} />
    </div>
  );
}
