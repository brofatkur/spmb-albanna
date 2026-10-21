import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { MAX_UPLOAD_BYTES, validateUploadFile } from '@/lib/upload';

export const runtime = 'nodejs';

const ALLOWED_LEVELS = new Set(['paud', 'sd', 'smp', 'sma']);

export async function POST(req: NextRequest) {
  try {
    const jenjang = req.nextUrl.searchParams.get('jenjang')?.toLowerCase() || '';
    if (!ALLOWED_LEVELS.has(jenjang)) {
      return NextResponse.json({ success: false, message: 'Jenjang pendidikan tidak valid.' }, { status: 400 });
    }

    const encodedName = req.headers.get('x-file-name') || '';
    let originalName = '';
    try {
      originalName = decodeURIComponent(encodedName);
    } catch {
      originalName = encodedName;
    }

    const contentType = (req.headers.get('content-type') || 'application/octet-stream')
      .split(';')[0]
      .trim()
      .toLowerCase();
    const declaredSize = Number(req.headers.get('content-length') || 0);
    if (declaredSize > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { success: false, message: 'Ukuran berkas melebihi 5MB. Silakan kompres atau pilih berkas lain.' },
        { status: 413 }
      );
    }

    const bytes = await req.arrayBuffer();
    const validationError = validateUploadFile({
      name: originalName,
      size: bytes.byteLength,
      type: contentType,
    });
    if (validationError) {
      return NextResponse.json({ success: false, message: validationError }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', jenjang);
    fs.mkdirSync(uploadDir, { recursive: true });

    const cleanName = originalName.replace(/[^a-zA-Z0-9._-]/g, '_');
    const fileName = `${Date.now()}_${randomUUID()}_${cleanName}`;
    fs.writeFileSync(path.join(uploadDir, fileName), Buffer.from(bytes));

    return NextResponse.json({
      success: true,
      url: `/uploads/${jenjang}/${fileName}`,
      name: originalName,
      size: bytes.byteLength,
    });
  } catch (error) {
    console.error('Error while uploading registration attachment:', error);
    return NextResponse.json(
      { success: false, message: 'Berkas gagal diunggah. Periksa koneksi lalu coba lagi.' },
      { status: 500 }
    );
  }
}
