<script setup lang="ts">
import { computed } from 'vue'
import type { Element } from '../../types/element'
import { getCellBorderRadius, getElementPeriod, isElementRadioactive, isElementWeaklyRadioactive } from '../../data'
import { intensityToBrightness } from '../../utils/heatmap'
import { useLocale } from '../../locales'
import { formatElementSymbol } from '../../utils/element/formatters'
import RadiationIcon from '../common/RadiationIcon.vue'

const { tElement, formatMass, tSidebar, locale } = useLocale()

const props = withDefaults(
  defineProps<{
    element: Element
    showPeriod?: boolean
    showGroup?: boolean
    singleRow?: boolean
    selectedCategory?: string
    axisPeriodHighlighted?: boolean
    axisGroupHighlighted?: boolean
    active?: boolean
    /** 0–1 when heatmap has data; null when heatmap is on but value is missing; undefined when heatmap is off */
    heatmapIntensity?: number | null
    heatmapHint?: string
    heatmapCellValue?: string
  }>(),
  {
    axisPeriodHighlighted: true,
    axisGroupHighlighted: true,
  },
)

const emit = defineEmits<{
  select: [element: Element]
}>()

const gridStyle = computed(() => ({
  gridRow: props.singleRow ? 1 : props.element.row,
  gridColumn: props.singleRow ? props.element.col - 3 : props.element.col,
}))

const surfaceStyle = computed(() => ({
  backgroundColor: props.element.color,
  borderRadius: getCellBorderRadius(props.element, props.singleRow),
}))

const displaySymbol = computed(() => formatElementSymbol(props.element.symbol))

const showPeriodLabel = computed(() => {
  if (!props.showPeriod) return false
  if (props.singleRow) return props.element.col === 4
  return props.element.col === 1
})

const periodNumber = computed(() => getElementPeriod(props.element))

const elementName = computed(() => {
  void locale.value
  return tElement(props.element.number)
})
const elementMass = computed(() => {
  void locale.value
  return formatMass(props.element.mass)
})

const cellBottomValue = computed(() => props.heatmapCellValue ?? elementMass.value)

const axisFilterActive = computed(() => (props.selectedCategory ?? 'all') !== 'all')

const isDimmed = computed(() => {
  const selected = props.selectedCategory ?? 'all'
  if (selected === 'all') return false
  if (selected === 'collection') return !props.element.inCollection
  return props.element.category !== selected
})

const heatmapActive = computed(() => props.heatmapIntensity !== undefined)

const surfaceOpacity = computed(() => (isDimmed.value ? 0.22 : 1))

const surfaceFilter = computed(() => {
  if (props.heatmapIntensity === undefined) return undefined
  if (props.heatmapIntensity === null) return 'brightness(0.52) saturate(0.42)'
  return `brightness(${intensityToBrightness(props.heatmapIntensity)})`
})

const cellTitle = computed(() => {
  const base = `${elementName.value} (${displaySymbol.value})`
  if (props.heatmapHint) return `${base}\n${props.heatmapHint}`
  return base
})

const isRadioactive = computed(() => isElementRadioactive(props.element.number))
const isWeaklyRadioactive = computed(() => isElementWeaklyRadioactive(props.element.number))
</script>

