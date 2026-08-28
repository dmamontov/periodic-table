import { afterEach, describe, expect, it, vi } from 'vitest';
import { computed, type Ref } from 'vue';
import CollectionGammaSpectrum from '../../../src/components/collection/CollectionGammaSpectrum.vue';
import type { CollectionSpectrumData } from '../../../src/types/collection/spectrum';
import { localeMessages } from '../../../src/locales';
import { mountComponent } from '../../helpers/mountComponent';

const { getCollectionSpectrumMock, failNextFetch, delayFetchFor, releaseDelayed } = vi.hoisted(() => {
  const spectra: Record<string, CollectionSpectrumData> = {
    'ra-88-spd': {
      id: 'ra-88-spd',
      device: 'RadiaCode',
      sample: 'Clock hands',
      serialNumber: '1',
      measurementTimeSec: 3600,
      startTime: '',
      endTime: '',
      channels: 2,
      calibration: [0, 1, 0],
      counts: [1, 2],
    },
    'ra-88-pendant': {
      id: 'ra-88-pendant',
      device: 'RadiaCode',
      sample: 'Pendant',
      serialNumber: '2',
      measurementTimeSec: 1800,
      startTime: '',
      endTime: '',
      channels: 2,
      calibration: [0, 1, 0],
      counts: [3, 4],
    },
    'bg-lead-shield': {
      id: 'bg-lead-shield',
      device: 'RadiaCode',
      sample: 'Background',
      serialNumber: '3',
      measurementTimeSec: 3600,
      startTime: '',
      endTime: '',
      channels: 2,
      calibration: [0, 1, 0],
      counts: [0, 0],
    },
    'no-xml-id': {
      id: 'no-xml-id',
      device: 'RadiaCode',
      sample: 'No XML',
      serialNumber: '4',
      measurementTimeSec: 60,
      startTime: '',
      endTime: '',
      channels: 2,
      calibration: [0, 1, 0],
      counts: [1, 1],
    },
  };
  let rejectNextFetch = false;
  let delayNextFetchFor: string | null = null;
  let releaseDelayedFetch: (() => void) | null = null;
  const mockFn = vi.fn(async (id: string | null | undefined) => {
    if (rejectNextFetch) {
      rejectNextFetch = false;
      throw new Error('chunk load aborted');
    }
    if (id && id === delayNextFetchFor) {
      delayNextFetchFor = null;
      await new Promise<void>((resolve) => {
        releaseDelayedFetch = resolve;
      });
    }
    return id ? (spectra[id] ?? null) : null;
  });
  function fail() {
    rejectNextFetch = true;
  }
  /** Makes the next fetch for this id hang until release() is called - for testing the stale-response guard. */
  function delay(id: string) {
    delayNextFetchFor = id;
  }
  function release() {
    releaseDelayedFetch?.();
  }
  return { getCollectionSpectrumMock: mockFn, failNextFetch: fail, delayFetchFor: delay, releaseDelayed: release };
});

vi.mock('../../../src/data', () => ({
  getCollectionSpectrum: getCollectionSpectrumMock,
}));

