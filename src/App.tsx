import React from 'react'
import { Router } from './kernel/routing/Router'
import { ErrorBoundary } from './kernel/errors/ErrorBoundary'

export default function App() {
  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  )
}
