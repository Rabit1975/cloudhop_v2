import React from 'react';
import { HopSpace } from '../../utils/types';

export const IdeasSpace = ({ space }: { space: HopSpace }) => {
  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-br from-yellow-900/20 to-green-900/20">
      {/* Ideas Space Header */}
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold text-white mb-2">{space.name}</h2>
        <p className="text-white/60">Notes, brainstorming, mind-mapping</p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Infinite Canvas Area */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Infinite Canvas</h3>
            <div className="h-96 bg-white/5 rounded-lg relative overflow-hidden">
              {/* Mock sticky notes */}
              <div className="absolute top-4 left-4 w-32 h-32 bg-yellow-400/90 p-2 rounded shadow-lg transform rotate-2">
                <div className="text-xs font-medium text-gray-800">Main Idea</div>
                <div className="text-xs text-gray-600 mt-1">Core concept here</div>
              </div>
              <div className="absolute top-8 right-8 w-32 h-32 bg-pink-400/90 p-2 rounded shadow-lg transform -rotate-1">
                <div className="text-xs font-medium text-gray-800">Related</div>
                <div className="text-xs text-gray-600 mt-1">Supporting idea</div>
              </div>
              <div className="absolute bottom-4 left-20 w-32 h-32 bg-blue-400/90 p-2 rounded shadow-lg transform rotate-1">
                <div className="text-xs font-medium text-white">Action</div>
                <div className="text-xs text-white/80 mt-1">Next steps</div>
              </div>
              <div className="absolute bottom-8 right-20 w-32 h-32 bg-green-400/90 p-2 rounded shadow-lg transform -rotate-2">
                <div className="text-xs font-medium text-gray-800">Resource</div>
                <div className="text-xs text-gray-600 mt-1">Links & tools</div>
              </div>
            </div>
          </div>

          {/* Tools Panel */}
          <div className="space-y-4">
            {/* Note Styles */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-white font-medium mb-4">Note Styles</h3>
              <div className="grid grid-cols-4 gap-2">
                {['📝', '🗂️', '🏷️', '📌'].map((style, index) => (
                  <button
                    key={index}
                    className="aspect-square bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg flex items-center justify-center text-xl transition-colors"
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Templates */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-white font-medium mb-4">Templates</h3>
              <div className="space-y-2">
                {['Mind Map', 'SWOT Analysis', 'Brainstorm', 'Project Plan'].map(
                  (template, index) => (
                    <button
                      key={index}
                      className="w-full p-2 bg-white/10 hover:bg-white/20 rounded text-left text-white/80 hover:text-white text-sm transition-colors"
                    >
                      {template}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-white font-medium mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full p-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 rounded text-green-300 hover:text-green-200 text-sm transition-colors">
                  + Add Note
                </button>
                <button className="w-full p-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded text-blue-300 hover:text-blue-200 text-sm transition-colors">
                  🔗 Add Connection
                </button>
                <button className="w-full p-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded text-purple-300 hover:text-purple-200 text-sm transition-colors">
                  🧠 AI Brainstorm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
