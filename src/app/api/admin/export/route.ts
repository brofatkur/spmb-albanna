import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { verifyAdminSession } from '@/lib/admin-session';
import * as XLSX from 'xlsx';
import { cookies } from 'next/headers';

async function checkAdminAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if (!session?.value) return false;
  try {
    return verifyAdminSession(session.value) !== null;
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

  let rows: any[] = [];
  if (jenjang && jenjang !== 'all') {
    rows = db.prepare(`SELECT * FROM registrations WHERE jenjang = ? ORDER BY id DESC`).all(jenjang.toLowerCase());
  } else {
    rows = db.prepare(`SELECT * FROM registrations ORDER BY id DESC`).all();
  }

  // Format rows for clean spreadsheet presentation
  const exportData = rows.map((r, idx) => {
    let formValues: Record<string, any> = {};
    try {
      formValues = JSON.parse(r.form_data || '{}');
    } catch {}

    const flattened: Record<string, any> = {
      'No': idx + 1,
      'No. Pendaftaran': r.nomor_pendaftaran,
      'Jenjang': (r.jenjang || '').toUpperCase(),
      'Nama Lengkap': r.nama_lengkap,
      'NISN': r.nisn || '-',
      'NIK': r.nik || '-',
      'Jenis Kelamin': r.jenis_kelamin || '-',
      'Nama Ayah': r.nama_ayah || '-',
      'No. Handphone / WA': r.no_handphone || '-',
      'Email': r.email || '-',
      'Status': r.status,
      'Catatan': r.catatan || '-',
      'Tanggal Daftar': r.created_at,
    };

    // Add extra details from formValues
    for (const [k, v] of Object.entries(formValues)) {
      if (typeof v === 'string' || typeof v === 'number') {
        flattened[k] = v;
      } else if (Array.isArray(v)) {
        flattened[k] = v.join(', ');
      }
    }

    return flattened;
  });

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, `Data SPMB ${jenjang ? jenjang.toUpperCase() : 'Semua'}`);

  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="Data_SPMB_Albanna_${jenjang || 'All'}_${Date.now()}.xlsx"`,
    },
  });
}
