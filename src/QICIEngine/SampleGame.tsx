import React, { useEffect, useRef } from 'react';
import QICIEngine from './QICIEngine';

interface SampleGameProps {
  title?: string;
}

export default function SampleGame({
  title = 'QICI Engine Demo',
}: SampleGameProps) {
  const handleGameReady = () => {
    console.log('QICI Engine game is ready!');

    // Example game logic would go here
    // This is where you'd create sprites, physics, etc.
  };

  return (
    <div className="sample-game-container">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
        <p className="text-gray-300 text-sm">
          QICI Engine HTML5 Game Engine - Powered by Phaser
        </p>
      </div>

      <div className="game-wrapper border border-gray-700 rounded-lg overflow-hidden">
        <QICIEngine
          gameId="sample-game"
          width={800}
          height={600}
          config={{
            canvas: {
              backgroundColor: '#1a1a2e',
            },
            physics: {
              enabled: true,
              gravity: { x: 0, y: 500 },
            },
          }}
          onReady={handleGameReady}
        />
      </div>

      <div className="mt-4 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-2">Game Features</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• HTML5 Canvas Rendering</li>
          <li>• Physics Engine</li>
          <li>• Audio System</li>
          <li>• Sprite Management</li>
          <li>• Particle Effects</li>
          <li>• Input Handling</li>
        </ul>
      </div>
    </div>
  );
}
