<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Element } from '../types/element'
import { elements, getElementRouteSymbol } from '../data'
import { useLocale } from '../locales'
import { searchElements } from '../utils/elementSearch'
import { formatElementSymbol } from '../utils/elementFormatters'

const router = useRouter()
const { messages } = useLocale()

const isOpen = ref(false)
const query = ref('')
const activeIndex = ref(0)
const rootEl = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)
const flyoutStyle = ref<{ top: string; left: string; width: string }>({
  top: '0px',
  left: '0px',
  width: '280px',
})

const results = computed(() => searchElements(query.value, elements, messages.value))

const VIEWPORT_MARGIN = 12
const FLYOUT_WIDTH = 280

function updateFlyoutPosition() {
  const rect = rootEl.value?.getBoundingClientRect()
  if (!rect) return

  const width = Math.min(FLYOUT_WIDTH, window.innerWidth - VIEWPORT_MARGIN * 2)
  const maxLeft = window.innerWidth - VIEWPORT_MARGIN - width
  const idealLeft = rect.right - width
  const left = Math.min(Math.max(idealLeft, VIEWPORT_MARGIN), Math.max(maxLeft, VIEWPORT_MARGIN))

  flyoutStyle.value = {
    top: `${rect.bottom + 6}px`,
    left: `${left}px`,
    width: `${width}px`,
  }
}

function open() {
  isOpen.value = true
  void nextTick(() => {
    inputEl.value?.focus()
    updateFlyoutPosition()
  })
}

function close() {
  isOpen.value = false
  query.value = ''
  activeIndex.value = 0
}

function toggle() {
  if (isOpen.value) close()
  else open()
}

function selectElement(element: Element) {
  void router.push({ name: 'element', params: { symbol: getElementRouteSymbol(element.symbol) } })
  close()
}

function onQueryInput() {
  activeIndex.value = 0
}

function moveActive(delta: number) {
  const count = results.value.length
  if (!count) return
  activeIndex.value = (activeIndex.value + delta + count) % count
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    moveActive(1)
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    moveActive(-1)
  } else if (event.key === 'Enter') {
    const active = results.value[activeIndex.value]
    if (active) {
      event.preventDefault()
      selectElement(active)
    }
  } else if (event.key === 'Escape') {
    event.preventDefault()
    close()
    inputEl.value?.blur()
  }
}

function onDocumentPointerDown(event: PointerEvent) {
  if (!isOpen.value) return
  if (rootEl.value && !rootEl.value.contains(event.target as Node)) close()
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable
}

function onGlobalKeydown(event: KeyboardEvent) {
  if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return
  if (isTypingTarget(event.target)) return
  event.preventDefault()
  open()
}

function onWindowResize() {
  if (isOpen.value) updateFlyoutPosition()
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown)
  document.addEventListener('keydown', onGlobalKeydown)
  window.addEventListener('resize', onWindowResize)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  document.removeEventListener('keydown', onGlobalKeydown)
  window.removeEventListener('resize', onWindowResize)
})
</script>

<template>
  <div ref="rootEl" class="element-search" :class="{ 'element-search--open': isOpen }">
    <button
      type="button"
      class="element-search__toggle"
      :aria-label="messages.search.label"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <svg class="element-search__icon" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="6.75" cy="6.75" r="4.25" fill="none" stroke="currentColor" stroke-width="1.5" />
        <path d="M10 10l4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </button>

    <Transition name="element-search-fade">
      <div v-if="isOpen" class="element-search__flyout" :style="flyoutStyle">
        <div class="element-search__input-row">
          <svg class="element-search__input-icon" viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="6.75" cy="6.75" r="4.25" fill="none" stroke="currentColor" stroke-width="1.5" />
            <path d="M10 10l4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
          <input
            ref="inputEl"
            v-model="query"
            type="text"
            class="element-search__input"
            role="combobox"
            aria-autocomplete="list"
            aria-controls="element-search-listbox"
            :aria-expanded="results.length > 0"
            :placeholder="messages.search.placeholder"
            @input="onQueryInput"
            @keydown="onKeydown"
          />
        </div>

        <div v-if="query" id="element-search-listbox" class="element-search__panel" role="listbox">
          <button
            v-for="(element, index) in results"
            :key="element.number"
            type="button"
            role="option"
            class="element-search__result"
            :class="{ 'element-search__result--active': index === activeIndex }"
            :aria-selected="index === activeIndex"
            @click="selectElement(element)"
            @mouseenter="activeIndex = index"
          >
            <span class="element-search__swatch" :style="{ backgroundColor: element.color }" />
            <span class="element-search__symbol">{{ formatElementSymbol(element.symbol) }}</span>
            <span class="element-search__name">{{ messages.elements[String(element.number)] }}</span>
            <span class="element-search__number">{{ element.number }}</span>
          </button>

          <p v-if="results.length === 0" class="element-search__empty">{{ messages.search.noResults }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.element-search {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 2px;
  border-radius: 6px;
  background: var(--color-bg-muted);
}

.element-search__toggle {
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

.element-search__toggle:hover {
  color: var(--color-text);
}

.element-search--open .element-search__toggle {
  background: var(--color-bg-elevated);
  color: var(--color-text);
  box-shadow: 0 1px 2px var(--color-shadow);
}

.element-search__icon {
  width: var(--pill-switcher-icon-size);
  height: var(--pill-switcher-icon-size);
  display: block;
}

.element-search__flyout {
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

.element-search__input-row {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 28px;
  padding: 0 var(--pill-switcher-padding-x);
  flex-shrink: 0;
}

.element-search__input-icon {
  width: var(--pill-switcher-icon-size);
  height: var(--pill-switcher-icon-size);
  flex-shrink: 0;
  color: var(--color-text-muted);
}

.element-search__input {
  flex: 1 1 auto;
  min-width: 0;
  height: 100%;
  border: none;
  background: transparent;
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: var(--pill-switcher-font-size);
}

.element-search__input:focus {
  outline: none;
}

.element-search__input::placeholder {
  color: var(--color-text-tertiary);
}

.element-search__panel {
  max-height: 300px;
  overflow-y: auto;
  padding: 4px;
  border-top: 1px solid var(--color-border-subtle);
}

.element-search__result {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 6px 8px;
  border: none;
  border-radius: 5px;
  background: transparent;
  color: var(--color-text);
  font-family: var(--font-body);
  text-align: left;
  cursor: pointer;
}

.element-search__result--active {
  background: var(--color-bg-muted);
}

.element-search__swatch {
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  border-radius: 3px;
}

.element-search__symbol {
  flex-shrink: 0;
  min-width: 1.8em;
  font-weight: 700;
  font-size: 13px;
}

.element-search__name {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.element-search__number {
  flex-shrink: 0;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  color: var(--color-text-tertiary);
}

.element-search__empty {
  margin: 0;
  padding: 10px 8px;
  font-size: 13px;
  color: var(--color-text-muted);
  text-align: center;
}

.element-search-fade-enter-active,
.element-search-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.element-search-fade-enter-from,
.element-search-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (max-width: 900px) {
  .element-search__icon,
  .element-search__input-icon {
    width: 13px;
    height: 13px;
  }
}
</style>
