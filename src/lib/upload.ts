export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export const ACCEPTED_UPLOAD_EXTENSIONS = [
  '.pdf',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.gif',
  '.bmp',
  '.tif',
  '.tiff',
  '.heic',
  '.heif',
] as const;

export const ACCEPTED_UPLOAD_MIME_TYPES = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/pjpeg',
  'image/webp',
  'image/gif',
  'image/bmp',
  'image/x-ms-bmp',
  'image/tiff',
  'image/heic',
  'image/heif',
  'image/heic-sequence',
  'image/heif-sequence',
] as const;

export const UPLOAD_ACCEPT_ATTRIBUTE = [
  ...ACCEPTED_UPLOAD_EXTENSIONS,
  ...ACCEPTED_UPLOAD_MIME_TYPES,
].join(',');

const allowedExtensions = new Set<string>(ACCEPTED_UPLOAD_EXTENSIONS);
const mimeTypesByExtension: Record<string, readonly string[]> = {
  '.pdf': ['application/pdf'],
  '.png': ['image/png'],
  '.jpg': ['image/jpeg', 'image/pjpeg'],
  '.jpeg': ['image/jpeg', 'image/pjpeg'],
  '.webp': ['image/webp'],
  '.gif': ['image/gif'],
  '.bmp': ['image/bmp', 'image/x-ms-bmp'],
  '.tif': ['image/tiff'],
  '.tiff': ['image/tiff'],
  '.heic': ['image/heic', 'image/heif', 'image/heic-sequence', 'image/heif-sequence'],
  '.heif': ['image/heic', 'image/heif', 'image/heic-sequence', 'image/heif-sequence'],
};

export const getUploadExtension = (fileName: string) => {
  const match = fileName.toLowerCase().match(/\.[^.]+$/);
  return match?.[0] || '';
};

export const validateUploadFile = (file: Pick<File, 'name' | 'size' | 'type'>) => {
  if (!file.name || file.size <= 0) {
    return 'Berkas kosong atau tidak dapat dibaca.';
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return 'Ukuran berkas melebihi 5MB. Silakan kompres atau pilih berkas lain.';
  }

  const extension = getUploadExtension(file.name);
  if (!allowedExtensions.has(extension)) {
    return 'Format berkas tidak didukung. Gunakan PDF, PNG, JPG/JPEG, WEBP, GIF, BMP, TIFF, atau HEIC/HEIF.';
  }

  const mimeType = file.type.toLowerCase().split(';')[0].trim();
  const expectedMimeTypes = mimeTypesByExtension[extension] || [];
  if (mimeType && mimeType !== 'application/octet-stream' && !expectedMimeTypes.includes(mimeType)) {
    return 'Jenis berkas tidak sesuai dengan format yang dipilih.';
  }

  return null;
};
