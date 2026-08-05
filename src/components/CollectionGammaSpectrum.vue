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
import type { SpectrumAnnotation } from '../types/element'
import GammaSpectrumChartSvg from './GammaSpectrumChartSvg.vue'
import ElementSpectrumHeading from './ElementSpectrumHeading.vue'

interface SpectrumSibling {
  symbol: string
  color: string
  spectrumId: string
  originHtml?: string
  annotations?: SpectrumAnnotation[] | null
}

const props = defineProps<{
  spectrumId: string
  accentColor?: string
  elementSymbol?: string
  elementName?: string
  originHtml?: string
  annotations?: SpectrumAnnotation[] | null
  /** Other spectra to page through in the zoom modal (e.g. the whole collection list) - omit for a single, non-navigable spectrum. */
  siblings?: SpectrumSibling[]
  siblingIndex?: number
}>()

const { tSidebar, locale, messages } = useLocale()

const activeIndex = ref(props.siblingIndex ?? 0)
const siblingCount = computed(() => props.siblings?.length ?? 0)
const canNavigate = computed(() => siblingCount.value > 1)
const activeSibling = computed(() => props.siblings?.[activeIndex.value])

const activeSpectrumId = computed(() => activeSibling.value?.spectrumId ?? props.spectrumId)
const activeSymbol = computed(() => activeSibling.value?.symbol ?? props.elementSymbol)
const activeName = computed(() => {
  const sibling = activeSibling.value
  return sibling ? messages.value.elements[sibling.symbol] ?? '' : props.elementName
})
const activeOriginHtml = computed(() => activeSibling.value?.originHtml ?? props.originHtml)
const activeAnnotations = computed(() => activeSibling.value?.annotations ?? props.annotations)
const accent = computed(() => props.accentColor ?? '#c9a227')
const modalAccent = computed(() => activeSibling.value?.color ?? accent.value)

function navigate(delta: number) {
  if (!canNavigate.value) return
  const count = siblingCount.value
  activeIndex.value = (activeIndex.value + delta + count) % count
}

function navigatePrev() {
  navigate(-1)
}

function navigateNext() {
  navigate(1)
}

// `spectrum` backs the small static preview tile - always this element's own
// spectrum. `modalSpectrum` backs the zoom modal, which can page through
// siblings - kept separate so navigating inside an open modal never changes
// what the collection list's own thumbnail is showing.
async function fetchSpectrum(id: string): Promise<CollectionSpectrumData | null> {
  try {
    return await getCollectionSpectrum(id)
  } catch {
    // A chunk fetch can be aborted mid-flight (fast navigation, HMR reload);
    // leave the chart unrendered rather than surface an unhandled rejection.
    return null
  }
}

const spectrum = ref<CollectionSpectrumData | null>(null)
watch(() => props.spectrumId, async (id) => { spectrum.value = await fetchSpectrum(id) }, { immediate: true })

const modalSpectrum = ref<CollectionSpectrumData | null>(null)
watch(activeSpectrumId, async (id) => { modalSpectrum.value = await fetchSpectrum(id) }, { immediate: true })

function buildXmlDownload(id: string) {
  const href = getCollectionSpectrumXmlHref(id)
  const filename = resolveLocalizedLabel(collectionSpectrumFilenames[id], locale.value)
  if (!href || !filename) return null
  return { href, filename }
}

const xmlDownload = computed(() => buildXmlDownload(props.spectrumId))
const modalXmlDownload = computed(() => buildXmlDownload(activeSpectrumId.value))

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

function buildChart(
  data: CollectionSpectrumData | null,
  annotations: SpectrumAnnotation[] | null | undefined,
) {
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

  const markers = (annotations ?? [])
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
}

const chart = computed(() => buildChart(spectrum.value, props.annotations))
const modalChart = computed(() => buildChart(modalSpectrum.value, activeAnnotations.value))

function buildCaption(data: CollectionSpectrumData | null): string {
  return data?.device ?? ''
}

const caption = computed(() => buildCaption(spectrum.value))
const modalCaption = computed(() => buildCaption(modalSpectrum.value))

function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = Math.floor(totalSeconds % 60)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

function buildDurationLabel(data: CollectionSpectrumData | null): string {
  return data ? formatDuration(data.measurementTimeSec) : ''
}

const durationLabel = computed(() => buildDurationLabel(spectrum.value))
const modalDurationLabel = computed(() => buildDurationLabel(modalSpectrum.value))

function buildCpsLabel(data: CollectionSpectrumData | null): string {
  if (!data) return ''
  // Overall count rate over the whole measurement — exclude the device's
  // overflow tally in the last channel, same as the chart itself.
  const totalCounts = data.counts.slice(0, -1).reduce((sum, c) => sum + c, 0)
  const cps = totalCounts / data.measurementTimeSec
  const loc = locale.value === 'zh' ? 'zh-CN' : locale.value
  return `${cps.toLocaleString(loc, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} cps`
}

