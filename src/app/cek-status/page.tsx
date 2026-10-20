'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Search, FileText, CheckCircle2, Clock, XCircle, AlertTriangle } from 'lucide-react';

type StatusResult = {
  nomor_pendaftaran: string;
  jenjang: string;
  nama_lengkap: string;
  nisn: string | null;
  nik: string | null;
  status: string;
  catatan: string | null;
  created_at: string;
};

export default function CekStatusPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<StatusResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const res = await fetch(`/api/check-status?q=${encodeURIComponent(query.trim())}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Data pendaftaran tidak ditemukan.');
      }

      setResults(Array.isArray(data.results) ? data.results : [data.data]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mencari data.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Lulus / Diterima':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Lulus / Diterima
          </span>
        );
      case 'Terverifikasi':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Berkas Terverifikasi
          </span>
        );
      case 'Ditolak':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-bold">
            <XCircle className="w-4 h-4 text-rose-600" />
            Tidak Lulus / Ditolak
          </span>
        );
      case 'Cadangan':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold">
            <AlertTriangle className="w-4 h-4 text-purple-600" />
            Peserta Cadangan
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold">
            <Clock className="w-4 h-4 text-amber-600" />
            Menunggu Verifikasi
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-3xl mx-auto w-full px-4 py-12 md:py-16">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Layanan Mandiri Pendaftar
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
            Cek Status Pendaftaran SPMB
          </h1>
          <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
            Ketahui progres verifikasi berkas dan hasil seleksi penerimaan murid baru Sekolah Albanna.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Nomor Pendaftaran / NIK / NISN / No. HP Ayah atau Ibu
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Contoh: 150, NIK siswa, atau 081234567890"
                  inputMode="text"
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition flex items-center gap-2 shrink-0 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  Cari Data
                </button>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              *Nomor HP dapat ditulis sebagai 08xxxxxxxxxx, 628xxxxxxxxxx, atau +628xxxxxxxxxx.
            </p>
          </form>

          {/* Error Notice */}
          {error && (
            <div className="mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              <p className="font-semibold">{error}</p>
              <p className="mt-0.5 text-rose-600">Pastikan nomor pendaftaran, identitas, atau nomor HP ayah/ibu yang dimasukkan sudah benar.</p>
            </div>
          )}

          {/* Result Card */}
          {results.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-100">
              {results.length > 1 && (
                <p className="mb-3 text-xs font-semibold text-slate-600">
                  Ditemukan {results.length} pendaftaran dengan nomor HP tersebut.
                </p>
              )}
              <div className="space-y-4">
              {results.map((result) => (
              <div key={result.nomor_pendaftaran} className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
                  <div>
                    <span className="text-[11px] uppercase font-bold text-slate-400 block">
                      Nomor Pendaftaran
                    </span>
                    <span className="font-mono font-extrabold text-slate-800 text-lg">
                      {result.nomor_pendaftaran}
                    </span>
                  </div>
                  <div>
                    {getStatusBadge(result.status)}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Nama Murid:</span>
                    <span className="text-slate-800 font-bold text-sm block mt-0.5">
                      {result.nama_lengkap}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Jenjang:</span>
                    <span className="text-slate-800 font-bold uppercase text-sm block mt-0.5">
                      {result.jenjang}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">NISN:</span>
                    <span className="text-slate-700 font-mono block mt-0.5">
                      {result.nisn || '-'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">NIK:</span>
                    <span className="text-slate-700 font-mono block mt-0.5">
                      {result.nik || '-'}
                    </span>
                  </div>
                </div>

                {result.catatan && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs my-4">
                    <strong>Catatan Panitia:</strong> {result.catatan}
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-400">
                    Tanggal Registrasi: {new Date(result.created_at).toLocaleDateString('id-ID', { dateStyle: 'long' })}
                  </span>
                  <Link
                    href={`/bukti-pendaftaran/${result.nomor_pendaftaran}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg shadow-sm transition"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Cetak Bukti Pendaftaran (PDF)
                  </Link>
                </div>
              </div>
              ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
