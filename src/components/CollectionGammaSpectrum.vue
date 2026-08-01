<script setup lang="ts">
import { computed } from 'vue'
import {
  channelToEnergy,
  getCollectionSpectrum,
  getCollectionSpectrumXmlHref,
  type CollectionSpectrumData,
} from '../data'
import { useLocale } from '../locales'

const props = defineProps<{
  spectrumId: string
  accentColor?: string
}>()

const spectrum = computed(() => getCollectionSpectrum(props.spectrumId))
const { tSidebar, messages } = useLocale()
const xmlDownload = computed(() => {
  const href = getCollectionSpectrumXmlHref(props.spectrumId)
  const filename = messages.value.collection.spectrumFiles[props.spectrumId]
  if (!href || !filename) return null
  return { href, filename }
})

const DISPLAY_BINS = 340
const CHART_WIDTH = 400
const CHART_HEIGHT = 150

function detectDisplayMaxEnergy(
  counts: number[],
  calibration: CollectionSpectrumData['calibration'],
): number {
  const maxCount = Math.max(...counts)
  const threshold = Math.max(maxCount * 0.02, 6)

  let lastChannel = 0
  for (let ch = 0; ch < counts.length; ch++) {
    if ((counts[ch] ?? 0) >= threshold) lastChannel = ch
  }

  let maxEnergy = channelToEnergy(lastChannel, calibration)
  maxEnergy = Math.ceil((maxEnergy * 1.12) / 25) * 25
  return Math.max(maxEnergy, 750)
}

function buildXTicks(maxEnergy: number): number[] {
  const candidates = [25, 50, 100, 200, 250, 500, 1000]
  const step =
    candidates.find((s) => maxEnergy / s <= 6) ??
    candidates[candidates.length - 1]!

  const ticks: number[] = []
  for (let e = 0; e <= maxEnergy + step * 0.01; e += step) {
    ticks.push(Math.round(e))
  }
  return ticks
}

const chart = computed(() => {
  const data = spectrum.value
  if (!data) return null

  const { counts, calibration } = data
  const displayMaxEnergy = detectDisplayMaxEnergy(counts, calibration)
  const n = counts.length
  const binSize = Math.ceil(n / DISPLAY_BINS)
  const points: { energy: number; count: number }[] = []

  for (let i = 0; i < DISPLAY_BINS; i++) {
    const start = i * binSize
    const end = Math.min(start + binSize, n)
    let sum = 0
    for (let ch = start; ch < end; ch++) sum += counts[ch] ?? 0
    const mid = (start + end - 1) / 2
    const energy = channelToEnergy(mid, calibration)
    if (energy > displayMaxEnergy) continue
    points.push({ energy, count: sum })
  }

  if (points.length === 0) return null

  const maxCount = Math.max(...points.map((p) => p.count), 1)

  const width = CHART_WIDTH
  const height = CHART_HEIGHT
  const pad = { left: 28, right: 8, top: 10, bottom: 26 }
  const plotW = width - pad.left - pad.right
  const plotH = height - pad.top - pad.bottom
  const baseY = pad.top + plotH

  const toX = (energy: number) => pad.left + (energy / displayMaxEnergy) * plotW
  const toY = (count: number) => pad.top + plotH - (count / maxCount) * plotH

  const lineCoords = points.map((p) => `${toX(p.energy).toFixed(1)},${toY(p.count).toFixed(1)}`)
  const lastEnergy = points[points.length - 1]!.energy
  const areaPath = [
    `M ${toX(0).toFixed(1)},${baseY.toFixed(1)}`,
    ...points.map((p) => `L ${toX(p.energy).toFixed(1)},${toY(p.count).toFixed(1)}`),
    `L ${toX(lastEnergy).toFixed(1)},${baseY.toFixed(1)} Z`,
  ].join(' ')

  const xTicks = buildXTicks(displayMaxEnergy)

  return {
    width,
    height,
    baseY,
    pad,
    plotW,
    plotH,
    displayMaxEnergy,
    areaPath,
    linePath: lineCoords.join(' '),
    xTicks: xTicks.map((e) => ({
      energy: e,
      x: toX(e),
      label: String(e),
    })),
    yTicks: [0, 0.5, 1].map((t) => ({
      y: pad.top + plotH * (1 - t),
    })),
  }
})

