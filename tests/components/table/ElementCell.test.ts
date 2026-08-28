import { describe, expect, it, vi } from 'vitest';
import ElementCell from '../../../src/components/table/ElementCell.vue';
import { MOCK_ELEMENTS } from '../../helpers/elementFixtures';
import { mountComponent } from '../../helpers/mountComponent';
import { localeMessages } from '../../../src/locales';

// ElementCell only needs these as pure geometry/classification helpers - mocking them keeps the test
// independent of the real elements/collection data those functions are actually derived from.
// src/utils/heatmap.ts (pulled in transitively via intensityToBrightness) also reads `elements` and
// `storedElementDetails` eagerly at module load time to precompute its datasets.
// vi.mock is hoisted above imports, so the fixture must be loaded via a dynamic import inside the factory
// rather than a top-level import binding (which would still be in its TDZ when the factory runs).
vi.mock('../../../src/data', async () => {
  const { MOCK_ELEMENTS: elements } = await import('../../helpers/elementFixtures');
  return {
    getCellBorderRadius: () => '4px 4px 0 0',
    getElementPeriod: (element: { row: number }) => element.row,
    isElementRadioactive: (number: number) => number === 84 || number === 75,
    isElementWeaklyRadioactive: (number: number) => number === 75,
    elements,
    storedElementDetails: {},
    getElementDecayMode: () => undefined,
    // src/locales/index.ts's tElement() also resolves through here.
    getSymbolByNumber: (number: number) => elements.find((el) => el.number === number)?.symbol ?? null,
  };
});

const H = MOCK_ELEMENTS[0]!;
const FE = MOCK_ELEMENTS[2]!;
const PO = MOCK_ELEMENTS[3]!;