const cpsLabel = computed(() => buildCpsLabel(spectrum.value))
const modalCpsLabel = computed(() => buildCpsLabel(modalSpectrum.value))

const isZoomed = ref(false)

function openZoom() {
  activeIndex.value = props.siblingIndex ?? 0
  isZoomed.value = true
  document.addEventListener('keydown', onKeydown)
}

function closeZoom() {
  isZoomed.value = false
  document.removeEventListener('keydown', onKeydown)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeZoom()
  else if (event.key === 'ArrowLeft') navigatePrev()
  else if (event.key === 'ArrowRight') navigateNext()
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
              v-if="activeSymbol"
              :symbol="activeSymbol"
              :name="activeName ?? ''"
              :accent="modalAccent"
              :origin-html="activeOriginHtml"
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

          <div class="gamma-spectrum-modal__chart-wrap">
            <button
              v-if="canNavigate"
              type="button"
              class="gamma-spectrum-modal__nav gamma-spectrum-modal__nav--prev"
              :aria-label="tSidebar('collectionSpectrumPrev')"
              @click="navigatePrev"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M10 3l-5 5 5 5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            <GammaSpectrumChartSvg
              v-if="modalChart && modalSpectrum"
              class="gamma-spectrum-modal__chart"
              :chart="modalChart"
              :spectrum-id="activeSpectrumId"
              :accent="modalAccent"
              :sample-label="modalSpectrum.sample"
              :duration-label="modalDurationLabel"
              :cps-label="modalCpsLabel"
            />

            <button
              v-if="canNavigate"
              type="button"
              class="gamma-spectrum-modal__nav gamma-spectrum-modal__nav--next"
              :aria-label="tSidebar('collectionSpectrumNext')"
              @click="navigateNext"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M6 3l5 5-5 5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>

          <div class="gamma-spectrum-modal__footer">
            <p class="collection-gamma-spectrum__caption">{{ modalCaption }}</p>
            <a
              v-if="modalXmlDownload"
              class="collection-gamma-spectrum__download"
              :href="modalXmlDownload.href"
              :download="modalXmlDownload.filename"
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

.gamma-spectrum-modal__chart-wrap {
  position: relative;
  width: 100%;
}

.gamma-spectrum-modal__chart {
  aspect-ratio: 640 / 260;
  width: 100%;
  border: 1px solid var(--color-chart-border);
  border-radius: 6px;
}

.gamma-spectrum-modal__nav {
  position: absolute;
  top: 50%;
  z-index: 1;
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
  box-shadow: 0 2px 8px var(--color-shadow-md);
  transition: background-color 0.15s ease, color 0.15s ease;
  transform: translateY(-50%);
}

.gamma-spectrum-modal__nav:hover {
  background: var(--color-bg);
  color: var(--color-text);
}

.gamma-spectrum-modal__nav svg {
  width: 16px;
  height: 16px;
}

.gamma-spectrum-modal__nav--prev {
  left: 8px;
}

.gamma-spectrum-modal__nav--next {
  right: 8px;
}

.gamma-spectrum-modal__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
}

@media (max-width: 640px), (orientation: landscape) and (max-width: 960px) {
  .gamma-spectrum-modal {
    padding: 14px;
  }
}

/* Phones in landscape (incl. PWA / Pro Max width > 900px): the short viewport
   (~440pt tall) is shorter than the modal's natural content height, so
   centering with top:50%/translateY(-50%) and no height limit let the header
   spill above the top edge and the footer spill below the bottom edge at
   the same time. Anchor all four edges directly instead of centering with a
   transform — the box then has a fixed, well-defined size regardless of any
   vh/dvh quirks. Header/footer keep their natural size and the chart takes
   whatever's left (flex:1 1 auto; min-height:0), shrinking in width - and,
   via aspect-ratio, in height - to fit instead of triggering a scrollbar. */
@media (orientation: landscape) and (max-width: 960px) {
  .gamma-spectrum-modal {
    top: 12px;
    right: 12px;
    bottom: 12px;
    left: 12px;
    width: auto;
    transform: none;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .gamma-spectrum-modal__header,
  .gamma-spectrum-modal__footer {
    flex-shrink: 0;
  }

  .gamma-spectrum-modal__chart-wrap {
    flex: 1 1 auto;
    min-height: 0;
    width: auto;
    max-width: 100%;
    margin: 0 auto;
    display: flex;
  }

  .gamma-spectrum-modal__chart {
    width: auto;
    height: 100%;
    max-width: 100%;
  }
}
</style>
