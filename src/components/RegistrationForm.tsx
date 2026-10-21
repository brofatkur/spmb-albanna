'use client';

import React, { useEffect, useState } from 'react';
import { JenjangConfig, FormField } from '@/data/forms';
import { Check, ChevronRight, ChevronLeft, Upload, AlertCircle, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import RegionSelect, { RegionLevel } from './RegionSelect';
import { UPLOAD_ACCEPT_ATTRIBUTE, validateUploadFile } from '@/lib/upload';
import {
  clearRegistrationDraft,
  loadRegistrationDraft,
  saveRegistrationDraft,
} from '@/lib/registration-draft';

interface Props {
  config: JenjangConfig;
}

export default function RegistrationForm({ config }: Props) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, string | string[]>>({});
  const [fileMap, setFileMap] = useState<Record<string, File>>({});
  const [regionCodes, setRegionCodes] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<{
    nomorPendaftaran: string;
    namaLengkap: string;
  } | null>(null);
  const [draftReady, setDraftReady] = useState(false);
  const [draftRestored, setDraftRestored] = useState(false);
  const [draftUpdatedAt, setDraftUpdatedAt] = useState<number | null>(null);

  const steps = config.steps;

  useEffect(() => {
    let active = true;
    loadRegistrationDraft(config.id).then((draft) => {
      if (!active) return;
      if (draft) {
        setFormData(draft.formData);
        setFileMap(draft.fileMap);
        setRegionCodes(draft.regionCodes);
        setCurrentStepIndex(
          draft.currentStepIndex >= 0 && draft.currentStepIndex < config.steps.length
            ? draft.currentStepIndex
            : 0
        );
        setDraftUpdatedAt(draft.updatedAt);
        setDraftRestored(true);
      }
      setDraftReady(true);
    });
    return () => {
      active = false;
    };
  }, [config.id, config.steps.length]);

  useEffect(() => {
    if (!draftReady || submitSuccess) return;
    const timeout = window.setTimeout(() => {
      const updatedAt = Date.now();
      void saveRegistrationDraft(config.id, {
        formData,
        fileMap,
        regionCodes,
        currentStepIndex,
        updatedAt,
      }).catch(() => {
        // The form remains usable when browser storage is unavailable.
      });
      setDraftUpdatedAt(updatedAt);
    }, 700);
    return () => window.clearTimeout(timeout);
  }, [config.id, currentStepIndex, draftReady, fileMap, formData, regionCodes, submitSuccess]);

  const discardDraft = async () => {
    if (!window.confirm('Hapus seluruh draf isian pada perangkat ini?')) return;
    await clearRegistrationDraft(config.id);
    setFormData({});
    setFileMap({});
    setRegionCodes({});
    setErrors({});
    setCurrentStepIndex(0);
    setDraftRestored(false);
    setDraftUpdatedAt(null);
  };
  // Helper to check conditional visibility
  const isFieldVisible = (field: FormField) => {
    const rules = config.conditionalRules;
    if (!rules) return true;

    for (const rule of Object.values(rules) as Array<{
      field: string;
      value?: string;
      values?: string[];
      targets: string[];
    }>) {
      if (!rule.targets.includes(field.name)) continue;
      const parentValue = formData[rule.field];
      if (rule.values) return typeof parentValue === 'string' && rule.values.includes(parentValue);
      return parentValue === rule.value;
    }

    return true;
  };

  const isStepVisible = (stepIndex: number) =>
    steps[stepIndex].fields.some((field) => field.type !== 'html1' && isFieldVisible(field));

  const visibleStepIndexes = steps
    .map((_, index) => index)
    .filter(isStepVisible);
  const currentStep = steps[currentStepIndex];
  const currentVisiblePosition = visibleStepIndexes.indexOf(currentStepIndex);

  const getRegionMeta = (fieldName: string) => {
    const match = fieldName.match(/^(provinsi|kabupaten|kecamatan|kelurahan)(.*)$/);
    if (!match) return null;
    const level = match[1] as RegionLevel;
    const suffix = match[2];
    const parentLevel: Partial<Record<RegionLevel, RegionLevel>> = {
      kabupaten: 'provinsi',
      kecamatan: 'kabupaten',
      kelurahan: 'kecamatan',
    };
    const parent = parentLevel[level];
    return {
      level,
      suffix,
      parentField: parent ? `${parent}${suffix}` : undefined,
    };
  };

  const getOrderedFields = (fields: FormField[]) => {
    const ordered = [...fields];
    const groups = new Map<string, Array<{ index: number; field: FormField; level: RegionLevel }>>();
    ordered.forEach((field, index) => {
      const meta = getRegionMeta(field.name);
      if (!meta) return;
      const group = groups.get(meta.suffix) || [];
      group.push({ index, field, level: meta.level });
      groups.set(meta.suffix, group);
    });
    const rank: Record<RegionLevel, number> = { provinsi: 0, kabupaten: 1, kecamatan: 2, kelurahan: 3 };
    groups.forEach((group) => {
      const indexes = group.map((item) => item.index).sort((a, b) => a - b);
      const fieldsByLevel = group.sort((a, b) => rank[a.level] - rank[b.level]);
      indexes.forEach((index, position) => {
        ordered[index] = fieldsByLevel[position].field;
      });
    });
    return ordered;
  };

  const handleInputChange = (fieldName: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    }
  };

  const handleRegionChange = (fieldName: string, value: string, code: string) => {
    const meta = getRegionMeta(fieldName);
    if (!meta) return;
    const levels: RegionLevel[] = ['provinsi', 'kabupaten', 'kecamatan', 'kelurahan'];
    const currentRank = levels.indexOf(meta.level);
    const childFields = levels.slice(currentRank + 1).map((level) => `${level}${meta.suffix}`);

    setFormData((previous) => {
      const next = { ...previous, [fieldName]: value };
      childFields.forEach((child) => delete next[child]);
      return next;
    });
    setRegionCodes((previous) => {
      const next = { ...previous, [fieldName]: code };
      childFields.forEach((child) => delete next[child]);
      return next;
    });
    setErrors((previous) => {
      const next = { ...previous };
      delete next[fieldName];
      childFields.forEach((child) => delete next[child]);
      return next;
    });
  };

  const dateToDisplayValue = (isoValue: string) => {
    const match = isoValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    return match ? `${match[3]}/${match[2]}/${match[1]}` : isoValue;
  };

  const dateToInputValue = (displayValue: string) => {
    const match = displayValue.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    return match ? `${match[3]}-${match[2]}-${match[1]}` : '';
  };

  const isValidDate = (value: string) => {
    const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!match) return false;
    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  };

  const handleCheckboxToggle = (fieldName: string, optionValue: string) => {
    const currentList = Array.isArray(formData[fieldName]) ? [...formData[fieldName]] : [];
    const index = currentList.indexOf(optionValue);
    if (index > -1) {
      currentList.splice(index, 1);
    } else {
      currentList.push(optionValue);
    }
    handleInputChange(fieldName, currentList);
  };

  const handleFileChange = (fieldName: string, file: File | null) => {
    if (!file) {
      const newFileMap = { ...fileMap };
      delete newFileMap[fieldName];
      setFileMap(newFileMap);
      return;
    }

    const validationError = validateUploadFile(file);
    if (validationError) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: validationError,
      }));
      return;
    }

    setFileMap((prev) => ({ ...prev, [fieldName]: file }));
    if (errors[fieldName]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    }
  };

  const validateCurrentStep = () => {
    const stepErrors: Record<string, string> = {};
    const visibleFields = currentStep.fields.filter(isFieldVisible);

    for (const f of visibleFields) {
      // Informational blocks mirror Elementor's HTML fields and do not accept input.
      if (f.type === 'html1') continue;

      if (f.required) {
        if (f.type === 'upload') {
          if (!fileMap[f.name]) {
            stepErrors[f.name] = 'Berkas ini wajib diunggah.';
          }
        } else if (f.type === 'checkbox') {
          const arr = formData[f.name];
          if (!arr || !Array.isArray(arr) || arr.length === 0) {
            stepErrors[f.name] = 'Pilihlah minimal satu opsi.';
          }
        } else {
          const val = formData[f.name];
          if (val === undefined || val === null || String(val).trim() === '') {
            stepErrors[f.name] = 'Kolom ini wajib diisi.';
          }
        }
      }
      const value = formData[f.name];
      if (f.type === 'date' && value && !isValidDate(String(value))) {
        stepErrors[f.name] = 'Gunakan format tanggal DD/MM/YYYY.';
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      const nextStepIndex = visibleStepIndexes.find((index) => index > currentStepIndex);
      if (nextStepIndex !== undefined) {
        setCurrentStepIndex(nextStepIndex);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrevious = () => {
    const previousStepIndex = [...visibleStepIndexes]
      .reverse()
      .find((index) => index < currentStepIndex);
    if (previousStepIndex !== undefined) {
      setCurrentStepIndex(previousStepIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.append('jenjang', config.id);

      // Append all form inputs
      for (const [key, value] of Object.entries(formData)) {
        if (Array.isArray(value)) {
          for (const item of value) {
            payload.append(`${key}[]`, item);
          }
        } else {
          payload.append(key, value !== undefined && value !== null ? String(value) : '');
        }
      }

      // Append files
      for (const [key, file] of Object.entries(fileMap)) {
        payload.append(key, file);
      }

      const res = await fetch('/api/register', {
        method: 'POST',
        body: payload,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Gagal mengirim pendaftaran');
      }

      setSubmitSuccess({
        nomorPendaftaran: json.nomor_pendaftaran,
        namaLengkap: json.nama_lengkap,
      });
      await clearRegistrationDraft(config.id);
      setDraftRestored(false);
      setDraftUpdatedAt(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Kesalahan tidak diketahui';
      alert('Terjadi kendala saat menyimpan pendaftaran: ' + message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-8 md:p-12 text-center max-w-2xl mx-auto my-8">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
          Pendaftaran Berhasil Dikirim
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
          Alhamdulillah! Pendaftaran Diterima
        </h2>
        <p className="text-slate-600 mt-2 text-sm md:text-base">
          Data pendaftaran untuk calon siswa <strong className="text-slate-900">{submitSuccess.namaLengkap}</strong> di jenjang <strong>{config.fullName}</strong> telah berhasil disimpan dalam sistem SPMB Albanna.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8 text-center">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
            Nomor Registrasi Pendaftaran
          </p>
          <p className="text-2xl md:text-3xl font-mono font-bold text-emerald-700 mt-1 select-all">
            {submitSuccess.nomorPendaftaran}
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Simpan nomor pendaftaran ini untuk mengecek status seleksi atau mencetak bukti pendaftaran.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={`/bukti-pendaftaran/${submitSuccess.nomorPendaftaran}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition"
          >
            <FileText className="w-4 h-4" />
            Cetak Bukti Pendaftaran (PDF)
          </Link>
          <Link
            href="/cek-status"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition"
          >
            Cek Status Pendaftaran
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      {/* Form Header Banner */}
      <div className={`bg-gradient-to-r ${config.color} p-6 md:p-8 text-white`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              Formulir SPMB Online 2027-2028
            </span>
            <h1 className="text-2xl md:text-3xl font-black">
              {config.fullName}
            </h1>
            <p className="text-white/90 text-sm mt-1">
              {config.tagline}
            </p>
          </div>
          <div className="hidden sm:block text-right">
            <span className="text-xs font-medium text-white/80">Langkah Pengisian</span>
            <div className="text-2xl font-bold font-mono">
              {currentVisiblePosition + 1} / {visibleStepIndexes.length}
            </div>
          </div>
        </div>
      </div>

      {/* Step Indicators Bar */}
      {draftRestored && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blue-100 bg-blue-50 px-4 py-3 text-xs text-blue-900 md:px-8">
          <div>
            <strong>Draf sebelumnya berhasil dipulihkan.</strong>{' '}
            Isian tersimpan otomatis hanya di perangkat ini selama tujuh hari
            {draftUpdatedAt ? ` • ${new Date(draftUpdatedAt).toLocaleString('id-ID')}` : ''}.
          </div>
          <button
            type="button"
            onClick={discardDraft}
            className="rounded-lg border border-blue-200 bg-white px-3 py-1.5 font-semibold text-blue-700 hover:bg-blue-100"
          >
            Hapus Draf
          </button>
        </div>
      )}

      {/* Step Indicators Bar */}
      <div className="border-b border-slate-100 bg-slate-50/70 px-4 py-3 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {visibleStepIndexes.map((idx, visibleIndex) => {
            const st = steps[idx];
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (idx < currentStepIndex) setCurrentStepIndex(idx);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  isCurrent
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : isCompleted
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 cursor-pointer'
                    : 'text-slate-400 bg-slate-100'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    isCurrent
                      ? 'bg-white text-emerald-700'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : visibleIndex + 1}
                </span>
                <span>{st.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Form Content */}
      <form onSubmit={handleSubmit} className="p-6 md:p-10">
        <div className="mb-8 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
              {currentVisiblePosition + 1}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">
              {currentStep.label}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 pl-11">
            Harap isi informasi berikut dengan benar dan teliti sesuai dokumen resmi (KK / Akta).
          </p>
        </div>

        {/* Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {getOrderedFields(currentStep.fields).map((field) => {
            if (!isFieldVisible(field)) return null;

            const isFullWidth = field.width === 100 || !field.width;
            const colSpanClass = isFullWidth ? 'md:col-span-2' : 'md:col-span-1';
            const fieldError = errors[field.name];
            const regionMeta = getRegionMeta(field.name);

            if (field.type === 'html1') {
              return (
                <div key={field.name} className={`${colSpanClass} p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs leading-relaxed`}>
                  <p className="font-bold text-sm">{field.label}</p>
                  {field.help && (
                    <p className="mt-2 whitespace-pre-line">{field.help}</p>
                  )}
                </div>
              );
            }

            return (
              <div key={field.name} className={colSpanClass}>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                  {field.label}
                  {field.required && <span className="text-rose-500 ml-1">*</span>}
                </label>

                {field.help && (
                  <p className="text-xs text-slate-500 mb-2 leading-relaxed">
                    {field.help}
                  </p>
                )}

                {/* SELECT DROPDOWN */}
                {regionMeta && (
                  <RegionSelect
                    level={regionMeta.level}
                    parentCode={regionMeta.parentField ? regionCodes[regionMeta.parentField] : undefined}
                    value={String(formData[field.name] || '')}
                    selectedCode={regionCodes[field.name]}
                    hasError={Boolean(fieldError)}
                    onChange={(name, code) => handleRegionChange(field.name, name, code)}
                  />
                )}

                {!regionMeta && field.type === 'select' && (
                  <select
                    value={formData[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-slate-800 transition focus:outline-none focus:ring-2 ${
                      fieldError
                        ? 'border-rose-400 focus:ring-rose-200'
                        : 'border-slate-300 focus:ring-emerald-200 focus:border-emerald-500'
                    }`}
                  >
                    <option value="">-- Pilih Opsi --</option>
                    {field.options?.map((opt, i) => (
                      <option key={i} value={opt.value}>
                        {opt.text}
                      </option>
                    ))}
                  </select>
                )}

                {/* RADIO */}
                {field.type === 'radio' && (
                  <div className="space-y-2 mt-1">
                    {field.options?.map((opt, i) => (
                      <label
                        key={i}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                          formData[field.name] === opt.value
                            ? 'border-emerald-500 bg-emerald-50/50 text-emerald-900 font-medium'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name={field.name}
                          value={opt.value}
                          checked={formData[field.name] === opt.value}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm">{opt.text}</span>
                      </label>
                    ))}
                  </div>
                )}

                {/* CHECKBOX MULTI-SELECT */}
                {field.type === 'checkbox' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1 max-h-60 overflow-y-auto p-2 border border-slate-200 rounded-xl bg-slate-50/50">
                    {field.options?.map((opt, i) => {
                      const isChecked = Array.isArray(formData[field.name]) && formData[field.name].includes(opt.value);
                      return (
                        <label
                          key={i}
                          className={`flex items-center gap-2 p-2 rounded-lg text-xs cursor-pointer border transition ${
                            isChecked
                              ? 'bg-emerald-600 text-white border-emerald-600 font-medium'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleCheckboxToggle(field.name, opt.value)}
                            className="sr-only"
                          />
                          <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${isChecked ? 'bg-white text-emerald-600' : 'border-slate-400'}`}>
                            {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </span>
                          <span className="truncate">{opt.text}</span>
                        </label>
                      );
                    })}
                  </div>
                )}

                {/* UPLOAD FILE */}
                {field.type === 'upload' && (
                  <div className="mt-1">
                    <label
                      className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition ${
                        fileMap[field.name]
                          ? 'border-emerald-500 bg-emerald-50/40 text-emerald-900'
                          : fieldError
                          ? 'border-rose-400 bg-rose-50/20'
                          : 'border-slate-300 hover:border-emerald-500 bg-slate-50/50'
                      }`}
                    >
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(field.name, e.target.files?.[0] || null)}
                        className="sr-only"
                        accept={UPLOAD_ACCEPT_ATTRIBUTE}
                      />
                      <Upload className={`w-8 h-8 mb-2 ${fileMap[field.name] ? 'text-emerald-600' : 'text-slate-400'}`} />
                      {fileMap[field.name] ? (
                        <div className="text-center">
                          <p className="text-sm font-semibold text-emerald-800">
                            {fileMap[field.name].name}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {(fileMap[field.name].size / (1024 * 1024)).toFixed(2)} MB • Klik untuk ganti berkas
                          </p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <p className="text-xs font-semibold text-slate-700">
                            Pilih Berkas atau Tarik ke Sini
                          </p>
                          <p className="text-[11px] text-slate-400 mt-1">
                            PDF atau gambar umum, termasuk JPG, PNG, WEBP dan HEIC (maks. 5MB)
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                )}

                {/* TEXTAREA */}
                {field.type === 'textarea' && (
                  <textarea
                    rows={3}
                    value={formData[field.name] || ''}
                    placeholder={field.placeholder || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-slate-800 transition focus:outline-none focus:ring-2 ${
                      fieldError
                        ? 'border-rose-400 focus:ring-rose-200'
                        : 'border-slate-300 focus:ring-emerald-200 focus:border-emerald-500'
                    }`}
                  />
                )}

                {/* STANDARD INPUTS: TEXT, NUMBER, DATE, TEL, EMAIL */}
                {!regionMeta && !['select', 'radio', 'checkbox', 'upload', 'textarea', 'html1'].includes(field.type) && (
                  <input
                    type={
                      field.type === 'date'
                        ? 'date'
                        : field.type === 'number'
                        ? 'number'
                        : field.type === 'tel'
                        ? 'tel'
                        : field.type === 'email'
                        ? 'email'
                        : 'text'
                    }
                    value={
                      field.type === 'date'
                        ? dateToInputValue(String(formData[field.name] || ''))
                        : formData[field.name] || ''
                    }
                    placeholder={field.placeholder || ''}
                    max={field.type === 'date' ? new Date().toISOString().split('T')[0] : undefined}
                    onChange={(e) =>
                      handleInputChange(
                        field.name,
                        field.type === 'date' ? dateToDisplayValue(e.target.value) : e.target.value
                      )
                    }
                    className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-slate-800 transition focus:outline-none focus:ring-2 ${
                      fieldError
                        ? 'border-rose-400 focus:ring-rose-200'
                        : 'border-slate-300 focus:ring-emerald-200 focus:border-emerald-500'
                    }`}
                  />
                )}

                {fieldError && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-600 mt-1.5 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{fieldError}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Step Navigation Buttons */}
        <div className="mt-12 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
          {visibleStepIndexes.some((index) => index < currentStepIndex) ? (
            <button
              type="button"
              onClick={handlePrevious}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Sebelumnya
            </button>
          ) : (
            <div />
          )}

          {visibleStepIndexes.some((index) => index > currentStepIndex) ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 transition"
            >
              Berikutnya
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-10 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Mengirim Pendaftaran...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  Daftar Sekarang
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
