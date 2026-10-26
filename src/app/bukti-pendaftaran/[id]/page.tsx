import React from 'react';
import db from '@/lib/db';
import { notFound } from 'next/navigation';
import PrintButton from './PrintButton';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

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

export default async function BuktiPendaftaranPage({ params }: Props) {
  const { id } = await params;

  // Historical imports can make a public registration number collide with a
  // different row's internal SQLite id. Always resolve the public number first.
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
    notFound();
  }

  let formData: Record<string, string | number | null | undefined> = {};
  try {
    formData = JSON.parse(record.form_data || '{}') as Record<string, string | number | null | undefined>;
  } catch {}

  const jenjang = (record.jenjang || '').toLowerCase();

  const namaMurid =
    formData[`nama_lengkap_${jenjang}`] ||
    formData['nama_lengkap'] ||
    formData['nama_siswa'] ||
    record.nama_lengkap ||
    '-';

  const namaSekolahAsal =
    formData[`sekolah_asal_${jenjang}`] ||
    formData['sekolah_asal'] ||
    formData['nama_sekolah_asal'] ||
    '-';

  const nisn =
    formData[`nisn_${jenjang}`] ||
    formData['nisn'] ||
    record.nisn ||
    '-';

  const alamatDomisili =
    formData[`alamat_tempat_tinggal_${jenjang}`] ||
    formData[`alamat_domisili_${jenjang}`] ||
    formData['alamat_tempat_tinggal'] ||
    formData['alamat_domisili'] ||
    '-';

  const namaAyah =
    formData[`nama_ayah_${jenjang}`] ||
    formData['nama_ayah'] ||
    record.nama_ayah ||
    '-';

  const noHpAyah =
    formData[`handphone_ayah_${jenjang}`] ||
    formData[`no_handphone_ayah_${jenjang}`] ||
    formData['handphone_ayah'] ||
    record.no_handphone ||
    '-';

  const namaIbu =
    formData[`nama_ibu_${jenjang}`] ||
    formData['nama_ibu'] ||
    '-';

  const noHpIbu =
    formData[`handphone_ibu_${jenjang}`] ||
    formData[`no_handphone_ibu_${jenjang}`] ||
    formData['handphone_ibu'] ||
    '-';

  const detailJenjang = jenjang === 'paud'
    ? {
        label: 'Tingkat PAUD',
        value: formData['tingkat'] || formData['tingkat_paud'] || '-',
      }
    : jenjang === 'sd'
      ? {
          label: 'Pilihan Kelas',
          value: formData['pilihan_kelas_sd'] || formData['pilihan_kelas'] || '-',
        }
      : null;

  const formatTanggalIndo = (dateStr?: string) => {
    const d = dateStr ? new Date(dateStr) : new Date();
    const bulan = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    return `${d.getDate()}-${bulan[d.getMonth()]}-${d.getFullYear()}`;
  };

  const tanggalCetak = formatTanggalIndo(record.created_at);

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 text-slate-800">
      {/* Action Bar (hidden on print) */}
      <div className="max-w-[800px] mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white px-4 py-2 rounded-lg border shadow-sm transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/cek-status"
            className="text-sm font-medium text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-200 transition"
          >
            Cek Status Pendaftaran
          </Link>
          <PrintButton registrationId={record.nomor_pendaftaran} />
        </div>
      </div>

      {/* Sheet Container matching the user's PDF exact template */}
      <div className="max-w-[800px] mx-auto bg-white p-10 md:p-14 shadow-lg rounded-xl print:shadow-none print:p-8 print:m-0 print:max-w-none print:w-full">
        {/* Kop Surat / Header */}
        <div className="flex items-start justify-between pb-4 border-b-2 border-[#b8860b]">
          {/* Logo Sekolah */}
          <div className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-albanna-terbaru.webp"
              alt="Logo Sekolah Albanna"
              className="w-52 h-24 object-contain object-left"
            />
          </div>

          {/* School Contact Info */}
          <div className="text-right text-xs leading-relaxed text-slate-700">
            <h1 className="text-base font-bold tracking-wider text-slate-900 uppercase">
              SEKOLAH ALBANNA
            </h1>
            <p>Jl. Tukad Yeh Ho III No.16</p>
            <p>Dangin Puri Klod, Kec. Denpasar Tim.,</p>
            <p>Kota Denpasar, Bali 80234</p>
            <p className="mt-1">Telepon: (0361) 238 6533</p>
            <p>Surel: info@albanna.sch.id</p>
            <p className="font-medium text-[#b8860b]">www.albanna.sch.id</p>
          </div>
        </div>

        {/* Title */}
        <div className="text-center my-8">
          <h2 className="text-base md:text-lg font-bold text-slate-900">
            Formulir pendaftaran Murid Baru Tahun Ajaran 2027-2028
          </h2>
        </div>

        {/* Section 1: Registrasi Peserta Didik */}
        <div className="mb-8">
          <h3 className="font-bold text-slate-900 mb-1">
            1. Registrasi Peserta Didik
          </h3>
          <p className="font-bold text-slate-800 mb-4">
            No Pendaftaran: <span className="text-emerald-700 font-mono">{record.nomor_pendaftaran}</span>
          </p>

          <table className="w-full text-sm leading-relaxed">
            <tbody>
              <tr>
                <td className="w-64 py-1 text-slate-700">Nama Murid</td>
                <td className="w-4 py-1">:</td>
                <td className="py-1 font-semibold text-slate-900">{namaMurid}</td>
              </tr>
              <tr>
                <td className="py-1 text-slate-700">Jenjang</td>
                <td className="py-1">:</td>
                <td className="py-1 font-semibold uppercase text-slate-900">{record.jenjang}</td>
              </tr>
              {detailJenjang && (
                <tr>
                  <td className="py-1 text-slate-700">{detailJenjang.label}</td>
                  <td className="py-1">:</td>
                  <td className="py-1 font-semibold text-slate-900">{detailJenjang.value}</td>
                </tr>
              )}
              <tr>
                <td className="py-1 text-slate-700">Nama Sekolah Asal</td>
                <td className="py-1">:</td>
                <td className="py-1 text-slate-900">{namaSekolahAsal}</td>
              </tr>
              <tr>
                <td className="py-1 text-slate-700">Nomor Induk Siswa Nasional (NISN)</td>
                <td className="py-1">:</td>
                <td className="py-1 text-slate-900 font-mono">{nisn}</td>
              </tr>
              <tr>
                <td className="py-1 text-slate-700 align-top">Alamat Domisili</td>
                <td className="py-1 align-top">:</td>
                <td className="py-1 text-slate-900">{alamatDomisili}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 2: Data Orang Tua/Wali */}
        <div className="mb-14">
          <h3 className="font-bold text-slate-900 mb-3">
            2. Data Orang Tua/Wali
          </h3>

          <table className="w-full text-sm leading-relaxed">
            <tbody>
              <tr>
                <td className="w-64 py-1 text-slate-700">Nama Ayah</td>
                <td className="w-4 py-1">:</td>
                <td className="py-1 font-semibold text-slate-900">{namaAyah}</td>
              </tr>
              <tr>
                <td className="py-1 text-slate-700">No HP/WA Ayah</td>
                <td className="py-1">:</td>
                <td className="py-1 text-slate-900">{noHpAyah}</td>
              </tr>
              <tr>
                <td colSpan={3} className="py-2"></td>
              </tr>
              <tr>
                <td className="py-1 text-slate-700">Nama Ibu</td>
                <td className="py-1">:</td>
                <td className="py-1 font-semibold text-slate-900">{namaIbu}</td>
              </tr>
              <tr>
                <td className="py-1 text-slate-700">No HP/WA Ibu</td>
                <td className="py-1">:</td>
                <td className="py-1 text-slate-900">{noHpIbu}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Signature Section */}
        <div className="flex justify-end pr-4 mt-12">
          <div className="text-center w-64 text-sm text-slate-800">
            <p>Denpasar Timur, {tanggalCetak}</p>
            <p className="mt-1">Pendaftar</p>
            <div className="h-24 flex items-center justify-center">
              <span className="text-xs text-slate-300 italic print:hidden">(Tanda Tangan)</span>
            </div>
            <p className="font-bold border-b border-dotted border-slate-400 pb-1">
              {namaMurid}
            </p>
          </div>
        </div>

        {/* Bottom verification badge */}
        <div className="mt-16 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Dokumen pendaftaran resmi sistem SPMB Sekolah Albanna</span>
          </div>
          <span className="font-mono text-slate-400">
            Status: {record.status}
          </span>
        </div>
      </div>
    </div>
  );
}
