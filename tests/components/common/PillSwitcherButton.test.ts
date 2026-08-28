import { describe, expect, it } from 'vitest';
import PillSwitcherButton from '../../../src/components/common/PillSwitcherButton.vue';
import { mountComponent } from '../../helpers/mountComponent';

describe('PillSwitcherButton', () => {
  it('renders inactive by default and emits click', async () => {
    const wrapper = mountComponent(PillSwitcherButton, { slots: { default: 'RU' } });

    expect(wrapper.attributes('aria-pressed')).toBe('false');
    expect(wrapper.classes()).not.toContain('pill-switcher-btn--active');

    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('renders active state and the given aria-label', () => {
    const wrapper = mountComponent(PillSwitcherButton, {
      props: { active: true, ariaLabel: 'Russian' },
    });

    expect(wrapper.attributes('aria-pressed')).toBe('true');
    expect(wrapper.attributes('aria-label')).toBe('Russian');
    expect(wrapper.classes()).toContain('pill-switcher-btn--active');
  });
});
