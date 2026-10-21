export type DraftFormData = Record<string, string | string[]>;

export type RegistrationDraft = {
  formData: DraftFormData;
  fileMap: Record<string, File>;
  regionCodes: Record<string, string>;
  currentStepIndex: number;
  updatedAt: number;
};

const DATABASE_NAME = 'spmb-albanna-local-drafts';
const STORE_NAME = 'files';
const DATABASE_VERSION = 1;
const TEXT_KEY_PREFIX = 'spmb-albanna-draft:';
const DRAFT_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function clearFiles(id: string) {
  if (!('indexedDB' in window)) return;
  const database = await openDatabase();
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, 'readwrite');
      transaction.objectStore(STORE_NAME).delete(id);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } finally {
    database.close();
  }
}

export async function loadRegistrationDraft(id: string): Promise<RegistrationDraft | null> {
  const stored = localStorage.getItem(TEXT_KEY_PREFIX + id);
  if (!stored) return null;

  try {
    const textDraft = JSON.parse(stored) as Omit<RegistrationDraft, 'fileMap'>;
    if (!textDraft.updatedAt || Date.now() - textDraft.updatedAt > DRAFT_TTL_MS) {
      await clearRegistrationDraft(id);
      return null;
    }

    // Persisting browser File objects can leave unreadable file handles on
    // iOS after the page is closed. Restore text only and ask for files again.
    void clearFiles(id).catch(() => undefined);
    return { ...textDraft, fileMap: {} };
  } catch {
    await clearRegistrationDraft(id);
    return null;
  }
}

export async function saveRegistrationDraft(id: string, draft: RegistrationDraft) {
  const textDraft: Omit<RegistrationDraft, 'fileMap'> = {
    formData: draft.formData,
    regionCodes: draft.regionCodes,
    currentStepIndex: draft.currentStepIndex,
    updatedAt: draft.updatedAt,
  };
  localStorage.setItem(TEXT_KEY_PREFIX + id, JSON.stringify(textDraft));
}

export async function clearRegistrationDraft(id: string) {
  localStorage.removeItem(TEXT_KEY_PREFIX + id);
  try {
    await clearFiles(id);
  } catch {
    // The text draft is already removed; stale files are harmless and overwritten later.
  }
}
