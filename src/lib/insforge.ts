// InsForge Client and Sync Utilities
export const INSFORGE_CONFIG = {
  baseUrl: process.env.INSFORGE_BASE_URL || 'http://43.157.228.75:7130',
  anonKey: process.env.INSFORGE_ANON_KEY || 'anon_0a75c32f9a5fa623748cae8ca28764bf213bc112',
  table: 'spmb_registrations',
};

export async function insertInsForgeRecord(record: {
  nomor_pendaftaran: string;
  jenjang: string;
  nama_lengkap: string;
  nama_panggilan?: string | null;
  nisn?: string | null;
  nik?: string | null;
  jenis_kelamin?: string | null;
  sekolah_asal?: string | null;
  alamat_domisili?: string | null;
  nama_ayah?: string | null;
  handphone_ayah?: string | null;
  nama_ibu?: string | null;
  handphone_ibu?: string | null;
  no_handphone?: string | null;
  email?: string | null;
  status?: string;
  catatan?: string;
  form_data?: any;
  file_paths?: any;
}) {
  try {
    const url = `${INSFORGE_CONFIG.baseUrl}/api/database/records/${INSFORGE_CONFIG.table}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${INSFORGE_CONFIG.anonKey}`,
        'Content-Type': 'application/json',
      },
      // InsForge's database endpoint expects inserts as an array, including
      // when only one registration is being created.
      body: JSON.stringify([record]),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('InsForge insert error:', err);
      return { success: false, error: err };
    }

    const data = await res.json().catch(() => ({}));
    return { success: true, data };
  } catch (err: any) {
    console.error('InsForge insert exception:', err);
    return { success: false, error: err.message };
  }
}

export async function createGoogleSheetRegistration(data: {
  jenjang: string;
  nama_lengkap: string;
  nama_sekolah_asal?: string;
  nisn?: string;
  alamat_domisili?: string;
  nama_ayah?: string;
  handphone_ayah?: string;
  nama_ibu?: string;
  handphone_ibu?: string;
  status?: string;
  created_at?: string;
  [key: string]: any;
}) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  const webhookToken = process.env.GOOGLE_SHEET_TOKEN;

  if (!webhookUrl) {
    return { configured: false, success: false as const, reason: 'GOOGLE_SHEET_WEBHOOK_URL is not set' };
  }

  try {
    const body = new URLSearchParams();
    Object.entries({ ...data, key: webhookToken || '' }).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      body.set(key, Array.isArray(value) ? value.join(', ') : String(value));
    });

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body,
      redirect: 'follow',
      signal: AbortSignal.timeout(25000),
    });

    const payload = await res.json().catch(() => null) as {
      result?: string;
      message?: string;
      no_pendaftaran?: string;
      jenjang?: string;
    } | null;

    if (!res.ok || payload?.result !== 'success' || !payload.no_pendaftaran) {
      return {
        configured: true,
        success: false as const,
        error: payload?.message || `Google Sheet webhook returned HTTP ${res.status}`,
      };
    }

    return {
      configured: true,
      success: true as const,
      nomor_pendaftaran: String(payload.no_pendaftaran),
      jenjang: payload.jenjang,
    };
  } catch (err: any) {
    console.error('Google Sheet Webhook error:', err);
    return { configured: true, success: false as const, error: err.message };
  }
}
