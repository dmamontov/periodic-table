import { describe, expect, it } from 'vitest';
import ElementSpectrumHeading from '../../../src/components/collection/ElementSpectrumHeading.vue';
import { localeMessages } from '../../../src/locales';
import { CURRENT_COLOR, RETAINED_COLOR, NOT_RETAINED_COLOR, ALTERNATE_COLOR } from '../../../src/theme/colors';
import { mountComponent } from '../../helpers/mountComponent';

const BASE_PROPS = { symbol: 'Fe', name: 'Iron', accent: '#8d6e63' };

describe('ElementSpectrumHeading', () => {
  it('renders the symbol/name with the given accent color, and no dot/badge/origin/sample by default', () => {
    const wrapper = mountComponent(ElementSpectrumHeading, { props: BASE_PROPS });

    expect(wrapper.find('.element-spectrum-heading__symbol').text()).toBe('Fe');
    expect((wrapper.find('.element-spectrum-heading__symbol').element as HTMLElement).style.color).toBe(
      'rgb(141, 110, 99)',
    );
    expect(wrapper.find('.element-spectrum-heading__name').text()).toBe('Iron');
    expect(wrapper.find('.element-spectrum-heading__retained-dot').exists()).toBe(false);
    expect(wrapper.find('.element-spectrum-heading__badge').exists()).toBe(false);
    expect(wrapper.find('.element-spectrum-heading__origin').exists()).toBe(false);
    expect(wrapper.find('.element-spectrum-heading__sample').exists()).toBe(false);
  });

  it('shows the origin html and sample label when given', () => {
    const wrapper = mountComponent(ElementSpectrumHeading, {
      props: { ...BASE_PROPS, originHtml: '<sup>56</sup>Fe', sampleLabel: 'Ampoule' },
    });

    expect(wrapper.find('.element-spectrum-heading__origin sup').text()).toBe('56');
    expect(wrapper.find('.element-spectrum-heading__sample').text()).toBe('Ampoule');
  });

  it('shows the current-color dot, and no badge, for the current sample', () => {
    const wrapper = mountComponent(ElementSpectrumHeading, { props: { ...BASE_PROPS, isCurrent: true } });
    const dot = wrapper.find('.element-spectrum-heading__retained-dot');

    expect((dot.element as HTMLElement).style.backgroundColor).toBe(hexToRgb(CURRENT_COLOR));
    expect(dot.attributes('title')).toBe(localeMessages.en.sidebar.collectionHistoryCurrent);
    expect(wrapper.find('.element-spectrum-heading__badge').exists()).toBe(false);
  });

  it('shows the retained-color dot and an Archive badge for a retained past sample', () => {
    const wrapper = mountComponent(ElementSpectrumHeading, {
      props: { ...BASE_PROPS, isPast: true, retained: true },
    });
    const dot = wrapper.find('.element-spectrum-heading__retained-dot');

    expect((dot.element as HTMLElement).style.backgroundColor).toBe(hexToRgb(RETAINED_COLOR));
    expect(dot.attributes('title')).toBe(localeMessages.en.sidebar.collectionHistoryRetained);
    expect(wrapper.find('.element-spectrum-heading__badge').text()).toBe(
      localeMessages.en.sidebar.collectionHistoryArchive,
    );
  });

  it('shows the not-retained-color dot and an Archive badge for a past sample explicitly marked not retained', () => {
    const wrapper = mountComponent(ElementSpectrumHeading, {
      props: { ...BASE_PROPS, isPast: true, retained: false },
    });
    const dot = wrapper.find('.element-spectrum-heading__retained-dot');

    expect((dot.element as HTMLElement).style.backgroundColor).toBe(hexToRgb(NOT_RETAINED_COLOR));
    expect(dot.attributes('title')).toBe(localeMessages.en.sidebar.collectionHistoryNotRetained);
    expect(wrapper.find('.element-spectrum-heading__badge').text()).toBe(
      localeMessages.en.sidebar.collectionHistoryArchive,
    );
  });

  it('shows the retained-status dot (not a distinct color) and an Alternate badge for an alternate sample', () => {
    const wrapper = mountComponent(ElementSpectrumHeading, {
      props: { ...BASE_PROPS, isAlternate: true, retained: false },
    });
    const dot = wrapper.find('.element-spectrum-heading__retained-dot');

    // The dot only ever encodes kept/not-kept/current - never the archive-vs-alternate category.
    expect((dot.element as HTMLElement).style.backgroundColor).toBe(hexToRgb(NOT_RETAINED_COLOR));
    expect(dot.attributes('title')).toBe(localeMessages.en.sidebar.collectionHistoryNotRetained);
    expect(wrapper.find('.element-spectrum-heading__badge').text()).toBe(
      localeMessages.en.sidebar.collectionHistoryAlternate,
    );
    expect((wrapper.find('.element-spectrum-heading__badge').element as HTMLElement).style.color).toBe(
      hexToRgb(ALTERNATE_COLOR),
    );
  });

  it('prefers the current dot/no-badge over the alternate badge when both are set', () => {
    const wrapper = mountComponent(ElementSpectrumHeading, {
      props: { ...BASE_PROPS, isCurrent: true, isAlternate: true, isPast: true },
    });
    expect(wrapper.findAll('.element-spectrum-heading__retained-dot')).toHaveLength(1);
    expect((wrapper.find('.element-spectrum-heading__retained-dot').element as HTMLElement).style.backgroundColor).toBe(
      hexToRgb(CURRENT_COLOR),
    );
    expect(wrapper.find('.element-spectrum-heading__badge').exists()).toBe(false);
  });

  it('prefers the alternate badge over the archive badge when both isAlternate and isPast are set', () => {
    const wrapper = mountComponent(ElementSpectrumHeading, {
      props: { ...BASE_PROPS, isAlternate: true, isPast: true },
    });
    expect(wrapper.findAll('.element-spectrum-heading__badge')).toHaveLength(1);
    expect(wrapper.find('.element-spectrum-heading__badge').text()).toBe(
      localeMessages.en.sidebar.collectionHistoryAlternate,
    );
  });

  it('applies the compact modifier class when compact is set', () => {
    const wrapper = mountComponent(ElementSpectrumHeading, { props: { ...BASE_PROPS, compact: true } });
    expect(wrapper.classes()).toContain('element-spectrum-heading--compact');
  });
});

function hexToRgb(hex: string): string {
  const n = Number.parseInt(hex.slice(1), 16);
  return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`;
}
