import { afterEach, describe, expect, it, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import { useModalFocusTrap } from '../../src/composables/useModalFocusTrap';
import { withSetup } from '../helpers/withSetup';

/** jsdom has no layout engine, so `offsetParent` is always null - stub it to mark an element as "visible" for the composable's focusableElements() filter. */
function makeVisible(el: HTMLElement) {
  Object.defineProperty(el, 'offsetParent', { value: document.body, configurable: true });
}

function makePanel() {
  const trigger = document.createElement('button');
  trigger.textContent = 'open';
  document.body.appendChild(trigger);
  trigger.focus();

  const panel = document.createElement('div');
  panel.innerHTML = '<button id="first">First</button><button id="second">Second</button>';
  document.body.appendChild(panel);
  const first = panel.querySelector<HTMLElement>('#first')!;
  const second = panel.querySelector<HTMLElement>('#second')!;
  makeVisible(first);
  makeVisible(second);

  return { trigger, panel, first, second };
}

describe('useModalFocusTrap', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('focuses the first focusable element on open, and restores prior focus on close', async () => {
    const { trigger, panel, first } = makePanel();
    const isOpen = ref(false);
    const panelRef = ref<HTMLElement | null>(panel);
    const onClose = vi.fn();
    const [, app] = withSetup(() => useModalFocusTrap(isOpen, panelRef, onClose));

    isOpen.value = true;
    await nextTick();
    await nextTick();
    expect(document.activeElement).toBe(first);

    isOpen.value = false;
    await nextTick();
    expect(document.activeElement).toBe(trigger);

    app.unmount();
  });

  it('falls back to focusing the panel itself when it has no focusable children', async () => {
    const panel = document.createElement('div');
    panel.tabIndex = -1;
    document.body.appendChild(panel);
    const isOpen = ref(false);
    const [, app] = withSetup(() => useModalFocusTrap(isOpen, ref(panel), vi.fn()));

    isOpen.value = true;
    await nextTick();
    await nextTick();
    expect(document.activeElement).toBe(panel);

    app.unmount();
  });

  it('does nothing on open when the panel ref is null', async () => {
    const isOpen = ref(false);
    const [, app] = withSetup(() => useModalFocusTrap(isOpen, ref(null), vi.fn()));

    isOpen.value = true;
    await nextTick();
    await nextTick();
    expect(document.activeElement).toBe(document.body);

    app.unmount();
  });

  it('closes on Escape while open', async () => {
    const { panel } = makePanel();
    const isOpen = ref(false);
    const onClose = vi.fn();
    withSetup(() => useModalFocusTrap(isOpen, ref(panel), onClose));

    isOpen.value = true;
    await nextTick();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('ignores non-Tab, non-Escape keys', async () => {
    const { panel } = makePanel();
    const isOpen = ref(false);
    const onClose = vi.fn();
    withSetup(() => useModalFocusTrap(isOpen, ref(panel), onClose));

    isOpen.value = true;
    await nextTick();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('wraps Tab from the last focusable element to the first', async () => {
    const { panel, first, second } = makePanel();
    const isOpen = ref(false);
    withSetup(() => useModalFocusTrap(isOpen, ref(panel), vi.fn()));

    isOpen.value = true;
    await nextTick();
    second.focus();
    const event = new KeyboardEvent('keydown', { key: 'Tab', cancelable: true });
    window.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(first);
  });

  it('wraps Shift+Tab from the first focusable element to the last', async () => {
    const { panel, first, second } = makePanel();
    const isOpen = ref(false);
    withSetup(() => useModalFocusTrap(isOpen, ref(panel), vi.fn()));

    isOpen.value = true;
    await nextTick();
    first.focus();
    const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, cancelable: true });
    window.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(second);
  });

  it('does not intercept Tab when focus is in the middle of the panel', async () => {
    const panel = document.createElement('div');
    panel.innerHTML = '<button id="a">A</button><button id="b">B</button><button id="c">C</button>';
    document.body.appendChild(panel);
    const a = panel.querySelector<HTMLElement>('#a')!;
    const b = panel.querySelector<HTMLElement>('#b')!;
    const c = panel.querySelector<HTMLElement>('#c')!;
    makeVisible(a);
    makeVisible(b);
    makeVisible(c);
    const isOpen = ref(false);
    withSetup(() => useModalFocusTrap(isOpen, ref(panel), vi.fn()));

    isOpen.value = true;
    await nextTick();
    b.focus();
    const event = new KeyboardEvent('keydown', { key: 'Tab', cancelable: true });
    window.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  });

  it('does nothing on Tab when the panel has no focusable elements', async () => {
    const panel = document.createElement('div');
    document.body.appendChild(panel);
    const isOpen = ref(false);
    withSetup(() => useModalFocusTrap(isOpen, ref(panel), vi.fn()));

    isOpen.value = true;
    await nextTick();
    const event = new KeyboardEvent('keydown', { key: 'Tab', cancelable: true });
    window.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  });

  it('skips focusable elements hidden via display:none (no offsetParent)', async () => {
    const panel = document.createElement('div');
    panel.innerHTML = '<button id="hidden" style="display:none">Hidden</button><button id="visible">Visible</button>';
    document.body.appendChild(panel);
    makeVisible(panel.querySelector<HTMLElement>('#visible')!);
    const isOpen = ref(false);
    withSetup(() => useModalFocusTrap(isOpen, ref(panel), vi.fn()));

    isOpen.value = true;
    await nextTick();
    await nextTick();
    expect(document.activeElement).toBe(panel.querySelector('#visible'));
  });

  it('stops listening for Escape/Tab once the owning component unmounts', async () => {
    const { panel } = makePanel();
    const isOpen = ref(false);
    const onClose = vi.fn();
    const [, app] = withSetup(() => useModalFocusTrap(isOpen, ref(panel), onClose));

    isOpen.value = true;
    await nextTick();
    app.unmount();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(onClose).not.toHaveBeenCalled();
  });
});
