// Rabbit AI + Puter.js Combined Service
// Uses Rabbit AI for advanced features, Puter.js for basic AI operations

import { RabbitAIClient } from '../core/ai/AIClient';
import { puterService } from './puter';
import { tools } from '../core/ai/tools';

export interface RabbitAIOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
  useTools?: boolean;
}

export class RabbitAIService {
  private rabbitClient: RabbitAIClient;
  private isRabbitAvailable: boolean = false;

  constructor() {
    this.rabbitClient = new RabbitAIClient();
    // Don't check Rabbit AI availability due to CSP - assume it's not available
    this.isRabbitAvailable = false;
  }

  /**
   * Generate text using Rabbit AI or Puter.js as fallback
   */
  async generateText(prompt: string, options: RabbitAIOptions = {}): Promise<string> {
    const { useTools = false, ...puterOptions } = options;

    // Skip Rabbit AI due to CSP issues, use Puter.js directly
    try {
      return await puterService.generateText(prompt, puterOptions);
    } catch (error) {
      console.error('Both AI services failed:', error);
      throw new Error('AI services unavailable');
    }
  }

  /**
   * Generate images using Puter.js
   */
  async generateImage(prompt: string, options: any = {}): Promise<HTMLImageElement> {
    // Use Puter.js for image generation
    return await puterService.generateImage(prompt, options);
  }

  /**
   * Stream text using Puter.js
   */
  async streamText(
    prompt: string,
    onChunk: (chunk: string) => void,
    options: RabbitAIOptions = {}
  ): Promise<string> {
    // Use Puter.js streaming
    return await puterService.streamText(prompt, options, onChunk);
  }

  /**
   * Execute Rabbit AI tools (disabled due to CSP)
   */
  async executeTool(toolName: string, ...args: any[]): Promise<any> {
    throw new Error('Rabbit AI tools not available due to Content Security Policy');
  }

  /**
   * Get available AI capabilities
   */
  getCapabilities(): {
    rabbitAI: boolean;
    puter: boolean;
    models: string[];
    tools: string[];
  } {
    return {
      rabbitAI: false, // Disabled due to CSP
      puter: true, // Puter.js is available
      models: puterService.getAvailableModels(),
      tools: [], // Rabbit AI tools disabled
    };
  }

  /**
   * Context-aware AI response based on current view
   */
  async getContextualResponse(view: string, action: string): Promise<string> {
    const contextPrompt = `You are Rabbit AI in CloudHop OS. Current view: ${view}. User wants to: ${action}. Provide a helpful, concise response.`;

    return await this.generateText(contextPrompt, {
      model: 'gpt-5-nano',
      temperature: 0.7,
      max_tokens: 1000,
    });
  }

  /**
   * Generate playlist with Puter.js
   */
  async generatePlaylist(mood: string, activity: string): Promise<string[]> {
    const prompt = `Generate a 5-song playlist for ${activity} with ${mood} mood. Return as numbered list only.`;

    try {
      const response = await this.generateText(prompt, {
        model: 'gpt-5-nano',
        temperature: 0.8,
      });

      // Parse response into playlist
      return response
        .split('\n')
        .filter((line: string) => line.trim() && /^\d+\./.test(line.trim()))
        .map((line: string) => line.replace(/^\d+\.\s*/, '').trim())
        .filter((song: string) => song.length > 0)
        .slice(0, 5);
    } catch (error) {
      // Fallback playlist
      return [
        'Cosmic Journey - Electronic Dreams',
        'Neon Nights - Synthwave Collection',
        'Digital Horizon - Future Bass',
        'Quantum Beats - Experimental Electronic',
        'CloudHop Theme - Ambient Mix',
      ];
    }
  }

  /**
   * Transcribe audio using fallback
   */
  async transcribeAudio(audioBlob: Blob): Promise<string> {
    // Fallback transcription since Rabbit AI is not available
    return 'Audio transcription would be processed here. In production, this would use the available AI service.';
  }

  /**
   * Check service availability
   */
  isServiceAvailable(): { rabbit: boolean; puter: boolean } {
    return {
      rabbit: false, // Disabled due to CSP
      puter: puterService.isAvailable(),
    };
  }

  private async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // Remove data URL prefix
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}

export const rabbitAIService = new RabbitAIService();
