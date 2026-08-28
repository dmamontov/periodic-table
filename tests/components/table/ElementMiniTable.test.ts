import { describe, expect, it, vi } from 'vitest';
import ElementMiniTable from '../../../src/components/table/ElementMiniTable.vue';
import { mountComponent } from '../../helpers/mountComponent';

// mainElements/lanthanides/actinides are derived from the real elements array (personal collection
// merged in) - mock them with a small synthetic set independent of any real element/collection data.
// `elements: []` is only here because useLocale() (installed by mountComponent) transitively imports
// src/utils/element/lookup.ts, which reads `elements` from this same module at import time.
vi.mock('../../../src/data', () => ({
  elements: [],
  mainElements: [
    { number: 1, row: 1, col: 1, color: '#4caf50' },
    { number: 26, row: 4, col: 8, color: '#8d6e63' },
  ],
  lanthanides: [{ number: 57, row: 8, col: 4, color: '#7e57c2' }],
  actinides: [{ number: 89, row: 9, col: 4, color: '#7e57c2' }],
}));

describe('ElementMiniTable', () => {
  it('renders one dot per main element plus one per lanthanide/actinide', () => {
    const wrapper = mountComponent(ElementMiniTable, { props: { selectedNumber: 1 } });
    expect(wrapper.findAll('.element-mini-table__dot')).toHaveLength(4);
    expect(wrapper.attributes('role')).toBe('img');
  });

  it('marks only the dot matching selectedNumber as active', () => {
    const wrapper = mountComponent(ElementMiniTable, { props: { selectedNumber: 26 } });
    const active = wrapper.findAll('.element-mini-table__dot--active');
    expect(active).toHaveLength(1);
    expect((active[0]!.element as HTMLElement).style.gridColumn).toBe('8');
  });

  it('marks no dot active when selectedNumber matches nothing', () => {
    const wrapper = mountComponent(ElementMiniTable, { props: { selectedNumber: 999 } });
    expect(wrapper.findAll('.element-mini-table__dot--active')).toHaveLength(0);
  });

  it('offsets f-block dot columns by -3 relative to their real grid column', () => {
    const wrapper = mountComponent(ElementMiniTable, { props: { selectedNumber: 57 } });
    const active = wrapper.find('.element-mini-table__dot--active').element as HTMLElement;
    expect(active.style.gridColumn).toBe('1');
  });
});
