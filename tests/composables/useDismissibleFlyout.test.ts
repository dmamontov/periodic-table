import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import { useDismissibleFlyout } from '../../src/composables/useDismissibleFlyout';
import { withSetup } from './withSetup';

function makeRootWithParent(parentRect: Partial<DOMRect> = {}) {
  const parent = document.createElement('div');
  parent.getBoundingClientRect = () =>
    ({ top: 40, bottom: 80, left: 10, right: 300, width: 290, height: 40, x: 10, y: 40, ...parentRect }) as DOMRect;
  const root = document.createElement('button');
  parent.appendChild(root);
  document.body.appendChild(parent);
  return root;
}

describe('useDismissibleFlyout', () => {
  beforeEach(() => {
    window.innerWidth = 1024;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('opens, computes position from the parent element on next tick, and calls onOpen', async () => {
    const root = makeRootWithParent();
    const onOpen = vi.fn();
    const [flyout, app] = withSetup(() => useDismissibleFlyout(ref(root), { onOpen }));

    flyout.open();
    expect(flyout.isOpen.value).toBe(true);
    await nextTick();

    expect(flyout.flyoutStyle.value).toEqual({ top: '86px', left: '12px', width: '290px' });
    expect(onOpen).toHaveBeenCalledOnce();

    app.unmount();
  });

  it('clamps the flyout width/left to the viewport', async () => {
    window.innerWidth = 200;
    const root = makeRootWithParent({ left: 10, right: 300, width: 290 });
    const [flyout, app] = withSetup(() => useDismissibleFlyout(ref(root)));

    flyout.open();
    await nextTick();

    expect(flyout.flyoutStyle.value.width).toBe('176px');
    expect(flyout.flyoutStyle.value.left).toBe('12px');

    app.unmount();
  });

  it('does nothing on updateFlyoutPosition when there is no parent element', async () => {
    const root = document.createElement('button');
    const [flyout, app] = withSetup(() => useDismissibleFlyout(ref(root)));

    flyout.open();
    await nextTick();
    expect(flyout.flyoutStyle.value).toEqual({ top: '0px', left: '0px', width: '280px' });

    app.unmount();
  });

  it('closes via close() and calls onClose, and toggle() flips between the two', async () => {
    const root = makeRootWithParent();
    const onClose = vi.fn();
    const [flyout, app] = withSetup(() => useDismissibleFlyout(ref(root), { onClose }));

    flyout.toggle();
    expect(flyout.isOpen.value).toBe(true);
    await nextTick();

    flyout.toggle();
    expect(flyout.isOpen.value).toBe(false);
    expect(onClose).toHaveBeenCalledOnce();

    app.unmount();
  });

  it('closes on outside pointerdown but not inside, and ignores it while already closed', async () => {
    const root = makeRootWithParent();
    const [flyout, app] = withSetup(() => useDismissibleFlyout(ref(root)));

    document.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    expect(flyout.isOpen.value).toBe(false);

    flyout.open();
    await nextTick();

    root.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    expect(flyout.isOpen.value).toBe(true);

    document.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    expect(flyout.isOpen.value).toBe(false);

    app.unmount();
  });

  it('recomputes position on window resize while open, and does nothing while closed', async () => {
    const root = makeRootWithParent();
    const [flyout, app] = withSetup(() => useDismissibleFlyout(ref(root)));

    window.dispatchEvent(new Event('resize'));
    expect(flyout.flyoutStyle.value).toEqual({ top: '0px', left: '0px', width: '280px' });

    flyout.open();
    await nextTick();
    const parent = root.parentElement!;
    parent.getBoundingClientRect = () =>
      ({ top: 100, bottom: 140, left: 5, right: 205, width: 200, height: 40, x: 5, y: 100 }) as DOMRect;
    window.dispatchEvent(new Event('resize'));

    expect(flyout.flyoutStyle.value).toEqual({ top: '146px', left: '12px', width: '200px' });

    app.unmount();
  });

  it('stops listening once the owning component unmounts', () => {
    const root = makeRootWithParent();
    const [flyout, app] = withSetup(() => useDismissibleFlyout(ref(root)));
    app.unmount();

    flyout.open();
    document.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    expect(flyout.isOpen.value).toBe(true);
  });
});