describe('ElementCell', () => {
  it('renders the symbol, number, name and mass, and emits select on click', async () => {
    const wrapper = mountComponent(ElementCell, { props: { element: H } });

    expect(wrapper.find('.element-cell__symbol').text()).toBe('H');
    expect(wrapper.find('.element-cell__number').text()).toBe('1');
    expect(wrapper.find('.element-cell__name').text()).toBe(localeMessages.en.elements.H);
    expect(wrapper.find('.element-cell__mass').text().length).toBeGreaterThan(0);

    await wrapper.trigger('click');
    expect(wrapper.emitted('select')).toEqual([[H]]);
  });

  it('emits select on Enter and Space keydown', async () => {
    const wrapper = mountComponent(ElementCell, { props: { element: H } });

    await wrapper.trigger('keydown.enter');
    await wrapper.trigger('keydown.space');

    expect(wrapper.emitted('select')).toHaveLength(2);
  });

  it('shows no radioactive badge for a stable element', () => {
    const wrapper = mountComponent(ElementCell, { props: { element: FE } });
    expect(wrapper.find('.element-cell__radioactive').exists()).toBe(false);
  });

  it('shows a full-strength radioactive badge for a radioactive element', () => {
    const wrapper = mountComponent(ElementCell, { props: { element: PO } });
    const badge = wrapper.find('.element-cell__radioactive');

    expect(badge.exists()).toBe(true);
    expect(badge.classes()).not.toContain('element-cell__radioactive--weak');
    expect(badge.attributes('aria-label')).toBe(localeMessages.en.sidebar.radioactiveBadge);
  });

  it('shows a dimmed weak-radioactive badge for a weakly radioactive element', () => {
    const weak = { ...H, number: 75, symbol: 'Re' };
    const wrapper = mountComponent(ElementCell, { props: { element: weak } });
    const badge = wrapper.find('.element-cell__radioactive');

    expect(badge.classes()).toContain('element-cell__radioactive--weak');
    expect(badge.attributes('aria-label')).toBe(localeMessages.en.sidebar.weakRadioactiveBadge);
  });

  it('shows the period label only on the first column of the main table, or col 4 in single-row mode', () => {
    const colOne = { ...H, col: 1 };
    const wrapper = mountComponent(ElementCell, { props: { element: colOne, showPeriod: true } });
    expect(wrapper.find('.element-cell__period').exists()).toBe(true);

    const colTwo = { ...H, col: 2 };
    const wrapper2 = mountComponent(ElementCell, { props: { element: colTwo, showPeriod: true } });
    expect(wrapper2.find('.element-cell__period').exists()).toBe(false);

    const singleRowColFour = { ...H, col: 4 };
    const wrapper3 = mountComponent(ElementCell, {
      props: { element: singleRowColFour, showPeriod: true, singleRow: true },
    });
    expect(wrapper3.find('.element-cell__period').exists()).toBe(true);
  });

  it('shows the group label only when showGroup is true', () => {
    const wrapper = mountComponent(ElementCell, { props: { element: H, showGroup: true } });
    expect(wrapper.find('.element-cell__group').text()).toBe(String(H.group));

    const wrapper2 = mountComponent(ElementCell, { props: { element: H } });
    expect(wrapper2.find('.element-cell__group').exists()).toBe(false);
  });

  it('dims axis labels when a filter is active and the axis is not highlighted', () => {
    const wrapper = mountComponent(ElementCell, {
      props: {
        element: { ...H, col: 1 },
        showPeriod: true,
        showGroup: true,
        selectedCategory: 'alkali',
        axisPeriodHighlighted: false,
        axisGroupHighlighted: true,
      },
    });

    expect(wrapper.find('.element-cell__period').classes()).toContain('element-cell__axis-label--dimmed');
    expect(wrapper.find('.element-cell__group').classes()).not.toContain('element-cell__axis-label--dimmed');
  });

  it('dims the surface for a category filter mismatch, an "all" filter dims nothing', () => {
    const wrapper = mountComponent(ElementCell, { props: { element: FE, selectedCategory: 'alkali' } });
    expect(wrapper.find('.element-cell__surface').classes()).toContain('element-cell__surface--dimmed');

    const wrapperAll = mountComponent(ElementCell, { props: { element: FE, selectedCategory: 'all' } });
    expect(wrapperAll.find('.element-cell__surface').classes()).not.toContain('element-cell__surface--dimmed');

    const wrapperMatch = mountComponent(ElementCell, { props: { element: FE, selectedCategory: FE.category } });
    expect(wrapperMatch.find('.element-cell__surface').classes()).not.toContain('element-cell__surface--dimmed');
  });

  it('dims elements outside the collection when the collection filter is active', () => {
    const wrapper = mountComponent(ElementCell, { props: { element: H, selectedCategory: 'collection' } });
    expect(wrapper.find('.element-cell__surface').classes()).toContain('element-cell__surface--dimmed');

    const wrapperInCollection = mountComponent(ElementCell, { props: { element: FE, selectedCategory: 'collection' } });
    expect(wrapperInCollection.find('.element-cell__surface').classes()).not.toContain('element-cell__surface--dimmed');
  });

  it('shows the heatmap cell value in place of mass, and applies a no-data filter for a null intensity', () => {
    const wrapper = mountComponent(ElementCell, {
      props: { element: H, heatmapIntensity: null, heatmapCellValue: 'n/a' },
    });

    expect(wrapper.find('.element-cell__mass').text()).toBe('n/a');
    expect(wrapper.find('.element-cell__surface').classes()).toContain('element-cell__surface--no-data');
  });

  it('applies a brightness filter for a real heatmap intensity, and none when heatmap is off', () => {
    // jsdom stores the `filter` CSS property under a `-webkit-filter` alias, so it's asserted on the
    // rendered style attribute rather than the (unreliable, in jsdom) `.style.filter` getter.
    const wrapper = mountComponent(ElementCell, { props: { element: H, heatmapIntensity: 0.5 } });
    expect(wrapper.find('.element-cell__surface').attributes('style')).toContain('brightness');

    const wrapperOff = mountComponent(ElementCell, { props: { element: H } });
    expect(wrapperOff.find('.element-cell__surface').attributes('style')).not.toContain('filter');
  });

  it('appends the heatmap hint to the title when given', () => {
    const wrapper = mountComponent(ElementCell, { props: { element: H, heatmapHint: 'extra info' } });
    expect(wrapper.attributes('title')).toContain('extra info');
  });

  it('marks itself active via the active prop', () => {
    const wrapper = mountComponent(ElementCell, { props: { element: H, active: true } });
    expect(wrapper.classes()).toContain('element-cell--active');
    expect(wrapper.find('.element-cell__surface').classes()).toContain('element-cell__surface--active');
  });
});
