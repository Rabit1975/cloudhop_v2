import React from 'react';

interface CreateSpaceButtonProps {
  onCreateSpace: () => void;
}

export const CreateSpaceButton: React.FC<CreateSpaceButtonProps> = ({ onCreateSpace }) => {
  return (
    <button
      onClick={onCreateSpace}
      className="
        w-full p-3 bg-gradient-to-r from-purple-600 to-blue-600 
        hover:from-purple-700 hover:to-blue-700
        rounded-lg font-medium text-white text-sm
        transition-all duration-200 transform hover:scale-105
        flex items-center justify-center gap-2
      "
    >
      <span className="text-lg">+</span>
      Create New Space
    </button>
  );
};
