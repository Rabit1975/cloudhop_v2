/**
 * AI Sidecar Service
 * 
 * Runs alongside CloudHop as a companion service
 * Handles AI requests independently from the main app
 * 
 * Usage:
 * - Run in docker: npx tsx src/server/ai-service.ts
 * - Call from frontend: http://localhost:3002/api/ai
 */

import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'ai-sidecar',
    timestamp: new Date().toISOString(),
    openaiConfigured: !!process.env.OPENAI_API_KEY,
  });
});

/**
 * AI Chat endpoint
 * Body: { prompt: string, context?: string }
 */
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { prompt, context } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'prompt is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OPENAI_API_KEY not configured' });
    }

    // Import OpenAI client dynamically to avoid startup errors if key is missing
    const { default: OpenAI } = await import('openai');
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_BASE_URL,
    });

    const systemPrompt = context
      ? `You are Rabbit AI, an assistant for CloudHop. Context: ${context}`
      : 'You are Rabbit AI, an intelligent assistant built into CloudHop.';

    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content || 'No response';

    res.status(200).json({
      response: content,
      model: response.model,
      usage: response.usage,
    });
  } catch (error) {
    console.error('[AI Service] Error:', error);
    res.status(500).json({
      error: 'AI request failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * Image generation endpoint
 * Body: { prompt: string, width?: number, height?: number }
 */
app.post('/api/ai/image', async (req: Request, res: Response) => {
  try {
    const { prompt, width = 512, height = 512 } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'prompt is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OPENAI_API_KEY not configured' });
    }

    const { default: OpenAI } = await import('openai');
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.images.generate({
      model: 'dall-e-3',
      prompt,
      size: '1024x1024',
      quality: 'standard',
      n: 1,
    });

    const imageUrl = response.data[0]?.url;

    if (!imageUrl) {
      return res.status(500).json({ error: 'Failed to generate image' });
    }

    res.status(200).json({
      imageUrl,
      prompt,
      revised_prompt: response.data[0]?.revised_prompt,
    });
  } catch (error) {
    console.error('[AI Service] Image generation error:', error);
    res.status(500).json({
      error: 'Image generation failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * Text generation endpoint (for playlists, summaries, etc.)
 * Body: { prompt: string, type: 'playlist' | 'summary' | 'draft' }
 */
app.post('/api/ai/generate', async (req: Request, res: Response) => {
  try {
    const { prompt, type = 'draft' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'prompt is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OPENAI_API_KEY not configured' });
    }

    const { default: OpenAI } = await import('openai');
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_BASE_URL,
    });

    let systemPrompt = 'You are a helpful assistant.';
    if (type === 'playlist') {
      systemPrompt = 'You are a music curator. Return ONLY a JSON array of 5-8 song title strings.';
    } else if (type === 'summary') {
      systemPrompt = 'You are a summarization expert. Provide a concise summary.';
    } else if (type === 'draft') {
      systemPrompt = 'You are a writing assistant. Help draft messages and content.';
    }

    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 1500,
    });

    const content = response.choices[0]?.message?.content || '';

    // Try to parse as JSON if it's a playlist
    let parsed = content;
    if (type === 'playlist') {
      try {
        parsed = JSON.parse(content);
      } catch {
        parsed = [content];
      }
    }

    res.status(200).json({
      response: parsed,
      type,
      usage: response.usage,
    });
  } catch (error) {
    console.error('[AI Service] Generation error:', error);
    res.status(500).json({
      error: 'Generation failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Startup
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════╗
║  CloudHop AI Sidecar Service       ║
║  Running on port ${PORT}              ║
║  http://localhost:${PORT}             ║
╚════════════════════════════════════╝
  `);

  if (!process.env.OPENAI_API_KEY) {
    console.warn('⚠️  OPENAI_API_KEY not set. AI features will fail.');
    console.warn('   Set OPENAI_API_KEY in your .env file.');
  } else {
    console.log('✓ OpenAI API configured');
  }

  console.log(`
Available endpoints:
  POST /api/ai/chat       - Chat with AI
  POST /api/ai/image      - Generate images
  POST /api/ai/generate   - Generate text (playlists, summaries, etc.)
  GET  /health            - Health check
  `);
});
