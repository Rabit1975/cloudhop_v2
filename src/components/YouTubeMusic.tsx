import React from 'react';
import { Icons } from '../constants';
import YouTubeMusicGlyph from './glyphs/YouTubeMusicGlyph';
import { useScrollFadeIn } from '../hooks/useScrollFadeIn';
import { useNebulaDrift } from '../hooks/useNebulaDrift';
import { useNebulaColorShift } from '../hooks/useNebulaColorShift';
import { useNebulaPulse } from '../hooks/useNebulaPulse';
import { useNebulaMorphing } from '../hooks/useNebulaMorphing';

const YouTubeMusic: React.FC = () => {
  const fadeRef = useScrollFadeIn();
  useNebulaDrift();
  useNebulaColorShift(".youtube-music-section");
  useNebulaPulse();
  const { setEmotionalState } = useNebulaMorphing(".youtube-music-section");

  // Demo: Cycle through emotional states every 8 seconds (offset for variety)
  React.useEffect(() => {
    const emotions = ['drift', 'bloom', 'frost', 'storm', 'surge'] as const;
    let index = 2; // Start with 'frost'
    
    const interval = setInterval(() => {
      setEmotionalState(emotions[index]);
      index = (index + 1) % emotions.length;
    }, 8000);

    return () => clearInterval(interval);
  }, [setEmotionalState]);

  return (
    <section className="youtube-music-section nebula-shift relative overflow-hidden">
      {/* Multi-Layer Nebula Stack */}
      <div className="nebula-stack">
        <div className="nebula-layer nebula-A music" data-drift="0.01" />
        <div className="nebula-layer nebula-B music" data-drift="0.03" />
        <div className="nebula-layer nebula-C music" data-drift="0.06" />
        <div className="nebula-layer nebula-stars star-twinkle-fast star-drift" data-drift="0.1" />
        
        {/* Micro Stars for Extra Sparkle */}
        <div className="micro-star star-twinkle-bright" style={{top: '25%', left: '35%'}}></div>
        <div className="micro-star star-twinkle" style={{top: '55%', left: '65%'}}></div>
        <div className="micro-star star-twinkle-fast" style={{top: '35%', left: '15%'}}></div>
        <div className="micro-star star-twinkle-soft" style={{top: '75%', left: '45%'}}></div>
        <div className="micro-star star-twinkle-slow" style={{top: '10%', left: '80%'}}></div>
        <div className="micro-star star-twinkle-bright" style={{top: '65%', left: '20%'}}></div>
      </div>

      {/* Atmospheric Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Mythic Glyph: The Resonance Wave */}
          <div ref={fadeRef} className="fade-in mb-8">
            <div className="relative">
              <YouTubeMusicGlyph size={96} className="hover-glow hover-glow-music" />
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10 rounded-full blur-xl scale-150"></div>
            </div>
          </div>
          
          <h2 ref={fadeRef} className="text-5xl font-black tracking-tight mb-4 uppercase italic bg-gradient-to-r from-[#8ab4ff] to-[#d7aaff] bg-clip-text text-transparent fade-in">
            YouTube Music in CloudHop
          </h2>
          
          <p ref={fadeRef} className="tagline text-2xl text-pink-300 font-medium mb-8 italic fade-in">
            Your soundtrack, woven into your digital atmosphere.
          </p>
          
          <p ref={fadeRef} className="description text-base text-white/80 max-w-3xl mx-auto leading-relaxed fade-in">
            CloudHop integrates YouTube Music directly into your experience, letting you play full music videos, curated playlists, and mood‑based soundscapes that sync with your Presence, your Spaces, and your Emotional Sky. Music becomes part of the world you're in — not just background noise.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="feature-grid grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Feature 1: Full Music Video Playback */}
          <div ref={fadeRef} className="feature-card bg-white/4 border border-white/8 p-7 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:transform hover:-translate-y-6 hover:border-white/18 fade-in hover-glow hover-glow-music">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Full Music Video Playback</h3>
            </div>
            
            <p className="text-white/70 leading-relaxed">
              Not just audio — the full experience. CloudHop plays full YouTube Music videos with seamless background playback, adaptive quality, and mood‑aware transitions.
            </p>
            
            <div className="mt-6 flex items-center gap-2 text-purple-300 text-sm font-medium">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              <span>HD video + audio</span>
            </div>
          </div>

          {/* Feature 2: Mood-Based Soundscapes */}
          <div ref={fadeRef} className="feature-card bg-white/4 border border-white/8 p-7 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:transform hover:-translate-y-6 hover:border-white/18 fade-in hover-glow hover-glow-music">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Mood‑Based Soundscapes</h3>
            </div>
            
            <p className="text-white/70 leading-relaxed">
              Your emotional weather controls the soundtrack. The Emotional Sky and Presence Orb influence playlists, genres, and energy levels. Your world sounds like how you feel.
            </p>
            
            <div className="mt-6 flex items-center gap-2 text-pink-300 text-sm font-medium">
              <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
              <span>Emotion-aware playlists</span>
            </div>
          </div>

          {/* Feature 3: Shared Listening in Spaces */}
          <div ref={fadeRef} className="feature-card bg-white/4 border border-white/8 p-7 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:transform hover:-translate-y-6 hover:border-white/18 fade-in hover-glow hover-glow-music">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Shared Listening in Spaces</h3>
            </div>
            
            <p className="text-white/70 leading-relaxed">
              Listen together, anywhere. Spaces let you sync playback with friends, switch DJs, and create collaborative playlists that evolve with the group.
            </p>
            
            <div className="mt-6 flex items-center gap-2 text-orange-300 text-sm font-medium">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              <span>Collaborative sessions</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div ref={fadeRef} className="text-center fade-in">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-2xl">
            Connect YouTube Music
          </button>
        </div>
      </div>
    </section>
  );
};

export default YouTubeMusic;
