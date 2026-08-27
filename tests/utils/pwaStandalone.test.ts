import { afterEach, describe, expect, it, vi } from 'vitest';
import { initPwaStandalone, isPwaStandalone } from '../../src/utils/pwaStandalone';

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockReturnValue({ matches });
}

afterEach(() => {
  document.documentElement.classList.remove('pwa-standalone');
  Reflect.deleteProperty(window.navigator, 'standalone');
});

describe('isPwaStandalone', () => {
  it('is true when display-mode: standalone matches', () => {
    mockMatchMedia(true);
    expect(isPwaStandalone()).toBe(true);
  });

  it('is true when navigator.standalone is true (iOS)', () => {
    mockMatchMedia(false);
    Object.defineProperty(window.navigator, 'standalone', { value: true, configurable: true });
    expect(isPwaStandalone()).toBe(true);
  });

  it('is false in a regular browser tab', () => {
    mockMatchMedia(false);
    expect(isPwaStandalone()).toBe(false);
  });
});

describe('initPwaStandalone', () => {
  it('adds the pwa-standalone class when running standalone', () => {
    mockMatchMedia(true);
    initPwaStandalone();
    expect(document.documentElement.classList.contains('pwa-standalone')).toBe(true);
  });

  it('does not add the class in a regular browser tab', () => {
    mockMatchMedia(false);
    initPwaStandalone();
    expect(document.documentElement.classList.contains('pwa-standalone')).toBe(false);
  });
});
