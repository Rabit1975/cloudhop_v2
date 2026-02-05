import React, { useState, useRef } from 'react';
import { Icons } from '../constants';

// Simple icon components for missing icons
const Minimize2 = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
  </svg>
);

const Maximize2 = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M15 3h6v6M9 21H3v-6M21 3l-6 6M3 21l6-6" />
  </svg>
);

const X = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const ExternalLink = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15,3 21,3 21,9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

interface SimpMusicIntegrationProps {
  onClose?: () => void;
}

const SimpMusicIntegration: React.FC<SimpMusicIntegrationProps> = ({ onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const simpmusicUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ'; // Temporary working video while SimpMusic is deployed
  const simpmusicDirectUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Direct link for fallback

  return (
    <div
      className={`h-full w-full flex flex-col bg-[#0E1430] ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-[#0E1430] to-[#1a1f3a]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#53C8FF] to-[#A3E7FF] rounded-lg flex items-center justify-center shadow-lg">
            <Icons.Music className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">SimpMusic</h3>
            <p className="text-xs text-white/60">Professional YouTube Music Player</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1"></span>
            Live
          </div>
          <button
            onClick={toggleFullscreen}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all hover:scale-105"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all hover:scale-105"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#0E1430] to-[#1a1f3a]">
          <div className="text-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-[#53C8FF] rounded-full">
                <div className="absolute inset-0 border-4 border-transparent animate-spin rounded-full border-t-[#53C8FF]"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Icons.Music className="w-6 h-6 text-[#53C8FF]" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mt-4 mb-2">Loading SimpMusic</h3>
            <p className="text-white/60 text-sm">Preparing your music experience...</p>
          </div>
        </div>
      )}

      {/* SimpMusic Iframe */}
      <div className="flex-1 relative">
        <iframe
          ref={iframeRef}
          src={simpmusicUrl}
          className={`w-full h-full border-0 ${isLoading ? 'hidden' : ''}`}
          onLoad={handleIframeLoad}
          title="SimpMusic Player"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
        />

        {/* Fallback for iframe blocked */}
        <div
          className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0E1430] to-[#1a1f3a] ${!isLoading ? 'hidden' : ''}`}
        >
          <div className="text-center max-w-md p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#53C8FF] to-[#A3E7FF] rounded-lg flex items-center justify-center mx-auto mb-6 shadow-lg">
              <ExternalLink className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">SimpMusic Integration</h3>
            <p className="text-white/80 text-sm mb-6 leading-relaxed">
              SimpMusic is being deployed to cloudhop.cloud domain. For now, enjoy this temporary
              music experience while we prepare the full integration:
            </p>
            <a
              href={simpmusicDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#53C8FF] to-[#A3E7FF] text-black font-medium rounded-lg hover:from-[#A3E7FF] hover:to-[#53C8FF] transition-all transform hover:scale-105 shadow-lg"
            >
              <ExternalLink className="w-5 h-5" />
              Open Video
            </a>
            <p className="text-xs text-white/40 mt-4">Full SimpMusic integration coming soon!</p>
          </div>
        </div>
      </div>

      {/* Footer with controls */}
      <div className="p-4 border-t border-white/10 bg-gradient-to-r from-[#0E1430] to-[#1a1f3a]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#53C8FF] to-[#A3E7FF] rounded-lg flex items-center justify-center">
              <Icons.Music className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-white">SimpMusic Integration</p>
              <p className="text-xs text-white/60">Professional YouTube Music Experience</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => iframeRef.current?.contentWindow?.postMessage({ action: 'play' }, '*')}
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all hover:scale-105"
              title="Play"
            >
              <Icons.Play className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                iframeRef.current?.contentWindow?.postMessage({ action: 'pause' }, '*')
              }
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all hover:scale-105"
              title="Pause"
            >
              <Icons.Pause className="w-4 h-4" />
            </button>
            <button
              onClick={() => iframeRef.current?.contentWindow?.postMessage({ action: 'next' }, '*')}
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all hover:scale-105"
              title="Next Track"
            >
              <Icons.SkipForward className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-white/20 mx-1"></div>
            <button
              onClick={() => window.open(simpmusicDirectUrl, '_blank')}
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all hover:scale-105"
              title="Open in New Tab"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpMusicIntegration;
