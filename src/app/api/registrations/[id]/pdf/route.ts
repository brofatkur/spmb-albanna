import { NextRequest } from 'next/server';
import { PDFDocument, StandardFonts, rgb, PDFFont, PDFPage } from 'pdf-lib';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import db from '@/lib/db';

export const runtime = 'nodejs';

interface RegistrationRecord {
  id: number;
  nomor_pendaftaran: string;
  jenjang: string;
  nama_lengkap?: string;
  nisn?: string;
  nama_ayah?: string;
  no_handphone?: string;
  form_data?: string;
  created_at?: string;
  status?: string;
}

const safeText = (value: unknown) => {
  const text = String(value ?? '').trim();
  return text || '-';
};

const wrapText = (text: string, font: PDFFont, size: number, maxWidth: number) => {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : ['-'];
};

const drawValueRow = ({
  page,
  font,
  bold,
  y,
  label,
  value,
  emphasize = false,
}: {
  page: PDFPage;
  font: PDFFont;
  bold: PDFFont;
  y: number;
  label: string;
  value: string;
  emphasize?: boolean;
}) => {
  const size = 10;
  page.drawText(label, { x: 52, y, size, font, color: rgb(0.25, 0.29, 0.34) });
  page.drawText(':', { x: 238, y, size, font, color: rgb(0.15, 0.18, 0.22) });
  const lines = wrapText(value, emphasize ? bold : font, size, 290).slice(0, 2);
  lines.forEach((line, index) => {
    page.drawText(line, {
      x: 252,
      y: y - index * 13,
      size,
      font: emphasize ? bold : font,
      color: rgb(0.08, 0.11, 0.15),
    });
  });
  return y - Math.max(19, lines.length * 13 + 6);
};

