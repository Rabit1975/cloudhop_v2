// Rabbit AI Service
// Uses Rabbit AI for advanced features

import { RabbitAIClient } from '../core/ai/AIClient';
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

  constructor() {
    this.rabbitClient = new RabbitAIClient();
  }

  /**
   * Generate text using Rabbit AI
   */
  async generateText(prompt: string, options: RabbitAIOptions = {}): Promise<string> {
    try {
      const messages = [{ role: 'user', content: prompt }];
      return await this.rabbitClient.chat(messages);
    } catch (error) {
      console.error('Rabbit AI request failed:', error);
      throw new Error('AI services unavailable');
    }
  }

  /**
   * Generate images (Placeholder as Rabbit AI image gen might differ)
   */
  async generateImage(prompt: string, options: any = {}): Promise<HTMLImageElement | null> {
      console.warn("Image generation not yet implemented in Rabbit AI Service");
      return null;
  }

  /**
   * Stream text using Rabbit AI
   */
  async streamText(
    prompt: string,
    onChunk: (chunk: string) => void,
    options: RabbitAIOptions = {}
  ): Promise<void> {
     const messages = [{ role: 'user', content: prompt }];
     return await this.rabbitClient.stream(messages, onChunk);
  }

  /**
   * Execute Rabbit AI tools
   */
  async executeTool(toolName: string, ...args: any[]): Promise<any> {
    // Implement tool execution logic if needed, or pass to client
    throw new Error('Tool execution not fully implemented');
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
      rabbitAI: true,
      puter: false,
      models: ['rabbit-v1'],
      tools: tools.map(t => t.name),
    };
  }

  /**
   * Context-aware AI response based on current view
   */
  async getContextualResponse(view: string, action: string): Promise<string> {
    const contextPrompt = `You are Rabbit AI in CloudHop. Current view: ${view}. User wants to: ${action}. Provide a helpful, concise response.`;
    return await this.generateText(contextPrompt);
  }

  /**
   * Generate playlist
   */
  async generatePlaylist(mood: string, activity: string): Promise<string[]> {
    const prompt = `Generate a 5-song playlist for ${activity} with ${mood} mood. Return as numbered list only.`;

    try {
      const response = await this.generateText(prompt);

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
   * Transcribe audio
   */
  async transcribeAudio(audioBlob: Blob): Promise<string> {
     // TODO: Implement actual transcription endpoint call
    return 'Audio transcription would be processed here.';
  }

  /**
   * Check service availability
   */
  isServiceAvailable(): { rabbit: boolean; puter: boolean } {
    return {
      rabbit: true,
      puter: false,
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
