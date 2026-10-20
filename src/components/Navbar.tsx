'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 h-18 flex items-center justify-between">
        {/* Logo Brand */}
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-albanna.webp"
            alt="Sekolah Albanna"
            className="h-10 md:h-12 w-auto object-contain"
          />
          <div className="hidden lg:block border-l pl-3 border-slate-200">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 block">
              Portal SPMB Online
            </span>
            <span className="text-[11px] text-slate-500">
              Tahun Ajaran 2027-2028
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-700 rounded-lg hover:bg-slate-50 transition"
          >
            Beranda
          </Link>
          <Link
            href="/spmb-paud"
            className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-700 rounded-lg hover:bg-slate-50 transition"
          >
            PAUD (KB/TK)
          </Link>
          <Link
            href="/spmb-sdit"
            className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-700 rounded-lg hover:bg-slate-50 transition"
          >
            SDIT
          </Link>
          <Link
            href="/spmb-smp"
            className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-700 rounded-lg hover:bg-slate-50 transition"
          >
            SMP
          </Link>
          <Link
            href="/spmb-sma"
            className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-700 rounded-lg hover:bg-slate-50 transition"
          >
            SMA
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link
            href="/cek-status"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition"
          >
            <Search className="w-3.5 h-3.5" />
            Cek Status
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
            Admin
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Beranda
          </Link>
          <Link
            href="/spmb-paud"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            SPMB PAUD (KB & TK)
          </Link>
          <Link
            href="/spmb-sdit"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            SPMB SDIT
          </Link>
          <Link
            href="/spmb-smp"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            SPMB SMP
          </Link>
          <Link
            href="/spmb-sma"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            SPMB SMA
          </Link>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/cek-status"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-emerald-800 bg-emerald-50 rounded-lg border border-emerald-200"
            >
              <Search className="w-4 h-4" />
              Cek Status Pendaftaran
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg"
            >
              <ShieldCheck className="w-4 h-4" />
              Login Admin Panel
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
