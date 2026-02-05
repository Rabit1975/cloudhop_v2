import { GoogleGenerativeAI } from '@google/genai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('VITE_GEMINI_API_KEY is not set in environment variables');
}

export const geminiClient = new GoogleGenerativeAI(GEMINI_API_KEY);

export class GeminiService {
  private model: any;

  constructor() {
    this.model = geminiClient.getGenerativeModel({ model: 'gemini-1.5-pro' });
  }

  async generateText(
    prompt: string,
    options?: {
      temperature?: number;
      maxTokens?: number;
      topP?: number;
      topK?: number;
    }
  ) {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Failed to generate text with Gemini');
    }
  }

  async generateChat(messages: Array<{ role: string; content: string }>) {
    try {
      const chat = this.model.startChat({
        history: messages.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        })),
      });

      const result = await chat.sendMessage(messages[messages.length - 1].content);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini Chat API Error:', error);
      throw new Error('Failed to generate chat response with Gemini');
    }
  }
}

export const geminiService = new GeminiService();
