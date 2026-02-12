import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { RealtimeChannel } from '@supabase/supabase-js';
import { showError, showSuccess, showLoading, updateToast, dismissToast } from '../utils/toast';

const ICE_SERVERS = [{ urls: 'stun:stun.l.google.com:19302' }];

type CallState = 'idle' | 'calling' | 'incoming' | 'connected' | 'ended';

interface WebRTCState {
  callState: CallState;
  localStream?: MediaStream;
  remoteStream?: MediaStream;
  incomingCallFrom?: string;
  isMicOn: boolean;
  isCameraOn: boolean;
}

export const useWebRTC = (userId: string): WebRTCState & {
  startCall: (toUserId: string, chatId?: string) => void;
  acceptCall: () => void;
  rejectCall: () => void;
  endCall: () => void;
  toggleMic: () => void;
  toggleCamera: () => void;
  switchCamera: () => void;
  toggleSpeaker: () => void;
} => {
  const [callState, setCallState] = useState<CallState>('idle');
  const [localStream, setLocalStream] = useState<MediaStream | undefined>();
  const [remoteStream, setRemoteStream] = useState<MediaStream | undefined>();
  const [incomingCallFrom, setIncomingCallFrom] = useState<string | undefined>();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [remoteUserId, setRemoteUserId] = useState<string | null>(null);
  const [callId, setCallId] = useState<string | null>(null);

  const pc = useRef<RTCPeerConnection | null>(null);
  const signalingChannel = useRef<RealtimeChannel | null>(null);
  const pendingCandidates = useRef<RTCIceCandidateInit[]>([]);
  const callToastId = useRef<string | null>(null);

  // Initialize peer connection
  const initializePeerConnection = () => {
    if (pc.current) {
      pc.current.close();
    }

    pc.current = new RTCPeerConnection({
      iceServers: ICE_SERVERS,
    });

    // Handle ICE candidates
    pc.current.onicecandidate = (event) => {
      if (event.candidate && supabase && remoteUserId) {
        try {
          const channel = supabase.channel(`calls:${remoteUserId}`);
          channel.send({
            type: 'broadcast',
            event: 'ice-candidate',
            payload: {
              candidate: event.candidate,
              toUserId: remoteUserId,
              fromUserId: userId,
            },
          });
        } catch (error) {
          console.error('Error sending ICE candidate:', error);
        }
      }
    };

    // Handle remote stream
    pc.current.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };
  };

  // Initialize local media
  const initializeLocalMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      return stream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      showError('Failed to access camera/microphone');
      return null;
    }
  };

  // Start a call
  const startCall = async (toUserId: string, chatId?: string) => {
    if (!supabase) {
      showError('Supabase not available - calls disabled in development');
      return;
    }

    setRemoteUserId(toUserId);
    setCallState('calling');

    const stream = await initializeLocalMedia();
    if (!stream) return;

    initializePeerConnection();
    if (pc.current) {
      stream.getTracks().forEach(track => pc.current!.addTrack(track, stream));

      try {
        const offer = await pc.current.createOffer();
        await pc.current.setLocalDescription(offer);

        // Send offer via Supabase
        const channel = supabase.channel(`calls:${toUserId}`);
        channel.send({
          type: 'broadcast',
          event: 'call-offer',
          payload: {
            offer,
            fromUserId: userId,
            toUserId,
            chatId,
          },
        });

        showSuccess('Calling...');
      } catch (error) {
        console.error('Error starting call:', error);
        showError('Failed to start call');
        setCallState('idle');
      }
    }
  };

  // Accept an incoming call
  const acceptCall = async () => {
    if (!supabase || !remoteUserId) return;

    setCallState('connected');
    const stream = await initializeLocalMedia();
    if (!stream) return;

    initializePeerConnection();
    if (pc.current) {
      stream.getTracks().forEach(track => pc.current!.addTrack(track, stream));

      try {
        const answer = await pc.current.createAnswer();
        await pc.current.setLocalDescription(answer);

        // Send answer via Supabase
        const channel = supabase.channel(`calls:${remoteUserId}`);
        channel.send({
          type: 'broadcast',
          event: 'call-answer',
          payload: {
            answer,
            fromUserId: userId,
            toUserId: remoteUserId,
          },
        });

        showSuccess('Call connected');
      } catch (error) {
        console.error('Error accepting call:', error);
        showError('Failed to accept call');
        setCallState('idle');
      }
    }
  };

  // Reject a call
  const rejectCall = () => {
    if (!supabase || !remoteUserId) return;

    try {
      const channel = supabase.channel(`calls:${remoteUserId}`);
      channel.send({
        type: 'broadcast',
        event: 'call-reject',
        payload: {
          fromUserId: userId,
          toUserId: remoteUserId,
        },
      });

      setCallState('idle');
      setIncomingCallFrom(undefined);
      setRemoteUserId(null);
      dismissToast('incoming-call');
    } catch (error) {
      console.error('Error rejecting call:', error);
    }
  };

  // End a call
  const endCall = () => {
    if (pc.current) {
      pc.current.close();
      pc.current = null;
    }

    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(undefined);
    }

    if (remoteStream) {
      setRemoteStream(undefined);
    }

    setCallState('idle');
    setIncomingCallFrom(undefined);
    setRemoteUserId(null);
    setCallId(null);

    if (callToastId.current) {
      dismissToast(callToastId.current);
      callToastId.current = null;
    }
  };

  // Toggle microphone
  const toggleMic = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
      }
    }
  };

  // Toggle camera
  const toggleCamera = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOn(videoTrack.enabled);
      }
    }
  };

  // Switch camera (for mobile)
  const switchCamera = () => {
    // Implementation for switching between front/back cameras
    console.log('Switch camera');
  };

  // Toggle speaker
  const toggleSpeaker = () => {
    console.log('Toggle speaker');
  };

  // Set up signaling channel
  useEffect(() => {
    if (!userId || !supabase) return;

    try {
      const channel = supabase.channel(`calls:${userId}`);
      signalingChannel.current = channel;

      channel
        .on('broadcast', { event: 'call-offer' }, async ({ payload }) => {
          if (payload.toUserId && payload.toUserId !== userId) return;

          console.log('Received call offer from:', payload.fromUserId);
          setIncomingCallFrom(payload.fromUserId);
          setRemoteUserId(payload.fromUserId);
          setCallState('incoming');
          showLoading(`Incoming call from ${payload.fromUserId}`, { id: 'incoming-call' });
        })
        .on('broadcast', { event: 'call-answer' }, async ({ payload }) => {
          if (payload.toUserId && payload.toUserId !== userId) return;

          console.log('Received call answer from:', payload.fromUserId);
          if (pc.current && payload.answer) {
            await pc.current.setRemoteDescription(payload.answer);
            setCallState('connected');
            showSuccess('Call connected');
          }
        })
        .on('broadcast', { event: 'call-reject' }, ({ payload }) => {
          if (payload.toUserId && payload.toUserId !== userId) return;

          console.log('Call rejected by:', payload.fromUserId);
          setCallState('idle');
          setRemoteUserId(null);
          showError('Call was rejected');
        })
        .on('broadcast', { event: 'ice-candidate' }, async ({ payload }) => {
          if (payload.toUserId && payload.toUserId !== userId) return;

          if (pc.current && payload.candidate) {
            try {
              await pc.current.addIceCandidate(payload.candidate);
            } catch (error) {
              console.error('Error adding ICE candidate:', error);
            }
          }
        })
        .subscribe();

      return () => {
        channel.unsubscribe();
        signalingChannel.current = null;
      };
    } catch (error) {
      console.error('Error setting up signaling channel:', error);
      return () => {};
    }
  }, [userId, supabase]);

  return {
    callState,
    localStream,
    remoteStream,
    incomingCallFrom,
    isMicOn,
    isCameraOn,
    startCall,
    acceptCall,
    rejectCall,
    endCall,
    toggleMic,
    toggleCamera,
    switchCamera,
    toggleSpeaker,
  };
};
