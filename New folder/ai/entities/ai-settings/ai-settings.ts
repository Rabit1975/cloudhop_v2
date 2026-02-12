import { PlainAiSettings } from './ai-settings-type.js';

export class AiSettings {
  constructor(
    /**
     * The default AI provider to use.
     */
    readonly defaultProvider?: string,

    /**
     * The default model identifier.
     */
    readonly defaultModel?: string,

    /**
     * The API key for the provider.
     */
    readonly apiKey?: string,

    /**
     * The sampling temperature.
     */
    readonly temperature?: number,

    /**
     * The maximum number of tokens.
     */
    readonly maxTokens?: number
  ) {}

  /**
   * Serialize the AiSettings entity into a plain object.
   */
  toObject(): PlainAiSettings {
    return {
      defaultProvider: this.defaultProvider,
      defaultModel: this.defaultModel,
      apiKey: this.apiKey,
      temperature: this.temperature,
      maxTokens: this.maxTokens,
    };
  }

  /**
   * Create an AiSettings entity from a plain object.
   */
  static from(plain: PlainAiSettings) {
    return new AiSettings(
      plain.defaultProvider,
      plain.defaultModel,
      plain.apiKey,
      plain.temperature,
      plain.maxTokens
    );
  }
}