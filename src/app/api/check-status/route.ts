import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message: 'Akses data pendaftaran hanya tersedia untuk petugas melalui dashboard admin.',
    },
    {
      status: 403,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  );
}
