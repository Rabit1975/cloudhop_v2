import React, { useState } from 'react';
import { HopSpace } from '../../utils/types';

interface LeonardoAIProps {
  space: HopSpace;
}

export const LeonardoAI: React.FC<LeonardoAIProps> = ({ space }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');

  const getAIContext = (type: string) => {
    switch (type) {
      case 'music':
        return "I'm your AI music composer. I can help you create melodies, harmonies, and rhythms.";
      case 'fluid_art':
        return "I'm your AI art assistant. I can suggest color palettes, brush techniques, and creative ideas.";
      case 'ideas':
        return "I'm your AI brainstorming partner. I can help organize thoughts and generate new concepts.";
      case 'world':
        return "I'm your AI world builder. I can help design environments, scenes, and 3D spaces.";
      case 'anima':
        return "I'm your AI spiritual guide. I can help with symbolic interpretations and ritual design.";
      default:
        return "I'm Leonardo, your AI guide. How can I help you in this space?";
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending to Leonardo:', message);
      setMessage('');
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-white font-medium text-sm uppercase tracking-wider flex items-center gap-2">
          <span>🎭</span>
          Leonardo AI
        </h4>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-white/40 hover:text-white transition-colors"
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {!isExpanded ? (
        <div className="text-white/60 text-xs italic">"{getAIContext(space.type)}"</div>
      ) : (
        <div className="space-y-3">
          <div className="text-white/80 text-xs">{getAIContext(space.type)}</div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask Leonardo anything..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
              className="
                flex-1 p-2 bg-white/10 border border-white/20 rounded
                text-white placeholder-white/40 text-xs
                focus:outline-none focus:border-white/40
              "
            />
            <button
              onClick={handleSendMessage}
              className="px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white text-xs transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
