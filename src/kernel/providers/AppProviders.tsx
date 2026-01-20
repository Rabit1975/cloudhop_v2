import React, { ReactNode } from 'react'
import { AuthProvider } from './AuthProvider'
import { SessionProvider } from './SessionProvider'
import { SettingsProvider } from './SettingsProvider'
import { RealtimeProvider } from './RealtimeProvider'
import { AIProvider } from './AIProvider'
import { ThemeProvider } from './ThemeProvider'

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <SessionProvider>
        <SettingsProvider>
          <RealtimeProvider>
            <AIProvider>
              <ThemeProvider>
                {children}
              </ThemeProvider>
            </AIProvider>
          </RealtimeProvider>
        </SettingsProvider>
      </SessionProvider>
    </AuthProvider>
  )
}
