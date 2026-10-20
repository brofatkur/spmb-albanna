import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

type RegistrationRow = {
  id: number;
  nomor_pendaftaran: string;
  jenjang: string;
  nama_lengkap: string;
  nisn: string | null;
  nik: string | null;
  status: string;
  catatan: string | null;
  created_at: string;
  form_data: string;
  file_paths: string | null;
  no_handphone: string | null;
};

const normalizePhone = (value: unknown) => {
  const digits = String(value ?? '').replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('62')) return `0${digits.slice(2)}`;
  if (digits.startsWith('8')) return `0${digits}`;
  return digits;
};

const parentPhones = (row: RegistrationRow) => {
  let formData: Record<string, unknown> = {};
  try {
    formData = JSON.parse(row.form_data || '{}');
  } catch {}

  const jenjang = row.jenjang.toLowerCase();
  const values = [
    row.no_handphone,
    formData[`handphone_ayah_${jenjang}`],
    formData[`no_handphone_ayah_${jenjang}`],
    formData.handphone_ayah,
    formData.no_handphone_ayah,
    formData[`handphone_ibu_${jenjang}`],
    formData[`no_handphone_ibu_${jenjang}`],
    formData.handphone_ibu,
    formData.no_handphone_ibu,
  ];

  return new Set(values.map(normalizePhone).filter(Boolean));
};

const serializeRow = (row: RegistrationRow) => {
  let parsedFormData = {};
  try {
    parsedFormData = JSON.parse(row.form_data);
  } catch {}

  let parsedFilePaths = {};
  try {
    parsedFilePaths = JSON.parse(row.file_paths || '{}');
  } catch {}

  return {
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
  };
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q')?.trim();

    if (!query) {
      return NextResponse.json(
        { success: false, message: 'Masukkan nomor pendaftaran, NIK, NISN, atau nomor HP ayah/ibu.' },
        { status: 400 }
      );
    }

    const selectFields = `
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
        file_paths,
        no_handphone
      FROM registrations
    `;

    const exactRow = db.prepare(`
      ${selectFields}
      WHERE 
        LOWER(nomor_pendaftaran) = LOWER(?) OR 
        nik = ? OR 
        nisn = ?
      ORDER BY id DESC
      LIMIT 1
    `).get(query, query, query) as RegistrationRow | undefined;

    let rows: RegistrationRow[] = exactRow ? [exactRow] : [];

    if (!exactRow) {
      const normalizedQuery = normalizePhone(query);
      if (normalizedQuery.length >= 9) {
        const candidates = db.prepare(`
          ${selectFields}
          ORDER BY id DESC
        `).all() as RegistrationRow[];

        rows = candidates.filter((candidate) => parentPhones(candidate).has(normalizedQuery));
      }
    }

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Data pendaftaran tidak ditemukan. Periksa kembali nomor pendaftaran, NIK, NISN, atau nomor HP ayah/ibu.' },
        { status: 404 }
      );
    }


    const results = rows.map(serializeRow);

    return NextResponse.json({
      success: true,
      data: results[0],
      results,
      count: results.length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan sistem: ' + message },
      { status: 500 }
    );
  }
}
