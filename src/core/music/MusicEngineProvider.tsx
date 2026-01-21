import React, { createContext, useContext, useRef, useEffect, ReactNode } from 'react'
import { MusicTransport } from './transports/MusicTransport'
import { AudioElementTransport } from './transports/AudioElementTransport'
import { YouTubeTransport } from './transports/YouTubeTransport'
import { MusicSettings, defaultMusicSettings } from './MusicSettings'

export interface MusicEngineContextValue {
  settings: MusicSettings
  transportRef: React.MutableRefObject<MusicTransport | null>
  createTransport: (type: 'audio' | 'youtube') => MusicTransport
}

const MusicEngineContext = createContext<MusicEngineContextValue | null>(null)

export interface MusicEngineProviderProps {
  children: ReactNode
  settings?: Partial<MusicSettings>
}

export function MusicEngineProvider({ children, settings: customSettings }: MusicEngineProviderProps) {
  const settings: MusicSettings = { ...defaultMusicSettings, ...customSettings }
  const transportRef = useRef<MusicTransport | null>(null)

  const createTransport = (type: 'audio' | 'youtube'): MusicTransport => {
    if (type === 'youtube') {
      return new YouTubeTransport()
    }
    return new AudioElementTransport()
  }

  useEffect(() => {
    // Create default transport on mount
    if (!transportRef.current) {
      transportRef.current = createTransport(settings.preferredTransport)
    }

    // Cleanup on unmount
    return () => {
      if (transportRef.current) {
        transportRef.current.destroy()
        transportRef.current = null
      }
    }
  }, [])

  const value: MusicEngineContextValue = {
    settings,
    transportRef,
    createTransport
  }

  return (
    <MusicEngineContext.Provider value={value}>
      {children}
    </MusicEngineContext.Provider>
  )
}

export function useMusicEngineContext(): MusicEngineContextValue {
  const context = useContext(MusicEngineContext)
  if (!context) {
    throw new Error('useMusicEngineContext must be used within MusicEngineProvider')
  }
  return context
}
