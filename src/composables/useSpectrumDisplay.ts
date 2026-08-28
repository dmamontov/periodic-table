import { computed, type Ref } from 'vue';
import { collectionSpectrumFilenames } from '../data';
import { getCollectionSpectrumXmlHref } from '../utils/collection/spectrumLoader';
import { useLocale } from '../locales';
import { resolveLocalizedLabel } from '../utils/localizedLabel';
import {
  buildSpectrumChart,
  formatSpectrumCaption,
  formatSpectrumCpsLabel,
  formatSpectrumDurationLabel,
  type SpectrumYScale,
} from '../utils/collection/spectrumChart';
import type { CollectionSpectrumData } from '../types/collection/spectrum';
import type { SpectrumAnnotation } from '../types/collection/collection';

/** Derives chart/caption/label/download data for a fetched spectrum — shared by CollectionGammaSpectrum's inline card and its zoom modal, which each fetch their own `CollectionSpectrumData` but derive it identically. */
export function useSpectrumDisplay(
  data: Ref<CollectionSpectrumData | null>,
  spectrumId: Ref<string | undefined>,
  annotations: Ref<SpectrumAnnotation[] | null | undefined>,
  yScale?: Ref<SpectrumYScale>,
  smoothingRadius?: Ref<number>,
  background?: Ref<CollectionSpectrumData | null>,
) {
  const { locale } = useLocale();

  const chart = computed(() =>
    buildSpectrumChart(data.value, annotations.value, yScale?.value, smoothingRadius?.value, background?.value ?? null),
  );
  const caption = computed(() => formatSpectrumCaption(data.value));
  const durationLabel = computed(() => formatSpectrumDurationLabel(data.value));
  const cpsLabel = computed(() => formatSpectrumCpsLabel(data.value, locale.value));

  const xmlDownload = computed(() => {
    const id = spectrumId.value;
    if (!id) return null;
    const href = getCollectionSpectrumXmlHref(id);
    const filename = resolveLocalizedLabel(collectionSpectrumFilenames[id], locale.value);
    if (!href || !filename) return null;
    return { href, filename };
  });

  return { chart, caption, durationLabel, cpsLabel, xmlDownload };
}
