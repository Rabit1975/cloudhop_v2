import React, { useState, useRef, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { Button } from '@cloudrabbit/design.actions.button';
import { MusicStudioProject } from '@cloudrabbit/music.entities.music-studio-project';
import { TransportBar } from './transport-bar.js';
import { TimelineTrack } from './timeline-track.js';
import { PlusIcon } from './editor-icons.js';
import type { EditorState, EditorTrack } from './editor-types.js';
import styles from './music-studio-editor.module.scss';

export type MusicStudioEditorProps = {
  /**
   * The project to edit. If not provided, starts with a new empty project.
   */
  project?: MusicStudioProject;
  
  /**
   * Callback when the project is saved.
   */
  onSave?: (project: MusicStudioProject) => void;
  
  /**
   * Callback to publish the project.
   */
  onPublish?: (project: MusicStudioProject) => void;
  
  /**
   * Additional class names.
   */
  className?: string;
};

// Initial mock state generator
const createInitialState = (project?: MusicStudioProject): EditorState => ({
  isPlaying: false,
  currentTime: 0,
  zoomLevel: 50, // 50px per second
  tempo: 120,
  totalDuration: 180, // 3 minutes default canvas
});

const MOCK_TRACK_COLORS = [
  '#FF5252', '#448AFF', '#69F0AE', '#E040FB', '#FFD740', '#64FFDA'
];

export function MusicStudioEditor({ 
  project, 
  onSave, 
  onPublish, 
  className 
}: MusicStudioEditorProps) {
  const [editorState, setEditorState] = useState<EditorState>(() => createInitialState(project));
  const [tracks, setTracks] = useState<EditorTrack[]>([]);
  const [selectedClipId, setSelectedClipId] = useState<string | undefined>(undefined);
  const timelineScrollRef = useRef<HTMLDivElement>(null);
  
  // Initialize tracks from project if available
  useEffect(() => {
    if (project) {
      // Map project layers to editor tracks
      // In a real app this would be more complex parsing
      const initialTracks = project.layers.map((layer, index) => ({
        id: `track-${index}`,
        name: layer.title || `Track ${index + 1}`,
        volume: 0.8,
        isMuted: false,
        isSolo: false,
        color: MOCK_TRACK_COLORS[index % MOCK_TRACK_COLORS.length],
        clips: [{
          id: `clip-${layer.id}`,
          trackId: `track-${index}`,
          startOffset: 0,
          duration: layer.duration,
          audioSource: layer
        }]
      }));
      setTracks(initialTracks);
    } else {
      // Default empty tracks
      setTracks(Array.from({ length: 4 }).map((_, i) => ({
        id: `track-${i}`,
        name: `Audio Track ${i + 1}`,
        volume: 0.8,
        isMuted: false,
        isSolo: false,
        color: MOCK_TRACK_COLORS[i % MOCK_TRACK_COLORS.length],
        clips: []
      })));
    }
  }, [project]);

  // Playback timer loop
  useEffect(() => {
    let animationFrame: number;
    let lastTime: number;

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      setEditorState(prev => {
        if (!prev.isPlaying) return prev;
        const newTime = prev.currentTime + deltaTime;
        if (newTime >= prev.totalDuration) {
           return { ...prev, isPlaying: false, currentTime: 0 };
        }
        return { ...prev, currentTime: newTime };
      });

      if (editorState.isPlaying) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (editorState.isPlaying) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [editorState.isPlaying, editorState.totalDuration]);

  // Keep scroll in sync if needed, or handle playhead autoscroll
  useEffect(() => {
    if (editorState.isPlaying && timelineScrollRef.current) {
      const playheadPos = editorState.currentTime * editorState.zoomLevel;
      const containerWidth = timelineScrollRef.current.clientWidth;
      const {scrollLeft} = timelineScrollRef.current;
      
      // Auto scroll if playhead moves out of view
      if (playheadPos > scrollLeft + containerWidth * 0.8) {
        timelineScrollRef.current.scrollLeft = playheadPos - containerWidth * 0.2;
      }
    }
  }, [editorState.currentTime, editorState.isPlaying, editorState.zoomLevel]);

  const handlePlayPause = useCallback(() => {
    setEditorState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  const handleStop = useCallback(() => {
    setEditorState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
  }, []);

  const handleTrackMute = (trackId: string) => {
    setTracks(prev => prev.map(t => t.id === trackId ? { ...t, isMuted: !t.isMuted } : t));
  };

  const handleTrackSolo = (trackId: string) => {
    setTracks(prev => prev.map(t => t.id === trackId ? { ...t, isSolo: !t.isSolo } : t));
  };

  const handleAddTrack = () => {
    setTracks(prev => [
      ...prev,
      {
        id: `track-${prev.length + 1}-${Date.now()}`,
        name: `Audio Track ${prev.length + 1}`,
        volume: 0.8,
        isMuted: false,
        isSolo: false,
        color: MOCK_TRACK_COLORS[prev.length % MOCK_TRACK_COLORS.length],
        clips: []
      }
    ]);
  };

  const handleZoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditorState(prev => ({ ...prev, zoomLevel: Number(e.target.value) }));
  };

  // Generate timeline ruler markers
  const rulerMarkers = [];
  const secondsStep = 1; 
  for (let i = 0; i < editorState.totalDuration; i += secondsStep) {
    if (i % 5 === 0) {
      rulerMarkers.push(
        <div 
          key={i} 
          className={styles.rulerMarkerMajor} 
          style={{ left: i * editorState.zoomLevel }}
        >
          <span className={styles.rulerTime}>{i}s</span>
        </div>
      );
    } else {
      rulerMarkers.push(
        <div 
          key={i} 
          className={styles.rulerMarkerMinor} 
          style={{ left: i * editorState.zoomLevel }} 
        />
      );
    }
  }

  return (
    <div className={classNames(styles.studioEditor, className)}>
      <header className={styles.topBar}>
        <div className={styles.projectMeta}>
          <div className={styles.logo}>CloudHop Studio</div>
          <div className={styles.divider} />
          <h1 className={styles.projectTitle}>{project?.name || 'Untitled Project'}</h1>
        </div>
        <div className={styles.actions}>
          <div className={styles.zoomControl}>
            <span>Zoom</span>
            <input 
              type="range" 
              min="10" 
              max="200" 
              value={editorState.zoomLevel} 
              onChange={handleZoom} 
              className={styles.zoomSlider}
            />
          </div>
          <Button appearance="secondary" onClick={() => project && onSave && onSave(project)}>
            Save Project
          </Button>
          <Button appearance="primary" onClick={() => project && onPublish && onPublish(project)}>
            Publish
          </Button>
        </div>
      </header>

      <div className={styles.mainArea}>
        {/* Timeline Header Area */}
        <div className={styles.timelineHeader}>
          <div className={styles.trackHeaderSpacer}>
            <Button appearance="tertiary" className={styles.addTrackBtn} onClick={handleAddTrack}>
              <PlusIcon /> Add Track
            </Button>
          </div>
          <div className={styles.rulerContainer} ref={timelineScrollRef}>
            <div 
              className={styles.rulerContent} 
              style={{ width: editorState.totalDuration * editorState.zoomLevel }}
            >
              {rulerMarkers}
              <div 
                className={styles.playheadHandle}
                style={{ left: editorState.currentTime * editorState.zoomLevel }}
              />
            </div>
          </div>
        </div>

        {/* Tracks Area */}
        <div className={styles.timelineBody}>
          <div className={styles.tracksContainer}>
            {tracks.map(track => (
              <TimelineTrack
                key={track.id}
                track={track}
                zoomLevel={editorState.zoomLevel}
                selectedClipId={selectedClipId}
                onClipSelect={setSelectedClipId}
                onMuteToggle={handleTrackMute}
                onSoloToggle={handleTrackSolo}
              />
            ))}
          </div>
          
          {/* Overlay elements like playhead line */}
          <div 
            className={styles.playheadLine}
            style={{ 
              left: `calc(260px + ${editorState.currentTime * editorState.zoomLevel}px)`, // 260px is track header width
              display: editorState.currentTime > 0 ? 'block' : 'none'
            }}
          />
        </div>
      </div>

      <footer className={styles.bottomBar}>
        <TransportBar 
          isPlaying={editorState.isPlaying}
          currentTime={editorState.currentTime}
          totalDuration={editorState.totalDuration}
          tempo={editorState.tempo}
          onPlayPause={handlePlayPause}
          onStop={handleStop}
          onRecord={() => {}}
        />
      </footer>
    </div>
  );
}