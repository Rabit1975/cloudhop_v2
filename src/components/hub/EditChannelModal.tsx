import React, { useState } from 'react';
import Modal from '../Modal';

interface EditChannelModalProps {
  channel: any;
  onSave: (updates: any) => Promise<void>;
  onClose: () => void;
}

export const EditChannelModal: React.FC<EditChannelModalProps> = ({
  channel,
  onSave,
  onClose
}) => {
  const [name, setName] = useState(channel.title || '');
  const [description, setDescription] = useState(channel.description || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
        await onSave({ title: name, description });
        onClose();
    } catch (err) {
        console.error("Failed to save channel:", err);
    } finally {
        setLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Edit Channel">
      <div className="space-y-6">
          <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-[#53C8FF]">Channel Name</label>
              <input 
                  value={name}
                  onChange={e => { setName(e.target.value); }}
                  className="w-full bg-[#050819] border border-white/10 rounded-xl p-4 text-white focus:border-[#53C8FF] outline-none font-bold"
                  placeholder="e.g. Daily News"
              />
          </div>

          <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-[#53C8FF]">Description</label>
              <textarea 
                  value={description}
                  onChange={e => { setDescription(e.target.value); }}
                  className="w-full bg-[#050819] border border-white/10 rounded-xl p-4 text-white focus:border-[#53C8FF] outline-none text-sm min-h-[100px] resize-none"
                  placeholder="What is this channel about?"
              />
          </div>

          <div className="flex justify-end gap-3 pt-4">
              <button 
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl text-sm font-bold text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              >
                  Cancel
              </button>
              <button 
                  onClick={handleSave}
                  disabled={loading || !name.trim()}
                  className="px-6 py-3 bg-[#53C8FF] text-[#0A0F1F] rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-lg shadow-[#53C8FF]/20 disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
              >
                  {loading && <div className="w-4 h-4 border-2 border-[#0A0F1F]/30 border-t-[#0A0F1F] rounded-full animate-spin" />}
                  Save Changes
              </button>
          </div>
      </div>
    </Modal>
  );
};
