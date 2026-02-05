// rabbit.ai client - the brainstem
// This file connects to rabbit.ai for all AI operations

export class RabbitAIClient {
  private endpoint: string

  constructor() {
    this.endpoint = import.meta.env.VITE_RABBIT_AI_ENDPOINT || 'http://localhost:3000/api/rabbit'
  }

  async chat(messages: any[], context?: any): Promise<string> {
    // Implementation for chat with rabbit.ai
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, context })
    })
    
    if (!response.ok) {
      throw new Error(`rabbit.ai request failed: ${response.statusText}`)
    }
    
    const data = await response.json()
    return data.message
  }

  async stream(messages: any[], onChunk: (chunk: string) => void): Promise<void> {
    // Implementation for streaming responses from rabbit.ai
    const response = await fetch(`${this.endpoint}/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    })

    if (!response.ok) {
      throw new Error(`rabbit.ai stream failed: ${response.statusText}`)
    }

    const reader = response.body?.getReader()
    const decoder = new TextDecoder()

    if (!reader) return

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const chunk = decoder.decode(value)
      onChunk(chunk)
    }
  }
}

export const rabbitAI = new RabbitAIClient()
