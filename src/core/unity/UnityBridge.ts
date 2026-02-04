// Unity Bridge for CloudHop Spectrum Integration
// This handles communication between React and Unity WebGL

import React from 'react';

export interface UnitySpectrumData {
  // Audio frequencies (0-1)
  frequencies: {
    subBass: number;    // 20-60 Hz
    bass: number;        // 60-250 Hz
    lowMid: number;     // 250-500 Hz
    mid: number;        // 500-2000 Hz
    highMid: number;    // 2000-4000 Hz
    high: number;       // 4000-6000 Hz
    ultraHigh: number;  // 6000-20000 Hz
  };
  
  // Emotional state
  emotional: {
    energy: number;     // 0-1, calm to energetic
    valence: number;    // 0-1, sad to happy
    arousal: number;    // 0-1, relaxed to alert
    tension: number;    // 0-1, relaxed to tense
  };
  
  // Visual parameters
  visual: {
    particleCount: number;
    colorIntensity: number;
    motionSpeed: number;
    patternComplexity: number;
  };
  
  // Space information
  space: {
    mood: string;       // calm, dreamy, intense, etc.
    energy: number;     // 0-1
    activity: number;   // 0-1
  };
  
  // Track info
  track: {
    isPlaying: boolean;
    position: number;   // 0-1
    tempo: number;      // BPM
  };
  
  timestamp: number;
}

export class UnityBridge {
  private unityInstance: any = null;
  private isReady: boolean = false;
  private dataQueue: UnitySpectrumData[] = [];
  
  constructor() {
    this.setupUnityLoader();
  }
  
  private setupUnityLoader(): void {
    // Unity WebGL loader will be available when Unity loads
    (window as any).unityInstance = null;
    
    // Listen for Unity ready message
    window.addEventListener('message', (event) => {
      if (event.data.type === 'unity-ready') {
        this.onUnityReady(event.data.instance);
      }
    });
  }
  
  private onUnityReady(instance: any): void {
    this.unityInstance = instance;
    this.isReady = true;
    
    // Send queued data
    while (this.dataQueue.length > 0) {
      const data = this.dataQueue.shift();
      if (data) {
        this.sendToUnity(data);
      }
    }
  }
  
  public sendSpectrumData(data: UnitySpectrumData): void {
    if (this.isReady && this.unityInstance) {
      this.sendToUnity(data);
    } else {
      // Queue data until Unity is ready
      this.dataQueue.push(data);
    }
  }
  
  private sendToUnity(data: UnitySpectrumData): void {
    try {
      // Send data to Unity via SendMessage
      this.unityInstance.SendMessage(
        'SpectrumController',    // Target GameObject
        'UpdateSpectrumData',   // Method name
        JSON.stringify(data)     // Data as JSON string
      );
    } catch (error) {
      console.error('Failed to send data to Unity:', error);
    }
  }
  
  public isUnityReady(): boolean {
    return this.isReady;
  }
  
  // Method to load Unity WebGL build
  public loadUnityBuild(buildUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `${buildUrl}/Build/UnityLoader.js`;
      script.onload = () => {
        // Unity loader loaded, create game object
        const unityContainer = document.createElement('div');
        unityContainer.id = 'unity-container';
        unityContainer.style.width = '100%';
        unityContainer.style.height = '100%';
        unityContainer.style.position = 'absolute';
        unityContainer.style.top = '0';
        unityContainer.style.left = '0';
        
        document.body.appendChild(unityContainer);
        
        // Create Unity instance
        (window as any).createUnityInstance(unityContainer, `${buildUrl}/Build/cloudhop-spectrum.json`, {
          onProgress: (progress: number) => {
            console.log(`Unity loading progress: ${progress * 100}%`);
          },
          onSuccess: (instance: any) => {
            this.onUnityReady(instance);
            resolve();
          },
          onError: (error: any) => {
            reject(error);
          }
        });
      };
      script.onerror = () => reject(new Error('Failed to load Unity WebGL'));
      document.head.appendChild(script);
    });
  }
}

// Singleton instance
export const unityBridge = new UnityBridge();

// React hook for Unity integration
export function useUnitySpectrum() {
  const [isReady, setIsReady] = React.useState(false);
  
  React.useEffect(() => {
    const checkReady = () => {
      setIsReady(unityBridge.isUnityReady());
    };
    
    const interval = setInterval(checkReady, 100);
    return () => clearInterval(interval);
  }, []);
  
  return {
    isReady,
    sendData: unityBridge.sendSpectrumData.bind(unityBridge),
    loadUnity: unityBridge.loadUnityBuild.bind(unityBridge)
  };
}
