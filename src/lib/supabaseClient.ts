import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Singleton pattern to prevent multiple instances during hot reloads
const getSupabaseClient = () => {
  const globalWithSupabase = globalThis as unknown as {
    _supabaseClient: ReturnType<typeof createClient> | undefined;
  };

  if (!globalWithSupabase._supabaseClient) {
    globalWithSupabase._supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }

  return globalWithSupabase._supabaseClient;
};

export const supabase = getSupabaseClient();
