<script setup lang="ts">
import { themeOptions, useTheme } from '../../theme'
import { useLocale } from '../../locales'
import PillSwitcherGroup from '../common/PillSwitcherGroup.vue'
import PillSwitcherButton from '../common/PillSwitcherButton.vue'

const { theme, setTheme } = useTheme()
const { messages } = useLocale()
</script>

<template>
  <PillSwitcherGroup :aria-label="messages.theme">
    <PillSwitcherButton
      v-for="option in themeOptions"
      :key="option.value"
      :active="theme === option.value"
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
    </PillSwitcherButton>
  </PillSwitcherGroup>
</template>

<style scoped>
.theme-switcher__icon {
  width: var(--pill-switcher-icon-size);
  height: var(--pill-switcher-icon-size);
  display: block;
}

@media (max-width: 900px) {
  .theme-switcher__icon {
    width: 13px;
    height: 13px;
  }
}
</style>
