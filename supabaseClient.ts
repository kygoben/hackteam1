// supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL) throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
if (!SUPABASE_KEY) throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
