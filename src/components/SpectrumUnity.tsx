// React Spectrum Component with Unity Integration
import React, { useEffect, useRef, useState } from 'react';
import { useSpectrumState } from '../core/spectrum/SpectrumState';
import { useUnitySpectrum, UnitySpectrumData } from '../core/unity/UnityBridge';

interface SpectrumUnityProps {
  className?: string;
  unityBuildUrl?: string;
}

export const SpectrumUnity: React.FC<SpectrumUnityProps> = ({ 
  className = '',
  unityBuildUrl = '/unity-build'
}) => {
  const spectrumState = useSpectrumState();
  const { isReady, sendData, loadUnity } = useUnitySpectrum();
  const containerRef = useRef<HTMLDivElement>(null);
  const [unityLoaded, setUnityLoaded] = useState(false);

  // Load Unity when component mounts
  useEffect(() => {
    if (!unityLoaded && containerRef.current) {
      loadUnity(unityBuildUrl)
        .then(() => {
          setUnityLoaded(true);
          console.log('Unity WebGL loaded successfully');
        })
        .catch((error) => {
          console.error('Failed to load Unity WebGL:', error);
        });
    }
  }, [unityBuildUrl, unityLoaded, loadUnity]);

  // Send spectrum data to Unity when state changes
  useEffect(() => {
    if (isReady && spectrumState) {
      const unityData: UnitySpectrumData = {
        frequencies: {
          subBass: spectrumState.audio.bands.subBass,
          bass: spectrumState.audio.bands.bass,
          lowMid: spectrumState.audio.bands.lowMid,
          mid: spectrumState.audio.bands.mid,
          highMid: spectrumState.audio.bands.highMid,
          high: spectrumState.audio.bands.high,
          ultraHigh: spectrumState.audio.bands.ultraHigh,
        },
        emotional: {
          energy: spectrumState.emotional.energy,
          valence: spectrumState.emotional.valence,
          arousal: spectrumState.emotional.arousal,
          tension: spectrumState.emotional.tension,
        },
        visual: {
          particleCount: spectrumState.visual.particleCount,
          colorIntensity: spectrumState.visual.colorIntensity,
          motionSpeed: spectrumState.visual.motionSpeed,
          patternComplexity: spectrumState.visual.patternComplexity,
        },
        space: {
          mood: spectrumState.space.mood,
          energy: spectrumState.space.energy,
          activity: spectrumState.space.activity,
        },
        track: {
          isPlaying: spectrumState.track.isPlaying,
          position: spectrumState.track.position,
          tempo: spectrumState.audio.tempo,
        },
        timestamp: Date.now(),
      };

      sendData(unityData);
    }
  }, [spectrumState, isReady, sendData]);

  return (
    <div className={`spectrum-unity-container ${className}`} style={{ 
      width: '100%', 
      height: '100%', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Unity WebGL Container */}
      <div 
        ref={containerRef}
        id="unity-container"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
      
      {/* Loading overlay */}
      {!unityLoaded && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2a 100%)',
          color: '#ffffff',
          fontSize: '18px',
          zIndex: 10
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              border: '3px solid #ffffff30',
              borderTopColor: '#00ffff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }} />
            <div>Loading Spectrum Visualization...</div>
            <div style={{ fontSize: '14px', opacity: 0.7, marginTop: '10px' }}>
              Initializing Unity WebGL
            </div>
          </div>
        </div>
      )}
      
      {/* Status indicator */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        padding: '5px 10px',
        background: isReady ? '#00ff0030' : '#ff000030',
        border: `1px solid ${isReady ? '#00ff00' : '#ff0000'}`,
        borderRadius: '4px',
        color: '#ffffff',
        fontSize: '12px',
        zIndex: 20
      }}>
        Unity: {isReady ? 'Connected' : 'Loading'}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SpectrumUnity;
