<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import {
  channelToEnergy,
  collectionSpectrumFilenames,
  getCollectionSpectrum,
  getCollectionSpectrumXmlHref,
  type CollectionSpectrumData,
} from '../data'
import { useLocale } from '../locales'
import { resolveLocalizedLabel } from '../utils/localizedLabel'
import { spectrumAnnotations } from '../data/spectrumAnnotations'
import GammaSpectrumChartSvg from './GammaSpectrumChartSvg.vue'
import ElementSpectrumHeading from './ElementSpectrumHeading.vue'

const props = defineProps<{
  spectrumId: string
  accentColor?: string
  elementSymbol?: string
  elementName?: string
  originHtml?: string
}>()

const spectrum = ref<CollectionSpectrumData | null>(null)

watch(
  () => props.spectrumId,
  async (id) => {
    try {
      spectrum.value = await getCollectionSpectrum(id)
    } catch {
      // A chunk fetch can be aborted mid-flight (fast navigation, HMR reload);
      // leave the chart unrendered rather than surface an unhandled rejection.
      spectrum.value = null
    }
  },
  { immediate: true },
)

const { tSidebar, locale } = useLocale()
const xmlDownload = computed(() => {
  const href = getCollectionSpectrumXmlHref(props.spectrumId)
  const filename = resolveLocalizedLabel(collectionSpectrumFilenames[props.spectrumId], locale.value)
  if (!href || !filename) return null
  return { href, filename }
})

const CHART_WIDTH = 640
const CHART_HEIGHT = 260

