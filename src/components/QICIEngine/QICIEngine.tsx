import React, { useEffect, useRef } from 'react';
import { initializeQICI, loadQICIEngine, QICI_CONFIG } from '../../lib/qiciengine';

interface QICIEngineProps {
  gameId: string;
  width?: number;
  height?: number;
  config?: Partial<typeof QICI_CONFIG>;
  onReady?: () => void;
}

export default function QICIEngine({ 
  gameId, 
  width = 800, 
  height = 600, 
  config,
  onReady 
}: QICIEngineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initEngine = async () => {
      try {
        // Load QICI Engine scripts
        await loadQICIEngine();
        
        // Initialize game configuration
        const gameConfig = initializeQICI(gameId, {
          canvas: {
            width,
            height,
            ...config?.canvas
          },
          ...config
        });

        // Create canvas element
        if (canvasRef.current && containerRef.current) {
          const canvas = canvasRef.current;
          canvas.width = width;
          canvas.height = height;
          
          // Initialize QICI Engine on canvas
          if (window.qc) {
            // QICI Engine is loaded
            const game = new window.qc.Game(gameConfig);
            onReady?.();
          }
        }
      } catch (error) {
        console.error('Failed to initialize QICI Engine:', error);
      }
    };

    initEngine();
  }, [gameId, width, height, config, onReady]);

  return (
    <div 
      ref={containerRef}
      className="qici-engine-container"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0a0a0a'
      }}
    >
      <canvas
        ref={canvasRef}
        id={gameId}
        style={{
          border: '1px solid #333',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
        }}
      />
    </div>
  );
}

// Extend Window interface for QICI Engine
declare global {
  interface Window {
    qc?: any;
  }
}
