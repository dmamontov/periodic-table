import { afterEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { installTheme, useTheme } from '../../src/theme';
import { withSetup } from '../helpers/withSetup';

afterEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
  document.documentElement.style.colorScheme = '';
  vi.restoreAllMocks();
});

describe('installTheme/useTheme', () => {
  it('defaults to auto (resolved via matchMedia) when nothing is stored', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
    } as unknown as MediaQueryList);

    const [theme, app] = withSetup(() => useTheme(), [installTheme]);
    expect(theme.theme.value).toBe('auto');
    expect(theme.resolvedTheme.value).toBe('light');
    expect(document.documentElement.dataset.theme).toBe('light');
    app.unmount();
  });

  it('prefers a stored theme preference', () => {
    localStorage.setItem('periodic-table-theme', 'dark');
    const [theme, app] = withSetup(() => useTheme(), [installTheme]);
    expect(theme.theme.value).toBe('dark');
    expect(theme.resolvedTheme.value).toBe('dark');
    app.unmount();
  });

  it('setTheme updates the ref, resolves, applies, and persists it', async () => {
    const [theme, app] = withSetup(() => useTheme(), [installTheme]);

    theme.setTheme('dark');
    await nextTick();
    expect(theme.resolvedTheme.value).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem('periodic-table-theme')).toBe('dark');

    app.unmount();
  });

  it('re-applies the resolved theme on an OS color-scheme change while preference is auto', () => {
    let changeHandler: (() => void) | undefined;
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
      addEventListener: (_event: string, handler: () => void) => {
        changeHandler = handler;
      },
    } as unknown as MediaQueryList);

    const [, app] = withSetup(() => useTheme(), [installTheme]);
    expect(document.documentElement.dataset.theme).toBe('dark');

    changeHandler?.();
    expect(document.documentElement.dataset.theme).toBe('dark');

    app.unmount();
  });

  it('does not react to an OS color-scheme change once a non-auto preference is set', async () => {
    let changeHandler: (() => void) | undefined;
    const matchMediaSpy = vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
      addEventListener: (_event: string, handler: () => void) => {
        changeHandler = handler;
      },
    } as unknown as MediaQueryList);

    const [theme, app] = withSetup(() => useTheme(), [installTheme]);
    theme.setTheme('light');
    await nextTick();

    matchMediaSpy.mockReturnValue({ matches: true, addEventListener: vi.fn() } as unknown as MediaQueryList);
    changeHandler?.();
    expect(document.documentElement.dataset.theme).toBe('light');

    app.unmount();
  });

  it('useTheme throws when used outside a theme provider', () => {
    // Catches the error inside setup() itself (instead of letting mount() propagate it) so
    // setup() always returns a valid render function - Vue would otherwise log its own "missing
    // render function" warning on top of the error we're actually asserting on here.
    let caught: unknown;
    const wrapper = mount({
      setup() {
        try {
          useTheme();
        } catch (error) {
          caught = error;
        }
        return () => null;
      },
    });

    expect(caught).toBeInstanceOf(Error);
    expect((caught as Error).message).toBe('useTheme must be used within theme provider');
    wrapper.unmount();
  });
});
