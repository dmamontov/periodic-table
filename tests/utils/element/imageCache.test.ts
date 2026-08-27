import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { preloadAllElementImages, preloadElementImage } from '../../../src/utils/element/imageCache';
import { getElementImageUrl, hasElementImage } from '../../../src/data';

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

function findNumberWithImage(): number {
  for (let n = 1; n <= 118; n++) if (hasElementImage(n)) return n;
  throw new Error('No element with an image found in test data');
}

function findNumberWithoutImage(): number {
  for (let n = 1; n <= 118; n++) if (!hasElementImage(n)) return n;
  throw new Error('Every element has an image in test data');
}

function findAnotherNumberWithImage(exclude: number): number {
  for (let n = 1; n <= 118; n++) if (n !== exclude && hasElementImage(n)) return n;
  throw new Error('No second element with an image found in test data');
}

describe('preloadElementImage', () => {
  it('creates an async-decoding Image with the element photo URL', () => {
    const number = findNumberWithImage();
    preloadElementImage(number);

    expect(createdImages).toHaveLength(1);
    expect(createdImages[0]!.decoding).toBe('async');
    expect(createdImages[0]!.src).toBe(getElementImageUrl(number));
  });

  it('does nothing for an element with no photo', () => {
    const number = findNumberWithoutImage();
    preloadElementImage(number);
    expect(createdImages).toHaveLength(0);
  });

  it('only preloads a given URL once even if called repeatedly', () => {
    const number = findAnotherNumberWithImage(findNumberWithImage());
    preloadElementImage(number);
    preloadElementImage(number);
    preloadElementImage(number);
    expect(createdImages).toHaveLength(1);
  });
});

describe('preloadAllElementImages', () => {
  it('preloads every element that has a photo, and nothing else', () => {
    const expectedCount = Array.from({ length: 118 }, (_, i) => i + 1).filter((n) => hasElementImage(n)).length;
    preloadAllElementImages();
    expect(createdImages.length).toBeLessThanOrEqual(expectedCount);
    expect(expectedCount).toBeGreaterThan(0);
  });
});

describe('scheduleElementImagePreload', () => {
  it('uses requestIdleCallback when available, and it triggers a preload pass', async () => {
    vi.resetModules();
    const fresh = await import('../../../src/utils/element/imageCache');
    const ric = vi.fn<(callback: () => void, options: { timeout: number }) => void>();
    vi.stubGlobal('requestIdleCallback', ric);
    fresh.scheduleElementImagePreload();
    expect(ric).toHaveBeenCalledWith(expect.any(Function), { timeout: 8000 });

    ric.mock.calls[0]![0]();
    expect(createdImages.length).toBeGreaterThan(0);
  });

  it('falls back to setTimeout when requestIdleCallback is unavailable, and it triggers a preload pass', async () => {
    vi.resetModules();
    const fresh = await import('../../../src/utils/element/imageCache');
    vi.stubGlobal('requestIdleCallback', undefined);
    const timeoutSpy = vi.spyOn(window, 'setTimeout').mockImplementation(((fn: () => void) => {
      fn();
      return 0;
    }) as typeof setTimeout);
    fresh.scheduleElementImagePreload();
    expect(timeoutSpy).toHaveBeenCalledWith(expect.any(Function), 1000);
    expect(createdImages.length).toBeGreaterThan(0);
  });
});
