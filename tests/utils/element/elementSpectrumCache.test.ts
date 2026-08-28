import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { preloadAllElementSpectra, preloadElementSpectrum } from '../../../src/utils/element/elementSpectrumCache';
import { getElementSpectrumUrl, hasElementSpectrum } from '../../../src/utils/element/assets';

class FakeImage {
  decoding = 'auto';
  src = '';
}

let createdImages: FakeImage[];

beforeEach(() => {
  createdImages = [];
  vi.stubGlobal(
    'Image',
    class extends FakeImage {
      constructor() {
        super();
        createdImages.push(this);
      }
    },
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function findNumberWithSpectrum(): number {
  for (let n = 1; n <= 118; n++) if (hasElementSpectrum(n)) return n;
  throw new Error('No element with a spectrum image found in test data');
}

function findNumberWithoutSpectrum(): number {
  for (let n = 1; n <= 118; n++) if (!hasElementSpectrum(n)) return n;
  throw new Error('Every element has a spectrum image in test data');
}

function findAnotherNumberWithSpectrum(exclude: number): number {
  for (let n = 1; n <= 118; n++) if (n !== exclude && hasElementSpectrum(n)) return n;
  throw new Error('No second element with a spectrum image found in test data');
}

describe('preloadElementSpectrum', () => {
  it('creates an async-decoding Image with the element spectrum URL', () => {
    const number = findNumberWithSpectrum();
    preloadElementSpectrum(number);

    expect(createdImages).toHaveLength(1);
    expect(createdImages[0]!.decoding).toBe('async');
    expect(createdImages[0]!.src).toBe(getElementSpectrumUrl(number));
  });

  it('does nothing for an element with no spectrum image', () => {
    const number = findNumberWithoutSpectrum();
    preloadElementSpectrum(number);
    expect(createdImages).toHaveLength(0);
  });

  it('only preloads a given URL once even if called repeatedly', () => {
    const number = findAnotherNumberWithSpectrum(findNumberWithSpectrum());
    preloadElementSpectrum(number);
    preloadElementSpectrum(number);
    expect(createdImages).toHaveLength(1);
  });
});

describe('preloadAllElementSpectra', () => {
  it('preloads at most one image per element that has a spectrum', () => {
    const expectedCount = Array.from({ length: 118 }, (_, i) => i + 1).filter((n) => hasElementSpectrum(n)).length;
    preloadAllElementSpectra();
    expect(createdImages.length).toBeLessThanOrEqual(expectedCount);
    expect(expectedCount).toBeGreaterThan(0);
  });
});

describe('scheduleElementSpectrumPreload', () => {
  it('uses requestIdleCallback when available, and it triggers a preload pass', async () => {
    vi.resetModules();
    const fresh = await import('../../../src/utils/element/elementSpectrumCache');
    const ric = vi.fn<(callback: () => void, options: { timeout: number }) => void>();
    vi.stubGlobal('requestIdleCallback', ric);
    fresh.scheduleElementSpectrumPreload();
    expect(ric).toHaveBeenCalledWith(expect.any(Function), { timeout: 8000 });

    ric.mock.calls[0]![0]();
    expect(createdImages.length).toBeGreaterThan(0);
  });

  it('falls back to setTimeout when requestIdleCallback is unavailable, and it triggers a preload pass', async () => {
    vi.resetModules();
    const fresh = await import('../../../src/utils/element/elementSpectrumCache');
    vi.stubGlobal('requestIdleCallback', undefined);
    const timeoutSpy = vi.spyOn(window, 'setTimeout').mockImplementation(((fn: () => void) => {
      fn();
      return 0;
    }) as typeof setTimeout);
    fresh.scheduleElementSpectrumPreload();
    expect(timeoutSpy).toHaveBeenCalledWith(expect.any(Function), 1000);
    expect(createdImages.length).toBeGreaterThan(0);
  });
});
