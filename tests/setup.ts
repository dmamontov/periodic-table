import { afterEach, vi } from 'vitest';

/** Node 22+'s built-in global localStorage/sessionStorage shadow jsdom's own Storage and are non-functional without a --localstorage-file flag - replace both with a real in-memory Storage so readStorage/writeStorage (src/utils/storage.ts) work as they do in a real browser. */
class MemoryStorage implements Storage {
  #data = new Map<string, string>();

  get length(): number {
    return this.#data.size;
  }

  clear(): void {
    this.#data.clear();
  }

  getItem(key: string): string | null {
    return this.#data.get(key) ?? null;
  }

  key(index: number): string | null {
    return Array.from(this.#data.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.#data.delete(key);
  }

  setItem(key: string, value: string): void {
    this.#data.set(key, value);
  }
}

Object.defineProperty(window, 'localStorage', { writable: true, value: new MemoryStorage() });
Object.defineProperty(window, 'sessionStorage', { writable: true, value: new MemoryStorage() });

afterEach(() => {
  window.localStorage.clear();
  window.sessionStorage.clear();
});

/** jsdom has no layout engine, so it doesn't implement scroll methods - stubbed as no-ops for components that call them directly (e.g. ElementSidebar.vue resetting scroll position on open). */
if (!Element.prototype.scrollTo) {
  Element.prototype.scrollTo = vi.fn();
}

/** jsdom has no layout/media engine - installTheme()'s 'auto' preference (the default) calls this on every mount. */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: () => false,
  }),
});
