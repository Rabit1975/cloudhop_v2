import React, { useRef, useEffect, useState } from 'react';
import { HopSpace } from '../../utils/types';

export const FluidArtSpace = ({ space }: { space: HopSpace }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#FF6B6B');
  const [brushSize, setBrushSize] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Initial canvas setup
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-br from-pink-900/20 to-orange-900/20">
      {/* Fluid Art Space Header */}
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold text-white mb-2">{space.name}</h2>
        <p className="text-white/60">Generative painting and visual expression</p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Canvas Area */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-medium">Canvas</h3>
              <button
                onClick={clearCanvas}
                className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded text-sm transition-colors"
              >
                Clear Canvas
              </button>
            </div>
            <div
              className="relative bg-gray-900 rounded-lg overflow-hidden"
              style={{ height: '400px' }}
            >
              <canvas
                ref={canvasRef}
                className="w-full h-full cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
            </div>

            {/* YouTube Video for Acrylic Pouring Techniques */}
            <div className="mt-4">
              <h4 className="text-white font-medium mb-2">Learn: Acrylic Pouring Techniques</h4>
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/9eEZmcjY1Uo"
                  className="w-full h-full"
                  title="Acrylic Pouring Techniques Tutorial"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Tools Panel */}
          <div className="space-y-4">
            {/* Brush Selection */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-white font-medium mb-4">Brushes</h3>
              <div className="grid grid-cols-3 gap-2">
                {['🖌️', '🖍️', '✏️', '🎨', '💧', '✨'].map((brush, index) => (
                  <button
                    key={index}
                    className="aspect-square bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg flex items-center justify-center text-xl transition-colors"
                  >
                    {brush}
                  </button>
                ))}
              </div>
            </div>

            {/* Brush Size */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-white font-medium mb-4">Brush Size: {brushSize}px</h3>
              <input
                type="range"
                min="1"
                max="50"
                value={brushSize}
                onChange={e => setBrushSize(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Color Palette */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-white font-medium mb-4">Colors</h3>
              <div className="grid grid-cols-6 gap-2">
                {[
                  '#FF6B6B',
                  '#4ECDC4',
                  '#45B7D1',
                  '#FFA07A',
                  '#98D8C8',
                  '#F7DC6F',
                  '#BB8FCE',
                  '#85C1E2',
                  '#F8B739',
                  '#52C234',
                  '#E74C3C',
                  '#95A5A6',
                  '#000000',
                  '#FFFFFF',
                  '#FF69B4',
                  '#00CED1',
                  '#FFD700',
                  '#FF4500',
                ].map(color => (
                  <button
                    key={color}
                    onClick={() => setCurrentColor(color)}
                    className={`aspect-square rounded-lg border-2 transition-all hover:scale-110 ${
                      currentColor === color ? 'border-white' : 'border-white/30'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Layers */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-white font-medium mb-4">Layers</h3>
              <div className="space-y-2">
                {['Layer 3', 'Layer 2', 'Layer 1'].map((layer, index) => (
                  <div
                    key={index}
                    className="bg-white/10 rounded p-2 flex items-center justify-between"
                  >
                    <span className="text-white/80 text-sm">{layer}</span>
                    <div className="flex gap-1">
                      <button className="text-white/60 hover:text-white text-xs">👁️</button>
                      <button className="text-white/60 hover:text-white text-xs">🔒</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
