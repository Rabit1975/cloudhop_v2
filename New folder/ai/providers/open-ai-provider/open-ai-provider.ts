import { AiProvider, AiModelRequest, AiModelResponse } from '@cloudrabbit/ai.providers.ai-provider';
import { OpenAiChatCompletionRequest, OpenAiChatCompletionResponse, OpenAiMessage } from './openai-api-type.js';

/**
 * Implementation of the AiProvider interface for OpenAI.
 * Uses the OpenAI Chat Completion API.
 */
export class OpenAiProvider implements AiProvider {
  /**
   * The unique name of the provider.
   */
  readonly name = 'openai';

  /**
   * Creates an instance of OpenAiProvider.
   * @param apiKey Optional API key. If not provided, it attempts to read from request options or environment variables.
   */
  constructor(private readonly apiKey?: string) {}

  /**
   * Sends a request to the OpenAI API and returns the response.
   * Supports streaming if a stream callback is provided in the request.
   * @param request The request object containing the prompt, options, and streaming callback.
   * @returns A Promise that resolves to the AI model's response.
   */
  async request(request: AiModelRequest): Promise<AiModelResponse> {
    const apiKey = (request.options?.apiKey as string) || this.apiKey || (typeof process !== 'undefined' ? process.env.OPENAI_API_KEY : undefined);
    
    if (!apiKey) {
      throw new Error('OpenAI API key is missing. Please provide it in options or set OPENAI_API_KEY environment variable.');
    }

    const model = request.model || 'gpt-4';
    
    const messages: OpenAiMessage[] = [];
    if (request.systemPrompt) {
      messages.push({ role: 'system', content: request.systemPrompt });
    }
    messages.push({ role: 'user', content: request.prompt });

    const payload: OpenAiChatCompletionRequest = {
      model,
      messages,
      stream: !!request.stream,
      ...request.options,
    };

    // Ensure apiKey is not sent in the payload if it was passed in options
    delete payload.apiKey;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API Error: ${response.statusText} - ${errorText}`);
    }

    if (request.stream && response.body) {
      return this.handleStream(response.body, request.stream);
    }

    const data = (await response.json()) as OpenAiChatCompletionResponse;
    const choice = data.choices[0];
    const text = choice?.message?.content || '';

    return {
      text,
      metadata: {
        id: data.id,
        usage: data.usage,
        finishReason: choice?.finish_reason,
      },
    };
  }

  /**
   * Handles the streaming response from OpenAI.
   * @param body The readable stream from the fetch response.
   * @param onChunk The callback function to handle each text chunk.
   * @returns The final aggregated response.
   */
  private async handleStream(
    body: ReadableStream<Uint8Array>,
    onChunk: (chunk: string) => void
  ): Promise<AiModelResponse> {
    const reader = body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';
    let buffer = '';

    const readAndProcess = async (): Promise<void> => {
      const { value, done: isDone } = await reader.read();

      if (isDone) {
        return; // Stream ended
      }

      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;
      }

      // Process all complete lines in the buffer
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // Keep the last (potentially incomplete) line in the buffer

      lines.forEach((line) => {
        const trimmedLine = line.trim();
        
        if (trimmedLine !== '' && trimmedLine !== 'data: [DONE]') {
          if (trimmedLine.startsWith('data: ')) {
            try {
              const jsonStr = trimmedLine.replace('data: ', '');
              const json = JSON.parse(jsonStr);
              const content = json.choices?.[0]?.delta?.content || '';
              
              if (content) {
                onChunk(content);
                fullText += content;
              }
            } catch (e) {
              // Ignore parse errors for malformed lines
            }
          }
        }
      });
      // Continue reading the next chunk
      return readAndProcess();
    };

    await readAndProcess(); // Start the recursive reading
    
    return { text: fullText };
  }
}