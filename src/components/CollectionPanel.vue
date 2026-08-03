<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLocale } from '../locales'
import { computeCollectionStats } from '../utils/collectionStats'
import { elements, getElementRouteSymbol } from '../data'
import CollectionGammaSpectrum from './CollectionGammaSpectrum.vue'

const COLLECTED_COLOR = '#c9a227'
const RADIOACTIVE_COLOR = 'var(--color-error)'
const SPECTRA_COLOR = '#c9a227'

const route = useRoute()
const router = useRouter()
const { messages, tLegend, collectionName } = useLocale()

const isOpen = computed(() => route.name === 'collection')
const stats = computeCollectionStats()
const sectionCollapsed = ref(false)
const spectraCollapsed = ref(false)

const spectrumElements = elements.flatMap((el) => {
  const spectrumId = el.collection?.spectrum
  if (!spectrumId) return []
  return [{ symbol: el.symbol, routeSymbol: getElementRouteSymbol(el.symbol), color: el.color, spectrumId }]
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
  <Teleport to="body">
    <Transition name="collection-panel-backdrop">
      <button
        v-if="isOpen"
        type="button"
        class="collection-panel__backdrop"
        :aria-label="messages.collectionPanel.close"
        @click="close"
      />
    </Transition>

    <aside
      class="collection-panel"
      :class="{ 'collection-panel--open': isOpen }"
      :aria-hidden="!isOpen"
    >
      <div v-if="isOpen" class="collection-panel__shell">
        <header class="collection-panel__header">
          <div class="collection-panel__heading">
            <h2 class="collection-panel__title">{{ collectionName }}</h2>
          </div>
          <button
            type="button"
            class="collection-panel__close"
            :aria-label="messages.collectionPanel.close"
            @click="close"
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
        </header>

        <div class="collection-panel__content">
          <section
            class="collection-panel__section"
            :class="{ 'collection-panel__section--collapsed': sectionCollapsed }"
          >
            <button
              type="button"
              class="collection-panel__section-title"
              :style="{ borderColor: COLLECTED_COLOR }"
              :aria-expanded="!sectionCollapsed"
              @click="sectionCollapsed = !sectionCollapsed"
            >
              <span>{{ messages.collectionPanel.sectionTitle }}</span>
              <span class="collection-panel__section-chevron" aria-hidden="true" />
            </button>

            <div v-show="!sectionCollapsed">
              <p class="collection-panel__note">{{ messages.collectionPanel.collectibleNote }}</p>

              <div class="collection-panel__stat-rows">
                <div class="collection-panel__row">
                  <span class="collection-panel__row-label">{{ messages.collectionPanel.statCollected }}</span>
                  <span class="collection-panel__row-track">
                    <span
                      class="collection-panel__row-fill"
                      :style="{
                        width: percentOf(stats.elementCounts.collected, stats.elementCounts.total) + '%',
                        backgroundColor: COLLECTED_COLOR,
                      }"
                    />
                    <span
                      class="collection-panel__row-unavailable"
                      :style="{
                        left: percentOf(stats.elementCounts.collectible, stats.elementCounts.total) + '%',
                      }"
                    />
                  </span>
                  <span class="collection-panel__row-value"><span :style="{ color: COLLECTED_COLOR }">{{ stats.elementCounts.collected }}</span><span class="collection-panel__row-value-sep">/</span><span class="collection-panel__row-value-mid">{{
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
              </div>

              <hr class="collection-panel__divider" />

              <div class="collection-panel__category-rows">
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
            </div>
          </section>

          <section
            v-if="spectrumElements.length"
            class="collection-panel__section"
            :class="{ 'collection-panel__section--collapsed': spectraCollapsed }"
          >
            <button
              type="button"
              class="collection-panel__section-title"
              :style="{ borderColor: SPECTRA_COLOR }"
              :aria-expanded="!spectraCollapsed"
              @click="spectraCollapsed = !spectraCollapsed"
            >
              <span>{{ messages.collectionPanel.spectraSectionTitle }}</span>
              <span class="collection-panel__section-chevron" aria-hidden="true" />
            </button>

            <div v-show="!spectraCollapsed" class="collection-panel__spectra-list">
              <div
                v-for="item in spectrumElements"
                :key="item.symbol"
                class="collection-panel__spectrum-card"
              >
                <button
                  type="button"
                  class="collection-panel__spectrum-header"
                  @click="openElement(item.routeSymbol)"
                >
                  <span
                    class="collection-panel__spectrum-swatch"
                    :style="{ backgroundColor: item.color }"
                  />
                  <span class="collection-panel__spectrum-symbol">{{ item.symbol }}</span>
                  <span class="collection-panel__spectrum-name">{{ messages.elements[item.symbol] }}</span>
                </button>
                <CollectionGammaSpectrum :spectrum-id="item.spectrumId" :accent-color="item.color" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </aside>
  </Teleport>
</template>

<style scoped>
.collection-panel__backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  border: none;
  background: var(--color-overlay);
  cursor: pointer;
}

.collection-panel-backdrop-enter-active,
.collection-panel-backdrop-leave-active {
  transition: opacity 0.25s ease;
}

.collection-panel-backdrop-enter-from,
.collection-panel-backdrop-leave-to {
  opacity: 0;
}

.collection-panel {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 210;
  width: min(720px, 96vw);
  height: 100vh;
  height: 100dvh;
  padding-top: env(safe-area-inset-top, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  box-sizing: border-box;
  background: var(--color-bg);
  border-left: 1px solid var(--color-border);
  box-shadow: -4px 0 24px var(--color-shadow-md);
  transform: translateX(100%);
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.collection-panel--open {
  transform: translateX(0);
}

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

.collection-panel__close {
  flex-shrink: 0;
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

.collection-panel__close:hover {
  background: var(--color-bg-elevated);
  color: var(--color-text);
}

.collection-panel__close svg {
  width: 15px;
  height: 15px;
}

.collection-panel__content {
  padding: 8px 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.collection-panel__stat-rows,
.collection-panel__category-rows {
  display: grid;
  grid-template-columns: minmax(120px, auto) 1fr auto;
  align-items: center;
  row-gap: 10px;
  column-gap: 10px;
}

.collection-panel__divider {
  height: 1px;
  margin: 20px 0;
  border: none;
  background: var(--color-border);
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

.collection-panel__section {
  padding-top: 4px;
}

.collection-panel__section + .collection-panel__section {
  margin-top: 8px;
}

.collection-panel__section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  margin: 0 0 12px;
  padding: 0 0 0 12px;
  border: none;
  border-left: 4px solid;
  background: none;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.3;
  text-align: left;
  cursor: pointer;
  transition: color 0.15s ease;
}

.collection-panel__section-title:hover {
  color: var(--color-text-secondary);
}

.collection-panel__section--collapsed .collection-panel__section-title {
  margin-bottom: 0;
}

.collection-panel__section-chevron {
  flex-shrink: 0;
  width: 7px;
  height: 7px;
  margin-right: 6px;
  border-right: 2px solid var(--color-text-secondary);
  border-bottom: 2px solid var(--color-text-secondary);
  transform: rotate(45deg);
  transition: transform 0.2s ease;
}

.collection-panel__section--collapsed .collection-panel__section-chevron {
  transform: rotate(-45deg);
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
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin: 0 0 8px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
}

.collection-panel__spectrum-swatch {
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  border-radius: 3px;
}

.collection-panel__spectrum-symbol {
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text);
}

.collection-panel__spectrum-name {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  color: var(--color-text-secondary);
  transition: color 0.15s ease;
}

.collection-panel__spectrum-header:hover .collection-panel__spectrum-name {
  color: var(--color-text);
}

@media (max-width: 900px) {
  .collection-panel {
    width: 100vw;
  }

  .collection-panel__header {
    padding: 16px 16px 4px;
  }

  .collection-panel__content {
    padding: 8px 16px 24px;
  }

  .collection-panel__stat-rows,
  .collection-panel__category-rows {
    grid-template-columns: minmax(90px, auto) 1fr auto;
    column-gap: 8px;
  }
}
</style>
