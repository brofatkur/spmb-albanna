import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand Col */}
        <div className="md:col-span-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-albanna.webp"
            alt="Sekolah Albanna"
            className="h-12 w-auto object-contain brightness-200 contrast-200 mb-4"
          />
          <p className="text-slate-400 text-sm leading-relaxed max-w-md">
            Sekolah Albanna berkomitmen menghadirkan pendidikan Islam terpadu yang religius, unggul, dan berdaya saing global untuk jenjang PAUD (KB/TK), SDIT, SMP, dan SMA di Denpasar, Bali.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 font-mono">
            <span>● Sistem SPMB Resmi Albanna</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
            Jenjang Pendidikan
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/spmb-paud" className="hover:text-emerald-400 transition">
                SPMB PAUD (KB & TK)
              </Link>
            </li>
            <li>
              <Link href="/spmb-sdit" className="hover:text-emerald-400 transition">
                SPMB SDIT
              </Link>
            </li>
            <li>
              <Link href="/spmb-smp" className="hover:text-emerald-400 transition">
                SPMB SMP
              </Link>
            </li>
            <li>
              <Link href="/spmb-sma" className="hover:text-emerald-400 transition">
                SPMB SMA
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
            Hubungi Panitia SPMB
          </h3>
          <ul className="space-y-3 text-xs text-slate-400">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Jl. Tukad Yeh Biu II No. 6, Dangin Puri Kauh, Kec. Denpasar Timur, Kota Denpasar, Bali 80234
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>(0361) 238 6533</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>info@albanna.sch.id</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>spmb.albanna.sch.id</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} Sekolah Albanna Denpasar. Hak Cipta Dilindungi.</p>
        <p>Sistem Penerimaan Murid Baru Terintegrasi</p>
      </div>
    </footer>
  );
}
