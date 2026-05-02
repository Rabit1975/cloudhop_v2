/**
 * AI Sidecar Service (OpenAI + Ollama Support)
 * 
 * Supports two providers:
 * 1. OpenAI (requires API key)
 * 2. Ollama (free, runs locally in Docker)
 * 
 * Usage:
 * - With OpenAI: OPENAI_API_KEY=sk-... npm run dev:ai
 * - With Ollama: OLLAMA_MODEL=mistral npm run dev:ai
 * 
 * Run in docker: npx tsx src/server/ai-service.ts
 */

import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3002;

const AI_PROVIDER = process.env.AI_PROVIDER || 'ollama'; // Default to Ollama
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://ollama:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'mistral';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'ai-sidecar',
    provider: AI_PROVIDER,
    model: AI_PROVIDER === 'ollama' ? OLLAMA_MODEL : 'gpt-4o-mini',
    timestamp: new Date().toISOString(),
    ollamaReachable: AI_PROVIDER === 'ollama' ? 'checking...' : 'N/A',
    openaiConfigured: !!OPENAI_API_KEY,
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

    if (AI_PROVIDER === 'ollama') {
      return chatWithOllama(prompt, context, res);
    } else if (AI_PROVIDER === 'openai') {
      return chatWithOpenAI(prompt, context, res);
    } else {
      return res.status(500).json({ error: `Unknown AI provider: ${AI_PROVIDER}` });
    }
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
 * Note: Ollama doesn't support image generation yet
 */
