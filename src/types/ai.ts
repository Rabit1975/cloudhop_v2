// AI type definitions
export interface AIMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
  toolCalls?: ToolCall[]
}

export interface ToolCall {
  id: string
  name: string
  parameters: Record<string, any>
  result?: any
}

export interface AIContext {
  messages: AIMessage[]
  systemPrompt?: string
  temperature?: number
  maxTokens?: number
}

export interface AITool {
  name: string
  description: string
  parameters: Record<string, any>
  execute: (params: any) => Promise<any>
}

export interface AIResponse {
  id: string
  content: string
  toolCalls?: ToolCall[]
  finishReason: 'complete' | 'length' | 'tool_calls'
  usage: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
}
