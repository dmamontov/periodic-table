import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import { useDismissibleTooltip } from '../../src/composables/useDismissibleTooltip';
import { withSetup } from './withSetup';

function makeRoot(rect: Partial<DOMRect> = {}) {
  const el = document.createElement('button');
  el.getBoundingClientRect = () =>
    ({ top: 100, bottom: 120, left: 200, right: 260, width: 60, height: 20, x: 200, y: 100, ...rect }) as DOMRect;
  document.body.appendChild(el);
  return el;
}

function pointerDownOutside() {
  document.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
}

describe('useDismissibleTooltip', () => {
  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => (cb(0), 0) as unknown as number);
    window.innerWidth = 1024;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = '';
  });

  it('opens and positions the bubble below the anchor, clamped away from the viewport edges', () => {
    const root = makeRoot();
    const [tooltip, app] = withSetup(() => useDismissibleTooltip(ref(root)));

    tooltip.open();

    expect(tooltip.isOpen.value).toBe(true);
    expect(tooltip.style.value.top).toBe('126px');
    expect(tooltip.style.value.left).toBe('230px');

    app.unmount();
  });

  it('clamps the bubble to the left/right viewport edges using the real bubble width when known', () => {
    const root = makeRoot({ left: -100, right: -40, width: 60 });
    const [tooltip, app] = withSetup(() => useDismissibleTooltip(ref(root)));

    const bubble = document.createElement('div');
    bubble.getBoundingClientRect = () => ({ width: 100 }) as DOMRect;
    tooltip.bubbleEl.value = bubble;

    tooltip.open();
    expect(tooltip.style.value.left).toBe('58px');

    app.unmount();
  });

  it('clamps to the right edge when the anchor sits past the viewport', () => {
    const root = makeRoot({ left: 2000, right: 2060, width: 60 });
    const [tooltip, app] = withSetup(() => useDismissibleTooltip(ref(root)));

    tooltip.open();
    expect(tooltip.style.value.left).toBe(`${1024 - 120 - 8}px`);

    app.unmount();
  });

  it('does nothing on open() when the anchor has no bounding rect yet', () => {
    const rootRef = ref<HTMLElement | null>(null);
    const [tooltip, app] = withSetup(() => useDismissibleTooltip(rootRef));

    tooltip.open();
    expect(tooltip.style.value).toEqual({ top: '0px', left: '0px' });

    app.unmount();
  });

  it('closes via close() and toggle()', () => {
    const root = makeRoot();
    const [tooltip, app] = withSetup(() => useDismissibleTooltip(ref(root)));

    tooltip.toggle();
    expect(tooltip.isOpen.value).toBe(true);
    tooltip.toggle();
    expect(tooltip.isOpen.value).toBe(false);

    tooltip.open();
    tooltip.close();
    expect(tooltip.isOpen.value).toBe(false);

    app.unmount();
  });

  it('closes on an outside pointerdown but not an inside one', () => {
    const root = makeRoot();
    const [tooltip, app] = withSetup(() => useDismissibleTooltip(ref(root)));

    tooltip.open();
    root.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    expect(tooltip.isOpen.value).toBe(true);

    pointerDownOutside();
    expect(tooltip.isOpen.value).toBe(false);

    app.unmount();
  });

  it('ignores outside pointerdown while already closed', () => {
    const root = makeRoot();
    const [tooltip, app] = withSetup(() => useDismissibleTooltip(ref(root)));

    expect(tooltip.isOpen.value).toBe(false);
    pointerDownOutside();
    expect(tooltip.isOpen.value).toBe(false);

    app.unmount();
  });

  it('closes on Escape via onKeydown, ignores other keys', () => {
    const root = makeRoot();
    const [tooltip, app] = withSetup(() => useDismissibleTooltip(ref(root)));

    tooltip.open();
    tooltip.onKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(tooltip.isOpen.value).toBe(true);

    tooltip.onKeydown(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(tooltip.isOpen.value).toBe(false);

    app.unmount();
  });

  it('opens/closes on real mouse pointer enter/leave but not touch/pen', () => {
    const root = makeRoot();
    const [tooltip, app] = withSetup(() => useDismissibleTooltip(ref(root)));

    tooltip.onPointerEnter({ pointerType: 'touch' } as PointerEvent);
    expect(tooltip.isOpen.value).toBe(false);

    tooltip.onPointerEnter({ pointerType: 'mouse' } as PointerEvent);
    expect(tooltip.isOpen.value).toBe(true);

    tooltip.onPointerLeave({ pointerType: 'touch' } as PointerEvent);
    expect(tooltip.isOpen.value).toBe(true);

    tooltip.onPointerLeave({ pointerType: 'mouse' } as PointerEvent);
    expect(tooltip.isOpen.value).toBe(false);

    app.unmount();
  });

  it('repositions on resize/scroll while open, and does nothing while closed', () => {
    const root = makeRoot();
    const [tooltip, app] = withSetup(() => useDismissibleTooltip(ref(root)));

    window.dispatchEvent(new Event('resize'));
    expect(tooltip.style.value).toEqual({ top: '0px', left: '0px' });

    tooltip.open();
    root.getBoundingClientRect = () =>
      ({ top: 300, bottom: 320, left: 400, right: 460, width: 60, height: 20, x: 400, y: 300 }) as DOMRect;
    window.dispatchEvent(new Event('resize'));
    expect(tooltip.style.value.top).toBe('326px');

    root.getBoundingClientRect = () =>
      ({ top: 10, bottom: 30, left: 5, right: 65, width: 60, height: 20, x: 5, y: 10 }) as DOMRect;
    window.dispatchEvent(new Event('scroll'));
    expect(tooltip.style.value.top).toBe('36px');

    app.unmount();
  });

  it('stops listening once the owning component unmounts', () => {
    const root = makeRoot();
    const [tooltip, app] = withSetup(() => useDismissibleTooltip(ref(root)));
    app.unmount();

    tooltip.open();
    pointerDownOutside();
    expect(tooltip.isOpen.value).toBe(true);
  });
});
