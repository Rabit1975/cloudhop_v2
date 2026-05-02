/**
 * Generate a playlist of actual good music based on mood
 * Uses Ollama to create real artist + song combinations
 * 
 * Examples:
 * - Focus: "The Blaze - Virgins", "Tycho - Awake", etc.
 * - Chill: "Bonobo - Kerala", "Floating Points - Silhouette"
 * - Workout: "Justice - D.A.N.C.E.", "The Chemical Brothers - Block Rockin' Beats"
 */

async function generateGoodPlaylist(mood: string, prompt: string): Promise<string[]> {
  try {
    const response = await fetch('http://localhost:3003/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: `Generate a ${mood} playlist for: ${prompt}

Return ONLY a JSON array of 8 real songs with actual artists. Format: "Artist - Song Title"
Examples of good formatting:
["Tycho - Awake", "Bonobo - Kerala", "Jon Hopkins - Emerald Rush"]

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
    
    // Actual good fallback playlists by mood
    const playlists: Record<string, string[]> = {
      focus: [
        'Tycho - Awake',
        'Jon Hopkins - Emerald Rush',
        'Bonobo - Kerala',
        'Four Tet - Floating',
        'Floating Points - Silhouette',
        'Boards of Canada - Everything Hertz',
        'Aphex Twin - Avril 14th',
        'Ólafur Arnalds - Near Light'
      ],
      chill: [
        'Bonobo - Kerala',
        'Tycho - Awake',
        'Floating Points - Silhouette',
        'The Cinematic Orchestra - To Build A Home',
        'Zero 7 - In the Waiting Line',
        'Air - La Femme d\'Argent',
        'Boards of Canada - Roygbiv',
        'Ólafur Arnalds - Re:Member'
      ],
      workout: [
        'Justice - D.A.N.C.E.',
        'The Chemical Brothers - Block Rockin\' Beats',
        'LCD Soundsystem - All My Friends',
        'Daft Punk - One More Time',
        'Fatboy Slim - Praise You',
        'The Prodigy - Firestarter',
        'Basement Jaxx - Where\'s Your Head At',
        'Diplo - Express Yourself'
      ],
      happy: [
        'Pharrell Williams - Happy',
        'Walking on Sunshine - Katrina & The Waves',
        'Don\'t Stop Me Now - Queen',
        'Good As Hell - Lizzo',
        'Levitating - Dua Lipa',
        'Walking on Air - Katy Perry',
        'Shut Up and Dance - WALK THE MOON',
        'Blinding Lights - The Weeknd'
      ],
      sad: [
        'Bon Iver - Holocene',
        'Sigur Rós - Hoppípolla',
        'Explosions in the Sky - Your Hand in Mine',
        'Ólafur Arnalds - Re:Member',
        'Nils Frahm - Felt',
        'Max Richter - On the Nature of Daylight',
        'Imogen Heap - Hide and Seek',
        'Grizzly Bear - Two Weeks'
      ],
      party: [
        'Daft Punk - Get Lucky',
        'MGMT - Electric Feel',
        'Chromeo - Bonafied Lovin\'',
        'Nile Rodgers - Le Freak',
        'Earth, Wind & Fire - September',
        'Donna Summer - I Feel Love',
        'The Bee Gees - Stayin\' Alive',
        'Gloria Gaynor - I Will Survive'
      ],
      sleep: [
        'Ambient 1 - Music for Airports - Brian Eno',
        'Max Richter - Sleep',
        'Nils Frahm - All Melody',
        'Ólafur Arnalds - Island Songs',
        'Alva Noto - Unitxt',
        'Lawrence English - Cruel Optimism',
        'Fennesz - Black Sea',
        'Pan American - The Delta'
      ],
      study: [
        'Tycho - Awake',
        'Jon Hopkins - Emerald Rush',
        'Ólafur Arnalds - Near Light',
        'Nils Frahm - All Melody',
        'Max Richter - On the Nature of Daylight',
        'Kiasmos - Thrown Into The Lift',
        'Bonobo - Kerala',
        'Boards of Canada - Roygbiv'
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
