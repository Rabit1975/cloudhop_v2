import React from 'react';
import { Icons } from '../constants';
import TwitchGlyph from './glyphs/TwitchGlyph';
import { useScrollFadeIn } from '../hooks/useScrollFadeIn';
import { useNebulaDrift } from '../hooks/useNebulaDrift';
import { useNebulaColorShift } from '../hooks/useNebulaColorShift';
import { useNebulaPulse } from '../hooks/useNebulaPulse';
import { useNebulaMorphing } from '../hooks/useNebulaMorphing';

const Twitch: React.FC = () => {
  const fadeRef = useScrollFadeIn();
  // Temporarily disable nebula animations to reduce CPU usage
  // useNebulaDrift();
  // useNebulaColorShift(".twitch-section");
  // useNebulaPulse();
  // const { setEmotionalState } = useNebulaMorphing(".twitch-section");

  // Demo: Cycle through emotional states every 8 seconds (offset for variety)
  // React.useEffect(() => {
  //   const emotions = ['surge', 'storm', 'bloom', 'drift', 'frost'] as const;
  //   let index = 4; // Start with 'frost'
    
  //   const interval = setInterval(() => {
  //     setEmotionalState(emotions[index]);
  //     index = (index + 1) % emotions.length;
  //   }, 8000);

  //   return () => clearInterval(interval);
  // }, [setEmotionalState]);

  return (
    <section className="twitch-section nebula-shift relative overflow-hidden">
      {/* Multi-Layer Nebula Stack */}
      <div className="nebula-stack">
        <div className="nebula-layer nebula-A twitch" data-drift="0.01" />
        <div className="nebula-layer nebula-B twitch" data-drift="0.03" />
        <div className="nebula-layer nebula-C twitch" data-drift="0.06" />
        <div className="nebula-layer nebula-stars star-twinkle-bright star-drift" data-drift="0.1" />
        
        {/* Micro Stars for Extra Sparkle */}
        <div className="micro-star star-twinkle-fast" style={{top: '30%', left: '40%'}}></div>
        <div className="micro-star star-twinkle-slow" style={{top: '50%', left: '60%'}}></div>
        <div className="micro-star star-twinkle-bright" style={{top: '20%', left: '20%'}}></div>
        <div className="micro-star star-twinkle" style={{top: '70%', left: '80%'}}></div>
        <div className="micro-star star-twinkle-fast" style={{top: '45%', left: '10%'}}></div>
        <div className="micro-star star-twinkle-soft" style={{top: '85%', left: '35%'}}></div>
      </div>

      {/* Glitch-Cosmic Background Effects */}
      <div className="absolute inset-0">
        {/* Broadcast signal lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"></div>
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse delay-75 mt-4"></div>
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse delay-150 mt-8"></div>
        </div>
        
        {/* Cosmic glitch orbs */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute bottom-10 left-1/2 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Mythic Glyph: The Broadcast Star */}
          <div ref={fadeRef} className="fade-in mb-8">
            <div className="relative">
              <TwitchGlyph size={96} className="hover-glow hover-glow-twitch" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-xl scale-150"></div>
            </div>
          </div>
          
          <h2 ref={fadeRef} className="text-5xl font-black tracking-tight mb-4 uppercase italic bg-gradient-to-r from-[#8ab4ff] to-[#d7aaff] bg-clip-text text-transparent fade-in">
            Twitch in CloudHop
          </h2>
          
          <p ref={fadeRef} className="tagline text-2xl text-blue-300 font-medium mb-8 italic fade-in">
            Go live. Go together. Go beyond.
          </p>
          
          <p ref={fadeRef} className="description text-base text-white/80 max-w-3xl mx-auto leading-relaxed fade-in">
            CloudHop brings Twitch directly into your digital universe. Watch streams, go live, sync presence with your friends, and turn gameplay into a shared constellation of moments. Whether you're streaming or spectating, CloudHop makes it feel like part of your world.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="feature-grid grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Feature 1: Live Stream Integration */}
          <div ref={fadeRef} className="feature-card bg-white/4 border border-white/8 p-7 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:transform hover:-translate-y-6 hover:border-white/18 fade-in hover-glow hover-glow-twitch">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center relative">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-xl font-bold text-white">Live Stream Integration</h3>
            </div>
            
            <p className="text-white/70 leading-relaxed">
              Your favorite creators, right inside CloudHop. Watch streams with zero friction, switch channels instantly, and keep your presence synced across the OS.
            </p>
            
            <div className="mt-6 flex items-center gap-2 text-purple-300 text-sm font-medium">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              <span>Zero-friction viewing</span>
            </div>
          </div>

          {/* Feature 2: Creator Mode */}
          <div ref={fadeRef} className="feature-card bg-white/4 border border-white/8 p-7 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:transform hover:-translate-y-6 hover:border-white/18 fade-in hover-glow hover-glow-twitch">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center relative">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-xl font-bold text-white">Creator Mode</h3>
            </div>
            
            <p className="text-white/70 leading-relaxed">
              Go live with style. CloudHop overlays your Emotional Sky, Presence Orb, and ambient UI into your stream, giving your broadcast a signature look.
            </p>
            
            <div className="mt-6 flex items-center gap-2 text-blue-300 text-sm font-medium">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span>Signature overlays</span>
            </div>
          </div>

          {/* Feature 3: Watch Parties in Spaces */}
          <div ref={fadeRef} className="feature-card bg-white/4 border border-white/8 p-7 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:transform hover:-translate-y-6 hover:border-white/18 fade-in hover-glow hover-glow-twitch">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center relative">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-xl font-bold text-white">Watch Parties in Spaces</h3>
            </div>
            
            <p className="text-white/70 leading-relaxed">
              Experience streams together. Sync playback in Spaces, chat with friends, and react in real time with CloudHop's expressive reaction system.
            </p>
            
            <div className="mt-6 flex items-center gap-2 text-pink-300 text-sm font-medium">
              <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
              <span>Shared experiences</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div ref={fadeRef} className="text-center fade-in">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-2xl">
            Connect Twitch Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default Twitch;
