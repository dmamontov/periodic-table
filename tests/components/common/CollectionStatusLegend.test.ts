import { describe, expect, it } from 'vitest';
import CollectionStatusLegend from '../../../src/components/common/CollectionStatusLegend.vue';
import { CURRENT_COLOR, RETAINED_COLOR, NOT_RETAINED_COLOR } from '../../../src/theme/colors';
import { mountComponent } from '../../helpers/mountComponent';

function hexToRgb(hex: string): string {
  const n = Number.parseInt(hex.slice(1), 16);
  return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`;
}

describe('CollectionStatusLegend', () => {
  it('renders one legend item per status with its own color dot', () => {
    const wrapper = mountComponent(CollectionStatusLegend);
    const items = wrapper.findAll('.collection-status-legend__item');

    expect(items).toHaveLength(3);
    const dots = wrapper.findAll('.collection-status-legend__dot');
    expect((dots[0]!.element as HTMLElement).style.backgroundColor).toBe(hexToRgb(CURRENT_COLOR));
    expect((dots[1]!.element as HTMLElement).style.backgroundColor).toBe(hexToRgb(RETAINED_COLOR));
    expect((dots[2]!.element as HTMLElement).style.backgroundColor).toBe(hexToRgb(NOT_RETAINED_COLOR));
    expect(items.every((item) => item.text().length > 0)).toBe(true);
  });
});
