import NebulaLayer from './NebulaLayer';
import ConstellationLayer from './ConstellationLayer';
import { useGalaxy } from '../../context/GalaxyContext';

export default function GalaxySky() {
  const { state } = useGalaxy();

  return (
    <div className="galaxy-sky">
      <NebulaLayer nebula={state.nebula} />
      <ConstellationLayer constellation={state.constellation} />
    </div>
  );
}
