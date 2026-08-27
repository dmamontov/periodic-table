import { describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import type { CollectionSpectrumData } from '../../src/types/collection/spectrum';
import type { SpectrumAnnotation } from '../../src/types/collection/collection';

vi.mock('../../src/data', () => ({
  collectionSpectrumFilenames: {
    'po210-1': { ru: 'спектр.xml', en: 'spectrum.xml', zh: '光谱.xml' },
  },
  getCollectionSpectrumXmlHref: vi.fn((id: string) =>
    id === 'po210-1' || id === 'no-filename' ? `/collection-spectra/${id}.xml` : null,
  ),
}));

vi.mock('../../src/locales', () => ({
  useLocale: () => ({ locale: ref('en') }),
}));

vi.mock('../../src/utils/collection/spectrumChart', () => ({
  buildSpectrumChart: vi.fn(() => 'CHART'),
  formatSpectrumCaption: vi.fn(() => 'CAPTION'),
  formatSpectrumDurationLabel: vi.fn(() => 'DURATION'),
  formatSpectrumCpsLabel: vi.fn(() => 'CPS'),
}));

const { useSpectrumDisplay } = await import('../../src/composables/useSpectrumDisplay');
const spectrumChart = await import('../../src/utils/collection/spectrumChart');

const SPECTRUM = { channels: [] } as unknown as CollectionSpectrumData;

describe('useSpectrumDisplay', () => {
  it('derives chart/caption/duration/cps from the underlying formatters', () => {
    const data = ref<CollectionSpectrumData | null>(SPECTRUM);
    const annotations = ref<SpectrumAnnotation[] | null | undefined>(null);
    const { chart, caption, durationLabel, cpsLabel } = useSpectrumDisplay(data, ref('po210-1'), annotations);

    expect(chart.value).toBe('CHART');
    expect(caption.value).toBe('CAPTION');
    expect(durationLabel.value).toBe('DURATION');
    expect(cpsLabel.value).toBe('CPS');
    expect(spectrumChart.buildSpectrumChart).toHaveBeenCalledWith(SPECTRUM, null, undefined, undefined, null);
  });

  it('passes yScale, smoothingRadius and background through when provided', () => {
    const data = ref<CollectionSpectrumData | null>(SPECTRUM);
    const background = ref<CollectionSpectrumData | null>(SPECTRUM);
    const { chart } = useSpectrumDisplay(data, ref('po210-1'), ref(null), ref('linear'), ref(3), background);
    void chart.value;

    expect(spectrumChart.buildSpectrumChart).toHaveBeenCalledWith(SPECTRUM, null, 'linear', 3, SPECTRUM);
  });

  it('resolves the xml download href and filename when the id is known', () => {
    const { xmlDownload } = useSpectrumDisplay(ref(SPECTRUM), ref('po210-1'), ref(null));
    expect(xmlDownload.value).toEqual({ href: '/collection-spectra/po210-1.xml', filename: 'spectrum.xml' });
  });

  it('returns null xml download when there is no spectrum id', () => {
    const { xmlDownload } = useSpectrumDisplay(ref(SPECTRUM), ref(undefined), ref(null));
    expect(xmlDownload.value).toBeNull();
  });

  it('returns null xml download when the id has no href', () => {
    const { xmlDownload } = useSpectrumDisplay(ref(SPECTRUM), ref('unknown-id'), ref(null));
    expect(xmlDownload.value).toBeNull();
  });

  it('returns null xml download when the id has an href but no registered filename', () => {
    const { xmlDownload } = useSpectrumDisplay(ref(SPECTRUM), ref('no-filename'), ref(null));
    expect(xmlDownload.value).toBeNull();
  });
});
