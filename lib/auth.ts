/**
 * InkMonk Research — signed server-side sessions.
 * JWT_SECRET is mandatory; never ship a predictable signing key.
 */
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

function sessionKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32 || secret.startsWith('replace-with-')) {
    throw new Error('JWT_SECRET must be set to a unique value of at least 32 characters.');
  }
  return new TextEncoder().encode(secret);
}

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export async function signToken(payload: JWTPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(sessionKey());
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, sessionKey(), { algorithms: ['HS256'] });
    if (typeof payload.userId !== 'string' || typeof payload.email !== 'string' ||
        typeof payload.name !== 'string' || !['CLIENT', 'STAFF', 'ADMIN'].includes(String(payload.role))) return null;
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('inkmonk_session')?.value;
  return token ? verifyToken(token) : null;
}

export async function requireSession(): Promise<JWTPayload> {
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');
  return session;
}

export async function requireRole(role: 'CLIENT' | 'STAFF' | 'ADMIN'): Promise<JWTPayload> {
  const session = await requireSession();
  const roleHierarchy = { CLIENT: 1, STAFF: 2, ADMIN: 3 };
  if ((roleHierarchy[session.role as keyof typeof roleHierarchy] ?? 0) < roleHierarchy[role]) {
    throw new Error('Forbidden');
  }
  return session;
}
