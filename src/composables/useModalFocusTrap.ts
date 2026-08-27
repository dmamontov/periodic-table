import { nextTick, onBeforeUnmount, watch, type Ref } from 'vue';

/** Escape-to-close + Tab focus cycling + focus restoration for a modal/drawer panel, shared by DrawerShell and any other Teleport-to-body overlay. Bind `panelEl` to the panel's root element via template ref. */
export function useModalFocusTrap(isOpen: Ref<boolean>, panelEl: Ref<HTMLElement | null>, onClose: () => void) {
  let lastFocused: HTMLElement | null = null;

  function focusableElements(): HTMLElement[] {
    const root = panelEl.value;
    if (!root) return [];
    return Array.from(
      root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => el.offsetParent !== null);
  }

  function onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      onClose();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = focusableElements();
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  watch(
    isOpen,
    (open) => {
      if (open) {
        lastFocused = document.activeElement as HTMLElement | null;
        window.addEventListener('keydown', onKeydown);
        void nextTick(() => {
          const target = focusableElements()[0] ?? panelEl.value;
          target?.focus();
        });
      } else {
        window.removeEventListener('keydown', onKeydown);
        lastFocused?.focus();
        lastFocused = null;
      }
    },
    { immediate: true },
  );

  onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown));
}
