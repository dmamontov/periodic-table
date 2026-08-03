<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLocale } from '../locales'
import { computeCollectionStats } from '../utils/collectionStats'
import { resolveCollectionLabel } from '../utils/collectionLabels'

const route = useRoute()
const router = useRouter()
const { locale, messages, tLegend } = useLocale()

const isOpen = computed(() => route.name === 'dashboard')
const stats = computeCollectionStats()

const collectedPercent = computed(() =>
  Math.round((stats.collectedCount / stats.totalElements) * 100),
)
const categoriesRepresented = computed(
  () => stats.categoryCounts.filter((c) => c.collected > 0).length,
)
const maxStateCount = computed(() => stats.stateCounts[0]?.count ?? 1)

function close() {
  void router.push({ name: 'home' })
}

function categoryPercent(collected: number, total: number): number {
  return total === 0 ? 0 : Math.round((collected / total) * 100)
}

function statePercent(count: number): number {
  return Math.round((count / maxStateCount.value) * 100)
}

function stateLabel(key: string): string {
  return resolveCollectionLabel(locale.value, 'sampleStates', key)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="dashboard-backdrop">
      <button
        v-if="isOpen"
        type="button"
        class="dashboard-panel__backdrop"
        :aria-label="messages.dashboard.close"
        @click="close"
      />
    </Transition>

    <aside
      class="dashboard-panel"
      :class="{ 'dashboard-panel--open': isOpen }"
      :aria-hidden="!isOpen"
    >
      <div v-if="isOpen" class="dashboard-panel__shell">
        <header class="dashboard-panel__header">
          <div class="dashboard-panel__heading">
            <h2 class="dashboard-panel__title">{{ messages.dashboard.title }}</h2>
            <p class="dashboard-panel__subtitle">{{ messages.dashboard.subtitle }}</p>
          </div>
          <button
            type="button"
            class="dashboard-panel__close"
            :aria-label="messages.dashboard.close"
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

        <div class="dashboard-panel__content">
          <div class="dashboard-stats">
            <div class="dashboard-stat">
              <span class="dashboard-stat__value">{{ stats.collectedCount }}<span class="dashboard-stat__value-total">/{{ stats.totalElements }}</span></span>
              <span class="dashboard-stat__label">{{ messages.dashboard.statCollected }}</span>
              <span class="dashboard-stat__bar">
                <span
                  class="dashboard-stat__bar-fill"
                  :style="{ width: collectedPercent + '%' }"
                />
              </span>
            </div>

            <div class="dashboard-stat">
              <span class="dashboard-stat__value">{{ stats.radioactiveCollectedCount }}</span>
              <span class="dashboard-stat__label">{{ messages.dashboard.statRadioactive }}</span>
            </div>

            <div class="dashboard-stat">
              <span class="dashboard-stat__value">{{ stats.spectraCount }}</span>
              <span class="dashboard-stat__label">{{ messages.dashboard.statSpectra }}</span>
            </div>

            <div class="dashboard-stat">
              <span class="dashboard-stat__value">{{ categoriesRepresented }}<span class="dashboard-stat__value-total">/{{ stats.categoryCounts.length }}</span></span>
              <span class="dashboard-stat__label">{{ messages.dashboard.statCategories }}</span>
            </div>
          </div>

          <section class="dashboard-panel__section">
            <h3 class="dashboard-panel__section-title">{{ messages.dashboard.byCategory }}</h3>
            <div class="dashboard-breakdown">
              <div
                v-for="cat in stats.categoryCounts"
                :key="cat.id"
                class="dashboard-breakdown__row dashboard-breakdown__row--category"
              >
                <span class="dashboard-breakdown__swatch" :style="{ backgroundColor: cat.color }" />
                <span class="dashboard-breakdown__label">{{ tLegend(cat.id) }}</span>
                <span class="dashboard-breakdown__track">
                  <span
                    class="dashboard-breakdown__fill"
                    :style="{
                      width: categoryPercent(cat.collected, cat.total) + '%',
                      backgroundColor: cat.color,
                    }"
                  />
                </span>
                <span class="dashboard-breakdown__value">{{ cat.collected }}/{{ cat.total }}</span>
              </div>
            </div>
          </section>

          <section class="dashboard-panel__section">
            <h3 class="dashboard-panel__section-title">{{ messages.dashboard.byState }}</h3>
            <div class="dashboard-breakdown">
              <div
                v-for="state in stats.stateCounts"
                :key="state.key"
                class="dashboard-breakdown__row dashboard-breakdown__row--state"
              >
                <span class="dashboard-breakdown__label">{{ stateLabel(state.key) }}</span>
                <span class="dashboard-breakdown__track">
                  <span
                    class="dashboard-breakdown__fill dashboard-breakdown__fill--accent"
                    :style="{ width: statePercent(state.count) + '%' }"
                  />
                </span>
                <span class="dashboard-breakdown__value">{{ state.count }}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </aside>
  </Teleport>
