<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { useDismissibleFlyout } from '../../composables/useDismissibleFlyout';

const props = defineProps<{
  toggleAriaLabel: string;
  flyoutAriaLabel?: string;
  /** Element type for the flyout panel — 'nav' for a semantic menu, 'div' (default) otherwise. */
  panelTag?: string;
}>();

const emit = defineEmits<{ open: []; close: [] }>();

const rootEl = useTemplateRef<HTMLElement>('rootEl');
const { isOpen, flyoutStyle, open, close, toggle } = useDismissibleFlyout(rootEl, {
  onOpen: () => emit('open'),
  onClose: () => emit('close'),
});

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') close();
}

defineExpose({ isOpen, open, close, toggle });
</script>

<template>
  <div ref="rootEl" class="flyout-trigger" :class="{ 'flyout-trigger--open': isOpen }" @keydown="onKeydown">
    <button
      type="button"
      class="flyout-trigger__toggle"
      :aria-label="toggleAriaLabel"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <slot name="icon" />
    </button>

    <Transition name="flyout-trigger-fade">
      <component
        :is="props.panelTag ?? 'div'"
        v-if="isOpen"
        class="flyout-trigger__panel"
        :style="flyoutStyle"
        :aria-label="flyoutAriaLabel"
      >
        <slot />
      </component>
    </Transition>
  </div>
</template>

<style scoped>
.flyout-trigger {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 2px;
  border-radius: 6px;
  background: var(--color-bg-muted);
}

.flyout-trigger__toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--pill-switcher-height);
  height: var(--pill-switcher-height);
  border: none;
  border-radius: 4px;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.flyout-trigger__toggle:hover {
  color: var(--color-text);
}

.flyout-trigger--open .flyout-trigger__toggle {
  background: var(--color-bg-elevated);
  color: var(--color-text);
  box-shadow: 0 1px 2px var(--color-shadow);
}

.flyout-trigger__panel {
  position: fixed;
  z-index: 50;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-bg-elevated);
  box-shadow: 0 8px 24px var(--color-shadow-lg);
  overflow: hidden;
}

.flyout-trigger-fade-enter-active,
.flyout-trigger-fade-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.flyout-trigger-fade-enter-from,
.flyout-trigger-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
