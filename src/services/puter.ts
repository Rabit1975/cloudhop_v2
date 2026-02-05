// Puter.js Service Wrapper - Free OpenAI API Access
// This service provides a TypeScript-friendly interface to Puter.js

declare global {
  interface Window {
    puter: any;
  }
}

export interface PuterAIOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface PuterImageOptions {
  model?: string;
  width?: number;
  height?: number;
  quality?: number;
}

export class PuterService {
  private isInitialized: boolean = false;

  constructor() {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    if (typeof window !== 'undefined' && window.puter) {
      this.isInitialized = true;
    } else {
      // Wait for Puter.js to load
      await new Promise(resolve => {
        const checkInterval = setInterval(() => {
          if (typeof window !== 'undefined' && window.puter) {
            clearInterval(checkInterval);
            this.isInitialized = true;
            resolve(true);
          }
        }, 100);
      });
    }
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }
  }

  /**
   * Generate text using OpenAI models via Puter.js
   * @param prompt The text prompt to generate from
   * @param options Configuration options
   * @returns Promise<string> Generated text response
   */
  async generateText(prompt: string, options: PuterAIOptions = {}): Promise<string> {
    await this.ensureInitialized();

    const defaultOptions: PuterAIOptions = {
      model: 'gpt-5-nano',
      temperature: 0.7,
      max_tokens: 1000,
    };

    const finalOptions = { ...defaultOptions, ...options };

    try {
      const response = await window.puter.ai.chat(prompt, finalOptions);
      return response;
    } catch (error) {
      console.error('Puter.js Text Generation Error:', error);
      throw new Error('Failed to generate text with Puter.js');
    }
  }

  /**
   * Generate images using DALL-E via Puter.js
   * @param prompt The image description
   * @param options Image generation options
   * @returns Promise<HTMLImageElement> Generated image element
   */
  async generateImage(prompt: string, options: PuterImageOptions = {}): Promise<HTMLImageElement> {
    await this.ensureInitialized();

    const defaultOptions: PuterImageOptions = {
      model: 'gpt-image-1.5',
      width: 512,
      height: 512,
      quality: 80,
    };

    const finalOptions = { ...defaultOptions, ...options };

    try {
      const imageElement = await window.puter.ai.txt2img(prompt, finalOptions);
      return imageElement;
    } catch (error) {
      console.error('Puter.js Image Generation Error:', error);
      throw new Error('Failed to generate image with Puter.js');
    }
  }

  /**
   * Analyze images using vision models
   * @param prompt The question about the image
   * @param imageUrl URL of the image to analyze
   * @param options Configuration options
   * @returns Promise<string> Analysis response
   */
  async analyzeImage(
    prompt: string,
    imageUrl: string,
    options: PuterAIOptions = {}
  ): Promise<string> {
    await this.ensureInitialized();

    const defaultOptions: PuterAIOptions = {
      model: 'gpt-5-nano',
    };

    const finalOptions = { ...defaultOptions, ...options };

    try {
      const response = await window.puter.ai.chat(prompt, imageUrl, finalOptions);
      return response;
    } catch (error) {
      console.error('Puter.js Image Analysis Error:', error);
      throw new Error('Failed to analyze image with Puter.js');
    }
  }

  /**
   * Stream text generation for longer responses
   * @param prompt The text prompt
   * @param options Configuration options
   * @param onChunk Callback for each chunk of streaming response
   */
  async streamText(
    prompt: string,
    options: PuterAIOptions = {},
    onChunk?: (chunk: string) => void
  ): Promise<string> {
    await this.ensureInitialized();

    const defaultOptions: PuterAIOptions = {
      model: 'gpt-5-nano',
      temperature: 0.7,
      stream: true,
    };

    const finalOptions = { ...defaultOptions, ...options };

    try {
      let fullResponse = '';

      // Note: Puter.js streaming implementation might differ
      // This is a basic implementation that may need adjustment
      const response = await window.puter.ai.chat(prompt, finalOptions);

      if (onChunk && typeof response === 'string') {
        onChunk(response);
      }

      fullResponse = response;
      return fullResponse;
    } catch (error) {
      console.error('Puter.js Streaming Error:', error);
      throw new Error('Failed to stream text with Puter.js');
    }
  }

  /**
   * Get available models
   * @returns Array of available model names
   */
  getAvailableModels(): string[] {
    return [
      'gpt-5.2',
      'gpt-5.2-chat',
      'gpt-5.1',
      'gpt-5',
      'gpt-5-nano',
      'gpt-5-mini',
      'gpt-5-chat-latest',
      'gpt-4o',
      'gpt-4.1',
      'gpt-4.5',
      'o1',
      'o3',
      'o4-mini',
      'gpt-image-1.5',
      'dall-e-3',
    ];
  }

  /**
   * Check if Puter.js is available and initialized
   * @returns boolean
   */
  isAvailable(): boolean {
    return this.isInitialized && typeof window !== 'undefined' && !!window.puter;
  }
}

export const puterService = new PuterService();
