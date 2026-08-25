<script setup lang="ts">
import { ref } from 'vue';
import { SvgMap } from 'vue-svg-map';
import WorldMap from '@svg-maps/world';
import type { Location } from 'vue-svg-map';
import type { ProductionCountryEntry } from '../../types/element/detail';
import { useDismissibleTooltip } from '../../composables/useDismissibleTooltip';
import { useLocale } from '../../locales';

const MIN_OPACITY = 0.3;

const props = defineProps<{
  countries: ProductionCountryEntry[];
  accentColor: string;
}>();

// Re-anchored to whichever country path is hovered/tapped right before each open() call - the composable just reads .value fresh each time.
const hoveredEl = ref<HTMLElement | null>(null);
const tooltip = useDismissibleTooltip(hoveredEl);
const tooltipText = ref('');

const { messages } = useLocale();

function countryName(location: Location): string {
  return messages.value.sidebar.countries[location.id.toUpperCase()] ?? location.name ?? location.id;
}

function showTooltip(event: Event, label: string) {
  hoveredEl.value = event.currentTarget as HTMLElement;
  tooltipText.value = label;
  tooltip.open();
}

function toggleTooltip(event: Event, label: string) {
  if (tooltip.isOpen.value && hoveredEl.value === event.currentTarget) {
    tooltip.close();
    return;
  }
  showTooltip(event, label);
}

function locationAttributes(location: Location) {
  const entry = props.countries.find((c) => c.country === location.id);
  if (!entry) {
    return { class: 'element-production-map__country' };
  }
  const share = entry.share ? Number(entry.share) : null;
  const fillOpacity = share ? MIN_OPACITY + (share / 100) * (1 - MIN_OPACITY) : 1;
  const name = countryName(location);
  const label = share ? `${name} — ${share}%` : name;
  return {
    class: 'element-production-map__country element-production-map__country--active',
    style: { fillOpacity },
    'aria-label': label,
    onMouseenter: (event: MouseEvent) => showTooltip(event, label),
    onMouseleave: () => tooltip.close(),
    onClick: (event: MouseEvent) => toggleTooltip(event, label),
  };
}
</script>

<template>
  <SvgMap class="element-production-map" :map="WorldMap" :location-attributes="locationAttributes" />
  <Teleport to="body">
    <Transition name="info-tooltip-fade">
      <div v-if="tooltip.isOpen.value" class="info-tooltip__bubble" :style="tooltip.style.value" role="tooltip">
        {{ tooltipText }}
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.element-production-map {
  display: block;
  width: 100%;
  height: auto;
}

.element-production-map :deep(.element-production-map__country) {
  fill: var(--color-border);
  stroke: var(--color-surface);
  stroke-width: 0.5;
}

.element-production-map :deep(.element-production-map__country--active) {
  fill: v-bind(accentColor);
  cursor: pointer;
}

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
