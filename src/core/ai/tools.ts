import { rabbitAI } from './AIClient'

// rabbit.ai tool definitions - the hands
// Defines what rabbit.ai can do in CloudHop OS

export interface Tool {
  name: string
  description: string
  parameters: any
  execute: (...args: any[]) => Promise<any>
}

export const tools: Tool[] = [
  {
    name: 'createFile',
    description: 'Create a new file in the repository',
    parameters: {
      path: 'string',
      content: 'string'
    },
    execute: async (path: string, content: string) => {
      console.log('Creating file:', path)
      return { success: true, path }
    }
  },
  {
    name: 'modifyCode',
    description: 'Modify existing code in a file',
    parameters: {
      path: 'string',
      changes: 'string'
    },
    execute: async (path: string, changes: string) => {
      console.log('Modifying code:', path)
      return { success: true, path }
    }
  },
  {
    name: 'generateComponent',
    description: 'Generate a React component',
    parameters: {
      name: 'string',
      props: 'object'
    },
    execute: async (name: string, props: any) => {
      console.log('Generating component:', name)
      return { success: true, component: name }
    }
  },
  {
    name: 'runMigration',
    description: 'Run a database migration',
    parameters: {
      migration: 'string'
    },
    execute: async (migration: string) => {
      console.log('Running migration:', migration)
      return { success: true, migration }
    }
  },
  {
    name: 'buildHopSpace',
    description: 'Build a new HopSpace',
    parameters: {
      name: 'string',
      type: 'string'
    },
    execute: async (name: string, type: string) => {
      console.log('Building HopSpace:', name, type)
      return { success: true, space: name }
    }
  },
  {
    name: 'summarize',
    description: 'Summarize text content',
    parameters: {
      text: 'string'
    },
    execute: async (text: string) => {
      const response = await rabbitAI.chat([
        { role: 'system', content: 'Summarize the following text concisely.' },
        { role: 'user', content: text }
      ])
      return response
    }
  },
  {
    name: 'rewrite',
    description: 'Rewrite text in a different style',
    parameters: {
      text: 'string',
      style: 'string'
    },
    execute: async (text: string, style: string = 'professional') => {
      const response = await rabbitAI.chat([
        { role: 'system', content: `Rewrite the following text in a ${style} style.` },
        { role: 'user', content: text }
      ])
      return response
    }
  },
  {
    name: 'translate',
    description: 'Translate text to another language',
    parameters: {
      text: 'string',
      targetLang: 'string'
    },
    execute: async (text: string, targetLang: string) => {
      const response = await rabbitAI.chat([
        { role: 'system', content: `Translate the following text to ${targetLang}.` },
        { role: 'user', content: text }
      ])
      return response
    }
  },
  {
    name: 'extractActions',
    description: 'Extract action items from text',
    parameters: {
      text: 'string'
    },
    execute: async (text: string) => {
      const response = await rabbitAI.chat([
        { role: 'system', content: 'Extract action items from the following text as a JSON array.' },
        { role: 'user', content: text }
      ])
      return JSON.parse(response)
    }
  },
  {
    name: 'think',
    description: 'AI reasoning and analysis',
    parameters: {
      prompt: 'string'
    },
    execute: async (prompt: string) => {
      const response = await rabbitAI.chat([
        { role: 'system', content: 'Think deeply about the following and provide detailed reasoning.' },
        { role: 'user', content: prompt }
      ])
      return response
    }
  },
  {
    name: 'transcribe',
    description: 'Transcribe audio to text',
    parameters: {
      audioBlob: 'Blob'
    },
    execute: async (audioBlob: Blob) => {
      // Implement audio transcription via rabbit.ai
      console.log('Transcribing audio:', audioBlob.size)
      return 'Transcribed text from audio'
    }
  }
]

export function getTool(name: string): Tool | undefined {
  return tools.find(t => t.name === name)
}

export async function executeTool(name: string, ...args: any[]): Promise<any> {
  const tool = getTool(name)
  if (!tool) {
    throw new Error(`Tool not found: ${name}`)
  }
  return tool.execute(...args)
}
