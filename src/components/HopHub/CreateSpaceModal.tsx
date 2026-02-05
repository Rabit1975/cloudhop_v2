import React, { useState } from 'react';

interface CreateSpaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSpace: (spaceData: SpaceData) => void;
}

interface SpaceData {
  name: string;
  type: 'music' | 'fluid_art' | 'ideas' | 'world' | 'anima';
  mood: 'dreamy' | 'energetic' | 'calm' | 'mysterious' | 'playful';
  description: string;
  isPublic: boolean;
  coverImage?: string;
}

export const CreateSpaceModal: React.FC<CreateSpaceModalProps> = ({
  isOpen,
  onClose,
  onCreateSpace,
}) => {
  const [formData, setFormData] = useState<SpaceData>({
    name: '',
    type: 'music',
    mood: 'dreamy',
    description: '',
    isPublic: true,
    coverImage: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const spaceTypes = [
    { value: 'music', label: '🎵 Music Studio', description: 'Create and explore music together' },
    { value: 'fluid_art', label: '🎨 Art Canvas', description: 'Collaborative fluid art space' },
    { value: 'ideas', label: '💡 Ideas Hub', description: 'Brainstorm and share ideas' },
    { value: 'world', label: '🌍 World Builder', description: 'Create and explore virtual worlds' },
    { value: 'anima', label: '🜂 Anima Space', description: 'Meditative and spiritual space' },
  ];

  const spaceMoods = [
    { value: 'dreamy', label: '☁️ Dreamy', color: 'from-blue-400 to-purple-400' },
    { value: 'energetic', label: '⚡ Energetic', color: 'from-yellow-400 to-orange-400' },
    { value: 'calm', label: '🌊 Calm', color: 'from-green-400 to-blue-400' },
    { value: 'mysterious', label: '🌙 Mysterious', color: 'from-purple-400 to-pink-400' },
    { value: 'playful', label: '🎈 Playful', color: 'from-pink-400 to-yellow-400' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Please enter a space name');
      return;
    }

    setIsLoading(true);

    try {
      await onCreateSpace(formData);
      onClose();
      // Reset form
      setFormData({
        name: '',
        type: 'music',
        mood: 'dreamy',
        description: '',
        isPublic: true,
        coverImage: '',
      });
      setImagePreview(null);
    } catch (error) {
      console.error('Error creating space:', error);
      alert('Failed to create space. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      const dataUrl = e.target?.result as string;
      setImagePreview(dataUrl);
      setFormData(prev => ({ ...prev, coverImage: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const selectedType = spaceTypes.find(t => t.value === formData.type);
  const selectedMood = spaceMoods.find(m => m.value === formData.mood);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0a0d1f] border border-white/20 rounded-2xl p-4 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Create New Space</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Cover Image */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedMood?.color} flex items-center justify-center overflow-hidden`}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white text-2xl">{selectedType?.label.split(' ')[0]}</span>
                )}
              </div>
              <label
                htmlFor="space-cover"
                className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <span className="text-white text-xs">📷</span>
              </label>
              <input
                id="space-cover"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium text-sm">Cover Image</p>
              <p className="text-white/60 text-xs">Optional - Click to upload</p>
            </div>
          </div>

          {/* Space Name */}
          <div>
            <label className="block text-white font-medium text-sm mb-1">Space Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 text-sm"
              placeholder="Enter space name"
              maxLength={50}
              required
            />
            <p className="text-white/60 text-xs mt-1">{formData.name.length}/50</p>
          </div>

          {/* Space Type */}
          <div>
            <label className="block text-white font-medium text-sm mb-1">Space Type *</label>
            <div className="space-y-1">
              {spaceTypes.map(type => (
                <label
                  key={type.value}
                  className={`flex items-center p-2 bg-white/5 border rounded-lg cursor-pointer transition-all ${
                    formData.type === type.value
                      ? 'border-purple-500/30 bg-purple-500/10'
                      : 'border-white/20 hover:bg-white/10'
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={type.value}
                    checked={formData.type === type.value}
                    onChange={e =>
                      setFormData(prev => ({ ...prev, type: e.target.value as SpaceData['type'] }))
                    }
                    className="mr-2"
                  />
                  <div>
                    <div className="text-white font-medium text-sm">{type.label}</div>
                    <div className="text-white/60 text-xs">{type.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Space Mood */}
          <div>
            <label className="block text-white font-medium text-sm mb-1">Space Mood *</label>
            <div className="grid grid-cols-2 gap-1">
              {spaceMoods.map(mood => (
                <label
                  key={mood.value}
                  className={`flex items-center p-2 bg-white/5 border rounded-lg cursor-pointer transition-all ${
                    formData.mood === mood.value
                      ? 'border-purple-500/30 bg-purple-500/10'
                      : 'border-white/20 hover:bg-white/10'
                  }`}
                >
                  <input
                    type="radio"
                    name="mood"
                    value={mood.value}
                    checked={formData.mood === mood.value}
                    onChange={e =>
                      setFormData(prev => ({ ...prev, mood: e.target.value as SpaceData['mood'] }))
                    }
                    className="mr-1"
                  />
                  <div
                    className={`text-white font-medium text-xs bg-gradient-to-r ${mood.color} bg-clip-text text-transparent`}
                  >
                    {mood.label}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-medium text-sm mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 resize-none h-16 text-sm"
              placeholder="Describe your space..."
              maxLength={200}
            />
            <p className="text-white/60 text-xs mt-1">{formData.description.length}/200</p>
          </div>

          {/* Visibility */}
          <div>
            <label className="flex items-center gap-2 p-2 bg-white/5 border border-white/20 rounded-lg cursor-pointer hover:bg-white/10">
              <input
                type="checkbox"
                checked={formData.isPublic}
                onChange={e => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
                className="mr-1"
              />
              <div>
                <div className="text-white font-medium text-sm">🌍 Public Space</div>
                <div className="text-white/60 text-xs">Anyone can discover and join</div>
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !formData.name.trim()}
              className="flex-1 p-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 disabled:cursor-not-allowed rounded-lg text-white font-medium text-sm transition-colors"
            >
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
