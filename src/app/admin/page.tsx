'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  Eye, 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertTriangle, 
  LogOut, 
  FileSpreadsheet, 
  ExternalLink,
  ChevronRight,
  X,
  FileText,
  Copy,
  Check
} from 'lucide-react';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard state
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({
    total: 0,
    paud: 0,
    sd: 0,
    smp: 0,
    sma: 0,
    pending: 0,
    verified: 0,
    accepted: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(false);
  const [filterJenjang, setFilterJenjang] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [newCatatan, setNewCatatan] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [showGoogleSheetModal, setShowGoogleSheetModal] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  // Check login on mount
  useEffect(() => {
    fetchRegistrations();
  }, [filterJenjang, filterStatus]);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterJenjang !== 'all') params.append('jenjang', filterJenjang);
      if (filterStatus !== 'all') params.append('status', filterStatus);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());

      const res = await fetch(`/api/admin/registrations?${params.toString()}`);
      if (res.status === 401) {
        setIsLoggedIn(false);
        return;
      }
      const data = await res.json();
      if (data.success) {
        setIsLoggedIn(true);
        setRegistrations(data.data || []);
        if (data.stats) setStats(data.stats);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login gagal.');
      }
      setIsLoggedIn(true);
      fetchRegistrations();
    } catch (err: any) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    setIsLoggedIn(false);
  };

  const openDetail = async (id: number) => {
    setDetailLoading(true);
    setSelectedItem(null);
    try {
      const res = await fetch(`/api/admin/registrations?id=${id}`);
      const data = await res.json();
      if (data.success) {
        setSelectedItem(data.data);
        setNewStatus(data.data.status);
        setNewCatatan(data.data.catatan || '');
      }
    } catch (e) {
      alert('Gagal mengambil data detail');
    } finally {
      setDetailLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedItem) return;
    setUpdatingStatus(true);
    try {
      const res = await fetch('/api/admin/registrations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedItem.id,
          status: newStatus,
          catatan: newCatatan,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedItem((prev: any) => ({ ...prev, status: newStatus, catatan: newCatatan }));
        fetchRegistrations();
        alert('Status pendaftar berhasil diperbarui!');
      }
    } catch (e) {
      alert('Gagal memperbarui status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data pendaftar ini?')) return;
    try {
      const res = await fetch(`/api/admin/registrations?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchRegistrations();
        if (selectedItem?.id === id) setSelectedItem(null);
      }
    } catch (e) {
      alert('Gagal menghapus data');
    }
  };

  const googleAppsScriptCode = `// Google Apps Script untuk Menghubungkan SPMB Albanna ke Google Sheet
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Jika baris pertama kosong, buat header otomatis
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Tanggal Daftar",
        "No Pendaftaran",
        "Jenjang",
        "Nama Siswa",
        "Sekolah Asal",
        "NISN",
        "Alamat",
        "Nama Ayah",
        "No WA Ayah",
        "Nama Ibu",
        "No WA Ibu",
        "Status"
      ]);
    }
    
    // Tambahkan data baris baru
    sheet.appendRow([
      new Date(),
      data.nomor_pendaftaran || "",
      data.jenjang || "",
      data.nama_lengkap || "",
      data.nama_sekolah_asal || "",
      data.nisn || "",
      data.alamat_domisili || "",
      data.nama_ayah || "",
      data.handphone_ayah || "",
      data.nama_ibu || "",
      data.handphone_ibu || "",
      data.status || "Menunggu Verifikasi"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const copyScriptToClipboard = () => {
    navigator.clipboard.writeText(googleAppsScriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  // IF NOT LOGGED IN -> SHOW LOGIN MODAL
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-slate-800">
          <div className="text-center mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-circle.png"
              alt="Albanna"
              className="w-16 h-16 mx-auto mb-3 object-contain"
            />
            <h1 className="text-xl font-black text-slate-900">
              Admin SPMB Albanna
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Masukkan akun petugas SPMB untuk mengelola data calon murid.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500"
                required
              />
            </div>

            {loginError && (
              <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition disabled:opacity-50"
            >
              {loginLoading ? 'Memproses...' : 'Masuk Dashboard Admin'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <Link href="/" className="hover:text-slate-700">
              ← Kembali ke Beranda
            </Link>
            <span>Albanna Admin v1.0</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-circle.png" alt="Logo" className="w-8 h-8 object-contain" />
            <div>
              <h1 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Panel Administrasi SPMB Albanna
              </h1>
              <span className="text-[11px] text-slate-500">spmb.albanna.sch.id</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGoogleSheetModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200 transition"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              Koneksi Google Sheet
            </button>
            <a
              href={`/api/admin/export?jenjang=${filterJenjang}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
            >
              <Download className="w-4 h-4" />
              Export Excel (.xlsx)
            </a>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-600 transition rounded-lg hover:bg-slate-100"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* STATS TILES */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-400 font-bold uppercase">Total Pendaftar</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{stats.total}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-2xs">
            <span className="text-[11px] text-amber-600 font-bold uppercase">PAUD</span>
            <p className="text-2xl font-black text-amber-700 mt-1">{stats.paud}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-2xs">
            <span className="text-[11px] text-emerald-600 font-bold uppercase">SDIT</span>
            <p className="text-2xl font-black text-emerald-700 mt-1">{stats.sd}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-2xs">
            <span className="text-[11px] text-blue-600 font-bold uppercase">SMP</span>
            <p className="text-2xl font-black text-blue-700 mt-1">{stats.smp}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-purple-200 shadow-2xs">
            <span className="text-[11px] text-purple-600 font-bold uppercase">SMA</span>
            <p className="text-2xl font-black text-purple-700 mt-1">{stats.sma}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-2xs">
            <span className="text-[11px] text-amber-600 font-bold uppercase">Pending</span>
            <p className="text-2xl font-black text-amber-600 mt-1">{stats.pending}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-2xs">
            <span className="text-[11px] text-blue-600 font-bold uppercase">Terverifikasi</span>
            <p className="text-2xl font-black text-blue-600 mt-1">{stats.verified}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-2xs">
            <span className="text-[11px] text-emerald-600 font-bold uppercase">Lulus</span>
            <p className="text-2xl font-black text-emerald-600 mt-1">{stats.accepted}</p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Jenjang Filter */}
            <select
              value={filterJenjang}
              onChange={(e) => setFilterJenjang(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white"
            >
              <option value="all">Semua Jenjang</option>
              <option value="paud">PAUD (KB & TK)</option>
              <option value="sd">SDIT</option>
              <option value="smp">SMP</option>
              <option value="sma">SMA</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white"
            >
              <option value="all">Semua Status</option>
              <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
              <option value="Terverifikasi">Terverifikasi</option>
              <option value="Lulus / Diterima">Lulus / Diterima</option>
              <option value="Cadangan">Cadangan</option>
              <option value="Ditolak">Ditolak</option>
            </select>

            <button
              onClick={fetchRegistrations}
              className="p-2 text-slate-500 hover:text-slate-800 border rounded-xl hover:bg-slate-50"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Search Box */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchRegistrations()}
                placeholder="Cari nama, No. Reg, NIK..."
                className="pl-8 pr-4 py-2 rounded-xl border border-slate-300 text-xs w-64 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
            <button
              onClick={fetchRegistrations}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold"
            >
              Cari
            </button>
          </div>
        </div>

        {/* REGISTRATIONS TABLE */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">No. Pendaftaran</th>
                  <th className="py-3 px-4">Jenjang</th>
                  <th className="py-3 px-4">Nama Siswa</th>
                  <th className="py-3 px-4">NISN / NIK</th>
                  <th className="py-3 px-4">Nama Ayah / No WA</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      {loading ? 'Memuat data...' : 'Belum ada data pendaftar yang cocok.'}
                    </td>
                  </tr>
                ) : (
                  registrations.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-mono font-bold text-emerald-800">
                        {item.nomor_pendaftaran}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                          {item.jenjang}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {item.nama_lengkap}
                      </td>
                      <td className="py-3 px-4 text-slate-500 font-mono">
                        {item.nisn || item.nik || '-'}
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        <div>{item.nama_ayah || '-'}</div>
                        <div className="text-[11px] text-slate-400">{item.no_handphone || '-'}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            item.status === 'Lulus / Diterima'
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.status === 'Terverifikasi'
                              ? 'bg-blue-100 text-blue-800'
                              : item.status === 'Ditolak'
                              ? 'bg-rose-100 text-rose-800'
                              : item.status === 'Cadangan'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        {new Date(item.created_at).toLocaleDateString('id-ID')}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => openDetail(item.id)}
                            className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded-lg"
                            title="Lihat Detail & Berkas"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <Link
                            href={`/bukti-pendaftaran/${item.nomor_pendaftaran}`}
                            target="_blank"
                            className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-lg"
                            title="Unduh / Cetak PDF"
                          >
                            <FileText className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                            title="Hapus"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* DETAIL & STATUS MODAL */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                    Detail Pendaftar • Jenjang {selectedItem.jenjang.toUpperCase()}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    {selectedItem.nama_lengkap}
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    {selectedItem.nomor_pendaftaran}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 text-slate-400 hover:text-slate-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
                {/* Status Updater Box */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                    Ubah Status & Catatan Verifikasi
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 mb-1">Status Verifikasi:</label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-300 bg-white font-medium text-xs"
                      >
                        <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                        <option value="Terverifikasi">Terverifikasi</option>
                        <option value="Lulus / Diterima">Lulus / Diterima</option>
                        <option value="Cadangan">Cadangan</option>
                        <option value="Ditolak">Ditolak</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1">Catatan Tambahan (Bisa dilihat pendaftar):</label>
                      <input
                        type="text"
                        value={newCatatan}
                        onChange={(e) => setNewCatatan(e.target.value)}
                        placeholder="Contoh: Berkas lengkap, observasi tgl 25 Okt"
                        className="w-full p-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleUpdateStatus}
                      disabled={updatingStatus}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transition disabled:opacity-50"
                    >
                      {updatingStatus ? 'Menyimpan...' : 'Simpan Perubahan Status'}
                    </button>
                  </div>
                </div>

                {/* Uploaded Files Section */}
                {selectedItem.file_paths && Object.keys(selectedItem.file_paths).length > 0 && (
                  <div>
                    <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2">
                      Berkas Unggahan (Dokumen Asli)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {Object.entries(selectedItem.file_paths).map(([key, fileUrl]: any) => (
                        <a
                          key={key}
                          href={fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-emerald-500 bg-white transition"
                        >
                          <span className="font-medium text-slate-800 truncate mr-2">
                            {key.replace(/_/g, ' ').toUpperCase()}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* All Form Fields */}
                <div>
                  <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2">
                    Seluruh Isian Formulir
                  </h3>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 divide-y divide-slate-200">
                    {selectedItem.form_data &&
                      Object.entries(selectedItem.form_data).map(([k, v]: any) => (
                        <div key={k} className="py-1.5 flex flex-wrap justify-between gap-2">
                          <span className="text-slate-500 font-medium">{k}</span>
                          <span className="text-slate-900 font-semibold max-w-sm text-right">
                            {Array.isArray(v) ? v.join(', ') : String(v || '-')}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                <Link
                  href={`/bukti-pendaftaran/${selectedItem.nomor_pendaftaran}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 font-semibold text-xs transition"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Buka Bukti PDF
                </Link>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg text-xs"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* GOOGLE SHEET SYNC MODAL */}
        {showGoogleSheetModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 text-xs flex flex-col max-h-[90vh]">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-base font-bold text-slate-900">
                    Panduan Koneksi Google Sheet
                  </h2>
                </div>
                <button
                  onClick={() => setShowGoogleSheetModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-y-auto py-4 space-y-4 flex-1 text-slate-700 leading-relaxed">
                <p>
                  Sistem database InsForge / SPMB Albanna dapat mengirimkan setiap pendaftaran baru secara real-time ke Google Sheet panitia melalui <strong>Google Apps Script Web App</strong>.
                </p>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900">Langkah 1: Buat Google Spreadsheet</h4>
                  <p>Buka Google Drive, buat Spreadsheet baru misalnya dengan nama <code>"Data SPMB Albanna 2027-2028"</code>.</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900">Langkah 2: Buka Apps Script</h4>
                  <p>Pada Google Spreadsheet Anda, klik menu <strong>Extensions (Ekstensi) → Apps Script</strong>.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900">Langkah 3: Tempel Script Berikut</h4>
                    <button
                      onClick={copyScriptToClipboard}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md font-medium text-[11px]"
                    >
                      {copiedScript ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      {copiedScript ? 'Tersalin!' : 'Salin Kode Script'}
                    </button>
                  </div>
                  <pre className="p-3 bg-slate-900 text-emerald-300 rounded-xl overflow-x-auto text-[11px] font-mono">
                    {googleAppsScriptCode}
                  </pre>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900">Langkah 4: Deploy sebagai Web App</h4>
                  <ol className="list-decimal pl-4 space-y-1">
                    <li>Klik <strong>Deploy → New deployment</strong>.</li>
                    <li>Pilih jenis <strong>Web app</strong>.</li>
                    <li>Isi Description: <code>Webhook SPMB</code>.</li>
                    <li>Pada <strong>Who has access (Siapa yang memiliki akses)</strong>: Pilih <strong>Anyone (Siapa saja)</strong>.</li>
                    <li>Klik <strong>Deploy</strong> dan salin Web App URL (berakhiran <code>/exec</code>).</li>
                  </ol>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900">Langkah 5: Masukkan Webhook URL ke Konfigurasi</h4>
                  <p>
                    Tambahkan baris berikut pada file <code>.env</code> di server Next.js Anda:
                  </p>
                  <code className="block p-2 bg-slate-100 rounded-lg font-mono text-[11px]">
                    GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/AKfycb.../exec"
                  </code>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setShowGoogleSheetModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-xl"
                >
                  Selesai
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
