export type GeminiConfig = {
  /**
   * The API key for accessing the Gemini API.
   */
  apiKey: string;
  /**
   * The default model to use if not specified in the request.
   * Defaults to 'gemini-1.5-flash'.
   */
  defaultModel?: string;
};