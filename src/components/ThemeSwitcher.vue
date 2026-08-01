<script setup lang="ts">
import { themeOptions, useTheme } from '../theme'
import { useLocale } from '../locales'

const { theme, setTheme } = useTheme()
const { messages } = useLocale()
</script>

<template>
  <div class="theme-switcher" role="group" :aria-label="messages.theme">
    <button
      v-for="option in themeOptions"
      :key="option.value"
      type="button"
      class="theme-switcher__btn"
      :class="{ 'theme-switcher__btn--active': theme === option.value }"
      :aria-pressed="theme === option.value"
      :aria-label="
        option.value === 'light'
          ? messages.themeLight
          : option.value === 'dark'
            ? messages.themeDark
            : messages.themeAuto
      "
      @click="setTheme(option.value)"
    >
      <svg
        v-if="option.value === 'light'"
        class="theme-switcher__icon"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="3.25" fill="none" stroke="currentColor" stroke-width="1.5" />
        <path
          d="M8 1.5v1.75M8 12.75V14.5M14.5 8h-1.75M3.25 8H1.5M12.4 3.6l-1.24 1.24M4.84 11.16l-1.24 1.24M12.4 12.4l-1.24-1.24M4.84 4.84L3.6 3.6"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
      <svg
        v-else-if="option.value === 'dark'"
        class="theme-switcher__icon"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path
          d="M9.5 2.25a4.25 4.25 0 0 0 5.75 5.75A5.25 5.25 0 1 1 9.5 2.25Z"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        v-else
        class="theme-switcher__icon"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="5.25" fill="none" stroke="currentColor" stroke-width="1.5" />
        <path d="M8 2.75v10.5" fill="none" stroke="currentColor" stroke-width="1.5" />
        <path d="M8 2.75a5.25 5.25 0 0 1 0 10.5Z" fill="currentColor" opacity="0.35" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.theme-switcher {
  display: inline-flex;
  gap: 2px;
  padding: 2px;
  border-radius: 6px;
  background: var(--color-bg-muted);
}

.theme-switcher__btn {
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
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.theme-switcher__icon {
  width: var(--pill-switcher-icon-size);
  height: var(--pill-switcher-icon-size);
  display: block;
}

.theme-switcher__btn:hover {
  color: var(--color-text);
}

.theme-switcher__btn--active {
  background: var(--color-bg-elevated);
  color: var(--color-text);
  box-shadow: 0 1px 2px var(--color-shadow);
}

@media (max-width: 900px) {
  .theme-switcher__btn {
    min-width: 32px;
    padding-inline: 6px;
  }

  .theme-switcher__icon {
    width: 13px;
    height: 13px;
  }
}
</style>
