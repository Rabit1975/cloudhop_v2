/**
 * Generate a playlist of actual good music based on mood
 * Uses Ollama to create real artist + song combinations
 * 
 * Curated for: NF, I Prevail, Wind Walkers, Logic, Joyner Lucas style
 * (Hip-hop, rap-rock, alternative metal, emotional lyrics)
 */

async function generateGoodPlaylist(mood: string, prompt: string): Promise<string[]> {
  try {
    const response = await fetch('http://localhost:3003/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: `Generate a ${mood} playlist for: ${prompt}

Return ONLY a JSON array of 8 real songs with actual artists. Format: "Artist - Song Title"
Focus on artists like: NF, I Prevail, Wind Walkers, Logic, Joyner Lucas, Eminem, Denzel Curry, Token, Hopsin
Examples of good formatting:
["NF - Clouds", "I Prevail - My Heart", "Wind Walkers - Lost"]

Return ONLY the JSON array, no other text.`,
        type: 'playlist'
      })
    });

    const data = await response.json();
    
    if (Array.isArray(data.response)) {
      return data.response;
    }
    
    // Parse if it's a string
    if (typeof data.response === 'string') {
      const parsed = JSON.parse(data.response);
      if (Array.isArray(parsed)) return parsed;
    }

    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Failed to generate playlist:', error);
    
    // Curated playlists by mood - HIP-HOP / RAP-ROCK / ALT-METAL focused
    const playlists: Record<string, string[]> = {
      focus: [
        'NF - Clouds',
        'Logic - Everybody',
        'Joyner Lucas - Ross Capicchioni',
        'Token - Headline',
        'I Prevail - Breaking Down',
        'Denzel Curry - Ultimate',
        'Eminem - Lose Yourself',
        'Hopsin - Ill Mind of Hopsin 5'
      ],
      chill: [
        'NF - Let You Down',
        'Logic - 1-800-273-8255',
        'Wind Walkers - Lost',
        'Juice WRLD - Lucid Dreams',
        'Post Malone - Circles',
        'The Kid LAROI - WITHOUT YOU',
        'Lil Peep - Hellboy',
        'XXXTentacion - Jocelyn (No Bystanders)'
      ],
      workout: [
        'I Prevail - Bow Down',
        'NF - PAID MY DUES',
        'Joyner Lucas - Lil Demon',
        'Eminem - Till I Collapse',
        'Token - Eat Sleep Rap Repeat',
        'Denzel Curry - Ultimate',
        'Juice WRLD - Robbery',
        'Logic - Homicide'
      ],
      angry: [
        'I Prevail - My Heart',
        'NF - PAID MY DUES',
        'Joyner Lucas - Lil Demon',
        'Eminem - Kill You',
        'Denzel Curry - CLOUT COBAIN',
        'Token - Headline',
        'Hopsin - Ill Mind of Hopsin 6',
        'Suicide Boys - STOP BREATHING'
      ],
      sad: [
        'NF - Let You Down',
        'Logic - 1-800-273-8255',
        'Wind Walkers - Lost',
        'Joyner Lucas - I Love You',
        'Juice WRLD - Legends Never Die',
        'XXXTentacion - Sad!',
        'Lil Peep - Falling Down',
        'The Kid LAROI - Tragic'
      ],
      hype: [
        'I Prevail - Bow Down',
        'NF - PAID MY DUES',
        'Token - Eat Sleep Rap Repeat',
        'Logic - Eminem Tribute',
        'Joyner Lucas - Ross Capicchioni',
        'Eminem - Rap God',
        'Denzel Curry - Ta13oo',
        'Hopsin - Ill Mind of Hopsin 7'
      ],
      motivation: [
        'NF - PAID MY DUES',
        'I Prevail - Breaking Down',
        'Token - Time Will Tell',
        'Logic - Everybody',
        'Joyner Lucas - I Love You',
        'Wind Walkers - Lost',
        'Eminem - Lose Yourself',
        'Denzel Curry - Ultimate'
      ],
      reflective: [
        'NF - Let You Down',
        'Logic - 1-800-273-8255',
        'Wind Walkers - Lost',
        'Joyner Lucas - I Love You',
        'Token - Headline',
        'NF - Outro',
        'Logic - Welcome',
        'I Prevail - My Heart'
      ],
      party: [
        'I Prevail - Bow Down',
        'Logic - Eminem Tribute',
        'Token - Eat Sleep Rap Repeat',
        'Eminem - The Real Slim Shady',
        'Denzel Curry - CASH',
        'Joyner Lucas - Ross Capicchioni',
        'Post Malone - Congratulations',
        'Juice WRLD - Mo City Flexologist'
      ]
    };

    // Match mood to playlist, default to focus
    const moodLower = mood.toLowerCase();
    const matched = Object.keys(playlists).find(key => 
      moodLower.includes(key) || key.includes(moodLower)
    );

    return playlists[matched || 'focus'];
  }
}

export default generateGoodPlaylist;
