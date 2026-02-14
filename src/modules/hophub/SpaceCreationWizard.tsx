import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HopSpace, HopSpaceType, HopSpaceMood } from '../../hopspaces/utils/types';
import { cn } from '@/lib/utils';

interface SpaceCreationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: { name: string; type: HopSpaceType; mood: HopSpaceMood; description?: string; color?: string }) => void;
}

const SpaceCreationWizard: React.FC<SpaceCreationWizardProps> = ({ 
  isOpen, 
  onClose, 
  onCreate 
}) => {
  const [step, setStep] = useState(1);
  const [spaceData, setSpaceData] = useState<{
    name: string;
    type: HopSpaceType;
    mood: HopSpaceMood;
    description?: string;
    color?: string;
  }>({
    name: '',
    type: 'fluid_art' as HopSpaceType,
    mood: 'calm' as HopSpaceMood,
    description: '',
    color: 'bg-blue-600',
  });

  const steps = [
    { id: 1, title: 'Choose Type', description: 'Select what kind of creative space you want to create' },
    { id: 2, title: 'Basic Info', description: 'Enter the basic information for your space' },
    { id: 3, title: 'Customize', description: 'Set the mood and visual style' },
    { id: 4, title: 'Review', description: 'Review your space before creating' },
  ];

  const nextStep = () => {
    if (step < steps.length) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    if (step === 4) {
      onCreate(spaceData);
      setStep(1);
      onClose();
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Choose Space Type</h2>
            <p className="text-gray-300 mb-8">What kind of creative space would you like to create?</p>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <button
                onClick={() => setSpaceData(prev => ({ ...prev, type: 'fluid_art' }))}
                className="p-6 rounded-lg border transition-all hover:bg-cyan-500/20 border-cyan-500/50 text-white"
              >
                <div className="text-4xl mb-2">🎨</div>
                <h3 className="font-bold">Fluid Art</h3>
                <p className="text-sm">Interactive painting and creative expression</p>
              </button>
              <button
                onClick={() => setSpaceData(prev => ({ ...prev, type: 'music' }))}
                className="p-6 rounded-lg border transition-all hover:bg-cyan-500/20 border-cyan-500/50 text-white"
              >
                <div className="text-4xl mb-2">🎵</div>
                <h3 className="font-bold">Music</h3>
                <p className="text-sm">Music collaboration and sharing</p>
              </button>
              <button
                onClick={() => setSpaceData(prev => ({ ...prev, type: 'ideas' }))}
                className="p-6 rounded-lg border transition-all hover:bg-cyan-500/20 border-cyan-500/50 text-white"
              >
                <div className="text-4xl mb-2">💡</div>
                <h3 className="font-bold">Ideas</h3>
                <p className="text-sm">Brainstorming and concept development</p>
              </button>
              <button
                onClick={() => setSpaceData(prev => ({ ...prev, type: 'world' }))}
                className="p-6 rounded-lg border transition-all hover:bg-cyan-500/20 border-cyan-500/50 text-white"
              >
                <div className="text-4xl mb-2">🌍</div>
                <h3 className="font-bold">World</h3>
                <p className="text-sm">3D environments and experiences</p>
              </button>
              <button
                onClick={() => setSpaceData(prev => ({ ...prev, type: 'anima' }))}
                className="p-6 rounded-lg border transition-all hover:bg-cyan-500/20 border-cyan-500/50 text-white"
              >
                <div className="text-4xl mb-2">🦋</div>
                <h3 className="font-bold">Anima</h3>
                <p className="text-sm">Animation and interactive media</p>
              </button>
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Previous
              </button>
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
              >
                Next
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Basic Information</h2>
            <p className="text-gray-300 mb-8">Let's set up the basic details for your space.</p>
            <div className="space-y-4 max-w-md mx-auto">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Space Name</label>
                <input
                  type="text"
                  value={spaceData.name}
                  onChange={(e) => setSpaceData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                  placeholder="My Creative Space"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Description</label>
                <textarea
                  value={spaceData.description || ''}
                  onChange={(e) => setSpaceData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                  placeholder="Describe your creative space..."
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Previous
              </button>
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
              >
                Next
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Customize Your Space</h2>
            <p className="text-gray-300 mb-8">Choose the mood and visual style for your space.</p>
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Space Mood</label>
                <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
                  {(['calm', 'dreamy', 'intense'] as HopSpaceMood).map(mood => (
                    <button
                      key={mood}
                      onClick={() => setSpaceData(prev => ({ ...prev, mood }))}
                      className={`p-4 rounded-lg border transition-all ${
                        spaceData.mood === mood
                          ? 'bg-cyan-500/20 border-cyan-500/50 text-white'
                          : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">
                          {mood === 'calm' && '😌'}
                          {mood === 'dreamy' && '💤'}
                          {mood === 'intense' && '🔥'}
                        </div>
                        <div className="text-sm font-medium capitalize">{mood}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Background Color</label>
                <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
                  {[
                    { color: '#1A2348', name: 'Deep Blue' },
                    { color: '#10B981', name: 'Emerald' },
                    { color: '#059669', name: 'Purple' },
                    { color: '#DC1430', name: 'Cyan' },
                    { color: '#FF6B6B', name: 'Pink' },
                  ].map(colorOption => (
                    <button
                      key={colorOption.color}
                      onClick={() => setSpaceData(prev => ({ ...prev, color: colorOption.color }))}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        spaceData.color === colorOption.color
                          ? 'border-white ring-2 ring-offset-2 ring-' + colorOption.color
                          : 'border-white/20 hover:border-white/30'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">
                          {colorOption.color === '#1A2348' && 'Deep Blue'}
                          {colorOption.color === '#10B981' && 'Emerald'}
                          {colorOption.color === '#059669' && 'Purple'}
                          {colorOption.color === '#DC1430' && 'Cyan'}
                          {colorOption.color === '#FF6B6B' && 'Pink'}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Previous
              </button>
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
              >
                Next
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Review Your Space</h2>
            <p className="text-gray-300 mb-8">Review your space before creating.</p>
            <div className="space-y-4">
              <div className="bg-white/10 border border-white/20 rounded-lg p-4">
                <h3 className="text-lg font-bold text-white mb-2">{spaceData.name || 'My Space'}</h3>
                <p className="text-sm text-gray-300 mb-2">Type: {spaceData.type}</p>
                <p className="text-sm text-gray-300 mb-2">Mood: {spaceData.mood}</p>
                <p className="text-sm text-gray-300 mb-2">Description: {spaceData.description || 'No description'}</p>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Previous
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
              >
                Create Space
              </button>
            </div>
          </div>
        );
    };
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            className="bg-[#1A2348] p-6 rounded-2xl border border-white/20 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Create New Space</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Space Name</label>
                <input
                  type="text"
                  value={spaceData.name}
                  onChange={(e) => setSpaceData({ ...spaceData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                  placeholder="Enter space name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={spaceData.description}
                  onChange={(e) => setSpaceData({ ...spaceData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                  placeholder="Describe your space..."
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Mood</label>
                <select
                  value={spaceData.mood}
                  onChange={(e) => setSpaceData({ ...spaceData, mood: e.target.value as any })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="creative">Creative</option>
                  <option value="gaming">Gaming</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Color Theme</label>
                <div className="flex gap-2">
                  {['bg-blue-600', 'bg-purple-600', 'bg-green-600', 'bg-red-600'].map(color => (
                    <button
                      key={color}
                      onClick={() => setSpaceData({ ...spaceData, color })}
                      className={cn(
                        'w-8 h-8 rounded-lg border-2',
                        spaceData.color === color ? 'border-white' : 'border-transparent'
                      )}
                      style={{ backgroundColor: color.replace('bg-', '').replace('-600', '') }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-black/20 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Preview</h3>
              <div className="flex items-center gap-3">
                <div className={cn('w-12 h-12 rounded-full', spaceData.color)} />
                <div>
                  <p className="text-white font-medium">{spaceData.name || 'New Space'}</p>
                  <p className="text-sm text-gray-300 mb-2">Mood: {spaceData.mood}</p>
                  <p className="text-sm text-gray-300">Description: {spaceData.description || 'No description'}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Previous
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
              >
                Create Space
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
