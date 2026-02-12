/**
 * Represents a message in the OpenAI chat format.
 */
export type OpenAiMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

/**
 * Represents the usage statistics for an OpenAI request.
 */
export type OpenAiUsage = {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

/**
 * Represents a choice in the OpenAI chat completion response.
 */
export type OpenAiChoice = {
  index: number
  message: OpenAiMessage
  finish_reason: string
  delta?: {
    content?: string
  }
}

/**
 * Represents a request to the OpenAI Chat Completion API.
 */
export type OpenAiChatCompletionRequest = {
  model: string
  messages: OpenAiMessage[]
  temperature?: number
  max_tokens?: number
  stream?: boolean
  [key: string]: unknown
}

/**
 * Represents a response from the OpenAI Chat Completion API.
 */
export type OpenAiChatCompletionResponse = {
  id: string
  object: string
  created: number
  choices: OpenAiChoice[]
  usage?: OpenAiUsage
}