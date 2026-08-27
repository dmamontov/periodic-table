<script setup lang="ts">
import { SvgMap } from 'vue-svg-map';
import WorldMap from '@svg-maps/world';
import type { Location } from 'vue-svg-map';
import type { ProductionCountryEntry } from '../../types/element/detail';
import { useHoverAnchoredTooltip } from '../../composables/useHoverAnchoredTooltip';
import { useLocale } from '../../locales';
import TooltipBubble from '../common/TooltipBubble.vue';

const MIN_OPACITY = 0.3;

const props = defineProps<{
  countries: ProductionCountryEntry[];
  accentColor: string;
}>();

const {
  tooltip,
  text: tooltipText,
  showOnMouseHover: showTooltipOnMouseHover,
  hideOnMouseHover: hideTooltipOnMouseHover,
  toggle: toggleTooltip,
} = useHoverAnchoredTooltip();

const { messages } = useLocale();

function countryName(location: Location): string {
  return messages.value.sidebar.countries[location.id.toUpperCase()] ?? location.name ?? location.id;
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
    onPointerenter: (event: PointerEvent) => showTooltipOnMouseHover(event, label),
    onPointerleave: (event: PointerEvent) => hideTooltipOnMouseHover(event),
    onClick: (event: MouseEvent) => toggleTooltip(event, label),
  };
}
</script>

<template>
  <SvgMap class="element-production-map" :map="WorldMap" :location-attributes="locationAttributes" />
  <TooltipBubble :tooltip="tooltip">{{ tooltipText }}</TooltipBubble>
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
</style>
