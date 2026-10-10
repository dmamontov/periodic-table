<script setup lang="ts">
import { computed } from 'vue';
import { useLocale } from '../../locales';
import AppIcon from '../common/AppIcon.vue';
import { toIntlLocale } from '../../utils/intlLocale';
import {
  computePeakAreas,
  formatSignificance,
  formatWithUncertainty,
  type PeakAreaResult,
} from '../../utils/collection/peakArea';
import type { CollectionSpectrumData } from '../../types/collection/spectrum';
import type { SpectrumAnnotation } from '../../types/collection/collection';

const WEAK_SIGNIFICANCE = 3;

const props = defineProps<{
  spectrum: CollectionSpectrumData;
  annotations: SpectrumAnnotation[];
  background: CollectionSpectrumData | null;
}>();

const { tSidebar, locale } = useLocale();

const rows = computed(() => {
  const results = computePeakAreas(props.spectrum, props.annotations, props.background);
  const byKey = new Map(results.map((r) => [`${r.energy}|${r.label}`, r]));
  return props.annotations.map((annotation) => {
    const result: PeakAreaResult | undefined = byKey.get(`${annotation.energy}|${annotation.label}`);
    return {
      key: `${annotation.energy}|${annotation.label}`,
      label: annotation.label,
      energy: annotation.energy.toLocaleString(toIntlLocale(locale.value)),
      area: result ? formatWithUncertainty(result.netCounts, result.sigma, locale.value) : null,
      rate: result ? formatWithUncertainty(result.netCps, result.sigmaCps, locale.value) : null,
      significance: result ? formatSignificance(result.significance, locale.value) : null,
      weak: result ? result.significance < WEAK_SIGNIFICANCE : false,
      blended: result?.blended ?? false,
    };
  });
});

const hasAnyArea = computed(() => rows.value.some((r) => r.area));
const hasBlended = computed(() => rows.value.some((r) => r.blended));
const hasSkipped = computed(() => rows.value.some((r) => !r.area));
const hasWeak = computed(() => rows.value.some((r) => r.weak));
</script>

<template>
  <details v-if="hasAnyArea" class="gamma-spectrum-peaks">
    <summary class="gamma-spectrum-peaks__summary">
      <span class="gamma-spectrum-peaks__chevron"><AppIcon name="caret-right" /></span>
      {{ tSidebar('collectionSpectrumPeaks') }}
    </summary>
    <div class="gamma-spectrum-peaks__scroll">
      <table class="gamma-spectrum-peaks__table">
        <thead>
          <tr>
            <th scope="col">{{ tSidebar('collectionSpectrumPeakLine') }}</th>
            <th scope="col" class="gamma-spectrum-peaks__num">{{ tSidebar('collectionSpectrumPeakEnergy') }}</th>
            <th scope="col" class="gamma-spectrum-peaks__num">{{ tSidebar('collectionSpectrumPeakArea') }}</th>
            <th scope="col" class="gamma-spectrum-peaks__num">{{ tSidebar('collectionSpectrumPeakRate') }}</th>
            <th scope="col" class="gamma-spectrum-peaks__num">{{ tSidebar('collectionSpectrumPeakSignificance') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.key">
            <th scope="row" class="gamma-spectrum-peaks__line">
              {{ row.label }}<sup v-if="row.blended" class="gamma-spectrum-peaks__mark">*</sup>
            </th>
            <td class="gamma-spectrum-peaks__num">{{ row.energy }}</td>
            <template v-if="row.area && row.rate">
              <td class="gamma-spectrum-peaks__num">{{ row.area.value }} ± {{ row.area.sigma }}</td>
              <td class="gamma-spectrum-peaks__num">{{ row.rate.value }} ± {{ row.rate.sigma }}</td>
              <td
                class="gamma-spectrum-peaks__num"
                :class="{ 'gamma-spectrum-peaks__weak': row.weak }"
                :title="row.weak ? tSidebar('collectionSpectrumPeakWeak') : undefined"
              >
                {{ row.significance }}
              </td>
            </template>
            <td v-else colspan="3" class="gamma-spectrum-peaks__num gamma-spectrum-peaks__skipped">—</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="gamma-spectrum-peaks__legend">
      <span v-if="hasBlended">* {{ tSidebar('collectionSpectrumPeakBlended') }}. </span>
      <span v-if="hasSkipped">— {{ tSidebar('collectionSpectrumPeakSkipped') }}. </span>
      <span v-if="hasWeak" class="gamma-spectrum-peaks__weak">{{ tSidebar('collectionSpectrumPeakWeak') }}. </span>
      {{ tSidebar('collectionSpectrumPeakMethod') }}
    </p>
  </details>
</template>

<style scoped>
.gamma-spectrum-peaks {
  margin-top: 10px;
}

.gamma-spectrum-peaks__summary {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  color: var(--color-chart-axis);
  list-style: none;
  cursor: pointer;
}

.gamma-spectrum-peaks__summary::-webkit-details-marker {
  display: none;
}

.gamma-spectrum-peaks__summary:hover {
  color: var(--color-text);
}

.gamma-spectrum-peaks__chevron {
  display: inline-flex;
  width: 10px;
  height: 10px;
  transition: transform 0.15s ease;
}

.gamma-spectrum-peaks__chevron :deep(svg) {
  width: 100%;
  height: 100%;
}

.gamma-spectrum-peaks[open] .gamma-spectrum-peaks__chevron {
  transform: rotate(90deg);
}

.gamma-spectrum-peaks__scroll {
  margin-top: 6px;
  overflow-x: auto;
}

.gamma-spectrum-peaks__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.gamma-spectrum-peaks__table th,
.gamma-spectrum-peaks__table td {
  padding: 3px 6px;
  border-bottom: 1px solid var(--color-border-subtle);
  text-align: left;
}

.gamma-spectrum-peaks__table thead th {
  font-weight: 700;
  color: var(--color-chart-axis);
}

.gamma-spectrum-peaks__table .gamma-spectrum-peaks__num {
  text-align: right;
}

.gamma-spectrum-peaks__line {
  font-weight: 600;
  color: var(--color-text);
}

.gamma-spectrum-peaks__mark {
  margin-left: 1px;
}

.gamma-spectrum-peaks__skipped {
  color: var(--color-text-tertiary);
}

.gamma-spectrum-peaks__weak {
  color: var(--color-error);
}

.gamma-spectrum-peaks__legend {
  margin: 6px 0 0;
  font-size: 10px;
  line-height: 1.4;
  color: var(--color-text-tertiary);
}

@media (max-width: 480px) {
  .gamma-spectrum-peaks__table th,
  .gamma-spectrum-peaks__table td {
    padding: 3px 3px;
  }

  .gamma-spectrum-peaks__table th:first-child,
  .gamma-spectrum-peaks__table td:first-child {
    padding-left: 0;
  }

  .gamma-spectrum-peaks__table th:last-child,
  .gamma-spectrum-peaks__table td:last-child {
    padding-right: 0;
  }
}
</style>
