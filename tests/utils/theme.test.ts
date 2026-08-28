import { afterEach, describe, expect, it, vi } from 'vitest';
import { applyTheme, detectThemePreference, isThemePreference, resolveTheme } from '../../src/utils/theme';

afterEach(() => {
  vi.restoreAllMocks();
  document.documentElement.removeAttribute('data-theme');
  document.documentElement.style.colorScheme = '';
  document.head.innerHTML = '';
});

describe('isThemePreference', () => {
  it('accepts light/dark/auto', () => {
    expect(isThemePreference('light')).toBe(true);
    expect(isThemePreference('dark')).toBe(true);
    expect(isThemePreference('auto')).toBe(true);
  });

  it('rejects anything else', () => {
    expect(isThemePreference('blue')).toBe(false);
  });
});

describe('detectThemePreference', () => {
  it('returns the stored value when present', () => {
    expect(detectThemePreference('dark')).toBe('dark');
  });

  it('falls back to auto when nothing is stored', () => {
    expect(detectThemePreference(null)).toBe('auto');
  });
});

describe('resolveTheme', () => {
  it('passes non-auto preferences straight through', () => {
    expect(resolveTheme('dark')).toBe('dark');
    expect(resolveTheme('light')).toBe('light');
  });

  it('resolves auto to dark when the OS prefers dark', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList);
    expect(resolveTheme('auto')).toBe('dark');
  });

  it('resolves auto to light when the OS does not prefer dark', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: false } as MediaQueryList);
    expect(resolveTheme('auto')).toBe('light');
  });
});

describe('applyTheme', () => {
  it('sets the data-theme attribute and colorScheme style', () => {
    applyTheme('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(document.documentElement.style.colorScheme).toBe('dark');
  });

  it('does nothing to the theme-color meta tag when none exists', () => {
    applyTheme('dark');
    expect(document.querySelector('meta[name="theme-color"]')).toBeNull();
  });

  it('updates an existing theme-color meta tag for dark', () => {
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);

    applyTheme('dark');
    expect(meta.getAttribute('content')).toBe('#1a1a1a');
  });

  it('updates an existing theme-color meta tag for light', () => {
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);

    applyTheme('light');
    expect(meta.getAttribute('content')).toBe('#ffffff');
  });
});
