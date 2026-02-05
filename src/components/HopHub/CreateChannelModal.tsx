import React, { useState } from 'react';

interface CreateChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateChannel: (channelData: ChannelData) => void;
}

interface ChannelData {
  name: string;
  topic: string;
  type: 'text' | 'voice' | 'announcement';
  privacy: 'public' | 'private';
}

export const CreateChannelModal: React.FC<CreateChannelModalProps> = ({
  isOpen,
  onClose,
  onCreateChannel,
}) => {
  const [formData, setFormData] = useState<ChannelData>({
    name: '',
    topic: '',
    type: 'text',
    privacy: 'public',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Please enter a channel name');
      return;
    }

    // Channel names should start with #
    const channelName = formData.name.startsWith('#') ? formData.name : `#${formData.name}`;

    setIsLoading(true);

    try {
      await onCreateChannel({ ...formData, name: channelName });
      onClose();
      // Reset form
      setFormData({ name: '', topic: '', type: 'text', privacy: 'public' });
    } catch (error) {
      console.error('Error creating channel:', error);
      alert('Failed to create channel. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0a0d1f] border border-white/20 rounded-2xl p-4 w-full max-w-sm max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Create New Channel</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Channel Name */}
          <div>
            <label className="block text-white font-medium text-sm mb-1">Channel Name *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 text-sm">
                #
              </span>
              <input
                type="text"
                value={formData.name.replace('#', '')}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 pl-7 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 text-sm"
                placeholder="channel-name"
                maxLength={30}
                required
              />
            </div>
            <p className="text-white/60 text-xs mt-1">Starts with #</p>
          </div>

          {/* Topic */}
          <div>
            <label className="block text-white font-medium text-sm mb-1">Topic</label>
            <input
              type="text"
              value={formData.topic}
              onChange={e => setFormData(prev => ({ ...prev, topic: e.target.value }))}
              className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 text-sm"
              placeholder="What's this channel about?"
              maxLength={100}
            />
            <p className="text-white/60 text-xs mt-1">{formData.topic.length}/100</p>
          </div>

          {/* Channel Type */}
          <div>
            <label className="block text-white font-medium text-sm mb-1">Channel Type</label>
            <div className="space-y-1">
              <label className="flex items-center p-2 bg-white/5 border border-white/20 rounded-lg cursor-pointer hover:bg-white/10">
                <input
                  type="radio"
                  name="type"
                  value="text"
                  checked={formData.type === 'text'}
                  onChange={e => setFormData(prev => ({ ...prev, type: 'text' }))}
                  className="mr-2"
                />
                <div>
                  <div className="text-white font-medium text-sm">💬 Text</div>
                  <div className="text-white/60 text-xs">Text conversations</div>
                </div>
              </label>
              <label className="flex items-center p-2 bg-white/5 border border-white/20 rounded-lg cursor-pointer hover:bg-white/10">
                <input
                  type="radio"
                  name="type"
                  value="voice"
                  checked={formData.type === 'voice'}
                  onChange={e => setFormData(prev => ({ ...prev, type: 'voice' }))}
                  className="mr-2"
                />
                <div>
                  <div className="text-white font-medium text-sm">🎤 Voice</div>
                  <div className="text-white/60 text-xs">Voice conversations</div>
                </div>
              </label>
              <label className="flex items-center p-2 bg-white/5 border border-white/20 rounded-lg cursor-pointer hover:bg-white/10">
                <input
                  type="radio"
                  name="type"
                  value="announcement"
                  checked={formData.type === 'announcement'}
                  onChange={e => setFormData(prev => ({ ...prev, type: 'announcement' }))}
                  className="mr-2"
                />
                <div>
                  <div className="text-white font-medium text-sm">📢 Announcement</div>
                  <div className="text-white/60 text-xs">Admins only</div>
                </div>
              </label>
            </div>
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
                  <div className="text-white/60 text-xs">Everyone can see</div>
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
                  <div className="text-white/60 text-xs">Invited only</div>
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
