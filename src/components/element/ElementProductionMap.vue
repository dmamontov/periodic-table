<script setup lang="ts">
import { SvgMap } from 'vue-svg-map'
import WorldMap from '@svg-maps/world'
import type { Location } from 'vue-svg-map'
import type { ProductionCountryEntry } from '../../types/element/detail'

const MIN_OPACITY = 0.3

const props = defineProps<{
  countries: ProductionCountryEntry[]
  accentColor: string
}>()

function locationAttributes(location: Location) {
  const entry = props.countries.find((c) => c.country === location.id)
  if (!entry) {
    return { class: 'element-production-map__country' }
  }
  const share = entry.share ? Number(entry.share) : null
  const fillOpacity = share ? MIN_OPACITY + (share / 100) * (1 - MIN_OPACITY) : 1
  const title = share ? `${location.name} — ${share}%` : location.name
  return {
    class: 'element-production-map__country element-production-map__country--active',
    style: { fillOpacity },
    title,
  }
}
</script>

<template>
  <SvgMap class="element-production-map" :map="WorldMap" :location-attributes="locationAttributes" />
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
}
</style>
