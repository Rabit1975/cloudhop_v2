import { createClient } from '@supabase/supabase-js'

// Debug: Log what environment variables are available
console.log('Available env vars:', import.meta.env)
console.log('SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? '***FOUND***' : 'MISSING')

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
