import React from 'react';
import { HopSpace } from '../../utils/types';

export const AnimaSpace = ({ space }: { space: HopSpace }) => {
  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-br from-red-900/20 to-purple-900/20">
      {/* Anima Space Header */}
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold text-white mb-2">{space.name}</h2>
        <p className="text-white/60">Symbolic, emotional, ritualistic expression</p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Archetype Glyph Area */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Archetype Glyph</h3>
            <div className="h-96 bg-gradient-to-br from-purple-600/20 to-red-600/20 rounded-lg relative overflow-hidden">
              {/* Mock emotional sky */}
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 via-purple-800/20 to-red-800/30"></div>
              <div className="absolute top-8 left-8 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="absolute top-12 right-12 w-3 h-3 bg-blue-300 rounded-full animate-pulse"></div>
              <div className="absolute bottom-20 left-20 w-2 h-2 bg-pink-300 rounded-full animate-pulse"></div>

              {/* Central archetype */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600/50 to-red-600/50 flex items-center justify-center animate-pulse">
                  <div className="text-6xl">🜂</div>
                </div>
              </div>

              {/* Ritual circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-purple-400/30 animate-spin-slow"></div>
            </div>
          </div>

          {/* Tools Panel */}
          <div className="space-y-4">
            {/* Archetype Settings */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-white font-medium mb-4">Archetype</h3>
              <div className="space-y-2">
                {['🜂 Fire', '💧 Water', '🌍 Earth', '💨 Air', '🌙 Spirit', '⚡ Energy'].map(
                  (archetype, index) => (
                    <button
                      key={index}
                      className="w-full p-2 bg-white/10 hover:bg-white/20 rounded text-left text-white/80 hover:text-white text-sm transition-colors"
                    >
                      {archetype}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Mood Selector */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-white font-medium mb-4">Mood</h3>
              <div className="grid grid-cols-2 gap-2">
                {['Calm', 'Intense', 'Dreamy', 'Chaotic', 'Sacred', 'Mystical'].map(
                  (mood, index) => (
                    <button
                      key={index}
                      className="p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded text-white/80 hover:text-white text-xs transition-colors"
                    >
                      {mood}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Symbol Library */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-white font-medium mb-4">Symbols</h3>
              <div className="grid grid-cols-4 gap-2">
                {['⭐', '🌙', '☀️', '🔮', '💫', '🌟', '✨', '🔥'].map((symbol, index) => (
                  <button
                    key={index}
                    className="aspect-square bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg flex items-center justify-center text-lg transition-colors"
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            </div>

            {/* Ritual Actions */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-white font-medium mb-4">Rituals</h3>
              <div className="space-y-2">
                <button className="w-full p-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded text-purple-300 hover:text-purple-200 text-sm transition-colors">
                  🔮 Invoke Oracle
                </button>
                <button className="w-full p-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded text-red-300 hover:text-red-200 text-sm transition-colors">
                  🜂 Transform
                </button>
                <button className="w-full p-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded text-blue-300 hover:text-blue-200 text-sm transition-colors">
                  💫 Meditate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
