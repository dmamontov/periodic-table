import { describe, expect, it } from 'vitest';
import ElementSidebarHeaderLinks from '../../../src/components/element/ElementSidebarHeaderLinks.vue';
import { mountComponent } from '../../helpers/mountComponent';

const BASE_PROPS = {
  variant: 'sticky' as const,
  youtubeUrl: 'https://youtube.com/watch?v=1',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Iron',
  youtubeIcon: '/youtube.svg',
  wikiIcon: '/wiki.svg',
  youtubeLabel: 'YouTube',
  wikipediaLabel: 'Wikipedia',
  shareAriaLabel: 'Share',
  shareCopied: false,
};

describe('ElementSidebarHeaderLinks', () => {
  it('renders nothing when both urls are empty', () => {
    const wrapper = mountComponent(ElementSidebarHeaderLinks, {
      props: { ...BASE_PROPS, youtubeUrl: '', wikipediaUrl: '' },
    });
    expect(wrapper.find('.element-sidebar__header-links').exists()).toBe(false);
  });

  it('renders only the youtube link when wikipedia is missing', () => {
    const wrapper = mountComponent(ElementSidebarHeaderLinks, {
      props: { ...BASE_PROPS, wikipediaUrl: '' },
    });
    const links = wrapper.findAll('a');
    expect(links).toHaveLength(1);
    expect(links[0]!.attributes('href')).toBe(BASE_PROPS.youtubeUrl);
    expect(links[0]!.attributes('aria-label')).toBe('YouTube');
  });

  it('renders both links with correct hrefs/labels when both urls are set', () => {
    const wrapper = mountComponent(ElementSidebarHeaderLinks, { props: BASE_PROPS });
    const links = wrapper.findAll('a');
    expect(links).toHaveLength(2);
    expect(links[1]!.attributes('href')).toBe(BASE_PROPS.wikipediaUrl);
    expect(links[1]!.attributes('aria-label')).toBe('Wikipedia');
  });

  it('adds the sticky-links class for the sticky variant, and on-image link classes for the on-image variant', () => {
    const sticky = mountComponent(ElementSidebarHeaderLinks, { props: BASE_PROPS });
    expect(sticky.find('.element-sidebar__header-links').classes()).toContain('element-sidebar__sticky-links');
    expect(sticky.find('a').classes()).not.toContain('element-sidebar__header-link--on-image');

    const onImage = mountComponent(ElementSidebarHeaderLinks, { props: { ...BASE_PROPS, variant: 'on-image' } });
    expect(onImage.find('.element-sidebar__header-links').classes()).not.toContain('element-sidebar__sticky-links');
    expect(onImage.find('a').classes()).toContain('element-sidebar__header-link--on-image');
  });

  it('emits share and swaps the share icon for a check icon once copied', async () => {
    const wrapper = mountComponent(ElementSidebarHeaderLinks, { props: BASE_PROPS });
    const button = wrapper.find('button.element-sidebar__header-link--share');

    await button.trigger('click');
    expect(wrapper.emitted('share')).toHaveLength(1);
    expect(wrapper.find('svg').exists()).toBe(true);

    const copiedWrapper = mountComponent(ElementSidebarHeaderLinks, { props: { ...BASE_PROPS, shareCopied: true } });
    expect(copiedWrapper.find('svg').exists()).toBe(true);
  });

  it('applies the given shareIconColor to the icon style', () => {
    const wrapper = mountComponent(ElementSidebarHeaderLinks, {
      props: { ...BASE_PROPS, shareIconColor: '#00ff00' },
    });
    const icon = wrapper.find('.element-sidebar__header-link-icon--share');
    expect((icon.element as HTMLElement).style.color).toBe('rgb(0, 255, 0)');
  });

  it('omits the inline color style when shareIconColor is not given', () => {
    const wrapper = mountComponent(ElementSidebarHeaderLinks, { props: BASE_PROPS });
    const icon = wrapper.find('.element-sidebar__header-link-icon--share');
    expect((icon.element as HTMLElement).style.color).toBe('');
  });
});
