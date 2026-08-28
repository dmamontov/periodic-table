import { getElementSpectrumUrl, hasElementSpectrum } from './assets';

const preloadedUrls = new Set<string>();

export function preloadElementSpectrum(number: number): void {
  if (!hasElementSpectrum(number)) return;

  const url = getElementSpectrumUrl(number);
  if (!url || preloadedUrls.has(url)) return;

  preloadedUrls.add(url);
  const image = new Image();
  image.decoding = 'async';
  image.src = url;
}

export function preloadAllElementSpectra(): void {
  for (let number = 1; number <= 118; number += 1) {
    preloadElementSpectrum(number);
  }
}

export function scheduleElementSpectrumPreload(): void {
  const run = () => preloadAllElementSpectra();

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(run, { timeout: 8000 });
    return;
  }

  window.setTimeout(run, 1000);
}
