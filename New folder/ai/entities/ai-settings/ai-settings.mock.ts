import { AiSettings } from './ai-settings.js';

export function mockAiSettings() {
  return [
    AiSettings.from({
      defaultProvider: 'openai',
      defaultModel: 'gpt-4',
      apiKey: 'sk-mock-key-12345',
      temperature: 0.7,
      maxTokens: 2048,
    }),
    AiSettings.from({
      defaultProvider: 'anthropic',
      defaultModel: 'claude-3-opus',
      temperature: 0.5,
      maxTokens: 4096,
    }),
  ];
}