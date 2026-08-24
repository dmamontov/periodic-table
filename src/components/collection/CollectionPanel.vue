<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLocale } from '../../locales'
import { computeCollectionStats } from '../../utils/collection/stats'
import { formatCollectionAcquiredDate } from '../../utils/collection/labels'
import { elements, getElementRouteSymbol } from '../../data'
import { formatDecayChainHtml, formatIsotopeHtml } from '../../utils/element/isotopes'
import { wishlist } from '../../data/collection'
import type { Element } from '../../types/element/element'
import type { ElementCollection, ElementCollectionHistoryEntry } from '../../types/collection/collection'
import CollectionGammaSpectrum from './CollectionGammaSpectrum.vue'
import ElementSpectrumHeading from './ElementSpectrumHeading.vue'
import CollectionWishlistRow from './CollectionWishlistRow.vue'
import CollectionHistoryRow from './CollectionHistoryRow.vue'
import CollapsibleSection from '../common/CollapsibleSection.vue'
import DrawerShell from '../common/DrawerShell.vue'
import CloseButton from '../common/CloseButton.vue'
import { COLLECTION_COLOR, WISHLIST_UPGRADE_COLOR } from '../../theme/colors'

const RADIOACTIVE_COLOR = 'var(--color-error)'
const SPECTRA_COLOR = 'var(--color-link)'
const WISHLIST_COLOR = WISHLIST_UPGRADE_COLOR
const HISTORY_COLOR = '#8b5cf6'
const HISTORY_NEW_COLOR = COLLECTION_COLOR
const HISTORY_REPLACED_COLOR = '#64748b'

const route = useRoute()
const router = useRouter()
const { messages, locale, tLegend, collectionName } = useLocale()

const isOpen = computed(() => route.name === 'collection')
const stats = computeCollectionStats()
const sectionCollapsed = ref(false)
const spectraCollapsed = ref(true)
const historyCollapsed = ref(true)
const wishlistCollapsed = ref(true)

const spectrumElements = elements.flatMap((el) => {
  const spectrumId = el.collection?.spectrum?.id
  if (!spectrumId) return []
  const radioactive = el.collection?.radioactive
  const originHtml =
    formatDecayChainHtml(el.symbol, radioactive?.isotope, radioactive?.decayParent) ||
    formatIsotopeHtml(el.symbol, radioactive?.isotope)
  return [
    {
      symbol: el.symbol,
      routeSymbol: getElementRouteSymbol(el.symbol),
      color: el.color,
      spectrumId,
      originHtml,
      annotations: el.collection?.spectrum?.annotations,
      leadShielded: el.collection?.spectrum?.leadShielded,
      backgroundSpectrumId: el.collection?.spectrum?.backgroundSpectrumId,
      note: el.collection?.spectrum?.note,
    },
  ]
})

interface HistoryTimelineItem {
  key: string
  element: Element
  symbol: string
  color: string
  rawDate: string
  type: 'new' | 'replacement'
}

const historyTimeline: HistoryTimelineItem[] = elements
  .flatMap((el) => {
    if (!el.collection) return []
    const versions: (ElementCollectionHistoryEntry | ElementCollection)[] = [...(el.collection.history ?? []), el.collection]
    return versions.flatMap((version, index) => {
      const rawDate = version.physical?.acquiredDate
      if (!rawDate) return []
      return [
        {
          key: `${el.symbol}-${index}`,
          element: el,
          symbol: el.symbol,
          color: el.color,
          rawDate,
          type: index === 0 ? ('new' as const) : ('replacement' as const),
        },
      ]
    })
  })
  .sort((a, b) => b.rawDate.localeCompare(a.rawDate))

// Iterate in periodic-table (atomic number) order rather than object insertion order.
const wishlistElements = elements.flatMap((el) => {
  const entry = wishlist[el.symbol]
  if (!entry) return []
  const originHtml =
    formatDecayChainHtml(el.symbol, entry.isotope, entry.decayParent) ||
    formatIsotopeHtml(el.symbol, entry.isotope)
  return [
    {
      symbol: el.symbol,
      routeSymbol: getElementRouteSymbol(el.symbol),
      color: el.color,
      originHtml,
      links: entry.links,
      upgrade: entry.upgrade,
    },
  ]
})

function percentOf(part: number, total: number): number {
  return total === 0 ? 0 : Math.round((part / total) * 100)
}

function close() {
  void router.push({ name: 'home' })
}

function openElement(symbol: string) {
  void router.push({ name: 'element', params: { symbol } })
}
</script>

