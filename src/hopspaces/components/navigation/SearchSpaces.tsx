import React from 'react';

interface SearchSpacesProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const SearchSpaces: React.FC<SearchSpacesProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search spaces..."
        value={searchQuery}
        onChange={e => onSearchChange(e.target.value)}
        className="
          w-full p-2 pl-8 bg-white/10 border border-white/20 rounded-lg
          text-white placeholder-white/40 text-sm
          focus:outline-none focus:border-white/40 focus:bg-white/15
          transition-all duration-200
        "
      />
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/40">🔍</div>
    </div>
  );
};
