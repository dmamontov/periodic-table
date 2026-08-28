import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { preloadAllGridStructures, preloadGridStructure } from '../../../src/utils/element/gridStructureCache';
import { getGridStructureImageUrlByNum } from '../../../src/utils/element/assets';

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

describe('preloadGridStructure', () => {
  it('creates an async-decoding Image for a valid structure number', () => {
    preloadGridStructure(1);
    expect(createdImages).toHaveLength(1);
    expect(createdImages[0]!.decoding).toBe('async');
    expect(createdImages[0]!.src).toBe(getGridStructureImageUrlByNum(1));
  });

  it('does nothing for an out-of-range structure number', () => {
    preloadGridStructure(999);
    expect(createdImages).toHaveLength(0);
  });

  it('only preloads a given structure once even if called repeatedly', () => {
    preloadGridStructure(2);
    preloadGridStructure(2);
    expect(createdImages).toHaveLength(1);
  });
});

describe('preloadAllGridStructures', () => {
  it('preloads at most 12 images, one per lattice structure', () => {
    preloadAllGridStructures();
    expect(createdImages.length).toBeLessThanOrEqual(12);
  });
});

describe('scheduleGridStructurePreload', () => {
  it('uses requestIdleCallback when available, and it triggers a preload pass', async () => {
    vi.resetModules();
    const fresh = await import('../../../src/utils/element/gridStructureCache');
    const ric = vi.fn<(callback: () => void, options: { timeout: number }) => void>();
    vi.stubGlobal('requestIdleCallback', ric);
    fresh.scheduleGridStructurePreload();
    expect(ric).toHaveBeenCalledWith(expect.any(Function), { timeout: 8000 });

    ric.mock.calls[0]![0]();
    expect(createdImages.length).toBeGreaterThan(0);
  });

  it('falls back to setTimeout when requestIdleCallback is unavailable, and it triggers a preload pass', async () => {
    vi.resetModules();
    const fresh = await import('../../../src/utils/element/gridStructureCache');
    vi.stubGlobal('requestIdleCallback', undefined);
    const timeoutSpy = vi.spyOn(window, 'setTimeout').mockImplementation(((fn: () => void) => {
      fn();
      return 0;
    }) as typeof setTimeout);
    fresh.scheduleGridStructurePreload();
    expect(timeoutSpy).toHaveBeenCalledWith(expect.any(Function), 1000);
    expect(createdImages.length).toBeGreaterThan(0);
  });
});
