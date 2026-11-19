import { createClient } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { getOrCreateClient } from '@/lib/client-auth';

/** Always authorize the requesting identity on the server, never from an email query parameter. */
export async function getRequestClient(request: NextRequest) {
  const signedSession = await getSession();
  if (signedSession) {
    const user = await db.user.findUnique({ where: { id: signedSession.userId } });
    if (!user || user.email !== signedSession.email || user.status !== 'ACTIVE' || user.role !== 'CLIENT') return null;
    return user;
  }

  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  const token = authHeader.slice('Bearer '.length);
  if (!token || token.length > 8192) return null;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await supabase.auth.getUser(token);
  const email = data.user?.email?.trim().toLowerCase();
  if (error || !email || !data.user?.email_confirmed_at) return null;
  const user = await getOrCreateClient({ kind: 'email', value: email },
    typeof data.user.user_metadata?.full_name === 'string' ? data.user.user_metadata.full_name : undefined);
  if (!user || user.status !== 'ACTIVE' || user.role !== 'CLIENT') return null;
  return user;
}
