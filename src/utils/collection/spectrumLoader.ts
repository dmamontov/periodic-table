import type { CollectionSpectrumData } from '../../types/collection/spectrum';

/** Lazy-loaded by spectrum id so a spectrum's data only enters the bundle once its element is opened. */
const spectrumLoaders = import.meta.glob<{ default: CollectionSpectrumData }>('../../data/spectra/*.json');

const spectrumLoaderById = new Map<string, () => Promise<{ default: CollectionSpectrumData }>>();
for (const [path, loader] of Object.entries(spectrumLoaders)) {
  const match = /([^/]+)\.json$/.exec(path);
  // The glob pattern itself is '*.json', so every returned path structurally has a non-empty
  // filename before '.json' - this guard's false side can never be exercised by a real glob result.
  /* v8 ignore next */
  if (match?.[1]) spectrumLoaderById.set(match[1], loader);
}

export async function getCollectionSpectrum(id: string | null | undefined): Promise<CollectionSpectrumData | null> {
  if (!id) return null;
  const loader = spectrumLoaderById.get(id);
  if (!loader) return null;
  const module = await loader();
  return module.default;
}

/** Every known spectrum id, e.g. to warm the dynamic-import cache ahead of time. */
export function getAllCollectionSpectrumIds(): string[] {
  return Array.from(spectrumLoaderById.keys());
}

export function getCollectionSpectrumXmlHref(id: string | null | undefined): string | null {
  if (!id || !spectrumLoaderById.has(id)) return null;
  return `/collection-spectra/${id}.xml`;
}
