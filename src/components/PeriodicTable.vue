<script setup lang="ts">
import { computed, defineAsyncComponent, ref, watch } from 'vue'
import { useRoute, useRouter, type LocationQuery, type LocationQueryRaw } from 'vue-router'
import type { Element } from '../types/element'
import {
  allCategories,
  fBlockElements,
  getElementBySymbol,
  getElementRouteSymbol,
  getElementPeriod,
  getTopRowByCol,
  isColumnHead,
  mainElements,
} from '../data'
import {
  HEATMAP_DEFINITIONS,
  formatHeatmapCellDisplay,
  formatHeatmapElementValue,
  getHeatmapIntensity,
  type HeatmapId,
} from '../utils/heatmapData'
import { useSeo } from '../composables/useSeo'
import ElementCell from './ElementCell.vue'
import EmptyCell from './EmptyCell.vue'
import TableFilters from './TableFilters.vue'
import HeatmapSelector from './HeatmapSelector.vue'
import { useLocale } from '../locales'

const ElementSidebar = defineAsyncComponent(() => import('./ElementSidebar.vue'))

const route = useRoute()
const router = useRouter()
const { locale, messages } = useLocale()

const VALID_CATEGORY_QUERY_VALUES = new Set<string>([
  'collection',
  ...allCategories.map((c) => c.id),
])
const VALID_HEATMAP_QUERY_VALUES = new Set<string>(HEATMAP_DEFINITIONS.map((d) => d.id))

function readQueryValue(query: LocationQuery, key: string): string | undefined {
  const raw = query[key]
  const value = Array.isArray(raw) ? raw[0] : raw
  return value ?? undefined
}

function readCategoryFromQuery(query: LocationQuery): string {
  const value = readQueryValue(query, 'category')
  return value && VALID_CATEGORY_QUERY_VALUES.has(value) ? value : 'all'
}

function readHeatmapFromQuery(query: LocationQuery): HeatmapId | null {
  const value = readQueryValue(query, 'heatmap')
  return value && VALID_HEATMAP_QUERY_VALUES.has(value) ? (value as HeatmapId) : null
}

const selectedCategory = ref(readCategoryFromQuery(route.query))
const selectedElement = ref<Element | null>(null)
const selectedHeatmap = ref<HeatmapId | null>(readHeatmapFromQuery(route.query))

watch(
  [selectedCategory, selectedHeatmap],
  ([category, heatmap]) => {
    const nextQuery: LocationQueryRaw = { ...route.query }
    if (category === 'all') delete nextQuery.category
    else nextQuery.category = category
    if (!heatmap) delete nextQuery.heatmap
    else nextQuery.heatmap = heatmap

    void router.replace({ query: nextQuery })
  },
  { immediate: true },
)

watch(
  () => route.params.symbol,
  (symbol) => {
    if (typeof symbol !== 'string' || !symbol) {
      selectedElement.value = null
      return
    }

    const element = getElementBySymbol(symbol)
    if (!element) {
      void router.replace({ name: 'home', query: route.query })
      selectedElement.value = null
      return
    }

    const routeSymbol = getElementRouteSymbol(element.symbol)
    if (symbol !== routeSymbol) {
      void router.replace({ name: 'element', params: { symbol: routeSymbol }, query: route.query })
      return
    }

    selectedElement.value = element
  },
  { immediate: true },
)

const selectedElementRouteSymbol = computed(() =>
  selectedElement.value ? getElementRouteSymbol(selectedElement.value.symbol) : undefined,
)

useSeo(selectedElement, selectedElementRouteSymbol, messages)

const heatmapIntensityByNumber = computed(() => {
  const id = selectedHeatmap.value
  if (!id) return null

  const map = new Map<number, number | null>()
  for (const el of [...mainElements, ...fBlockElements]) {
    map.set(el.number, getHeatmapIntensity(id, el.number))
  }
  return map
})

const heatmapActive = computed(() => selectedHeatmap.value != null)

const lanthanides = fBlockElements.filter((el) => el.row === 8)
const actinides = fBlockElements.filter((el) => el.row === 9)
const topRowByCol = getTopRowByCol()

function elementMatchesCategory(el: Element, category: string): boolean {
  if (category === 'all') return true
  if (category === 'collection') return el.inCollection
  return el.category === category
}

const highlightedMainPeriods = computed(() => {
  const category = selectedCategory.value
  if (category === 'all') return null

  const periods = new Set<number>()
  for (const el of mainElements) {
    if (elementMatchesCategory(el, category)) {
      periods.add(el.row)
    }
  }
  return periods
})

const highlightedFBlockPeriods = computed(() => {
  const category = selectedCategory.value
  if (category === 'all') return null

  const periods = new Set<number>()
  for (const el of fBlockElements) {
    if (elementMatchesCategory(el, category)) {
      periods.add(getElementPeriod(el))
    }
  }
  return periods
})

