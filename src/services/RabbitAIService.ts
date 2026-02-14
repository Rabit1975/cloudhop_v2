// RabbitAI Service
// Mock service for RabbitAI functionality

export interface RabbitAIMessage {
  id: string;
  content: string;
  timestamp: Date;
  isFromUser: boolean;
  type: 'text' | 'image' | 'file' | 'audio';
  metadata?: any;
}

export interface RabbitAIResponse {
  message: RabbitAIMessage;
  isTyping: boolean;
  suggestions?: string[];
}

class RabbitAIService {
  private baseUrl = 'https://api.openai.com/v1/chat/completions';

  constructor() {
    // In production, this would use real OpenAI API
    // For demo, we'll use mock responses
  }

  async sendMessage(content: string, context?: string): Promise<RabbitAIResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock responses based on content
    const responses = [
      "That's an interesting question! Let me help you with that.",
      "I can help you with creative projects and technical tasks.",
      "Great idea! Have you considered trying it with a different approach?",
      "I understand what you're looking for. Here's how we can approach this.",
      "That sounds like a plan! What would you like to work on first?",
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    return {
      message: {
        id: Date.now().toString(),
        content: randomResponse,
        timestamp: new Date(),
        isFromUser: false,
        type: 'text',
      },
      isTyping: false,
      suggestions: [
        "Tell me more about your project",
        "What kind of creative work do you enjoy?",
        "How can I assist you today?",
      ]
    };
  }

  async generateImage(prompt: string): Promise<{ url: string; description: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock image generation
    return {
      url: `https://picsum.photos/seed/${Math.random()}/800/600?random=${prompt}`,
      description: `AI generated image for: ${prompt}`,
    };
  }

  async analyzeCode(code: string): Promise<{ analysis: string; suggestions: string[] }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock code analysis
    const analyses = [
      "This code looks well structured and follows React best practices.",
      "I notice you're using TypeScript effectively here.",
      "Consider adding more comments to explain complex logic.",
      "The variable naming is clear and descriptive.",
    ];

    const randomAnalysis = analyses[Math.floor(Math.random() * analyses.length)];

    return {
      analysis: randomAnalysis,
      suggestions: [
        "Add JSDoc comments for better documentation",
        "Consider using React hooks for state management",
        "Review the code for potential optimizations",
      ],
    };
  }
}

export default new RabbitAIService();
