<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { getCollectionSpectrum } from '../../data'
import { useLocale } from '../../locales'
import { cyclicIndex } from '../../utils/cyclicIndex'
import { useSpectrumDisplay } from '../../composables/useSpectrumDisplay'
import { COLLECTION_COLOR } from '../../theme/colors'
import type { CollectionSpectrumData } from '../../types/collection/spectrum'
import type { SpectrumAnnotation } from '../../types/collection/collection'
import GammaSpectrumChartSvg from './GammaSpectrumChartSvg.vue'
import ElementSpectrumHeading from './ElementSpectrumHeading.vue'
import CloseButton from '../common/CloseButton.vue'
import PillSwitcherGroup from '../common/PillSwitcherGroup.vue'
import PillSwitcherButton from '../common/PillSwitcherButton.vue'
import {
  SPECTRUM_SMOOTHING_DEFAULT,
  SPECTRUM_SMOOTHING_MAX,
  type SpectrumYScale,
} from '../../utils/collection/spectrumChart'

interface SpectrumSibling {
  symbol: string
  color: string
  spectrumId: string
  originHtml?: string
  annotations?: SpectrumAnnotation[] | null
  leadShielded?: boolean | null
}

const props = defineProps<{
  spectrumId: string
  accentColor?: string
  elementSymbol?: string
  elementName?: string
  originHtml?: string
  annotations?: SpectrumAnnotation[] | null
  leadShielded?: boolean | null
  /** Other spectra to page through in the zoom modal (e.g. the whole collection list) - omit for a single, non-navigable spectrum. */
  siblings?: SpectrumSibling[]
  siblingIndex?: number
}>()

const { tSidebar, messages } = useLocale()

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
// Per-field `??` would leak this card's own origin/annotations onto a sibling that simply has none of its own.
const activeOriginHtml = computed(() =>
  activeSibling.value ? activeSibling.value.originHtml : props.originHtml,
)
const activeAnnotations = computed(() =>
  activeSibling.value ? activeSibling.value.annotations : props.annotations,
)
const activeLeadShielded = computed(() =>
  activeSibling.value ? activeSibling.value.leadShielded : props.leadShielded,
)
const accent = computed(() => props.accentColor ?? COLLECTION_COLOR)
const modalAccent = computed(() => activeSibling.value?.color ?? accent.value)

function navigate(delta: number) {
  if (!canNavigate.value) return
  activeIndex.value = cyclicIndex(activeIndex.value, delta, siblingCount.value)
}

function navigatePrev() {
  navigate(-1)
}

function navigateNext() {
  navigate(1)
}

// `modalSpectrum` is kept separate from `spectrum` so navigating siblings in the modal never changes the thumbnail.
const isZoomed = ref(false)

async function fetchSpectrum(id: string): Promise<CollectionSpectrumData | null> {
  try {
    return await getCollectionSpectrum(id)
  } catch {
    // A chunk fetch can be aborted mid-flight; leave the chart unrendered rather than throw.
    return null
  }
}

const spectrum = ref<CollectionSpectrumData | null>(null)
const modalSpectrumCache = new Map<string, CollectionSpectrumData | null>()
watch(
  () => props.spectrumId,
  async (id) => {
    spectrum.value = await fetchSpectrum(id)
    modalSpectrumCache.set(id, spectrum.value)
  },
  { immediate: true },
)

// Fetches only while the modal is open, reusing the `spectrum` cache; `seq` drops stale responses from out-of-order navigation.
let modalFetchSeq = 0
const modalSpectrum = ref<CollectionSpectrumData | null>(null)
watch(
  [activeSpectrumId, isZoomed],
  async ([id, zoomed]) => {
    // Bumped unconditionally so a still-in-flight fetch from a previous invocation can't land late and clobber the display.
    const seq = ++modalFetchSeq
    if (!zoomed) return
    if (modalSpectrumCache.has(id)) {
      modalSpectrum.value = modalSpectrumCache.get(id) ?? null
      return
    }
    modalSpectrum.value = null
    const data = await fetchSpectrum(id)
    modalSpectrumCache.set(id, data)
    if (seq === modalFetchSeq) modalSpectrum.value = data
  },
  { immediate: true },
)

