<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLocale } from '../locales'
import { computeCollectionStats } from '../utils/collectionStats'

const COLLECTED_COLOR = '#c9a227'
const RADIOACTIVE_COLOR = '#d14a0f'

const route = useRoute()
const router = useRouter()
const { messages, tLegend } = useLocale()

const isOpen = computed(() => route.name === 'dashboard')
const stats = computeCollectionStats()

const collectedPercent = computed(() =>
  Math.round((stats.collectedCount / stats.totalElements) * 100),
)
const radioactivePercent = computed(() =>
  Math.round((stats.radioactiveCollectedCount / stats.radioactiveTotalCount) * 100),
)

function categoryPercent(collected: number, total: number): number {
  return total === 0 ? 0 : Math.round((collected / total) * 100)
}

function close() {
  void router.push({ name: 'home' })
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
      :style="{ '--accent': COLLECTED_COLOR }"
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
              <span class="dashboard-stat__label" :style="{ backgroundColor: COLLECTED_COLOR }">
                {{ messages.dashboard.statCollected }}
              </span>
              <span class="dashboard-stat__value">{{ stats.collectedCount }}<span class="dashboard-stat__value-total">/{{ stats.totalElements }}</span></span>
              <span class="dashboard-stat__bar">
                <span
                  class="dashboard-stat__bar-fill"
                  :style="{ width: collectedPercent + '%', backgroundColor: COLLECTED_COLOR }"
                />
              </span>
            </div>

            <div class="dashboard-stat">
              <span class="dashboard-stat__label" :style="{ backgroundColor: RADIOACTIVE_COLOR }">
                {{ messages.dashboard.statRadioactive }}
              </span>
              <span class="dashboard-stat__value">{{ stats.radioactiveCollectedCount }}<span class="dashboard-stat__value-total">/{{ stats.radioactiveTotalCount }}</span></span>
              <span class="dashboard-stat__bar">
                <span
                  class="dashboard-stat__bar-fill"
                  :style="{ width: radioactivePercent + '%', backgroundColor: RADIOACTIVE_COLOR }"
                />
              </span>
            </div>
          </div>

          <section class="dashboard-panel__section">
            <h3 class="dashboard-panel__section-title" :style="{ borderColor: COLLECTED_COLOR }">
              {{ messages.dashboard.byCategory }}
            </h3>
            <div class="dashboard-breakdown">
              <div v-for="cat in stats.categoryCounts" :key="cat.id" class="dashboard-breakdown__row">
                <div class="dashboard-breakdown__row-top">
                  <span class="dashboard-breakdown__swatch" :style="{ backgroundColor: cat.color }" />
                  <span class="dashboard-breakdown__label">{{ tLegend(cat.id) }}</span>
                  <span class="dashboard-breakdown__value">{{ cat.collected }}/{{ cat.total }}</span>
                </div>
                <span class="dashboard-breakdown__track">
                  <span
                    class="dashboard-breakdown__fill"
                    :style="{
                      width: categoryPercent(cat.collected, cat.total) + '%',
                      backgroundColor: cat.color,
                    }"
                  />
                </span>
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
  border-top: 3px solid var(--accent, #ccc);
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
  padding: 18px 24px 4px;
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
  padding: 8px 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dashboard-stats {
  display: flex;
  gap: 16px;
  margin: 16px 0 28px;
  text-align: center;
}

.dashboard-stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.dashboard-stat__label {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.01em;
  line-height: 1.2;
}

.dashboard-stat__value {
  font-size: 30px;
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-text);
  font-variant-numeric: tabular-nums;
}

.dashboard-stat__value-total {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text-secondary);
}

.dashboard-stat__bar {
  display: block;
  width: 100%;
  max-width: 140px;
  height: 4px;
  border-radius: 999px;
  background: var(--color-heatmap-fade);
  overflow: hidden;
}

.dashboard-stat__bar-fill {
  display: block;
  height: 100%;
  border-radius: 999px;
}

.dashboard-panel__section {
  padding-top: 4px;
}

.dashboard-panel__section-title {
  margin: 0 0 4px;
  padding-left: 12px;
  border-left: 4px solid;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-text);
}

.dashboard-breakdown {
  display: flex;
  flex-direction: column;
}

.dashboard-breakdown__row {
  padding: 11px 0;
  border-bottom: 1px solid var(--color-border-light);
}

.dashboard-breakdown__row-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 7px;
}

.dashboard-breakdown__swatch {
  flex-shrink: 0;
  width: 9px;
  height: 9px;
  border-radius: 3px;
}

.dashboard-breakdown__label {
  flex: 1 1 auto;
  min-width: 0;
  font-size: 13px;
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dashboard-breakdown__value {
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--color-text);
}

.dashboard-breakdown__track {
  display: block;
  height: 5px;
  border-radius: 999px;
  background: var(--color-heatmap-fade);
  overflow: hidden;
}

.dashboard-breakdown__fill {
  display: block;
  height: 100%;
  border-radius: 999px;
}

@media (max-width: 900px) {
  .dashboard-panel {
    width: 100vw;
  }

  .dashboard-panel__header {
    padding: 16px 16px 4px;
  }

  .dashboard-panel__content {
    padding: 8px 16px 24px;
  }

  .dashboard-stats {
    gap: 8px;
    margin: 14px 0 24px;
  }

  .dashboard-stat__value {
    font-size: 26px;
  }
}
</style>
