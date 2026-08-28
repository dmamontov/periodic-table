import { describe, expect, it } from 'vitest';
import EmptyCell from '../../../src/components/table/EmptyCell.vue';
import { mountComponent } from '../../helpers/mountComponent';

describe('EmptyCell', () => {
  it('positions itself via the given row/col and is hidden from assistive tech', () => {
    const wrapper = mountComponent(EmptyCell, { props: { row: 2, col: 5 } });
    const el = wrapper.element as HTMLElement;

    expect(el.style.gridRow).toBe('2');
    expect(el.style.gridColumn).toBe('5');
    expect(wrapper.attributes('aria-hidden')).toBe('true');
  });

  it('defaults col to 3 when not given', () => {
    const wrapper = mountComponent(EmptyCell, { props: { row: 1 } });
    expect((wrapper.element as HTMLElement).style.gridColumn).toBe('3');
  });
});
