<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLocale } from '../../locales'
import FlyoutTrigger from '../common/FlyoutTrigger.vue'

const route = useRoute()
const router = useRouter()
const { messages } = useLocale()

const isCollectionActive = computed(() => route.name === 'collection')

const flyoutRef = useTemplateRef<InstanceType<typeof FlyoutTrigger>>('flyoutRef')

function navigate(name: 'collection') {
  void router.push({ name })
  flyoutRef.value?.close()
}
</script>

<template>
  <FlyoutTrigger
    ref="flyoutRef"
    class="main-menu"
    :toggle-aria-label="messages.menu.label"
    :flyout-aria-label="messages.menu.label"
    panel-tag="nav"
  >
    <template #icon>
      <svg class="main-menu__icon" viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </template>

    <button
      type="button"
      class="main-menu__item"
      :class="{ 'main-menu__item--active': isCollectionActive }"
      @click="navigate('collection')"
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
      {{ messages.menu.collection }}
    </button>
  </FlyoutTrigger>
</template>

<style scoped>
.main-menu__icon {
  width: var(--pill-switcher-icon-size);
  height: var(--pill-switcher-icon-size);
  display: block;
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

@media (max-width: 900px) {
  .main-menu__icon {
    width: 13px;
    height: 13px;
  }
}
</style>
