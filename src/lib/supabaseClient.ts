import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:54321';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'development-key-placeholder';

// Only initialize Supabase if we have real credentials
const getSupabaseClient = () => {
  // Skip Supabase initialization in development without real credentials
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.warn('Supabase credentials not found - running in development mode');
    return null;
  }

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