<template>
  <div
    class="element-cell"
    :class="{ 'element-cell--active': active }"
    :style="gridStyle"
    :title="cellTitle"
    role="button"
    tabindex="0"
    @click="emit('select', element)"
    @keydown.enter="emit('select', element)"
    @keydown.space.prevent="emit('select', element)"
  >
    <span
      v-if="showPeriodLabel"
      class="element-cell__period"
      :class="{ 'element-cell__axis-label--dimmed': axisFilterActive && !axisPeriodHighlighted }"
    >
      {{ periodNumber }}
    </span>

    <span
      v-if="showGroup"
      class="element-cell__group"
      :class="{ 'element-cell__axis-label--dimmed': axisFilterActive && !axisGroupHighlighted }"
    >
      {{ element.group }}
    </span>

    <div
      class="element-cell__surface"
      :class="{
        'element-cell__surface--dimmed': isDimmed,
        'element-cell__surface--no-data': heatmapActive && heatmapIntensity === null,
        'element-cell__surface--active': active,
      }"
      :style="{ ...surfaceStyle, opacity: surfaceOpacity, filter: surfaceFilter }"
    >
      <span class="element-cell__number">{{ element.number }}</span>
      <span
        v-if="isRadioactive"
        class="element-cell__radioactive"
        :class="{ 'element-cell__radioactive--weak': isWeaklyRadioactive }"
        :aria-label="isWeaklyRadioactive ? tSidebar('weakRadioactiveBadge') : tSidebar('radioactiveBadge')"
      >
        <RadiationIcon class="element-cell__radioactive-icon" light />
      </span>

      <div class="element-cell__center">
        <span class="element-cell__symbol">{{ displaySymbol }}</span>
      </div>

      <div class="element-cell__bottom">
        <span class="element-cell__name">{{ elementName }}</span>
        <span class="element-cell__mass">{{ cellBottomValue }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.element-cell {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: var(--cell-size, 76px);
  height: var(--cell-size, 76px);
  cursor: pointer;
  overflow: visible;
  margin-bottom: 6px;
  text-align: center;
  flex-shrink: 0;
}

.element-cell:hover {
  z-index: 2;
}

.element-cell:hover .element-cell__surface:not(.element-cell__surface--dimmed) {
  filter: brightness(1.06);
}

.element-cell--active {
  z-index: 3;
}

.element-cell--active .element-cell__surface {
  filter: brightness(1.08);
}

.element-cell__surface {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  color: #fff;
  padding: 3px 3px 2px;
  transition:
    background-color 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67),
    filter 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.35s ease;
}

.element-cell__surface--dimmed {
  opacity: 0.22;
}

.element-cell__surface--no-data {
  filter: brightness(0.52) saturate(0.42);
}

.element-cell__period,
.element-cell__group {
  font-size: var(--label-font-size, calc(var(--cell-size, 76px) * 0.14));
  font-weight: 700;
  color: var(--color-text-secondary);
  line-height: 1;
  pointer-events: none;
  white-space: nowrap;
  transition: opacity 0.35s ease;
}

.element-cell__axis-label--dimmed {
  opacity: 0.22;
}

.element-cell__period {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(calc(-100% - var(--label-gap, 5px)), -50%);
}

.element-cell__group {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, calc(-100% - var(--label-gap, 5px)));
}

.element-cell__number {
  position: absolute;
  top: 3px;
  left: 4px;
  font-size: calc(var(--cell-size, 76px) * 0.12);
  line-height: 1;
  font-weight: 400;
}

.element-cell__radioactive {
  position: absolute;
  top: 3px;
  right: 4px;
  line-height: 1;
  opacity: 0.92;
  pointer-events: none;
}

.element-cell__radioactive-icon {
  width: calc(var(--cell-size, 76px) * 0.105);
  height: calc(var(--cell-size, 76px) * 0.105);
}

.element-cell__radioactive--weak {
  opacity: 0.55;
}

.element-cell__center {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: calc(var(--cell-size, 76px) * 0.14);
}

.element-cell__symbol {
  font-family: var(--font-body);
  font-size: calc(var(--cell-size, 76px) * 0.38);
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.02em;
}

.element-cell__bottom {
  width: 100%;
  padding: 0 1px;
  margin-top: 1px;
  overflow: hidden;
}

.element-cell__name {
  display: block;
  font-size: calc(var(--cell-size, 76px) * 0.15);
  font-weight: 700;
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.element-cell__mass {
  display: block;
  font-size: calc(var(--cell-size, 76px) * 0.11);
  line-height: 1.1;
  margin-top: 1px;
  opacity: 0.95;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
</style>
