CREATE OR REPLACE FUNCTION public.upsert_spmb_registration(payload jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
  saved_row public.spmb_registrations%ROWTYPE;
BEGIN
  INSERT INTO public.spmb_registrations (
    nomor_pendaftaran,
    jenjang,
    nama_lengkap,
    nama_panggilan,
    nisn,
    nik,
    jenis_kelamin,
    sekolah_asal,
    alamat_domisili,
    nama_ayah,
    handphone_ayah,
    nama_ibu,
    handphone_ibu,
    no_handphone,
    email,
    status,
    catatan,
    form_data,
    file_paths
  ) VALUES (
    payload->>'nomor_pendaftaran',
    payload->>'jenjang',
    payload->>'nama_lengkap',
    payload->>'nama_panggilan',
    payload->>'nisn',
    payload->>'nik',
    payload->>'jenis_kelamin',
    payload->>'sekolah_asal',
    payload->>'alamat_domisili',
    payload->>'nama_ayah',
    payload->>'handphone_ayah',
    payload->>'nama_ibu',
    payload->>'handphone_ibu',
    payload->>'no_handphone',
    payload->>'email',
    COALESCE(payload->>'status', 'Menunggu Verifikasi'),
    COALESCE(payload->>'catatan', ''),
    COALESCE(payload->'form_data', '{}'::jsonb),
    COALESCE(payload->'file_paths', '{}'::jsonb)
  )
  ON CONFLICT (nomor_pendaftaran) DO UPDATE SET
    jenjang = EXCLUDED.jenjang,
    nama_lengkap = EXCLUDED.nama_lengkap,
    nama_panggilan = EXCLUDED.nama_panggilan,
    nisn = EXCLUDED.nisn,
    nik = EXCLUDED.nik,
    jenis_kelamin = EXCLUDED.jenis_kelamin,
    sekolah_asal = EXCLUDED.sekolah_asal,
    alamat_domisili = EXCLUDED.alamat_domisili,
    nama_ayah = EXCLUDED.nama_ayah,
    handphone_ayah = EXCLUDED.handphone_ayah,
    nama_ibu = EXCLUDED.nama_ibu,
    handphone_ibu = EXCLUDED.handphone_ibu,
    no_handphone = EXCLUDED.no_handphone,
    email = EXCLUDED.email,
    status = EXCLUDED.status,
    catatan = EXCLUDED.catatan,
    form_data = EXCLUDED.form_data,
    file_paths = EXCLUDED.file_paths,
    updated_at = now()
  RETURNING * INTO saved_row;

  RETURN to_jsonb(saved_row);
END;
$$;

REVOKE ALL ON FUNCTION public.upsert_spmb_registration(jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.upsert_spmb_registration(jsonb) TO anon, authenticated, project_admin;