const highlightedGroups = computed(() => {
  const category = selectedCategory.value
  if (category === 'all') return null

  const groups = new Set<number>()
  for (const el of mainElements) {
    if (el.group != null && elementMatchesCategory(el, category)) {
      groups.add(el.group)
    }
  }
  return groups
})

function isMainPeriodHighlighted(element: Element): boolean {
  if (!highlightedMainPeriods.value) return true
  return highlightedMainPeriods.value.has(element.row)
}

function isFBlockPeriodHighlighted(element: Element): boolean {
  if (!highlightedFBlockPeriods.value) return true
  return highlightedFBlockPeriods.value.has(getElementPeriod(element))
}

function isGroupHighlighted(element: Element): boolean {
  if (!highlightedGroups.value || element.group == null) return true
  return highlightedGroups.value.has(element.group)
}

const axisFilterActive = computed(() => selectedCategory.value !== 'all')

const isFBlockGroupLabelHighlighted = computed(() => {
  const category = selectedCategory.value
  if (category === 'all') return true
  return (
    lanthanides.some((el) => elementMatchesCategory(el, category))
    || actinides.some((el) => elementMatchesCategory(el, category))
  )
})

function onSelectElement(element: Element, toggle = true) {
  if (toggle && selectedElement.value?.number === element.number) {
    void router.push({ name: 'home', query: route.query })
    return
  }

  void router.push({
    name: 'element',
    params: { symbol: getElementRouteSymbol(element.symbol) },
    query: route.query,
  })
}

function closeSidebar() {
  void router.push({ name: 'home', query: route.query })
}

function heatmapHint(number: number): string | undefined {
  const id = selectedHeatmap.value
  if (!id) return undefined

  const def = HEATMAP_DEFINITIONS.find((d) => d.id === id)
  const label = def ? messages.value.heatmap.maps[def.labelKey] : id
  const formatted = formatHeatmapElementValue(id, number, locale.value, messages.value)

  if (!formatted) {
    return `${label}: ${messages.value.heatmap.noData}`
  }

  const unit = def?.unitKey
    ? messages.value.sidebar.units[def.unitKey].replace(/[():]/g, '').trim()
    : ''
  return unit ? `${label}: ${formatted} ${unit}` : `${label}: ${formatted}`
}

function heatmapCellValue(number: number): string | undefined {
  const id = selectedHeatmap.value
  if (!id) return undefined
  return formatHeatmapCellDisplay(id, number, locale.value, messages.value)
}
</script>

<template>
  <div class="periodic-table" :class="{ 'periodic-table--heatmap': heatmapActive }">
    <div class="periodic-table__viewport">
      <div class="periodic-table__content">
        <div class="periodic-table__grid">
          <ElementCell
            v-for="element in mainElements"
            :key="element.number"
            :element="element"
            show-period
            :show-group="isColumnHead(element, topRowByCol)"
            :selected-category="selectedCategory"
            :axis-period-highlighted="isMainPeriodHighlighted(element)"
            :axis-group-highlighted="isGroupHighlighted(element)"
            :active="selectedElement?.number === element.number"
            :heatmap-intensity="heatmapIntensityByNumber?.get(element.number)"
            :heatmap-hint="heatmapHint(element.number)"
            :heatmap-cell-value="heatmapCellValue(element.number)"
            @select="onSelectElement"
          />
          <EmptyCell :row="6" />
          <EmptyCell :row="7" />
          <HeatmapSelector
            v-model:selected-heatmap="selectedHeatmap"
            class="periodic-table__heatmap"
          />
          <TableFilters
            v-model:selected-category="selectedCategory"
            class="periodic-table__filters"
          />
        </div>

        <div class="periodic-table__f-block">
          <div class="periodic-table__f-row-wrap">
            <span
              class="periodic-table__f-group-label"
              :class="{ 'periodic-table__f-group-label--dimmed': axisFilterActive && !isFBlockGroupLabelHighlighted }"
            >
              3
            </span>
            <div class="periodic-table__f-row">
              <ElementCell
                v-for="element in lanthanides"
                :key="`f-${element.number}`"
                :element="element"
                show-period
                single-row
                :selected-category="selectedCategory"
                :axis-period-highlighted="isFBlockPeriodHighlighted(element)"
                :active="selectedElement?.number === element.number"
                :heatmap-intensity="heatmapIntensityByNumber?.get(element.number)"
                :heatmap-hint="heatmapHint(element.number)"
                :heatmap-cell-value="heatmapCellValue(element.number)"
                @select="onSelectElement"
              />
            </div>
          </div>
          <div class="periodic-table__f-row">
            <ElementCell
              v-for="element in actinides"
              :key="`f-${element.number}`"
              :element="element"
              show-period
              single-row
              :selected-category="selectedCategory"
              :axis-period-highlighted="isFBlockPeriodHighlighted(element)"
              :active="selectedElement?.number === element.number"
              :heatmap-intensity="heatmapIntensityByNumber?.get(element.number)"
              :heatmap-hint="heatmapHint(element.number)"
              :heatmap-cell-value="heatmapCellValue(element.number)"
              @select="onSelectElement"
            />
          </div>
        </div>
      </div>
    </div>

    <ElementSidebar
      :element="selectedElement"
      @close="closeSidebar"
    />
  </div>