</template>

<style scoped>
.dashboard-panel__backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  border: none;
  background: var(--color-overlay);
  cursor: pointer;
}

.dashboard-backdrop-enter-active,
.dashboard-backdrop-leave-active {
  transition: opacity 0.25s ease;
}

.dashboard-backdrop-enter-from,
.dashboard-backdrop-leave-to {
  opacity: 0;
}

.dashboard-panel {
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

.dashboard-panel--open {
  transform: translateX(0);
}

.dashboard-panel__shell {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
}

.dashboard-panel__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 20px 24px 4px;
}

.dashboard-panel__title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
}

.dashboard-panel__subtitle {
  margin: 4px 0 0;
  font-size: 13px;
  color: var(--color-text-secondary);
  font-style: italic;
}

.dashboard-panel__close {
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

.dashboard-panel__close:hover {
  background: var(--color-bg-elevated);
  color: var(--color-text);
}

.dashboard-panel__close svg {
  width: 15px;
  height: 15px;
}

.dashboard-panel__content {
  padding: 16px 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
}

.dashboard-stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 16px;
  border: 1px solid var(--color-chart-border);
  border-radius: 8px;
  background: var(--color-chart-bg);
}

.dashboard-stat__value {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-text);
  font-variant-numeric: tabular-nums;
}

.dashboard-stat__value-total {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-tertiary);
}

.dashboard-stat__label {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.dashboard-stat__bar {
  display: block;
  margin-top: 4px;
  height: 5px;
  border-radius: 999px;
  background: var(--color-heatmap-fade);
  overflow: hidden;
}

.dashboard-stat__bar-fill {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: var(--color-link);
}

.dashboard-panel__section-title {
  margin: 0 0 10px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-secondary);
}

.dashboard-breakdown {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px 16px;
  border: 1px solid var(--color-chart-border);
  border-radius: 8px;
  background: var(--color-chart-bg);
}

.dashboard-breakdown__row {
  display: grid;
  align-items: center;
  gap: 8px;
}

.dashboard-breakdown__row--category {
  grid-template-columns: 9px minmax(90px, auto) 1fr auto;
}

.dashboard-breakdown__row--state {
  grid-template-columns: minmax(120px, auto) 1fr auto;
}

.dashboard-breakdown__swatch {
  width: 9px;
  height: 9px;
  border-radius: 3px;
  flex-shrink: 0;
}

.dashboard-breakdown__label {
  font-size: 12.5px;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dashboard-breakdown__track {
  position: relative;
  height: 6px;
  border-radius: 999px;
  background: var(--color-heatmap-fade);
  overflow: hidden;
}

.dashboard-breakdown__fill {
  position: absolute;
  inset: 0;
  border-radius: 999px;
}

.dashboard-breakdown__fill--accent {
  background: var(--color-link);
}

.dashboard-breakdown__value {
  min-width: 2.4em;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  color: var(--color-text-tertiary);
  text-align: right;
}

@media (max-width: 900px) {
  .dashboard-panel {
    width: 100vw;
  }

  .dashboard-panel__header {
    padding: 16px 16px 4px;
  }

  .dashboard-panel__content {
    padding: 12px 16px 24px;
    gap: 20px;
  }

  .dashboard-breakdown__row--category {
    grid-template-columns: 9px minmax(70px, auto) 1fr auto;
  }

  .dashboard-breakdown__row--state {
    grid-template-columns: minmax(90px, auto) 1fr auto;
  }
}
</style>
