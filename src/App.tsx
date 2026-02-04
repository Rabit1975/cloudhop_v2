import React from 'react'
import { RouterNew as Router } from './kernel/routing/RouterNew'
import ErrorBoundary from './kernel/errors/ErrorBoundary'

export default function App() {
  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  )
}
