<script setup lang="ts">
import { nextTick, onBeforeUnmount, useTemplateRef, watch } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  closeLabel: string;
  /** Class applied to the drawer's own <aside> (not just the wrapping Teleport root) — needed since Teleport content isn't a reliable target for automatic attr fallthrough. */
  panelClass?: string;
}>();

const emit = defineEmits<{ close: [] }>();

const panelRef = useTemplateRef<HTMLElement>('panelRef');
let lastFocused: HTMLElement | null = null;

function focusableElements(): HTMLElement[] {
  const root = panelRef.value;
  if (!root) return [];
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => el.offsetParent !== null);
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    emit('close');
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
  () => props.isOpen,
  (open) => {
    if (open) {
      lastFocused = document.activeElement as HTMLElement | null;
      window.addEventListener('keydown', onKeydown);
      void nextTick(() => {
        const target = focusableElements()[0] ?? panelRef.value;
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
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer-shell-backdrop">
      <button
        v-if="isOpen"
        type="button"
        class="drawer-shell__backdrop"
        :aria-label="closeLabel"
        @click="emit('close')"
      />
    </Transition>

    <aside
      ref="panelRef"
      class="drawer-shell"
      :class="[panelClass, { 'drawer-shell--open': isOpen }]"
      :aria-hidden="!isOpen"
      role="dialog"
      aria-modal="true"
      tabindex="-1"
    >
      <slot />
    </aside>
  </Teleport>
</template>

<style scoped>
.drawer-shell__backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  border: none;
  background: var(--color-overlay);
  cursor: pointer;
}

.drawer-shell-backdrop-enter-active,
.drawer-shell-backdrop-leave-active {
  transition: opacity 0.25s ease;
}

.drawer-shell-backdrop-enter-from,
.drawer-shell-backdrop-leave-to {
  opacity: 0;
}

.drawer-shell {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 210;
  width: min(400px, 100vw);
  height: 100vh;
  padding-top: env(safe-area-inset-top, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  box-sizing: border-box;
  background: var(--color-bg);
  border-left: 1px solid var(--color-border);
  box-shadow: -4px 0 24px var(--color-shadow-md);
  transform: translateX(100%);
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.drawer-shell--open {
  transform: translateX(0);
}
</style>
