import React from 'react';
import { HopSpace } from '../../utils/types';

export const WorldSpace = ({ space }: { space: HopSpace }) => {
  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-br from-green-900/20 to-blue-900/20">
      {/* World Space Header */}
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold text-white mb-2">{space.name}</h2>
        <p className="text-white/60">3D exploration, scenes, environments</p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* 3D Viewport */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">3D Viewport</h3>
            <div className="h-96 bg-gradient-to-b from-sky-600/20 to-green-600/20 rounded-lg relative overflow-hidden">
              {/* Mock 3D scene */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-800/40 to-transparent"></div>
              <div className="absolute bottom-8 left-8 w-16 h-16 bg-gray-700 rounded-lg shadow-lg"></div>
              <div className="absolute bottom-12 right-12 w-12 h-12 bg-gray-600 rounded-lg shadow-lg"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌍</div>
                  <p className="text-white/60">3D scene viewport</p>
                </div>
              </div>
            </div>

            {/* Camera Controls */}
            <div className="mt-4 flex justify-center gap-2">
              <button className="p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded text-white text-sm">
                🔄
              </button>
              <button className="p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded text-white text-sm">
                🔍
              </button>
              <button className="p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded text-white text-sm">
                📐
              </button>
            </div>
          </div>

          {/* Tools Panel */}
          <div className="space-y-4">
            {/* Objects */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-white font-medium mb-4">Objects</h3>
              <div className="grid grid-cols-3 gap-2">
                {['🏔️', '🌳', '🏠', '🚗', '👤', '💎'].map((object, index) => (
                  <button
                    key={index}
                    className="aspect-square bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg flex items-center justify-center text-xl transition-colors"
                  >
                    {object}
                  </button>
                ))}
              </div>
            </div>

            {/* Materials */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-white font-medium mb-4">Materials</h3>
              <div className="space-y-2">
                {['Wood', 'Metal', 'Glass', 'Stone', 'Water', 'Fabric'].map((material, index) => (
                  <button
                    key={index}
                    className="w-full p-2 bg-white/10 hover:bg-white/20 rounded text-left text-white/80 hover:text-white text-sm transition-colors"
                  >
                    {material}
                  </button>
                ))}
              </div>
            </div>

            {/* Lighting */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-white font-medium mb-4">Lighting</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-white/60 text-xs">Sun Intensity</label>
                  <input type="range" className="w-full" />
                </div>
                <div>
                  <label className="text-white/60 text-xs">Ambient Light</label>
                  <input type="range" className="w-full" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="p-2 bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-500/30 rounded text-yellow-300 text-xs">
                    ☀️ Day
                  </button>
                  <button className="p-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded text-blue-300 text-xs">
                    🌙 Night
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
