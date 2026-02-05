// rabbit.ai context builder - the memory + awareness
// Builds context for each AI call with user info, module state, repo state, etc.

export interface ContextData {
  user?: {
    id: string
    name: string
    email?: string
  }
  currentModule?: string
  currentFile?: string
  repoState?: {
    branch: string
    uncommittedChanges: boolean
  }
  activeSpace?: {
    id: string
    name: string
    type: string
  }
  activeChat?: {
    id: string
    participants: string[]
  }
  customData?: Record<string, any>
}

export class ContextBuilder {
  private messages: Array<{ role: string; content: string }> = []
  private contextData: ContextData = {}

  // Add a message to the conversation
  addMessage(role: 'user' | 'assistant' | 'system', content: string) {
    this.messages.push({ role, content })
    return this
  }

  // Set system prompt at the beginning
  setSystemPrompt(prompt: string) {
    // Remove existing system prompts
    this.messages = this.messages.filter(m => m.role !== 'system')
    // Add new system prompt at the beginning
    this.messages.unshift({ role: 'system', content: prompt })
    return this
  }

  // Add user information to context
  setUser(user: ContextData['user']) {
    this.contextData.user = user
    return this
  }

  // Set current module
  setModule(moduleName: string) {
    this.contextData.currentModule = moduleName
    return this
  }

  // Set current file
  setFile(filePath: string) {
    this.contextData.currentFile = filePath
    return this
  }

  // Set repository state
  setRepoState(state: ContextData['repoState']) {
    this.contextData.repoState = state
    return this
  }

  // Set active space
  setActiveSpace(space: ContextData['activeSpace']) {
    this.contextData.activeSpace = space
    return this
  }

  // Set active chat
  setActiveChat(chat: ContextData['activeChat']) {
    this.contextData.activeChat = chat
    return this
  }

  // Add custom context data
  addCustomData(key: string, value: any) {
    if (!this.contextData.customData) {
      this.contextData.customData = {}
    }
    this.contextData.customData[key] = value
    return this
  }

  // Build the final context including system prompt with context data
  build() {
    // Build context summary
    const contextParts: string[] = []
    
    if (this.contextData.user) {
      contextParts.push(`User: ${this.contextData.user.name} (${this.contextData.user.id})`)
    }
    
    if (this.contextData.currentModule) {
      contextParts.push(`Module: ${this.contextData.currentModule}`)
    }
    
    if (this.contextData.currentFile) {
      contextParts.push(`File: ${this.contextData.currentFile}`)
    }
    
    if (this.contextData.repoState) {
      contextParts.push(`Branch: ${this.contextData.repoState.branch}`)
      if (this.contextData.repoState.uncommittedChanges) {
        contextParts.push(`Status: Uncommitted changes present`)
      }
    }
    
    if (this.contextData.activeSpace) {
      contextParts.push(`Space: ${this.contextData.activeSpace.name} (${this.contextData.activeSpace.type})`)
    }
    
    if (this.contextData.activeChat) {
      contextParts.push(`Chat: ${this.contextData.activeChat.id} with ${this.contextData.activeChat.participants.length} participants`)
    }

    // Add context to system prompt if we have context data
    if (contextParts.length > 0 && this.messages[0]?.role === 'system') {
      const contextInfo = '\n\nCurrent Context:\n' + contextParts.join('\n')
      this.messages[0].content += contextInfo
    }

    return {
      messages: this.messages,
      context: this.contextData
    }
  }

  // Clear all messages and context
  clear() {
    this.messages = []
    this.contextData = {}
    return this
  }

  // Get last N messages
  getLastN(n: number) {
    return this.messages.slice(-n)
  }

  // Get current context data
  getContext() {
    return this.contextData
  }
}
