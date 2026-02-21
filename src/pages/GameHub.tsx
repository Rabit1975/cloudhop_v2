import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search, Play, ChevronLeft, ChevronRight, X, RotateCcw, Maximize2,
  Star, Clock, Gamepad2, Settings, Bell,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import robotNinja from '../assets/robot-ninja.png';

interface Game {
  id: string;
  name: string;
  category: string;
}

interface GameSession {
  gameId: string;
  lastPlayed: Date;
  playTime?: number;
}

interface SpectrumData {
  frequencies: number[];
  emotionalState: {
    energy: number;
    valence: number;
    arousal: number;
    tension: number;
  };
  visualParams: {
    intensity: number;
    speed: number;
    mood: string;
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  Action: 'from-red-600 to-orange-500',
  Puzzle: 'from-blue-600 to-cyan-500',
  Sports: 'from-green-600 to-emerald-500',
  Adventure: 'from-amber-600 to-yellow-500',
  Social: 'from-pink-600 to-rose-500',
  Classic: 'from-gray-600 to-slate-500',
  Strategy: 'from-purple-600 to-violet-500',
  Idle: 'from-teal-600 to-cyan-500',
  Arcade: 'from-orange-600 to-red-500',
  Racing: 'from-indigo-600 to-purple-500',
  Horror: 'from-slate-700 to-slate-900',
  Platformer: 'from-lime-600 to-green-500',
};

const CATEGORY_EMOJI: Record<string, string> = {
  Action: '⚔️',
  Puzzle: '🧩',
  Sports: '⚽',
  Adventure: '🗺️',
  Social: '👥',
  Classic: '🕹️',
  Strategy: '♟️',
  Idle: '⏳',
  Arcade: '🎮',
  Racing: '🏎️',
  Horror: '👻',
  Platformer: '🏃',
};

export default function GameHub() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [continuePlaying, setContinuePlaying] = useState<GameSession[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isUnityMode, setIsUnityMode] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioAnalyser, setAudioAnalyser] = useState<AnalyserNode | null>(null);
  const [audioData, setAudioData] = useState<number[]>(new Array(7).fill(0));
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const carouselIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioLoopRef = useRef<number | null>(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const response = await fetch('/games-manifest.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch games: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Loaded games data:', data);
        console.log('Games array length:', data.games?.length);
        
        // Ensure games array exists and has valid data
        const validGames = Array.isArray(data.games) ? data.games : [];
        setGames(validGames);
        
        // Create continue playing sessions with proper error handling
        const sessions = validGames.slice(0, 3).map((game: Game) => ({
          gameId: game.id,
          lastPlayed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
          playTime: Math.floor(Math.random() * 120) + 20,
        }));
        setContinuePlaying(sessions);
      } catch (error) {
        console.error('Error loading games:', error);
        // Set empty games array so the UI still renders
        setGames([]);
        setContinuePlaying([]);
      }
    };

    loadGames();
  }, []);

  // Audio analysis for Unity integration
  useEffect(() => {
    if (isUnityMode && !audioContext) {
      const initAudio = async () => {
        try {
          const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const analyser = ctx.createAnalyser();
          analyser.fftSize = 2048;
          
          // Try to get audio input (microphone)
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const source = ctx.createMediaStreamSource(stream);
            source.connect(analyser);
          } catch (err) {
            console.warn('Microphone access denied, using system audio analysis');
            // Fallback: create a dummy audio source for analysis
            const oscillator = ctx.createOscillator();
            const gain = ctx.createGain();
            oscillator.connect(gain);
            gain.connect(analyser);
            oscillator.start();
          }

          setAudioContext(ctx);
          setAudioAnalyser(analyser);

          // Start audio analysis loop
          startAudioAnalysis(analyser);
        } catch (err) {
          console.error('Failed to initialize audio:', err);
        }
      };

      initAudio();
    } else if (!isUnityMode && audioContext) {
      // Clean up audio when exiting Unity mode
      stopAudioAnalysis();
      audioContext.close();
      setAudioContext(null);
      setAudioAnalyser(null);
    }
  }, [isUnityMode]);

  const startAudioAnalysis = (analyser: AnalyserNode) => {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const analyzeAudio = () => {
      analyser.getByteFrequencyData(dataArray);
      
      // Map frequency bands to 7 ranges
      const bands = [
        { start: 0, end: 10 },      // Sub-bass (20-60 Hz)
        { start: 11, end: 30 },     // Bass (60-250 Hz)
        { start: 31, end: 60 },     // Low-mid (250-500 Hz)
        { start: 61, end: 120 },    // Mid (500-2kHz)
        { start: 121, end: 240 },   // High-mid (2-4kHz)
        { start: 241, end: 480 },   // High (4-6kHz)
        { start: 481, end: bufferLength - 1 }  // Ultra-high (6-20kHz)
      ];

      const frequencies = bands.map(band => {
        let sum = 0;
        for (let i = band.start; i <= band.end; i++) {
          sum += dataArray[i];
        }
        return sum / (band.end - band.start + 1) / 255; // Normalize 0-1
      });

      setAudioData(frequencies);

      // Send data to Unity
      sendSpectrumData(frequencies);

      if (isUnityMode) {
        audioLoopRef.current = requestAnimationFrame(analyzeAudio);
      }
    };

    analyzeAudio();
  };

  const stopAudioAnalysis = () => {
    if (audioLoopRef.current) {
      cancelAnimationFrame(audioLoopRef.current);
      audioLoopRef.current = null;
    }
  };

  const sendSpectrumData = (frequencies: number[]) => {
    // Calculate emotional state from frequencies
    const energy = Math.max(...frequencies);
    const valence = frequencies[3] / frequencies[1]; // Mid vs Bass ratio
    const arousal = frequencies[5] / frequencies[2]; // High vs Low-mid ratio
    const tension = frequencies[6] / frequencies[0]; // Ultra-high vs Sub-bass ratio

    const spectrumData: SpectrumData = {
      frequencies,
      emotionalState: {
        energy: Math.min(energy, 1),
        valence: Math.min(valence, 1),
        arousal: Math.min(arousal, 1),
        tension: Math.min(tension, 1)
      },
      visualParams: {
        intensity: energy * 2,
        speed: arousal * 2,
        mood: energy > 0.7 ? 'intense' : energy > 0.3 ? 'calm' : 'dreamy'
      }
    };

    // Send to Unity iframe
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage({
        type: 'spectrum',
        payload: spectrumData
      }, '*');
    }
  };

  // Auto-rotate carousel
  useEffect(() => {
    if (games.length > 0) {
      carouselIntervalRef.current = setInterval(() => {
        setCarouselIndex((prev) => (prev + 1) % games.length);
      }, 5000);
    }
    return () => {
      if (carouselIntervalRef.current) clearInterval(carouselIntervalRef.current);
    };
  }, [games.length]);

  const filteredGames = games.filter((g) =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredGame = games[carouselIndex] || selectedGame;
  const continuePlayingGames = continuePlaying
    .map((session) => games.find((g) => g.id === session.gameId))
    .filter(Boolean) as Game[];

  const handleFullscreen = () => iframeRef.current?.requestFullscreen?.();
  const handleReload = () => {
    if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
  };

  const handleCarouselPrev = () => {
    setCarouselIndex((prev) => (prev - 1 + games.length) % games.length);
  };

  const handleCarouselNext = () => {
    setCarouselIndex((prev) => (prev + 1) % games.length);
  };

  /* Unity Mode */
  if (isUnityMode) {
    return (
      <div className="h-full w-full flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-slate-900 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xl">🎵</span>
            <div>
              <p className="text-white font-bold text-sm">Unity Spectrum</p>
              <p className="text-cyan-400 text-[11px]">Audio Visualizer</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleFullscreen} className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all">
              <Maximize2 className="w-4 h-4" />
            </button>
            <button onClick={() => setIsUnityMode(false)} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 transition-all text-sm font-bold">
              <X className="w-3.5 h-3.5" /> Exit
            </button>
          </div>
        </div>
        <div className="flex-1 relative overflow-hidden">
          <iframe
            ref={iframeRef}
            src="/unity-spectrum/index.html"
            title="Unity Spectrum"
            className="absolute inset-0 w-full h-full border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          />
        </div>
        {/* Audio Visualization Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
          <div className="flex-1 bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <div className="flex justify-between text-xs text-white mb-2">
              <span>Audio Spectrum</span>
              <span>{Math.max(...audioData).toFixed(2)}</span>
            </div>
            <div className="flex gap-1">
              {audioData.map((freq, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-cyan-500 to-magenta-500 rounded-sm"
                  style={{ height: `${freq * 60}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* Playing State */
  if (isPlaying && selectedGame) {
    return (
      <div className="h-full w-full flex flex-col bg-slate-950">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-slate-900 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xl">{CATEGORY_EMOJI[selectedGame.category] || '🎮'}</span>
            <div>
              <p className="text-white font-bold text-sm">{selectedGame.name}</p>
              <p className="text-purple-400 text-[11px]">{selectedGame.category}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleReload} className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all">
              <RotateCcw className="w-4 h-4" />
            </button>
            <button onClick={handleFullscreen} className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all">
              <Maximize2 className="w-4 h-4" />
            </button>
            <button onClick={() => setIsPlaying(false)} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-400/50 text-purple-300 hover:bg-purple-500/30 transition-all text-sm font-bold">
              <X className="w-3.5 h-3.5" /> Exit
            </button>
          </div>
        </div>
        <div className="flex-1 relative overflow-hidden">
          <iframe
            ref={iframeRef}
            src={`/games/${selectedGame.id}/index.html`}
            title={selectedGame.name}
            className="absolute inset-0 w-full h-full border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          />
        </div>
      </div>
    );
  }

  /* Main Dashboard */
  return (
    <div className="h-full w-full overflow-y-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Header with Search */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600">
                STRIKEFORCE
              </h1>
              <p className="text-slate-400 text-sm mt-1">Battle Arena Gaming Platform</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
              <button className="p-2.5 rounded-full bg-slate-800/50 border border-slate-700 hover:bg-slate-700 transition-colors">
                <Bell className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Featured Hero with Robot Ninja */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-700 h-96 group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 to-orange-900/40">
              <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Robot Ninja Image */}
            <img
              src="/Robotninja .png"
              alt="Robot Ninja Strikeforce"
              className="absolute right-0 top-0 h-full object-cover opacity-85"
            />

            <div className="absolute inset-0 flex flex-col justify-between p-8 z-10">
              <div className="flex items-center gap-2">
                <span className="px-4 py-2 rounded-full bg-red-600/80 border border-red-500/50 text-xs font-black text-white">
                  ⚡ WELCOME TO STRIKEFORCE
                </span>
              </div>
              <div className="space-y-4 max-w-lg">
                <div>
                  <h2 className="text-5xl font-black text-white mb-2">Battle Arena</h2>
                  <p className="text-slate-300">Elite Gaming Platform</p>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Enter the combat zone. Master epic battles and claim your glory across our entire game collection.
                </p>
                <div className="flex items-center gap-3 pt-4">
                  <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold flex items-center gap-2 transition-all active:scale-95">
                    <Gamepad2 className="w-5 h-5" />
                    Explore Games
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Game Carousel - All games scrolling */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-white">All Games - Battle Collection</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleCarouselPrev}
                  className="p-2 rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleCarouselNext}
                  className="p-2 rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Horizontally Scrolling Carousel */}
            <div className="relative group">
              <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
                <div className="flex gap-4 pb-4 min-w-min">
                  {(searchQuery ? filteredGames : games).map((game) => (
                    <button
                      key={game.id}
                      onClick={() => {
                        setSelectedGame(game);
                        setIsPlaying(true);
                      }}
                      className="group relative rounded-lg overflow-hidden border border-slate-700 hover:border-red-500/50 transition-all hover:shadow-lg hover:shadow-red-500/20 flex-shrink-0"
                      style={{ width: '140px' }}
                    >
                      <div className={cn('relative h-40 bg-gradient-to-br flex items-center justify-center', CATEGORY_COLORS[game.category] || CATEGORY_COLORS.Arcade)}>
                        <span className="text-4xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all">{CATEGORY_EMOJI[game.category] || '🎮'}</span>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                          <Play className="w-6 h-6 text-white fill-white" />
                        </div>
                      </div>
                      <div className="p-2.5 bg-slate-900">
                        <h3 className="font-bold text-white text-[11px] leading-tight line-clamp-2 group-hover:text-red-400 transition-colors">
                          {game.name}
                        </h3>
                        <span className="text-[9px] text-slate-500 mt-0.5 block">{game.category}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Gradient fade for scrolling effect */}
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />
            </div>

            <p className="text-xs text-slate-500 mt-2">Showing {(searchQuery ? filteredGames : games).length} games</p>
          </div>

          {/* Continue Playing */}
          {continuePlayingGames.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-black text-white">Continue Playing</h2>
              <div className="space-y-3">
                {continuePlayingGames.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => {
                      setSelectedGame(game);
                      setIsPlaying(true);
                    }}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-red-500/50 hover:bg-slate-800 transition-all group"
                  >
                    <div className={cn('w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br', CATEGORY_COLORS[game.category] || CATEGORY_COLORS.Arcade)}>
                      <span className="text-3xl">{CATEGORY_EMOJI[game.category] || '🎮'}</span>
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-white group-hover:text-red-400 transition-colors">{game.name}</h3>
                      <p className="text-xs text-slate-400">Last played 2 hours ago</p>
                      <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 to-orange-500" style={{ width: '65%' }} />
                      </div>
                    </div>
                    <Play className="w-5 h-5 text-slate-400 group-hover:text-red-400 transition-colors flex-shrink-0 fill-current" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Welcome Message */}
          {!searchQuery && (
            <div className="rounded-xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 p-6">
              <h3 className="text-2xl font-black text-white mb-2">Welcome to STRIKEFORCE</h3>
              <p className="text-slate-400">Select a game from the arena and dominate the competition. Every battle counts!</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
