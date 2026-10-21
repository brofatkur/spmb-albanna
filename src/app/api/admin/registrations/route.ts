import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { verifyAdminSession } from '@/lib/admin-session';
import { cookies } from 'next/headers';
import { insertInsForgeRecord } from '@/lib/insforge';
import {
  buildInsForgeRegistrationPayload,
  getRegistrationCoreFields,
  normalizeRegistrationFormData,
} from '@/lib/registration-data';

async function checkAdminAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if (!session?.value) return null;
  try {
    return verifyAdminSession(session.value);
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const admin = await checkAdminAuth();
  if (!admin) {
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
      user: admin,
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
    user: admin,
  });
}

export async function PUT(req: NextRequest) {
  const admin = await checkAdminAuth();
  if (!admin) {
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

export async function PATCH(req: NextRequest) {
  const admin = await checkAdminAuth();
  if (!admin) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (admin.role !== 'superadmin') {
    return NextResponse.json(
      { success: false, message: 'Hanya super admin yang dapat mengoreksi data formulir.' },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const id = Number(body.id);
    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ success: false, message: 'ID pendaftar tidak valid.' }, { status: 400 });
    }

    const current = db.prepare(`SELECT * FROM registrations WHERE id = ?`).get(id) as any;
    if (!current) {
      return NextResponse.json({ success: false, message: 'Data pendaftar tidak ditemukan.' }, { status: 404 });
    }

    const formData = normalizeRegistrationFormData(body.form_data);
    const core = getRegistrationCoreFields(current.jenjang, formData);
    if (!core.nama_lengkap) {
      return NextResponse.json(
        { success: false, message: 'Nama lengkap siswa wajib diisi.' },
        { status: 400 }
      );
    }

    const filePaths = JSON.parse(current.file_paths || '{}');
    const insforgePayload = buildInsForgeRegistrationPayload({
      nomor_pendaftaran: current.nomor_pendaftaran,
      jenjang: current.jenjang,
      form_data: formData,
      file_paths: filePaths,
      status: current.status,
      catatan: current.catatan,
      fallback_nama_lengkap: current.nama_lengkap,
    });

    const insforgeResult = await insertInsForgeRecord(insforgePayload);
    if (!insforgeResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Perubahan belum disimpan karena sinkronisasi InsForge gagal.',
          detail: insforgeResult.error,
        },
        { status: 502 }
      );
    }

    const beforeData = {
      nama_lengkap: current.nama_lengkap,
      nisn: current.nisn,
      nik: current.nik,
      jenis_kelamin: current.jenis_kelamin,
      nama_ayah: current.nama_ayah,
      no_handphone: current.no_handphone,
      email: current.email,
      form_data: JSON.parse(current.form_data || '{}'),
    };

    const transaction = db.transaction(() => {
      db.prepare(`
        UPDATE registrations
        SET nama_lengkap = ?, nisn = ?, nik = ?, jenis_kelamin = ?, nama_ayah = ?,
            no_handphone = ?, email = ?, form_data = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(
        insforgePayload.nama_lengkap,
        core.nisn,
        core.nik,
        core.jenis_kelamin,
        core.nama_ayah,
        insforgePayload.no_handphone,
        core.email,
        JSON.stringify(formData),
        id
      );

      db.prepare(`
        INSERT INTO registration_edit_logs (
          registration_id, admin_user_id, admin_username, before_data, after_data
        ) VALUES (?, ?, ?, ?, ?)
      `).run(
        id,
        admin.id,
        admin.username,
        JSON.stringify(beforeData),
        JSON.stringify({
          nama_lengkap: insforgePayload.nama_lengkap,
          nisn: core.nisn,
          nik: core.nik,
          jenis_kelamin: core.jenis_kelamin,
          nama_ayah: core.nama_ayah,
          no_handphone: insforgePayload.no_handphone,
          email: core.email,
          form_data: formData,
        })
      );
    });
    transaction();

    const updated = db.prepare(`SELECT * FROM registrations WHERE id = ?`).get(id) as any;
    return NextResponse.json({
      success: true,
      message: 'Data formulir berhasil diperbarui.',
      data: {
        ...updated,
        form_data: JSON.parse(updated.form_data || '{}'),
        file_paths: JSON.parse(updated.file_paths || '{}'),
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan saat menyimpan data.';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = await checkAdminAuth();
  if (!admin) {
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
