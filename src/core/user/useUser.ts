import { useState, useEffect } from 'react'
import { userStore } from './userStore'

export function useUser() {
  const [user, setUser] = useState(userStore.getUser())

  useEffect(() => {
    const unsubscribe = userStore.subscribe(setUser)
    return unsubscribe
  }, [])

  const updateProfile = (updates: any) => {
    userStore.updateUser(updates)
  }

  return {
    user,
    updateProfile
  }
}
