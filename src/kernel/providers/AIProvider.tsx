import React, { ReactNode, createContext, useContext, useState } from 'react'
import { rabbitAI } from '../../core/ai/AIClient'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface AIContextType {
  run: (params: { prompt: string, context?: any }) => Promise<string>
  history: Message[]
  client: typeof rabbitAI
}

const AIContext = createContext<AIContextType | undefined>(undefined)

export function AIProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<Message[]>([])

  const run = async ({ prompt, context }: { prompt: string, context?: any }): Promise<string> => {
    // Add user message to history
    setHistory((h) => [...h, { role: 'user', content: prompt }])
    
    const messages = [{ role: 'user', content: prompt }]
    const result = await rabbitAI.chat(messages, context)
    
    // Add AI message to history
    setHistory((h) => [...h, { role: 'assistant', content: result }])
    
    return result
  }

  const value = {
    run,
    history,
    client: rabbitAI
  }

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>
}

export function useAI() {
  const context = useContext(AIContext)
  if (!context) {
    throw new Error('useAI must be used within AIProvider')
  }
  return context
}
