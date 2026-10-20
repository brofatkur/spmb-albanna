import { createHmac, timingSafeEqual } from 'crypto';

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
