<script setup lang="ts">
import { SvgMap } from 'vue-svg-map'
import WorldMap from '@svg-maps/world'
import type { Location } from 'vue-svg-map'

const props = defineProps<{
  countries: string[]
  accentColor: string
}>()

function locationAttributes(location: Location) {
  const isActive = props.countries.includes(location.id)
  return {
    class: isActive ? 'element-production-map__country element-production-map__country--active' : 'element-production-map__country',
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
