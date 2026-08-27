import { describe, expect, it, vi } from 'vitest';
import { readStorage, writeStorage } from '../../src/utils/storage';

const isTheme = (value: string): value is 'light' | 'dark' => value === 'light' || value === 'dark';

/** A minimal in-memory Storage stand-in - avoids depending on jsdom/Node's own localStorage global. */
function fakeStorage(): Storage {
  const map = new Map<string, string>();
  return {
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => void map.set(key, value),
    removeItem: (key) => void map.delete(key),
    clear: () => map.clear(),
    key: (index) => Array.from(map.keys())[index] ?? null,
    get length() {
      return map.size;
    },
  };
}

describe('readStorage', () => {
  it('returns the stored value when it passes the validator', () => {
    const storage = fakeStorage();
    storage.setItem('theme', 'dark');
    expect(readStorage(storage, 'theme', isTheme)).toBe('dark');
  });

  it('returns null when the key is missing', () => {
    expect(readStorage(fakeStorage(), 'theme', isTheme)).toBeNull();
  });

  it('returns null when the stored value fails the validator', () => {
    const storage = fakeStorage();
    storage.setItem('theme', 'purple');
    expect(readStorage(storage, 'theme', isTheme)).toBeNull();
  });

  it('returns null instead of throwing when storage access fails', () => {
    const throwing = {
      getItem: () => {
        throw new Error('blocked');
      },
    } as unknown as Storage;
    expect(readStorage(throwing, 'theme', isTheme)).toBeNull();
  });
});

describe('writeStorage', () => {
  it('writes a string value', () => {
    const storage = fakeStorage();
    writeStorage(storage, 'theme', 'dark');
    expect(storage.getItem('theme')).toBe('dark');
  });

  it('removes the key when value is null', () => {
    const storage = fakeStorage();
    storage.setItem('theme', 'dark');
    writeStorage(storage, 'theme', null);
    expect(storage.getItem('theme')).toBeNull();
  });

  it('does not throw when storage access fails', () => {
    const throwing = {
      setItem: vi.fn(() => {
        throw new Error('blocked');
      }),
    } as unknown as Storage;
    expect(() => writeStorage(throwing, 'theme', 'dark')).not.toThrow();
  });
});
