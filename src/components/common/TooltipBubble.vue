<script setup lang="ts">
import type { useDismissibleTooltip } from '../../composables/useDismissibleTooltip';

defineProps<{ tooltip: ReturnType<typeof useDismissibleTooltip> }>();
</script>

<template>
  <Teleport to="body">
    <Transition name="info-tooltip-fade">
      <div
        v-if="tooltip.isOpen.value"
        :ref="tooltip.bubbleEl"
        class="info-tooltip__bubble"
        :style="tooltip.style.value"
        role="tooltip"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.info-tooltip__bubble {
  position: fixed;
  z-index: 320;
  max-width: 240px;
  /* `left` is the anchor's center, computed in useDismissibleTooltip - shift back by half of this bubble's own (variable) width so it stays centered regardless of how short/long its text is. */
  transform: translateX(-50%);
  padding: 8px 10px;
  border-radius: 6px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 16px var(--color-shadow-md);
  color: var(--color-text);
  font-size: 11px;
  font-weight: 500;
  line-height: 1.4;
}

.info-tooltip-fade-enter-active,
.info-tooltip-fade-leave-active {
  transition: opacity 0.12s ease;
}

.info-tooltip-fade-enter-from,
.info-tooltip-fade-leave-to {
  opacity: 0;
}
</style>
