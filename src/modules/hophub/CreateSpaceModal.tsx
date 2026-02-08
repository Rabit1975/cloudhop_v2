import React, { useState } from 'react';

interface CreateSpaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSpace: (data: any) => void;
}

export const CreateSpaceModal: React.FC<CreateSpaceModalProps> = ({
  isOpen,
  onClose,
  onCreateSpace,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateSpace({ name, description, type: 'ideas', mood: 'calm' });
    setName('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#1A2348] p-6 rounded-xl border border-white/10 w-full max-w-md">
        <h2 className="text-xl font-bold text-white mb-4">Create New Space</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-white/60 mb-1">Space Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#080C22] border border-white/10 rounded p-2 text-white focus:border-[#53C8FF] outline-none"
              placeholder="e.g. Creative Zone"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#080C22] border border-white/10 rounded p-2 text-white focus:border-[#53C8FF] outline-none"
              placeholder="What is this space for?"
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white/60 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#53C8FF] text-black font-bold rounded hover:bg-[#53C8FF]/90"
            >
              Create Space
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
