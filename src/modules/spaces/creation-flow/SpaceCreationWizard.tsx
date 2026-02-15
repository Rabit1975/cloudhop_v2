import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HopSpace, HopSpaceType, HopSpaceMood } from '../../../hopspaces/utils/types';

interface SpaceCreationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: { name: string; type: HopSpaceType; mood: HopSpaceMood }) => void;
}

const SpaceCreationWizard: React.FC<SpaceCreationWizardProps> = ({
  isOpen,
  onClose,
  onCreate
}) => {
  const [spaceData, setSpaceData] = useState({
    name: '',
    type: 'fluid_art' as HopSpaceType,
    mood: 'calm' as HopSpaceMood,
  });

  const handleClose = () => {
    setSpaceData({
      name: '',
      type: 'fluid_art',
      mood: 'calm',
    });
    onClose();
  };

  const handleCreate = () => {
    if (spaceData.name.trim()) {
      onCreate(spaceData);
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-900 border border-cyan-400/20 rounded-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Create HopSpace</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Space Name
                </label>
                <input
                  type="text"
                  value={spaceData.name}
                  onChange={(e) => setSpaceData({ ...spaceData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-cyan-400/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50"
                  placeholder="Enter space name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Space Type
                </label>
                <select
                  value={spaceData.type}
                  onChange={(e) => setSpaceData({ ...spaceData, type: e.target.value as HopSpaceType })}
                  className="w-full px-3 py-2 bg-slate-800 border border-cyan-400/20 rounded-lg text-white focus:outline-none focus:border-cyan-400/50"
                >
                  <option value="fluid_art">Fluid Art</option>
                  <option value="geometric">Geometric</option>
                  <option value="organic">Organic</option>
                  <option value="cosmic">Cosmic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mood
                </label>
                <select
                  value={spaceData.mood}
                  onChange={(e) => setSpaceData({ ...spaceData, mood: e.target.value as HopSpaceMood })}
                  className="w-full px-3 py-2 bg-slate-800 border border-cyan-400/20 rounded-lg text-white focus:outline-none focus:border-cyan-400/50"
                >
                  <option value="calm">Calm</option>
                  <option value="energetic">Energetic</option>
                  <option value="mysterious">Mysterious</option>
                  <option value="playful">Playful</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-2 bg-slate-800 text-gray-300 rounded-lg hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!spaceData.name.trim()}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Space
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpaceCreationWizard;
