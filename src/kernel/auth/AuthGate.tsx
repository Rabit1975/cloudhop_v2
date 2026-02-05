import React, { ReactNode } from 'react'
import { useAuth } from './useAuth'

interface AuthGateProps {
  children: ReactNode
}

export function AuthGate({ children }: AuthGateProps) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <div>Please sign in</div>
  }

  return <>{children}</>
}
