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
      body: JSON.stringify(record),
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

export async function forwardToGoogleSheet(data: {
  nomor_pendaftaran: string;
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
  if (!webhookUrl) {
    return { sent: false, reason: 'GOOGLE_SHEET_WEBHOOK_URL is not set' };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return { sent: true, status: res.status };
  } catch (err: any) {
    console.error('Google Sheet Webhook error:', err);
    return { sent: false, error: err.message };
  }
}
