'use client';

import { useEffect, useState } from 'react';

export type RegionLevel = 'provinsi' | 'kabupaten' | 'kecamatan' | 'kelurahan';

interface RegionOption {
  id: string;
  name: string;
}

interface Props {
  level: RegionLevel;
  parentCode?: string;
  value: string;
  selectedCode?: string;
  hasError?: boolean;
  onChange: (name: string, code: string) => void;
}

const API_BASE = 'https://www.emsifa.com/api-wilayah-indonesia/v2';

function getEndpoint(level: RegionLevel, parentCode?: string) {
  if (level === 'provinsi') return `${API_BASE}/provinces.json`;
  if (!parentCode) return null;
  if (level === 'kabupaten') return `${API_BASE}/regencies/${parentCode}.json`;
  if (level === 'kecamatan') return `${API_BASE}/districts/${parentCode}.json`;
  return `${API_BASE}/villages/${parentCode}.json`;
}

export default function RegionSelect({ level, parentCode, value, selectedCode, hasError, onChange }: Props) {
  const [options, setOptions] = useState<RegionOption[]>([]);
  const [loadedEndpoint, setLoadedEndpoint] = useState<string | null>(null);
  const [failedEndpoint, setFailedEndpoint] = useState<string | null>(null);
  const endpoint = getEndpoint(level, parentCode);
  const loading = Boolean(endpoint && loadedEndpoint !== endpoint && failedEndpoint !== endpoint);
  const failed = Boolean(endpoint && failedEndpoint === endpoint);
  const visibleOptions = loadedEndpoint === endpoint ? options : [];

  useEffect(() => {
    if (!endpoint) return;

    const controller = new AbortController();

    fetch(endpoint, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Gagal memuat wilayah');
        return response.json();
      })
      .then((payload) => {
        const rows = Array.isArray(payload?.data) ? payload.data : [];
        setOptions(
          rows
            .map((row: RegionOption) => ({ id: String(row.id), name: String(row.name) }))
            .sort((a: RegionOption, b: RegionOption) => a.name.localeCompare(b.name, 'id'))
        );
        setLoadedEndpoint(endpoint);
        setFailedEndpoint(null);
      })
      .catch((error) => {
        if (error?.name !== 'AbortError') setFailedEndpoint(endpoint);
      });

    return () => controller.abort();
  }, [endpoint]);

  const inputClass = `w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-slate-800 transition focus:outline-none focus:ring-2 ${
    hasError
      ? 'border-rose-400 focus:ring-rose-200'
      : 'border-slate-300 focus:ring-emerald-200 focus:border-emerald-500'
  }`;

  if (!endpoint) {
    return (
      <select disabled className={`${inputClass} bg-slate-100 text-slate-400`}>
        <option>Pilih wilayah sebelumnya dahulu</option>
      </select>
    );
  }

  if (failed) {
    return (
      <div>
        <input
          type="text"
          value={value}
          placeholder="Ketik nama wilayah"
          onChange={(event) => onChange(event.target.value, '')}
          className={inputClass}
        />
        <p className="mt-1 text-[11px] text-amber-700">
          Data wilayah sedang tidak tersedia. Nama wilayah tetap dapat diketik manual.
        </p>
      </div>
    );
  }

  return (
    <select
      value={selectedCode || ''}
      disabled={!endpoint || loading}
      onChange={(event) => {
        const selected = visibleOptions.find((option) => option.id === event.target.value);
        onChange(selected?.name || '', selected?.id || '');
      }}
      className={`${inputClass} disabled:bg-slate-100 disabled:text-slate-400`}
    >
      <option value="">
        {loading
          ? 'Memuat data wilayah...'
          : !endpoint
          ? 'Pilih wilayah sebelumnya dahulu'
          : '-- Pilih Wilayah --'}
      </option>
      {visibleOptions.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
