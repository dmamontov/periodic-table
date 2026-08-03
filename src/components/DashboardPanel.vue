<script setup lang="ts">
import { computed, ref } from 'vue'
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
const categoryCollapsed = ref(false)

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
          <div class="dashboard-highlights">
            <div class="dashboard-highlights__row">
              <span class="dashboard-highlights__dot" :style="{ backgroundColor: COLLECTED_COLOR }" />
              <span class="dashboard-highlights__label">{{ messages.dashboard.statCollected }}</span>
              <span class="dashboard-highlights__track">
                <span
                  class="dashboard-highlights__fill"
                  :style="{ width: collectedPercent + '%', backgroundColor: COLLECTED_COLOR }"
                />
              </span>
              <span class="dashboard-highlights__value" :style="{ color: COLLECTED_COLOR }">{{ stats.collectedCount }}<span class="dashboard-highlights__value-total">/{{ stats.totalElements }}</span></span>
            </div>

            <div class="dashboard-highlights__row">
              <span class="dashboard-highlights__dot" :style="{ backgroundColor: RADIOACTIVE_COLOR }" />
              <span class="dashboard-highlights__label">{{ messages.dashboard.statRadioactive }}</span>
              <span class="dashboard-highlights__track">
                <span
                  class="dashboard-highlights__fill"
                  :style="{ width: radioactivePercent + '%', backgroundColor: RADIOACTIVE_COLOR }"
                />
              </span>
              <span class="dashboard-highlights__value" :style="{ color: RADIOACTIVE_COLOR }">{{ stats.radioactiveCollectedCount }}<span class="dashboard-highlights__value-total">/{{ stats.radioactiveTotalCount }}</span></span>
            </div>
          </div>

          <section
            class="dashboard-panel__section"
            :class="{ 'dashboard-panel__section--collapsed': categoryCollapsed }"
          >
            <button
              type="button"
              class="dashboard-panel__section-title"
              :style="{ borderColor: COLLECTED_COLOR }"
              :aria-expanded="!categoryCollapsed"
              @click="categoryCollapsed = !categoryCollapsed"
            >
              <span>{{ messages.dashboard.byCategory }}</span>
              <span class="dashboard-panel__section-chevron" aria-hidden="true" />
            </button>

            <div v-show="!categoryCollapsed" class="dashboard-breakdown">
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
  padding: 8px 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dashboard-highlights {
  display: grid;
  grid-template-columns: 8px minmax(120px, auto) 1fr auto;
  align-items: center;
  row-gap: 10px;
  column-gap: 10px;
  margin: 16px 0 24px;
}

.dashboard-highlights__row {
  display: contents;
}

.dashboard-highlights__dot {
  width: 8px;
  height: 8px;
  border-radius: 3px;
  flex-shrink: 0;
}

.dashboard-highlights__label {
  font-size: 13px;
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dashboard-highlights__track {
  position: relative;
  height: 5px;
  border-radius: 999px;
  background: var(--color-heatmap-fade);
  overflow: hidden;
}

.dashboard-highlights__fill {
  position: absolute;
  inset: 0;
  border-radius: 999px;
}

.dashboard-highlights__value {
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  text-align: right;
}

.dashboard-highlights__value-total {
  font-size: 12px;
  font-weight: 700;
  opacity: 0.7;
}

.dashboard-panel__section {
  padding-top: 4px;
}

.dashboard-panel__section-title {
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

.dashboard-panel__section-title:hover {
  color: var(--color-text-secondary);
}

.dashboard-panel__section--collapsed .dashboard-panel__section-title {
  margin-bottom: 0;
}

.dashboard-panel__section-chevron {
  flex-shrink: 0;
  width: 7px;
  height: 7px;
  margin-right: 6px;
  border-right: 2px solid var(--color-text-secondary);
  border-bottom: 2px solid var(--color-text-secondary);
  transform: rotate(45deg);
  transition: transform 0.2s ease;
}

.dashboard-panel__section--collapsed .dashboard-panel__section-chevron {
  transform: rotate(-45deg);
}

.dashboard-breakdown {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dashboard-breakdown__row-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
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

  .dashboard-highlights {
    grid-template-columns: 8px minmax(90px, auto) 1fr auto;
    column-gap: 8px;
  }
}
</style>
