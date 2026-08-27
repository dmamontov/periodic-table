<script setup lang="ts">
import { computed, ref } from 'vue';
import { useLocale } from '../../locales';
import type { Element } from '../../types/element/element';
import type { ElementCollectionHistoryEntry, SpectrumAnnotation } from '../../types/collection/collection';
import {
  formatCollectionAcquiredDate,
  formatCollectionManufactureDate,
  formatCollectionPurity,
  formatCollectionSampleLabel,
  formatCollectionWeight,
  resolveCollectionLabel,
  resolvePhysicalStateLabel,
  resolveSourceType,
} from '../../utils/collection/labels';
import { formatDecayChainHtml, formatIsotopeHtml, formatSpectrumOriginHtml } from '../../utils/element/isotopes';
import { resolveLocalizedLabel, type LocalizedLabel } from '../../utils/localizedLabel';
import CollectionGammaSpectrum from '../collection/CollectionGammaSpectrum.vue';
import ElementSpectrumHeading from '../collection/ElementSpectrumHeading.vue';
import AppIcon from '../common/AppIcon.vue';
import CloseButton from '../common/CloseButton.vue';
import CollectionStatusLegend from '../common/CollectionStatusLegend.vue';
import { COLLECTION_COLOR, CURRENT_COLOR, RETAINED_COLOR, NOT_RETAINED_COLOR } from '../../theme/colors';

const props = defineProps<{
  element: Element;
  elementName: string;
  displaySymbol: string;
  accentColor?: string;
}>();

const { messages, locale, tSidebar } = useLocale();

const accent = computed(() => props.accentColor ?? COLLECTION_COLOR);

function pastMarkerColor(retained: boolean | null | undefined): string {
  return retained === false ? NOT_RETAINED_COLOR : RETAINED_COLOR;
}

interface TimelineEntry extends ElementCollectionHistoryEntry {
  isCurrent: boolean;
  markerColor: string;
}

const timeline = computed<TimelineEntry[]>(() => {
  const collection = props.element.collection;
  const past = (collection?.history ?? [])
    .slice()
    .reverse()
    .map((entry) => ({
      ...entry,
      isCurrent: false,
      markerColor: pastMarkerColor(entry.retained),
    }));
  const current: TimelineEntry = {
    physical: collection?.physical,
    radioactive: collection?.radioactive,
    spectrum: collection?.spectrum,
    isCurrent: true,
    markerColor: CURRENT_COLOR,
  };
  return [current, ...past];
});

function stateLabel(entry: TimelineEntry): string {
  return resolvePhysicalStateLabel(entry.physical, locale.value);
}

function containerLabel(entry: TimelineEntry): string {
  return resolveCollectionLabel(locale.value, 'containers', entry.physical?.container);
}

function allotropeLabel(entry: TimelineEntry): string {
  return resolveLocalizedLabel(entry.physical?.allotrope, locale.value);
}

function purityLabel(entry: TimelineEntry): string {
  return formatCollectionPurity(entry.physical?.purity);
}

function weightLabel(entry: TimelineEntry): string {
  return formatCollectionWeight(
    entry.physical?.weight,
    messages.value.sidebar.units.milligram,
    messages.value.sidebar.units.gram,
  );
}

function manufactureDateLabel(entry: TimelineEntry): string {
  return formatCollectionManufactureDate(entry.physical?.manufactureDate, locale.value);
}

function isotopeHtml(entry: TimelineEntry): string {
  return formatIsotopeHtml(props.element.symbol, entry.radioactive?.isotope);
}

function sourceTypeLabel(entry: TimelineEntry): string {
  if (entry.radioactive?.sourceType !== 'secondary') return '';
  return resolveSourceType(locale.value, entry.radioactive?.sourceType);
}

function decayChainHtml(entry: TimelineEntry): string {
  return formatDecayChainHtml(props.element.symbol, entry.radioactive?.isotope, entry.radioactive?.decayParent);
}

function spectrumOriginHtml(entry: TimelineEntry): string {
  return formatSpectrumOriginHtml(props.element.symbol, entry.radioactive?.isotope, entry.radioactive?.decayParent);
}

function spectrumSampleLabel(entry: TimelineEntry): string {
  return formatCollectionSampleLabel(entry.physical, locale.value);
}

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

// Paging in the spectrum zoom modal opened from here should only page through this element's own
// history entries that actually have a spectrum - not the whole collection's spectra.
const spectrumSiblings = computed<SpectrumSibling[]>(() =>
  timeline.value.flatMap((entry) => {
    const spectrum = entry.spectrum;
    if (!spectrum?.id) return [];
    return [
      {
        symbol: props.displaySymbol,
        color: props.element.color,
        spectrumId: spectrum.id,
        originHtml: spectrumOriginHtml(entry),
        sampleLabel: spectrumSampleLabel(entry),
        isCurrent: entry.isCurrent,
        isPast: !entry.isCurrent,
        retained: entry.retained,
        annotations: spectrum.annotations,
        leadShielded: spectrum.leadShielded,
        backgroundSpectrumId: spectrum.backgroundSpectrumId,
        note: spectrum.note,
      },
    ];
  }),
);

