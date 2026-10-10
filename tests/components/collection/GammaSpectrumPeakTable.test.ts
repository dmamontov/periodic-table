import { describe, expect, it, vi } from 'vitest';
import GammaSpectrumPeakTable from '../../../src/components/collection/GammaSpectrumPeakTable.vue';
import type { CollectionSpectrumData } from '../../../src/types/collection/spectrum';
import type * as PeakAreaModule from '../../../src/utils/collection/peakArea';
import type { PeakAreaResult } from '../../../src/utils/collection/peakArea';
import { localeMessages } from '../../../src/locales';
import { mountComponent } from '../../helpers/mountComponent';

const { computePeakAreasMock } = vi.hoisted(() => ({ computePeakAreasMock: vi.fn() }));
vi.mock('../../../src/utils/collection/peakArea', async (importOriginal) => ({
  ...(await importOriginal<typeof PeakAreaModule>()),
  computePeakAreas: computePeakAreasMock,
}));

const SPECTRUM: CollectionSpectrumData = {
  id: 'test',
  device: 'RadiaCode-102',
  sample: 'Test',
  serialNumber: '1',
  measurementTimeSec: 1000,
  startTime: '',
  endTime: '',
  channels: 2,
  calibration: [0, 1, 0],
  counts: [0, 0],
};

function result(overrides: Partial<PeakAreaResult>): PeakAreaResult {
  return {
    label: 'X',
    energy: 100,
    netCounts: 20000,
    sigma: 150,
    netCps: 20,
    sigmaCps: 0.15,
    significance: 133.3,
    blended: false,
    reducedChiSquare: 1,
    ...overrides,
  };
}

const sidebar = localeMessages.en.sidebar;

describe('GammaSpectrumPeakTable', () => {
  it('lists every annotation with its fitted area, rate and significance', () => {
    computePeakAreasMock.mockReturnValue([
      result({ label: 'Am-241', energy: 61.7 }),
      result({
        label: 'Pb-214',
        energy: 342.4,
        netCounts: 40,
        sigma: 20,
        netCps: 0.04,
        sigmaCps: 0.02,
        significance: 2,
        blended: true,
      }),
    ]);
    const background = { ...SPECTRUM, id: 'bg' };
    const wrapper = mountComponent(GammaSpectrumPeakTable, {
      props: {
        spectrum: SPECTRUM,
        annotations: [
          { energy: 21.5, label: 'Np L' },
          { energy: 61.7, label: 'Am-241' },
          { energy: 342.4, label: 'Pb-214' },
        ],
        background,
      },
    });
    expect(computePeakAreasMock).toHaveBeenCalledWith(SPECTRUM, expect.any(Array), background);
    expect(wrapper.find('summary').text()).toBe(sidebar.collectionSpectrumPeaks);

    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(3);
    expect(rows[0]!.text()).toContain('Np L');
    expect(rows[0]!.find('.gamma-spectrum-peaks__skipped').text()).toBe('—');
    expect(rows[1]!.text()).toContain('20,000 ± 150');
    expect(rows[1]!.text()).toContain('20.00 ± 0.15');
    expect(rows[1]!.text()).toContain('133σ');
    expect(rows[1]!.find('sup').exists()).toBe(false);
    expect(rows[2]!.find('sup').text()).toBe('*');
    const weak = rows[2]!.find('.gamma-spectrum-peaks__weak');
    expect(weak.text()).toBe('2.0σ');
    expect(weak.attributes('title')).toBe(sidebar.collectionSpectrumPeakWeak);
    expect(rows[1]!.findAll('td')[3]!.attributes('title')).toBeUndefined();

    const legend = wrapper.find('.gamma-spectrum-peaks__legend').text();
    expect(legend).toContain(sidebar.collectionSpectrumPeakBlended);
    expect(legend).toContain(sidebar.collectionSpectrumPeakSkipped);
    expect(legend).toContain(sidebar.collectionSpectrumPeakWeak);
    expect(legend).toContain(sidebar.collectionSpectrumPeakMethod);
  });

  it('leaves out legend notes that apply to no row', () => {
    computePeakAreasMock.mockReturnValue([result({ label: 'Am-241', energy: 61.7 })]);
    const wrapper = mountComponent(GammaSpectrumPeakTable, {
      props: { spectrum: SPECTRUM, annotations: [{ energy: 61.7, label: 'Am-241' }], background: null },
    });
    const legend = wrapper.find('.gamma-spectrum-peaks__legend').text();
    expect(legend).not.toContain(sidebar.collectionSpectrumPeakBlended);
    expect(legend).not.toContain(sidebar.collectionSpectrumPeakSkipped);
    expect(legend).not.toContain(sidebar.collectionSpectrumPeakWeak);
    expect(legend).toContain(sidebar.collectionSpectrumPeakMethod);
  });

  it('renders nothing when no annotated line could be measured', () => {
    computePeakAreasMock.mockReturnValue([]);
    const wrapper = mountComponent(GammaSpectrumPeakTable, {
      props: { spectrum: SPECTRUM, annotations: [{ energy: 16.7, label: 'U Lα' }], background: null },
    });
    expect(wrapper.find('.gamma-spectrum-peaks').exists()).toBe(false);
  });
});
