import { describe, expect, it } from 'vitest';
import ElementSpectrumHeading from '../../../src/components/collection/ElementSpectrumHeading.vue';
import { localeMessages } from '../../../src/locales';
import { CURRENT_COLOR, RETAINED_COLOR, NOT_RETAINED_COLOR } from '../../../src/theme/colors';
import { mountComponent } from '../../helpers/mountComponent';

const BASE_PROPS = { symbol: 'Fe', name: 'Iron', accent: '#8d6e63' };

describe('ElementSpectrumHeading', () => {
  it('renders the symbol/name with the given accent color, and no dot/origin/sample by default', () => {
    const wrapper = mountComponent(ElementSpectrumHeading, { props: BASE_PROPS });

    expect(wrapper.find('.element-spectrum-heading__symbol').text()).toBe('Fe');
    expect((wrapper.find('.element-spectrum-heading__symbol').element as HTMLElement).style.color).toBe(
      'rgb(141, 110, 99)',
    );
    expect(wrapper.find('.element-spectrum-heading__name').text()).toBe('Iron');
    expect(wrapper.find('.element-spectrum-heading__retained-dot').exists()).toBe(false);
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

  it('shows the current-color dot for the current sample', () => {
    const wrapper = mountComponent(ElementSpectrumHeading, { props: { ...BASE_PROPS, isCurrent: true } });
    const dot = wrapper.find('.element-spectrum-heading__retained-dot');

    expect((dot.element as HTMLElement).style.backgroundColor).toBe(hexToRgb(CURRENT_COLOR));
    expect(dot.attributes('title')).toBe(localeMessages.en.sidebar.collectionHistoryCurrent);
  });

  it('shows the retained-color dot for a retained past sample', () => {
    const wrapper = mountComponent(ElementSpectrumHeading, {
      props: { ...BASE_PROPS, isPast: true, retained: true },
    });
    const dot = wrapper.find('.element-spectrum-heading__retained-dot');

    expect((dot.element as HTMLElement).style.backgroundColor).toBe(hexToRgb(RETAINED_COLOR));
    expect(dot.attributes('title')).toBe(localeMessages.en.sidebar.collectionHistoryRetained);
  });

  it('shows the not-retained-color dot for a past sample explicitly marked not retained', () => {
    const wrapper = mountComponent(ElementSpectrumHeading, {
      props: { ...BASE_PROPS, isPast: true, retained: false },
    });
    const dot = wrapper.find('.element-spectrum-heading__retained-dot');

    expect((dot.element as HTMLElement).style.backgroundColor).toBe(hexToRgb(NOT_RETAINED_COLOR));
    expect(dot.attributes('title')).toBe(localeMessages.en.sidebar.collectionHistoryNotRetained);
  });

  it('prefers the current dot over the past dot when both are set', () => {
    const wrapper = mountComponent(ElementSpectrumHeading, {
      props: { ...BASE_PROPS, isCurrent: true, isPast: true },
    });
    expect(wrapper.findAll('.element-spectrum-heading__retained-dot')).toHaveLength(1);
    expect((wrapper.find('.element-spectrum-heading__retained-dot').element as HTMLElement).style.backgroundColor).toBe(
      hexToRgb(CURRENT_COLOR),
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
