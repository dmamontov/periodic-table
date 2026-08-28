import { describe, expect, it } from 'vitest';
import AppIcon from '../../../src/components/common/AppIcon.vue';
import { mountComponent } from '../../helpers/mountComponent';

describe('AppIcon', () => {
  it('inlines the matching SVG markup for a known icon name', () => {
    const wrapper = mountComponent(AppIcon, { props: { name: 'close' } });
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('renders nothing for an unknown icon name', () => {
    const wrapper = mountComponent(AppIcon, { props: { name: 'does-not-exist' } });
    expect(wrapper.find('svg').exists()).toBe(false);
  });
});
