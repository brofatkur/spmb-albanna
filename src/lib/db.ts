import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbDirectory = path.join(process.cwd(), 'data');
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true });
}

const dbPath = path.join(dbDirectory, 'spmb.db');
const db = new Database(dbPath);

// Enable WAL mode for high concurrency
db.pragma('journal_mode = WAL');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nomor_pendaftaran TEXT UNIQUE NOT NULL,
    jenjang TEXT NOT NULL,
    nama_lengkap TEXT NOT NULL,
    nisn TEXT,
    nik TEXT,
    jenis_kelamin TEXT,
    nama_ayah TEXT,
    no_handphone TEXT,
    email TEXT,
    form_data TEXT NOT NULL,
    file_paths TEXT,
    status TEXT DEFAULT 'Menunggu Verifikasi',
    catatan TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS registration_edit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    registration_id INTEGER NOT NULL,
    admin_user_id INTEGER NOT NULL,
    admin_username TEXT NOT NULL,
    before_data TEXT NOT NULL,
    after_data TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const registrationColumns = db.prepare(`PRAGMA table_info(registrations)`).all() as Array<{ name: string }>;
if (!registrationColumns.some((column) => column.name === 'submission_id')) {
  db.exec(`ALTER TABLE registrations ADD COLUMN submission_id TEXT`);
}
db.exec(`
  CREATE UNIQUE INDEX IF NOT EXISTS registrations_submission_id_unique
  ON registrations(submission_id)
  WHERE submission_id IS NOT NULL;
`);

export interface RegistrationRecord {
  id: number;
  nomor_pendaftaran: string;
  jenjang: 'paud' | 'sd' | 'smp' | 'sma';
  nama_lengkap: string;
  nisn: string | null;
  nik: string | null;
  jenis_kelamin: string | null;
  nama_ayah: string | null;
  no_handphone: string | null;
  email: string | null;
  form_data: string;
  file_paths: string | null;
  status: string;
  catatan: string | null;
  created_at: string;
  updated_at: string;
  submission_id: string | null;
}

export function generateRegistrationNumber(jenjang: string): string {
  const year = new Date().getFullYear();
  const prefix = `SPMB-${year}-${jenjang.toUpperCase()}`;
  
  const countRow = db.prepare(`
    SELECT COUNT(*) as total FROM registrations WHERE jenjang = ?
  `).get(jenjang) as { total: number };

  const nextSeq = (countRow.total + 1).toString().padStart(4, '0');
  return `${prefix}-${nextSeq}`;
}

export default db;