const {
  chart,
  caption,
  durationLabel,
  cpsLabel,
  xmlDownload,
} = useSpectrumDisplay(
  spectrum,
  computed(() => props.spectrumId),
  computed(() => props.annotations),
)
const modalYScale = ref<SpectrumYScale>('linear')
const modalSmoothing = ref(SPECTRUM_SMOOTHING_DEFAULT)
const {
  chart: modalChart,
  caption: modalCaption,
  durationLabel: modalDurationLabel,
  cpsLabel: modalCpsLabel,
  xmlDownload: modalXmlDownload,
} = useSpectrumDisplay(modalSpectrum, activeSpectrumId, activeAnnotations, modalYScale, modalSmoothing)

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
      <p class="collection-gamma-spectrum__caption">
        {{ caption }}
        <svg
          v-if="leadShielded"
          class="collection-gamma-spectrum__lead-icon"
          viewBox="0 0 256 256"
          role="img"
          :aria-label="tSidebar('collectionSpectrumLeadShielded')"
          :title="tSidebar('collectionSpectrumLeadShielded')"
        >
          <title>{{ tSidebar('collectionSpectrumLeadShielded') }}</title>
          <path
            d="M224,56v56c0,52.72-25.52,84.67-46.93,102.19-23.06,18.86-46,25.27-47,25.53a8,8,0,0,1-4.2,0c-1-.26-23.91-6.67-47-25.53C57.52,196.67,32,164.72,32,112V56A16,16,0,0,1,48,40H208A16,16,0,0,1,224,56Z"
            fill="currentColor"
          />
        </svg>
      </p>
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
            <CloseButton
              class="gamma-spectrum-modal__close"
              :aria-label="tSidebar('close')"
              @click="closeZoom"
            />
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

          <label class="gamma-spectrum-modal__filter">
            <span class="gamma-spectrum-modal__filter-label">{{ tSidebar('collectionSpectrumFilter') }}</span>
            <input
              v-model.number="modalSmoothing"
              type="range"
              min="0"
              :max="SPECTRUM_SMOOTHING_MAX"
              step="1"
              class="gamma-spectrum-modal__filter-slider"
            />
            <span class="gamma-spectrum-modal__filter-value">{{ modalSmoothing }}</span>
          </label>

          <div class="gamma-spectrum-modal__footer">
            <div class="gamma-spectrum-modal__footer-left">
              <p class="collection-gamma-spectrum__caption">
                {{ modalCaption }}
                <svg
                  v-if="activeLeadShielded"
                  class="collection-gamma-spectrum__lead-icon"
                  viewBox="0 0 256 256"
                  role="img"
                  :aria-label="tSidebar('collectionSpectrumLeadShielded')"
                  :title="tSidebar('collectionSpectrumLeadShielded')"
                >
                  <title>{{ tSidebar('collectionSpectrumLeadShielded') }}</title>
                  <path
                    d="M224,56v56c0,52.72-25.52,84.67-46.93,102.19-23.06,18.86-46,25.27-47,25.53a8,8,0,0,1-4.2,0c-1-.26-23.91-6.67-47-25.53C57.52,196.67,32,164.72,32,112V56A16,16,0,0,1,48,40H208A16,16,0,0,1,224,56Z"
                    fill="currentColor"
                  />
                </svg>
              </p>
              <PillSwitcherGroup
                class="gamma-spectrum-modal__scale-group"
                :aria-label="tSidebar('collectionSpectrumScale')"
              >
                <PillSwitcherButton
                  class="gamma-spectrum-modal__scale-btn"
                  :active="modalYScale === 'linear'"
                  :aria-label="tSidebar('collectionSpectrumScaleLinear')"
                  @click="modalYScale = 'linear'"
                >
                  {{ tSidebar('collectionSpectrumScaleLinear') }}
                </PillSwitcherButton>
                <PillSwitcherButton
                  class="gamma-spectrum-modal__scale-btn"
                  :active="modalYScale === 'log'"
                  :aria-label="tSidebar('collectionSpectrumScaleLog')"
                  @click="modalYScale = 'log'"
                >
                  {{ tSidebar('collectionSpectrumScaleLog') }}
                </PillSwitcherButton>
              </PillSwitcherGroup>
            </div>
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

.collection-gamma-spectrum__lead-icon {
  width: 10px;
  height: 10px;
  margin-left: 2px;
  vertical-align: -1px;
  cursor: help;
  transition: color 0.15s ease;
}

.collection-gamma-spectrum__caption:hover .collection-gamma-spectrum__lead-icon {
  color: var(--color-text);
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
  color: v-bind(COLLECTION_COLOR);
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
  margin-left: auto;
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

.gamma-spectrum-modal__filter {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  cursor: pointer;
}

.gamma-spectrum-modal__filter-label {
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 600;
  color: var(--color-chart-axis);
}

.gamma-spectrum-modal__filter-slider {
  flex: 1 1 auto;
  min-width: 0;
  accent-color: v-bind(COLLECTION_COLOR);
  cursor: pointer;
}

.gamma-spectrum-modal__filter-value {
  flex-shrink: 0;
  min-width: 1ch;
  font-size: 11px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--color-chart-axis);
  text-align: right;
}

.gamma-spectrum-modal__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
}

.gamma-spectrum-modal__footer-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.gamma-spectrum-modal__scale-group {
  --pill-switcher-height: 19px;
  --pill-switcher-min-width: 28px;
  --pill-switcher-padding-x: 6px;
}

.gamma-spectrum-modal__scale-btn {
  font-family: var(--font-body);
  font-size: var(--pill-switcher-font-size);
  font-weight: 700;
  line-height: 1;
}

@media (max-width: 640px), (orientation: landscape) and (max-width: 960px) {
  .gamma-spectrum-modal {
    padding: 14px;
  }
}

/* Short landscape viewports: anchor all four edges instead of centering with a transform, so header/footer can't spill past the top/bottom edge. */
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
    /* Stays a full-width, plain block box — the aspect-ratio math below lives on its
       (non-flex-item) child instead, since resolving `width: auto` from `aspect-ratio`
       + `height: 100%` directly on a non-stretched flex item (the previous approach,
       via `align-self: center`) isn't reliable in every engine. */
    width: 100%;
  }

  /* Higher specificity than GammaSpectrumChartSvg's own scoped width/height rule, which a bare override loses depending on build CSS ordering. */
  .gamma-spectrum-modal__chart-wrap .gamma-spectrum-modal__chart {
    display: block;
    height: 100%;
    aspect-ratio: 640 / 260;
    width: auto;
    max-width: 100%;
    margin: 0 auto;
  }
}
</style>
