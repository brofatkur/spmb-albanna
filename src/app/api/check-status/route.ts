import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q')?.trim();

    if (!query) {
      return NextResponse.json(
        { success: false, message: 'Masukkan nomor pendaftaran, NIK, atau NISN.' },
        { status: 400 }
      );
    }

    const row = db.prepare(`
      SELECT 
        id, 
        nomor_pendaftaran, 
        jenjang, 
        nama_lengkap, 
        nisn, 
        nik, 
        status, 
        catatan, 
        created_at,
        form_data,
        file_paths
      FROM registrations
      WHERE 
        LOWER(nomor_pendaftaran) = LOWER(?) OR 
        nik = ? OR 
        nisn = ?
      ORDER BY id DESC
      LIMIT 1
    `).get(query, query, query) as any;

    if (!row) {
      return NextResponse.json(
        { success: false, message: 'Data pendaftaran tidak ditemukan. Mohon periksa kembali nomor pendaftaran, NIK, atau NISN Anda.' },
        { status: 404 }
      );
    }

    let parsedFormData = {};
    try {
      parsedFormData = JSON.parse(row.form_data);
    } catch {}

    let parsedFilePaths = {};
    try {
      parsedFilePaths = JSON.parse(row.file_paths);
    } catch {}

    return NextResponse.json({
      success: true,
      data: {
        nomor_pendaftaran: row.nomor_pendaftaran,
        jenjang: row.jenjang.toUpperCase(),
        nama_lengkap: row.nama_lengkap,
        nisn: row.nisn,
        nik: row.nik,
        status: row.status,
        catatan: row.catatan,
        created_at: row.created_at,
        formData: parsedFormData,
        filePaths: parsedFilePaths,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan sistem: ' + error.message },
      { status: 500 }
    );
  }
}
