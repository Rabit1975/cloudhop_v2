// User store for managing user state
type UserData = {
  id: string
  email: string
  name: string
  avatar?: string
} | null

class UserStore {
  private user: UserData = null
  private listeners: ((user: UserData) => void)[] = []

  getUser() {
    return this.user
  }

  updateUser(updates: Partial<NonNullable<UserData>>) {
    if (this.user) {
      this.user = { ...this.user, ...updates }
      this.notifyListeners()
    }
  }

  setUser(user: UserData) {
    this.user = user
    this.notifyListeners()
  }

  subscribe(listener: (user: UserData) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.user))
  }
}

export const userStore = new UserStore()
