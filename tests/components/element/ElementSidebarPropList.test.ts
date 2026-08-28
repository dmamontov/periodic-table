import { describe, expect, it, vi } from 'vitest';
import ElementSidebarPropList from '../../../src/components/element/ElementSidebarPropList.vue';
import type { DetailSection } from '../../../src/types/element/section';
import type { Element } from '../../../src/types/element/element';
import type { OxidationStateRows } from '../../../src/utils/element/detailSections';
import { mountComponent } from '../../helpers/mountComponent';

// CollectionGammaSpectrum.vue and ElementMiniTable.vue (statically imported here) both eagerly read
// from src/data / the moved-out utils - mocked out so no test in this file ever touches the real
// personal collection.
vi.mock('../../../src/data', () => ({
  mainElements: [],
  lanthanides: [],
  actinides: [],
}));

vi.mock('../../../src/utils/collection/spectrumLoader', () => ({
  getCollectionSpectrum: vi.fn(),
}));

vi.mock('../../../src/utils/element/lookup', () => ({
  getSymbolByNumber: () => null,
}));

const ELEMENT: Element = {
  number: 26,
  symbol: 'Fe',
  mass: '55.845',
  group: 8,
  oldGroup: 'VIIIB',
  row: 4,
  col: 8,
  periodEnd: false,
  color: '#8d6e63',
  category: 'transition',
  inCollection: false,
};

function section(items: DetailSection['items'], id: DetailSection['id'] = 'atomic'): DetailSection {
  return { id, title: 'Atomic', color: '#fff', items };
}

interface Props {
  section: DetailSection;
  element: Element;
  displaySymbol: string;
  elementName: string;
  spectrumOriginHtml: string;
  spectrumSampleLabel?: string;
  oxidationStates: OxidationStateRows | null;
}

function propsFor(overrides: Partial<Props> = {}): Props {
  return {
    section: section([]),
    element: ELEMENT,
    displaySymbol: 'Fe',
    elementName: 'Iron',
    spectrumOriginHtml: '<sup>56</sup>Fe',
    oxidationStates: null,
    ...overrides,
  };
}

function baseProps(overrides: Partial<Props> = {}) {
  // shallow stubs every child by default - TooltipBubble is un-stubbed since its Teleport-rendered
  // bubble content (asserted on directly in the color-swatch hover test) needs to actually render.
  return { props: propsFor(overrides), shallow: true as const, global: { stubs: { TooltipBubble: false } } };
}

