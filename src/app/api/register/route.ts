import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { createGoogleSheetRegistration, insertInsForgeRecord } from '@/lib/insforge';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const jenjang = (formData.get('jenjang') as string)?.toLowerCase();

    if (!jenjang || !['paud', 'sd', 'smp', 'sma'].includes(jenjang)) {
      return NextResponse.json(
        { success: false, message: 'Jenjang pendidikan tidak valid.' },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', jenjang);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const dataObj: Record<string, any> = {};
    const filePaths: Record<string, string> = {};

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        if (value.size > 0 && value.name) {
          const timestamp = Date.now();
          const cleanName = value.name.replace(/[^a-zA-Z0-9._-]/g, '_');
          const fileName = `${timestamp}_${cleanName}`;
          const filePath = path.join(uploadDir, fileName);

          const bytes = await value.arrayBuffer();
          const buffer = Buffer.from(bytes);
          fs.writeFileSync(filePath, buffer);

          const publicUrl = `/uploads/${jenjang}/${fileName}`;
          filePaths[key] = publicUrl;
          dataObj[key] = publicUrl;
        }
      } else {
        if (key.endsWith('[]')) {
          const cleanKey = key.slice(0, -2);
          if (!dataObj[cleanKey]) {
            dataObj[cleanKey] = [];
          }
          dataObj[cleanKey].push(value);
        } else {
          dataObj[key] = value;
        }
      }
    }

    // Extract core fields based on jenjang naming conventions
    const namaLengkap =
      dataObj[`nama_lengkap_${jenjang}`] ||
      dataObj['nama_lengkap'] ||
      dataObj['nama_siswa'] ||
      dataObj['nama_calon_siswa'] ||
      'Calon Murid';

    const namaPanggilan =
      dataObj[`nama_panggilan_${jenjang}`] ||
      dataObj['nama_panggilan'] ||
      null;

    const nisn =
      dataObj[`nisn_${jenjang}`] ||
      dataObj['nisn'] ||
      null;

    const nik =
      dataObj[`nik_${jenjang}`] ||
      dataObj['nik'] ||
      null;

    const jenisKelamin =
      dataObj[`jenis_kelamin_${jenjang}`] ||
      dataObj['jenis_kelamin'] ||
      null;

    const sekolahAsal =
      dataObj[`sekolah_asal_${jenjang}`] ||
      dataObj['sekolah_asal'] ||
      dataObj['nama_sekolah_asal'] ||
      null;

    const alamatDomisili =
      dataObj[`alamat_tempat_tinggal_${jenjang}`] ||
      dataObj[`alamat_domisili_${jenjang}`] ||
      dataObj['alamat_tempat_tinggal'] ||
      dataObj['alamat_domisili'] ||
      dataObj['alamat'] ||
      null;

    const namaAyah =
      dataObj[`nama_ayah_${jenjang}`] ||
      dataObj['nama_ayah'] ||
      null;

    const handphoneAyah =
      dataObj[`handphone_ayah_${jenjang}`] ||
      dataObj[`no_handphone_ayah_${jenjang}`] ||
      dataObj['handphone_ayah'] ||
      null;

    const namaIbu =
      dataObj[`nama_ibu_${jenjang}`] ||
      dataObj['nama_ibu'] ||
      null;

    const handphoneIbu =
      dataObj[`handphone_ibu_${jenjang}`] ||
      dataObj[`no_handphone_ibu_${jenjang}`] ||
      dataObj['handphone_ibu'] ||
      null;

    const noHandphone =
      dataObj[`no_handphone_${jenjang}`] ||
      handphoneAyah ||
      handphoneIbu ||
      dataObj['no_handphone'] ||
      null;

    const email =
      dataObj[`email_${jenjang}`] ||
      dataObj['email'] ||
      null;

    // Keep the existing global registration sequence in Google Sheets as the
    // single source of truth while the old Elementor form is still active.
    // The current counter is shared across PAUD, SD, SMP, and SMA.
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
    const sheetPayload = Object.fromEntries(
      Object.entries(dataObj).map(([key, value]) => {
        if (typeof value === 'string' && value.startsWith('/uploads/')) {
          return [key, new URL(value, appUrl).toString()];
        }
        return [key, value];
      })
    );

    const sheetResult = await createGoogleSheetRegistration({
      ...sheetPayload,
      jenjang: jenjang.toUpperCase(),
      nama_lengkap: String(namaLengkap),
      nama_sekolah_asal: sekolahAsal || '-',
      nisn: nisn || '-',
      alamat_domisili: alamatDomisili || '-',
      nama_ayah: namaAyah || '-',
      handphone_ayah: handphoneAyah || '-',
      nama_ibu: namaIbu || '-',
      handphone_ibu: handphoneIbu || '-',
      status: 'Menunggu Verifikasi',
      created_at: new Date().toISOString(),
    });

    if (!sheetResult.success) {
      Object.values(filePaths).forEach((publicUrl) => {
        const uploadedFile = path.join(process.cwd(), 'public', publicUrl);
        if (fs.existsSync(uploadedFile)) fs.unlinkSync(uploadedFile);
      });

      return NextResponse.json(
        {
          success: false,
          message: 'Nomor pendaftaran belum dapat dibuat. Silakan coba kembali beberapa saat lagi.',
        },
        { status: sheetResult.configured ? 502 : 503 }
      );
    }

    const nomorPendaftaran = sheetResult.nomor_pendaftaran;

    // 1. Save to local SQLite
    const stmt = db.prepare(`
      INSERT INTO registrations (
        nomor_pendaftaran,
        jenjang,
        nama_lengkap,
        nisn,
        nik,
        jenis_kelamin,
        nama_ayah,
        no_handphone,
        email,
        form_data,
        file_paths,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Menunggu Verifikasi')
    `);

    stmt.run(
      nomorPendaftaran,
      jenjang,
      String(namaLengkap),
      nisn ? String(nisn) : null,
      nik ? String(nik) : null,
      jenisKelamin ? String(jenisKelamin) : null,
      namaAyah ? String(namaAyah) : null,
      noHandphone ? String(noHandphone) : null,
      email ? String(email) : null,
      JSON.stringify(dataObj),
      JSON.stringify(filePaths)
    );

    // 2. Save to InsForge self-hosted PostgreSQL database
    const insforgePayload = {
      nomor_pendaftaran: nomorPendaftaran,
      jenjang: jenjang.toUpperCase(),
      nama_lengkap: String(namaLengkap),
      nama_panggilan: namaPanggilan ? String(namaPanggilan) : null,
      nisn: nisn ? String(nisn) : null,
      nik: nik ? String(nik) : null,
      jenis_kelamin: jenisKelamin ? String(jenisKelamin) : null,
      sekolah_asal: sekolahAsal ? String(sekolahAsal) : null,
      alamat_domisili: alamatDomisili ? String(alamatDomisili) : null,
      nama_ayah: namaAyah ? String(namaAyah) : null,
      handphone_ayah: handphoneAyah ? String(handphoneAyah) : null,
      nama_ibu: namaIbu ? String(namaIbu) : null,
      handphone_ibu: handphoneIbu ? String(handphoneIbu) : null,
      no_handphone: noHandphone ? String(noHandphone) : null,
      email: email ? String(email) : null,
      status: 'Menunggu Verifikasi',
      catatan: '',
      form_data: dataObj,
      file_paths: filePaths,
    };

    // Insert async into InsForge
    insertInsForgeRecord(insforgePayload).catch((e) =>
      console.error('Failed to sync to InsForge:', e)
    );

    return NextResponse.json({
      success: true,
      nomor_pendaftaran: nomorPendaftaran,
      nama_lengkap: namaLengkap,
      jenjang: jenjang.toUpperCase(),
      message: 'Pendaftaran berhasil dikirim!',
    });
  } catch (error: any) {
    console.error('Error during registration submission:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan sistem saat menyimpan pendaftaran: ' + error.message },
      { status: 500 }
    );
  }
}
