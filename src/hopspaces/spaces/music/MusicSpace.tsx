import React from 'react';
import { HopSpace } from '../../utils/types';

export const MusicSpace = ({ space }: { space: HopSpace }) => {
  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-br from-purple-900/20 to-blue-900/20">
      {/* Music Space Header */}
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold text-white mb-2">{space.name}</h2>
        <p className="text-white/60">Create, explore, and remix sound</p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* Track Timeline */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Track Timeline</h3>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((track) => (
                <div key={track} className="bg-white/10 rounded p-2">
                  <div className="text-white/80 text-sm">Track {track}</div>
                  <div className="h-8 bg-white/20 rounded mt-1"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Instrument Pads */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Instrument Pads</h3>
            <div className="grid grid-cols-4 gap-2">
              {['🎹', '🎸', '🥁', '🎺', '🎷', '🎻', '🎤', '🔊'].map((instrument, index) => (
                <button
                  key={index}
                  className="aspect-square bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg flex items-center justify-center text-2xl transition-colors"
                >
                  {instrument}
                </button>
              ))}
            </div>
          </div>

          {/* Loop Browser */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Loop Browser</h3>
            <div className="space-y-2">
              {['Drum Loop 1', 'Bass Line 2', 'Melody 3', 'Ambient Pad'].map((loop, index) => (
                <div key={index} className="bg-white/10 rounded p-2 hover:bg-white/20 cursor-pointer transition-colors">
                  <div className="text-white/80 text-sm">{loop}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Audio Visualizer */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Audio Visualizer</h3>
            <div className="h-32 bg-white/10 rounded flex items-center justify-center">
              <div className="flex gap-1 items-end">
                {[20, 40, 60, 80, 60, 40, 20, 30, 50, 70, 50, 30].map((height, index) => (
                  <div
                    key={index}
                    className="w-2 bg-gradient-to-t from-purple-500 to-blue-500 rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