function detectDisplayMaxEnergy(
  counts: number[],
  calibration: CollectionSpectrumData['calibration'],
): number {
  // The device dumps an overflow/pileup tally into the very last channel
  // regardless of the real spectrum shape; excluded so it doesn't stretch the range.
  const spectralCounts = counts.slice(0, -1)
  const maxCount = Math.max(...spectralCounts)
  const threshold = Math.max(maxCount * 0.02, 6)

  let lastChannel = 0
  for (let ch = 0; ch < spectralCounts.length; ch++) {
    if ((spectralCounts[ch] ?? 0) >= threshold) lastChannel = ch
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

/** "Nice" round-number ticks (1-2-5-10 pattern) for the linear count axis. */
function buildYTicks(maxCount: number): number[] {
  const roughStep = maxCount / 4
  const magnitude = 10 ** Math.floor(Math.log10(roughStep || 1))
  const residual = roughStep / magnitude
  const niceResidual = residual >= 5 ? 10 : residual >= 2 ? 5 : residual >= 1 ? 2 : 1
  const step = niceResidual * magnitude

  const ticks: number[] = []
  for (let v = 0; v <= maxCount + step * 0.01; v += step) ticks.push(Math.round(v))
  return ticks
}

function formatYTick(value: number): string {
  if (value < 1000) return String(value)
  const k = value / 1000
  return `${Number.isInteger(k) ? k : k.toFixed(1)}k`
}

/**
 * Light moving average. Adjacent channels are uncorrelated noise, but a real
 * gamma peak spans several of them — smoothing tames the single-channel
 * Poisson spikes that a log scale would otherwise blow up into fake "peaks".
 */
function smoothCounts(counts: number[], radius = 2): number[] {
  const n = counts.length
  const out = new Array<number>(n)
  for (let i = 0; i < n; i++) {
    const lo = Math.max(0, i - radius)
    const hi = Math.min(n - 1, i + radius)
    let sum = 0
    for (let j = lo; j <= hi; j++) sum += counts[j] ?? 0
    out[i] = sum / (hi - lo + 1)
  }
  return out
}

const chart = computed(() => {
  const data = spectrum.value
  if (!data) return null

  const { counts, calibration } = data
  const displayMaxEnergy = detectDisplayMaxEnergy(counts, calibration)
  // Drop the device's overflow tally in the last channel before smoothing/plotting.
  const smoothed = smoothCounts(counts.slice(0, -1))
  const points: { ch: number; count: number }[] = []

  for (let ch = 0; ch < smoothed.length; ch++) {
    if (channelToEnergy(ch, calibration) > displayMaxEnergy) break
    points.push({ ch, count: smoothed[ch] ?? 0 })
  }

  if (points.length === 0) return null

  const maxCount = Math.max(...points.map((p) => p.count), 1)

  const width = CHART_WIDTH
  const height = CHART_HEIGHT
  const pad = { left: 34, right: 8, top: 10, bottom: 26 }
  const plotW = width - pad.left - pad.right
  const plotH = height - pad.top - pad.bottom
  const baseY = pad.top + plotH

  const toX = (energy: number) => pad.left + (energy / displayMaxEnergy) * plotW
  const toY = (count: number) => pad.top + plotH - (count / maxCount) * plotH
  // Each channel's own bar edges — a real spectrometer bins counts per
  // channel rather than interpolating a curve between channel centers.
  const leftEdgeX = (ch: number) => toX(channelToEnergy(ch - 0.5, calibration))
  const rightEdgeX = (ch: number) => toX(channelToEnergy(ch + 0.5, calibration))

  const stepCoords: string[] = []
  for (const p of points) {
    const y = toY(p.count).toFixed(1)
    stepCoords.push(`${leftEdgeX(p.ch).toFixed(1)},${y}`, `${rightEdgeX(p.ch).toFixed(1)},${y}`)
  }
  const lineCoords = stepCoords

  const firstX = leftEdgeX(points[0]!.ch)
  const lastX = rightEdgeX(points[points.length - 1]!.ch)
  const areaPath = [
    `M ${firstX.toFixed(1)},${baseY.toFixed(1)}`,
    `L ${stepCoords.join(' L ')}`,
    `L ${lastX.toFixed(1)},${baseY.toFixed(1)} Z`,
  ].join(' ')

  const xTicks = buildXTicks(displayMaxEnergy)

  const markers = (spectrumAnnotations[props.spectrumId] ?? [])
    .filter((a) => a.energy > 0 && a.energy <= displayMaxEnergy)
    .map((a) => ({ x: toX(a.energy), label: a.label }))

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
    yTicks: buildYTicks(maxCount).map((v) => ({
      value: v,
      y: toY(v),
      label: formatYTick(v),
    })),
    markers,
  }
})

const accent = computed(() => props.accentColor ?? '#c9a227')

const caption = computed(() => spectrum.value?.device ?? '')

function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = Math.floor(totalSeconds % 60)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

const durationLabel = computed(() => {
  const data = spectrum.value
  return data ? formatDuration(data.measurementTimeSec) : ''
})

const cpsLabel = computed(() => {
  const data = spectrum.value
  if (!data) return ''
  // Overall count rate over the whole measurement — exclude the device's
  // overflow tally in the last channel, same as the chart itself.
  const totalCounts = data.counts.slice(0, -1).reduce((sum, c) => sum + c, 0)
  const cps = totalCounts / data.measurementTimeSec
  const loc = locale.value === 'zh' ? 'zh-CN' : locale.value
  return `${cps.toLocaleString(loc, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} cps`
})

const isZoomed = ref(false)

function openZoom() {
  isZoomed.value = true
  document.addEventListener('keydown', onKeydown)
}

function closeZoom() {
  isZoomed.value = false
  document.removeEventListener('keydown', onKeydown)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeZoom()
}

onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div v-if="chart && spectrum" class="collection-gamma-spectrum">
    <button
      type="button"
      class="collection-gamma-spectrum__trigger"
      :aria-label="tSidebar('collectionSpectrumZoom')"
      @click="openZoom"
    >
      <GammaSpectrumChartSvg
        class="collection-gamma-spectrum__chart"
        :chart="chart"
        :spectrum-id="spectrumId"
        :accent="accent"
        :sample-label="spectrum.sample"
        :duration-label="durationLabel"
        :cps-label="cpsLabel"
      />
    </button>
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

    <Teleport to="body">
      <Transition name="gamma-spectrum-modal-backdrop">
        <button
          v-if="isZoomed"
          type="button"
          class="gamma-spectrum-modal__backdrop"
          :aria-label="tSidebar('close')"
          @click="closeZoom"
        />
      </Transition>
      <Transition name="gamma-spectrum-modal-panel">
        <div v-if="isZoomed" class="gamma-spectrum-modal" role="dialog" aria-modal="true">
          <div class="gamma-spectrum-modal__header">
            <ElementSpectrumHeading
              v-if="elementSymbol"
              :symbol="elementSymbol"
              :name="elementName ?? ''"
              :accent="accent"
              :origin-html="originHtml"
            />
            <button
              type="button"
              class="gamma-spectrum-modal__close"
              :aria-label="tSidebar('close')"
              @click="closeZoom"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M4 4l8 8M12 4l-8 8"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>

          <GammaSpectrumChartSvg
            class="gamma-spectrum-modal__chart"
            :chart="chart"
            :spectrum-id="spectrumId"
            :accent="accent"
            :sample-label="spectrum.sample"
            :duration-label="durationLabel"
            :cps-label="cpsLabel"
          />

          <div class="gamma-spectrum-modal__footer">
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
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.collection-gamma-spectrum {
  width: 100%;
  margin-top: 6px;
}

.collection-gamma-spectrum__trigger {
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: none;
  cursor: zoom-in;
}

.collection-gamma-spectrum__chart {
  aspect-ratio: 640 / 260;
  border: 1px solid var(--color-chart-border);
  border-radius: 6px;
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

.gamma-spectrum-modal__backdrop {
  position: fixed;
  inset: 0;
  z-index: 300;
  border: none;
  background: var(--color-overlay);
  cursor: pointer;
}

.gamma-spectrum-modal-backdrop-enter-active,
.gamma-spectrum-modal-backdrop-leave-active {
  transition: opacity 0.2s ease;
}

.gamma-spectrum-modal-backdrop-enter-from,
.gamma-spectrum-modal-backdrop-leave-to {
  opacity: 0;
}

.gamma-spectrum-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 310;
  width: min(900px, 94vw);
  padding: 20px;
  box-sizing: border-box;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  box-shadow: 0 12px 40px var(--color-shadow-lg);
  transform: translate(-50%, -50%);
}

.gamma-spectrum-modal-panel-enter-active,
.gamma-spectrum-modal-panel-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.gamma-spectrum-modal-panel-enter-from,
.gamma-spectrum-modal-panel-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.96);
}

.gamma-spectrum-modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}

.gamma-spectrum-modal__header :deep(.element-spectrum-heading) {
  flex: 1 1 auto;
}

.gamma-spectrum-modal__close {
  flex-shrink: 0;
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: var(--color-bg-muted);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.gamma-spectrum-modal__close:hover {
  background: var(--color-bg);
  color: var(--color-text);
}

.gamma-spectrum-modal__close svg {
  width: 15px;
  height: 15px;
}

.gamma-spectrum-modal__chart {
  aspect-ratio: 640 / 260;
  width: 100%;
  border: 1px solid var(--color-chart-border);
  border-radius: 6px;
}

.gamma-spectrum-modal__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
}

@media (max-width: 640px) {
  .gamma-spectrum-modal {
    padding: 14px;
  }
}
</style>
