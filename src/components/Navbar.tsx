'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

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
        </div>
      )}
    </header>
  );
}
