import React from 'react';
import { HopSpace } from '../../utils/types';

export const FluidArtSpace = ({ space }: { space: HopSpace }) => {
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
            <h3 className="text-white font-medium mb-4">Canvas</h3>
            <div className="h-96 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎨</div>
                <p className="text-white/60">Interactive canvas area</p>
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

            {/* Color Palette */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-white font-medium mb-4">Colors</h3>
              <div className="grid grid-cols-6 gap-2">
                {['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-purple-500',
                  'bg-pink-500', 'bg-gray-500', 'bg-white', 'bg-black', 'bg-gradient-to-r from-purple-500 to-pink-500', 'bg-gradient-to-r from-blue-500 to-green-500'].map((color, index) => (
                  <button
                    key={index}
                    className={`aspect-square ${color} border-2 border-white/30 rounded-lg hover:scale-110 transition-transform`}
                  ></button>
                ))}
              </div>
            </div>

            {/* Layers */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-white font-medium mb-4">Layers</h3>
              <div className="space-y-2">
                {['Layer 3', 'Layer 2', 'Layer 1'].map((layer, index) => (
                  <div key={index} className="bg-white/10 rounded p-2 flex items-center justify-between">
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
