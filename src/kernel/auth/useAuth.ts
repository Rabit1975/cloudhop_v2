import { useState, useEffect } from 'react'
import { useAuthContext } from '../providers/AuthProvider'

export function useAuth() {
  const { user, login, logout, isAuthenticated } = useAuthContext()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    setIsLoading(false)
  }, [])

  return {
    user,
    login,
    logout,
    isAuthenticated,
    isLoading
  }
}
