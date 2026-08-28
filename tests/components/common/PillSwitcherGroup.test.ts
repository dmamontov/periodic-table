import { describe, expect, it } from 'vitest';
import PillSwitcherGroup from '../../../src/components/common/PillSwitcherGroup.vue';
import { mountComponent } from '../../helpers/mountComponent';

describe('PillSwitcherGroup', () => {
  it('renders the slot content inside a group role with the given aria-label', () => {
    const wrapper = mountComponent(PillSwitcherGroup, {
      props: { ariaLabel: 'Theme' },
      slots: { default: '<button>A</button>' },
    });

    expect(wrapper.attributes('role')).toBe('group');
    expect(wrapper.attributes('aria-label')).toBe('Theme');
    expect(wrapper.find('button').text()).toBe('A');
  });

  it('omits the aria-label attribute when none is given', () => {
    const wrapper = mountComponent(PillSwitcherGroup);
    expect(wrapper.attributes('aria-label')).toBeUndefined();
  });
});
