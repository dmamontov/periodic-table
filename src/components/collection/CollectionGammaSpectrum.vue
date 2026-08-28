<script setup lang="ts">
import { computed, onUnmounted, ref, useTemplateRef, watch } from 'vue';
import { getCollectionSpectrum } from '../../utils/collection/spectrumLoader';
import { useLocale } from '../../locales';
import { cyclicIndex } from '../../utils/cyclicIndex';
import { resolveLocalizedLabel, type LocalizedLabel } from '../../utils/localizedLabel';
import { useSpectrumDisplay } from '../../composables/useSpectrumDisplay';
import { useDismissibleTooltip } from '../../composables/useDismissibleTooltip';
import { useModalFocusTrap } from '../../composables/useModalFocusTrap';
import { COLLECTION_COLOR } from '../../theme/colors';
import type { CollectionSpectrumData } from '../../types/collection/spectrum';
import type { SpectrumAnnotation } from '../../types/collection/collection';
import AppIcon from '../common/AppIcon.vue';
import CloseButton from '../common/CloseButton.vue';
import PillSwitcherGroup from '../common/PillSwitcherGroup.vue';
import PillSwitcherButton from '../common/PillSwitcherButton.vue';
import TooltipBubble from '../common/TooltipBubble.vue';
import {
  SPECTRUM_SMOOTHING_DEFAULT,
  SPECTRUM_SMOOTHING_MAX,
  type SpectrumYScale,
} from '../../utils/collection/spectrumChart';
import ElementSpectrumHeading from './ElementSpectrumHeading.vue';
import GammaSpectrumChartSvg from './GammaSpectrumChartSvg.vue';

interface SpectrumSibling {
  symbol: string;
  color: string;
  spectrumId: string;
  originHtml?: string;
  sampleLabel?: string;
  isCurrent?: boolean;
  isPast?: boolean;
  retained?: boolean | null;
  annotations?: SpectrumAnnotation[] | null;
  leadShielded?: boolean | null;
  backgroundSpectrumId?: string | null;
  note?: LocalizedLabel | null;
}

const props = defineProps<{
  spectrumId: string;
  accentColor?: string;
  elementSymbol?: string;
  elementName?: string;
  originHtml?: string;
  sampleLabel?: string;
  isCurrent?: boolean;
  isPast?: boolean;
  retained?: boolean | null;
  annotations?: SpectrumAnnotation[] | null;
  leadShielded?: boolean | null;
  backgroundSpectrumId?: string | null;
  note?: LocalizedLabel | null;
  /** Other spectra to page through in the zoom modal (e.g. the whole collection list) - omit for a single, non-navigable spectrum. */
  siblings?: SpectrumSibling[];
  siblingIndex?: number;
}>();

const { tSidebar, messages, locale } = useLocale();

const activeIndex = ref(props.siblingIndex ?? 0);
const siblingCount = computed(() => props.siblings?.length ?? 0);
const canNavigate = computed(() => siblingCount.value > 1);
const activeSibling = computed(() => props.siblings?.[activeIndex.value]);

const activeSpectrumId = computed(() => activeSibling.value?.spectrumId ?? props.spectrumId);
const activeSymbol = computed(() => activeSibling.value?.symbol ?? props.elementSymbol);
const activeName = computed(() => {
  const sibling = activeSibling.value;
  return sibling ? (messages.value.elements[sibling.symbol] ?? '') : props.elementName;
});
// Per-field `??` would leak this card's own origin/annotations onto a sibling that simply has none of its own.
const activeOriginHtml = computed(() => (activeSibling.value ? activeSibling.value.originHtml : props.originHtml));
const activeSampleLabel = computed(() => (activeSibling.value ? activeSibling.value.sampleLabel : props.sampleLabel));
const activeIsCurrent = computed(() => (activeSibling.value ? activeSibling.value.isCurrent : props.isCurrent));
const activeIsPast = computed(() => (activeSibling.value ? activeSibling.value.isPast : props.isPast));
const activeRetained = computed(() => (activeSibling.value ? activeSibling.value.retained : props.retained));
const activeAnnotations = computed(() => (activeSibling.value ? activeSibling.value.annotations : props.annotations));
const activeLeadShielded = computed(() =>
  activeSibling.value ? activeSibling.value.leadShielded : props.leadShielded,
);
const activeBackgroundSpectrumId = computed(() =>
  activeSibling.value ? activeSibling.value.backgroundSpectrumId : props.backgroundSpectrumId,
);
const activeNote = computed(() => {
  const note = activeSibling.value ? activeSibling.value.note : props.note;
  return resolveLocalizedLabel(note, locale.value);
});
// This card's own note, unaffected by which sibling is paged to in the zoom modal - the inline
// (non-modal) caption must stay tied to this specific spectrum, not to the modal's navigation state.
const ownNote = computed(() => resolveLocalizedLabel(props.note, locale.value));

