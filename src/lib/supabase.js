import { createClient } from '@supabase/supabase-js';

// We pull the keys securely from your environment file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Initialize and export the client so we can use it anywhere in the app
export const supabase = createClient(supabaseUrl, supabaseKey);
