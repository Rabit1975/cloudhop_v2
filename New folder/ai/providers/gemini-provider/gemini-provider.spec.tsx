import { describe, it, expect, vi } from 'vitest';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiProvider } from './gemini-provider.js';

const mockGenerateContent = vi.fn();
const mockGenerateContentStream = vi.fn();

vi.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: vi.fn().mockImplementation(() => {
      return {
        getGenerativeModel: vi.fn().mockImplementation(() => {
          return {
            generateContent: mockGenerateContent,
            generateContentStream: mockGenerateContentStream,
          };
        }),
      };
    }),
  };
});

describe('GeminiProvider', () => {
  const apiKey = 'test-api-key';
  const config = { apiKey };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a GeminiProvider instance', () => {
    const provider = new GeminiProvider(config);
    expect(provider).toBeInstanceOf(GeminiProvider);
  });

  it('should call generateContent with the correct parameters for unary request', async () => {
    mockGenerateContent.mockResolvedValue({ response: { text: () => 'test response', usageMetadata: {} } });

    const provider = new GeminiProvider(config);
    const response = await provider.request({ prompt: 'test prompt' });

    expect(mockGenerateContent).toHaveBeenCalledWith({
      contents: [{ role: 'user', parts: [{ text: 'test prompt' }] }],
      generationConfig: {},
    });
    expect(response.text).toEqual('test response');
  });

  it('should call generateContent with system prompt when provided', async () => {
    mockGenerateContent.mockResolvedValue({ response: { text: () => 'test response with system prompt', usageMetadata: {} } });

    const provider = new GeminiProvider(config);
    const response = await provider.request({ prompt: 'test prompt', systemPrompt: 'You are a helpful assistant.' });

    expect(mockGenerateContent).toHaveBeenCalledWith({
      contents: [
        { role: 'system', parts: [{ text: 'You are a helpful assistant.' }] },
        { role: 'user', parts: [{ text: 'test prompt' }] }
      ],
      generationConfig: {},
    });
    expect(response.text).toEqual('test response with system prompt');
  });

  it('should call generateContentStream with the correct parameters and stream chunks', async () => {
    const mockAsyncIterator = (async function* () {
      yield { text: () => 'chunk1 ' };
      yield { text: () => 'chunk2' };
    })();

    mockGenerateContentStream.mockResolvedValue({ stream: mockAsyncIterator });

    const provider = new GeminiProvider(config);
    const streamedChunks: string[] = [];
    const streamCallback = (chunk: string) => {
      streamedChunks.push(chunk);
    };

    const response = await provider.request({ prompt: 'test prompt', stream: streamCallback });

    expect(mockGenerateContentStream).toHaveBeenCalledWith({
      contents: [{ role: 'user', parts: [{ text: 'test prompt' }] }],
      generationConfig: {},
    });
    expect(streamedChunks).toEqual(['chunk1 ', 'chunk2']);
    expect(response.text).toEqual('chunk1 chunk2');
  });

  it('should call generateContentStream with system prompt when provided', async () => {
    const mockAsyncIterator = (async function* () {
      yield { text: () => 'system ' };
      yield { text: () => 'response' };
    })();

    mockGenerateContentStream.mockResolvedValue({ stream: mockAsyncIterator });

    const provider = new GeminiProvider(config);
    const streamedChunks: string[] = [];
    const streamCallback = (chunk: string) => {
      streamedChunks.push(chunk);
    };

    const response = await provider.request({ prompt: 'test prompt', stream: streamCallback, systemPrompt: 'Act as a poet.' });

    expect(mockGenerateContentStream).toHaveBeenCalledWith({
      contents: [
        { role: 'system', parts: [{ text: 'Act as a poet.' }] },
        { role: 'user', parts: [{ text: 'test prompt' }] }
      ],
      generationConfig: {},
    });
    expect(streamedChunks).toEqual(['system ', 'response']);
    expect(response.text).toEqual('system response');
  });

  it('should use default model if not specified in request', async () => {
    mockGenerateContent.mockResolvedValue({ response: { text: () => 'default model response', usageMetadata: {} } });

    const provider = new GeminiProvider({ apiKey, defaultModel: 'gemini-pro' });
    await provider.request({ prompt: 'test prompt' });

    expect(vi.mocked(GoogleGenerativeAI).mock.calls[0][0]).toEqual(apiKey);
    expect(vi.mocked(vi.mocked(GoogleGenerativeAI).mock.results[0].value.getGenerativeModel)).toHaveBeenCalledWith({
      model: 'gemini-pro',
    });
  });

  it('should use model from request if specified', async () => {
    mockGenerateContent.mockResolvedValue({ response: { text: () => 'specific model response', usageMetadata: {} } });

    const provider = new GeminiProvider({ apiKey, defaultModel: 'gemini-pro' });
    await provider.request({ prompt: 'test prompt', model: 'gemini-1.5-flash' });

    expect(vi.mocked(vi.mocked(GoogleGenerativeAI).mock.results[0].value.getGenerativeModel)).toHaveBeenCalledWith({
      model: 'gemini-1.5-flash',
    });
  });

  it('should pass generation options correctly', async () => {
    mockGenerateContent.mockResolvedValue({ response: { text: () => 'option-tuned response', usageMetadata: {} } });

    const provider = new GeminiProvider(config);
    await provider.request({
      prompt: 'test prompt',
      options: {
        temperature: 0.7,
        maxTokens: 100,
        topP: 0.9,
        topK: 40,
        stopSequences: ['stop'],
      },
    });

    expect(mockGenerateContent).toHaveBeenCalledWith(
      expect.objectContaining({
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 100,
          topP: 0.9,
          topK: 40,
          stopSequences: ['stop'],
        },
      }),
    );
  });
});