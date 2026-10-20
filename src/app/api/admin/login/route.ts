import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { createAdminSession } from '@/lib/admin-session';
import { hashPassword, isHashedPassword, verifyPassword } from '@/lib/password';
import { cookies } from 'next/headers';

interface AdminUser {
  id: number;
  username: string;
  password_hash: string;
  name: string;
  role: string;
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username dan password wajib diisi.' },
        { status: 400 }
      );
    }

    const admin = db.prepare(`
      SELECT id, username, password_hash, name, role 
      FROM admin_users 
      WHERE username = ?
    `).get(username) as AdminUser | undefined;

    if (!admin || !verifyPassword(password, admin.password_hash)) {
      return NextResponse.json(
        { success: false, message: 'Username atau password salah.' },
        { status: 401 }
      );
    }

    if (!isHashedPassword(admin.password_hash)) {
      db.prepare('UPDATE admin_users SET password_hash = ? WHERE id = ?')
        .run(hashPassword(password), admin.id);
    }

    const sessionPayload = createAdminSession({
      id: admin.id,
      username: admin.username,
      name: admin.name,
      role: admin.role,
      loginAt: Date.now(),
    });

    const cookieStore = await cookies();
    cookieStore.set('admin_session', sessionPayload, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({
      success: true,
      user: {
        id: admin.id,
        username: admin.username,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Kesalahan tidak diketahui';
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan login: ' + message },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return NextResponse.json({ success: true, message: 'Logged out' });
}
