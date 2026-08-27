import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useHoverAnchoredTooltip } from '../../src/composables/useHoverAnchoredTooltip';
import { withSetup } from './withSetup';

function makeEvent(currentTarget: HTMLElement, pointerType: string): PointerEvent {
  const event = new PointerEvent('pointerenter', { bubbles: true }) as PointerEvent & {
    currentTarget: HTMLElement | null;
  };
  Object.defineProperty(event, 'currentTarget', { value: currentTarget });
  Object.defineProperty(event, 'pointerType', { value: pointerType });
  return event;
}

describe('useHoverAnchoredTooltip', () => {
  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => (cb(0), 0) as unknown as number);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows the tooltip anchored to the hovered element with the given label, only for a real mouse', () => {
    const el = document.createElement('span');
    document.body.appendChild(el);
    const [hover, app] = withSetup(() => useHoverAnchoredTooltip());

    hover.showOnMouseHover(makeEvent(el, 'touch'), 'Iron');
    expect(hover.tooltip.isOpen.value).toBe(false);

    hover.showOnMouseHover(makeEvent(el, 'mouse'), 'Iron');
    expect(hover.tooltip.isOpen.value).toBe(true);
    expect(hover.text.value).toBe('Iron');

    app.unmount();
  });

  it('does nothing when show is called without a label', () => {
    const el = document.createElement('span');
    document.body.appendChild(el);
    const [hover, app] = withSetup(() => useHoverAnchoredTooltip());

    hover.showOnMouseHover(makeEvent(el, 'mouse'), undefined);
    expect(hover.tooltip.isOpen.value).toBe(false);

    app.unmount();
  });

  it('hides on real mouse leave but not touch/pen', () => {
    const el = document.createElement('span');
    document.body.appendChild(el);
    const [hover, app] = withSetup(() => useHoverAnchoredTooltip());

    hover.showOnMouseHover(makeEvent(el, 'mouse'), 'Iron');
    hover.hideOnMouseHover(makeEvent(el, 'touch'));
    expect(hover.tooltip.isOpen.value).toBe(true);

    hover.hideOnMouseHover(makeEvent(el, 'mouse'));
    expect(hover.tooltip.isOpen.value).toBe(false);

    app.unmount();
  });

  it('toggle closes the tooltip when re-triggered on the same element, and does nothing without a label', () => {
    const el = document.createElement('span');
    document.body.appendChild(el);
    const [hover, app] = withSetup(() => useHoverAnchoredTooltip());

    hover.toggle(makeEvent(el, 'mouse'), undefined);
    expect(hover.tooltip.isOpen.value).toBe(false);

    hover.toggle(makeEvent(el, 'mouse'), 'Iron');
    expect(hover.tooltip.isOpen.value).toBe(true);

    hover.toggle(makeEvent(el, 'mouse'), 'Iron');
    expect(hover.tooltip.isOpen.value).toBe(false);

    app.unmount();
  });

  it('toggle re-opens with a new label when triggered on a different element while open', () => {
    const elA = document.createElement('span');
    const elB = document.createElement('span');
    document.body.append(elA, elB);
    const [hover, app] = withSetup(() => useHoverAnchoredTooltip());

    hover.toggle(makeEvent(elA, 'mouse'), 'Iron');
    expect(hover.tooltip.isOpen.value).toBe(true);

    hover.toggle(makeEvent(elB, 'mouse'), 'Cobalt');
    expect(hover.tooltip.isOpen.value).toBe(true);
    expect(hover.text.value).toBe('Cobalt');

    app.unmount();
  });
});
