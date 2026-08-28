import { describe, expect, it } from 'vitest';
import CloseButton from '../../../src/components/common/CloseButton.vue';
import { mountComponent } from '../../helpers/mountComponent';

describe('CloseButton', () => {
  it('renders the given aria-label and emits click', async () => {
    const wrapper = mountComponent(CloseButton, { props: { ariaLabel: 'Close' } });

    expect(wrapper.attributes('aria-label')).toBe('Close');
    expect(wrapper.find('svg').exists()).toBe(true);

    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });
});
