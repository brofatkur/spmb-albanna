import { NextRequest } from 'next/server';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { getCurrentAdminSession, verifyInternalResourceToken } from '@/lib/admin-session';

export const runtime = 'nodejs';

const contentTypes: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.bmp': 'image/bmp',
  '.tif': 'image/tiff',
  '.tiff': 'image/tiff',
  '.heic': 'image/heic',
  '.heif': 'image/heif',
};

const getUploadFile = async (segments: string[]) => {
  const uploadRoot = path.resolve(process.cwd(), 'public', 'uploads');
  const decodedSegments = segments.map((segment) => decodeURIComponent(segment));
  const filePath = path.resolve(uploadRoot, ...decodedSegments);

  if (!filePath.startsWith(`${uploadRoot}${path.sep}`)) {
    return null;
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) return null;
    return { filePath, size: fileStat.size };
  } catch {
    return null;
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathSegments } = await params;
  const resource = `/uploads/${(pathSegments || []).map(encodeURIComponent).join('/')}`;
  const admin = await getCurrentAdminSession();
  const internalToken = request.nextUrl.searchParams.get('access') || '';

  if (!admin && !verifyInternalResourceToken(internalToken, resource)) {
    return Response.json(
      { error: 'Akses lampiran hanya tersedia untuk petugas.' },
      {
        status: 401,
        headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
      }
    );
  }

  const uploadFile = await getUploadFile(pathSegments || []);

  if (!uploadFile) {
    return Response.json({ error: 'File lampiran tidak ditemukan.' }, { status: 404 });
  }

  const bytes = await readFile(uploadFile.filePath);
  const fileName = path.basename(uploadFile.filePath);
  const extension = path.extname(fileName).toLowerCase();

  return new Response(bytes, {
    headers: {
      'Content-Type': contentTypes[extension] || 'application/octet-stream',
      'Content-Length': String(uploadFile.size),
      'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(fileName)}`,
      'Cache-Control': 'private, max-age=300',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
