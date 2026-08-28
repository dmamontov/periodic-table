import { describe, expect, it } from 'vitest';
import OrnamentDivider from '../../../src/components/layout/OrnamentDivider.vue';
import { mountComponent } from '../../helpers/mountComponent';

describe('OrnamentDivider', () => {
  it('renders as a decorative, hidden-from-assistive-tech element', () => {
    const wrapper = mountComponent(OrnamentDivider);
    expect(wrapper.attributes('aria-hidden')).toBe('true');
    expect(wrapper.findAll('.ornament-divider__line')).toHaveLength(2);
    expect(wrapper.find('.ornament-divider__dot').exists()).toBe(true);
  });
});