const formatTanggalIndo = (dateValue?: string) => {
  const date = dateValue ? new Date(dateValue) : new Date();
  const validDate = Number.isNaN(date.getTime()) ? new Date() : date;
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Makassar',
  }).format(validDate);
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // A public registration number can be the same as another row's internal
  // SQLite id after importing historical records. Resolve the registration
  // number first so /150 cannot accidentally return the row whose id is 150.
  const recordByNumber = db.prepare(`
    SELECT * FROM registrations
    WHERE LOWER(nomor_pendaftaran) = LOWER(?)
    LIMIT 1
  `).get(id) as RegistrationRecord | undefined;

  const record = recordByNumber || db.prepare(`
    SELECT * FROM registrations
    WHERE CAST(id AS TEXT) = ?
    LIMIT 1
  `).get(id) as RegistrationRecord | undefined;

  if (!record) {
    return Response.json({ error: 'Data pendaftaran tidak ditemukan.' }, { status: 404 });
  }

  let formData: Record<string, unknown> = {};
  try {
    formData = JSON.parse(record.form_data || '{}') as Record<string, unknown>;
  } catch {
    formData = {};
  }

  const jenjang = safeText(record.jenjang).toLowerCase();
  const valueFrom = (...keys: string[]) => {
    for (const key of keys) {
      const value = formData[key];
      if (value !== undefined && String(value).trim()) return safeText(value);
    }
    return '-';
  };

  const namaMurid = valueFrom(`nama_lengkap_${jenjang}`, 'nama_lengkap', 'nama_siswa') === '-'
    ? safeText(record.nama_lengkap)
    : valueFrom(`nama_lengkap_${jenjang}`, 'nama_lengkap', 'nama_siswa');
  const namaSekolahAsal = valueFrom(`sekolah_asal_${jenjang}`, 'sekolah_asal', 'nama_sekolah_asal');
  const nisn = valueFrom(`nisn_${jenjang}`, 'nisn') === '-' ? safeText(record.nisn) : valueFrom(`nisn_${jenjang}`, 'nisn');
  const alamatDomisili = valueFrom(
    `alamat_tempat_tinggal_${jenjang}`,
    `alamat_domisili_${jenjang}`,
    'alamat_tempat_tinggal',
    'alamat_domisili'
  );
  const namaAyah = valueFrom(`nama_ayah_${jenjang}`, 'nama_ayah') === '-'
    ? safeText(record.nama_ayah)
    : valueFrom(`nama_ayah_${jenjang}`, 'nama_ayah');
  const noHpAyah = valueFrom(`handphone_ayah_${jenjang}`, `no_handphone_ayah_${jenjang}`, 'handphone_ayah') === '-'
    ? safeText(record.no_handphone)
    : valueFrom(`handphone_ayah_${jenjang}`, `no_handphone_ayah_${jenjang}`, 'handphone_ayah');
  const namaIbu = valueFrom(`nama_ibu_${jenjang}`, 'nama_ibu');
  const noHpIbu = valueFrom(`handphone_ibu_${jenjang}`, `no_handphone_ibu_${jenjang}`, 'handphone_ibu');

  const pdf = await PDFDocument.create();
  pdf.setTitle(`Bukti Pendaftaran ${safeText(record.nomor_pendaftaran)}`);
  pdf.setAuthor('Sekolah Albanna');
  pdf.setSubject('Bukti Pendaftaran Murid Baru');

  const page = pdf.addPage([595.28, 841.89]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const mono = await pdf.embedFont(StandardFonts.CourierBold);
  const gold = rgb(0.72, 0.52, 0.08);
  const green = rgb(0.01, 0.45, 0.24);

  const logoBytes = await readFile(path.join(process.cwd(), 'public', 'logo-albanna-terbaru.png'));
  const logo = await pdf.embedPng(logoBytes);
  const logoSize = logo.scale(0.08);
  page.drawImage(logo, { x: 44, y: 747, width: logoSize.width, height: logoSize.height });

  const contactLines = [
    'Jl. Tukad Yeh Ho III No.16',
    'Dangin Puri Klod, Kec. Denpasar Tim.',
    'Kota Denpasar, Bali 80234',
    'Telepon: (0361) 238 6533',
    'info@albanna.sch.id | www.albanna.sch.id',
  ];
  contactLines.forEach((line, index) => {
    const size = index === 4 ? 8.5 : 8;
    const textWidth = font.widthOfTextAtSize(line, size);
    page.drawText(line, {
      x: 548 - textWidth,
      y: 796 - index * 13,
      size,
      font,
      color: index === 4 ? green : rgb(0.3, 0.33, 0.37),
    });
  });
  page.drawLine({ start: { x: 44, y: 733 }, end: { x: 551, y: 733 }, thickness: 1.5, color: gold });

  const title = 'FORMULIR PENDAFTARAN MURID BARU';
  const subtitle = 'TAHUN AJARAN 2027-2028';
  page.drawText(title, {
    x: (595.28 - bold.widthOfTextAtSize(title, 14)) / 2,
    y: 699,
    size: 14,
    font: bold,
    color: rgb(0.08, 0.11, 0.15),
  });
  page.drawText(subtitle, {
    x: (595.28 - bold.widthOfTextAtSize(subtitle, 10)) / 2,
    y: 681,
    size: 10,
    font: bold,
    color: green,
  });

  let y = 644;
  page.drawText('1. Registrasi Peserta Didik', { x: 44, y, size: 11, font: bold, color: rgb(0.08, 0.11, 0.15) });
  y -= 25;
  page.drawText('No Pendaftaran', { x: 52, y, size: 10, font: bold, color: rgb(0.12, 0.16, 0.2) });
  page.drawText(':', { x: 238, y, size: 10, font });
  page.drawText(safeText(record.nomor_pendaftaran), { x: 252, y, size: 11, font: mono, color: green });
  y -= 22;
  y = drawValueRow({ page, font, bold, y, label: 'Nama Murid', value: namaMurid, emphasize: true });
  y = drawValueRow({ page, font, bold, y, label: 'Jenjang', value: safeText(record.jenjang).toUpperCase(), emphasize: true });
  y = drawValueRow({ page, font, bold, y, label: 'Nama Sekolah Asal', value: namaSekolahAsal });
  y = drawValueRow({ page, font, bold, y, label: 'NISN', value: nisn });
  y = drawValueRow({ page, font, bold, y, label: 'Alamat Domisili', value: alamatDomisili });

  y -= 4;
  page.drawText('2. Data Orang Tua/Wali', { x: 44, y, size: 11, font: bold, color: rgb(0.08, 0.11, 0.15) });
  y -= 26;
  y = drawValueRow({ page, font, bold, y, label: 'Nama Ayah', value: namaAyah, emphasize: true });
  y = drawValueRow({ page, font, bold, y, label: 'No HP/WA Ayah', value: noHpAyah });
  y = drawValueRow({ page, font, bold, y, label: 'Nama Ibu', value: namaIbu, emphasize: true });
  y = drawValueRow({ page, font, bold, y, label: 'No HP/WA Ibu', value: noHpIbu });

  const signatureX = 354;
  page.drawText(`Denpasar Timur, ${formatTanggalIndo(record.created_at)}`, {
    x: signatureX,
    y: 287,
    size: 9,
    font,
    color: rgb(0.18, 0.21, 0.25),
  });
  page.drawText('Pendaftar', { x: signatureX + 68, y: 269, size: 9, font });
  page.drawLine({ start: { x: signatureX + 14, y: 192 }, end: { x: 537, y: 192 }, thickness: 0.7, color: rgb(0.55, 0.58, 0.62) });
  let signatureNameSize = 9;
  while (signatureNameSize > 6 && bold.widthOfTextAtSize(namaMurid, signatureNameSize) > 175) {
    signatureNameSize -= 0.5;
  }
  page.drawText(namaMurid, {
    x: signatureX + (183 - bold.widthOfTextAtSize(namaMurid, signatureNameSize)) / 2,
    y: 178,
    size: signatureNameSize,
    font: bold,
    color: rgb(0.08, 0.11, 0.15),
  });

  page.drawLine({ start: { x: 44, y: 105 }, end: { x: 551, y: 105 }, thickness: 0.6, color: rgb(0.82, 0.84, 0.86) });
  page.drawCircle({ x: 50, y: 86, size: 4, color: green });
  page.drawText('Dokumen pendaftaran resmi sistem SPMB Sekolah Albanna', {
    x: 60,
    y: 82,
    size: 8,
    font,
    color: rgb(0.4, 0.43, 0.47),
  });
  const statusText = `Status: ${safeText(record.status)}`;
  page.drawText(statusText, {
    x: 551 - font.widthOfTextAtSize(statusText, 8),
    y: 82,
    size: 8,
    font,
    color: rgb(0.4, 0.43, 0.47),
  });

  const bytes = await pdf.save();
  const safeNumber = safeText(record.nomor_pendaftaran).replace(/[^a-zA-Z0-9_-]/g, '-');
  return new Response(Buffer.from(bytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="Bukti-Pendaftaran-${safeNumber}.pdf"`,
      'Cache-Control': 'private, no-store',
    },
  });
}
