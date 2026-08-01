<script setup lang="ts">
import { localeOptions, useLocale } from '../locales'

const { locale, setLocale } = useLocale()
</script>

<template>
  <div class="lang-switcher" role="group" :aria-label="locale === 'ru' ? 'Язык' : locale === 'zh' ? '语言' : 'Language'">
    <button
      v-for="option in localeOptions"
      :key="option.value"
      type="button"
      class="lang-switcher__btn"
      :class="{ 'lang-switcher__btn--active': locale === option.value }"
      :aria-pressed="locale === option.value"
      @click="setLocale(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.lang-switcher {
  display: inline-flex;
  gap: 2px;
  padding: 2px;
  border-radius: 6px;
  background: var(--color-bg-muted);
}

.lang-switcher__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--pill-switcher-min-width);
  height: var(--pill-switcher-height);
  padding: 0 var(--pill-switcher-padding-x);
  border: none;
  border-radius: 4px;
  background: transparent;
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: var(--pill-switcher-font-size);
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.lang-switcher__btn:hover {
  color: var(--color-text);
}

.lang-switcher__btn--active {
  background: var(--color-bg-elevated);
  color: var(--color-text);
  box-shadow: 0 1px 2px var(--color-shadow);
}

@media (max-width: 900px) {
  .lang-switcher__btn {
    min-width: 32px;
    padding-inline: 6px;
    font-size: 11px;
  }
}
</style>
