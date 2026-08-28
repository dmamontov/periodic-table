import { afterEach, describe, expect, it } from 'vitest';
import DrawerShell from '../../../src/components/common/DrawerShell.vue';
import { mountComponent } from '../../helpers/mountComponent';

/** Teleport-to-body content isn't reachable via wrapper.find(), and isn't cleaned up between tests without an explicit unmount. */
afterEach(() => {
  document.body.innerHTML = '';
});

describe('DrawerShell', () => {
  it('renders the backdrop/panel/slot content and marks the panel open when isOpen is true', () => {
    mountComponent(DrawerShell, {
      props: { isOpen: true, closeLabel: 'Close drawer', panelClass: 'my-drawer' },
      slots: { default: '<p>Body</p>' },
    });

    const backdrop = document.body.querySelector('.drawer-shell__backdrop');
    expect(backdrop).not.toBeNull();
    expect(backdrop?.getAttribute('aria-label')).toBe('Close drawer');

    const panel = document.body.querySelector('.drawer-shell');
    expect(panel?.classList.contains('drawer-shell--open')).toBe(true);
    expect(panel?.classList.contains('my-drawer')).toBe(true);
    expect(panel?.getAttribute('aria-hidden')).toBe('false');
    expect(panel?.querySelector('p')?.textContent).toBe('Body');
  });

  it('hides the backdrop and marks the panel closed/aria-hidden when isOpen is false', () => {
    mountComponent(DrawerShell, {
      props: { isOpen: false, closeLabel: 'Close drawer' },
    });

    expect(document.body.querySelector('.drawer-shell__backdrop')).toBeNull();
    const panel = document.body.querySelector('.drawer-shell');
    expect(panel?.classList.contains('drawer-shell--open')).toBe(false);
    expect(panel?.getAttribute('aria-hidden')).toBe('true');
  });

  it('emits close when the backdrop is clicked', async () => {
    const wrapper = mountComponent(DrawerShell, {
      props: { isOpen: true, closeLabel: 'Close drawer' },
    });

    const backdrop = document.body.querySelector<HTMLButtonElement>('.drawer-shell__backdrop');
    backdrop?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('close')).toHaveLength(1);
  });

  it('emits close on Escape via the shared focus-trap composable', async () => {
    const wrapper = mountComponent(DrawerShell, {
      props: { isOpen: true, closeLabel: 'Close drawer' },
    });

    await wrapper.vm.$nextTick();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(wrapper.emitted('close')).toHaveLength(1);
  });
});
