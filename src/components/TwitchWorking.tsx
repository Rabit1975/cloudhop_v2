import React, { useState, useEffect } from 'react';
import TwitchGlyph from './glyphs/TwitchGlyph';
import { useScrollFadeIn } from '../hooks/useScrollFadeIn';
import { TwitchEmbed, TwitchChat } from './twitch/TwitchEmbed';
import { twitchService } from '../services/twitchService';
import { TwitchValidator } from '../core/twitch/validation';
import RealYouTubeMusic from './RealYouTubeMusic';

const Twitch: React.FC = () => {
  const fadeRef = useScrollFadeIn();
  const [demoChannel, setDemoChannel] = useState('cloudhop');
  const [streamInfo, setStreamInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);

  useEffect(() => {
    const loadStreamInfo = async () => {
      try {
        setIsLoading(true);
        const info = await twitchService.getStreamInfo(demoChannel);
        setStreamInfo(info);
      } catch (error) {
        console.error('Error loading stream info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStreamInfo();
  }, [demoChannel]);

  const handleChannelChange = (newChannel: string) => {
    try {
      const validatedChannel = TwitchValidator.validateChannel(newChannel);
      setDemoChannel(validatedChannel);
    } catch (error) {
      console.error('Invalid channel name:', error);
    }
  };

  return (
    <section className="twitch-section nebula-shift relative overflow-hidden">
      {/* Nebula Background */}
      <div className="nebula-stack">
        <div className="nebula-layer nebula-A twitch" data-drift="0.01" />
        <div className="nebula-layer nebula-B twitch" data-drift="0.03" />
        <div className="nebula-layer nebula-C twitch" data-drift="0.06" />
        <div
          className="nebula-layer nebula-stars star-twinkle-bright star-drift"
          data-drift="0.1"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div ref={fadeRef} className="fade-in mb-8">
            <div className="relative">
              <TwitchGlyph size={96} className="hover-glow hover-glow-twitch" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-xl scale-150"></div>
            </div>
          </div>

          <h2
            ref={fadeRef}
            className="text-5xl font-black tracking-tight mb-4 uppercase italic bg-gradient-to-r from-[#8ab4ff] to-[#d7aaff] bg-clip-text text-transparent fade-in"
          >
            Twitch in CloudHop
          </h2>

          <p
            ref={fadeRef}
            className="tagline text-2xl text-blue-300 font-medium mb-8 italic fade-in"
          >
            Go live. Go together. Go beyond.
          </p>
        </div>

        {/* YouTube Music Section */}
        <div ref={fadeRef} className="fade-in mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">YouTube Music</h3>
            <p className="text-white/60">Simple API key integration - search and play any music</p>
          </div>
          <RealYouTubeMusic />
        </div>

        {/* Stream Demo */}
        <div ref={fadeRef} className="text-center fade-in mb-16">
          <button
            onClick={() => setShowEmbed(!showEmbed)}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            {showEmbed ? 'Hide Stream Demo' : 'Watch Stream Demo'}
          </button>
        </div>

        {showEmbed && (
          <div ref={fadeRef} className="fade-in mb-16">
            <div className="bg-white/4 border border-white/8 rounded-2xl backdrop-blur-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Live Stream Demo</h3>

              <div className="mb-6">
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={demoChannel}
                    onChange={e => handleChannelChange(e.target.value)}
                    placeholder="Enter Twitch channel name"
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={() => {
                      const info = twitchService.getStreamInfo(demoChannel);
                      setStreamInfo(info);
                    }}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Check
                  </button>
                </div>
              </div>

              {streamInfo && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <TwitchEmbed channel={demoChannel} height={400} className="w-full" />
                  </div>
                  <div>
                    <TwitchChat channel={demoChannel} height={400} className="w-full" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Twitch;
