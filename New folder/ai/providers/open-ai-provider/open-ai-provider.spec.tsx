import { expect, vi } from 'vitest';
import { AiModelRequest } from '@cloudrabbit/ai.providers.ai-provider';
import { OpenAiProvider } from './open-ai-provider.js';

describe('OpenAiProvider', () => {
  it('should set provider name to "openai"', () => {
    const provider = new OpenAiProvider();
    expect(provider.name).toBe('openai');
  });

  it('should successfully call OpenAI API and return a text response', async () => {
    const apiKey = 'test-api-key';
    const mockResponse = {
      id: 'chatcmpl-test',
      object: 'chat.completion',
      created: 1627000000,
      choices: [{
        index: 0,
        message: {
          role: 'assistant',
          content: 'This is a test response from OpenAI.',
        },
        finish_reason: 'stop',
      }],
      usage: {
        prompt_tokens: 50,
        completion_tokens: 20,
        total_tokens: 70,
      },
    };

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    global.fetch = mockFetch;

    const provider = new OpenAiProvider(apiKey);
    const request: AiModelRequest = {
      prompt: 'Test prompt',
      model: 'gpt-3.5-turbo',
    };

    const response = await provider.request(request);

    expect(response.text).toBe('This is a test response from OpenAI.');
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if OpenAI API key is missing', async () => {
    const provider = new OpenAiProvider();
    const request: AiModelRequest = {
      prompt: 'Test prompt',
      model: 'gpt-3.5-turbo',
    };

    await expect(provider.request(request)).rejects.toThrowError('OpenAI API key is missing. Please provide it in options or set OPENAI_API_KEY environment variable.');
  });
});