app.post('/api/ai/image', async (req: Request, res: Response) => {
  try {
    if (AI_PROVIDER === 'ollama') {
      return res.status(501).json({
        error: 'Image generation not supported with Ollama',
        provider: 'ollama',
        suggestion: 'Use OpenAI provider or provide image URLs instead',
      });
    }

    return imageWithOpenAI(req.body, res);
  } catch (error) {
    console.error('[AI Service] Image generation error:', error);
    res.status(500).json({
      error: 'Image generation failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * Text generation endpoint
 * Body: { prompt: string, type: 'playlist' | 'summary' | 'draft' }
 */
app.post('/api/ai/generate', async (req: Request, res: Response) => {
  try {
    const { prompt, type = 'draft' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'prompt is required' });
    }

    if (AI_PROVIDER === 'ollama') {
      return generateWithOllama(prompt, type, res);
    } else if (AI_PROVIDER === 'openai') {
      return generateWithOpenAI(prompt, type, res);
    } else {
      return res.status(500).json({ error: `Unknown AI provider: ${AI_PROVIDER}` });
    }
  } catch (error) {
    console.error('[AI Service] Generation error:', error);
    res.status(500).json({
      error: 'Generation failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// ─────────────────────────────────────────────────────────────
// OLLAMA FUNCTIONS
// ─────────────────────────────────────────────────────────────

async function chatWithOllama(prompt: string, context: string | undefined, res: Response) {
  try {
    const systemPrompt = context
      ? `You are Rabbit AI, an assistant for CloudHop. Context: ${context}`
      : 'You are Rabbit AI, an intelligent assistant built into CloudHop. Be helpful and concise.';

    const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: `${systemPrompt}\n\nUser: ${prompt}`,
        stream: false,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.statusText}`);
    }

    const data: any = await response.json();

    res.status(200).json({
      response: data.response.trim(),
      model: OLLAMA_MODEL,
      provider: 'ollama',
    });
  } catch (error) {
    console.error('[Ollama] Chat error:', error);
    res.status(500).json({
      error: 'Ollama chat failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      tip: `Make sure Ollama is running: docker-compose up ollama`,
    });
  }
}

async function generateWithOllama(prompt: string, type: string, res: Response) {
  try {
    let systemPrompt = 'You are a helpful assistant.';
    if (type === 'playlist') {
      systemPrompt = 'You are a music curator. Return ONLY a JSON array of 5-8 song title strings.';
    } else if (type === 'summary') {
      systemPrompt = 'You are a summarization expert. Provide a concise summary.';
    } else if (type === 'draft') {
      systemPrompt = 'You are a writing assistant. Help draft messages and content.';
    }

    const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: `${systemPrompt}\n\nUser: ${prompt}`,
        stream: false,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.statusText}`);
    }

    const data: any = await response.json();
    let content = data.response.trim();

    // Try to parse as JSON if it's a playlist
    if (type === 'playlist') {
      try {
        content = JSON.parse(content);
      } catch {
        content = [content];
      }
    }

    res.status(200).json({
      response: content,
      type,
      model: OLLAMA_MODEL,
      provider: 'ollama',
    });
  } catch (error) {
    console.error('[Ollama] Generation error:', error);
    res.status(500).json({
      error: 'Ollama generation failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      tip: `Make sure Ollama is running: docker-compose up ollama`,
    });
  }
}

// ─────────────────────────────────────────────────────────────
// OPENAI FUNCTIONS
// ─────────────────────────────────────────────────────────────

async function chatWithOpenAI(prompt: string, context: string | undefined, res: Response) {
  try {
    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OPENAI_API_KEY not configured' });
    }

    const { default: OpenAI } = await import('openai');
    const client = new OpenAI({
      apiKey: OPENAI_API_KEY,
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
      provider: 'openai',
      usage: response.usage,
    });
  } catch (error) {
    console.error('[OpenAI] Chat error:', error);
    res.status(500).json({
      error: 'OpenAI request failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

async function imageWithOpenAI(body: any, res: Response) {
  try {
    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OPENAI_API_KEY not configured' });
    }

    const { prompt, width = 512, height = 512 } = body;

    if (!prompt) {
      return res.status(400).json({ error: 'prompt is required' });
    }

    const { default: OpenAI } = await import('openai');
    const client = new OpenAI({
      apiKey: OPENAI_API_KEY,
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
      provider: 'openai',
      revised_prompt: response.data[0]?.revised_prompt,
    });
  } catch (error) {
    console.error('[OpenAI] Image generation error:', error);
    res.status(500).json({
      error: 'Image generation failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

async function generateWithOpenAI(prompt: string, type: string, res: Response) {
  try {
    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OPENAI_API_KEY not configured' });
    }

    const { default: OpenAI } = await import('openai');
    const client = new OpenAI({
      apiKey: OPENAI_API_KEY,
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
      provider: 'openai',
      usage: response.usage,
    });
  } catch (error) {
    console.error('[OpenAI] Generation error:', error);
    res.status(500).json({
      error: 'Generation failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

// Startup
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════╗
║  CloudHop AI Sidecar Service       ║
║  Running on port ${PORT}              ║
║  http://localhost:${PORT}             ║
╚════════════════════════════════════╝
  `);

  console.log(`\nAI Provider: ${AI_PROVIDER.toUpperCase()}`);

  if (AI_PROVIDER === 'ollama') {
    console.log(`✓ Using Ollama (local, free)`);
    console.log(`  Model: ${OLLAMA_MODEL}`);
    console.log(`  Base URL: ${OLLAMA_BASE_URL}`);
    console.log(`  Status: Make sure Ollama container is running`);
  } else if (AI_PROVIDER === 'openai') {
    if (OPENAI_API_KEY) {
      console.log(`✓ Using OpenAI`);
      console.log(`  Model: ${process.env.OPENAI_MODEL || 'gpt-4o-mini'}`);
    } else {
      console.warn('⚠️  OPENAI_API_KEY not set. OpenAI features will fail.');
    }
  } else {
    console.warn(`⚠️  Unknown AI provider: ${AI_PROVIDER}`);
  }

  console.log(`
Available endpoints:
  POST /api/ai/chat       - Chat with AI
  POST /api/ai/image      - Generate images (OpenAI only)
  POST /api/ai/generate   - Generate text (playlists, summaries, etc.)
  GET  /health            - Health check
  `);
});
