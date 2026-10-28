'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Clock3, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CekStatusPage() {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function checkStatus(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const number = registrationNumber.trim();
    if (!number) return;

    setLoading(true);
    setError('');
    setStatus('');

    try {
      const response = await fetch(`/api/check-status?q=${encodeURIComponent(number)}`, {
        cache: 'no-store',
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message || 'Status pendaftaran belum dapat diperiksa.');
      setStatus(payload.status);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Status pendaftaran belum dapat diperiksa.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-12 md:py-20">
        <div className="max-w-xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-900 mb-5">
            <ArrowLeft className="w-4 h-4" /> Kembali ke halaman utama
          </Link>

          <section className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 md:p-9">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
              <Search className="w-7 h-7" />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900">Cek Status Pendaftaran</h1>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Masukkan nomor pendaftaran. Halaman ini hanya menampilkan status pendaftaran tanpa data pribadi, bukti PDF, atau dokumen lampiran.
            </p>

            <form onSubmit={checkStatus} className="mt-7 space-y-3">
              <label htmlFor="registration-number" className="block text-sm font-bold text-slate-800">Nomor Pendaftaran</label>
              <input
                id="registration-number"
                value={registrationNumber}
                onChange={(event) => setRegistrationNumber(event.target.value)}
                autoComplete="off"
                maxLength={64}
                required
                placeholder="Contoh: 154"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
              />
              <button type="submit" disabled={loading} className="w-full rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 px-5 py-3.5 text-sm font-extrabold text-white transition flex items-center justify-center gap-2">
                <Search className="w-4 h-4" /> {loading ? 'Memeriksa...' : 'Cek Status'}
              </button>
            </form>

            {error && <div role="alert" className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm font-semibold text-amber-900">{error}</div>}

            {status && (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
                <div className="mx-auto w-11 h-11 rounded-full bg-white text-emerald-700 flex items-center justify-center shadow-sm">
                  {status === 'Menunggu Verifikasi' ? <Clock3 className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                </div>
                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-emerald-700">Status Pendaftaran</p>
                <p className="mt-1 text-xl font-black text-emerald-950">{status}</p>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
