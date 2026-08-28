import { afterEach, describe, expect, it, vi } from 'vitest';
import CollectionHistoryRow from '../../../src/components/collection/CollectionHistoryRow.vue';
import type { Element } from '../../../src/types/element/element';
import { localeMessages } from '../../../src/locales';
import { mountComponent } from '../../helpers/mountComponent';

// ElementCollectionHistoryModal.vue (statically imported here) eagerly reads getCollectionSpectrum from
// src/utils/collection/spectrumLoader - mocked out so no test in this file ever touches the real
// personal collection.
vi.mock('../../../src/data', () => ({
  storedElementDetails: {},
}));

vi.mock('../../../src/utils/collection/spectrumLoader', () => ({
  getCollectionSpectrum: vi.fn(),
}));

vi.mock('../../../src/utils/element/detail', () => ({
  getElementDecayMode: () => undefined,
}));

vi.mock('../../../src/utils/element/lookup', () => ({
  getSymbolByNumber: () => null,
}));

afterEach(() => {
  document.body.innerHTML = '';
});

const RA: Element = {
  number: 88,
  symbol: 'Ra',
  mass: '226',
  group: 2,
  oldGroup: 'IIA',
  row: 7,
  col: 2,
  periodEnd: false,
  color: '#ff6666',
  category: 'alkaline-earth',
  inCollection: true,
  collection: { history: [] },
};

function mountRow(upgrade: boolean) {
  return mountComponent(CollectionHistoryRow, {
    props: { element: RA, name: 'Radium', color: '#ff6666', markerColor: '#16a34a', upgrade },
    global: { stubs: { CollectionGammaSpectrum: true } },
  });
}

describe('CollectionHistoryRow', () => {
  it('renders the marker color and the element heading', () => {
    const wrapper = mountRow(false);
    expect((wrapper.find('.collection-history-row__marker').element as HTMLElement).style.backgroundColor).toBe(
      'rgb(22, 163, 74)',
    );
    expect(wrapper.find('.element-spectrum-heading__symbol').text()).toBe('Ra');
    expect(wrapper.find('.element-spectrum-heading__name').text()).toBe('Radium');
  });

  it('omits the upgrade icon when upgrade is false', () => {
    const wrapper = mountRow(false);
    expect(wrapper.find('.collection-history-row__upgrade-icon').exists()).toBe(false);
  });

  it('shows the upgrade icon with a tooltip on hover when upgrade is true', async () => {
    const wrapper = mountRow(true);
    const icon = wrapper.find('.collection-history-row__upgrade-icon');
    expect(icon.exists()).toBe(true);

    await icon.trigger('pointerenter', { pointerType: 'mouse' });
    expect(document.body.querySelector('.info-tooltip__bubble')?.textContent).toBe(
      localeMessages.en.collectionPanel.wishlistUpgradeBadge,
    );

    await icon.trigger('pointerleave', { pointerType: 'mouse' });
    expect(document.body.querySelector('.info-tooltip__bubble')).toBeNull();
  });

  it('toggles the upgrade tooltip on click without opening the history modal', async () => {
    const wrapper = mountRow(true);
    const icon = wrapper.find('.collection-history-row__upgrade-icon');

    await icon.trigger('click');
    expect(document.body.querySelector('.info-tooltip__bubble')).not.toBeNull();
    expect(document.body.querySelector('.collection-history-modal')).toBeNull();
  });

  it('opens the collection history modal when the row itself is clicked', async () => {
    const wrapper = mountRow(false);
    await wrapper.find('.collection-history-row').trigger('click');
    expect(document.body.querySelector('.collection-history-modal')).not.toBeNull();
  });
});
