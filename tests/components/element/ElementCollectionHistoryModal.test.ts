import { afterEach, describe, expect, it, vi } from 'vitest';
import ElementCollectionHistoryModal from '../../../src/components/element/ElementCollectionHistoryModal.vue';
import type { Element } from '../../../src/types/element/element';
import { localeMessages } from '../../../src/locales';
import { mountComponent } from '../../helpers/mountComponent';

// CollectionGammaSpectrum.vue (statically imported here) eagerly reads getCollectionSpectrum from
// src/data - mocked out so no test in this file ever touches the real personal collection.
vi.mock('../../../src/data', () => ({
  getCollectionSpectrum: vi.fn(),
  getElementDecayMode: () => undefined,
  storedElementDetails: {},
  getSymbolByNumber: () => null,
}));

afterEach(() => {
  document.body.innerHTML = '';
});

const RICH_ELEMENT: Element = {
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
  collection: {
    physical: {
      sampleState: 'ampoule',
      allotrope: { en: 'Alpha' },
      container: 'ampoule',
      purity: { value: 999, approx: false },
      weight: { mg: 50, approx: true },
      manufactureDate: '1962',
      acquiredDate: '2026-06-02',
    },
    radioactive: { isotope: '226', sourceType: 'secondary', decayParent: [{ symbol: 'U', isotope: '238' }] },
    spectrum: { id: 'ra-88-spd', annotations: [{ energy: 186, label: 'Ra-226' }] },
    history: [
      {
        physical: {},
        radioactive: {},
        retained: false,
        reason: 'betterSample',
      },
      {
        physical: { acquiredDate: '2020-01-01' },
        radioactive: {},
        retained: true,
      },
    ],
  },
};

const MINIMAL_ELEMENT: Element = {
  ...RICH_ELEMENT,
  collection: { history: [] },
};

const NO_HISTORY_FIELD_ELEMENT: Element = {
  ...RICH_ELEMENT,
  collection: {},
};

function mountModal(element: Element) {
  return mountComponent(ElementCollectionHistoryModal, {
    props: { element, elementName: 'Radium', displaySymbol: 'Ra' },
    global: { stubs: { CollectionGammaSpectrum: true } },
  });
}

