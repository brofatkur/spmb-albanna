'use client';

import React, { useMemo, useState } from 'react';
import { JENJANG_CONFIGS, FormField } from '@/data/forms';
import { AlertCircle, Save, X } from 'lucide-react';

type EditableRegistration = {
  id: number;
  nomor_pendaftaran: string;
  jenjang: string;
  form_data?: Record<string, unknown>;
  file_paths?: Record<string, string>;
  [key: string]: unknown;
};

type Props = {
  registration: EditableRegistration;
  onCancel: () => void;
  onSaved: (registration: EditableRegistration) => void;
};

function humanize(value: string) {
  return value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function AdminRegistrationEditForm({ registration, onCancel, onSaved }: Props) {
  const originalData = useMemo(() => registration.form_data || {}, [registration.form_data]);
  const arrayKeys = useMemo(
    () => new Set(Object.entries(originalData).filter(([, value]) => Array.isArray(value)).map(([key]) => key)),
    [originalData]
  );
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      Object.entries(originalData).map(([key, value]) => [
        key,
        Array.isArray(value) ? value.join(', ') : String(value ?? ''),
      ])
    )
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const sections = useMemo(() => {
    const config = JENJANG_CONFIGS[String(registration.jenjang).toLowerCase()];
    const used = new Set<string>();
    const configured = (config?.steps || []).map((step) => {
      const fields = step.fields.filter((field) => {
        if (!(field.name in values) || field.type === 'upload') return false;
        used.add(field.name);
        return true;
      });
      return { label: step.label, fields };
    }).filter((section) => section.fields.length > 0);

    const extraFields: FormField[] = Object.keys(values)
      .filter((key) => !used.has(key) && !(key in (registration.file_paths || {})))
      .map((key) => ({
        id: `extra-${key}`,
        name: key,
        label: humanize(key),
        type: 'text',
        required: false,
      }));

    if (extraFields.length) configured.push({ label: 'Data Lainnya', fields: extraFields });
    return configured;
  }, [registration.jenjang, registration.file_paths, values]);

  const save = async () => {
    setSaving(true);
    setError('');
    try {
      const formData = Object.fromEntries(
        Object.entries(values).map(([key, value]) => [
          key,
          arrayKeys.has(key)
            ? value.split(',').map((item) => item.trim()).filter(Boolean)
            : value,
        ])
      );
      const response = await fetch('/api/admin/registrations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: registration.id, form_data: formData }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.success) throw new Error(payload.message || 'Gagal menyimpan perubahan.');
      onSaved(payload.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menyimpan perubahan.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-900">
        Nomor pendaftaran <strong>{registration.nomor_pendaftaran}</strong> dikunci agar tetap unik.
        Perubahan di bawah akan tersimpan ke dashboard dan InsForge.
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {sections.map((section) => (
        <section key={section.label} className="space-y-3">
          <h3 className="border-b border-slate-200 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-700">
            {section.label}
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {section.fields.map((field) => {
              const value = values[field.name] || '';
              const isLong = /alamat|keterangan|deskripsi|riwayat/i.test(field.name) || value.length > 100;
              return (
                <label key={field.name} className={isLong ? 'sm:col-span-2' : ''}>
                  <span className="mb-1 block text-[11px] font-semibold text-slate-600">
                    {field.label || humanize(field.name)}
                  </span>
                  {field.type === 'select' && field.options?.length ? (
                    <select
                      value={value}
                      onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                      className="w-full rounded-lg border border-slate-300 bg-white p-2 text-xs"
                    >
                      <option value="">Pilih...</option>
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>{option.text}</option>
                      ))}
                    </select>
                  ) : isLong ? (
                    <textarea
                      value={value}
                      onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                      rows={3}
                      className="w-full rounded-lg border border-slate-300 p-2 text-xs"
                    />
                  ) : (
                    <input
                      type={field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : 'text'}
                      value={value}
                      onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                      className="w-full rounded-lg border border-slate-300 p-2 text-xs"
                    />
                  )}
                </label>
              );
            })}
          </div>
        </section>
      ))}

      <div className="sticky bottom-0 flex justify-end gap-2 border-t border-slate-200 bg-white py-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700"
        >
          <X className="h-3.5 w-3.5" /> Batal
        </button>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="h-3.5 w-3.5" /> {saving ? 'Menyimpan...' : 'Simpan Koreksi'}
        </button>
      </div>
    </div>
  );
}
