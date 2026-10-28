import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  ArrowRight,
  Baby,
  BookOpen,
  CalendarDays,
  Download,
  ExternalLink,
  GraduationCap,
  MessageCircle,
  School,
  Sparkles,
} from 'lucide-react';

export const metadata = {
  title: 'SPMB Sekolah Albanna - Penerimaan Murid Baru 2027-2028',
  description: 'Portal Resmi Sistem Penerimaan Murid Baru (SPMB) PAUD, SDIT, SMP, SMA Sekolah Albanna Denpasar.',
};

const whatsappUrl =
  'https://wa.me/62818418444?text=Assalamu%27alaikum%2C%20saya%20ingin%20bertanya%20tentang%20SPMB%20Sekolah%20Albanna%202027-2028.';

const jenjangList = [
  {
    id: 'paud', slug: '/spmb-paud', brochure: '/brosur/Brosur-SPMB-PAUD-2027-2028.pdf', badge: 'KB & TK', name: 'PAUD Albanna',
    desc: 'Membimbing fitrah ananda sejak dini melalui penanaman tauhid, adab, karakter islami, dan kegiatan motorik sensorik yang menyenangkan.',
    color: 'from-amber-500 to-orange-500', bgColor: 'bg-amber-50 text-amber-700 border-amber-200',
    btnColor: 'bg-amber-600 hover:bg-amber-700 focus-visible:ring-amber-500', icon: Baby, usia: 'Usia 2–6 tahun',
  },
  {
    id: 'sd', slug: '/spmb-sdit', brochure: '/brosur/Brosur-SPMB-SD-2027-2028.pdf', badge: 'SDIT', name: 'SDIT Albanna',
    desc: 'Menumbuhkan generasi Qurani, berakhlak mulia, kuat dalam literasi dan numerasi, serta siap menjadi teladan di masyarakat.',
    color: 'from-emerald-600 to-teal-600', bgColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    btnColor: 'bg-emerald-700 hover:bg-emerald-800 focus-visible:ring-emerald-500', icon: BookOpen, usia: 'Usia 6–12 tahun',
  },
  {
    id: 'smp', slug: '/spmb-smp', brochure: '/brosur/Brosur-SPMB-SMP-2027-2028.pdf', badge: 'SMP', name: 'SMP Albanna',
    desc: 'Membentuk kemandirian, kepemimpinan, tahfidz Al-Quran, serta penguasaan sains, teknologi, dan bahasa global.',
    color: 'from-teal-600 to-cyan-600', bgColor: 'bg-teal-50 text-teal-700 border-teal-200',
    btnColor: 'bg-teal-700 hover:bg-teal-800 focus-visible:ring-teal-500', icon: School, usia: 'Lulusan SD / MI',
  },
  {
    id: 'sma', slug: '/spmb-sma', brochure: '/brosur/Brosur-SPMB-SMA-2027-2028.pdf', badge: 'SMA', name: 'SMA Albanna',
    desc: 'Mempersiapkan calon pemimpin yang berdaya saing global, berkarakter islami, dan siap menembus perguruan tinggi unggulan.',
    color: 'from-green-700 to-emerald-700', bgColor: 'bg-green-50 text-green-800 border-green-200',
    btnColor: 'bg-green-800 hover:bg-green-900 focus-visible:ring-green-500', icon: GraduationCap, usia: 'Lulusan SMP / MTs',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f8faf8] flex flex-col justify-between pb-20 md:pb-0">
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-[#075b38] text-white px-4 py-16 md:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_38%),radial-gradient(circle_at_85%_70%,rgba(202,155,38,0.23),transparent_35%)] pointer-events-none" />
          <div className="absolute -right-14 -top-16 h-52 w-52 rounded-full border-[38px] border-white/5" />
          <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full border-[42px] border-[#d0a32c]/15" />
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-50 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Pendaftaran Online 19 Oktober–7 November 2026</span>
            </div>
            <p className="text-amber-300 text-sm md:text-base font-extrabold tracking-[0.18em] uppercase mb-3">Mulai dari sini</p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] max-w-5xl mx-auto">
              Daftarkan Ananda di <span className="text-amber-300">Sekolah Albanna</span>
              <span className="block mt-2 text-2xl md:text-4xl lg:text-5xl">Religius, Unggul &amp; Berdaya Saing Global</span>
            </h1>
            <p className="mt-5 text-emerald-50/90 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Pilih jenjang pendidikan, lengkapi formulir secara online, dan dapatkan nomor pendaftaran SPMB Tahun Ajaran 2027–2028.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <a href="#jenjang-section" className="px-7 py-3.5 rounded-xl bg-amber-300 hover:bg-amber-200 text-emerald-950 font-extrabold text-sm shadow-lg shadow-black/15 transition flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                Daftar Sekarang <ArrowRight className="w-4 h-4" />
              </a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-sm border border-white/25 transition flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                <MessageCircle className="w-4 h-4" /> WhatsApp 0818 418 444
              </a>
            </div>
          </div>
        </section>

        <section id="jenjang-section" className="scroll-mt-24 py-16 md:py-20 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">Formulir Pendaftaran</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-3">Pilih Jenjang Pendidikan Ananda</h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto mt-2">Tekan tombol pada jenjang yang dituju untuk langsung membuka formulir pendaftaran resmi.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {jenjangList.map((item) => {
              const IconComp = item.icon;
              return (
                <article key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
                  <div className={`h-2.5 bg-gradient-to-r ${item.color}`} />
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${item.bgColor}`}>{item.badge}</span>
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 group-hover:scale-110 transition"><IconComp className="w-5 h-5" aria-hidden="true" /></div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition">{item.name}</h3>
                    <p className="text-xs text-slate-500 font-semibold mt-1">{item.usia}</p>
                    <p className="text-sm text-slate-600 mt-3 leading-relaxed flex-1">{item.desc}</p>
                    <Link href={item.slug} className={`mt-6 w-full py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-1.5 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${item.btnColor}`}>
                      Daftar {item.badge} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                    <a
                      href={item.brochure}
                      download
                      className="mt-2.5 w-full py-3 rounded-xl border border-slate-300 bg-white font-bold text-sm text-slate-700 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-800 flex items-center justify-center gap-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                    >
                      <Download className="w-4 h-4" aria-hidden="true" /> Download Brosur
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="bg-[#f1f5f1] border-y border-emerald-900/10 py-16 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-white px-3 py-1 rounded-full border border-emerald-900/10"><CalendarDays className="w-3.5 h-3.5" /> Informasi Resmi</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-3">Alur dan Biaya SPMB 2027–2028</h2>
              <p className="text-slate-600 text-sm max-w-xl mx-auto mt-2">Tekan gambar untuk membukanya dalam ukuran penuh agar seluruh informasi mudah dibaca.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 items-start">
              <InfoImage src="/spmb/alur-spmb-2027-2028.png" title="Alur SPMB" description="Jadwal proses penerimaan murid baru." alt="Alur SPMB Sekolah Albanna Tahun Ajaran 2027–2028" />
              <InfoImage src="/spmb/biaya-spmb-2027-2028.png" title="Biaya SPMB" description="Rincian biaya setiap jenjang pendidikan." alt="Biaya SPMB Sekolah Albanna Tahun Ajaran 2027–2028" />
            </div>
            <div className="mt-10 bg-[#075b38] rounded-2xl px-6 py-7 md:px-9 md:py-8 text-white flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg">
              <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-black">Siap mendaftarkan ananda?</h3>
                <p className="text-emerald-50/85 text-sm mt-1">Pilih jenjang di atas atau hubungi panitia jika membutuhkan bantuan.</p>
              </div>
              <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
                <a href="#jenjang-section" className="px-6 py-3 bg-amber-300 hover:bg-amber-200 text-emerald-950 rounded-xl font-extrabold text-sm transition flex items-center justify-center gap-2">Pilih Formulir <ArrowRight className="w-4 h-4" /></a>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/25 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2"><MessageCircle className="w-4 h-4" /> 0818 418 444</a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(15,23,42,0.12)] backdrop-blur md:hidden">
        <div className="grid grid-cols-[1fr_auto] gap-2 max-w-md mx-auto">
          <a href="#jenjang-section" className="min-h-11 rounded-xl bg-emerald-700 px-4 py-2.5 text-center text-sm font-extrabold text-white flex items-center justify-center gap-2">Daftar Sekarang <ArrowRight className="w-4 h-4" /></a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Hubungi panitia SPMB melalui WhatsApp" className="min-h-11 min-w-12 rounded-xl bg-[#25D366] px-3 py-2.5 text-white flex items-center justify-center"><MessageCircle className="w-5 h-5" /></a>
        </div>
      </div>
    </div>
  );
}

function InfoImage({ src, title, description, alt }: { src: string; title: string; description: string; alt: string }) {
  return (
    <figure className="bg-white rounded-3xl border border-slate-200 p-3 md:p-5 shadow-sm">
      <a href={src} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-2xl bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600" aria-label={`Buka gambar ${title} 2027–2028 dalam ukuran penuh`}>
        <Image src={src} alt={alt} width={1621} height={2026} sizes="(max-width: 1024px) 100vw, 50vw" className="w-full h-auto transition duration-300 group-hover:scale-[1.01]" />
      </a>
      <figcaption className="px-2 pt-4 pb-1 flex items-center justify-between gap-3">
        <div><h3 className="font-extrabold text-slate-900">{title}</h3><p className="text-xs text-slate-500 mt-0.5">{description}</p></div>
        <a href={src} target="_blank" rel="noreferrer" className="shrink-0 text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1">Buka penuh <ExternalLink className="w-3.5 h-3.5" /></a>
      </figcaption>
    </figure>
  );
}
