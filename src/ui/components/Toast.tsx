import React, { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
  onClose: () => void
}

export function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const typeColors = {
    success: '#28a745',
    error: '#dc3545',
    info: '#17a2b8'
  }

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: typeColors[type],
      color: 'white',
      padding: '12px 20px',
      borderRadius: '6px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      zIndex: 2000,
      animation: 'slideIn 0.3s ease-out'
    }}>
      {message}
    </div>
  )
}
