import { afterEach, describe, expect, it, vi } from 'vitest';
import ElementSearch from '../../../src/components/layout/ElementSearch.vue';
import { mountComponent } from '../../helpers/mountComponent';
import { createTestRouter } from '../../helpers/testRouter';

// vi.mock is hoisted above imports, so the fixture must be loaded via a dynamic import inside the factory
// rather than a top-level import binding (which would still be in its TDZ when the factory runs).
vi.mock('../../../src/data', async () => {
  const { MOCK_ELEMENTS } = await import('../../helpers/elementFixtures');
  return {
    elements: MOCK_ELEMENTS,
    getElementRouteSymbol: (symbol: string) => symbol.toLowerCase(),
  };
});

afterEach(() => {
  document.body.innerHTML = '';
});

async function setup() {
  const router = createTestRouter();
  await router.push('/');
  await router.isReady();

  const wrapper = mountComponent(ElementSearch, { global: { plugins: [router] } });
  await wrapper.find('.flyout-trigger__toggle').trigger('click');
  const input = wrapper.find('input');

  return { router, wrapper, input };
}

describe('ElementSearch', () => {
  it('shows no results panel until a query is typed', async () => {
    const { wrapper } = await setup();
    expect(wrapper.find('.element-search__panel').exists()).toBe(false);
  });

  it('lists matching elements by symbol and shows an empty message for no matches', async () => {
    const { wrapper, input } = await setup();

    await input.setValue('Fe');
    const results = wrapper.findAll('.element-search__result');
    expect(results).toHaveLength(1);
    expect(results[0]!.text()).toContain('Fe');

    await input.setValue('zzz');
    expect(wrapper.find('.element-search__result').exists()).toBe(false);
    expect(wrapper.find('.element-search__empty').exists()).toBe(true);
  });

  it('navigates to the element route and closes the flyout on selecting a result by click', async () => {
    const { wrapper, input, router } = await setup();
    const pushSpy = vi.spyOn(router, 'push');

    await input.setValue('Fe');
    await wrapper.find('.element-search__result').trigger('click');

    expect(pushSpy).toHaveBeenCalledWith({ name: 'element', params: { symbol: 'fe' } });
    expect(wrapper.find('.flyout-trigger__panel').exists()).toBe(false);
  });

  it('moves the active result with ArrowDown/ArrowUp, wrapping around', async () => {
    const { wrapper, input } = await setup();
    await input.setValue('e');

    const activeSymbol = () => wrapper.find('.element-search__result--active').text();

    await input.trigger('keydown', { key: 'ArrowDown' });
    const afterFirstDown = activeSymbol();

    await input.trigger('keydown', { key: 'ArrowUp' });
    expect(activeSymbol()).not.toBe(afterFirstDown);
  });

  it('does nothing on ArrowDown/ArrowUp when there are no results', async () => {
    const { wrapper, input } = await setup();

    await input.trigger('keydown', { key: 'ArrowDown' });
    await input.trigger('keydown', { key: 'ArrowUp' });

    expect(wrapper.find('.element-search__result--active').exists()).toBe(false);
  });

  it('ignores keys other than the handled ones', async () => {
    const { wrapper, input, router } = await setup();
    const pushSpy = vi.spyOn(router, 'push');

    await input.setValue('Fe');
    await input.trigger('keydown', { key: 'a' });

    expect(pushSpy).not.toHaveBeenCalled();
    expect(wrapper.find('.flyout-trigger__panel').exists()).toBe(true);
  });

  it('activates a result on mouseenter', async () => {
    const { wrapper, input } = await setup();
    await input.setValue('e');

    const results = wrapper.findAll('.element-search__result');
    await results[1]!.trigger('mouseenter');

    expect(results[1]!.classes()).toContain('element-search__result--active');
  });

  it('selects the active result on Enter', async () => {
    const { input, router } = await setup();
    const pushSpy = vi.spyOn(router, 'push');

    await input.setValue('Fe');
    await input.trigger('keydown', { key: 'Enter' });

    expect(pushSpy).toHaveBeenCalledWith({ name: 'element', params: { symbol: 'fe' } });
  });

  it('does nothing on Enter when there are no results', async () => {
    const { input, router } = await setup();
    const pushSpy = vi.spyOn(router, 'push');

    await input.setValue('zzz');
    await input.trigger('keydown', { key: 'Enter' });

    expect(pushSpy).not.toHaveBeenCalled();
  });

  it('closes and blurs the input on Escape', async () => {
    const { wrapper, input } = await setup();
    await input.trigger('keydown', { key: 'Escape' });
    expect(wrapper.find('.flyout-trigger__panel').exists()).toBe(false);
  });

  it('clears the query when the flyout closes', async () => {
    const { wrapper, input } = await setup();
    await input.setValue('Fe');
    expect((input.element as HTMLInputElement).value).toBe('Fe');

    await wrapper.find('.flyout-trigger__toggle').trigger('click');
    await wrapper.find('.flyout-trigger__toggle').trigger('click');
    const reopenedInput = wrapper.find('input');
    expect((reopenedInput.element as HTMLInputElement).value).toBe('');
  });

  it('opens the flyout on the global "/" shortcut from a plain, non-typing target', async () => {
    const router = createTestRouter();
    await router.push('/');
    await router.isReady();
    const wrapper = mountComponent(ElementSearch, { global: { plugins: [router] } });

    document.dispatchEvent(new KeyboardEvent('keydown', { key: '/', bubbles: true }));
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.flyout-trigger__panel').exists()).toBe(true);
  });

  it('ignores a different key even from a non-typing target', async () => {
    const router = createTestRouter();
    await router.push('/');
    await router.isReady();
    const wrapper = mountComponent(ElementSearch, { global: { plugins: [router] } });

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.flyout-trigger__panel').exists()).toBe(false);
  });

  it.each([
    ['metaKey', { key: '/', metaKey: true, bubbles: true }],
    ['ctrlKey', { key: '/', ctrlKey: true, bubbles: true }],
    ['altKey', { key: '/', altKey: true, bubbles: true }],
  ])('ignores "/" with %s held', async (_name, eventInit) => {
    const router = createTestRouter();
    await router.push('/');
    await router.isReady();
    const wrapper = mountComponent(ElementSearch, { global: { plugins: [router] } });

    document.dispatchEvent(new KeyboardEvent('keydown', eventInit));
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.flyout-trigger__panel').exists()).toBe(false);
  });

  it.each([
    ['INPUT', () => document.createElement('input')],
    ['TEXTAREA', () => document.createElement('textarea')],
    ['SELECT', () => document.createElement('select')],
  ])('ignores the "/" shortcut while typing in a %s', async (_tag, makeTarget) => {
    const router = createTestRouter();
    await router.push('/');
    await router.isReady();
    const wrapper = mountComponent(ElementSearch, { global: { plugins: [router] } });

    const target = makeTarget();
    document.body.appendChild(target);
    target.dispatchEvent(new KeyboardEvent('keydown', { key: '/', bubbles: true }));
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.flyout-trigger__panel').exists()).toBe(false);
  });

  it('ignores the "/" shortcut inside a contenteditable element', async () => {
    const router = createTestRouter();
    await router.push('/');
    await router.isReady();
    const wrapper = mountComponent(ElementSearch, { global: { plugins: [router] } });

    // jsdom's contentEditable setter doesn't drive isContentEditable's getter, so it's stubbed directly.
    const editable = document.createElement('div');
    Object.defineProperty(editable, 'isContentEditable', { value: true });
    document.body.appendChild(editable);
    editable.dispatchEvent(new KeyboardEvent('keydown', { key: '/', bubbles: true }));
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.flyout-trigger__panel').exists()).toBe(false);
  });

  it('removes the global keydown listener on unmount', async () => {
    const { wrapper } = await setup();
    const removeSpy = vi.spyOn(document, 'removeEventListener');

    wrapper.unmount();

    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });
});
