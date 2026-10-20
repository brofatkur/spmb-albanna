import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { cookies } from 'next/headers';

async function checkAdminAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if (!session?.value) return false;
  try {
    const data = JSON.parse(Buffer.from(session.value, 'base64').toString('utf-8'));
    return !!data.username;
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  const isAuth = await checkAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const jenjang = searchParams.get('jenjang');
  const status = searchParams.get('status');
  const search = searchParams.get('search')?.trim();
  const id = searchParams.get('id');

  // Single record detail
  if (id) {
    const item = db.prepare(`SELECT * FROM registrations WHERE id = ?`).get(id) as any;
    if (!item) {
      return NextResponse.json({ success: false, message: 'Tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      data: {
        ...item,
        form_data: JSON.parse(item.form_data || '{}'),
        file_paths: JSON.parse(item.file_paths || '{}'),
      },
    });
  }

  // Build filter query
  let whereClauses: string[] = [];
  let params: any[] = [];

  if (jenjang && jenjang !== 'all') {
    whereClauses.push('jenjang = ?');
    params.push(jenjang.toLowerCase());
  }

  if (status && status !== 'all') {
    whereClauses.push('status = ?');
    params.push(status);
  }

  if (search) {
    whereClauses.push('(nama_lengkap LIKE ? OR nomor_pendaftaran LIKE ? OR nik LIKE ? OR nisn LIKE ?)');
    const searchWild = `%${search}%`;
    params.push(searchWild, searchWild, searchWild, searchWild);
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

  const rows = db.prepare(`
    SELECT 
      id, nomor_pendaftaran, jenjang, nama_lengkap, nisn, nik, 
      jenis_kelamin, nama_ayah, no_handphone, email, status, catatan, created_at
    FROM registrations
    ${whereSql}
    ORDER BY id DESC
  `).all(...params);

  // Statistics
  const stats = {
    total: (db.prepare(`SELECT COUNT(*) as c FROM registrations`).get() as any).c,
    paud: (db.prepare(`SELECT COUNT(*) as c FROM registrations WHERE jenjang = 'paud'`).get() as any).c,
    sd: (db.prepare(`SELECT COUNT(*) as c FROM registrations WHERE jenjang = 'sd'`).get() as any).c,
    smp: (db.prepare(`SELECT COUNT(*) as c FROM registrations WHERE jenjang = 'smp'`).get() as any).c,
    sma: (db.prepare(`SELECT COUNT(*) as c FROM registrations WHERE jenjang = 'sma'`).get() as any).c,
    pending: (db.prepare(`SELECT COUNT(*) as c FROM registrations WHERE status = 'Menunggu Verifikasi'`).get() as any).c,
    verified: (db.prepare(`SELECT COUNT(*) as c FROM registrations WHERE status = 'Terverifikasi'`).get() as any).c,
    accepted: (db.prepare(`SELECT COUNT(*) as c FROM registrations WHERE status = 'Lulus / Diterima'`).get() as any).c,
    rejected: (db.prepare(`SELECT COUNT(*) as c FROM registrations WHERE status = 'Ditolak'`).get() as any).c,
  };

  return NextResponse.json({
    success: true,
    data: rows,
    stats,
  });
}

export async function PUT(req: NextRequest) {
  const isAuth = await checkAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status, catatan } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'ID dan status wajib diisi' }, { status: 400 });
    }

    db.prepare(`
      UPDATE registrations 
      SET status = ?, catatan = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(status, catatan || '', id);

    return NextResponse.json({ success: true, message: 'Status berhasil diperbarui' });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const isAuth = await checkAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID wajib diisi' }, { status: 400 });
    }

    db.prepare(`DELETE FROM registrations WHERE id = ?`).run(id);

    return NextResponse.json({ success: true, message: 'Data berhasil dihapus' });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
