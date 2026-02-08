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
          {/* Canvas Area - Takes up 2 columns */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-medium">Digital Canvas</h3>
              <div className="flex gap-2">
                <input 
                    type="color" 
                    value={currentColor}
                    onChange={(e) => setCurrentColor(e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer bg-transparent border-none"
                    title="Change Color"
                />
                <input
                    type="range"
                    min="1"
                    max="20"
                    value={brushSize}
                    onChange={(e) => setBrushSize(parseInt(e.target.value))}
                    className="w-24 accent-pink-500"
                    title="Brush Size"
                />
                <button
                    onClick={clearCanvas}
                    className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded text-sm transition-colors"
                >
                    Clear
                </button>
              </div>
            </div>
            <div className="relative flex-1 bg-[#1a1a2e] rounded-lg overflow-hidden border border-white/5 cursor-crosshair">
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="absolute inset-0 w-full h-full"
                />
            </div>
          </div>

          {/* Tutorial Area - Takes up 1 column */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col">
            <div className="mb-4">
                <h3 className="text-white font-medium mb-1">Techniques</h3>
                <p className="text-white/40 text-xs">Learn acrylic pouring while you create</p>
            </div>
            <div className="flex-1 bg-black rounded-lg overflow-hidden relative">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed?listType=search&list=acrylic+pour+painting+techniques" 
                    title="Acrylic Pouring Techniques"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                ></iframe>
            </div>
             <div className="mt-4 p-3 bg-white/5 rounded text-xs text-white/60">
                <p><strong>Tip:</strong> Try mixing colors on the canvas to simulate fluid dynamics!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
