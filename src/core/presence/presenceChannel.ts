// Presence channel for tracking online users
class PresenceChannel {
  private listeners: ((users: string[]) => void)[] = []

  join(spaceId: string) {
    // Join presence channel
    console.log('Joining presence channel:', spaceId)
  }

  leave(spaceId: string) {
    // Leave presence channel
    console.log('Leaving presence channel:', spaceId)
  }

  updateStatus(status: string) {
    // Update user status
    console.log('Updating status:', status)
  }

  onUsersUpdate(callback: (users: string[]) => void) {
    this.listeners.push(callback)
  }
}

export const presenceChannel = new PresenceChannel()
