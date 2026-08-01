<script setup lang="ts">
import { computed } from 'vue'
import {
  HEATMAP_DEFINITIONS,
  HEATMAP_GROUP_ORDER,
  formatHeatmapRangeValue,
  getHeatmapDataset,
  type HeatmapGroupId,
  type HeatmapId,
} from '../utils/heatmapData'
import { useLocale } from '../locales'

const selectedHeatmap = defineModel<HeatmapId | null>('selectedHeatmap', { default: null })

const { locale, messages } = useLocale()

const selectValue = computed({
  get: () => selectedHeatmap.value ?? '',
  set: (value: string) => {
    selectedHeatmap.value = value === '' ? null : (value as HeatmapId)
  },
})

const activeDefinition = computed(() =>
  selectedHeatmap.value
    ? HEATMAP_DEFINITIONS.find((d) => d.id === selectedHeatmap.value) ?? null
    : null,
)

const activeDataset = computed(() =>
  selectedHeatmap.value ? getHeatmapDataset(selectedHeatmap.value) : null,
)

const legendMin = computed(() => {
  if (!activeDataset.value || !selectedHeatmap.value) return ''
  const formatted = formatHeatmapRangeValue(
    selectedHeatmap.value,
    activeDataset.value.min,
    locale.value,
    messages.value,
  )
  if (selectedHeatmap.value === 'rarity') {
    return `${formatted} · ${messages.value.heatmap.rarityLegend.rare}`
  }
  return formatted
})

const legendMax = computed(() => {
  if (!activeDataset.value || !selectedHeatmap.value) return ''
  const formatted = formatHeatmapRangeValue(
    selectedHeatmap.value,
    activeDataset.value.max,
    locale.value,
    messages.value,
  )
  if (selectedHeatmap.value === 'rarity') {
    return `${formatted} · ${messages.value.heatmap.rarityLegend.common}`
  }
  return formatted
})

const legendInverted = computed(() => selectedHeatmap.value === 'rarity')

const unitLabel = computed(() => {
  const def = activeDefinition.value
  if (!def?.unitKey) return ''
  return messages.value.sidebar.units[def.unitKey].replace(/[():]/g, '').trim()
})

function labelFor(id: HeatmapId): string {
  return messages.value.heatmap.maps[id]
}

const heatmapGroups = computed(() =>
  HEATMAP_GROUP_ORDER.map((groupId: HeatmapGroupId) => ({
    id: groupId,
    label: messages.value.heatmap.groups[groupId],
    items: HEATMAP_DEFINITIONS.filter((def) => def.group === groupId),
  })),
)
</script>

<template>
  <div class="heatmap-bar" :key="locale">
    <label class="heatmap-bar__control">
      <span class="heatmap-bar__label">{{ messages.heatmap.title }}</span>
      <span class="heatmap-bar__select-wrap">
        <select
          v-model="selectValue"
          class="heatmap-bar__select"
        >
          <option value="">{{ messages.heatmap.off }}</option>
          <optgroup
            v-for="group in heatmapGroups"
            :key="group.id"
            :label="group.label"
          >
            <option
              v-for="def in group.items"
              :key="def.id"
              :value="def.id"
            >
              {{ labelFor(def.id) }}
            </option>
          </optgroup>
        </select>
      </span>
    </label>

    <Transition name="heatmap-scale">
      <div
        v-if="activeDefinition && activeDataset"
        class="heatmap-bar__scale"
        :class="{ 'heatmap-bar__scale--inverted': legendInverted }"
        :style="{ '--scale-accent': activeDefinition.accent }"
      >
        <span class="heatmap-bar__bound">{{ legendMin }}</span>
        <span class="heatmap-bar__track" aria-hidden="true" />
        <span class="heatmap-bar__bound">{{ legendMax }}<template v-if="unitLabel">&nbsp;{{ unitLabel }}</template></span>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.heatmap-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  gap: 10px 14px;
  min-height: 0;
  width: 100%;
}

.heatmap-bar__control {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  cursor: pointer;
  flex-shrink: 0;
}

.heatmap-bar__label {
  font-size: var(--panel-font-size);
  line-height: var(--panel-line-height);
  color: var(--color-text-secondary);
  font-weight: 700;
  white-space: nowrap;
}

.heatmap-bar__select-wrap {
  position: relative;
  display: inline-flex;
}

.heatmap-bar__select-wrap::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 2px;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid var(--color-text-tertiary);
  transform: translateY(-20%);
  pointer-events: none;
}

.heatmap-bar__select {
  appearance: none;
  border: none;
  border-bottom: 1px solid var(--color-border-input);
  background: transparent;
  padding: 1px 18px 2px 2px;
  margin: 0;
  font-family: var(--font-body);
  font-size: var(--panel-font-size);
  line-height: var(--panel-line-height);
  color: var(--color-text);
  cursor: pointer;
  max-width: min(100%, 220px);
  transition: border-color 0.15s ease;
}

.heatmap-bar__select:hover,
.heatmap-bar__select:focus-visible {
  border-bottom-color: var(--color-text-tertiary);
  outline: none;
}

.heatmap-bar__scale {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 7px;
  min-width: 0;
  flex: 0 1 auto;
}

.heatmap-bar__bound {
  font-size: var(--panel-font-size);
  line-height: var(--panel-line-height);
  color: var(--color-text-secondary);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  flex-shrink: 0;
}

.heatmap-bar__track {
  flex: 0 0 auto;
  width: clamp(56px, calc(var(--cell-size, 76px) * 0.9), 96px);
  height: 5px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    var(--color-heatmap-fade) 0%,
    color-mix(in srgb, var(--scale-accent) 50%, var(--color-scale-mix)) 45%,
    var(--scale-accent) 100%
  );
}

.heatmap-bar__scale--inverted .heatmap-bar__track {
  background: linear-gradient(
    90deg,
    var(--scale-accent) 0%,
    color-mix(in srgb, var(--scale-accent) 50%, var(--color-scale-mix)) 55%,
    var(--color-heatmap-fade) 100%
  );
}

.heatmap-scale-enter-active,
.heatmap-scale-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.heatmap-scale-enter-from,
.heatmap-scale-leave-to {
  opacity: 0;
  transform: translateX(6px);
}

@media (max-width: 900px), ((orientation: landscape) and (max-width: 960px)) {
  .heatmap-bar {
    gap: 6px 8px;
  }

  .heatmap-bar__select {
    max-width: min(38vw, 150px);
  }

  .heatmap-bar__track {
    width: 48px;
  }
}
</style>
