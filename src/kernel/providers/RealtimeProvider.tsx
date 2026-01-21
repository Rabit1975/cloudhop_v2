import React, { ReactNode, createContext, useContext } from 'react'
import { supabase } from '@core/supabase/client'

interface RealtimeContextType {
  supabase: typeof supabase
}

const RealtimeContext = createContext<RealtimeContextType | null>(null)

export function RealtimeProvider({ children }: { children: ReactNode }) {
  return (
    <RealtimeContext.Provider value={{ supabase }}>
      {children}
    </RealtimeContext.Provider>
  )
}

export function useRealtime() {
  const ctx = useContext(RealtimeContext)
  if (!ctx) {
    throw new Error('useRealtime must be used within RealtimeProvider')
  }
  return ctx
}
