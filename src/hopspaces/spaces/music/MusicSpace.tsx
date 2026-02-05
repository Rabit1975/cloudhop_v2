import React, { useState, useRef, useEffect } from 'react';
import { HopSpace } from '../../utils/types';

export const MusicSpace = ({ space }: { space: HopSpace }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePad, setActivePad] = useState<number | null>(null);
  const [selectedLoop, setSelectedLoop] = useState<string | null>(null);
  const [visualizerBars, setVisualizerBars] = useState<number[]>(Array(12).fill(20));

  // Simulate audio visualization
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setVisualizerBars(prev => prev.map(() => Math.random() * 80 + 20));
      }, 200);
      return () => clearInterval(interval);
    } else {
      setVisualizerBars(Array(12).fill(20));
    }
  }, [isPlaying]);

  const handlePadClick = (index: number) => {
    setActivePad(index);
    setIsPlaying(true);
    setTimeout(() => setActivePad(null), 200);
  };

  const handleLoopClick = (loop: string) => {
    setSelectedLoop(loop);
    setIsPlaying(true);
  };

  const instruments = [
    { icon: '🎹', name: 'Piano', sound: 'C4' },
    { icon: '🎸', name: 'Guitar', sound: 'E2' },
    { icon: '🥁', name: 'Drums', sound: 'Kick' },
    { icon: '🎺', name: 'Trumpet', sound: 'Bb3' },
    { icon: '🎷', name: 'Saxophone', sound: 'Eb3' },
    { icon: '🎻', name: 'Violin', sound: 'A4' },
    { icon: '🎤', name: 'Vocals', sound: 'Mic' },
    { icon: '🔊', name: 'Synth', sound: 'Wave' },
  ];

  const loops = [
    { name: 'Drum Loop 1', bpm: 120, duration: '0:04' },
    { name: 'Bass Line 2', bpm: 140, duration: '0:08' },
    { name: 'Melody 3', bpm: 128, duration: '0:16' },
    { name: 'Ambient Pad', bpm: 90, duration: '0:32' },
  ];

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
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-medium">Track Timeline</h3>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded text-sm transition-colors"
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map(track => (
                <div key={track} className="bg-white/10 rounded p-2">
                  <div className="text-white/80 text-sm mb-1">Track {track}</div>
                  <div className="h-8 bg-white/20 rounded relative overflow-hidden">
                    {isPlaying && (
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse"
                        style={{ width: '60%' }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instrument Pads */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Instrument Pads</h3>
            <div className="grid grid-cols-4 gap-2">
              {instruments.map((instrument, index) => (
                <button
                  key={index}
                  onClick={() => handlePadClick(index)}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center text-2xl transition-all transform ${
                    activePad === index
                      ? 'bg-purple-500 scale-95 shadow-lg shadow-purple-500/50'
                      : 'bg-white/10 hover:bg-white/20 border border-white/20 hover:scale-105'
                  }`}
                >
                  <span>{instrument.icon}</span>
                  <span className="text-xs mt-1 text-white/60">{instrument.sound}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Loop Browser */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Loop Browser</h3>
            <div className="space-y-2">
              {loops.map((loop, index) => (
                <div
                  key={index}
                  onClick={() => handleLoopClick(loop.name)}
                  className={`bg-white/10 rounded p-3 cursor-pointer transition-all ${
                    selectedLoop === loop.name
                      ? 'bg-purple-500/30 border border-purple-400'
                      : 'hover:bg-white/20'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white/80 text-sm font-medium">{loop.name}</div>
                      <div className="text-white/50 text-xs">
                        {loop.bpm} BPM • {loop.duration}
                      </div>
                    </div>
                    {selectedLoop === loop.name && (
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audio Visualizer */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Audio Visualizer</h3>
            <div className="h-32 bg-white/10 rounded flex items-center justify-center">
              <div className="flex gap-1 items-end">
                {visualizerBars.map((height, index) => (
                  <div
                    key={index}
                    className="w-2 bg-gradient-to-t from-purple-500 to-blue-500 rounded-t transition-all duration-200"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
