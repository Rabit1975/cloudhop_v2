import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CallOverlayProps {
  callState: 'idle' | 'calling' | 'incoming' | 'connected' | 'ended';
  localStream?: MediaStream;
  remoteStream?: MediaStream;
  incomingCallFrom?: string;
  onAccept: () => void;
  onReject: () => void;
  onEnd: () => void;
  toggleMic: () => void;
  toggleCamera: () => void;
  switchCamera: () => void;
  toggleSpeaker: () => void;
  isMicOn: boolean;
  isCameraOn: boolean;
  callerName: string;
  callerAvatar: string;
}

export default function CallOverlay({
  callState,
  localStream,
  remoteStream,
  incomingCallFrom,
  onAccept,
  onReject,
  onEnd,
  toggleMic,
  toggleCamera,
  switchCamera,
  toggleSpeaker,
  isMicOn,
  isCameraOn,
  callerName,
  callerAvatar
}: CallOverlayProps) {
  return (
    <AnimatePresence>
      {callState !== 'idle' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center"
        >
          <div className="relative w-full max-w-4xl h-full max-h-screen flex items-center justify-center">
            {/* Remote Video */}
            {remoteStream && (
              <video
                ref={(el) => {
                  if (el) el.srcObject = remoteStream;
                }}
                autoPlay
                playsInline
                className="w-full h-full object-cover rounded-2xl"
              />
            )}

            {/* Local Video - Picture in Picture */}
            {localStream && (
              <video
                ref={(el) => {
                  if (el) el.srcObject = localStream;
                }}
                autoPlay
                playsInline
                muted
                className="absolute bottom-4 right-4 w-32 h-24 object-cover rounded-lg border-2 border-white/20"
              />
            )}

            {/* Incoming Call UI */}
            {callState === 'incoming' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="mb-8">
                  <img
                    src={callerAvatar}
                    alt={callerName}
                    className="w-24 h-24 rounded-full mb-4 border-4 border-white/20"
                  />
                  <h2 className="text-2xl font-bold text-white mb-2">{callerName}</h2>
                  <p className="text-white/80">Incoming call...</p>
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={onReject}
                    className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <button
                    onClick={onAccept}
                    className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Calling UI */}
            {callState === 'calling' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="mb-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 mb-4 animate-pulse"></div>
                  <h2 className="text-2xl font-bold text-white mb-2">Calling...</h2>
                  <p className="text-white/80">Please wait...</p>
                </div>
                
                <button
                  onClick={onEnd}
                  className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* Connected UI */}
            {callState === 'connected' && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
                <button
                  onClick={toggleMic}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                    isMicOn ? 'bg-white/20 text-white' : 'bg-red-500 text-white'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMicOn ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3 3v3h6V6a3 3 0 00-3-3z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    )}
                  </svg>
                </button>
                
                <button
                  onClick={toggleCamera}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                    isCameraOn ? 'bg-white/20 text-white' : 'bg-red-500 text-white'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isCameraOn ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    )}
                  </svg>
                </button>
                
                <button
                  onClick={switchCamera}
                  className="w-14 h-14 bg-white/20 text-white rounded-full flex items-center justify-center transition-all hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                
                <button
                  onClick={toggleSpeaker}
                  className="w-14 h-14 bg-white/20 text-white rounded-full flex items-center justify-center transition-all hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </button>
                
                <button
                  onClick={onEnd}
                  className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
