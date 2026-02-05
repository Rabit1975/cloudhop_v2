import React from 'react';

export const HomeScreen: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-[#050819]">
      <div className="text-center max-w-2xl mx-auto px-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to HopSpaces</h1>
          <p className="text-white/60 text-lg">
            Select a space from the left to begin your creative journey
          </p>
        </div>

        {/* Space Types Preview */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
            <div className="text-3xl mb-3">🎵</div>
            <h3 className="text-white font-medium mb-2">Music Space</h3>
            <p className="text-white/60 text-sm">Create, explore, and remix sound</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="text-white font-medium mb-2">Fluid Art Space</h3>
            <p className="text-white/60 text-sm">Generative painting and visual expression</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
            <div className="text-3xl mb-3">💡</div>
            <h3 className="text-white font-medium mb-2">Ideas Space</h3>
            <p className="text-white/60 text-sm">Notes, brainstorming, mind-mapping</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="text-white font-medium mb-2">World Space</h3>
            <p className="text-white/60 text-sm">3D exploration and environments</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
            <div className="text-3xl mb-3">🜂</div>
            <h3 className="text-white font-medium mb-2">Anima Space</h3>
            <p className="text-white/60 text-sm">Symbolic and ritualistic expression</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-lg p-6">
          <h3 className="text-white font-medium mb-2">Ready to Create?</h3>
          <p className="text-white/60 text-sm mb-4">
            Click "Create New Space" in the left sidebar to get started
          </p>
          <div className="flex items-center justify-center gap-2 text-white/40 text-sm">
            <span>←</span>
            <span>Look for the + button in the sidebar</span>
          </div>
        </div>
      </div>
    </div>
  );
};
