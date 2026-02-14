import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import YouTubeMusicIntegration from '../YouTubeMusicIntegration';
import EnhancedMusicPlayer from './EnhancedMusicPlayer';

type MusicSystem = 'selector' | 'youtube' | 'enhanced';

export default function MusicSystemSelector() {
  const [currentSystem, setCurrentSystem] = useState<MusicSystem>('selector');

  useEffect(() => {
    // Listen for navigation events
    const handleNavigate = (event: CustomEvent) => {
      if (event.detail === 'youtube') {
        setCurrentSystem('youtube');
      } else if (event.detail === 'enhanced') {
        setCurrentSystem('enhanced');
      }
    };

    window.addEventListener('navigateToMusicSystem', handleNavigate as EventListener);
    return () => window.removeEventListener('navigateToMusicSystem', handleNavigate as EventListener);
  }, []);

  const handleBackToSelector = () => {
    setCurrentSystem('selector');
  };

  if (currentSystem === 'youtube') {
    return (
      <div className="w-full h-full relative">
        <button
          onClick={handleBackToSelector}
          className="absolute top-4 left-4 z-10 p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <YouTubeMusicIntegration />
      </div>
    );
  }

  if (currentSystem === 'enhanced') {
    return (
      <div className="w-full h-full relative">
        <button
          onClick={handleBackToSelector}
          className="absolute top-4 left-4 z-10 p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <EnhancedMusicPlayer />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">Choose Your Music Experience</h2>
          
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentSystem('youtube')}
              className="w-full p-6 bg-red-500/20 border border-red-500/50 rounded-xl hover:bg-red-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="text-xl font-semibold text-red-400">YouTube Music</span>
              </div>
              <p className="text-gray-300 text-sm">Access your personal YouTube Music library, playlists, and liked videos</p>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400">
                <span>✓ OAuth Integration</span>
                <span>✓ Personal Library</span>
                <span>✓ Playlists</span>
              </div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentSystem('enhanced')}
              className="w-full p-6 bg-cyan-500/20 border border-cyan-500/50 rounded-xl hover:bg-cyan-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <svg className="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
                <span className="text-xl font-semibold text-cyan-400">Enhanced Music Player</span>
              </div>
              <p className="text-gray-300 text-sm">Advanced music player with visualizers, queue management, and enhanced features</p>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400">
                <span>✓ Visualizers</span>
                <span>✓ Queue Management</span>
                <span>✓ Advanced Controls</span>
              </div>
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10"
          >
            <p className="text-gray-400 text-sm">
              💡 <strong>Tip:</strong> You can switch between systems anytime using the back button
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
