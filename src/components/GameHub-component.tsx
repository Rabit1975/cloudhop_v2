import React, { useState, useEffect } from 'react';

interface GameHubProps {
  onGameSelect?: (game: string) => void;
}

const GameHub: React.FC<GameHubProps> = ({ onGameSelect }) => {
  const [selectedGameType, setSelectedGameType] = useState<'html' | 'unity'>('html');
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [unityProgress, setUnityProgress] = useState(0);

  // Sample game lists - these would come from your folders
  const htmlGames = [
    { id: 'tetris', name: 'Tetris', description: 'Classic puzzle game' },
    { id: 'snake', name: 'Snake', description: 'Retro snake game' },
    { id: 'breakout', name: 'Breakout', description: 'Brick breaking game' },
  ];

  const unityGames = [
    { id: 'space-shooter', name: 'Space Shooter', description: '3D space combat' },
    { id: 'racing-game', name: 'Racing Game', description: '3D racing simulator' },
    { id: 'puzzle-3d', name: '3D Puzzle', description: '3D puzzle adventure' },
  ];

  const handleGameSelect = (gameId: string, type: 'html' | 'unity') => {
    setSelectedGame(gameId);
    setSelectedGameType(type);
    setIsLoading(true);
    setUnityProgress(0);

    // Simulate loading
    if (type === 'unity') {
      // Simulate Unity WebGL loading progress
      const progressInterval = setInterval(() => {
        setUnityProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setIsLoading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    } else {
      // HTML games load instantly
      setTimeout(() => setIsLoading(false), 500);
    }

    if (onGameSelect) {
      onGameSelect(gameId);
    }
  };

  const renderGameContent = () => {
    if (isLoading) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '400px',
          color: '#53C8FF',
        }}>
          <div style={{ fontSize: '24px', marginBottom: '16px' }}>
            {selectedGameType === 'unity' ? 'Loading Unity Game...' : 'Loading Game...'}
          </div>
          {selectedGameType === 'unity' && (
            <div style={{
              width: '200px',
              height: '8px',
              background: 'rgba(83, 200, 255, 0.2)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${unityProgress}%`,
                height: '100%',
                background: '#53C8FF',
                transition: 'width 0.3s ease',
              }} />
            </div>
          )}
          <div style={{ marginTop: '8px', fontSize: '14px' }}>
            {selectedGameType === 'unity' ? `${unityProgress}%` : 'Almost ready...'}
          </div>
        </div>
      );
    }

    if (!selectedGame) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '400px',
          color: 'rgba(255, 255, 255, 0.5)',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '16px' }}>🎮</div>
            <div>Select a game to start playing</div>
          </div>
        </div>
      );
    }

    // Render game based on type
    if (selectedGameType === 'unity') {
      return (
        <div style={{
          height: '400px',
          background: '#000',
          borderRadius: '8px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ color: '#53C8FF', textAlign: 'center' }}>
            <div style={{ fontSize: '18px', marginBottom: '16px' }}>🎮 Unity Game Loaded</div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>
              Game: {unityGames.find(g => g.id === selectedGame)?.name}
            </div>
            <div style={{ marginTop: '16px' }}>
              <button style={{
                background: 'rgba(83, 200, 255, 0.2)',
                border: '1px solid #53C8FF',
                color: '#53C8FF',
                padding: '8px 16px',
                borderRadius: '6px',
                margin: '0 8px',
                cursor: 'pointer',
              }}>
                Pause
              </button>
              <button style={{
                background: 'rgba(83, 200, 255, 0.2)',
                border: '1px solid #53C8FF',
                color: '#53C8FF',
                padding: '8px 16px',
                borderRadius: '6px',
                margin: '0 8px',
                cursor: 'pointer',
              }}>
                Restart
              </button>
              <button style={{
                background: 'rgba(83, 200, 255, 0.2)',
                border: '1px solid #53C8FF',
                color: '#53C8FF',
                padding: '8px 16px',
                borderRadius: '6px',
                margin: '0 8px',
                cursor: 'pointer',
              }}>
                Fullscreen
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div style={{
          height: '400px',
          background: 'rgba(83, 200, 255, 0.1)',
          border: '1px solid rgba(83, 200, 255, 0.3)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ color: '#53C8FF', textAlign: 'center' }}>
            <div style={{ fontSize: '18px', marginBottom: '16px' }}>🎮 HTML Game Loaded</div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>
              Game: {htmlGames.find(g => g.id === selectedGame)?.name}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div style={{ padding: '20px', height: '100%' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#53C8FF', marginBottom: '16px' }}>GameHub</h2>
        
        {/* Game Type Selector */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <button
            onClick={() => setSelectedGameType('html')}
            style={{
              background: selectedGameType === 'html' 
                ? 'rgba(83, 200, 255, 0.2)' 
                : 'rgba(255, 255, 255, 0.1)',
              border: selectedGameType === 'html' 
                ? '1px solid #53C8FF' 
                : '1px solid rgba(255, 255, 255, 0.2)',
              color: selectedGameType === 'html' ? '#53C8FF' : 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            HTML Games
          </button>
          <button
            onClick={() => setSelectedGameType('unity')}
            style={{
              background: selectedGameType === 'unity' 
                ? 'rgba(83, 200, 255, 0.2)' 
                : 'rgba(255, 255, 255, 0.1)',
              border: selectedGameType === 'unity' 
                ? '1px solid #53C8FF' 
                : '1px solid rgba(255, 255, 255, 0.2)',
              color: selectedGameType === 'unity' ? '#53C8FF' : 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Unity Games
          </button>
        </div>

        {/* Game List */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '12px',
          marginBottom: '20px',
        }}>
          {(selectedGameType === 'html' ? htmlGames : unityGames).map(game => (
            <button
              key={game.id}
              onClick={() => handleGameSelect(game.id, selectedGameType)}
              style={{
                background: selectedGame === game.id 
                  ? 'rgba(83, 200, 255, 0.2)' 
                  : 'rgba(255, 255, 255, 0.05)',
                border: selectedGame === game.id 
                  ? '1px solid #53C8FF' 
                  : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ color: '#53C8FF', fontSize: '16px', marginBottom: '4px' }}>
                {game.name}
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                {game.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Game Display Area */}
      {renderGameContent()}
    </div>
  );
};

export default GameHub;
