import { describe, expect, it } from 'vitest';
import FlyoutTrigger from '../../../src/components/common/FlyoutTrigger.vue';
import { mountComponent } from '../../helpers/mountComponent';

describe('FlyoutTrigger', () => {
  it('starts closed with no panel rendered', () => {
    const wrapper = mountComponent(FlyoutTrigger, {
      props: { toggleAriaLabel: 'Menu' },
      slots: { icon: '<span class="icon" />', default: '<p>Panel</p>' },
    });

    expect(wrapper.find('.flyout-trigger__toggle').attributes('aria-expanded')).toBe('false');
    expect(wrapper.find('.flyout-trigger__panel').exists()).toBe(false);
    expect(wrapper.find('.icon').exists()).toBe(true);
  });

  it('opens on toggle click, rendering the panel and emitting open, then closes and emits close', async () => {
    const wrapper = mountComponent(FlyoutTrigger, {
      props: { toggleAriaLabel: 'Menu', flyoutAriaLabel: 'Menu panel' },
      slots: { default: '<p>Panel</p>' },
    });

    await wrapper.find('.flyout-trigger__toggle').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('open')).toHaveLength(1);
    expect(wrapper.classes()).toContain('flyout-trigger--open');
    const panel = wrapper.find('.flyout-trigger__panel');
    expect(panel.exists()).toBe(true);
    expect(panel.attributes('aria-label')).toBe('Menu panel');
    expect(panel.element.tagName).toBe('DIV');

    await wrapper.find('.flyout-trigger__toggle').trigger('click');
    expect(wrapper.emitted('close')).toHaveLength(1);
    expect(wrapper.find('.flyout-trigger__panel').exists()).toBe(false);
  });

  it('closes on Escape while open', async () => {
    const wrapper = mountComponent(FlyoutTrigger, { props: { toggleAriaLabel: 'Menu' } });

    await wrapper.find('.flyout-trigger__toggle').trigger('click');
    await wrapper.trigger('keydown', { key: 'Escape' });

    expect(wrapper.emitted('close')).toHaveLength(1);
  });

  it('ignores non-Escape keys while open', async () => {
    const wrapper = mountComponent(FlyoutTrigger, { props: { toggleAriaLabel: 'Menu' } });

    await wrapper.find('.flyout-trigger__toggle').trigger('click');
    await wrapper.trigger('keydown', { key: 'Enter' });

    expect(wrapper.emitted('close')).toBeUndefined();
    expect(wrapper.find('.flyout-trigger__panel').exists()).toBe(true);
  });

  it('renders the panel with a custom tag when panelTag is given', async () => {
    const wrapper = mountComponent(FlyoutTrigger, { props: { toggleAriaLabel: 'Menu', panelTag: 'nav' } });

    await wrapper.find('.flyout-trigger__toggle').trigger('click');
    expect(wrapper.find('.flyout-trigger__panel').element.tagName).toBe('NAV');
  });

  it('exposes open/close/toggle/isOpen for parent-driven control', async () => {
    const wrapper = mountComponent(FlyoutTrigger, { props: { toggleAriaLabel: 'Menu' } });
    const exposed = wrapper.vm as unknown as {
      isOpen: boolean;
      open: () => void;
      close: () => void;
      toggle: () => void;
    };

    exposed.open();
    await wrapper.vm.$nextTick();
    expect(exposed.isOpen).toBe(true);

    exposed.close();
    await wrapper.vm.$nextTick();
    expect(exposed.isOpen).toBe(false);

    exposed.toggle();
    await wrapper.vm.$nextTick();
    expect(exposed.isOpen).toBe(true);
  });
});
