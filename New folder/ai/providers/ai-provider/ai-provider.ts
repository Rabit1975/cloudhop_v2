import { AiModelRequest } from './ai-model-request-type.js';
import { AiModelResponse } from './ai-model-response-type.js';

/**
 * Interface for implementing AI providers for the AI aspect.
 * Defines the contract for sending prompts and receiving responses.
 */
export interface AiProvider {
  /**
   * The unique name of the AI provider.
   */
  name: string;

  /**
   * Sends a request to the AI model and returns the response.
   *
   * @param request The request object containing the prompt, options, and system prompt.
   * @returns A Promise that resolves to the AI model's response.
   */
  request(request: AiModelRequest): Promise<AiModelResponse>;
}