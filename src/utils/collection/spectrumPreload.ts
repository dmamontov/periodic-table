import { getAllCollectionSpectrumIds, getCollectionSpectrum } from './spectrumLoader';

export function preloadAllCollectionSpectra(): void {
  for (const id of getAllCollectionSpectrumIds()) {
    // Dynamic import() caches by module, so this just warms that cache -
    // the same call CollectionGammaSpectrum.vue makes when it actually needs the data.
    void getCollectionSpectrum(id);
  }
}

export function scheduleCollectionSpectrumPreload(): void {
  const run = () => preloadAllCollectionSpectra();

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(run, { timeout: 8000 });
    return;
  }

  window.setTimeout(run, 1000);
}