function spectrumSiblingIndex(entry: TimelineEntry): number {
  return spectrumSiblings.value.findIndex((sibling) => sibling.spectrumId === entry.spectrum?.id);
}

function reasonLabel(entry: TimelineEntry): string {
  return resolveCollectionLabel(locale.value, 'reasons', entry.reason);
}

function dateLabel(entry: TimelineEntry): string {
  const date = formatCollectionAcquiredDate(entry.physical?.acquiredDate, locale.value);
  if (entry.isCurrent) {
    return date
      ? `${tSidebar('collectionHistoryCurrent')} (${tSidebar('collectionHistorySince')} ${date})`
      : tSidebar('collectionHistoryCurrent');
  }
  return date ? `${tSidebar('collectionHistorySince')} ${date}` : '';
}

const isOpen = ref(false);

function open(): void {
  isOpen.value = true;
  document.addEventListener('keydown', onKeydown);
}

function close(): void {
  isOpen.value = false;
  document.removeEventListener('keydown', onKeydown);
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key !== 'Escape') return;
  event.stopPropagation();
  close();
}
</script>

<template>
  <slot name="trigger" :open="open">
    <button
      type="button"
      class="element-collection-history-trigger"
      :style="{ color: accent }"
      :aria-label="messages.sidebar.props.collectionHistory"
      :title="messages.sidebar.props.collectionHistory"
      @click="open"
    >
      <AppIcon name="history" />
    </button>
  </slot>

  <Teleport to="body">
    <Transition name="collection-history-modal-backdrop">
      <button
        v-if="isOpen"
        type="button"
        class="collection-history-modal__backdrop"
        :aria-label="tSidebar('close')"
        @click="close"
      />
    </Transition>
    <Transition name="collection-history-modal-panel">
      <div v-if="isOpen" class="collection-history-modal" role="dialog" aria-modal="true">
        <div class="collection-history-modal__header">
          <div class="collection-history-modal__header-text">
            <ElementSpectrumHeading :symbol="displaySymbol" :name="elementName" :accent="element.color" compact />
            <h3 class="collection-history-modal__title">{{ messages.sidebar.props.collectionHistory }}</h3>
          </div>
          <CloseButton :aria-label="tSidebar('close')" @click="close" />
        </div>

        <CollectionStatusLegend class="collection-history-modal__legend" />

        <div class="collection-history-modal__timeline">
          <div
            v-for="(entry, index) in timeline"
            :key="index"
            class="collection-history-modal__entry"
            :class="{ 'collection-history-modal__entry--current': entry.isCurrent }"
          >
            <div class="collection-history-modal__marker" :style="{ backgroundColor: entry.markerColor }" />
            <div class="collection-history-modal__content">
              <div v-if="dateLabel(entry)" class="collection-history-modal__date">{{ dateLabel(entry) }}</div>
              <ul class="collection-history-modal__facts">
                <li v-if="purityLabel(entry)" class="collection-history-modal__fact">
                  <span class="collection-history-modal__fact-label">{{
                    messages.sidebar.props.collectionPurity
                  }}</span>
                  <span class="collection-history-modal__fact-value">{{ purityLabel(entry) }}</span>
                </li>
                <li v-if="weightLabel(entry)" class="collection-history-modal__fact">
                  <span class="collection-history-modal__fact-label">{{
                    messages.sidebar.props.collectionWeight
                  }}</span>
                  <span class="collection-history-modal__fact-value">{{ weightLabel(entry) }}</span>
                </li>
                <li v-if="stateLabel(entry)" class="collection-history-modal__fact">
                  <span class="collection-history-modal__fact-label">{{
                    messages.sidebar.props.collectionSampleState
                  }}</span>
                  <span class="collection-history-modal__fact-value">{{ stateLabel(entry) }}</span>
                </li>
                <li v-if="allotropeLabel(entry)" class="collection-history-modal__fact">
                  <span class="collection-history-modal__fact-label">{{
                    messages.sidebar.props.collectionAllotrope
                  }}</span>
                  <span class="collection-history-modal__fact-value">{{ allotropeLabel(entry) }}</span>
                </li>
                <li v-if="containerLabel(entry)" class="collection-history-modal__fact">
                  <span class="collection-history-modal__fact-label">{{
                    messages.sidebar.props.collectionContainer
                  }}</span>
                  <span class="collection-history-modal__fact-value">{{ containerLabel(entry) }}</span>
                </li>
                <li v-if="manufactureDateLabel(entry)" class="collection-history-modal__fact">
                  <span class="collection-history-modal__fact-label">{{
                    messages.sidebar.props.collectionManufactureDate
                  }}</span>
                  <span class="collection-history-modal__fact-value">{{ manufactureDateLabel(entry) }}</span>
                </li>
                <li v-if="isotopeHtml(entry)" class="collection-history-modal__fact">
                  <span class="collection-history-modal__fact-label">{{
                    messages.sidebar.props.collectionIsotope
                  }}</span>
                  <span class="collection-history-modal__fact-value" v-html="isotopeHtml(entry)" />
                </li>
                <li v-if="sourceTypeLabel(entry)" class="collection-history-modal__fact">
                  <span class="collection-history-modal__fact-label">{{
                    messages.sidebar.props.collectionSourceType
                  }}</span>
                  <span class="collection-history-modal__fact-value">{{ sourceTypeLabel(entry) }}</span>
                </li>
                <li v-if="decayChainHtml(entry)" class="collection-history-modal__fact">
                  <span class="collection-history-modal__fact-label">{{
                    messages.sidebar.props.collectionDecayParent
                  }}</span>
                  <span class="collection-history-modal__fact-value" v-html="decayChainHtml(entry)" />
                </li>
                <li v-if="reasonLabel(entry)" class="collection-history-modal__fact">
                  <span class="collection-history-modal__fact-label">{{
                    messages.sidebar.props.collectionHistoryReason
                  }}</span>
                  <span class="collection-history-modal__fact-value">{{ reasonLabel(entry) }}</span>
                </li>
              </ul>
              <CollectionGammaSpectrum
                v-if="entry.spectrum?.id"
                class="collection-history-modal__spectrum"
                :spectrum-id="entry.spectrum.id"
                :accent-color="element.color"
                :element-symbol="displaySymbol"
                :element-name="elementName"
                :origin-html="spectrumOriginHtml(entry)"
                :sample-label="spectrumSampleLabel(entry)"
                :is-current="entry.isCurrent"
                :is-past="!entry.isCurrent"
                :retained="entry.retained"
                :annotations="entry.spectrum.annotations"
                :lead-shielded="entry.spectrum.leadShielded"
                :background-spectrum-id="entry.spectrum.backgroundSpectrumId"
                :note="entry.spectrum.note"
                :siblings="spectrumSiblings"
                :sibling-index="spectrumSiblingIndex(entry)"
              />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.element-collection-history-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: none;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.element-collection-history-trigger:hover {
  background: var(--color-bg-muted);
}