describe('ElementCollectionHistoryModal', () => {
  it('renders a default trigger button that opens the modal on click', async () => {
    const wrapper = mountModal(RICH_ELEMENT);
    expect(document.body.querySelector('.collection-history-modal')).toBeNull();

    await wrapper.find('.element-collection-history-trigger').trigger('click');
    expect(document.body.querySelector('.collection-history-modal')).not.toBeNull();
  });

  it('supports a custom trigger via the trigger slot', async () => {
    const wrapper = mountComponent(ElementCollectionHistoryModal, {
      props: { element: RICH_ELEMENT, elementName: 'Radium', displaySymbol: 'Ra' },
      global: { stubs: { CollectionGammaSpectrum: true } },
      slots: {
        trigger: `<template #trigger="{ open }"><button class="custom-trigger" @click="open">Go</button></template>`,
      },
    });
    expect(wrapper.find('.element-collection-history-trigger').exists()).toBe(false);

    await wrapper.find('.custom-trigger').trigger('click');
    expect(document.body.querySelector('.collection-history-modal')).not.toBeNull();
  });

  it('closes on backdrop click, close button, and Escape', async () => {
    const wrapper = mountModal(RICH_ELEMENT);
    await wrapper.find('.element-collection-history-trigger').trigger('click');

    document.body.querySelector<HTMLButtonElement>('.collection-history-modal__backdrop')!.click();
    await wrapper.vm.$nextTick();
    expect(document.body.querySelector('.collection-history-modal')).toBeNull();

    await wrapper.find('.element-collection-history-trigger').trigger('click');
    document.body.querySelector<HTMLButtonElement>('.collection-history-modal button[aria-label]')?.click();
    await wrapper.vm.$nextTick();
    expect(document.body.querySelector('.collection-history-modal')).toBeNull();

    await wrapper.find('.element-collection-history-trigger').trigger('click');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await wrapper.vm.$nextTick();
    expect(document.body.querySelector('.collection-history-modal')).toBeNull();
  });

  it('ignores non-Escape keys while open', async () => {
    const wrapper = mountModal(RICH_ELEMENT);
    await wrapper.find('.element-collection-history-trigger').trigger('click');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await wrapper.vm.$nextTick();
    expect(document.body.querySelector('.collection-history-modal')).not.toBeNull();
  });

  it('shows the current entry with the current marker color and "since" date wording', async () => {
    const wrapper = mountModal(RICH_ELEMENT);
    await wrapper.find('.element-collection-history-trigger').trigger('click');

    const entries = document.body.querySelectorAll('.collection-history-modal__entry');
    expect(entries).toHaveLength(3);
    expect(entries[0]!.classList.contains('collection-history-modal__entry--current')).toBe(true);
    expect(entries[0]!.querySelector('.collection-history-modal__date')?.textContent).toContain(
      localeMessages.en.sidebar.collectionHistoryCurrent,
    );
    expect(entries[0]!.querySelector('.collection-history-modal__date')?.textContent).toContain(
      localeMessages.en.sidebar.collectionHistorySince,
    );
  });

  it('shows all facts for a fully-populated current entry', async () => {
    const wrapper = mountModal(RICH_ELEMENT);
    await wrapper.find('.element-collection-history-trigger').trigger('click');

    const current = document.body.querySelector('.collection-history-modal__entry--current')!;
    const factLabels = Array.from(current.querySelectorAll('.collection-history-modal__fact-label')).map(
      (el) => el.textContent,
    );

    expect(factLabels).toContain(localeMessages.en.sidebar.props.collectionPurity);
    expect(factLabels).toContain(localeMessages.en.sidebar.props.collectionWeight);
    expect(factLabels).toContain(localeMessages.en.sidebar.props.collectionSampleState);
    expect(factLabels).toContain(localeMessages.en.sidebar.props.collectionAllotrope);
    expect(factLabels).toContain(localeMessages.en.sidebar.props.collectionContainer);
    expect(factLabels).toContain(localeMessages.en.sidebar.props.collectionManufactureDate);
    expect(factLabels).toContain(localeMessages.en.sidebar.props.collectionIsotope);
    expect(factLabels).toContain(localeMessages.en.sidebar.props.collectionSourceType);
    expect(factLabels).toContain(localeMessages.en.sidebar.props.collectionDecayParent);
  });

  it('marks a retained past entry with the retained color and a "since" date', async () => {
    const wrapper = mountModal(RICH_ELEMENT);
    await wrapper.find('.element-collection-history-trigger').trigger('click');

    // history is rendered most-recent-first, so history[1] (retained, dated) comes right after current.
    const retainedPast = document.body.querySelectorAll('.collection-history-modal__entry')[1]!;
    expect(retainedPast.querySelector('.collection-history-modal__date')?.textContent).toContain(
      localeMessages.en.sidebar.collectionHistorySince,
    );
    expect(retainedPast.querySelector('.collection-history-modal__date')?.textContent).not.toContain(
      localeMessages.en.sidebar.collectionHistoryCurrent,
    );
  });

  it('marks a not-retained past entry with the not-retained color and shows its reason', async () => {
    const wrapper = mountModal(RICH_ELEMENT);
    await wrapper.find('.element-collection-history-trigger').trigger('click');

    const entries = document.body.querySelectorAll('.collection-history-modal__entry');
    const past = entries[2]!;
    expect(past.classList.contains('collection-history-modal__entry--current')).toBe(false);
    const marker = past.querySelector<HTMLElement>('.collection-history-modal__marker')!;
    expect(marker.style.backgroundColor).not.toBe('');

    const factLabels = Array.from(past.querySelectorAll('.collection-history-modal__fact-label')).map(
      (el) => el.textContent,
    );
    expect(factLabels).toContain(localeMessages.en.sidebar.props.collectionHistoryReason);
    // Empty physical/radioactive fields on the history entry mean none of the other facts render.
    expect(factLabels).not.toContain(localeMessages.en.sidebar.props.collectionPurity);
    expect(factLabels).not.toContain(localeMessages.en.sidebar.props.collectionSourceType);
  });

  it('omits all optional facts for an entry with no collection data, showing only the bare "current" date label', async () => {
    const wrapper = mountModal(MINIMAL_ELEMENT);
    await wrapper.find('.element-collection-history-trigger').trigger('click');

    const current = document.body.querySelector('.collection-history-modal__entry--current')!;
    expect(current.querySelector('.collection-history-modal__date')?.textContent).toBe(
      localeMessages.en.sidebar.collectionHistoryCurrent,
    );
    expect(current.querySelectorAll('.collection-history-modal__fact')).toHaveLength(0);
    expect(document.body.querySelectorAll('.collection-history-modal__entry')).toHaveLength(1);
  });

  it('treats a missing history field the same as an empty history array', async () => {
    const wrapper = mountModal(NO_HISTORY_FIELD_ELEMENT);
    await wrapper.find('.element-collection-history-trigger').trigger('click');
    expect(document.body.querySelectorAll('.collection-history-modal__entry')).toHaveLength(1);
  });

  it('passes spectrum data and sibling indices to CollectionGammaSpectrum for entries with a spectrum id', async () => {
    const wrapper = mountModal(RICH_ELEMENT);
    await wrapper.find('.element-collection-history-trigger').trigger('click');

    const spectrum = wrapper.findComponent({ name: 'CollectionGammaSpectrum' });
    expect(spectrum.exists()).toBe(true);
    expect(spectrum.props('spectrumId')).toBe('ra-88-spd');
    expect(spectrum.props('isCurrent')).toBe(true);
    expect(spectrum.props('isPast')).toBe(false);
    expect(spectrum.props('siblingIndex')).toBe(0);
  });
});
