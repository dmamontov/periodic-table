<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLocale } from '../locales'

const route = useRoute()
const router = useRouter()
const { messages } = useLocale()

const isOpen = ref(false)
const rootEl = ref<HTMLElement | null>(null)
const flyoutStyle = ref<{ top: string; left: string; width: string }>({
  top: '0px',
  left: '0px',
  width: '180px',
})

const VIEWPORT_MARGIN = 12
const FLYOUT_WIDTH = 280

const isDashboardActive = computed(() => route.name === 'dashboard')

function updateFlyoutPosition() {
  const rect = rootEl.value?.getBoundingClientRect()
  if (!rect) return

  const width = Math.min(FLYOUT_WIDTH, window.innerWidth - VIEWPORT_MARGIN * 2)
  const maxLeft = window.innerWidth - VIEWPORT_MARGIN - width
  const left = Math.min(Math.max(rect.left, VIEWPORT_MARGIN), Math.max(maxLeft, VIEWPORT_MARGIN))

  flyoutStyle.value = {
    top: `${rect.bottom + 6}px`,
    left: `${left}px`,
    width: `${width}px`,
  }
}

function open() {
  isOpen.value = true
  void nextTick(updateFlyoutPosition)
}

function close() {
  isOpen.value = false
}

function toggle() {
  if (isOpen.value) close()
  else open()
}

function navigate(name: 'dashboard') {
  void router.push({ name })
  close()
}

function onDocumentPointerDown(event: PointerEvent) {
  if (!isOpen.value) return
  if (rootEl.value && !rootEl.value.contains(event.target as Node)) close()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

function onWindowResize() {
  if (isOpen.value) updateFlyoutPosition()
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown)
  window.addEventListener('resize', onWindowResize)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  window.removeEventListener('resize', onWindowResize)
})
</script>

<template>
  <div ref="rootEl" class="main-menu" :class="{ 'main-menu--open': isOpen }">
    <button
      type="button"
      class="main-menu__toggle"
      :aria-label="messages.menu.label"
      :aria-expanded="isOpen"
      @click="toggle"
      @keydown="onKeydown"
    >
      <svg class="main-menu__icon" viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </button>

    <Transition name="main-menu-fade">
      <nav v-if="isOpen" class="main-menu__flyout" :style="flyoutStyle" :aria-label="messages.menu.label">
        <button
          type="button"
          class="main-menu__item"
          :class="{ 'main-menu__item--active': isDashboardActive }"
          @click="navigate('dashboard')"
        >
          <svg class="main-menu__item-icon" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M2 14V7M7 14V2M12 14V9.5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          {{ messages.menu.dashboard }}
        </button>
      </nav>
    </Transition>
  </div>
</template>

<style scoped>
.main-menu {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 2px;
  border-radius: 6px;
  background: var(--color-bg-muted);
}

.main-menu__toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--pill-switcher-height);
  height: var(--pill-switcher-height);
  border: none;
  border-radius: 4px;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.main-menu__toggle:hover {
  color: var(--color-text);
}

.main-menu--open .main-menu__toggle {
  background: var(--color-bg-elevated);
  color: var(--color-text);
  box-shadow: 0 1px 2px var(--color-shadow);
}

.main-menu__icon {
  width: var(--pill-switcher-icon-size);
  height: var(--pill-switcher-icon-size);
  display: block;
}

.main-menu__flyout {
  position: fixed;
  z-index: 50;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-bg-elevated);
  box-shadow: 0 8px 24px var(--color-shadow-lg);
  overflow: hidden;
}

.main-menu__item {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 28px;
  padding: 0 var(--pill-switcher-padding-x);
  border: none;
  border-radius: 5px;
  background: transparent;
  color: var(--color-text-secondary);
  font-family: var(--font-body);
  font-size: var(--pill-switcher-font-size);
  text-align: left;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.main-menu__item:hover {
  background: var(--color-bg-muted);
  color: var(--color-text);
}

.main-menu__item--active {
  color: var(--color-text);
  font-weight: 700;
}

.main-menu__item-icon {
  width: var(--pill-switcher-icon-size);
  height: var(--pill-switcher-icon-size);
  flex-shrink: 0;
  color: inherit;
}

.main-menu-fade-enter-active,
.main-menu-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.main-menu-fade-enter-from,
.main-menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (max-width: 900px) {
  .main-menu__icon {
    width: 13px;
    height: 13px;
  }
}
</style>
