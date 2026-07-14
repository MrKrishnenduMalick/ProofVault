import { type NextRequest } from 'next/server';
import { createClient } from '@/lib/auth/supabase';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  // The callback handler is used by Supabase to handle OAuth redirects
  // The session is automatically handled by Supabase Auth
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/(dashboard)';

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after auth
  return new Response(null, {
    status: 302,
    headers: {
      Location: next,
    },
  });
}