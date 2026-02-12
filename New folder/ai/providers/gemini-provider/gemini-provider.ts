import { GoogleGenerativeAI, GenerativeModel, GenerationConfig, Part } from '@google/generative-ai';
import { AiProvider, AiModelRequest, AiModelResponse } from '@cloudrabbit/ai.providers.ai-provider';
import { GeminiConfig } from './gemini-config-type.js';

export class GeminiProvider implements AiProvider {
  readonly name = 'gemini';

  private readonly client: GoogleGenerativeAI;

  private readonly defaultModel: string;

  constructor(config: GeminiConfig) {
    this.client = new GoogleGenerativeAI(config.apiKey);
    this.defaultModel = config.defaultModel || 'gemini-1.5-flash';
  }

  async request(request: AiModelRequest): Promise<AiModelResponse> {
    const modelName = request.model || this.defaultModel;
    const model = this.client.getGenerativeModel({
      model: modelName,
    });

    const config = this.createGenerationConfig(request.options);

    const contents: { role: string; parts: Part[] }[] = [];
    if (request.systemPrompt) {
      contents.push({ role: 'system', parts: [{ text: request.systemPrompt }] });
    }
    contents.push({ role: 'user', parts: [{ text: request.prompt }] });

    if (request.stream) {
      return this.handleStreamRequest(model, contents, config, request.stream);
    }

    return this.handleUnaryRequest(model, contents, config);
  }

  private createGenerationConfig(options?: Record<string, unknown>): GenerationConfig {
    const config: GenerationConfig = {};
    if (!options) return config;

    if (typeof options.temperature === 'number') {
      config.temperature = options.temperature;
    }
    if (typeof options.maxTokens === 'number') {
      config.maxOutputTokens = options.maxTokens;
    }
    if (typeof options.topP === 'number') {
      config.topP = options.topP;
    }
    if (typeof options.topK === 'number') {
      config.topK = options.topK;
    }
    if (Array.isArray(options.stopSequences)) {
      config.stopSequences = options.stopSequences.filter((s): s is string => typeof s === 'string');
    }

    return config;
  }

  private async handleUnaryRequest(
    model: GenerativeModel,
    contents: { role: string; parts: Part[] }[],
    config: GenerationConfig
  ): Promise<AiModelResponse> {
    const result = await model.generateContent({
      contents,
      generationConfig: config,
    });

    const response = await result.response;
    const text = response.text();

    return {
      text,
      metadata: {
        usage: response.usageMetadata,
      },
    };
  }

  private async handleStreamRequest(
    model: GenerativeModel,
    contents: { role: string; parts: Part[] }[],
    config: GenerationConfig,
    onChunk: (chunk: string) => void
  ): Promise<AiModelResponse> {
    const result = await model.generateContentStream({
      contents,
      generationConfig: config,
    });

    const chunks: string[] = [];

    // Recursive function to process each chunk from the async iterator
    const processNext = async (iterator: AsyncIterator<any, any, undefined>): Promise<void> => {
      const { value, done } = await iterator.next();
      if (done) {
        return;
      }
      const chunkText = value.text();
      chunks.push(chunkText);
      onChunk(chunkText);
      await processNext(iterator);
    };

    // Start processing the stream
    await processNext(result.stream[Symbol.asyncIterator]());

    return {
      text: chunks.join(''),
    };
  }
}