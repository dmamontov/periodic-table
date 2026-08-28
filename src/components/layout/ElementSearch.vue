<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';
import type { Element } from '../../types/element/element';
import { elements } from '../../data';
import { getElementRouteSymbol } from '../../utils/element/lookup';
import { useLocale } from '../../locales';
import { searchElements } from '../../utils/element/search';
import { formatElementSymbol } from '../../utils/element/formatters';
import { cyclicIndex } from '../../utils/cyclicIndex';
import AppIcon from '../common/AppIcon.vue';
import FlyoutTrigger from '../common/FlyoutTrigger.vue';

const router = useRouter();
const { messages } = useLocale();

const query = ref('');
const activeIndex = ref(0);
const inputEl = useTemplateRef<HTMLInputElement>('inputEl');
const flyoutRef = useTemplateRef<InstanceType<typeof FlyoutTrigger>>('flyoutRef');

const results = computed(() => searchElements(query.value, elements, messages.value));

function onFlyoutOpen() {
  inputEl.value?.focus();
}

function onFlyoutClose() {
  query.value = '';
  activeIndex.value = 0;
}

function selectElement(element: Element) {
  void router.push({ name: 'element', params: { symbol: getElementRouteSymbol(element.symbol) } });
  flyoutRef.value?.close();
}

function onQueryInput() {
  activeIndex.value = 0;
}

function moveActive(delta: number) {
  const count = results.value.length;
  if (!count) return;
  activeIndex.value = cyclicIndex(activeIndex.value, delta, count);
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    moveActive(1);
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    moveActive(-1);
  } else if (event.key === 'Enter') {
    const active = results.value[activeIndex.value];
    if (active) {
      event.preventDefault();
      selectElement(active);
    }
  } else if (event.key === 'Escape') {
    event.preventDefault();
    flyoutRef.value?.close();
    inputEl.value?.blur();
  }
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
}

function onGlobalKeydown(event: KeyboardEvent) {
  if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return;
  if (isTypingTarget(event.target)) return;
  event.preventDefault();
  flyoutRef.value?.open();
}

onMounted(() => {
  document.addEventListener('keydown', onGlobalKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onGlobalKeydown);
});
</script>

<template>
  <FlyoutTrigger
    ref="flyoutRef"
    class="element-search"
    :toggle-aria-label="messages.search.label"
    @open="onFlyoutOpen"
    @close="onFlyoutClose"
  >
    <template #icon>
      <AppIcon class="element-search__icon" name="search" />
    </template>

    <div class="element-search__input-row">
      <AppIcon class="element-search__input-icon" name="search" />
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
        <span class="element-search__symbol" :style="{ color: element.color }">{{
          formatElementSymbol(element.symbol)
        }}</span>
        <span class="element-search__name">{{ messages.elements[element.symbol] }}</span>
        <span class="element-search__number">{{ element.number }}</span>
      </button>

      <p v-if="results.length === 0" class="element-search__empty">{{ messages.search.noResults }}</p>
    </div>
  </FlyoutTrigger>
</template>

<style scoped>
.element-search__icon :deep(svg) {
  width: var(--pill-switcher-icon-size);
  height: var(--pill-switcher-icon-size);
  display: block;
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
  color: var(--color-text-muted);
}

.element-search__input-icon :deep(svg) {
  width: var(--pill-switcher-icon-size);
  height: var(--pill-switcher-icon-size);
  flex-shrink: 0;
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

@media (max-width: 900px) {
  .element-search__icon :deep(svg),
  .element-search__input-icon :deep(svg) {
    width: 13px;
    height: 13px;
  }
}
</style>
