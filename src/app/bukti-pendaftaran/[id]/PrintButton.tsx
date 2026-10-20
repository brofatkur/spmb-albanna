'use client';

import React from 'react';
import { Download } from 'lucide-react';

interface Props {
  registrationId: string;
}

export default function PrintButton({ registrationId }: Props) {
  return (
    <a
      href={`/api/registrations/${encodeURIComponent(registrationId)}/pdf`}
      download
      className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 rounded-lg shadow transition"
    >
      <Download className="w-4 h-4" />
      Download PDF
    </a>
  );
}
