import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  GraduationCap, 
  Baby, 
  BookOpen, 
  School, 
  ArrowRight, 
  CheckCircle, 
  FileCheck2, 
  Search, 
  FileText,
  Calendar,
  Sparkles,
  PhoneCall
} from 'lucide-react';

export const metadata = {
  title: 'SPMB Sekolah Albanna - Penerimaan Murid Baru 2027-2028',
  description: 'Portal Resmi Sistem Penerimaan Murid Baru (SPMB) PAUD, SDIT, SMP, SMA Sekolah Albanna Denpasar.',
};

export default function HomePage() {
  const jenjangList = [
    {
      id: 'paud',
      slug: '/spmb-paud',
      badge: 'KB & TK',
      name: 'PAUD Albanna',
      desc: 'Membimbing fitrah ananda sejak dini dengan penanaman tauhid, adab, karakter islami, dan motorik sensorik yang menyenangkan.',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50 text-amber-700 border-amber-200',
      btnColor: 'bg-amber-600 hover:bg-amber-700 text-white',
      icon: Baby,
      usia: 'Usia 2 - 6 Tahun',
      brochure: 'https://albanna.sch.id/spmb-paud/',
    },
    {
      id: 'sd',
      slug: '/spmb-sdit',
      badge: 'SDIT',
      name: 'SDIT Albanna',
      desc: 'Menumbuhkan generasi Qurani, berakhlak mulia, cerdas literasi & numerasi, serta siap menjadi teladan di masyarakat.',
      color: 'from-emerald-600 to-teal-600',
      bgColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      btnColor: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      icon: BookOpen,
      usia: 'Usia 6 - 12 Tahun',
      brochure: 'https://albanna.sch.id/spmb-sdit/',
    },
    {
      id: 'smp',
      slug: '/spmb-smp',
      badge: 'SMP',
      name: 'SMP Albanna',
      desc: 'Membentuk kemandirian, kepemimpinan, tahfidz Al-Quran, penguasaan sains teknologi dan bahasa global.',
      color: 'from-blue-600 to-indigo-600',
      bgColor: 'bg-blue-50 text-blue-700 border-blue-200',
      btnColor: 'bg-blue-600 hover:bg-blue-700 text-white',
      icon: School,
      usia: 'Lulusan SD / MI',
      brochure: 'https://albanna.sch.id/spmb-smp/',
    },
    {
      id: 'sma',
      slug: '/spmb-sma',
      badge: 'SMA',
      name: 'SMA Albanna',
      desc: 'Mempersiapkan calon pemimpin masa depan yang berdaya saing global, berkarakter islami, dan sukses menembus PTN/PTS unggulan.',
      color: 'from-purple-600 to-pink-600',
      bgColor: 'bg-purple-50 text-purple-700 border-purple-200',
      btnColor: 'bg-purple-600 hover:bg-purple-700 text-white',
      icon: GraduationCap,
      usia: 'Lulusan SMP / MTs',
      brochure: 'https://albanna.sch.id/spmb-sma/',
    },
  ];

  const stepsFlow = [
    {
      num: '1',
      title: 'Isi Formulir Online',
      desc: 'Pilih jenjang yang dituju dan lengkapi data siswa, orang tua/wali serta unggah berkas wajib.',
    },
    {
      num: '2',
      title: 'Unduh Bukti PDF',
      desc: 'Dapatkan Nomor Pendaftaran resmi dan unduh cetak Formulir Pendaftaran (Format PDF).',
    },
    {
      num: '3',
      title: 'Verifikasi & Pemetaan',
      desc: 'Panitia SPMB memverifikasi berkas dan menjadwalkan observasi / tes pemetaan potensi.',
    },
    {
      num: '4',
      title: 'Pengumuman & Daftar Ulang',
      desc: 'Pantau status kelulusan di menu Cek Status, lalu lakukan daftar ulang sesuai panduan.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white py-16 md:py-24 px-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.15),transparent_70%)] pointer-events-none" />
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Penerimaan Murid Baru (SPMB) T.A. 2027-2028 Telah Dibuka</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Mendidik Generasi <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200">
                Religius, Unggul & Berdaya Saing
              </span>
            </h1>

            <p className="mt-5 text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Selamat datang di portal pendaftaran online Sekolah Albanna Denpasar. Silakan pilih jenjang pendidikan ananda untuk mengisi formulir pendaftaran.
            </p>

            {/* Quick Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#jenjang-section"
                className="px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/30 transition flex items-center gap-2"
              >
                Pilih Jenjang Pendaftaran
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/cek-status"
                className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-sm border border-white/20 transition flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Cek Status Pendaftaran
              </Link>
            </div>
          </div>
        </section>

        {/* 4 JENJANG CARDS */}
        <section id="jenjang-section" className="py-16 md:py-20 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Jenjang Pendidikan
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
              Pilihan Pendaftaran Sekolah Albanna
            </h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto mt-2">
              Formulir lengkap dan resmi sesuai jenjang yang dituju dengan verifikasi langsung oleh panitia SPMB.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jenjangList.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div className={`h-2.5 bg-gradient-to-r ${item.color}`} />
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${item.bgColor}`}>
                        {item.badge}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 group-hover:scale-110 transition">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mt-1">
                      Target: {item.usia}
                    </p>

                    <p className="text-xs text-slate-600 mt-3 leading-relaxed flex-1">
                      {item.desc}
                    </p>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
                      <Link
                        href={item.slug}
                        className={`w-full py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition ${item.btnColor}`}
                      >
                        Isi Formulir {item.badge}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <a
                        href={item.brochure}
                        target="_blank"
                        rel="noreferrer"
                        className="text-center text-[11px] font-medium text-slate-500 hover:text-slate-800 transition py-1"
                      >
                        Info Biaya & Brosur ↗
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ALUR PENDAFTARAN */}
        <section className="bg-slate-100/70 border-y border-slate-200 py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-white px-3 py-1 rounded-full border border-slate-200">
                Langkah Mudah
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
                Alur Pendaftaran Murid Baru (SPMB)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stepsFlow.map((step) => (
                <div key={step.num} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
                  <span className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-sm mb-4">
                    {step.num}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QUICK STATUS LOOKUP BANNER */}
        <section className="max-w-4xl mx-auto my-16 px-4">
          <div className="bg-gradient-to-r from-emerald-700 to-teal-800 rounded-2xl p-8 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Sudah Mendaftar?</span>
              </div>
              <h3 className="text-2xl font-black">
                Cek Status & Unduh Bukti PDF
              </h3>
              <p className="text-emerald-100 text-xs md:text-sm max-w-md mt-1">
                Masukkan Nomor Registrasi Pendaftaran, NIK, atau NISN ananda untuk melihat status verifikasi kelulusan dan mencetak kartu formulir pendaftaran.
              </p>
            </div>
            <Link
              href="/cek-status"
              className="px-6 py-3 bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl font-bold text-sm shadow-md transition shrink-0 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Cek Status Sekarang
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