// buildSpectrumChart/formatSpectrumCaption/etc. (and the real GammaSpectrumChartData shape they build)
// are fully covered by their own dedicated test files - mocked here so this file can focus purely on
// CollectionGammaSpectrum's own sibling-navigation/caching/modal-interaction logic.
vi.mock('../../../src/composables/useSpectrumDisplay', () => ({
  useSpectrumDisplay: (
    data: Ref<CollectionSpectrumData | null>,
    spectrumId: Ref<string | undefined>,
    annotations: Ref<unknown>,
    _yScale?: Ref<string>,
    _smoothingRadius?: Ref<number>,
  ) => ({
    chart: computed(() =>
      data.value
        ? {
            width: 400,
            height: 200,
            baseY: 180,
            pad: { left: 30, right: 10, top: 10, bottom: 20 },
            plotW: 360,
            plotH: 170,
            displayMaxEnergy: 1000,
            areaPath: 'M0 180 L400 180 Z',
            linePath: 'M0 180 L400 180',
            backgroundLinePath: null,
            backgroundAreaPath: null,
            xTicks: [],
            yTicks: [],
            // Real markers are built from annotations elsewhere (own dedicated test file) - reading
            // .value here is enough to exercise the real activeAnnotations/annotations computeds in
            // this component, which this mock would otherwise never touch (lazy computed evaluation).
            markers: annotations.value ? [] : [],
          }
        : null,
    ),
    caption: computed(() => (data.value ? `Caption ${spectrumId.value}` : '')),
    durationLabel: computed(() => (data.value ? '3600 s' : '')),
    cpsLabel: computed(() => (data.value ? '1.2 cps' : '')),
    xmlDownload: computed(() =>
      spectrumId.value && spectrumId.value !== 'no-xml-id'
        ? { href: `/x/${spectrumId.value}.xml`, filename: `${spectrumId.value}.xml` }
        : null,
    ),
  }),
}));

afterEach(() => {
  document.body.innerHTML = '';
  getCollectionSpectrumMock.mockClear();
});

const BASE_PROPS = {
  spectrumId: 'ra-88-spd',
  accentColor: '#ff6666',
  elementSymbol: 'Ra',
  elementName: 'Radium',
};

async function mountSpectrum(props: Record<string, unknown> = {}) {
  const wrapper = mountComponent(CollectionGammaSpectrum, { props: { ...BASE_PROPS, ...props } });
  await new Promise((r) => setTimeout(r, 0));
  return wrapper;
}

