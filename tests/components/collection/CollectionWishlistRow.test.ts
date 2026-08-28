import { afterEach, describe, expect, it } from 'vitest';
import CollectionWishlistRow from '../../../src/components/collection/CollectionWishlistRow.vue';
import { localeMessages } from '../../../src/locales';
import { mountComponent } from '../../helpers/mountComponent';

afterEach(() => {
  document.body.innerHTML = '';
});

const BASE_PROPS = {
  symbol: 'Np',
  name: 'Neptunium',
  color: '#66bb6a',
  originHtml: '<sup>237</sup>Np',
  description: 'Sealed source',
};

describe('CollectionWishlistRow', () => {
  it('renders the element heading and description text', () => {
    const wrapper = mountComponent(CollectionWishlistRow, { props: BASE_PROPS });
    expect(wrapper.find('.element-spectrum-heading__symbol').text()).toBe('Np');
    expect(wrapper.find('.collection-wishlist-row__sample').text()).toBe('Sealed source');
    expect(wrapper.find('a').exists()).toBe(false);
  });

  it('renders the description as a link with an arrow when a link is given', () => {
    const wrapper = mountComponent(CollectionWishlistRow, {
      props: { ...BASE_PROPS, link: 'https://example.com/np' },
    });
    const link = wrapper.find('a.collection-wishlist-row__sample--link');
    expect(link.attributes('href')).toBe('https://example.com/np');
    expect(link.text()).toBe('Sealed source ↗');
  });

  it('emits open when the element heading button is clicked', async () => {
    const wrapper = mountComponent(CollectionWishlistRow, { props: BASE_PROPS });
    await wrapper.find('.collection-wishlist-row__element').trigger('click');
    expect(wrapper.emitted('open')).toHaveLength(1);
  });

  it('omits the upgrade icon by default, and shows it with a tooltip when upgrade is true', async () => {
    const wrapper = mountComponent(CollectionWishlistRow, { props: BASE_PROPS });
    expect(wrapper.findAll('.collection-wishlist-row__icon')).toHaveLength(1);

    const upgradeWrapper = mountComponent(CollectionWishlistRow, { props: { ...BASE_PROPS, upgrade: true } });
    const icons = upgradeWrapper.findAll('.collection-wishlist-row__icon');
    expect(icons).toHaveLength(2);

    await icons[0]!.trigger('pointerenter', { pointerType: 'mouse' });
    expect(document.body.querySelector('.info-tooltip__bubble')?.textContent).toBe(
      localeMessages.en.collectionPanel.wishlistUpgradeBadge,
    );

    await icons[0]!.trigger('pointerleave', { pointerType: 'mouse' });
    expect(document.body.querySelector('.info-tooltip__bubble')).toBeNull();
  });

  it('toggles the upgrade tooltip on click', async () => {
    const wrapper = mountComponent(CollectionWishlistRow, { props: { ...BASE_PROPS, upgrade: true } });
    const upgradeIcon = wrapper.findAll('.collection-wishlist-row__icon')[0]!;

    await upgradeIcon.trigger('click');
    expect(document.body.querySelector('.info-tooltip__bubble')).not.toBeNull();

    await upgradeIcon.trigger('click');
    expect(document.body.querySelector('.info-tooltip__bubble')).toBeNull();
  });

  it('shows the "want" status by default with a star icon', async () => {
    const wrapper = mountComponent(CollectionWishlistRow, { props: BASE_PROPS });
    const statusIcon = wrapper.find('.collection-wishlist-row__icon');
    expect(statusIcon.find('svg').exists()).toBe(true);

    await statusIcon.trigger('pointerenter', { pointerType: 'mouse' });
    expect(document.body.querySelector('.info-tooltip__bubble')?.textContent).toBe(
      localeMessages.en.collectionPanel.wishlistStatusWant,
    );

    await statusIcon.trigger('pointerleave', { pointerType: 'mouse' });
    expect(document.body.querySelector('.info-tooltip__bubble')).toBeNull();
  });

  it('shows the "ordered" status label on hover', async () => {
    const wrapper = mountComponent(CollectionWishlistRow, { props: { ...BASE_PROPS, status: 'ordered' } });
    await wrapper.find('.collection-wishlist-row__icon').trigger('pointerenter', { pointerType: 'mouse' });
    expect(document.body.querySelector('.info-tooltip__bubble')?.textContent).toBe(
      localeMessages.en.collectionPanel.wishlistStatusOrdered,
    );
  });

  it('shows the "shipping" status label on hover', async () => {
    const wrapper = mountComponent(CollectionWishlistRow, { props: { ...BASE_PROPS, status: 'shipping' } });
    await wrapper.find('.collection-wishlist-row__icon').trigger('pointerenter', { pointerType: 'mouse' });
    expect(document.body.querySelector('.info-tooltip__bubble')?.textContent).toBe(
      localeMessages.en.collectionPanel.wishlistStatusShipping,
    );
  });

  it('toggles the status tooltip on click', async () => {
    const wrapper = mountComponent(CollectionWishlistRow, { props: BASE_PROPS });
    const statusIcon = wrapper.find('.collection-wishlist-row__icon');

    await statusIcon.trigger('click');
    expect(document.body.querySelector('.info-tooltip__bubble')).not.toBeNull();

    await statusIcon.trigger('click');
    expect(document.body.querySelector('.info-tooltip__bubble')).toBeNull();
  });
});
