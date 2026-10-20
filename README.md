# SPMB Sekolah Albanna (Denpasar, Bali)

Portal Resmi Sistem Penerimaan Murid Baru (SPMB) Sekolah Albanna untuk jenjang **PAUD (KB & TK)**, **SDIT**, **SMP**, dan **SMA**, dengan formulir multi-langkah persis sesuai formulir live, output Formulir Pendaftaran resmi (PDF A4), terintegrasi ke database **InsForge Self-Hosted (PostgreSQL)** dan real-time sync ke **Google Sheets**.

🔗 **Live Subdomain Target:** `https://spmb.albanna.sch.id`  
📦 **Repository:** [https://github.com/brofatkur/spmb-albanna](https://github.com/brofatkur/spmb-albanna)

---

## 🌟 Fitur Utama

- **Formulir Multi-Langkah Tiap Jenjang (100% Persis Live):**
  - **PAUD (KB & TK):** `/spmb-paud` — 7 Langkah, riwayat kelahiran & kehamilan, kondisi wali asuh, upload Akta & KK.
  - **SDIT:** `/spmb-sdit` — 9 Langkah, opsi Siswa Baru / Mutasi (berkas mutasi dinamis), KIP, KPS/PKH, berkas lengkap.
  - **SMP:** `/spmb-smp` — 6 Langkah, data periodik, Ijazah SD/MI, KK, Akta, program pemerintah.
  - **SMA:** `/spmb-sma` — 6 Langkah, multi-pilihan hobi & cita-cita, wali asuh, KK & Akta.
- **Output Cetak Bukti Pendaftaran (PDF A4 Resmi):**
  - `/bukti-pendaftaran/[nomor_pendaftaran]` — Sesuai format resmi Sekolah Albanna (Kop surat dengan logo melingkar & kontak, No. Pendaftaran, data siswa, data orang tua/wali, dan kolom tanda tangan).
- **Cek Status Pendaftaran Mandiri:**
  - `/cek-status` — Pencarian cepat berdasarkan Nomor Pendaftaran, NIK, atau NISN.
- **Dashboard Admin:**
  - `/admin` — Rekap statistik pendaftar, filter jenjang & status, verifikasi berkas, ubah status, unduh berkas asli, dan **Export ke Excel (.xlsx)**.
  - Akun Default: `admin` / Password: `albanna2026`
- **Integrasi Database & Google Sheet:**
  - **InsForge Self-Hosted (PostgreSQL):** Tabel `spmb_registrations`.
  - **Google Sheets Webhook Sync:** Pendaftar otomatis terduplikasi ke Google Sheet secara instan via Google Apps Script.

---

## 🚀 Panduan Menjalankan

### 1. Prasyarat
- Node.js v18+ (disarankan v20 atau v22)
- npm atau pnpm / yarn

### 2. Instalasi & Menjalankan Development Server
```bash
# Clone repository
git clone https://github.com/brofatkur/spmb-albanna.git
cd spmb-albanna

# Install dependensi
npm install

# Jalankan server
npm run dev
```
Akses di browser: `http://localhost:3000`

---

## 🛠️ Konfigurasi Environment (`.env.local`)

```env
# InsForge Backend
INSFORGE_BASE_URL=http://43.157.228.75:7130
INSFORGE_ANON_KEY=anon_0a75c32f9a5fa623748cae8ca28764bf213bc112

# Domain
NEXT_PUBLIC_APP_URL=https://spmb.albanna.sch.id

# Google Sheet Webhook (Opsional, dari deployment Google Apps Script)
GOOGLE_SHEET_WEBHOOK_URL=
```

---

## 🌐 Konfigurasi Subdomain & Nginx VPS

Panduan lengkap mengenai setup DNS A Record ke `spmb.albanna.sch.id`, SSL Let's Encrypt Certbot, dan Nginx Reverse Proxy tersedia di:
👉 [`PANDUAN_SETUP_DAN_SUBDOMAIN.md`](./PANDUAN_SETUP_DAN_SUBDOMAIN.md)

---

## 📄 Lisensi
Hak Cipta © Sekolah Albanna Denpasar, Bali.
