import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

export interface AdminSession {
  id: number;
  username: string;
  name: string;
  role: string;
  loginAt: number;
}

const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret && process.env.NODE_ENV === 'production') {
    throw new Error('ADMIN_SESSION_SECRET belum dikonfigurasi.');
  }
  return secret || 'spmb-albanna-local-development-only';
}

function sign(payload: string): string {
  return createHmac('sha256', getSecret()).update(payload).digest('base64url');
}

export function createAdminSession(session: AdminSession): string {
  const payload = Buffer.from(JSON.stringify(session)).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSession(token: string): AdminSession | null {
  const [payload, receivedSignature] = token.split('.');
  if (!payload || !receivedSignature) return null;

  const expectedSignature = sign(payload);
  const expected = Buffer.from(expectedSignature);
  const received = Buffer.from(receivedSignature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null;

  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as AdminSession;
    if (!session.username || !session.loginAt) return null;
    if (Date.now() - session.loginAt > SESSION_MAX_AGE_MS) return null;
    return session;
  } catch {
    return null;
  }
}

export async function getCurrentAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  if (!token) return null;

  try {
    return verifyAdminSession(token);
  } catch {
    return null;
  }
}

interface InternalResourceAccess {
  resource: string;
  expiresAt: number;
}

export function createInternalResourceToken(resource: string, ttlMs = 10 * 60 * 1000): string {
  const payload = Buffer.from(JSON.stringify({
    resource,
    expiresAt: Date.now() + ttlMs,
  } satisfies InternalResourceAccess)).toString('base64url');

  return `${payload}.${sign(payload)}`;
}

export function verifyInternalResourceToken(token: string, resource: string): boolean {
  const [payload, receivedSignature] = token.split('.');
  if (!payload || !receivedSignature) return false;

  const expectedSignature = sign(payload);
  const expected = Buffer.from(expectedSignature);
  const received = Buffer.from(receivedSignature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return false;

  try {
    const access = JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf8')
    ) as InternalResourceAccess;

    return access.resource === resource && access.expiresAt >= Date.now();
  } catch {
    return false;
  }
}