.element-collection-history-trigger :deep(svg) {
  width: 14px;
  height: 14px;
}

.collection-history-modal__backdrop {
  position: fixed;
  inset: 0;
  z-index: 300;
  border: none;
  background: var(--color-overlay);
  cursor: pointer;
}

.collection-history-modal-backdrop-enter-active,
.collection-history-modal-backdrop-leave-active {
  transition: opacity 0.2s ease;
}

.collection-history-modal-backdrop-enter-from,
.collection-history-modal-backdrop-leave-to {
  opacity: 0;
}

.collection-history-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 310;
  width: min(560px, 94vw);
  max-height: 86vh;
  padding: 20px;
  box-sizing: border-box;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  box-shadow: 0 12px 40px var(--color-shadow-lg);
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
}

.collection-history-modal-panel-enter-active,
.collection-history-modal-panel-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.collection-history-modal-panel-enter-from,
.collection-history-modal-panel-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.96);
}

.collection-history-modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  flex-shrink: 0;
  margin-bottom: 14px;
}

.collection-history-modal__header-text {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.collection-history-modal__title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
}

.collection-history-modal__legend {
  flex-shrink: 0;
  margin-bottom: 26px;
}

.collection-history-modal__timeline {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.collection-history-modal__entry {
  position: relative;
  display: flex;
  gap: 12px;
  padding-bottom: 20px;
}

.collection-history-modal__entry::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 12px;
  bottom: 0;
  width: 1px;
  background: var(--color-border);
}

.collection-history-modal__entry:last-child::before {
  display: none;
}

.collection-history-modal__marker {
  flex-shrink: 0;
  width: 9px;
  height: 9px;
  margin-top: 4px;
  border-radius: 50%;
}

.collection-history-modal__content {
  flex: 1 1 auto;
  min-width: 0;
}

.collection-history-modal__date {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--color-text-muted);
}

.collection-history-modal__facts {
  list-style: none;
  margin: 4px 0 0;
  padding: 0;
}

.collection-history-modal__fact {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 16px;
  padding: 9px 0;
  border-bottom: 1px solid var(--color-border-light);
  font-size: 13px;
}

.collection-history-modal__fact:last-child {
  border-bottom: none;
}

.collection-history-modal__fact-label {
  color: var(--color-text-secondary);
  font-weight: 400;
}

.collection-history-modal__fact-value {
  color: var(--color-text);
  font-weight: 700;
  text-align: right;
  word-break: break-word;
}

.collection-history-modal__spectrum {
  margin-top: 10px;
}

@media (max-width: 640px) {
  .collection-history-modal {
    width: 92vw;
    padding: 14px;
  }
}
</style>