</template>

<style scoped>
.periodic-table {
  /* Period labels extend left of column 1; 18.2 = 18 columns + 0.2 gutter */
  --table-safe-width: calc(
    100svw - env(safe-area-inset-left, 0px) - env(safe-area-inset-right, 0px)
  );
  --cell-size: min(76px, calc((var(--table-safe-width) - 32px) / 18.2));
  --cell-corner-radius: calc(var(--cell-size) * 0.09);
  --table-width: calc(var(--cell-size) * 18);
  --label-font-size: calc(var(--cell-size) * 0.14);
  --label-gap: calc(var(--cell-size) * 0.06);
  --period-gutter: calc(var(--label-gap) + var(--label-font-size));

  width: 100%;
  max-width: 1480px;
  margin: 0 auto;
  padding:
    var(--layout-section-gap)
    max(16px, env(safe-area-inset-right, 0px))
    var(--layout-section-gap)
    max(16px, env(safe-area-inset-left, 0px));
}

.periodic-table--heatmap :deep(.element-cell__surface:not(.element-cell__surface--dimmed)) {
  transition:
    background-color 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67),
    filter 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.35s ease;
}

.periodic-table__viewport {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: visible;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x pan-y;
  overscroll-behavior-x: contain;
}

.periodic-table__content {
  width: var(--table-width);
  min-width: var(--table-width);
  margin: 0 auto;
}

.periodic-table__grid {
  display: grid;
  grid-template-columns: repeat(18, var(--cell-size));
  grid-template-rows: repeat(7, auto);
  padding-top: calc(var(--label-font-size) + var(--label-gap));
}

.periodic-table__grid :deep(.element-cell),
.periodic-table__grid :deep(.empty-cell) {
  margin-left: -1px;
}

.periodic-table__heatmap {
  grid-row: 1;
  grid-column: 3 / 13;
  place-self: end center;
  z-index: 10;
  width: 100%;
  margin: 0;
  padding: 0 2px calc(var(--cell-size) * 0.025);
}

.periodic-table__filters {
  grid-row: 2 / 4;
  grid-column: 3 / 13;
  display: flex;
  align-items: center;
  justify-content: center;
  place-self: stretch;
  z-index: 10;
  margin: 0;
  padding: 0;
}

.periodic-table__f-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  margin-top: 16px;
}

.periodic-table__f-row-wrap {
  position: relative;
  padding-top: calc(var(--label-font-size) + var(--label-gap));
}

.periodic-table__f-group-label {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: var(--label-font-size);
  font-weight: 700;
  color: var(--color-text-secondary);
  line-height: 1;
  pointer-events: none;
  white-space: nowrap;
  transition: opacity 0.35s ease;
}

.periodic-table__f-group-label--dimmed {
  opacity: 0.22;
}

.periodic-table__f-row {
  display: grid;
  grid-template-columns: repeat(15, var(--cell-size));
  width: calc(var(--cell-size) * 15);
}

.periodic-table__f-row :deep(.element-cell) {
  margin-left: -1px;
}

@media (max-width: 900px) {
  .periodic-table {
    padding:
      var(--layout-section-gap)
      max(8px, env(safe-area-inset-right, 0px))
      var(--layout-section-gap)
      max(8px, env(safe-area-inset-left, 0px));
  }

  .periodic-table__viewport {
    padding-right: 8px;
    padding-left: max(8px, var(--period-gutter));
  }

  .periodic-table__content {
    margin: 0;
  }

  .periodic-table__grid {
    padding-top: calc(var(--label-font-size) + var(--label-gap));
  }
}

@media (max-width: 900px) and (orientation: portrait) {
  .periodic-table {
    --cell-size: 52px;
    --table-width: calc(var(--cell-size) * 18);
  }

  .periodic-table__filters {
    overflow: hidden;
  }
}

@media (max-width: 400px) and (orientation: portrait) {
  .periodic-table {
    --cell-size: 46px;
    --table-width: calc(var(--cell-size) * 18);
  }
}

@media (orientation: landscape) and (max-width: 960px) {
  .periodic-table {
    --cell-size: calc((var(--table-safe-width) - 8px) / 18.2);
    --table-width: calc(var(--cell-size) * 18);
    padding:
      4px
      max(4px, env(safe-area-inset-right, 0px))
      4px
      max(4px, env(safe-area-inset-left, 0px));
  }

  .periodic-table__viewport {
    padding-right: 4px;
    padding-left: max(4px, var(--period-gutter));
    overflow-x: hidden;
  }

  .periodic-table__filters {
    overflow: visible;
    align-self: center;
  }

  .periodic-table__f-block {
    margin-top: 8px;
  }
}

@media (min-width: 901px) {
  .periodic-table__viewport {
    padding-left: var(--period-gutter);
  }
}
</style>
