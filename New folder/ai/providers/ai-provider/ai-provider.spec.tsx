import { vi } from 'vitest';
import { AiProvider } from './ai-provider.js';
import { AiModelRequest } from './ai-model-request-type.js';
import { AiModelResponse } from './ai-model-response-type.js';

describe('AiProvider', () => {
  it('should define a name property', () => {
    const mockProvider: AiProvider = {
      name: 'MockProvider',
      request: vi.fn()
    };

    expect(mockProvider.name).toBe('MockProvider');
  });

  it('should define a request method that returns a Promise', () => {
    const mockProvider: AiProvider = {
      name: 'MockProvider',
      request: vi.fn(() => Promise.resolve({ text: 'Test response' }))
    };

    const request: AiModelRequest = { prompt: 'Test prompt' };
    const responsePromise = mockProvider.request(request);

    expect(responsePromise).toBeInstanceOf(Promise);
  });

  it('should be able to call request', async () => {
    const mockProvider: AiProvider = {
      name: 'MockProvider',
      request: vi.fn(() => Promise.resolve({ text: 'Test response' }))
    };
    const request: AiModelRequest = { prompt: 'Test prompt' };
    await mockProvider.request(request);
    expect(mockProvider.request).toHaveBeenCalled();
  });
});