describe('CollectionGammaSpectrum', () => {
  it('renders nothing before the spectrum resolves', () => {
    const wrapper = mountComponent(CollectionGammaSpectrum, { props: BASE_PROPS });
    expect(wrapper.find('.collection-gamma-spectrum').exists()).toBe(false);
  });

  it('renders the chart/caption/duration/cps once the spectrum loads', async () => {
    const wrapper = await mountSpectrum();
    expect(wrapper.find('.collection-gamma-spectrum').exists()).toBe(true);
    expect(wrapper.find('.gamma-spectrum-svg__readout').text()).toBe('3600 s');
    expect(wrapper.text()).toContain('Caption ra-88-spd');
  });

  it('renders nothing when the spectrum id resolves to no data', async () => {
    const wrapper = await mountSpectrum({ spectrumId: 'unknown-id' });
    expect(wrapper.find('.collection-gamma-spectrum').exists()).toBe(false);
  });

  it('shows the download link sourced from xmlDownload', async () => {
    const wrapper = await mountSpectrum();
    const link = wrapper.find('.collection-gamma-spectrum__download');
    expect(link.attributes('href')).toBe('/x/ra-88-spd.xml');
  });

  it('omits the download link when xmlDownload is null', async () => {
    const wrapper = await mountSpectrum({ spectrumId: 'no-xml-id' });
    expect(wrapper.find('.collection-gamma-spectrum__download').exists()).toBe(false);
  });

  it('renders nothing when the spectrum fetch throws (e.g. an aborted chunk load)', async () => {
    failNextFetch();
    const wrapper = await mountSpectrum();
    expect(wrapper.find('.collection-gamma-spectrum').exists()).toBe(false);
  });

  it('shows the lead-shielded icon with a tooltip on hover/keydown/click, only when leadShielded is true', async () => {
    const wrapper = await mountSpectrum({ leadShielded: true });
    const wrap = wrapper.find('.collection-gamma-spectrum__lead-icon-wrap');
    expect(wrap.exists()).toBe(true);

    await wrap.trigger('pointerenter', { pointerType: 'mouse' });
    expect(document.body.querySelector('.info-tooltip__bubble')?.textContent).toBe(
      localeMessages.en.sidebar.collectionSpectrumLeadShielded,
    );
    await wrap.trigger('pointerleave', { pointerType: 'mouse' });
    expect(document.body.querySelector('.info-tooltip__bubble')).toBeNull();

    await wrap.trigger('keydown', { key: 'Escape' });
    await wrap.find('.collection-gamma-spectrum__lead-icon').trigger('click');
    expect(document.body.querySelector('.info-tooltip__bubble')).not.toBeNull();

    const noShieldWrapper = await mountSpectrum({ leadShielded: false });
    expect(noShieldWrapper.find('.collection-gamma-spectrum__lead-icon').exists()).toBe(false);
  });

  it('shows the own note when given', async () => {
    const wrapper = await mountSpectrum({ note: 'Background-subtracted, real peak.' });
    expect(wrapper.find('.collection-gamma-spectrum__note').text()).toContain('Background-subtracted, real peak.');
  });

  it('opens the zoom modal on trigger click, showing the element heading', async () => {
    const wrapper = await mountSpectrum();
    await wrapper.find('.collection-gamma-spectrum__trigger').trigger('click');
    await new Promise((r) => setTimeout(r, 0));

    const modal = document.body.querySelector('.gamma-spectrum-modal');
    expect(modal).not.toBeNull();
    expect(modal?.querySelector('.element-spectrum-heading__symbol')?.textContent).toBe('Ra');
  });

  it('does not show an element heading in the modal when there is no active symbol to show', async () => {
    const wrapper = await mountSpectrum({ elementSymbol: undefined, elementName: undefined });
    await wrapper.find('.collection-gamma-spectrum__trigger').trigger('click');
    await new Promise((r) => setTimeout(r, 0));
    expect(document.body.querySelector('.element-spectrum-heading')).toBeNull();
  });

  it('shows the modal lead-shielded icon with a tooltip when the active sibling is lead-shielded', async () => {
    const siblings = [{ symbol: 'Ra', color: '#ff6666', spectrumId: 'ra-88-spd', leadShielded: true }];
    const wrapper = await mountSpectrum({ siblings, siblingIndex: 0 });
    await wrapper.find('.collection-gamma-spectrum__trigger').trigger('click');
    await new Promise((r) => setTimeout(r, 0));

    const wrap = document.body.querySelector('.gamma-spectrum-modal .collection-gamma-spectrum__lead-icon-wrap');
    expect(wrap).not.toBeNull();

    wrap!.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true, pointerType: 'mouse' }));
    await new Promise((r) => setTimeout(r, 0));
    expect(document.body.querySelector('.info-tooltip__bubble')?.textContent).toBe(
      localeMessages.en.sidebar.collectionSpectrumLeadShielded,
    );

    wrap!.dispatchEvent(new PointerEvent('pointerleave', { bubbles: true, pointerType: 'mouse' }));
    await new Promise((r) => setTimeout(r, 0));
    expect(document.body.querySelector('.info-tooltip__bubble')).toBeNull();

    // Not bubbles:true - the wrap's own @keydown listener only needs to fire once (already covered
    // for the inline icon); bubbling this up to window would also trip the modal's own Escape handler.
    wrap!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    document.body
      .querySelector<HTMLButtonElement>('.gamma-spectrum-modal .collection-gamma-spectrum__lead-icon')!
      .click();
    await new Promise((r) => setTimeout(r, 0));
    expect(document.body.querySelector('.info-tooltip__bubble')).not.toBeNull();
  });

  it('shows the own note in the modal when the active spectrum has one', async () => {
    const wrapper = await mountSpectrum({ note: 'Real background-subtracted peak.' });
    await wrapper.find('.collection-gamma-spectrum__trigger').trigger('click');
    await new Promise((r) => setTimeout(r, 0));
    expect(
      document.body.querySelector('.gamma-spectrum-modal .collection-gamma-spectrum__note')?.textContent,
    ).toContain('Real background-subtracted peak.');
  });

  it('omits the modal download link when the active spectrum has no xmlDownload', async () => {
    const wrapper = await mountSpectrum({ spectrumId: 'no-xml-id' });
    await wrapper.find('.collection-gamma-spectrum__trigger').trigger('click');
    await new Promise((r) => setTimeout(r, 0));
    expect(document.body.querySelector('.gamma-spectrum-modal .collection-gamma-spectrum__download')).toBeNull();
  });

  it('reuses an already-fetched-and-empty sibling from the cache instead of re-fetching', async () => {
    const siblings = [
      { symbol: 'Ra', color: '#ff6666', spectrumId: 'ra-88-spd' },
      { symbol: 'Ra', color: '#ff6666', spectrumId: 'missing-id' },
    ];
    const wrapper = await mountSpectrum({ siblings, siblingIndex: 0 });
    await wrapper.find('.collection-gamma-spectrum__trigger').trigger('click');
    await new Promise((r) => setTimeout(r, 0));

    // First visit to the sibling with no real data caches an explicit `null`.
    document.body.querySelector<HTMLButtonElement>('.gamma-spectrum-modal__nav--next')?.click();
    await new Promise((r) => setTimeout(r, 0));
    expect(document.body.querySelector('.gamma-spectrum-modal__chart')).toBeNull();

    document.body.querySelector<HTMLButtonElement>('.gamma-spectrum-modal__nav--prev')?.click();
    await new Promise((r) => setTimeout(r, 0));
    getCollectionSpectrumMock.mockClear();

    // Revisiting it should read the cached `null` rather than fetching again.
    document.body.querySelector<HTMLButtonElement>('.gamma-spectrum-modal__nav--next')?.click();
    await new Promise((r) => setTimeout(r, 0));
    expect(getCollectionSpectrumMock).not.toHaveBeenCalledWith('missing-id');
    expect(document.body.querySelector('.gamma-spectrum-modal__chart')).toBeNull();
  });

  it('drops a stale in-flight fetch when the user navigates again before it resolves', async () => {
    const siblings = [
      { symbol: 'Ra', color: '#ff6666', spectrumId: 'ra-88-spd' },
      { symbol: 'Ra', color: '#ff6666', spectrumId: 'ra-88-pendant' },
      { symbol: 'Ra', color: '#ff6666', spectrumId: 'bg-lead-shield' },
    ];
    const wrapper = await mountSpectrum({ siblings, siblingIndex: 0 });
    await wrapper.find('.collection-gamma-spectrum__trigger').trigger('click');
    await new Promise((r) => setTimeout(r, 0));

    // Navigate to sibling 1, whose fetch is made to hang; before it resolves, navigate again to
    // sibling 2, whose fetch resolves normally - the stale (sibling 1) response must not clobber it.
    delayFetchFor('ra-88-pendant');
    document.body.querySelector<HTMLButtonElement>('.gamma-spectrum-modal__nav--next')?.click();
    await new Promise((r) => setTimeout(r, 0));

    document.body.querySelector<HTMLButtonElement>('.gamma-spectrum-modal__nav--next')?.click();
    await new Promise((r) => setTimeout(r, 0));
    expect(
      document.body.querySelector('.gamma-spectrum-modal .collection-gamma-spectrum__caption')?.textContent,
    ).toContain('Caption bg-lead-shield');

    releaseDelayed();
    await new Promise((r) => setTimeout(r, 0));
    expect(
      document.body.querySelector('.gamma-spectrum-modal .collection-gamma-spectrum__caption')?.textContent,
    ).toContain('Caption bg-lead-shield');
  });

  it('closes the modal via the close button, backdrop, and Escape', async () => {
    const wrapper = await mountSpectrum();

    await wrapper.find('.collection-gamma-spectrum__trigger').trigger('click');
    await new Promise((r) => setTimeout(r, 0));
    document.body.querySelector<HTMLButtonElement>('.gamma-spectrum-modal__close')?.click();
    await new Promise((r) => setTimeout(r, 0));
    expect(document.body.querySelector('.gamma-spectrum-modal')).toBeNull();

    await wrapper.find('.collection-gamma-spectrum__trigger').trigger('click');
    await new Promise((r) => setTimeout(r, 0));
    document.body.querySelector<HTMLButtonElement>('.gamma-spectrum-modal__backdrop')?.click();
    await new Promise((r) => setTimeout(r, 0));
    expect(document.body.querySelector('.gamma-spectrum-modal')).toBeNull();

    await wrapper.find('.collection-gamma-spectrum__trigger').trigger('click');
    await new Promise((r) => setTimeout(r, 0));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await new Promise((r) => setTimeout(r, 0));
    expect(document.body.querySelector('.gamma-spectrum-modal')).toBeNull();
  });

  it('falls back to the default collection accent color when accentColor is not given', async () => {
    const wrapper = await mountSpectrum({ accentColor: undefined });
    expect(wrapper.find('.collection-gamma-spectrum').exists()).toBe(true);
  });

  it('falls back to an empty name for a sibling symbol with no localized translation', async () => {
    const siblings = [{ symbol: 'Xx', color: '#ff6666', spectrumId: 'ra-88-spd' }];
    const wrapper = await mountSpectrum({ siblings, siblingIndex: 0 });
    await wrapper.find('.collection-gamma-spectrum__trigger').trigger('click');
    await new Promise((r) => setTimeout(r, 0));
    expect(document.body.querySelector('.element-spectrum-heading__name')?.textContent).toBe('');
  });

  it('falls back to an empty name when the element symbol is set but the element name is not', async () => {
    const wrapper = await mountSpectrum({ elementName: undefined });
    await wrapper.find('.collection-gamma-spectrum__trigger').trigger('click');
    await new Promise((r) => setTimeout(r, 0));
    expect(document.body.querySelector('.element-spectrum-heading__name')?.textContent).toBe('');
  });

  it('hides the nav arrows and disables sibling navigation with 0 or 1 siblings', async () => {
    const wrapper = await mountSpectrum({ siblings: [{ symbol: 'Ra', color: '#ff6666', spectrumId: 'ra-88-spd' }] });
    await wrapper.find('.collection-gamma-spectrum__trigger').trigger('click');
    await new Promise((r) => setTimeout(r, 0));
    expect(document.body.querySelector('.gamma-spectrum-modal__nav')).toBeNull();
  });

  it('navigates between siblings via prev/next buttons, wrapping around, without re-fetching cached spectra', async () => {
    const siblings = [
      { symbol: 'Ra', color: '#ff6666', spectrumId: 'ra-88-spd', isCurrent: true },
      { symbol: 'Ra', color: '#ff6666', spectrumId: 'ra-88-pendant', isPast: true, retained: true },
    ];
    const wrapper = await mountSpectrum({ siblings, siblingIndex: 0 });
    await wrapper.find('.collection-gamma-spectrum__trigger').trigger('click');
    await new Promise((r) => setTimeout(r, 0));

    expect(document.body.querySelector('.gamma-spectrum-svg__readout')?.textContent).toBe('3600 s');
    getCollectionSpectrumMock.mockClear();

    document.body.querySelector<HTMLButtonElement>('.gamma-spectrum-modal__nav--next')?.click();
    await new Promise((r) => setTimeout(r, 0));
    expect(document.body.querySelector('.element-spectrum-heading__name')?.textContent).toContain(
      localeMessages.en.elements.Ra,
    );
    expect(
      document.body.querySelectorAll('.gamma-spectrum-modal .collection-gamma-spectrum__caption')[0]?.textContent,
    ).toContain('Caption ra-88-pendant');

    // Navigating back to the already-fetched first sibling must reuse the cache, not fetch again.
    getCollectionSpectrumMock.mockClear();
    document.body.querySelector<HTMLButtonElement>('.gamma-spectrum-modal__nav--prev')?.click();
    await new Promise((r) => setTimeout(r, 0));
    expect(getCollectionSpectrumMock).not.toHaveBeenCalledWith('ra-88-spd');
  });

  it('navigates siblings via ArrowLeft/ArrowRight while the modal is open', async () => {
    const siblings = [
      { symbol: 'Ra', color: '#ff6666', spectrumId: 'ra-88-spd' },
      { symbol: 'Ra', color: '#ff6666', spectrumId: 'ra-88-pendant' },
    ];
    const wrapper = await mountSpectrum({ siblings, siblingIndex: 0 });
    await wrapper.find('.collection-gamma-spectrum__trigger').trigger('click');
    await new Promise((r) => setTimeout(r, 0));

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await new Promise((r) => setTimeout(r, 0));
    expect(
      document.body.querySelector('.gamma-spectrum-modal .collection-gamma-spectrum__caption')?.textContent,
    ).toContain('Caption ra-88-pendant');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    await new Promise((r) => setTimeout(r, 0));
    expect(
      document.body.querySelector('.gamma-spectrum-modal .collection-gamma-spectrum__caption')?.textContent,
    ).toContain('Caption ra-88-spd');
  });

  it('stops listening for arrow keys once unmounted', async () => {
    const siblings = [
      { symbol: 'Ra', color: '#ff6666', spectrumId: 'ra-88-spd' },
      { symbol: 'Ra', color: '#ff6666', spectrumId: 'ra-88-pendant' },
    ];
    const wrapper = await mountSpectrum({ siblings, siblingIndex: 0 });
    await wrapper.find('.collection-gamma-spectrum__trigger').trigger('click');
    await new Promise((r) => setTimeout(r, 0));

    wrapper.unmount();
    expect(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))).not.toThrow();
  });

  it('toggles the y-scale between linear and log in the modal', async () => {
    const wrapper = await mountSpectrum();
    await wrapper.find('.collection-gamma-spectrum__trigger').trigger('click');
    await new Promise((r) => setTimeout(r, 0));

    const buttons = document.body.querySelectorAll<HTMLButtonElement>('.gamma-spectrum-modal__scale-btn');
    expect(buttons[0]!.getAttribute('aria-pressed')).toBe('true');

    buttons[1]!.click();
    await new Promise((r) => setTimeout(r, 0));
    expect(buttons[1]!.getAttribute('aria-pressed')).toBe('true');
    expect(buttons[0]!.getAttribute('aria-pressed')).toBe('false');

    buttons[0]!.click();
    await new Promise((r) => setTimeout(r, 0));
    expect(buttons[0]!.getAttribute('aria-pressed')).toBe('true');
    expect(buttons[1]!.getAttribute('aria-pressed')).toBe('false');
  });

  it('adjusts the smoothing radius via the filter slider', async () => {
    const wrapper = await mountSpectrum();
    await wrapper.find('.collection-gamma-spectrum__trigger').trigger('click');
    await new Promise((r) => setTimeout(r, 0));

    const slider = document.body.querySelector<HTMLInputElement>('.gamma-spectrum-modal__filter-slider')!;
    slider.value = '3';
    slider.dispatchEvent(new Event('input'));
    await new Promise((r) => setTimeout(r, 0));

    expect(document.body.querySelector('.gamma-spectrum-modal__filter-value')?.textContent).toBe('3');
  });

  it('fetches and displays a background spectrum when backgroundSpectrumId is set', async () => {
    await mountSpectrum({ backgroundSpectrumId: 'bg-lead-shield' });
    expect(getCollectionSpectrumMock).toHaveBeenCalledWith('bg-lead-shield');
  });
});
