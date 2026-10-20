# Panduan Lengkap Sistem SPMB Sekolah Albanna
**Subdomain:** `spmb.albanna.sch.id`  
**Database:** InsForge Self-Hosted (PostgreSQL) + Local SQLite Fallback  
**Integrasi:** Real-time Google Sheets Webhook  
**Template PDF:** Sesuai Format Resmi Sekolah Albanna Denpasar

---

## 1. Menjalankan di Komputer / Server Lokal

1. Masuk ke direktori proyek:
   ```bash
   cd /Users/macos/.gemini/antigravity/scratch/spmb-albanna
   ```
2. Jalankan server development:
   ```bash
   npm run dev
   ```
3. Akses di browser: `http://localhost:3000`

---

## 2. Struktur Halaman & Formulir (Persis Sesuai Referensi)

| Jenjang | URL Halaman | Fitur Khusus |
|---|---|---|
| **Beranda Portal** | `/` | Pilihan jenjang, alur pendaftaran, cek status instan |
| **SPMB PAUD** | `/spmb-paud` | 7 Langkah (KB/TK), upload Akta & KK, kondisi wali asuh, proses kelahiran |
| **SPMB SDIT** | `/spmb-sdit` | 9 Langkah, opsi Siswa Baru / Mutasi (syarat surat mutasi dinamis), KIP, KPS/PKH |
| **SPMB SMP** | `/spmb-smp` | 6 Langkah, data periodik, upload berkas Ijazah & KK & Akta, KIP/PKH |
| **SPMB SMA** | `/spmb-sma` | 6 Langkah, pemilihan hobi & cita-cita multi-opsi, wali asuh, berkas KK & Akta |
| **Bukti PDF** | `/bukti-pendaftaran/[nomor_pendaftaran]` | Format persis template gambar resmi (Kop, No. Reg, Data Siswa, Data Ortu, Ttd) |
| **Cek Status** | `/cek-status` | Pencarian instan berdasarkan No. Pendaftaran, NIK, atau NISN |
| **Panel Admin** | `/admin` | Dashboard statistik, verifikasi berkas, ubah status, export Excel, setup Google Sheets |

---

## 3. Akun Admin Bawaan

- **URL:** `http://localhost:3000/admin` (atau `https://spmb.albanna.sch.id/admin`)
- **Username:** `admin`
- **Password:** `albanna2026`

*(Dapat diubah melalui database atau menu admin)*

---

## 4. Konfigurasi Subdomain `spmb.albanna.sch.id`

Jika domain utama `albanna.sch.id` menggunakan Cloudflare, cPanel, atau DNS registrar:

1. **Tambahkan DNS Record:**
   - **Type:** `A`
   - **Name:** `spmb`
   - **IPv4 Address:** `[IP_PUBLIC_VPS_ANDA]`
   - **TTL:** Auto (atau 300)
   - *Jika memakai Cloudflare, Anda dapat menyalakan Proxy (Orange Cloud).*

2. **Nginx Reverse Proxy di VPS:**
   Salin file konfigurasi dari `nginx.conf.example` ke `/etc/nginx/sites-available/spmb.albanna.sch.id`:
   ```bash
   sudo cp nginx.conf.example /etc/nginx/sites-available/spmb.albanna.sch.id
   sudo ln -s /etc/nginx/sites-available/spmb.albanna.sch.id /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

3. **Pasang SSL Gratis (Let's Encrypt Certbot):**
   ```bash
   sudo certbot --nginx -d spmb.albanna.sch.id
   ```

4. **Jalankan Aplikasi dengan PM2 (Background Daemon):**
   ```bash
   npm run build
   pm2 start npm --name "spmb-albanna" -- start -- -p 3000
   pm2 save
   pm2 startup
   ```

---

## 5. Koneksi Database InsForge Self-Hosted & Google Sheet

### A. InsForge Self-Hosted
Tabel `spmb_registrations` telah otomatis dibuat dan terhubung ke backend InsForge di:
- **Base URL:** `http://43.157.228.75:7130`
- **Tabel:** `spmb_registrations`
- **Tipe Kolom:** `nomor_pendaftaran`, `jenjang`, `nama_lengkap`, `nisn`, `nik`, `sekolah_asal`, `nama_ayah`, `nama_ibu`, `form_data` (JSONB), `file_paths` (JSONB).

### B. Koneksi Otomatis ke Google Sheets
Setiap calon siswa yang mendaftar dapat otomatis langsung masuk ke baris Google Sheet:
1. Buat Google Sheet baru di Google Drive Anda.
2. Klik menu **Extensions → Apps Script**.
3. Buka menu **Admin → Koneksi Google Sheet** di website SPMB untuk menyalin script siap pakai.
4. Deploy sebagai Web App dengan izin akses **Anyone**.
5. Masukkan URL hasil deployment ke file `.env.local`:
   ```env
   GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/.../exec"
   ```
