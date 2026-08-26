<script setup lang="ts">
import { themeOptions, useTheme, type ThemePreference } from '../../theme';
import { useLocale } from '../../locales';
import AppIcon from '../common/AppIcon.vue';
import PillSwitcherGroup from '../common/PillSwitcherGroup.vue';
import PillSwitcherButton from '../common/PillSwitcherButton.vue';

const { theme, setTheme } = useTheme();
const { messages } = useLocale();

function themeAriaLabel(value: ThemePreference): string {
  if (value === 'light') return messages.value.themeLight;
  if (value === 'dark') return messages.value.themeDark;
  return messages.value.themeAuto;
}
</script>

<template>
  <PillSwitcherGroup :aria-label="messages.theme">
    <PillSwitcherButton
      v-for="option in themeOptions"
      :key="option.value"
      :active="theme === option.value"
      :aria-label="themeAriaLabel(option.value)"
      @click="setTheme(option.value)"
    >
      <AppIcon v-if="option.value === 'light'" class="theme-switcher__icon" name="sun" />
      <AppIcon v-else-if="option.value === 'dark'" class="theme-switcher__icon" name="moon" />
      <AppIcon v-else class="theme-switcher__icon" name="theme-auto" />
    </PillSwitcherButton>
  </PillSwitcherGroup>
</template>

<style scoped>
.theme-switcher__icon :deep(svg) {
  width: var(--pill-switcher-icon-size);
  height: var(--pill-switcher-icon-size);
  display: block;
}

@media (max-width: 900px) {
  .theme-switcher__icon :deep(svg) {
    width: 13px;
    height: 13px;
  }
}
</style>
