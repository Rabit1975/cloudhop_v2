import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  user: any | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null)

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('cloudhop_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Implement authentication logic
    console.log('Login:', email)
    // For now, just set the user with the email
    // In a real app, this would validate credentials with a backend
    const userData = { 
      name: email, 
      email: email,
      role: email === 'matthew-seales@cloudhop.tech' ? 'admin' : 'user'
    }
    setUser(userData)
    localStorage.setItem('cloudhop_user', JSON.stringify(userData))
  }

  const logout = async () => {
    setUser(null)
    localStorage.removeItem('cloudhop_user')
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return context
}
