import { describe, expect, it } from 'vitest';
import CollapsibleSection from '../../../src/components/common/CollapsibleSection.vue';
import { mountComponent } from '../../helpers/mountComponent';

describe('CollapsibleSection', () => {
  it('renders expanded by default, shows the title/body/action slot, and toggles the model on click', async () => {
    const wrapper = mountComponent(CollapsibleSection, {
      props: { title: 'Overview', collapsed: false },
      slots: { default: '<p>Body</p>', action: '<button class="action">Edit</button>' },
    });

    expect(wrapper.classes()).not.toContain('collapsible-section--collapsed');
    expect(wrapper.find('.collapsible-section__title span').text()).toBe('Overview');
    expect(wrapper.attributes('aria-expanded')).toBeUndefined();
    expect(wrapper.find('.collapsible-section__title').attributes('aria-expanded')).toBe('true');
    expect(wrapper.find('.collapsible-section__body').isVisible()).toBe(true);
    expect(wrapper.find('.action').exists()).toBe(true);

    await wrapper.find('.collapsible-section__title').trigger('click');
    expect(wrapper.emitted('update:collapsed')).toEqual([[true]]);
  });

  it('renders collapsed when the model is true, hiding the body', () => {
    const wrapper = mountComponent(CollapsibleSection, {
      props: { title: 'Overview', collapsed: true },
    });

    expect(wrapper.classes()).toContain('collapsible-section--collapsed');
    expect(wrapper.find('.collapsible-section__title').attributes('aria-expanded')).toBe('false');
    expect(wrapper.find('.collapsible-section__body').isVisible()).toBe(false);
  });

  it('applies the given accent color to the title border', () => {
    const wrapper = mountComponent(CollapsibleSection, {
      props: { title: 'Overview', collapsed: false, accentColor: '#ff0000' },
    });

    expect((wrapper.find('.collapsible-section__title').element as HTMLElement).style.borderColor).toBe(
      'rgb(255, 0, 0)',
    );
  });
});
