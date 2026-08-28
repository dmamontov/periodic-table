import { describe, expect, it } from 'vitest';
import Badge from '../../../src/components/common/Badge.vue';
import { mountComponent } from '../../helpers/mountComponent';

describe('Badge', () => {
  it('renders the slot content and applies the given color as background', () => {
    const wrapper = mountComponent(Badge, {
      props: { color: '#ff0000' },
      slots: { default: 'Fe' },
    });

    expect(wrapper.text()).toBe('Fe');
    expect((wrapper.element as HTMLElement).style.backgroundColor).toBe('rgb(255, 0, 0)');
  });
});
