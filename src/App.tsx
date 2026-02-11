import Chat from './components/HopHub/Chat';
import { MusicEngineProvider } from './core/music/MusicEngineProvider';
import { GalaxyProvider } from './context/GalaxyContext';
import { SettingsProvider } from './contexts/SettingsContext';

function App() {
  return (
    <SettingsProvider>
      <GalaxyProvider>
        <MusicEngineProvider>
          <Chat />
        </MusicEngineProvider>
      </GalaxyProvider>
    </SettingsProvider>
  );
}

export default App;
