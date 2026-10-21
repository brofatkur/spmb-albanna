export type RegistrationFormData = Record<string, string | string[]>;

function firstText(...values: Array<string | string[] | null | undefined>) {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return null;
}

export function normalizeRegistrationFormData(value: unknown): RegistrationFormData {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('Data formulir tidak valid.');
  }

  const normalized: RegistrationFormData = {};
  for (const [key, rawValue] of Object.entries(value)) {
    if (!key || ['__proto__', 'constructor', 'prototype'].includes(key)) continue;

    if (Array.isArray(rawValue)) {
      normalized[key] = rawValue
        .filter((item): item is string | number | boolean =>
          ['string', 'number', 'boolean'].includes(typeof item)
        )
        .map(String);
      continue;
    }

    if (rawValue === null || rawValue === undefined) {
      normalized[key] = '';
      continue;
    }

    if (['string', 'number', 'boolean'].includes(typeof rawValue)) {
      normalized[key] = String(rawValue);
    }
  }

  return normalized;
}

export function getRegistrationCoreFields(
  jenjang: string,
  data: RegistrationFormData
) {
  const level = jenjang.toLowerCase();

  const namaLengkap = firstText(
    data[`nama_lengkap_${level}`],
    data.nama_lengkap,
    data.nama_siswa,
    data.nama_calon_siswa
  );

  return {
    nama_lengkap: namaLengkap,
    nama_panggilan: firstText(data[`nama_panggilan_${level}`], data.nama_panggilan),
    nisn: firstText(data[`nisn_${level}`], data.nisn),
    nik: firstText(data[`nik_${level}`], data.nik),
    jenis_kelamin: firstText(data[`jenis_kelamin_${level}`], data.jenis_kelamin),
    sekolah_asal: firstText(
      data[`sekolah_asal_${level}`],
      data.sekolah_asal,
      data.nama_sekolah_asal
    ),
    alamat_domisili: firstText(
      data[`alamat_tempat_tinggal_${level}`],
      data[`alamat_domisili_${level}`],
      data.alamat_tempat_tinggal,
      data.alamat_domisili,
      data.alamat
    ),
    nama_ayah: firstText(data[`nama_ayah_${level}`], data.nama_ayah),
    handphone_ayah: firstText(
      data[`handphone_ayah_${level}`],
      data[`no_handphone_ayah_${level}`],
      data.handphone_ayah
    ),
    nama_ibu: firstText(data[`nama_ibu_${level}`], data.nama_ibu),
    handphone_ibu: firstText(
      data[`handphone_ibu_${level}`],
      data[`no_handphone_ibu_${level}`],
      data.handphone_ibu
    ),
    email: firstText(data[`email_${level}`], data.email),
  };
}

export function buildInsForgeRegistrationPayload(record: {
  nomor_pendaftaran: string;
  jenjang: string;
  form_data: RegistrationFormData;
  file_paths?: unknown;
  status?: string | null;
  catatan?: string | null;
  fallback_nama_lengkap?: string | null;
}) {
  const core = getRegistrationCoreFields(record.jenjang, record.form_data);
  const noHandphone = firstText(
    record.form_data[`no_handphone_${record.jenjang.toLowerCase()}`],
    core.handphone_ayah,
    core.handphone_ibu,
    record.form_data.no_handphone
  );

  return {
    nomor_pendaftaran: record.nomor_pendaftaran,
    jenjang: record.jenjang.toUpperCase(),
    nama_lengkap: core.nama_lengkap || record.fallback_nama_lengkap || 'Calon Murid',
    nama_panggilan: core.nama_panggilan,
    nisn: core.nisn,
    nik: core.nik,
    jenis_kelamin: core.jenis_kelamin,
    sekolah_asal: core.sekolah_asal,
    alamat_domisili: core.alamat_domisili,
    nama_ayah: core.nama_ayah,
    handphone_ayah: core.handphone_ayah,
    nama_ibu: core.nama_ibu,
    handphone_ibu: core.handphone_ibu,
    no_handphone: noHandphone,
    email: core.email,
    status: record.status || 'Menunggu Verifikasi',
    catatan: record.catatan || '',
    form_data: record.form_data,
    file_paths: record.file_paths || {},
  };
}
