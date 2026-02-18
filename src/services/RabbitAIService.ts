// RabbitAI Service — wraps the ai/AIClient for use throughout CloudHop

import { rabbitAI } from '../../ai/AIClient';

class RabbitAIService {
  /**
   * Get a contextual response based on the current view and a user prompt.
   */
  async getContextualResponse(view: string, prompt: string): Promise<string> {
    try {
      const systemPrompt = this.buildSystemPrompt(view);
      const response = await rabbitAI.chat([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ]);
      return response;
    } catch (err) {
      console.error('[RabbitAI] getContextualResponse failed:', err);
      return this.getFallbackResponse(view, prompt);
    }
  }

  /**
   * Generate plain text from a prompt.
   */
  async generateText(prompt: string): Promise<string> {
    try {
      const response = await rabbitAI.chat([
        { role: 'system', content: 'You are a helpful AI assistant for CloudHop.' },
        { role: 'user', content: prompt },
      ]);
      return response;
    } catch (err) {
      console.error('[RabbitAI] generateText failed:', err);
      return 'AI service is currently unavailable. Please try again later.';
    }
  }

  /**
   * Generate an image from a text prompt.
   * Returns an HTMLImageElement or null.
   */
  async generateImage(
    prompt: string,
    options: { width?: number; height?: number; quality?: number } = {}
  ): Promise<HTMLImageElement | null> {
    try {
      // Use picsum as a placeholder until a real image API is configured
      const seed = encodeURIComponent(prompt.slice(0, 30));
      const w = options.width ?? 400;
      const h = options.height ?? 300;
      const img = new Image(w, h);
      img.src = `https://picsum.photos/seed/${seed}/${w}/${h}`;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Image load failed'));
      });
      return img;
    } catch (err) {
      console.error('[RabbitAI] generateImage failed:', err);
      return null;
    }
  }

  /**
   * Generate a playlist of song names based on mood and prompt.
   */
  async generatePlaylist(mood: string, prompt: string): Promise<string[]> {
    try {
      const response = await rabbitAI.chat([
        {
          role: 'system',
          content:
            'You are a music curator. Return ONLY a JSON array of 5-8 song title strings — no other text.',
        },
        {
          role: 'user',
          content: `Generate a ${mood} playlist for: ${prompt}`,
        },
      ]);
      const parsed = JSON.parse(response);
      if (Array.isArray(parsed)) return parsed as string[];
      throw new Error('Not an array');
    } catch {
      // Fallback playlist
      return [
        `${mood.charAt(0).toUpperCase() + mood.slice(1)} Vibes - CloudHop Mix`,
        'Neon Nights - Synthwave Collection',
        'Digital Horizon - Future Bass',
        'Quantum Beats - Experimental Electronic',
        'Cosmic Journey - Ambient Dreams',
      ];
    }
  }

  // ── Private helpers ─────────────────────────────────────────────

  private buildSystemPrompt(view: string): string {
    const base =
      'You are Rabbit AI, the intelligent assistant built into CloudHop — a social productivity platform. Be concise, friendly, and helpful.';
    const context: Record<string, string> = {
      Dashboard:
        `${base} The user is on their Dashboard. Help with productivity, activity reviews, and daily planning.`,
      Chat:
        `${base} The user is in Chat / HopHub. Help with message drafts, summaries, translations, and community engagement.`,
      Meetings:
        `${base} The user is in HopMeetings. Help with meeting prep, transcription, note-taking, and action items.`,
      Arcade:
        `${base} The user is in the Game Hub. Help with game strategy, tips, and finding players.`,
      Music:
        `${base} The user is in Music. Help with playlist creation, mood analysis, and music discovery.`,
    };
    return context[view] ?? base;
  }

  private getFallbackResponse(view: string, prompt: string): string {
    const fallbacks: Record<string, string> = {
      Dashboard:
        "I've reviewed your activity. You have unread messages and upcoming tasks. Focus on your top priority item first.",
      Chat:
        'I can help summarize conversations, draft replies, or analyze tone. Please check your AI endpoint configuration.',
      Meetings:
        'I can help prepare notes and action items for your meeting. Please ensure the AI service endpoint is reachable.',
      Arcade:
        'I can provide game strategy tips once the AI service is connected. Check your endpoint configuration.',
      Music:
        'I can generate playlists and mood-based music suggestions once connected. Check your AI endpoint.',
    };
    return (
      fallbacks[view] ??
      'Rabbit AI is currently unavailable. Please check your VITE_RABBIT_AI_ENDPOINT setting.'
    );
  }
}

const rabbitAIService = new RabbitAIService();
export default rabbitAIService;
