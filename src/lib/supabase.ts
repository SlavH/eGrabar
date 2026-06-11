import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

console.log("Supabase URL present:", !!supabaseUrl);
console.log("Supabase Key present:", !!supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  throw new Error(`Missing Supabase environment variables: URL=${!!supabaseUrl}, Key=${!!supabaseKey}`);
}

export const supabase = createBrowserClient(supabaseUrl, supabaseKey);

export const getAuth = () => supabase.auth;
