export interface RequiredDocumentField {
  name: string;
  label: string;
}

export function getRequiredDocumentFields(jenjang: string): RequiredDocumentField[] {
  const normalizedJenjang = jenjang.toLowerCase();
  return [
    {
      name: `file_kk_${normalizedJenjang}`,
      label: 'Kartu Keluarga (KK)',
    },
    {
      name: `file_akta_${normalizedJenjang}`,
      label: 'Akta Kelahiran',
    },
  ];
}

export function isRequiredDocumentField(fieldName: string, jenjang: string): boolean {
  return getRequiredDocumentFields(jenjang).some((field) => field.name === fieldName);
}
