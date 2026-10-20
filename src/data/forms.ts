// Generated Form Definitions for SPMB Albanna (PAUD, SD, SMP, SMA)
export interface FormOption {
  value: string;
  text: string;
}

export interface FormField {
  id: string;
  name: string;
  label: string;
  help?: string;
  type: string;
  required: boolean;
  placeholder?: string;
  options?: FormOption[];
  width?: number;
}

export interface FormStep {
  label: string;
  fields: FormField[];
}

export interface JenjangConfig {
  id: string;
  name: string;
  slug: string;
  fullName: string;
  level: string;
  color: string;
  accentColor: string;
  badge: string;
  tagline: string;
  steps: FormStep[];
  conditionalRules: any;
}

export const JENJANG_CONFIGS: Record<string, JenjangConfig> = {
  paud: {
    id: 'paud',
    name: 'PAUD',
    slug: 'spmb-paud',
    fullName: 'PAUD Albanna (KB & TK)',
    level: 'Pendidikan Anak Usia Dini',
    color: 'from-amber-500 to-orange-500',
    accentColor: '#f59e0b',
    badge: 'KB & TK',
    tagline: 'Membangun Karakter Islami Sejak Usia Emas',
    steps: [
  {
    "label": "Registrasi Peserta Didik",
    "fields": [
      {
        "id": "form-field-tingkat",
        "name": "tingkat",
        "label": "Tingkat",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "KB A",
            "text": "KB A"
          },
          {
            "value": "KB B",
            "text": "KB B"
          },
          {
            "value": "TK A",
            "text": "TK A"
          },
          {
            "value": "TK B",
            "text": "TK B"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-file_kk_paud",
        "name": "file_kk_paud",
        "label": "Kartu Keluarga (Max File 5Mb)",
        "help": "",
        "type": "upload",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-file_akta_paud",
        "name": "file_akta_paud",
        "label": "Akta Kelahiran Peserta Didik (Max File 5Mb)",
        "help": "",
        "type": "upload",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nama_lengkap_paud",
        "name": "nama_lengkap_paud",
        "label": "Nama Lengkap Siswa",
        "help": "diisi sesuai dengan Akta Kelahiran & Kartu Keluarga siswa",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nama_panggilan_paud",
        "name": "nama_panggilan_paud",
        "label": "Nama Panggilan Siswa",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-jenis_kelamin_paud",
        "name": "jenis_kelamin_paud",
        "label": "Jenis Kelamin",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Laki Laki",
            "text": "Laki Laki"
          },
          {
            "value": "Perempuan",
            "text": "Perempuan"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-nisn_paud",
        "name": "nisn_paud",
        "label": "Nomor Induk Siswa Nasional (NISN) NISN dapat dicari pada web https://nisn.data.kemendikdasmen.go.id/ atau menghubungi operator sekolah. Jika tidak memiliki ditulis \"kosong\".",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-sekolah_asal_paud",
        "name": "sekolah_asal_paud",
        "label": "Nama Sekolah Asal Apabila siswa pernah sekolah sebelum di KB / TK Albanna pastikan nama sekolah di isi dengan lengkap untuk tarik data siswa dari DAPODIK sekolah sebelumnya",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nomor_telepon_sekolah_asal_sd",
        "name": "nomor_telepon_sekolah_asal_sd",
        "label": "Alamat Sekolah Asal Apabila siswa pernah sekolah sebelum di KB / TK Albanna pastikan alamat di isi dengan lengkap untuk tarik data siswa dari DAPODIK sekolah sebelumnya",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      }
    ]
  },
  {
    "label": "Biodata Calon Peserta Didik",
    "fields": [
      {
        "id": "form-field-nik_paud",
        "name": "nik_paud",
        "label": "Nomor Induk Kependudukan (NIK) Siswa",
        "help": "diisi sesuai dengan NIK siswa yang tertera pada NIK",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kk_paud",
        "name": "kk_paud",
        "label": "Nomor Kartu Keluarga (KK)",
        "help": "diisi sesuai dengan nomor yang tertera pada KK",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-tempat_lahir_paud",
        "name": "tempat_lahir_paud",
        "label": "Tempat Lahir",
        "help": "diisi sesuai dengan Akta Kelahiran & Kartu Keluarga siswa",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-tanggal_lahir_paud",
        "name": "tanggal_lahir_paud",
        "label": "Tanggal Lahir",
        "help": "",
        "type": "date",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nomor_akta_kelahiran_paud",
        "name": "nomor_akta_kelahiran_paud",
        "label": "Nomor Registrasi Akta Lahir Siswa",
        "help": "diisi sesuai dengan Akta Kelahiran Contoh: 5171-LU-12012023-0001",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kebuhan_khusus_paud",
        "name": "kebuhan_khusus_paud",
        "label": "Kebutuhan Khusus Siswa",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Tidak Memiliki Kebutuhan Khusus",
            "text": "Tidak Memiliki Kebutuhan Khusus"
          },
          {
            "value": "Netra (A)",
            "text": "Netra (A)"
          },
          {
            "value": "Rungu (B)",
            "text": "Rungu (B)"
          },
          {
            "value": "Grahita Ringan (C)",
            "text": "Grahita Ringan (C)"
          },
          {
            "value": "Grahita Sedang (C)",
            "text": "Grahita Sedang (C)"
          },
          {
            "value": "Daksa Ringan (D)",
            "text": "Daksa Ringan (D)"
          },
          {
            "value": "Daksa Sedang (D)",
            "text": "Daksa Sedang (D)"
          },
          {
            "value": "Laras (E)",
            "text": "Laras (E)"
          },
          {
            "value": "Wicara (F)",
            "text": "Wicara (F)"
          },
          {
            "value": "Hyperaktif (H)",
            "text": "Hyperaktif (H)"
          },
          {
            "value": "Cerdas Istimewa (I)",
            "text": "Cerdas Istimewa (I)"
          },
          {
            "value": "Bakat Istimewa (J)",
            "text": "Bakat Istimewa (J)"
          },
          {
            "value": "Kesulitan Belajar (K)",
            "text": "Kesulitan Belajar (K)"
          },
          {
            "value": "Narkoba (N)",
            "text": "Narkoba (N)"
          },
          {
            "value": "Indigo (O)",
            "text": "Indigo (O)"
          },
          {
            "value": "Lainnya",
            "text": "Lainnya"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-agama_paud",
        "name": "agama_paud",
        "label": "Agama",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Islam",
            "text": "Islam"
          },
          {
            "value": "Kristen",
            "text": "Kristen"
          },
          {
            "value": "Katholik",
            "text": "Katholik"
          },
          {
            "value": "Hindu",
            "text": "Hindu"
          },
          {
            "value": "Budha",
            "text": "Budha"
          },
          {
            "value": "Konghucu",
            "text": "Konghucu"
          },
          {
            "value": "Kepercayaan Kepada Tuhan YME",
            "text": "Kepercayaan Kepada Tuhan YME"
          },
          {
            "value": "Lainnya",
            "text": "Lainnya"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-tinggi_badan_paud",
        "name": "tinggi_badan_paud",
        "label": "Tinggi Badan Peserta Didik",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "Contoh: 135 cm",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-berat_badan_paud",
        "name": "berat_badan_paud",
        "label": "Berat Badan Peserta Didik",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "Contoh: 43 kg",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-lingkar_kepala_paud",
        "name": "lingkar_kepala_paud",
        "label": "Lingkar Kepala Siswa",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-jarak_tinggal_paud",
        "name": "jarak_tinggal_paud",
        "label": "Jarak Tempat Tinggal ke Sekolah",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Kurang dari 1 km",
            "text": "Kurang dari 1 km"
          },
          {
            "value": "Lebih dari 1 km",
            "text": "Lebih dari 1 km"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-waktu_tempuh_paud",
        "name": "waktu_tempuh_paud",
        "label": "Waktu Tempuh",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-hobi_sd",
        "name": "hobi_sd",
        "label": "Hobi",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-cita_cita_sd",
        "name": "cita_cita_sd",
        "label": "Cita Cita",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-alamat_kk_sd",
        "name": "alamat_kk_sd",
        "label": "Alamat Jalan Sesuai Kartu Keluarga (KK)",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-rt_paud",
        "name": "rt_paud",
        "label": "RT (Sesuai KK)",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-rw_paud",
        "name": "rw_paud",
        "label": "RW (Sesuai KK)",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nama_dusun_paud",
        "name": "nama_dusun_paud",
        "label": "Nama Dusun (Sesuai KK)",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kelurahan_paud",
        "name": "kelurahan_paud",
        "label": "Nama Kelurahan/Desa (Sesuai KK)",
        "help": "",
        "type": "text",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kecamatan_paud",
        "name": "kecamatan_paud",
        "label": "Kecamatan (Sesuai KK)",
        "help": "",
        "type": "text",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kabupaten_paud",
        "name": "kabupaten_paud",
        "label": "Kabupaten / Kota (Sesuai KK)",
        "help": "",
        "type": "text",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-provinsi_paud",
        "name": "provinsi_paud",
        "label": "Provinsi (Sesuai KK)",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kode_pos_paud",
        "name": "kode_pos_paud",
        "label": "Kode Pos (Sesuai KK)",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-alamat_tempat_tinggal_paud",
        "name": "alamat_tempat_tinggal_paud",
        "label": "Alamat Tinggal Siswa Tempat tinggal saat ini yang berdomisili di Bali",
        "help": "",
        "type": "text",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-dusun_domisili_paud",
        "name": "dusun_domisili_paud",
        "label": "Nama Dusun (Domisili / di Bali)",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kelurahan_domisili_paud",
        "name": "kelurahan_domisili_paud",
        "label": "Nama Kelurahan/Desa (Domisili / di Bali)",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kecamatan_domisili_paud",
        "name": "kecamatan_domisili_paud",
        "label": "Kecamatan (Domisili / di Bali)",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kabupaten_domisili_paud",
        "name": "kabupaten_domisili_paud",
        "label": "Kabupaten / Kota (Domisili / di Bali)",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-provinsi_domisili_paud",
        "name": "provinsi_domisili_paud",
        "label": "Provinsi (Domisili / di Bali)",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-tempat_tinggal_paud",
        "name": "tempat_tinggal_paud",
        "label": "Tempat Tinggal",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Bersama Orang Tua",
            "text": "Bersama Orang Tua"
          },
          {
            "value": "Wali",
            "text": "Wali"
          },
          {
            "value": "Kost",
            "text": "Kost"
          },
          {
            "value": "Asrama",
            "text": "Asrama"
          },
          {
            "value": "Panti Asuhan",
            "text": "Panti Asuhan"
          },
          {
            "value": "Pesantren",
            "text": "Pesantren"
          },
          {
            "value": "Lainnya",
            "text": "Lainnya"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-transportasi_sd",
        "name": "transportasi_sd",
        "label": "Moda Transportasi ke Sekolah",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Jalan Kaki",
            "text": "Jalan Kaki"
          },
          {
            "value": "Sepeda",
            "text": "Sepeda"
          },
          {
            "value": "Sepeda Motor",
            "text": "Sepeda Motor"
          },
          {
            "value": "Mobil Pribadi",
            "text": "Mobil Pribadi"
          },
          {
            "value": "Kendaraan Umum",
            "text": "Kendaraan Umum"
          },
          {
            "value": "Yang Lain",
            "text": "Yang Lain"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-anak_ke_paud",
        "name": "anak_ke_paud",
        "label": "Anak ke berapa? (Berdasarkan KK) Isi sesuai urutan kelahiran anak kandung dari ibu",
        "help": "",
        "type": "number",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-jumlah_saudara_paud",
        "name": "jumlah_saudara_paud",
        "label": "Jumlah Saudara Kandung dipilih jumlah saudara kandung, dan lainnya jika ada saudara tiri",
        "help": "",
        "type": "number",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      }
    ]
  },
  {
    "label": "Biodata Ayah Kandung Peserta Didik",
    "fields": [
      {
        "id": "form-field-status_ayah_paud",
        "name": "status_ayah_paud",
        "label": "Status Hidup Ayah Kandung",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Hidup",
            "text": "Hidup"
          },
          {
            "value": "Wafat",
            "text": "Wafat"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-nama_ayah_paud",
        "name": "nama_ayah_paud",
        "label": "Nama Ayah Kandung",
        "help": "diisi sesuai dengan AKTA KELAHIRAN ANAK & KK",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nik_ayah_paud",
        "name": "nik_ayah_paud",
        "label": "Nomor Induk Kependudukan Ayah",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-ttl_ayah_paud",
        "name": "ttl_ayah_paud",
        "label": "Tanggal Lahir Ayah",
        "help": "diisi sesuai dengan KTP",
        "type": "date",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-pendidikan_ayah_paud",
        "name": "pendidikan_ayah_paud",
        "label": "Pendidikan Terakhir Ayah",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "TK / Sederajat",
            "text": "TK / Sederajat"
          },
          {
            "value": "SD / Sederajat",
            "text": "SD / Sederajat"
          },
          {
            "value": "SMP / Sederajat",
            "text": "SMP / Sederajat"
          },
          {
            "value": "SMA / Sederajat",
            "text": "SMA / Sederajat"
          },
          {
            "value": "D1",
            "text": "D1"
          },
          {
            "value": "D2",
            "text": "D2"
          },
          {
            "value": "D3",
            "text": "D3"
          },
          {
            "value": "D4",
            "text": "D4"
          },
          {
            "value": "S1",
            "text": "S1"
          },
          {
            "value": "S2",
            "text": "S2"
          },
          {
            "value": "S3",
            "text": "S3"
          },
          {
            "value": "Profesi",
            "text": "Profesi"
          },
          {
            "value": "Tidak Sekolah",
            "text": "Tidak Sekolah"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-pekerjaan_ayah_paud",
        "name": "pekerjaan_ayah_paud",
        "label": "Pekerjaan Ayah",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Tidak Bekerja",
            "text": "Tidak Bekerja"
          },
          {
            "value": "Nelayan",
            "text": "Nelayan"
          },
          {
            "value": "Petani",
            "text": "Petani"
          },
          {
            "value": "Peternak",
            "text": "Peternak"
          },
          {
            "value": "PNS/TNI/Polri",
            "text": "PNS/TNI/Polri"
          },
          {
            "value": "Karyawan Swasta",
            "text": "Karyawan Swasta"
          },
          {
            "value": "Pedagang Kecil",
            "text": "Pedagang Kecil"
          },
          {
            "value": "Pedagang Besar",
            "text": "Pedagang Besar"
          },
          {
            "value": "Wiraswasta",
            "text": "Wiraswasta"
          },
          {
            "value": "Wirausaha",
            "text": "Wirausaha"
          },
          {
            "value": "Buruh",
            "text": "Buruh"
          },
          {
            "value": "Pensiunan",
            "text": "Pensiunan"
          },
          {
            "value": "Tenaga Kerja Indonesia",
            "text": "Tenaga Kerja Indonesia"
          },
          {
            "value": "Karyawan BUMN",
            "text": "Karyawan BUMN"
          },
          {
            "value": "Perdagangan",
            "text": "Perdagangan"
          },
          {
            "value": "Dosen",
            "text": "Dosen"
          },
          {
            "value": "Tidak dapat diterapkan",
            "text": "Tidak dapat diterapkan"
          },
          {
            "value": "Sudah Meninggal",
            "text": "Sudah Meninggal"
          },
          {
            "value": "Lainnya",
            "text": "Lainnya"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-penghasilan_ayah_paud",
        "name": "penghasilan_ayah_paud",
        "label": "Penghasilan Bulanan Ayah",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "&lt;Rp. 500.000",
            "text": "&lt;Rp. 500.000"
          },
          {
            "value": "Rp. 500.000 - Rp. 999.999",
            "text": "Rp. 500.000 - Rp. 999.999"
          },
          {
            "value": "Rp. 1.000.000 - Rp. 1.999.999",
            "text": "Rp. 1.000.000 - Rp. 1.999.999"
          },
          {
            "value": "Rp. 2.000.000 - Rp. 4.999.999",
            "text": "Rp. 2.000.000 - Rp. 4.999.999"
          },
          {
            "value": "Rp. 5.000.000 - Rp. 20.000.000",
            "text": "Rp. 5.000.000 - Rp. 20.000.000"
          },
          {
            "value": "&gt;Rp. 20.000.000",
            "text": "&gt;Rp. 20.000.000"
          },
          {
            "value": "Tidak Berpenghasilan",
            "text": "Tidak Berpenghasilan"
          },
          {
            "value": "Yang Lain",
            "text": "Yang Lain"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-handphone_ayah_paud",
        "name": "handphone_ayah_paud",
        "label": "Nomor Handphone Ayah",
        "help": "",
        "type": "tel",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-email_ayah_paud",
        "name": "email_ayah_paud",
        "label": "Email Ayah",
        "help": "",
        "type": "email",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      }
    ]
  },
  {
    "label": "Biodata Ibu Kandung Peserta Didik",
    "fields": [
      {
        "id": "form-field-status_hidup_ibu_paud",
        "name": "status_hidup_ibu_paud",
        "label": "Status Hidup Ibu Kandung",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Hidup",
            "text": "Hidup"
          },
          {
            "value": "Wafat",
            "text": "Wafat"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-nama_ibu_paud",
        "name": "nama_ibu_paud",
        "label": "Nama Ibu Kandung",
        "help": "diisi sesuai dengan AKTA KELAHIRAN ANAK & KK",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nik_ibu_paud",
        "name": "nik_ibu_paud",
        "label": "Nomor Induk Kependudukan Ibu",
        "help": "diisi sesuai dengan KTP",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-ttl_ibu_paud",
        "name": "ttl_ibu_paud",
        "label": "Tanggal Lahir Ibu",
        "help": "",
        "type": "date",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-pendidikan_ibu_paud",
        "name": "pendidikan_ibu_paud",
        "label": "Pendidikan Terakhir Ibu",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "TK / Sederajat",
            "text": "TK / Sederajat"
          },
          {
            "value": "SD / Sederajat",
            "text": "SD / Sederajat"
          },
          {
            "value": "SMP / Sederajat",
            "text": "SMP / Sederajat"
          },
          {
            "value": "SMA / Sederajat",
            "text": "SMA / Sederajat"
          },
          {
            "value": "D1",
            "text": "D1"
          },
          {
            "value": "D2",
            "text": "D2"
          },
          {
            "value": "D3",
            "text": "D3"
          },
          {
            "value": "D4",
            "text": "D4"
          },
          {
            "value": "S1",
            "text": "S1"
          },
          {
            "value": "S2",
            "text": "S2"
          },
          {
            "value": "S3",
            "text": "S3"
          },
          {
            "value": "Profesi",
            "text": "Profesi"
          },
          {
            "value": "Tidak Sekolah",
            "text": "Tidak Sekolah"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-pekerjaan_ibu_paud",
        "name": "pekerjaan_ibu_paud",
        "label": "Pekerjaan Ibu",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Tidak Bekerja",
            "text": "Tidak Bekerja"
          },
          {
            "value": "Nelayan",
            "text": "Nelayan"
          },
          {
            "value": "Petani",
            "text": "Petani"
          },
          {
            "value": "Peternak",
            "text": "Peternak"
          },
          {
            "value": "PNS/TNI/Polri",
            "text": "PNS/TNI/Polri"
          },
          {
            "value": "Karyawan Swasta",
            "text": "Karyawan Swasta"
          },
          {
            "value": "Pedagang Kecil",
            "text": "Pedagang Kecil"
          },
          {
            "value": "Pedagang Besar",
            "text": "Pedagang Besar"
          },
          {
            "value": "Wiraswasta",
            "text": "Wiraswasta"
          },
          {
            "value": "Wirausaha",
            "text": "Wirausaha"
          },
          {
            "value": "Buruh",
            "text": "Buruh"
          },
          {
            "value": "Pensiunan",
            "text": "Pensiunan"
          },
          {
            "value": "Tenaga Kerja Indonesia",
            "text": "Tenaga Kerja Indonesia"
          },
          {
            "value": "Karyawan BUMN",
            "text": "Karyawan BUMN"
          },
          {
            "value": "Perdagangan",
            "text": "Perdagangan"
          },
          {
            "value": "Dosen",
            "text": "Dosen"
          },
          {
            "value": "Tidak dapat diterapkan",
            "text": "Tidak dapat diterapkan"
          },
          {
            "value": "Sudah Meninggal",
            "text": "Sudah Meninggal"
          },
          {
            "value": "Lainnya",
            "text": "Lainnya"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-handphone_ibu_paud",
        "name": "handphone_ibu_paud",
        "label": "Nomor Handphone Ibu",
        "help": "",
        "type": "tel",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-email_ibu_paud",
        "name": "email_ibu_paud",
        "label": "Email Ibu",
        "help": "",
        "type": "email",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      }
    ]
  },
  {
    "label": "Biodata Wali Asuh Peserta Didik",
    "fields": [
      {
        "id": "form-field-wali_paud",
        "name": "wali_paud",
        "label": "Apakah ada wali asuh selain orangtua kandung siswa?",
        "help": "",
        "type": "select",
        "required": false,
        "placeholder": "",
        "options": [
          {
            "value": "Ya",
            "text": "Ya"
          },
          {
            "value": "Tidak",
            "text": "Tidak"
          }
        ],
        "width": 100
      }
    ]
  },
  {
    "label": "Isian Biodata Wali Asuh",
    "fields": [
      {
        "id": "form-field-nama_wali_asuh_paud",
        "name": "nama_wali_asuh_paud",
        "label": "Nama Wali Asuh",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nik_wali_paud",
        "name": "nik_wali_paud",
        "label": "Nomor Induk Kependudukan Wali Asuh Nomor Induk Kependudukan Wali Asuh",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-ttl_wali_paud",
        "name": "ttl_wali_paud",
        "label": "Tanggal Lahir Wali Asuh",
        "help": "",
        "type": "date",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-pendidikan_wali_paud",
        "name": "pendidikan_wali_paud",
        "label": "Pendidikan Terakhir Wali Asuh",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-pekerjaan_wali_paud",
        "name": "pekerjaan_wali_paud",
        "label": "Pekerjaan Wali Asuh",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-penghasilan_wali_paud",
        "name": "penghasilan_wali_paud",
        "label": "Penghasilan Bulanan Wali Asuh",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      }
    ]
  },
  {
    "label": "Informasi Proses Kelahiran & Kehamilan",
    "fields": [
      {
        "id": "form-field-usia_ibu_hamil",
        "name": "usia_ibu_hamil",
        "label": "Usia Ibu saat Hamil",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Di bawah 20 tahun",
            "text": "Di bawah 20 tahun"
          },
          {
            "value": "20 -30 Tahun",
            "text": "20 -30 Tahun"
          },
          {
            "value": "31- 40 Tahun",
            "text": "31- 40 Tahun"
          },
          {
            "value": "Di atas 40 tahun",
            "text": "Di atas 40 tahun"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-kehamilan_anak",
        "name": "kehamilan_anak",
        "label": "Apakah kehamilan anak ini direncanakan?",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Ya",
            "text": "Ya"
          },
          {
            "value": "Tidak",
            "text": "Tidak"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-pengalaman_ibu",
        "name": "pengalaman_ibu",
        "label": "Apakah ibu mengalami stres atau tekanan emosional yang berat selama kehamilan? jelaskan!",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-proses_bersalin",
        "name": "proses_bersalin",
        "label": "Bagaimana proses persalinannya?",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Normal",
            "text": "Normal"
          },
          {
            "value": "Operasi Caesar",
            "text": "Operasi Caesar"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-anak_lahir",
        "name": "anak_lahir",
        "label": "Apakah anak lahir cukup bulan?",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Ya",
            "text": "Ya"
          },
          {
            "value": "Tidak",
            "text": "Tidak"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-berat_badan_lahir_anak",
        "name": "berat_badan_lahir_anak",
        "label": "Berat badan lahir anak",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Kurang dari 2.5kg",
            "text": "Kurang dari 2.5kg"
          },
          {
            "value": "2.5kg - 4kg",
            "text": "2.5kg - 4kg"
          },
          {
            "value": "Lebih dari 4kg",
            "text": "Lebih dari 4kg"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-apakah_anak_pernah_mengalami_penyakit_serius_atau_dirawat_di_rumah_sakit",
        "name": "apakah_anak_pernah_mengalami_penyakit_serius_atau_dirawat_di_rumah_sakit",
        "label": "Apakah anak pernah mengalami penyakit serius atau dirawat di rumah sakit?",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-apakah_anak_memiliki_masalah_dalam_penglihatan_atau_pendengaran",
        "name": "apakah_anak_memiliki_masalah_dalam_penglihatan_atau_pendengaran",
        "label": "Apakah anak memiliki masalah dalam penglihatan atau pendengaran?",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-bagaimana_perkembangan_motorik_anak",
        "name": "bagaimana_perkembangan_motorik_anak",
        "label": "Bagaimana perkembangan motorik anak (merangkak, duduk, berdiri, berjalan)?",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Sesuai dengan usia",
            "text": "Sesuai dengan usia"
          },
          {
            "value": "Sedikit terlambat",
            "text": "Sedikit terlambat"
          },
          {
            "value": "Sangat terlambat",
            "text": "Sangat terlambat"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-apakah_anak_mengalami_fase_merangkak",
        "name": "apakah_anak_mengalami_fase_merangkak",
        "label": "Apakah anak mengalami fase merangkak?",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Mengalami fase merangkak",
            "text": "Mengalami fase merangkak"
          },
          {
            "value": "Tidak mengalami fase merangkak",
            "text": "Tidak mengalami fase merangkak"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-bagaimana_kemampuan_motorik_halus_anak",
        "name": "bagaimana_kemampuan_motorik_halus_anak",
        "label": "Bagaimana kemampuan motorik halus anak (misal : menggenggam benda) ?",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Sudah bisa",
            "text": "Sudah bisa"
          },
          {
            "value": "Perlu bimbingan sekali",
            "text": "Perlu bimbingan sekali"
          },
          {
            "value": "Kesulitan dalam melakukan",
            "text": "Kesulitan dalam melakukan"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-apakah_anak_mudah_marah_tantrum_atau_frustasi_ketika_keinginannya_tidak_tercapai",
        "name": "apakah_anak_mudah_marah_tantrum_atau_frustasi_ketika_keinginannya_tidak_tercapai",
        "label": "Apakah anak mudah marah, tantrum, atau frustasi ketika keinginannya tidak tercapai?",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Jarang",
            "text": "Jarang"
          },
          {
            "value": "Kadang-kadang",
            "text": "Kadang-kadang"
          },
          {
            "value": "Sering",
            "text": "Sering"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-apakah_anak_sering_menunjukkan_perilaku_berulang",
        "name": "apakah_anak_sering_menunjukkan_perilaku_berulang",
        "label": "Apakah anak sering menunjukkan perilaku berulang (misalnya, mengulang kata atau gerakan secara terus-menerus)?",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Tidak",
            "text": "Tidak"
          },
          {
            "value": "Kadang-kadang",
            "text": "Kadang-kadang"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-apakah_anak_menunjukkan_perilaku_sensori_tertentu",
        "name": "apakah_anak_menunjukkan_perilaku_sensori_tertentu",
        "label": "Apakah anak menunjukkan perilaku sensori tertentu (misalnya, sangat sensitif terhadap suara, sentuhan, atau cahaya)?",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-bagaimana_perkembangan_bahasa_anak",
        "name": "bagaimana_perkembangan_bahasa_anak",
        "label": "Bagaimana perkembangan bahasa anak (bicara, berkomunikasi, artikulasi)? Jelaskan !",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-apakah_anak_dapat_mengungkapkan_kebutuhan_dan_keinginannya_dengan_jelas",
        "name": "apakah_anak_dapat_mengungkapkan_kebutuhan_dan_keinginannya_dengan_jelas",
        "label": "Apakah anak dapat mengungkapkan kebutuhan dan keinginannya dengan jelas?",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-apakah_anak_mampu_bersosialisasi_dengan_anak_lain",
        "name": "apakah_anak_mampu_bersosialisasi_dengan_anak_lain",
        "label": "Apakah anak mampu bersosialisasi dengan anak lain?",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-apakah_anak_menunjukkan_rasa_ingin_tahu_dan_minat_dalam_aktivitas_belajar_atau_bermain",
        "name": "apakah_anak_menunjukkan_rasa_ingin_tahu_dan_minat_dalam_aktivitas_belajar_atau_bermain",
        "label": "Apakah anak menunjukkan rasa ingin tahu dan minat dalam aktivitas belajar atau bermain?",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Ya, Sangat tertarik",
            "text": "Ya, Sangat tertarik"
          },
          {
            "value": "Cukup tertarik",
            "text": "Cukup tertarik"
          },
          {
            "value": "Tidak menunjukkan minat",
            "text": "Tidak menunjukkan minat"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-bagaimana_respons_anak_terhadap_perubahan_rutinitas_atau_lingkungan_baru",
        "name": "bagaimana_respons_anak_terhadap_perubahan_rutinitas_atau_lingkungan_baru",
        "label": "Bagaimana respons anak terhadap perubahan rutinitas atau lingkungan baru?",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Mudah beradaptasi",
            "text": "Mudah beradaptasi"
          },
          {
            "value": "Membutuhkan waktu dan beradaptasi",
            "text": "Membutuhkan waktu dan beradaptasi"
          },
          {
            "value": "Kesulitan beradaptasi, mudah marah atau bingung",
            "text": "Kesulitan beradaptasi, mudah marah atau bingung"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-apakah_anak_bisa_mengikuti_instruksi_sederhana",
        "name": "apakah_anak_bisa_mengikuti_instruksi_sederhana",
        "label": "Apakah anak bisa mengikuti instruksi sederhana (misalnya, tolong ambilkan buku, silahkan duduk, dll)?",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Ya, sangat baik",
            "text": "Ya, sangat baik"
          },
          {
            "value": "Bisa, tapi kadang membutuhkan bimbingan",
            "text": "Bisa, tapi kadang membutuhkan bimbingan"
          },
          {
            "value": "Sulit mengikuti instruksi",
            "text": "Sulit mengikuti instruksi"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-apakah_anak_memiliki_kebiasaan_mandiri_seperti_makan_sendiri_atau_memakai_baju_sendiri",
        "name": "apakah_anak_memiliki_kebiasaan_mandiri_seperti_makan_sendiri_atau_memakai_baju_sendiri",
        "label": "Apakah anak memiliki kebiasaan mandiri seperti makan sendiri atau memakai baju sendiri?",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Ya, sudah mandiri",
            "text": "Ya, sudah mandiri"
          },
          {
            "value": "Bisa, tapi perlu sedikit bantuan",
            "text": "Bisa, tapi perlu sedikit bantuan"
          },
          {
            "value": "Tidak bisa, perlu bantuan penuh",
            "text": "Tidak bisa, perlu bantuan penuh"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-apakah_anak_menunjukkan_rasa_tanggung_jawab_terhadap_barang_atau_tugas_sederhana",
        "name": "apakah_anak_menunjukkan_rasa_tanggung_jawab_terhadap_barang_atau_tugas_sederhana",
        "label": "Apakah anak menunjukkan rasa tanggung jawab terhadap barang atau tugas sederhana?",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Ya, sangat baik",
            "text": "Ya, sangat baik"
          },
          {
            "value": "Cukup baik, perlu bimbingan",
            "text": "Cukup baik, perlu bimbingan"
          },
          {
            "value": "Belum memiliki rasa tanggung jawab",
            "text": "Belum memiliki rasa tanggung jawab"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-bagaimana_respon_anak_terhadap_aturan_dan_disiplin_sederhana",
        "name": "bagaimana_respon_anak_terhadap_aturan_dan_disiplin_sederhana",
        "label": "Bagaimana respon anak terhadap aturan dan disiplin sederhana (misal : antri atau menunggu giliran) ?",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-seberapa_sering_ayah_bunda_membacakan_buku_cerita_untuk_anak",
        "name": "seberapa_sering_ayah_bunda_membacakan_buku_cerita_untuk_anak",
        "label": "Seberapa sering Ayah/Bunda membacakan buku cerita untuk anak ?",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Setiap hari",
            "text": "Setiap hari"
          },
          {
            "value": "Kadang-kadang",
            "text": "Kadang-kadang"
          },
          {
            "value": "Jarang sekali",
            "text": "Jarang sekali"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-seberapa_sering_ayah_mengajak_anak_berkomunikasi_atau_bercerita_tentang_hal_hal_di_sekitarnya",
        "name": "seberapa_sering_ayah_mengajak_anak_berkomunikasi_atau_bercerita_tentang_hal_hal_di_sekitarnya",
        "label": "Seberapa sering Ayah mengajak anak berkomunikasi atau bercerita tentang hal-hal di sekitarnya?",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Setiap hari",
            "text": "Setiap hari"
          },
          {
            "value": "Kadang-kadang",
            "text": "Kadang-kadang"
          },
          {
            "value": "Jarang sekali",
            "text": "Jarang sekali"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-apakah_anak_terlibat_dalam_permainan_atau_kegiatan_yang_mendukung_interaksi_sosial",
        "name": "apakah_anak_terlibat_dalam_permainan_atau_kegiatan_yang_mendukung_interaksi_sosial",
        "label": "Apakah anak terlibat dalam permainan atau kegiatan yang mendukung interaksi sosial?",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Setiap hari",
            "text": "Setiap hari"
          },
          {
            "value": "Kadang-kadang",
            "text": "Kadang-kadang"
          },
          {
            "value": "Jarang sekali",
            "text": "Jarang sekali"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-seberapa_sering_ayah_bunda_melatih_anak_untuk_melakukan_aktivitas_mandiri",
        "name": "seberapa_sering_ayah_bunda_melatih_anak_untuk_melakukan_aktivitas_mandiri",
        "label": "Seberapa sering Ayah/Bunda melatih anak untuk melakukan aktivitas mandiri (seperti membereskan mainan, makan sendiri)?",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Setiap hari",
            "text": "Setiap hari"
          },
          {
            "value": "Kadang-kadang",
            "text": "Kadang-kadang"
          },
          {
            "value": "Jarang sekali",
            "text": "Jarang sekali"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-bagaimana_keterlibatan_ayah_bunda_dalam_mempersiapkan_anak_untuk_sekolah",
        "name": "bagaimana_keterlibatan_ayah_bunda_dalam_mempersiapkan_anak_untuk_sekolah",
        "label": "Bagaimana keterlibatan Ayah/Bunda dalam mempersiapkan anak untuk sekolah (membimbing aktivitas belajar, membentuk kebiasaan positif)?",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Sangat terlibat",
            "text": "Sangat terlibat"
          },
          {
            "value": "Terlibat, tapi tidak rutin",
            "text": "Terlibat, tapi tidak rutin"
          },
          {
            "value": "Kurang terlibat",
            "text": "Kurang terlibat"
          }
        ],
        "width": 100
      }
    ]
  }
],
    conditionalRules: {
  "wali_condition": {
    "field": "wali_paud",
    "value": "Ya",
    "targets": [
      "nama_wali_asuh_paud",
      "nik_wali_paud",
      "ttl_wali_paud",
      "pendidikan_wali_paud",
      "pekerjaan_wali_paud",
      "penghasilan_wali_paud"
    ]
  }
}
  },
  sd: {
    id: 'sd',
    name: 'SDIT',
    slug: 'spmb-sdit',
    fullName: 'SDIT Albanna',
    level: 'Sekolah Dasar Islam Terpadu',
    color: 'from-emerald-600 to-teal-600',
    accentColor: '#059669',
    badge: 'SDIT',
    tagline: 'Generasi Qurani, Cerdas, dan Berakhlak Mulia',
    steps: [
  {
    "label": "Registrasi Peserta Didik",
    "fields": [
      {
        "id": "form-field-jenis_pendaftaran_sd",
        "name": "jenis_pendaftaran_sd",
        "label": "Jenis Pendaftaran",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Siswa Baru",
            "text": "Siswa Baru"
          },
          {
            "value": "Siswa Pindah",
            "text": "Siswa Pindah"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-pilihan_kelas_sd",
        "name": "pilihan_kelas_sd",
        "label": "Pilihan Kelas",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Reguler",
            "text": "Reguler"
          },
          {
            "value": "Billingual",
            "text": "Billingual"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-kelas_sd",
        "name": "kelas_sd",
        "label": "Kelas",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Kelas 1",
            "text": "Kelas 1"
          },
          {
            "value": "Kelas 2",
            "text": "Kelas 2"
          },
          {
            "value": "Kelas 3",
            "text": "Kelas 3"
          },
          {
            "value": "Kelas 4",
            "text": "Kelas 4"
          },
          {
            "value": "Kelas 5",
            "text": "Kelas 5"
          },
          {
            "value": "Kelas 6",
            "text": "Kelas 6"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-tanggal_masuk_sd",
        "name": "tanggal_masuk_sd",
        "label": "Tanggal Rencana Masuk Sekolah diisi tanggal rencana akan masuk sekolah bagi siswa mutasi",
        "help": "",
        "type": "date",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-sekolah_asal_sd",
        "name": "sekolah_asal_sd",
        "label": "Sekolah Asal",
        "help": "diisi sesuai dengan nama sekolah yang tertera pada raport siswa dan diisi \"tidak sekolah\" jika ananda tidak mengikuti jenjang TK/PAUD/RA",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nisn_sd",
        "name": "nisn_sd",
        "label": "Nomor Induk Siswa Nasional (NISN) NISN dapat dicari pada web https://nisn.data.kemendikdasmen.go.id/ atau menghubungi operator sekolah. Jika tidak memiliki ditulis \"kosong\".",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-alamat_sekolah_asal_sd",
        "name": "alamat_sekolah_asal_sd",
        "label": "Alamat Sekolah Asal diisi lengkap dengan kecamatan, kabupaten, dan provinsi dimana sekolah tersebut terdaftar",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "Contoh: Jl. Tukad Yeh Ho III/16, Kec. Denpasar Timur, Kota Denpasar, Provinsi Bali",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nomor_telepon_sekolah_asal_sd",
        "name": "nomor_telepon_sekolah_asal_sd",
        "label": "Nomor Telepon Sekolah Asal Nomor Sekolah atau Operator",
        "help": "",
        "type": "tel",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      }
    ]
  },
  {
    "label": "Biodata Calon Peserta Didik",
    "fields": [
      {
        "id": "form-field-nama_lengkap_sd",
        "name": "nama_lengkap_sd",
        "label": "Nama Lengkap Siswa",
        "help": "diisi sesuai dengan Akta Kelahiran & Kartu Keluarga siswa",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nama_panggilan_sd",
        "name": "nama_panggilan_sd",
        "label": "Nama Panggilan Siswa",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-jenis_kelamin_sd",
        "name": "jenis_kelamin_sd",
        "label": "Jenis Kelamin",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Laki Laki",
            "text": "Laki Laki"
          },
          {
            "value": "Perempuan",
            "text": "Perempuan"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-tempat_lahir_sd",
        "name": "tempat_lahir_sd",
        "label": "Tempat Lahir",
        "help": "diisi sesuai dengan Akta Kelahiran & Kartu Keluarga siswa",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-tanggal_lahir_sd",
        "name": "tanggal_lahir_sd",
        "label": "Tanggal Lahir",
        "help": "",
        "type": "date",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nik_sd",
        "name": "nik_sd",
        "label": "Nomor Induk Kependudukan (NIK) Siswa",
        "help": "diisi sesuai dengan NIK siswa yang tertera pada NIK",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kk_sd",
        "name": "kk_sd",
        "label": "Nomor Kartu Keluarga (KK)",
        "help": "diisi sesuai dengan nomor yang tertera pada KK",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nomor_akta_kelahiran_sd",
        "name": "nomor_akta_kelahiran_sd",
        "label": "Nomor Registrasi Akta Lahir Siswa",
        "help": "diisi sesuai dengan Akta Kelahiran",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-anak_ke_sd",
        "name": "anak_ke_sd",
        "label": "Anak ke -",
        "help": "",
        "type": "number",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-jumlah_saudara_sd",
        "name": "jumlah_saudara_sd",
        "label": "Jumlah Saudara Kandung dipilih jumlah saudara kandung, dan lainnya jika ada saudara tiri",
        "help": "",
        "type": "number",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-alamat_tempat_tinggal_sd",
        "name": "alamat_tempat_tinggal_sd",
        "label": "Alamat Tinggal Siswa Tempat tinggal saat ini yang berdomisili di Bali",
        "help": "",
        "type": "text",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kelurahan_sd",
        "name": "kelurahan_sd",
        "label": "Nama Kelurahan/Desa Tempat tinggal saat ini yang berdomisili di Bali",
        "help": "",
        "type": "text",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kecamatan_sd",
        "name": "kecamatan_sd",
        "label": "Kecamatan Tempat tinggal saat ini yang berdomisili di Bali",
        "help": "",
        "type": "text",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kabupaten_sd",
        "name": "kabupaten_sd",
        "label": "Kabupaten / Kota Tempat tinggal saat ini yang berdomisili di Bali",
        "help": "",
        "type": "text",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-provinsi_sd",
        "name": "provinsi_sd",
        "label": "Provinsi Tempat tinggal saat ini yang berdomisili di Bali",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kode_pos_sd",
        "name": "kode_pos_sd",
        "label": "Kode Pos Tempat tinggal saat ini yang berdomisili di Bali",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-tempat_tinggal_siswa_sd",
        "name": "tempat_tinggal_siswa_sd",
        "label": "Tempat Tinggal Siswa",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Bersama Orangtua",
            "text": "Bersama Orangtua"
          },
          {
            "value": "Bersama Wali",
            "text": "Bersama Wali"
          },
          {
            "value": "Yang Lain",
            "text": "Yang Lain"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-transportasi_sd",
        "name": "transportasi_sd",
        "label": "Moda Transportasi ke Sekolah",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Jalan Kaki",
            "text": "Jalan Kaki"
          },
          {
            "value": "Sepeda",
            "text": "Sepeda"
          },
          {
            "value": "Sepeda Motor",
            "text": "Sepeda Motor"
          },
          {
            "value": "Mobil Pribadi",
            "text": "Mobil Pribadi"
          },
          {
            "value": "Kendaraan Umum",
            "text": "Kendaraan Umum"
          },
          {
            "value": "Yang Lain",
            "text": "Yang Lain"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-jarak_tinggal_sd",
        "name": "jarak_tinggal_sd",
        "label": "Jarak Tempat Tinggal ke Sekolah",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Kurang dari 1 km",
            "text": "Kurang dari 1 km"
          },
          {
            "value": "Lebih dari 1 km",
            "text": "Lebih dari 1 km"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-alamat_kk_sd",
        "name": "alamat_kk_sd",
        "label": "Alamat Sesuai Kartu Keluarga (KK)",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kelurahan_kk_sd",
        "name": "kelurahan_kk_sd",
        "label": "Nama Kelurahan/Desa (KK)",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kecamatan_kk_sd",
        "name": "kecamatan_kk_sd",
        "label": "Kecamatan (KK)",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kabupaten_kk_sd",
        "name": "kabupaten_kk_sd",
        "label": "Kabupaten / Kota (KK)",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-provinsi_kk_sd",
        "name": "provinsi_kk_sd",
        "label": "Provinsi (KK)",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kodepos_kk_sd",
        "name": "kodepos_kk_sd",
        "label": "Kode Pos (KK)",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-tinggi_badan_sd",
        "name": "tinggi_badan_sd",
        "label": "Tinggi Badan Peserta Didik",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "Contoh: 135 cm",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-berat_badan_sd",
        "name": "berat_badan_sd",
        "label": "Berat Badan Peserta Didik",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "Contoh: 43 kg",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-hobi_sd",
        "name": "hobi_sd",
        "label": "Hobi",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-cita_cita_sd",
        "name": "cita_cita_sd",
        "label": "Cita Cita",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-email_sd",
        "name": "email_sd",
        "label": "Email",
        "help": "",
        "type": "email",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kip_sd",
        "name": "kip_sd",
        "label": "Apakah ananda penerima Kartu Indonesia Pintar (KIP)?",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Ya",
            "text": "Ya"
          },
          {
            "value": "Tidak",
            "text": "Tidak"
          },
          {
            "value": "Dalam Proses",
            "text": "Dalam Proses"
          },
          {
            "value": "Yang Lain",
            "text": "Yang Lain"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-kps_pkh_sd",
        "name": "kps_pkh_sd",
        "label": "Apakah Ayah dan Bunda memiliki Kartu Perlindungan Sosial (KPS) atau Program Keluarga Harapan (PKH)?",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Ya",
            "text": "Ya"
          },
          {
            "value": "Tidak",
            "text": "Tidak"
          },
          {
            "value": "Dalam Proses",
            "text": "Dalam Proses"
          },
          {
            "value": "Yang Lain",
            "text": "Yang Lain"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-kebutuhan_khusus_sd",
        "name": "kebutuhan_khusus_sd",
        "label": "Apakah Ananda memiliki kebutuhan khusus? Data ini sesuai dengan isian Data Pokok Pendidikan (DAPODIK) yang berfungsi sebagai data pendukung pembelajaran ananda di sekolah. Kami harapkan Ayah/Bunda mengisi sesuai kebutuhan ananda berdasarkan hasil resmi dari dokter terkait",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Tidak",
            "text": "Tidak"
          },
          {
            "value": "Netra",
            "text": "Netra"
          },
          {
            "value": "Runggu",
            "text": "Runggu"
          },
          {
            "value": "Grahita ringan",
            "text": "Grahita ringan"
          },
          {
            "value": "Grahita sedang",
            "text": "Grahita sedang"
          },
          {
            "value": "Daksa ringan",
            "text": "Daksa ringan"
          },
          {
            "value": "Daksa sedang",
            "text": "Daksa sedang"
          },
          {
            "value": "Tuna laras",
            "text": "Tuna laras"
          },
          {
            "value": "Tuna wicara",
            "text": "Tuna wicara"
          },
          {
            "value": "Hyperaktif",
            "text": "Hyperaktif"
          },
          {
            "value": "Cerdas istimewa",
            "text": "Cerdas istimewa"
          },
          {
            "value": "Bakat istimewa",
            "text": "Bakat istimewa"
          },
          {
            "value": "Kesulitan belajar",
            "text": "Kesulitan belajar"
          },
          {
            "value": "Indigo",
            "text": "Indigo"
          },
          {
            "value": "Down syndrome",
            "text": "Down syndrome"
          },
          {
            "value": "Autis",
            "text": "Autis"
          },
          {
            "value": "Yang lain",
            "text": "Yang lain"
          }
        ],
        "width": 100
      }
    ]
  },
  {
    "label": "Kartu Indonesia Pintar (KIP)",
    "fields": [
      {
        "id": "form-field-nomor_kip_sd",
        "name": "nomor_kip_sd",
        "label": "No. Kartu Indonesia Pintar (KIP) diisi jika memiliki",
        "help": "",
        "type": "number",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      }
    ]
  },
  {
    "label": "Kartu Perlindungan Sosial (KPS) Atau Program Keluarga Harapan (PKH)",
    "fields": [
      {
        "id": "form-field-nomor_kpspkh_sd",
        "name": "nomor_kpspkh_sd",
        "label": "No. Kartu Perlindungan Sosial (KPS) atau Program Keluarga Harapan (PKH) diisi hanya jika memiliki KPS atau PKH",
        "help": "",
        "type": "number",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      }
    ]
  },
  {
    "label": "Biodata Ayah Kandung Peserta Didik",
    "fields": [
      {
        "id": "form-field-nama_ayah_sd",
        "name": "nama_ayah_sd",
        "label": "Nama Ayah Kandung",
        "help": "diisi sesuai dengan AKTA KELAHIRAN ANAK & KK",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-ktp_ayah_sd",
        "name": "ktp_ayah_sd",
        "label": "Nomor Induk Kependudukan Ayah",
        "help": "diisi sesuai dengan KTP",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-ttl_ayah_sd",
        "name": "ttl_ayah_sd",
        "label": "Tempat, Tanggal Lahir Ayah",
        "help": "diisi sesuai dengan KTP",
        "type": "text",
        "required": true,
        "placeholder": "Contoh: Denpasar, 17 Februari 1987",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-pendidikan_ayah_sd",
        "name": "pendidikan_ayah_sd",
        "label": "Pendidikan Terakhir Ayah",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-pekerjaan_ayah_sd",
        "name": "pekerjaan_ayah_sd",
        "label": "Pekerjaan Ayah",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-tempat_kerja_ayah_sd",
        "name": "tempat_kerja_ayah_sd",
        "label": "Instansi/Tempat Kerja Ayah",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-penghasilan_ayah_sd",
        "name": "penghasilan_ayah_sd",
        "label": "Penghasilan Bulanan Ayah",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "&lt;Rp. 500.000",
            "text": "&lt;Rp. 500.000"
          },
          {
            "value": "Rp. 500.000 - Rp. 999.999",
            "text": "Rp. 500.000 - Rp. 999.999"
          },
          {
            "value": "Rp. 1.000.000 - Rp. 1.999.999",
            "text": "Rp. 1.000.000 - Rp. 1.999.999"
          },
          {
            "value": "Rp. 2.000.000 - Rp. 4.999.999",
            "text": "Rp. 2.000.000 - Rp. 4.999.999"
          },
          {
            "value": "Rp. 5.000.000 - Rp. 20.000.000",
            "text": "Rp. 5.000.000 - Rp. 20.000.000"
          },
          {
            "value": "&gt;Rp. 20.000.000",
            "text": "&gt;Rp. 20.000.000"
          },
          {
            "value": "Tidak Berpenghasilan",
            "text": "Tidak Berpenghasilan"
          },
          {
            "value": "Yang Lain",
            "text": "Yang Lain"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-handphone_ayah_sd",
        "name": "handphone_ayah_sd",
        "label": "Nomor Handphone Ayah",
        "help": "",
        "type": "tel",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-hubungan_ayah_sd",
        "name": "hubungan_ayah_sd",
        "label": "Hubungan dengan Siswa",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Orangtua Kandung",
            "text": "Orangtua Kandung"
          },
          {
            "value": "Orangtua Tiri",
            "text": "Orangtua Tiri"
          },
          {
            "value": "Orangtua Angkat",
            "text": "Orangtua Angkat"
          },
          {
            "value": "Orangtua Asuh",
            "text": "Orangtua Asuh"
          }
        ],
        "width": 100
      }
    ]
  },
  {
    "label": "Biodata Ibu Kandung Peserta Didik",
    "fields": [
      {
        "id": "form-field-nama_ibu_sd",
        "name": "nama_ibu_sd",
        "label": "Nama Ibu Kandung",
        "help": "diisi sesuai dengan AKTA KELAHIRAN ANAK & KK",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nik_ibu_sd",
        "name": "nik_ibu_sd",
        "label": "Nomor Induk Kependudukan Ibu",
        "help": "diisi sesuai dengan KTP",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-ttl_ibu_sd",
        "name": "ttl_ibu_sd",
        "label": "Tempat, Tanggal Lahir Ibu",
        "help": "diisi sesuai dengan KTP",
        "type": "text",
        "required": true,
        "placeholder": "Contoh: Denpasar, 17 Februari 1987",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-pendidikan_ibu_sd",
        "name": "pendidikan_ibu_sd",
        "label": "Pendidikan Terakhir Ibu",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-pekerjaan_ibu_sd",
        "name": "pekerjaan_ibu_sd",
        "label": "Pekerjaan Ibu",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-tempat_kerja_ibu_sd",
        "name": "tempat_kerja_ibu_sd",
        "label": "Instansi/Tempat Kerja Ibu",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-penghasilan_ibu_sd",
        "name": "penghasilan_ibu_sd",
        "label": "Penghasilan Bulanan Ibu",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "&lt;Rp. 500.000",
            "text": "&lt;Rp. 500.000"
          },
          {
            "value": "Rp. 500.000 - Rp. 999.999",
            "text": "Rp. 500.000 - Rp. 999.999"
          },
          {
            "value": "Rp. 1.000.000 - Rp. 1.999.999",
            "text": "Rp. 1.000.000 - Rp. 1.999.999"
          },
          {
            "value": "Rp. 2.000.000 - Rp. 4.999.999",
            "text": "Rp. 2.000.000 - Rp. 4.999.999"
          },
          {
            "value": "Rp. 5.000.000 - Rp. 20.000.000",
            "text": "Rp. 5.000.000 - Rp. 20.000.000"
          },
          {
            "value": "&gt;Rp. 20.000.000",
            "text": "&gt;Rp. 20.000.000"
          },
          {
            "value": "Tidak Berpenghasilan",
            "text": "Tidak Berpenghasilan"
          },
          {
            "value": "Yang Lain",
            "text": "Yang Lain"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-handphone_ibu_sd",
        "name": "handphone_ibu_sd",
        "label": "Nomor Handphone Ibu",
        "help": "",
        "type": "tel",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-hubungan_ibu_sd",
        "name": "hubungan_ibu_sd",
        "label": "Hubungan dengan Siswa",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Orangtua Kandung",
            "text": "Orangtua Kandung"
          },
          {
            "value": "Orangtua Tiri",
            "text": "Orangtua Tiri"
          },
          {
            "value": "Orangtua Angkat",
            "text": "Orangtua Angkat"
          },
          {
            "value": "Orangtua Asuh",
            "text": "Orangtua Asuh"
          }
        ],
        "width": 100
      }
    ]
  },
  {
    "label": "Biodata Wali Asuh Peserta Didik",
    "fields": [
      {
        "id": "form-field-wali_sd",
        "name": "wali_sd",
        "label": "Apakah ada wali asuh selain orangtua kandung siswa?",
        "help": "",
        "type": "select",
        "required": false,
        "placeholder": "",
        "options": [
          {
            "value": "Ya",
            "text": "Ya"
          },
          {
            "value": "Tidak",
            "text": "Tidak"
          }
        ],
        "width": 100
      }
    ]
  },
  {
    "label": "Isian Biodata Wali Asuh",
    "fields": [
      {
        "id": "form-field-nama_wali_asuh_sd",
        "name": "nama_wali_asuh_sd",
        "label": "Nama Wali Asuh",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nik_wali_sd",
        "name": "nik_wali_sd",
        "label": "Nomor Induk Kependudukan Wali Asuh Nomor Induk Kependudukan Wali Asuh",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-ttl_wali_sd",
        "name": "ttl_wali_sd",
        "label": "Tempat, Tanggal Lahir Wali Asuh",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-pendidikan_wali_sd",
        "name": "pendidikan_wali_sd",
        "label": "Pendidikan Terakhir Wali Asuh",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-pekerjaan_wali_sd",
        "name": "pekerjaan_wali_sd",
        "label": "Pekerjaan Wali Asuh",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-tempat_kerja_wali_sd",
        "name": "tempat_kerja_wali_sd",
        "label": "Instansi/Tempat Kerja Wali Asuh",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-penghasilan_wali_sd",
        "name": "penghasilan_wali_sd",
        "label": "Penghasilan Bulanan Wali Asuh",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-handphone_wali_sd",
        "name": "handphone_wali_sd",
        "label": "Nomor Handphone Wali Asuh",
        "help": "",
        "type": "tel",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-hubungan_wali_sd",
        "name": "hubungan_wali_sd",
        "label": "Hubungan Wali Asuh dengan Siswa",
        "help": "",
        "type": "tel",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-informasi_tidakada_wali",
        "name": "informasi_tidakada_wali",
        "label": "Informasi Tidak ada Wali",
        "help": "",
        "type": "html1",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      }
    ]
  },
  {
    "label": "Berkas Yang Diperlukan",
    "fields": [
      {
        "id": "form-field-field_7c76167",
        "name": "form-field-field_7c76167",
        "label": "Informasi",
        "help": "",
        "type": "html1",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-file_akta_sd",
        "name": "file_akta_sd",
        "label": "Akta Kelahiran Peserta Didik (Max File 5Mb)",
        "help": "",
        "type": "upload",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-file_kk_sd",
        "name": "file_kk_sd",
        "label": "Kartu Keluarga (Max File 5Mb)",
        "help": "",
        "type": "upload",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-file_mutasi_sd",
        "name": "file_mutasi_sd",
        "label": "Berkas Surat Mutasi (Max File 5Mb)",
        "help": "",
        "type": "upload",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-file_ktp_ayah_ibu_sd",
        "name": "file_ktp_ayah_ibu_sd",
        "label": "KTP Ayah & Bunda (Max File 5Mb) Bagan ini dapat meng-uploud lebih dari 1 file",
        "help": "",
        "type": "upload",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      }
    ]
  }
],
    conditionalRules: {
  "pindah_condition": {
    "field": "jenis_pendaftaran",
    "value": "Siswa Pindah",
    "targets": [
      "kelas_sd",
      "tanggal_masuk_sd",
      "file_mutasi_sd"
    ]
  },
  "wali_condition": {
    "field": "wali_sd",
    "value": "Ya",
    "targets": [
      "nama_wali_asuh_sd",
      "nik_wali_sd",
      "ttl_wali_sd",
      "pendidikan_wali_sd",
      "pekerjaan_wali_sd",
      "tempat_kerja_wali_sd",
      "penghasilan_wali_sd",
      "handphone_wali_sd",
      "hubungan_wali_sd"
    ]
  }
}
  },
  smp: {
    id: 'smp',
    name: 'SMP',
    slug: 'spmb-smp',
    fullName: 'SMP Albanna',
    level: 'Sekolah Menengah Pertama',
    color: 'from-blue-600 to-indigo-600',
    accentColor: '#2563eb',
    badge: 'SMP',
    tagline: 'Berprestasi, Mandiri, dan Berwawasan Global',
    steps: [
  {
    "label": "Biodata Siswa",
    "fields": [
      {
        "id": "form-field-nama_lengkap_smp",
        "name": "nama_lengkap_smp",
        "label": "Nama Lengkap Siswa",
        "help": "diisi sesuai dengan Akta Kelahiran & Kartu Keluarga siswa",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-jenis_kelamin_smp",
        "name": "jenis_kelamin_smp",
        "label": "Jenis Kelamin",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Laki Laki",
            "text": "Laki Laki"
          },
          {
            "value": "Perempuan",
            "text": "Perempuan"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-nama_panggilan_smp",
        "name": "nama_panggilan_smp",
        "label": "Nama Panggilan Siswa",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-tanggal_lahir_smp",
        "name": "tanggal_lahir_smp",
        "label": "Tanggal Lahir",
        "help": "",
        "type": "date",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nisn_smp",
        "name": "nisn_smp",
        "label": "Nomor Induk Siswa Nasional (NISN) NISN dapat dicari pada web https://nisn.data.kemendikdasmen.go.id/ atau menghubungi operator sekolah.",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nik_smp",
        "name": "nik_smp",
        "label": "Nomor Induk Kependudukan (NIK) Siswa",
        "help": "diisi sesuai dengan NIK siswa yang tertera pada Kartu Keluarga",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-alamat_tempat_tinggal_smp",
        "name": "alamat_tempat_tinggal_smp",
        "label": "Alamat domisili di Bali",
        "help": "",
        "type": "text",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kelurahan_smp",
        "name": "kelurahan_smp",
        "label": "Nama Kelurahan/Desa Tempat tinggal saat ini yang berdomisili di Bali",
        "help": "",
        "type": "text",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kecamatan_smp",
        "name": "kecamatan_smp",
        "label": "Kecamatan Tempat tinggal saat ini yang berdomisili di Bali",
        "help": "",
        "type": "text",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kabupaten_smp",
        "name": "kabupaten_smp",
        "label": "Kabupaten/Kota Tempat tinggal saat ini yang berdomisili di Bali",
        "help": "",
        "type": "text",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kode_pos_smp",
        "name": "kode_pos_smp",
        "label": "Kode Pos Tempat tinggal saat ini yang berdomisili di Bali",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-no_handphone_smp",
        "name": "no_handphone_smp",
        "label": "No. Handphone",
        "help": "",
        "type": "tel",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-email_smp",
        "name": "email_smp",
        "label": "Email",
        "help": "",
        "type": "email",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-sekolah_asal_smp",
        "name": "sekolah_asal_smp",
        "label": "Nama Sekolah Asal (SD/MI)",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-alamat_sekolah_asal_smp",
        "name": "alamat_sekolah_asal_smp",
        "label": "Alamat Sekolah Asal (SD/MI)",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "Contoh: Jl. Tukad Yeh Ho III/16, Kec. Denpasar Timur, Kota Denpasar, Provinsi Bali",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nomor_akta_kelahiran_smp",
        "name": "nomor_akta_kelahiran_smp",
        "label": "Nomor Registrasi Akta Lahir Siswa",
        "help": "diisi sesuai dengan Akta Kelahiran",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kk_smp",
        "name": "kk_smp",
        "label": "Nomor Kartu Keluarga (KK)",
        "help": "diisi sesuai dengan nomor yang tertera pada KK",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nomor_telepon_sekolah_asal_smp",
        "name": "nomor_telepon_sekolah_asal_smp",
        "label": "Nomor Telepon Sekolah Asal Nomor Sekolah atau Operator",
        "help": "",
        "type": "tel",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-file_akta_smp",
        "name": "file_akta_smp",
        "label": "Akta Kelahiran Peserta Didik (Max File 5Mb)",
        "help": "",
        "type": "upload",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-file_kk_smp",
        "name": "file_kk_smp",
        "label": "Kartu Keluarga (Max File 5Mb)",
        "help": "",
        "type": "upload",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-file_ijasah_smp",
        "name": "file_ijasah_smp",
        "label": "Dokumen Ijasah SD/MI (Max File 5Mb)",
        "help": "",
        "type": "upload",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      }
    ]
  },
  {
    "label": "Biodata Ayah Kandung Peserta Didik",
    "fields": [
      {
        "id": "form-field-nama_ayah_smp",
        "name": "nama_ayah_smp",
        "label": "Nama Ayah Kandung",
        "help": "diisi sesuai dengan AKTA KELAHIRAN ANAK & KK",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-handphone_ayah_smp",
        "name": "handphone_ayah_smp",
        "label": "Nomor Handphone Ayah",
        "help": "",
        "type": "tel",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-ktp_ayah_smp",
        "name": "ktp_ayah_smp",
        "label": "Nomor Induk Kependudukan Ayah",
        "help": "diisi sesuai dengan KTP",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-tahun_lahir_ayah_smp",
        "name": "tahun_lahir_ayah_smp",
        "label": "Tahun Lahir Ayah",
        "help": "diisi sesuai dengan KTP",
        "type": "text",
        "required": true,
        "placeholder": "Contoh: Denpasar, 17 Februari 1987",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-pendidikan_ayah_smp",
        "name": "pendidikan_ayah_smp",
        "label": "Pendidikan Terakhir Ayah",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-pekerjaan_ayah_smp",
        "name": "pekerjaan_ayah_smp",
        "label": "Pekerjaan Ayah",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-penghasilan_ayah_smp",
        "name": "penghasilan_ayah_smp",
        "label": "Penghasilan Bulanan Ayah",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "&gt;Rp. 20.000.000",
            "text": "&gt;Rp. 20.000.000"
          },
          {
            "value": "Rp. 5.000.000 - Rp. 20. 000.000",
            "text": "Rp. 5.000.000 - Rp. 20. 000.000"
          },
          {
            "value": "Rp. 2.000.000 - Rp. 4.999.999",
            "text": "Rp. 2.000.000 - Rp. 4.999.999"
          },
          {
            "value": "Rp. 500.000 - Rp. 999.999",
            "text": "Rp. 500.000 - Rp. 999.999"
          },
          {
            "value": "&lt;Rp. 500.000",
            "text": "&lt;Rp. 500.000"
          },
          {
            "value": "Tidak Berpenghasilan",
            "text": "Tidak Berpenghasilan"
          }
        ],
        "width": 100
      }
    ]
  },
  {
    "label": "Biodata Ibu Kandung Peserta Didik",
    "fields": [
      {
        "id": "form-field-nama_ibu_smp",
        "name": "nama_ibu_smp",
        "label": "Nama Ibu Kandung",
        "help": "diisi sesuai dengan AKTA KELAHIRAN ANAK & KK",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-handphone_ibu_smp",
        "name": "handphone_ibu_smp",
        "label": "Nomor Handphone Ibu",
        "help": "",
        "type": "tel",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nik_ibu_smp",
        "name": "nik_ibu_smp",
        "label": "Nomor Induk Kependudukan Ibu",
        "help": "diisi sesuai dengan KTP",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-tahun_lahir_ibu_smp",
        "name": "tahun_lahir_ibu_smp",
        "label": "Tahun Lahir Ibu",
        "help": "diisi sesuai dengan KTP",
        "type": "text",
        "required": true,
        "placeholder": "Contoh: Denpasar, 17 Februari 1987",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-pendidikan_ibu_smp",
        "name": "pendidikan_ibu_smp",
        "label": "Pendidikan Terakhir Ibu",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-pekerjaan_ibu_smp",
        "name": "pekerjaan_ibu_smp",
        "label": "Pekerjaan Ibu",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-penghasilan_ibu_smp",
        "name": "penghasilan_ibu_smp",
        "label": "Penghasilan Bulanan Ibu",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "&gt;Rp. 20.000.000",
            "text": "&gt;Rp. 20.000.000"
          },
          {
            "value": "Rp. 5.000.000 - Rp. 20. 000.000",
            "text": "Rp. 5.000.000 - Rp. 20. 000.000"
          },
          {
            "value": "Rp. 2.000.000 - Rp. 4.999.999",
            "text": "Rp. 2.000.000 - Rp. 4.999.999"
          },
          {
            "value": "Rp. 500.000 - Rp. 999.999",
            "text": "Rp. 500.000 - Rp. 999.999"
          },
          {
            "value": "&lt;Rp. 500.000",
            "text": "&lt;Rp. 500.000"
          },
          {
            "value": "Tidak Berpenghasilan",
            "text": "Tidak Berpenghasilan"
          }
        ],
        "width": 100
      }
    ]
  },
  {
    "label": "Biodata Wali Asuh",
    "fields": [
      {
        "id": "form-field-wali_smp",
        "name": "wali_smp",
        "label": "Apakah ada wali asuh selain orangtua kandung siswa?",
        "help": "",
        "type": "select",
        "required": false,
        "placeholder": "",
        "options": [
          {
            "value": "Ya",
            "text": "Ya"
          },
          {
            "value": "Tidak",
            "text": "Tidak"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-nama_wali_smp",
        "name": "nama_wali_smp",
        "label": "Nama Wali Asuh",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nik_wali_smp",
        "name": "nik_wali_smp",
        "label": "Nomor Induk Kependudukan Wali Asuh Nomor Induk Kependudukan Wali Asuh",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-handphone_wali_smp",
        "name": "handphone_wali_smp",
        "label": "Nomor Handphone Wali Asuh",
        "help": "",
        "type": "tel",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-tahun_lahir_wali_smp",
        "name": "tahun_lahir_wali_smp",
        "label": "Tahun Lahir Wali Asuh",
        "help": "",
        "type": "date",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-pendidikan_wali_smp",
        "name": "pendidikan_wali_smp",
        "label": "Pendidikan Terakhir Wali Asuh",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-pekerjaa_wali_smp",
        "name": "pekerjaa_wali_smp",
        "label": "Pekerjaan Wali Asuh",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-penghasilan_wali_smp",
        "name": "penghasilan_wali_smp",
        "label": "Penghasilan Bulanan Wali Asuh",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "&gt;Rp. 20.000.000",
            "text": "&gt;Rp. 20.000.000"
          },
          {
            "value": "Rp. 5.000.000 - Rp. 20. 000.000",
            "text": "Rp. 5.000.000 - Rp. 20. 000.000"
          },
          {
            "value": "Rp. 2.000.000 - Rp. 4.999.999",
            "text": "Rp. 2.000.000 - Rp. 4.999.999"
          },
          {
            "value": "Rp. 500.000 - Rp. 999.999",
            "text": "Rp. 500.000 - Rp. 999.999"
          },
          {
            "value": "&lt;Rp. 500.000",
            "text": "&lt;Rp. 500.000"
          },
          {
            "value": "Tidak Berpenghasilan",
            "text": "Tidak Berpenghasilan"
          }
        ],
        "width": 100
      }
    ]
  },
  {
    "label": "Data Periodik Siswa",
    "fields": [
      {
        "id": "form-field-mode_tinggal_smp",
        "name": "mode_tinggal_smp",
        "label": "Mode Tinggal",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Bersama Orang Tua",
            "text": "Bersama Orang Tua"
          },
          {
            "value": "Bersama Wali",
            "text": "Bersama Wali"
          },
          {
            "value": "Kos",
            "text": "Kos"
          },
          {
            "value": "Yang Lain",
            "text": "Yang Lain"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-mode_transportasi_smp",
        "name": "mode_transportasi_smp",
        "label": "Mode Transportasi ke Sekolah",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Jalan Kaki",
            "text": "Jalan Kaki"
          },
          {
            "value": "Sepeda",
            "text": "Sepeda"
          },
          {
            "value": "Sepeda Motor",
            "text": "Sepeda Motor"
          },
          {
            "value": "Mobil Pribadi",
            "text": "Mobil Pribadi"
          },
          {
            "value": "Kendaraan Umum",
            "text": "Kendaraan Umum"
          },
          {
            "value": "Ojek",
            "text": "Ojek"
          },
          {
            "value": "Yang Lain",
            "text": "Yang Lain"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-anak_ke_smp",
        "name": "anak_ke_smp",
        "label": "Anak ke berapa",
        "help": "",
        "type": "number",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-jumlah_saudara_smp",
        "name": "jumlah_saudara_smp",
        "label": "Jumlah Saudara Kandung dipilih jumlah saudara kandung, dan lainnya jika ada saudara tiri",
        "help": "",
        "type": "number",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-hobi_smp",
        "name": "hobi_smp",
        "label": "Hobi",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-cita_cita_smp",
        "name": "cita_cita_smp",
        "label": "Cita Cita",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-tinggi_badan_smp",
        "name": "tinggi_badan_smp",
        "label": "Tinggi Badan Peserta Didik",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "Contoh: 135 cm",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-berat_badan_smp",
        "name": "berat_badan_smp",
        "label": "Berat Badan Peserta Didik",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "Contoh: 43 kg",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-lingkar_kepala_smp",
        "name": "lingkar_kepala_smp",
        "label": "Lingkar Kepala (cm)",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "Contoh: 43 cm",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-jarat_tinggal_smp",
        "name": "jarat_tinggal_smp",
        "label": "Jarak Tempat Tinggal ke Sekolah",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Kurang dari 1 km",
            "text": "Kurang dari 1 km"
          },
          {
            "value": "1 km",
            "text": "1 km"
          },
          {
            "value": "2 km",
            "text": "2 km"
          },
          {
            "value": "3 km",
            "text": "3 km"
          },
          {
            "value": "4 km",
            "text": "4 km"
          },
          {
            "value": "5 km",
            "text": "5 km"
          },
          {
            "value": "Yang Lain",
            "text": "Yang Lain"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-waktu_tempuh_smp",
        "name": "waktu_tempuh_smp",
        "label": "Waktu tempuh dari rumah ke sekolah (menit)",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "5 Menit",
            "text": "5 Menit"
          },
          {
            "value": "10 Menit",
            "text": "10 Menit"
          },
          {
            "value": "15 Menit",
            "text": "15 Menit"
          },
          {
            "value": "20 Menit",
            "text": "20 Menit"
          },
          {
            "value": "25 Menit",
            "text": "25 Menit"
          },
          {
            "value": "30 Menit",
            "text": "30 Menit"
          },
          {
            "value": "Yang Lain",
            "text": "Yang Lain"
          }
        ],
        "width": 100
      }
    ]
  },
  {
    "label": "Program Dari Pemerintah",
    "fields": [
      {
        "id": "form-field-kps_pkh_smp",
        "name": "kps_pkh_smp",
        "label": "Apakah Ayah dan Bunda memiliki Kartu Perlindungan Sosial (KPS) atau Program Keluarga Harapan (PKH)?",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Ya",
            "text": "Ya"
          },
          {
            "value": "Tidak",
            "text": "Tidak"
          },
          {
            "value": "Dalam Proses",
            "text": "Dalam Proses"
          },
          {
            "value": "Yang Lain",
            "text": "Yang Lain"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-nomor_kpspkh_smp",
        "name": "nomor_kpspkh_smp",
        "label": "No. Kartu Perlindungan Sosial (KPS) atau Program Keluarga Harapan (PKH) diisi hanya jika memiliki KPS atau PKH",
        "help": "",
        "type": "text",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kip_smp",
        "name": "kip_smp",
        "label": "Apakah ananda penerima Kartu Indonesia Pintar (KIP)?",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Ya",
            "text": "Ya"
          },
          {
            "value": "Tidak",
            "text": "Tidak"
          },
          {
            "value": "Dalam Proses",
            "text": "Dalam Proses"
          },
          {
            "value": "Yang Lain",
            "text": "Yang Lain"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-nomor_kip_smp",
        "name": "nomor_kip_smp",
        "label": "No. Kartu Indonesia Pintar (KIP) diisi jika memiliki",
        "help": "",
        "type": "text",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      }
    ]
  }
],
    conditionalRules: {
  "wali_condition": {
    "field": "wali_smp",
    "value": "Ya",
    "targets": [
      "nama_wali_smp",
      "nik_wali_smp",
      "handphone_wali_smp",
      "tahun_lahir_wali_smp",
      "pendidikan_wali_smp",
      "pekerjaa_wali_smp",
      "penghasilan_wali_smp"
    ]
  }
}
  },
  sma: {
    id: 'sma',
    name: 'SMA',
    slug: 'spmb-sma',
    fullName: 'SMA Albanna',
    level: 'Sekolah Menengah Atas',
    color: 'from-purple-600 to-pink-600',
    accentColor: '#7c3aed',
    badge: 'SMA',
    tagline: 'Pemimpin Masa Depan Berkarakter Islami & Berdaya Saing',
    steps: [
  {
    "label": "Biodata Siswa",
    "fields": [
      {
        "id": "form-field-nama_lengkap_sma",
        "name": "nama_lengkap_sma",
        "label": "Nama Lengkap Siswa",
        "help": "diisi sesuai dengan Akta Kelahiran & Kartu Keluarga siswa",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-jenis_kelamin_sma",
        "name": "jenis_kelamin_sma",
        "label": "Jenis Kelamin",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Laki Laki",
            "text": "Laki Laki"
          },
          {
            "value": "Perempuan",
            "text": "Perempuan"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-nama_panggilan_sma",
        "name": "nama_panggilan_sma",
        "label": "Nama Panggilan Siswa",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-tempat_lahir_sma",
        "name": "tempat_lahir_sma",
        "label": "Tempat Lahir",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-tanggal_lahir_sma",
        "name": "tanggal_lahir_sma",
        "label": "Tanggal Lahir",
        "help": "",
        "type": "date",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nisn_sma",
        "name": "nisn_sma",
        "label": "Nomor Induk Siswa Nasional (NISN) NISN dapat dicari pada web https://nisn.data.kemendikdasmen.go.id/ atau menghubungi operator sekolah.",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nik_sma",
        "name": "nik_sma",
        "label": "Nomor Induk Kependudukan (NIK) Siswa",
        "help": "diisi sesuai dengan NIK siswa yang tertera pada Kartu Keluarga",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-alamat_tempat_tinggal_sma",
        "name": "alamat_tempat_tinggal_sma",
        "label": "Alamat domisili di Bali",
        "help": "",
        "type": "text",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kelurahan_sma",
        "name": "kelurahan_sma",
        "label": "Nama Kelurahan/Desa Tempat tinggal saat ini yang berdomisili di Bali",
        "help": "",
        "type": "text",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kecamatan_sma",
        "name": "kecamatan_sma",
        "label": "Kecamatan Tempat tinggal saat ini yang berdomisili di Bali",
        "help": "",
        "type": "text",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kabupaten_sma",
        "name": "kabupaten_sma",
        "label": "Kabupaten/Kota Tempat tinggal saat ini yang berdomisili di Bali",
        "help": "",
        "type": "text",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kode_pos_sma",
        "name": "kode_pos_sma",
        "label": "Kode Pos Tempat tinggal saat ini yang berdomisili di Bali",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-alamat_kk_sma",
        "name": "alamat_kk_sma",
        "label": "Alamat yang tercantum di Kartu Keluarga (KK)",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kelurahan_kk_sma",
        "name": "kelurahan_kk_sma",
        "label": "Nama Kelurahan/Desa (sesuai KK)",
        "help": "",
        "type": "text",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kecamatan_kk_sma",
        "name": "kecamatan_kk_sma",
        "label": "Kecamatan (sesuai KK)",
        "help": "",
        "type": "text",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kabupaten_kk_sma",
        "name": "kabupaten_kk_sma",
        "label": "Kabupaten / Kota (sesuai KK)",
        "help": "",
        "type": "text",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kode_pos_kk_sma",
        "name": "kode_pos_kk_sma",
        "label": "Kode Pos (sesuai KK)",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-no_handphone_sma",
        "name": "no_handphone_sma",
        "label": "No. Handphone",
        "help": "",
        "type": "tel",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-email_sma",
        "name": "email_sma",
        "label": "Email",
        "help": "",
        "type": "email",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-sekolah_asal_sma",
        "name": "sekolah_asal_sma",
        "label": "Nama Sekolah Asal (SMP/MTs)",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-alamat_sekolah_asal_sma",
        "name": "alamat_sekolah_asal_sma",
        "label": "Alamat Sekolah Asal (SMP/MTs)",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "Contoh: Jl. Tukad Yeh Ho III/16, Kec. Denpasar Timur, Kota Denpasar, Provinsi Bali",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nomor_akta_kelahiran_sma",
        "name": "nomor_akta_kelahiran_sma",
        "label": "Nomor Registrasi Akta Lahir Siswa",
        "help": "diisi sesuai dengan Akta Kelahiran",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nomor_kk_sma",
        "name": "nomor_kk_sma",
        "label": "Nomor Kartu Keluarga (KK)",
        "help": "diisi sesuai dengan nomor yang tertera pada KK",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-file_akta_sma",
        "name": "file_akta_sma",
        "label": "Akta Kelahiran Peserta Didik (Max File 5Mb)",
        "help": "",
        "type": "upload",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-file_kk_sma",
        "name": "file_kk_sma",
        "label": "Kartu Keluarga (Max File 5Mb)",
        "help": "",
        "type": "upload",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      }
    ]
  },
  {
    "label": "Biodata Ayah Kandung Peserta Didik",
    "fields": [
      {
        "id": "form-field-nama_ayah_sma",
        "name": "nama_ayah_sma",
        "label": "Nama Ayah Kandung",
        "help": "diisi sesuai dengan AKTA KELAHIRAN ANAK & KK",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-handphone_ayah_sma",
        "name": "handphone_ayah_sma",
        "label": "Nomor Handphone Ayah",
        "help": "",
        "type": "tel",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nik_ayah_sma",
        "name": "nik_ayah_sma",
        "label": "Nomor Induk Kependudukan Ayah",
        "help": "diisi sesuai dengan KTP",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-tahun_lahir_ayah_sma",
        "name": "tahun_lahir_ayah_sma",
        "label": "Tahun Lahir Ayah",
        "help": "diisi sesuai dengan KTP",
        "type": "text",
        "required": true,
        "placeholder": "Contoh: Denpasar, 17 Februari 1987",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-pendidikan_ayah_sma",
        "name": "pendidikan_ayah_sma",
        "label": "Pendidikan Terakhir Ayah",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-pekerjaan_ayah_sma",
        "name": "pekerjaan_ayah_sma",
        "label": "Pekerjaan Ayah",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-penghasilan_ayah_sma",
        "name": "penghasilan_ayah_sma",
        "label": "Penghasilan Bulanan Ayah",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "&gt;Rp. 20.000.000",
            "text": "&gt;Rp. 20.000.000"
          },
          {
            "value": "Rp. 5.000.000 - Rp. 20. 000.000",
            "text": "Rp. 5.000.000 - Rp. 20. 000.000"
          },
          {
            "value": "Rp. 2.000.000 - Rp. 4.999.999",
            "text": "Rp. 2.000.000 - Rp. 4.999.999"
          },
          {
            "value": "Rp. 500.000 - Rp. 999.999",
            "text": "Rp. 500.000 - Rp. 999.999"
          },
          {
            "value": "&lt;Rp. 500.000",
            "text": "&lt;Rp. 500.000"
          },
          {
            "value": "Tidak Berpenghasilan",
            "text": "Tidak Berpenghasilan"
          }
        ],
        "width": 100
      }
    ]
  },
  {
    "label": "Biodata Ibu Kandung Peserta Didik",
    "fields": [
      {
        "id": "form-field-nama_ibu_sma",
        "name": "nama_ibu_sma",
        "label": "Nama Ibu Kandung",
        "help": "diisi sesuai dengan AKTA KELAHIRAN ANAK & KK",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-handphone_ibu_sma",
        "name": "handphone_ibu_sma",
        "label": "Nomor Handphone Ibu",
        "help": "",
        "type": "tel",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nik_ibu_sma",
        "name": "nik_ibu_sma",
        "label": "Nomor Induk Kependudukan Ibu",
        "help": "diisi sesuai dengan KTP",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-tahun_lahir_ibu_sma",
        "name": "tahun_lahir_ibu_sma",
        "label": "Tahun Lahir Ibu",
        "help": "diisi sesuai dengan KTP",
        "type": "text",
        "required": true,
        "placeholder": "Contoh: Denpasar, 17 Februari 1987",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-pendidikan_ibu_sma",
        "name": "pendidikan_ibu_sma",
        "label": "Pendidikan Terakhir Ibu",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-pekerjaan_ibu_sma",
        "name": "pekerjaan_ibu_sma",
        "label": "Pekerjaan Ibu",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-penghasilan_ibu_sma",
        "name": "penghasilan_ibu_sma",
        "label": "Penghasilan Bulanan Ibu",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "&gt;Rp. 20.000.000",
            "text": "&gt;Rp. 20.000.000"
          },
          {
            "value": "Rp. 5.000.000 - Rp. 20. 000.000",
            "text": "Rp. 5.000.000 - Rp. 20. 000.000"
          },
          {
            "value": "Rp. 2.000.000 - Rp. 4.999.999",
            "text": "Rp. 2.000.000 - Rp. 4.999.999"
          },
          {
            "value": "Rp. 500.000 - Rp. 999.999",
            "text": "Rp. 500.000 - Rp. 999.999"
          },
          {
            "value": "&lt;Rp. 500.000",
            "text": "&lt;Rp. 500.000"
          },
          {
            "value": "Tidak Berpenghasilan",
            "text": "Tidak Berpenghasilan"
          }
        ],
        "width": 100
      }
    ]
  },
  {
    "label": "Biodata Wali Asuh",
    "fields": [
      {
        "id": "form-field-wali_sma",
        "name": "wali_sma",
        "label": "Apakah ada wali asuh selain orangtua kandung siswa?",
        "help": "",
        "type": "select",
        "required": false,
        "placeholder": "",
        "options": [
          {
            "value": "Ya",
            "text": "Ya"
          },
          {
            "value": "Tidak",
            "text": "Tidak"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-hubungan_wali_sma",
        "name": "hubungan_wali_sma",
        "label": "Status Hubungan Wali dengan siswa?",
        "help": "",
        "type": "select",
        "required": false,
        "placeholder": "",
        "options": [
          {
            "value": "Ayah Sambung",
            "text": "Ayah Sambung"
          },
          {
            "value": "Ibu Sambung",
            "text": "Ibu Sambung"
          },
          {
            "value": "Yang Lain",
            "text": "Yang Lain"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-nama_wali_sma",
        "name": "nama_wali_sma",
        "label": "Nama Wali Asuh",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-handphone_wali_sma",
        "name": "handphone_wali_sma",
        "label": "Nomor Handphone Wali Asuh",
        "help": "",
        "type": "tel",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-nik_wali_sma",
        "name": "nik_wali_sma",
        "label": "Nomor Induk Kependudukan Wali Asuh Nomor Induk Kependudukan Wali Asuh",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-tahun_lahir_wali_sma",
        "name": "tahun_lahir_wali_sma",
        "label": "Tahun Lahir Wali Asuh",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-pendidikan_wali_sma",
        "name": "pendidikan_wali_sma",
        "label": "Pendidikan Terakhir Wali Asuh",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-pekerjaan_wali_sma",
        "name": "pekerjaan_wali_sma",
        "label": "Pekerjaan Wali Asuh",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-penghasilan_wali_sma",
        "name": "penghasilan_wali_sma",
        "label": "Penghasilan Bulanan Wali Asuh",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "&gt;Rp. 20.000.000",
            "text": "&gt;Rp. 20.000.000"
          },
          {
            "value": "Rp. 5.000.000 - Rp. 20. 000.000",
            "text": "Rp. 5.000.000 - Rp. 20. 000.000"
          },
          {
            "value": "Rp. 2.000.000 - Rp. 4.999.999",
            "text": "Rp. 2.000.000 - Rp. 4.999.999"
          },
          {
            "value": "Rp. 500.000 - Rp. 999.999",
            "text": "Rp. 500.000 - Rp. 999.999"
          },
          {
            "value": "&lt;Rp. 500.000",
            "text": "&lt;Rp. 500.000"
          },
          {
            "value": "Tidak Berpenghasilan",
            "text": "Tidak Berpenghasilan"
          }
        ],
        "width": 100
      }
    ]
  },
  {
    "label": "Data Periodik Siswa",
    "fields": [
      {
        "id": "form-field-mode_tinggal_sma",
        "name": "mode_tinggal_sma",
        "label": "Mode Tinggal",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Bersama Orang Tua",
            "text": "Bersama Orang Tua"
          },
          {
            "value": "Bersama Wali",
            "text": "Bersama Wali"
          },
          {
            "value": "Kos",
            "text": "Kos"
          },
          {
            "value": "Yang Lain",
            "text": "Yang Lain"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-mode_transportasi_sma",
        "name": "mode_transportasi_sma",
        "label": "Mode Transportasi ke Sekolah",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Jalan Kaki",
            "text": "Jalan Kaki"
          },
          {
            "value": "Sepeda",
            "text": "Sepeda"
          },
          {
            "value": "Sepeda Motor",
            "text": "Sepeda Motor"
          },
          {
            "value": "Mobil Pribadi",
            "text": "Mobil Pribadi"
          },
          {
            "value": "Kendaraan Umum",
            "text": "Kendaraan Umum"
          },
          {
            "value": "Ojek",
            "text": "Ojek"
          },
          {
            "value": "Yang Lain",
            "text": "Yang Lain"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-anak_ke_sma",
        "name": "anak_ke_sma",
        "label": "Anak ke berapa",
        "help": "",
        "type": "number",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-jumlah_saudara_sma",
        "name": "jumlah_saudara_sma",
        "label": "Jumlah Saudara Kandung dipilih jumlah saudara kandung, dan lainnya jika ada saudara tiri",
        "help": "",
        "type": "number",
        "required": true,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-hobi_sma",
        "name": "hobi_sma",
        "label": "Hobi",
        "help": "",
        "type": "checkbox",
        "required": false,
        "placeholder": "",
        "options": [
          {
            "value": "Belanja",
            "text": "Belanja"
          },
          {
            "value": "Berkemah",
            "text": "Berkemah"
          },
          {
            "value": "Berlari",
            "text": "Berlari"
          },
          {
            "value": "Bermain Biola",
            "text": "Bermain Biola"
          },
          {
            "value": "Bermain Bola",
            "text": "Bermain Bola"
          },
          {
            "value": "Bermain Bola Tenis",
            "text": "Bermain Bola Tenis"
          },
          {
            "value": "Bermain Boneka",
            "text": "Bermain Boneka"
          },
          {
            "value": "Bermain Bulu Tangkis",
            "text": "Bermain Bulu Tangkis"
          },
          {
            "value": "Bermain Gitar",
            "text": "Bermain Gitar"
          },
          {
            "value": "Bermain Musik",
            "text": "Bermain Musik"
          },
          {
            "value": "Bermain Piano",
            "text": "Bermain Piano"
          },
          {
            "value": "Berselancar",
            "text": "Berselancar"
          },
          {
            "value": "Fitness",
            "text": "Fitness"
          },
          {
            "value": "Fotografi",
            "text": "Fotografi"
          },
          {
            "value": "Jogging",
            "text": "Jogging"
          },
          {
            "value": "Kesenian",
            "text": "Kesenian"
          },
          {
            "value": "Main Puzzle",
            "text": "Main Puzzle"
          },
          {
            "value": "Makan",
            "text": "Makan"
          },
          {
            "value": "Memancing",
            "text": "Memancing"
          },
          {
            "value": "Membaca",
            "text": "Membaca"
          },
          {
            "value": "Mendaki",
            "text": "Mendaki"
          },
          {
            "value": "Menggambar",
            "text": "Menggambar"
          },
          {
            "value": "Menjahit",
            "text": "Menjahit"
          },
          {
            "value": "Menulis",
            "text": "Menulis"
          },
          {
            "value": "Mewarnai",
            "text": "Mewarnai"
          },
          {
            "value": "Olahraga",
            "text": "Olahraga"
          },
          {
            "value": "Traveling",
            "text": "Traveling"
          },
          {
            "value": "Lainnya",
            "text": "Lainnya"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-cita_cita_sma",
        "name": "cita_cita_sma",
        "label": "Cita Cita",
        "help": "",
        "type": "checkbox",
        "required": false,
        "placeholder": "",
        "options": [
          {
            "value": "Guru / Dosen",
            "text": "Guru / Dosen"
          },
          {
            "value": "Koki",
            "text": "Koki"
          },
          {
            "value": "Masinis Kereta Api",
            "text": "Masinis Kereta Api"
          },
          {
            "value": "PNS",
            "text": "PNS"
          },
          {
            "value": "Pelaut",
            "text": "Pelaut"
          },
          {
            "value": "Pemadam Kebakaran",
            "text": "Pemadam Kebakaran"
          },
          {
            "value": "Pembalap",
            "text": "Pembalap"
          },
          {
            "value": "Pembawa Acara / Master Ceremony",
            "text": "Pembawa Acara / Master Ceremony"
          },
          {
            "value": "Pengacara",
            "text": "Pengacara"
          },
          {
            "value": "Penghafal Al Qur&#039;an",
            "text": "Penghafal Al Qur'an"
          },
          {
            "value": "Pengusaha / Bisnismen",
            "text": "Pengusaha / Bisnismen"
          },
          {
            "value": "Penulis",
            "text": "Penulis"
          },
          {
            "value": "Penyiar Radio",
            "text": "Penyiar Radio"
          },
          {
            "value": "Perawat / Suster",
            "text": "Perawat / Suster"
          },
          {
            "value": "Pilot",
            "text": "Pilot"
          },
          {
            "value": "Polisi",
            "text": "Polisi"
          },
          {
            "value": "Politikus",
            "text": "Politikus"
          },
          {
            "value": "Presiden",
            "text": "Presiden"
          },
          {
            "value": "Seni/Lukis/Artis/Sejenis",
            "text": "Seni/Lukis/Artis/Sejenis"
          },
          {
            "value": "TNI",
            "text": "TNI"
          },
          {
            "value": "Polri",
            "text": "Polri"
          },
          {
            "value": "Translator",
            "text": "Translator"
          },
          {
            "value": "Vloger",
            "text": "Vloger"
          },
          {
            "value": "Wartawan",
            "text": "Wartawan"
          },
          {
            "value": "Wiraswasta",
            "text": "Wiraswasta"
          },
          {
            "value": "Lainnya",
            "text": "Lainnya"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-tinggi_badan_sma",
        "name": "tinggi_badan_sma",
        "label": "Tinggi Badan Peserta Didik",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "Contoh: 135 cm",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-berat_badan_sma",
        "name": "berat_badan_sma",
        "label": "Berat Badan Peserta Didik",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "Contoh: 43 kg",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-lingkar_kepala_sma",
        "name": "lingkar_kepala_sma",
        "label": "Lingkar Kepala (cm)",
        "help": "",
        "type": "text",
        "required": true,
        "placeholder": "Contoh: 43 cm",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-jarak_tinggal_sma",
        "name": "jarak_tinggal_sma",
        "label": "Jarak Tempat Tinggal ke Sekolah",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Kurang dari 1 km",
            "text": "Kurang dari 1 km"
          },
          {
            "value": "1 km",
            "text": "1 km"
          },
          {
            "value": "2 km",
            "text": "2 km"
          },
          {
            "value": "3 km",
            "text": "3 km"
          },
          {
            "value": "4 km",
            "text": "4 km"
          },
          {
            "value": "5 km",
            "text": "5 km"
          },
          {
            "value": "Yang Lain",
            "text": "Yang Lain"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-waktu_tempuh_sma",
        "name": "waktu_tempuh_sma",
        "label": "Waktu tempuh dari rumah ke sekolah (menit)",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "5 Menit",
            "text": "5 Menit"
          },
          {
            "value": "10 Menit",
            "text": "10 Menit"
          },
          {
            "value": "15 Menit",
            "text": "15 Menit"
          },
          {
            "value": "20 Menit",
            "text": "20 Menit"
          },
          {
            "value": "25 Menit",
            "text": "25 Menit"
          },
          {
            "value": "30 Menit",
            "text": "30 Menit"
          },
          {
            "value": "Yang Lain",
            "text": "Yang Lain"
          }
        ],
        "width": 100
      }
    ]
  },
  {
    "label": "Program Dari Pemerintah",
    "fields": [
      {
        "id": "form-field-kps_pkh_sma",
        "name": "kps_pkh_sma",
        "label": "Apakah Ayah dan Bunda memiliki Kartu Perlindungan Sosial (KPS) atau Program Keluarga Harapan (PKH)?",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Ya",
            "text": "Ya"
          },
          {
            "value": "Tidak",
            "text": "Tidak"
          },
          {
            "value": "Dalam Proses",
            "text": "Dalam Proses"
          },
          {
            "value": "Yang Lain",
            "text": "Yang Lain"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-nomor_kpspkh_sma",
        "name": "nomor_kpspkh_sma",
        "label": "No. Kartu Perlindungan Sosial (KPS) atau Program Keluarga Harapan (PKH) diisi hanya jika memiliki KPS atau PKH",
        "help": "",
        "type": "text",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      },
      {
        "id": "form-field-kip_sma",
        "name": "kip_sma",
        "label": "Apakah ananda penerima Kartu Indonesia Pintar (KIP)?",
        "help": "",
        "type": "select",
        "required": true,
        "placeholder": "",
        "options": [
          {
            "value": "Ya",
            "text": "Ya"
          },
          {
            "value": "Tidak",
            "text": "Tidak"
          },
          {
            "value": "Dalam Proses",
            "text": "Dalam Proses"
          },
          {
            "value": "Yang Lain",
            "text": "Yang Lain"
          }
        ],
        "width": 100
      },
      {
        "id": "form-field-nomor_kip_sma",
        "name": "nomor_kip_sma",
        "label": "No. Kartu Indonesia Pintar (KIP) diisi jika memiliki",
        "help": "",
        "type": "text",
        "required": false,
        "placeholder": "",
        "options": [],
        "width": 100
      }
    ]
  }
],
    conditionalRules: {
  "wali_condition": {
    "field": "wali_sma",
    "value": "Ya",
    "targets": [
      "nama_wali_sma",
      "handphone_wali_sma",
      "nik_wali_sma",
      "tahun_lahir_wali_sma",
      "pendidikan_wali_sma",
      "pekerjaan_wali_sma",
      "penghasilan_wali_sma",
      "hubungan_wali_sma"
    ]
  }
}
  }
};
