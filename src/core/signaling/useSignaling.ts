import { useState, useEffect } from 'react'
import { signalingClient } from './signalingClient'

export function useSignaling(roomId: string) {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    signalingClient.connect(roomId)
    setIsConnected(true)

    return () => {
      signalingClient.disconnect()
      setIsConnected(false)
    }
  }, [roomId])

  const sendOffer = (offer: RTCSessionDescriptionInit) => {
    signalingClient.sendOffer(offer)
  }

  const sendAnswer = (answer: RTCSessionDescriptionInit) => {
    signalingClient.sendAnswer(answer)
  }

  const sendIceCandidate = (candidate: RTCIceCandidate) => {
    signalingClient.sendIceCandidate(candidate)
  }

  return {
    isConnected,
    sendOffer,
    sendAnswer,
    sendIceCandidate
  }
}
