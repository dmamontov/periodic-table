import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  preloadAllCollectionSpectra,
  scheduleCollectionSpectrumPreload,
} from '../../../src/utils/collection/spectrumPreload';
import * as data from '../../../src/data';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('preloadAllCollectionSpectra', () => {
  it('calls getCollectionSpectrum once for every known spectrum id', () => {
    const ids = data.getAllCollectionSpectrumIds();
    expect(ids.length).toBeGreaterThan(0);

    const spy = vi.spyOn(data, 'getCollectionSpectrum');
    preloadAllCollectionSpectra();

    expect(spy).toHaveBeenCalledTimes(ids.length);
    for (const id of ids) {
      expect(spy).toHaveBeenCalledWith(id);
    }
  });
});

describe('scheduleCollectionSpectrumPreload', () => {
  it('uses requestIdleCallback when available, and it triggers a preload pass', () => {
    const spy = vi.spyOn(data, 'getCollectionSpectrum');
    const ric = vi.fn<(callback: () => void, options: { timeout: number }) => void>();
    vi.stubGlobal('requestIdleCallback', ric);
    scheduleCollectionSpectrumPreload();
    expect(ric).toHaveBeenCalledWith(expect.any(Function), { timeout: 8000 });

    ric.mock.calls[0]![0]();
    expect(spy).toHaveBeenCalled();
  });

  it('falls back to setTimeout when requestIdleCallback is unavailable, and it triggers a preload pass', () => {
    const spy = vi.spyOn(data, 'getCollectionSpectrum');
    vi.stubGlobal('requestIdleCallback', undefined);
    const timeoutSpy = vi.spyOn(window, 'setTimeout').mockImplementation(((fn: () => void) => {
      fn();
      return 0;
    }) as typeof setTimeout);
    scheduleCollectionSpectrumPreload();
    expect(timeoutSpy).toHaveBeenCalledWith(expect.any(Function), 1000);
    expect(spy).toHaveBeenCalled();
  });
});