const leadIconEl = useTemplateRef<HTMLElement>('leadIconEl');
const leadTooltip = useDismissibleTooltip(leadIconEl);
const modalLeadIconEl = useTemplateRef<HTMLElement>('modalLeadIconEl');
const modalLeadTooltip = useDismissibleTooltip(modalLeadIconEl);
const accent = computed(() => props.accentColor ?? COLLECTION_COLOR);
const modalAccent = computed(() => activeSibling.value?.color ?? accent.value);

function navigate(delta: number) {
  if (!canNavigate.value) return;
  activeIndex.value = cyclicIndex(activeIndex.value, delta, siblingCount.value);
}

function navigatePrev() {
  navigate(-1);
}

function navigateNext() {
  navigate(1);
}

// `modalSpectrum` is kept separate from `spectrum` so navigating siblings in the modal never changes the thumbnail.
const isZoomed = ref(false);

async function fetchSpectrum(id: string | null | undefined): Promise<CollectionSpectrumData | null> {
  try {
    return await getCollectionSpectrum(id);
  } catch {
    // A chunk fetch can be aborted mid-flight; leave the chart unrendered rather than throw.
    return null;
  }
}

const spectrum = ref<CollectionSpectrumData | null>(null);
const modalSpectrumCache = new Map<string, CollectionSpectrumData | null>();
watch(
  () => props.spectrumId,
  async (id) => {
    spectrum.value = await fetchSpectrum(id);
    modalSpectrumCache.set(id, spectrum.value);
  },
  { immediate: true },
);

const background = ref<CollectionSpectrumData | null>(null);
watch(
  () => props.backgroundSpectrumId,
  async (id) => {
    background.value = await fetchSpectrum(id);
  },
  { immediate: true },
);

// Fetches only while the modal is open, reusing the `spectrum` cache; `seq` drops stale responses from out-of-order navigation.
let modalFetchSeq = 0;
const modalSpectrum = ref<CollectionSpectrumData | null>(null);
const modalBackground = ref<CollectionSpectrumData | null>(null);
watch(
  [activeSpectrumId, isZoomed],
  async ([id, zoomed]) => {
    // Bumped unconditionally so a still-in-flight fetch from a previous invocation can't land late and clobber the display.
    const seq = ++modalFetchSeq;
    if (!zoomed) return;
    if (modalSpectrumCache.has(id)) {
      modalSpectrum.value = modalSpectrumCache.get(id) ?? null;
    } else {
      modalSpectrum.value = null;
      const data = await fetchSpectrum(id);
      modalSpectrumCache.set(id, data);
      if (seq === modalFetchSeq) modalSpectrum.value = data;
    }

    const bg = await fetchSpectrum(activeBackgroundSpectrumId.value);
    if (seq === modalFetchSeq) modalBackground.value = bg;
  },
  { immediate: true },
);

const { chart, caption, durationLabel, cpsLabel, xmlDownload } = useSpectrumDisplay(
  spectrum,
  computed(() => props.spectrumId),
  computed(() => props.annotations),
  undefined,
  undefined,
  background,
);
const modalYScale = ref<SpectrumYScale>('linear');
const modalSmoothing = ref(SPECTRUM_SMOOTHING_DEFAULT);
const {
  chart: modalChart,
  caption: modalCaption,
  durationLabel: modalDurationLabel,
  cpsLabel: modalCpsLabel,
  xmlDownload: modalXmlDownload,
} = useSpectrumDisplay(
  modalSpectrum,
  activeSpectrumId,
  activeAnnotations,
  modalYScale,
  modalSmoothing,
  modalBackground,
);

function openZoom() {
  activeIndex.value = props.siblingIndex ?? 0;
  isZoomed.value = true;
}

function closeZoom() {
  isZoomed.value = false;
}

function onArrowKeydown(event: KeyboardEvent) {
  /* v8 ignore next -- both ArrowLeft and ArrowRight are exercised in
     tests/components/collection/CollectionGammaSpectrum.test.ts; v8 never populates the synthetic
     "no branch taken" location for an if with no terminal else (same root cause documented on the
     equivalent `if (!entry)` in ElementProductionMap.vue). */
  if (event.key === 'ArrowLeft') navigatePrev();
  else if (event.key === 'ArrowRight') navigateNext();
}

