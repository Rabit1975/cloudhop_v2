import { useState, useEffect, useRef } from 'react'
import { useSignaling } from '@core/signaling/useSignaling'

export function useWebRTC(roomId: string) {
  const [isConnected, setIsConnected] = useState(false)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([])
  const peerConnection = useRef<RTCPeerConnection | null>(null)
  const { sendOffer, sendAnswer, sendIceCandidate } = useSignaling(roomId)

  useEffect(() => {
    initializeWebRTC()
    return () => {
      cleanup()
    }
  }, [roomId])

  const initializeWebRTC = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      setLocalStream(stream)
      setIsConnected(true)
    } catch (error) {
      console.error('Error accessing media devices:', error)
    }
  }

  const cleanup = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop())
    }
    if (peerConnection.current) {
      peerConnection.current.close()
    }
  }

  return {
    isConnected,
    localStream,
    remoteStreams
  }
}