const accent = computed(() => props.accentColor ?? '#c9a227')

const caption = computed(() => {
  const data = spectrum.value
  if (!data) return ''
  const minutes = Math.round(data.measurementTimeSec / 60)
  return `${data.device} · ${minutes} ${messages.value.collection.spectrumMinutes}`
})
</script>

<template>
  <div v-if="chart && spectrum" class="collection-gamma-spectrum">
    <svg
      class="collection-gamma-spectrum__chart"
      :viewBox="`0 0 ${chart.width} ${chart.height}`"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      :aria-label="spectrum.sample"
    >
      <defs>
        <linearGradient :id="`spectrum-fill-${spectrumId}`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" :stop-color="accent" stop-opacity="0.55" />
          <stop offset="100%" :stop-color="accent" stop-opacity="0.08" />
        </linearGradient>
      </defs>

      <line
        v-for="(tick, i) in chart.yTicks"
        :key="`y-${i}`"
        :x1="chart.pad.left"
        :y1="tick.y"
        :x2="chart.pad.left + chart.plotW"
        :y2="tick.y"
        class="collection-gamma-spectrum__grid"
      />

      <path
        :d="chart.areaPath"
        :fill="`url(#spectrum-fill-${spectrumId})`"
      />
      <polyline
        :points="chart.linePath"
        fill="none"
        class="collection-gamma-spectrum__line"
      />

      <line
        :x1="chart.pad.left"
        :y1="chart.baseY"
        :x2="chart.pad.left + chart.plotW"
        :y2="chart.baseY"
        class="collection-gamma-spectrum__axis"
      />

      <text
        v-for="tick in chart.xTicks"
        :key="tick.energy"
        :x="tick.x"
        :y="chart.height - 6"
        class="collection-gamma-spectrum__tick"
        text-anchor="middle"
      >
        {{ tick.label }}
      </text>

      <text
        :x="chart.pad.left + chart.plotW / 2"
        :y="chart.height - 1"
        class="collection-gamma-spectrum__axis-label"
        text-anchor="middle"
      >
        keV
      </text>
    </svg>
    <div class="collection-gamma-spectrum__footer">
      <p class="collection-gamma-spectrum__caption">{{ caption }}</p>
      <a
        v-if="xmlDownload"
        class="collection-gamma-spectrum__download"
        :href="xmlDownload.href"
        :download="xmlDownload.filename"
      >
        {{ tSidebar('collectionSpectrumDownload') }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.collection-gamma-spectrum {
  width: 100%;
  margin-top: 6px;
}

.collection-gamma-spectrum__chart {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 400 / 150;
  border: 1px solid var(--color-chart-border);
  border-radius: 6px;
  background: var(--color-chart-bg);
}

.collection-gamma-spectrum__grid {
  stroke: var(--color-chart-grid);
  stroke-width: 1;
}

.collection-gamma-spectrum__line {
  stroke: #8a6d28;
  stroke-width: 1;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.collection-gamma-spectrum__axis {
  stroke: var(--color-chart-line-muted);
  stroke-width: 1;
}

.collection-gamma-spectrum__tick {
  fill: var(--color-chart-axis);
  font-size: 9px;
  font-weight: 600;
}

.collection-gamma-spectrum__axis-label {
  fill: var(--color-chart-axis-muted);
  font-size: 8px;
  font-weight: 600;
}

.collection-gamma-spectrum__caption {
  margin: 0;
  font-size: 11px;
  font-weight: 600;
  color: var(--color-chart-axis);
}

.collection-gamma-spectrum__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 5px;
}

.collection-gamma-spectrum__download {
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 600;
  color: #c9a227;
  text-decoration: none;
  white-space: nowrap;
}

.collection-gamma-spectrum__download:hover {
  text-decoration: underline;
}
</style>
