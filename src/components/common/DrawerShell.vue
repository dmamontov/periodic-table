<script setup lang="ts">
defineProps<{
  isOpen: boolean
  closeLabel: string
  /** Class applied to the drawer's own <aside> (not just the wrapping Teleport root) — needed since Teleport content isn't a reliable target for automatic attr fallthrough. */
  panelClass?: string
}>()

const emit = defineEmits<{ close: [] }>()
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
      class="drawer-shell"
      :class="[panelClass, { 'drawer-shell--open': isOpen }]"
      :aria-hidden="!isOpen"
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
  bottom: 0;
  z-index: 210;
  width: min(400px, 100vw);
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