describe('ElementSidebarPropList', () => {
  it('renders a mini-table item via ElementMiniTable', () => {
    const wrapper = mountComponent(ElementSidebarPropList, {
      ...baseProps({ section: section([{ label: '', value: '', kind: 'miniTable' }]) }),
    });
    expect(wrapper.findComponent({ name: 'ElementMiniTable' }).exists()).toBe(true);
  });

  it('renders a country-map item via ElementProductionMap, passing mapped country objects', () => {
    const wrapper = mountComponent(ElementSidebarPropList, {
      ...baseProps({
        section: section([{ label: '', value: '', kind: 'countryMap', mapCountries: ['us', 'gb'] }]),
      }),
    });
    expect(wrapper.find('.element-sidebar__prop--country-map').exists()).toBe(true);
  });

  it('renders a country-map item with no countries when mapCountries is omitted', () => {
    const wrapper = mountComponent(ElementSidebarPropList, {
      ...baseProps({ section: section([{ label: '', value: '', kind: 'countryMap' }]) }),
    });
    expect(wrapper.find('.element-sidebar__prop--country-map').exists()).toBe(true);
  });

  it('renders a plain text/value item', () => {
    const wrapper = mountComponent(ElementSidebarPropList, {
      ...baseProps({ section: section([{ label: 'Density', value: '7.87 g/cm³' }]) }),
    });
    expect(wrapper.find('.element-sidebar__prop-label').text()).toBe('Density');
    expect(wrapper.find('.element-sidebar__prop-value').text()).toBe('7.87 g/cm³');
  });

  it('marks an empty item and a label-less item as text-only', () => {
    const wrapper = mountComponent(ElementSidebarPropList, {
      ...baseProps({
        section: section([
          { label: 'Density', value: '—', empty: true },
          { label: '', value: 'Free text description.' },
        ]),
      }),
    });
    const items = wrapper.findAll('.element-sidebar__prop');
    expect(items[0]!.classes()).toContain('element-sidebar__prop--empty');
    expect(items[1]!.classes()).toContain('element-sidebar__prop--text');
  });

  it('renders an image when imageUrl is set', () => {
    const wrapper = mountComponent(ElementSidebarPropList, {
      ...baseProps({ section: section([{ label: 'Spectrum', value: '', imageUrl: '/spec.png' }]) }),
    });
    const img = wrapper.find('.element-sidebar__spectrum-image');
    expect(img.attributes('src')).toBe('/spec.png');
  });

  it('renders CollectionGammaSpectrum when collectionSpectrumId is set', () => {
    const wrapper = mountComponent(ElementSidebarPropList, {
      ...baseProps({
        section: section([{ label: 'Spectrum', value: '', collectionSpectrumId: 'fe-26-1' }]),
      }),
    });
    expect(wrapper.findComponent({ name: 'CollectionGammaSpectrum' }).exists()).toBe(true);
  });

  it('renders a single color swatch for one color', () => {
    const wrapper = mountComponent(ElementSidebarPropList, {
      ...baseProps({
        section: section([{ label: 'Color', value: '', colors: [{ hex: '#c0c0c0', finish: 'metallic' }] }]),
      }),
    });
    const swatch = wrapper.find('.element-sidebar__color-swatch');
    expect(swatch.classes()).toContain('element-sidebar__color-swatch--metallic');
    expect((swatch.element as HTMLElement).style.backgroundColor).toBe('rgb(192, 192, 192)');
    expect(wrapper.find('.element-sidebar__color-swatch--multi').exists()).toBe(false);
  });

  it('defaults a single color swatch to the metallic finish when none is given', () => {
    const wrapper = mountComponent(ElementSidebarPropList, {
      ...baseProps({ section: section([{ label: 'Color', value: '', colors: [{ hex: '#c0c0c0' }] }]) }),
    });
    expect(wrapper.find('.element-sidebar__color-swatch').classes()).toContain(
      'element-sidebar__color-swatch--metallic',
    );
  });

  it('renders multiple color segments with hover/click tooltip handlers for a multi-color item', async () => {
    // Not shallow here: VTU's shallow mode stubs Teleport itself (even inside an explicitly
    // un-stubbed child), which would swallow TooltipBubble's teleported-to-body content. This item
    // type never reaches the CollectionGammaSpectrum/ElementMiniTable branches, so a full mount is safe.
    const wrapper = mountComponent(ElementSidebarPropList, {
      props: propsFor({
        section: section([
          {
            label: 'Color',
            value: '',
            colors: [
              { hex: '#c0c0c0', label: 'Metallic' },
              { hex: '#333333', finish: 'matte', label: 'Oxidized' },
            ],
          },
        ]),
      }),
    });

    const segments = wrapper.findAll('.element-sidebar__color-segment');
    expect(segments).toHaveLength(2);
    expect(segments[0]!.classes()).toContain('element-sidebar__color-swatch--metallic');

    await segments[0]!.trigger('pointerenter', { pointerType: 'mouse' });
    expect(document.body.querySelector('.info-tooltip__bubble')?.textContent).toBe('Metallic');

    await segments[0]!.trigger('pointerleave', { pointerType: 'mouse' });
    expect(document.body.querySelector('.info-tooltip__bubble')).toBeNull();

    await segments[0]!.trigger('click');
    expect(document.body.querySelector('.info-tooltip__bubble')?.textContent).toBe('Metallic');

    document.body.innerHTML = '';
  });

  it('renders an html value via v-html', () => {
    const wrapper = mountComponent(ElementSidebarPropList, {
      ...baseProps({ section: section([{ label: 'Formula', value: '<sup>56</sup>Fe', html: true }]) }),
    });
    expect(wrapper.find('.element-sidebar__prop-value sup').text()).toBe('56');
  });

  it('renders a link for an item with href', () => {
    const wrapper = mountComponent(ElementSidebarPropList, {
      ...baseProps({ section: section([{ label: 'PubChem', value: 'CID 23925', href: 'https://pubchem/23925' }]) }),
    });
    const link = wrapper.find('a.element-sidebar__prop-link');
    expect(link.attributes('href')).toBe('https://pubchem/23925');
    expect(link.text()).toBe('CID 23925');
  });

  it('renders oxidation states only for the atomic section when given', () => {
    const oxidationStates: OxidationStateRows = {
      negative: [{ label: '-2', variant: 'negative' }],
      positive: [{ label: '+3', variant: 'positive' }],
    };
    const wrapper = mountComponent(ElementSidebarPropList, {
      ...baseProps({ oxidationStates, section: section([], 'atomic') }),
    });

    const negativeItem = wrapper.find('.element-sidebar__oxidation-row--negative .element-sidebar__oxidation-item');
    expect(negativeItem.text()).toBe('-2');
    expect(negativeItem.classes()).toContain('element-sidebar__oxidation-item--negative');
  });

  it('renders a literal minus sign for a "-" oxidation label in either row', () => {
    const oxidationStates: OxidationStateRows = {
      negative: [{ label: '-', variant: 'empty' }],
      positive: [{ label: '-', variant: 'empty' }],
    };
    const wrapper = mountComponent(ElementSidebarPropList, {
      ...baseProps({ oxidationStates, section: section([], 'atomic') }),
    });
    const items = wrapper.findAll('.element-sidebar__oxidation-item');
    expect(items[0]!.text()).toBe('−');
    expect(items[1]!.text()).toBe('−');
  });

  it('omits oxidation states outside the atomic section, even when given', () => {
    const oxidationStates: OxidationStateRows = { negative: [{ label: '-2', variant: 'negative' }], positive: [] };
    const wrapper = mountComponent(ElementSidebarPropList, {
      ...baseProps({ oxidationStates, section: section([], 'overview') }),
    });
    expect(wrapper.find('.element-sidebar__oxidation').exists()).toBe(false);
  });

  it('omits oxidation states in the atomic section when null', () => {
    const wrapper = mountComponent(ElementSidebarPropList, {
      ...baseProps({ oxidationStates: null, section: section([], 'atomic') }),
    });
    expect(wrapper.find('.element-sidebar__oxidation').exists()).toBe(false);
  });
});
