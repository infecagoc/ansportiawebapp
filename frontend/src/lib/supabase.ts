import { createClient } from '@supabase/supabase-js';

// Browser-side Supabase client — uses the PUBLIC anon key only.
// Used for Supabase Auth (login/session). File access goes through the
// backend API (signed URLs), NOT directly from the browser.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // eslint-disable-next-line no-console
  console.warn('Supabase env vars missing — set NEXT_PUBLIC_SUPABASE_* in .env');
}

export const supabase = createClient(url ?? '', anonKey ?? '');