watch(isZoomed, (open) => {
  if (open) document.addEventListener('keydown', onArrowKeydown);
  else document.removeEventListener('keydown', onArrowKeydown);
});

onUnmounted(() => document.removeEventListener('keydown', onArrowKeydown));

const modalPanelEl = useTemplateRef<HTMLElement>('modalPanelEl');
useModalFocusTrap(isZoomed, modalPanelEl, closeZoom);
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
        <span
          v-if="leadShielded"
          ref="leadIconEl"
          class="collection-gamma-spectrum__lead-icon-wrap"
          @keydown="leadTooltip.onKeydown"
          @pointerenter="leadTooltip.onPointerEnter"
          @pointerleave="leadTooltip.onPointerLeave"
        >
          <button
            type="button"
            class="collection-gamma-spectrum__lead-icon"
            :aria-label="tSidebar('collectionSpectrumLeadShielded')"
            @click.stop="leadTooltip.toggle"
          >
            <AppIcon name="shield-check" />
          </button>
          <TooltipBubble :tooltip="leadTooltip">{{ tSidebar('collectionSpectrumLeadShielded') }}</TooltipBubble>
        </span>
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
    <p v-if="ownNote" class="collection-gamma-spectrum__note">
      <span class="collection-gamma-spectrum__note-label">{{ tSidebar('collectionSpectrumNote') }}:</span>
      {{ ownNote }}
    </p>

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
        <div
          v-if="isZoomed"
          ref="modalPanelEl"
          class="gamma-spectrum-modal"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
        >
          <div class="gamma-spectrum-modal__header">
            <ElementSpectrumHeading
              v-if="activeSymbol"
              :symbol="activeSymbol"
              :name="activeName ?? ''"
              :accent="modalAccent"
              :origin-html="activeOriginHtml"
              :sample-label="activeSampleLabel"
              :is-current="activeIsCurrent"
              :is-past="activeIsPast"
              :retained="activeRetained"
            />
            <CloseButton class="gamma-spectrum-modal__close" :aria-label="tSidebar('close')" @click="closeZoom" />
          </div>

          <div class="gamma-spectrum-modal__chart-wrap">
            <button
              v-if="canNavigate"
              type="button"
              class="gamma-spectrum-modal__nav gamma-spectrum-modal__nav--prev"
              :aria-label="tSidebar('collectionSpectrumPrev')"
              @click="navigatePrev"
            >
              <AppIcon name="caret-left" />
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
              <AppIcon name="caret-right" />
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
                <span
                  v-if="activeLeadShielded"
                  ref="modalLeadIconEl"
                  class="collection-gamma-spectrum__lead-icon-wrap"
                  @keydown="modalLeadTooltip.onKeydown"
                  @pointerenter="modalLeadTooltip.onPointerEnter"
                  @pointerleave="modalLeadTooltip.onPointerLeave"
                >
                  <button
                    type="button"
                    class="collection-gamma-spectrum__lead-icon"
                    :aria-label="tSidebar('collectionSpectrumLeadShielded')"
                    @click.stop="modalLeadTooltip.toggle"
                  >
                    <AppIcon name="shield-check" />
                  </button>
                  <TooltipBubble :tooltip="modalLeadTooltip">{{
                    tSidebar('collectionSpectrumLeadShielded')
                  }}</TooltipBubble>
                </span>
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
          <p v-if="activeNote" class="collection-gamma-spectrum__note">
            <span class="collection-gamma-spectrum__note-label">{{ tSidebar('collectionSpectrumNote') }}:</span>
            {{ activeNote }}
          </p>
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
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0;
  font-size: 11px;
  font-weight: 600;
  color: var(--color-chart-axis);
}

.collection-gamma-spectrum__lead-icon-wrap {
  display: inline-flex;
}

.collection-gamma-spectrum__lead-icon {
  display: inline-flex;
  width: 13px;
  height: 13px;
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  cursor: pointer;
  transition: color 0.15s ease;
}

.collection-gamma-spectrum__lead-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.collection-gamma-spectrum__lead-icon:hover {
  color: var(--color-text);
}

.collection-gamma-spectrum__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 5px;
}

.collection-gamma-spectrum__note {
  margin: 4px 0 0;
  font-size: 11px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--color-text-secondary);
}

.collection-gamma-spectrum__note-label {
  font-weight: 700;
  color: var(--color-chart-axis);
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
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
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
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
  transform: translateY(-50%);
}

.gamma-spectrum-modal__nav:hover {
  background: var(--color-bg);
  color: var(--color-text);
}

.gamma-spectrum-modal__nav :deep(svg) {
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
  .gamma-spectrum-modal__footer,
  .collection-gamma-spectrum__note {
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
