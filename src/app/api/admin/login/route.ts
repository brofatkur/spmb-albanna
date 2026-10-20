import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { cookies } from 'next/headers';

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
    `).get(username) as any;

    if (!admin || admin.password_hash !== password) {
      return NextResponse.json(
        { success: false, message: 'Username atau password salah.' },
        { status: 401 }
      );
    }

    const sessionPayload = JSON.stringify({
      id: admin.id,
      username: admin.username,
      name: admin.name,
      role: admin.role,
      loginAt: Date.now(),
    });

    const cookieStore = await cookies();
    cookieStore.set('admin_session', Buffer.from(sessionPayload).toString('base64'), {
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
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan login: ' + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return NextResponse.json({ success: true, message: 'Logged out' });
}
