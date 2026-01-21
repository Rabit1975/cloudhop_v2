import React, { ReactNode } from 'react'
import { Sidebar } from './Sidebar'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Sidebar />
      <main style={{ 
        flex: 1, 
        overflow: 'auto',
        backgroundColor: '#f5f5f5'
      }}>
        {children}
      </main>
    </div>
  )
}
