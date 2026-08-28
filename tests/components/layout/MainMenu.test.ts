import { describe, expect, it, vi } from 'vitest';
import MainMenu from '../../../src/components/layout/MainMenu.vue';
import { mountComponent } from '../../helpers/mountComponent';
import { createTestRouter } from '../../helpers/testRouter';

async function setup(path = '/') {
  const router = createTestRouter();
  await router.push(path);
  await router.isReady();

  const wrapper = mountComponent(MainMenu, { global: { plugins: [router] } });
  await wrapper.find('.flyout-trigger__toggle').trigger('click');

  return { wrapper, router };
}

describe('MainMenu', () => {
  it('marks the collection item active only on the collection route', async () => {
    const { wrapper } = await setup('/collection');
    expect(wrapper.find('.main-menu__item').classes()).toContain('main-menu__item--active');
  });

  it('does not mark the collection item active elsewhere', async () => {
    const { wrapper } = await setup('/');
    expect(wrapper.find('.main-menu__item').classes()).not.toContain('main-menu__item--active');
  });

  it('navigates to the collection route and closes the flyout on click', async () => {
    const { wrapper, router } = await setup('/');
    const pushSpy = vi.spyOn(router, 'push');

    await wrapper.find('.main-menu__item').trigger('click');

    expect(pushSpy).toHaveBeenCalledWith({ name: 'collection' });
    expect(wrapper.find('.flyout-trigger__panel').exists()).toBe(false);
  });
});
