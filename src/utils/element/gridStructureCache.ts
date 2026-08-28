import { getGridStructureImageUrlByNum } from './assets';

const preloadedUrls = new Set<string>();

export function preloadGridStructure(num: number): void {
  const url = getGridStructureImageUrlByNum(num);
  if (!url || preloadedUrls.has(url)) return;

  preloadedUrls.add(url);
  const image = new Image();
  image.decoding = 'async';
  image.src = url;
}

export function preloadAllGridStructures(): void {
  for (let num = 1; num <= 12; num += 1) {
    preloadGridStructure(num);
  }
}

export function scheduleGridStructurePreload(): void {
  const run = () => preloadAllGridStructures();

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(run, { timeout: 8000 });
    return;
  }

  window.setTimeout(run, 1000);
}
