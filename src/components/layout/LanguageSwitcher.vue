<script setup lang="ts">
import { computed } from 'vue';
import { localeOptions, useLocale } from '../../locales';
import PillSwitcherGroup from '../common/PillSwitcherGroup.vue';
import PillSwitcherButton from '../common/PillSwitcherButton.vue';

const { locale, setLocale } = useLocale();

const groupAriaLabel = computed(() => {
  if (locale.value === 'ru') return 'Язык';
  if (locale.value === 'zh') return '语言';
  return 'Language';
});
</script>

<template>
  <PillSwitcherGroup :aria-label="groupAriaLabel">
    <PillSwitcherButton
      v-for="option in localeOptions"
      :key="option.value"
      class="lang-switcher__btn"
      :active="locale === option.value"
      @click="setLocale(option.value)"
    >
      {{ option.label }}
    </PillSwitcherButton>
  </PillSwitcherGroup>
</template>

<style scoped>
.lang-switcher__btn {
  font-family: var(--font-body);
  font-size: var(--pill-switcher-font-size);
  font-weight: 700;
  line-height: 1;
}

@media (max-width: 900px) {
  .lang-switcher__btn {
    font-size: 11px;
  }
}
</style>