<template>
  <DrawerShell
    panel-class="collection-panel"
    :is-open="isOpen"
    :close-label="messages.collectionPanel.close"
    @close="close"
  >
      <div v-if="isOpen" class="collection-panel__shell">
        <header class="collection-panel__header">
          <div class="collection-panel__heading">
            <h2 class="collection-panel__title">{{ collectionName }}</h2>
          </div>
          <CloseButton :aria-label="messages.collectionPanel.close" @click="close" />
        </header>

        <div class="collection-panel__content">
          <CollapsibleSection
            v-model:collapsed="sectionCollapsed"
            :title="messages.collectionPanel.sectionTitle"
            :accent-color="COLLECTION_COLOR"
          >
              <p class="collection-panel__note">{{ messages.collectionPanel.collectibleNote }}</p>

              <div class="collection-panel__rows">
                <div class="collection-panel__row">
                  <span class="collection-panel__row-label">{{ messages.collectionPanel.statCollected }}</span>
                  <span class="collection-panel__row-track">
                    <span
                      class="collection-panel__row-fill"
                      :style="{
                        width: percentOf(stats.elementCounts.collected, stats.elementCounts.total) + '%',
                        backgroundColor: COLLECTION_COLOR,
                      }"
                    />
                    <span
                      class="collection-panel__row-unavailable"
                      :style="{
                        left: percentOf(stats.elementCounts.collectible, stats.elementCounts.total) + '%',
                      }"
                    />
                  </span>
                  <span class="collection-panel__row-value"><span :style="{ color: COLLECTION_COLOR }">{{ stats.elementCounts.collected }}</span><span class="collection-panel__row-value-sep">/</span><span class="collection-panel__row-value-mid">{{
                      stats.elementCounts.collectible
                    }}</span><span class="collection-panel__row-value-sep">/</span><span class="collection-panel__row-value-total">{{
                      stats.elementCounts.total
                    }}</span></span>
                </div>

                <div class="collection-panel__row">
                  <span class="collection-panel__row-label">{{
                    messages.collectionPanel.statRadioactive
                  }}</span>
                  <span class="collection-panel__row-track">
                    <span
                      class="collection-panel__row-fill"
                      :style="{
                        width:
                          percentOf(stats.radioactiveCounts.collected, stats.radioactiveCounts.total) +
                          '%',
                        backgroundColor: RADIOACTIVE_COLOR,
                      }"
                    />
                    <span
                      class="collection-panel__row-unavailable"
                      :style="{
                        left:
                          percentOf(stats.radioactiveCounts.collectible, stats.radioactiveCounts.total) +
                          '%',
                      }"
                    />
                  </span>
                  <span class="collection-panel__row-value"><span :style="{ color: RADIOACTIVE_COLOR }">{{
                      stats.radioactiveCounts.collected
                    }}</span><span class="collection-panel__row-value-sep">/</span><span class="collection-panel__row-value-mid">{{
                      stats.radioactiveCounts.collectible
                    }}</span><span class="collection-panel__row-value-sep">/</span><span class="collection-panel__row-value-total">{{
                      stats.radioactiveCounts.total
                    }}</span></span>
                </div>

                <hr class="collection-panel__divider" />

                <div v-for="cat in stats.categoryCounts" :key="cat.id" class="collection-panel__row">
                  <span class="collection-panel__row-label">{{ tLegend(cat.id) }}</span>
                  <span class="collection-panel__row-track">
                    <span
                      class="collection-panel__row-fill"
                      :style="{
                        width: percentOf(cat.collected, cat.total) + '%',
                        backgroundColor: cat.color,
                      }"
                    />
                    <span
                      class="collection-panel__row-unavailable"
                      :style="{ left: percentOf(cat.collectible, cat.total) + '%' }"
                    />
                  </span>
                  <span class="collection-panel__row-value"><span :style="{ color: cat.color }">{{ cat.collected }}</span><span class="collection-panel__row-value-sep">/</span><span class="collection-panel__row-value-mid">{{ cat.collectible }}</span><span class="collection-panel__row-value-sep">/</span><span class="collection-panel__row-value-total">{{ cat.total }}</span></span>
                </div>
              </div>

              <hr class="collection-panel__divider collection-panel__divider--section-end" />
          </CollapsibleSection>

          <CollapsibleSection
            v-if="spectrumElements.length"
            v-model:collapsed="spectraCollapsed"
            :title="messages.collectionPanel.spectraSectionTitle"
            :accent-color="SPECTRA_COLOR"
          >
