<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useDismissibleTooltip } from '../../composables/useDismissibleTooltip'

const props = defineProps<{
  text: string
  label: string
}>()

const rootEl = useTemplateRef<HTMLElement>('rootEl')
const { isOpen, style, open, close, toggle, onKeydown } = useDismissibleTooltip(rootEl)
</script>

<template>
  <span ref="rootEl" class="info-tooltip" @keydown="onKeydown" @mouseenter="open" @mouseleave="close">
    <button
      type="button"
      class="info-tooltip__trigger"
      :class="{ 'info-tooltip__trigger--open': isOpen }"
      :aria-label="props.label"
      :aria-expanded="isOpen"
      @click.stop="toggle"
    >
      <svg viewBox="0 0 256 256" aria-hidden="true">
        <circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-width="16" />
        <path
          d="M120,120a8,8,0,0,1,8,8v40a8,8,0,0,0,8,8"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="16"
        />
        <circle cx="124" cy="84" r="12" fill="currentColor" />
      </svg>
    </button>

    <Teleport to="body">
      <Transition name="info-tooltip-fade">
        <div v-if="isOpen" class="info-tooltip__bubble" :style="style" role="tooltip">
          {{ text }}
        </div>
      </Transition>
    </Teleport>
  </span>
</template>

<style scoped>
.info-tooltip {
  position: relative;
  display: inline-flex;
}

.info-tooltip__trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 13px;
  height: 13px;
  padding: 0;
  border: none;
  background: none;
  color: var(--color-chart-axis-muted);
  cursor: pointer;
  transition: color 0.15s ease;
}

.info-tooltip__trigger:hover,
.info-tooltip__trigger--open {
  color: var(--color-text);
}

.info-tooltip__trigger svg {
  width: 100%;
  height: 100%;
}

.info-tooltip__bubble {
  position: fixed;
  z-index: 320;
  max-width: 240px;
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
