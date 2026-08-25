/** Safe read from `localStorage`/`sessionStorage` — returns null on unavailable storage or a value the caller's validator rejects. */
export function readStorage<T extends string>(
  storage: Storage,
  key: string,
  isValid: (value: string) => value is T,
): T | null {
  try {
    const stored = storage.getItem(key);
    if (stored !== null && isValid(stored)) return stored;
  } catch {
    // storage may be unavailable (private mode, blocked storage)
  }
  return null;
}

/** Safe write to `localStorage`/`sessionStorage` — pass `null` to remove the key. Silently ignores write failures. */
export function writeStorage(storage: Storage, key: string, value: string | null): void {
  try {
    if (value === null) storage.removeItem(key);
    else storage.setItem(key, value);
  } catch {
    // ignore write failures
  }
}