<div class="collection-panel__spectra-list">
              <div
                v-for="(item, index) in spectrumElements"
                :key="item.symbol"
                class="collection-panel__spectrum-card"
              >
                <button
                  type="button"
                  class="collection-panel__spectrum-header"
                  @click="openElement(item.routeSymbol)"
                >
                  <ElementSpectrumHeading
                    :symbol="item.symbol"
                    :name="messages.elements[item.symbol] ?? ''"
                    :accent="item.color"
                    :origin-html="item.originHtml"
                    compact
                  />
                </button>
                <CollectionGammaSpectrum
                  :spectrum-id="item.spectrumId"
                  :accent-color="item.color"
                  :element-symbol="item.symbol"
                  :element-name="messages.elements[item.symbol]"
                  :origin-html="item.originHtml"
                  :annotations="item.annotations"
                  :lead-shielded="item.leadShielded"
                  :background-spectrum-id="item.backgroundSpectrumId"
                  :note="item.note"
                  :siblings="spectrumElements"
                  :sibling-index="index"
                />
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            v-if="wishlistElements.length"
            v-model:collapsed="wishlistCollapsed"
            :title="messages.collectionPanel.wishlistSectionTitle"
            :accent-color="WISHLIST_COLOR"
          >
            <div class="collection-panel__wishlist-list">
              <CollectionWishlistRow
                v-for="item in wishlistElements"
                :key="item.symbol"
                :symbol="item.symbol"
                :name="messages.elements[item.symbol] ?? ''"
                :color="item.color"
                :origin-html="item.originHtml"
                :links="item.links"
                :upgrade="item.upgrade"
                @open="openElement(item.routeSymbol)"
              />
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            v-if="historyTimeline.length"
            v-model:collapsed="historyCollapsed"
            :title="messages.collectionPanel.historySectionTitle"
            :accent-color="HISTORY_COLOR"
          >
            <div class="collection-panel__timeline">
              <CollectionHistoryRow
                v-for="item in historyTimeline"
                :key="item.key"
                :element="item.element"
                :name="messages.elements[item.symbol] ?? ''"
                :color="item.color"
                :date="formatCollectionAcquiredDate(item.rawDate, locale)"
                :badge-color="item.type === 'new' ? HISTORY_NEW_COLOR : HISTORY_REPLACED_COLOR"
                :badge-label="item.type === 'new' ? messages.collectionPanel.historyNewBadge : messages.collectionPanel.historyReplacedBadge"
              />
            </div>
          </CollapsibleSection>
        </div>
      </div>
  </DrawerShell>
</template>

<style scoped>
.collection-panel__shell {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
}

.collection-panel__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 20px 24px 4px;
}

.collection-panel__title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
}

.collection-panel__note {
  margin: 0 0 16px;
  font-size: 12px;
  line-height: 1.4;
  color: var(--color-text-tertiary);
}

.collection-panel__content {
  padding: 8px 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.collection-panel__rows {
  display: grid;
  grid-template-columns: minmax(120px, auto) 1fr auto;
  align-items: center;
  row-gap: 10px;
  column-gap: 10px;
}

.collection-panel__divider {
  grid-column: 1 / -1;
  height: 1px;
  margin: 0;
  border: none;
  background: var(--color-border);
}

.collection-panel__divider--section-end {
  margin-top: 12px;
}

.collection-panel__row {
  display: contents;
}

.collection-panel__row-label {
  font-size: 13px;
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.collection-panel__row-track {
  position: relative;
  height: 5px;
  border-radius: 999px;
  background: var(--color-heatmap-fade);
  overflow: hidden;
}

.collection-panel__row-fill {
  position: absolute;
  inset: 0;
  border-radius: 999px;
}

.collection-panel__row-unavailable {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    135deg,
    var(--color-text-tertiary) 0,
    var(--color-text-tertiary) 2px,
    transparent 2px,
    transparent 4px
  );
  opacity: 0.55;
}

.collection-panel__row-value {
  font-size: 13px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.collection-panel__row-value-sep {
  color: var(--color-text-tertiary);
  opacity: 0.7;
}

.collection-panel__row-value-mid {
  color: var(--color-text-secondary);
}

.collection-panel__row-value-total {
  color: var(--color-text-tertiary);
}

.collection-panel__spectra-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0 16px;
}

.collection-panel__spectrum-card {
  padding: 11px 0;
  border-bottom: 1px solid var(--color-border-light);
}

.collection-panel__spectrum-header {
  display: block;
  width: 100%;
  margin: 0 0 8px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
}

.collection-panel__spectrum-header :deep(.element-spectrum-heading__name) {
  transition: color 0.15s ease;
}

.collection-panel__spectrum-header:hover :deep(.element-spectrum-heading__name) {
  color: var(--color-text);
}

.collection-panel__wishlist-list {
  display: flex;
  flex-direction: column;
}

.collection-panel__timeline {
  display: flex;
  flex-direction: column;
}

@media (max-width: 900px) {
  .collection-panel__header {
    padding: 16px 16px 4px;
  }

  .collection-panel__content {
    padding: 8px 16px 24px;
  }

  .collection-panel__rows {
    grid-template-columns: minmax(90px, auto) 1fr auto;
    column-gap: 8px;
  }
}
</style>

<style>
/*
 * DrawerShell teleports its root to <body>, so it's no longer a DOM descendant
 * of CollectionPanel's own render tree — neither scoped attribute selectors nor
 * :deep() (which still requires a scope-attribute ancestor) can reach it. This
 * unscoped block targets it by class directly; ".drawer-shell.collection-panel"
 * matches DrawerShell's own scoped ".drawer-shell[data-v-x]" specificity so the
 * override wins on normal cascade order (this block is emitted after DrawerShell's).
 */
.drawer-shell.collection-panel {
  width: min(720px, 96vw);
}

@media (max-width: 900px) {
  .drawer-shell.collection-panel {
    width: 100vw;
  }
}
</style>
