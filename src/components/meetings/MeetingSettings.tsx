import { useState } from 'react';
import { cn } from '@/lib/utils';

interface MeetingSettingsProps {
  onClose: () => void;
  waitingRoomEnabled: boolean;
  onToggleWaitingRoom: () => void;
  meetingLocked: boolean;
  onToggleLock: () => void;
}

export default function MeetingSettings({
  onClose,
  waitingRoomEnabled,
  onToggleWaitingRoom,
  meetingLocked,
  onToggleLock,
}: MeetingSettingsProps) {
  const [noiseSuppression, setNoiseSuppression] = useState(true);
  const [audioDevice, setAudioDevice] = useState('default');
  const [videoDevice, setVideoDevice] = useState('default');

  return (
    <div className="glass-panel rounded-xl border-cyan-400/30 p-4 w-72">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-foreground text-sm">Meeting Settings</h3>
        <button
          onClick={onClose}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        {/* Audio Device */}
        <div>
          <label className="text-xs text-muted-foreground block mb-1">
            Audio Input
          </label>
          <select
            value={audioDevice}
            onChange={(e) => setAudioDevice(e.target.value)}
            className="w-full text-xs px-2 py-1.5 bg-white/5 border border-cyan-400/30 rounded text-foreground outline-none"
          >
            <option value="default">Default Microphone</option>
            <option value="headset">Headset Mic</option>
            <option value="external">External Microphone</option>
          </select>
        </div>

        {/* Video Device */}
        <div>
          <label className="text-xs text-muted-foreground block mb-1">
            Camera
          </label>
          <select
            value={videoDevice}
            onChange={(e) => setVideoDevice(e.target.value)}
            className="w-full text-xs px-2 py-1.5 bg-white/5 border border-cyan-400/30 rounded text-foreground outline-none"
          >
            <option value="default">Default Camera</option>
            <option value="external">External Webcam</option>
          </select>
        </div>

        {/* Toggles */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-foreground">Noise Suppression</span>
            <button
              onClick={() => setNoiseSuppression(!noiseSuppression)}
              className={cn(
                'w-10 h-5 rounded-full transition-all relative',
                noiseSuppression ? 'bg-cyan-500' : 'bg-white/20'
              )}
            >
              <div
                className={cn(
                  'w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all',
                  noiseSuppression ? 'left-5' : 'left-0.5'
                )}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-foreground">Waiting Room</span>
            <button
              onClick={onToggleWaitingRoom}
              className={cn(
                'w-10 h-5 rounded-full transition-all relative',
                waitingRoomEnabled ? 'bg-cyan-500' : 'bg-white/20'
              )}
            >
              <div
                className={cn(
                  'w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all',
                  waitingRoomEnabled ? 'left-5' : 'left-0.5'
                )}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-foreground">Lock Meeting</span>
            <button
              onClick={onToggleLock}
              className={cn(
                'w-10 h-5 rounded-full transition-all relative',
                meetingLocked ? 'bg-red-500' : 'bg-white/20'
              )}
            >
              <div
                className={cn(
                  'w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all',
                  meetingLocked ? 'left-5' : 'left-0.5'
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
