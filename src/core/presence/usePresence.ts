import { useState, useEffect } from 'react'
import { presenceChannel } from './presenceChannel'

export function usePresence(spaceId: string) {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])

  useEffect(() => {
    presenceChannel.join(spaceId)

    const handleUsersUpdate = (users: string[]) => {
      setOnlineUsers(users)
    }

    presenceChannel.onUsersUpdate(handleUsersUpdate)

    return () => {
      presenceChannel.leave(spaceId)
    }
  }, [spaceId])

  const updateStatus = (status: string) => {
    presenceChannel.updateStatus(status)
  }

  return {
    onlineUsers,
    updateStatus
  }
}
