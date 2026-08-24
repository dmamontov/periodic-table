<script setup lang="ts">
import type { GammaSpectrumChartData } from '../../types/collection/spectrum'

defineProps<{
  chart: GammaSpectrumChartData
  spectrumId: string
  accent: string
  sampleLabel: string
  durationLabel: string
  cpsLabel: string
}>()
</script>

<template>
  <svg
    class="gamma-spectrum-svg"
    :viewBox="`0 0 ${chart.width} ${chart.height}`"
    preserveAspectRatio="xMidYMid meet"
    role="img"
    :aria-label="sampleLabel"
  >
    <defs>
      <linearGradient :id="`spectrum-fill-${spectrumId}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" :stop-color="accent" stop-opacity="0.55" />
        <stop offset="100%" :stop-color="accent" stop-opacity="0.08" />
      </linearGradient>
    </defs>

    <g v-for="(tick, i) in chart.yTicks" :key="`y-${i}`">
      <line
        :x1="chart.pad.left"
        :y1="tick.y"
        :x2="chart.pad.left + chart.plotW"
        :y2="tick.y"
        class="gamma-spectrum-svg__grid"
      />
      <text
        :x="chart.pad.left - 4"
        :y="tick.y"
        class="gamma-spectrum-svg__ytick"
        text-anchor="end"
        dominant-baseline="middle"
      >
        {{ tick.label }}
      </text>
    </g>

    <path
      :d="chart.areaPath"
      :fill="`url(#spectrum-fill-${spectrumId})`"
    />
    <polyline
      v-if="chart.backgroundLinePath"
      :points="chart.backgroundLinePath"
      fill="none"
      class="gamma-spectrum-svg__background-line"
    />
    <polyline
      :points="chart.linePath"
      fill="none"
      class="gamma-spectrum-svg__line"
    />

    <line
      :x1="chart.pad.left"
      :y1="chart.baseY"
      :x2="chart.pad.left + chart.plotW"
      :y2="chart.baseY"
      class="gamma-spectrum-svg__axis"
    />

    <text
      v-for="tick in chart.xTicks"
      :key="tick.energy"
      :x="tick.x"
      :y="chart.height - 6"
      class="gamma-spectrum-svg__tick"
      text-anchor="middle"
    >
      {{ tick.label }}
    </text>

    <text
      :x="chart.pad.left + chart.plotW / 2"
      :y="chart.height - 1"
      class="gamma-spectrum-svg__axis-label"
      text-anchor="middle"
    >
      keV
    </text>

    <g v-for="(marker, i) in chart.markers" :key="`marker-${i}`">
      <line
        :x1="marker.x"
        :y1="chart.pad.top"
        :x2="marker.x"
        :y2="chart.baseY"
        class="gamma-spectrum-svg__marker-line"
      />
      <text
        :x="marker.x + 3"
        :y="chart.baseY - 4"
        class="gamma-spectrum-svg__marker-label"
        text-anchor="start"
        :transform="`rotate(-90 ${marker.x + 3} ${chart.baseY - 4})`"
      >
        {{ marker.label }}
      </text>
    </g>

    <text
      :x="chart.width - 8"
      y="18"
      class="gamma-spectrum-svg__readout"
      text-anchor="end"
    >
      {{ durationLabel }}
    </text>
    <text
      :x="chart.width - 8"
      y="32"
      class="gamma-spectrum-svg__readout"
      text-anchor="end"
    >
      {{ cpsLabel }}
    </text>
  </svg>
</template>

<style scoped>
.gamma-spectrum-svg {
  display: block;
  width: 100%;
  height: auto;
  background: var(--color-chart-bg);
}

.gamma-spectrum-svg__grid {
  stroke: var(--color-chart-grid);
  stroke-width: 1;
}

.gamma-spectrum-svg__line {
  stroke: #8a6d28;
  stroke-width: 1;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.gamma-spectrum-svg__background-line {
  stroke: var(--color-chart-axis-muted);
  stroke-width: 1;
  stroke-dasharray: 2 2;
  stroke-linejoin: round;
  stroke-linecap: round;
  opacity: 0.85;
}

.gamma-spectrum-svg__axis {
  stroke: var(--color-chart-line-muted);
  stroke-width: 1;
}

.gamma-spectrum-svg__tick {
  fill: var(--color-chart-axis);
  font-size: 9px;
  font-weight: 600;
}

.gamma-spectrum-svg__ytick {
  fill: var(--color-chart-axis-muted);
  font-size: 8px;
  font-weight: 600;
}

.gamma-spectrum-svg__axis-label {
  fill: var(--color-chart-axis-muted);
  font-size: 8px;
  font-weight: 600;
}

.gamma-spectrum-svg__readout {
  fill: var(--color-chart-axis);
  font-size: 12px;
  font-weight: 700;
}

.gamma-spectrum-svg__marker-line {
  stroke: var(--color-chart-marker);
  stroke-width: 1;
  stroke-dasharray: 3 3;
  opacity: 0.75;
}

.gamma-spectrum-svg__marker-label {
  fill: var(--color-chart-marker);
  font-size: 9px;
  font-weight: 700;
}
</style>
