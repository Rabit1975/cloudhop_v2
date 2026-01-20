import React, { useEffect, useRef } from 'react';

interface ChatOptionsMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export const ChatOptionsMenu: React.FC<ChatOptionsMenuProps> = ({
  onEdit,
  onDelete,
  onClose
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div 
        ref={menuRef}
        className="absolute right-2 top-8 z-50 bg-[#0E1430] border border-white/10 rounded-xl shadow-xl flex flex-col min-w-[120px] overflow-hidden animate-fade-in"
    >
      <button 
        onClick={(e) => { e.stopPropagation(); onEdit(); }}
        className="px-4 py-2.5 text-left text-xs font-bold text-white hover:bg-white/5 hover:text-[#53C8FF] transition-colors flex items-center gap-2"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        Edit
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
        className="px-4 py-2.5 text-left text-xs font-bold text-white hover:bg-red-500/10 hover:text-red-500 transition-colors flex items-center gap-2 border-t border-white/5"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
        Delete
      </button>
    </div>
  );
};
