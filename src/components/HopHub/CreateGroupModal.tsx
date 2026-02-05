import React, { useState } from 'react';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (groupData: GroupData) => void;
}

interface GroupData {
  name: string;
  description: string;
  privacy: 'public' | 'private';
  avatar?: string;
}

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  isOpen,
  onClose,
  onCreateGroup,
}) => {
  const [formData, setFormData] = useState<GroupData>({
    name: '',
    description: '',
    privacy: 'public',
    avatar: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Please enter a group name');
      return;
    }

    setIsLoading(true);

    try {
      await onCreateGroup(formData);
      onClose();
      // Reset form
      setFormData({ name: '', description: '', privacy: 'public', avatar: '' });
      setAvatarPreview(null);
    } catch (error) {
      console.error('Error creating group:', error);
      alert('Failed to create group. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Avatar must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      const dataUrl = e.target?.result as string;
      setAvatarPreview(dataUrl);
      setFormData(prev => ({ ...prev, avatar: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0a0d1f] border border-white/20 rounded-2xl p-4 w-full max-w-sm max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Create New Group</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Avatar Upload */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center overflow-hidden">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white text-lg">👥</span>
                )}
              </div>
              <label
                htmlFor="group-avatar"
                className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <span className="text-white text-xs">📷</span>
              </label>
              <input
                id="group-avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium text-sm">Group Avatar</p>
              <p className="text-white/60 text-xs">Click camera to upload</p>
            </div>
          </div>

          {/* Group Name */}
          <div>
            <label className="block text-white font-medium text-sm mb-1">Group Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 text-sm"
              placeholder="Enter group name"
              maxLength={50}
              required
            />
            <p className="text-white/60 text-xs mt-1">{formData.name.length}/50</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-medium text-sm mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 resize-none h-16 text-sm"
              placeholder="What's this group about?"
              maxLength={200}
            />
            <p className="text-white/60 text-xs mt-1">{formData.description.length}/200</p>
          </div>

          {/* Privacy */}
          <div>
            <label className="block text-white font-medium text-sm mb-1">Privacy</label>
            <div className="space-y-1">
              <label className="flex items-center p-2 bg-white/5 border border-white/20 rounded-lg cursor-pointer hover:bg-white/10">
                <input
                  type="radio"
                  name="privacy"
                  value="public"
                  checked={formData.privacy === 'public'}
                  onChange={e => setFormData(prev => ({ ...prev, privacy: 'public' }))}
                  className="mr-2"
                />
                <div>
                  <div className="text-white font-medium text-sm">🌍 Public</div>
                  <div className="text-white/60 text-xs">Anyone can find and join</div>
                </div>
              </label>
              <label className="flex items-center p-2 bg-white/5 border border-white/20 rounded-lg cursor-pointer hover:bg-white/10">
                <input
                  type="radio"
                  name="privacy"
                  value="private"
                  checked={formData.privacy === 'private'}
                  onChange={e => setFormData(prev => ({ ...prev, privacy: 'private' }))}
                  className="mr-2"
                />
                <div>
                  <div className="text-white font-medium text-sm">🔒 Private</div>
                  <div className="text-white/60 text-xs">Only invited members</div>
                </div>
              </label>
            </div>
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
