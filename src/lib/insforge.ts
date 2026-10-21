// InsForge Client and Sync Utilities
import { createClient } from '@insforge/sdk';

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
  form_data?: unknown;
  file_paths?: unknown;
}) {
  try {
    const insforge = createClient({
      baseUrl: INSFORGE_CONFIG.baseUrl,
      anonKey: INSFORGE_CONFIG.anonKey,
    });
    const { data, error } = await insforge.database
      .rpc('upsert_spmb_registration', { payload: record });

    if (error) {
      console.error('InsForge insert error:', error);
      return { success: false, error: error.message || String(error) };
    }
    return { success: true, data };
  } catch (err: unknown) {
    console.error('InsForge insert exception:', err);
    return { success: false, error: err instanceof Error ? err.message : String(err) };
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
  [key: string]: unknown;
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
      // Apps Script may need extra time to copy several attachments to Drive.
      // Keep this longer than the former 25-second window to avoid reporting
      // a failure while Google is still completing a valid registration.
      signal: AbortSignal.timeout(90000),
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
  } catch (err: unknown) {
    console.error('Google Sheet Webhook error:', err);
    return { configured: true, success: false as const, error: err instanceof Error ? err.message : String(err) };
  }
}

export async function syncGoogleDriveRegistrationPdf(data: {
  nomor_pendaftaran: string;
  jenjang: string;
  nama_lengkap: string;
  pdf_url: string;
}) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  const webhookToken = process.env.GOOGLE_SHEET_TOKEN;

  if (!webhookUrl) {
    return { configured: false, success: false as const, reason: 'GOOGLE_SHEET_WEBHOOK_URL is not set' };
  }

  try {
    const body = new URLSearchParams({
      key: webhookToken || '',
      action: 'sync_pdf',
      nomor_pendaftaran: data.nomor_pendaftaran,
      jenjang: data.jenjang,
      nama_lengkap: data.nama_lengkap,
      pdf_url: data.pdf_url,
    });
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body,
      redirect: 'follow',
      signal: AbortSignal.timeout(30000),
    });
    const payload = await res.json().catch(() => null) as {
      result?: string;
      message?: string;
      drive_folder_url?: string;
      pdf_drive_url?: string;
    } | null;

    if (!res.ok || payload?.result !== 'success') {
      return {
        configured: true,
        success: false as const,
        error: payload?.message || `Google Drive sync returned HTTP ${res.status}`,
      };
    }

    return {
      configured: true,
      success: true as const,
      drive_folder_url: payload.drive_folder_url,
      pdf_drive_url: payload.pdf_drive_url,
    };
  } catch (err: unknown) {
    console.error('Google Drive PDF sync error:', err);
    return { configured: true, success: false as const, error: err instanceof Error ? err.message : String(err) };
  }
}
