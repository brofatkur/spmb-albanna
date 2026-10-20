import React from 'react';
import { JENJANG_CONFIGS } from '@/data/forms';
import RegistrationForm from '@/components/RegistrationForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'SPMB SDIT - Sekolah Albanna',
  description: 'Pendaftaran Murid Baru SDIT Albanna',
};

export default function SPMBSditPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />
      <main className="max-w-4xl mx-auto w-full px-4 py-8 md:py-12">
        <RegistrationForm config={JENJANG_CONFIGS.sd} />
      </main>
      <Footer />
    </div>
  );
}
