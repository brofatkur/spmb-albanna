import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

const noStoreHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate',
};

export async function GET(request: NextRequest) {
  const registrationNumber = request.nextUrl.searchParams.get('q')?.trim() ?? '';

  if (!registrationNumber || registrationNumber.length > 64) {
    return NextResponse.json(
      { success: false, message: 'Masukkan nomor pendaftaran yang valid.' },
      { status: 400, headers: noStoreHeaders }
    );
  }

  const registration = db.prepare(`
    SELECT status
    FROM registrations
    WHERE LOWER(nomor_pendaftaran) = LOWER(?)
    LIMIT 1
  `).get(registrationNumber) as { status: string } | undefined;

  if (!registration) {
    return NextResponse.json(
      { success: false, message: 'Nomor pendaftaran tidak ditemukan.' },
      { status: 404, headers: noStoreHeaders }
    );
  }

  return NextResponse.json(
    { success: true, status: registration.status },
    { headers: noStoreHeaders }
  );
}
